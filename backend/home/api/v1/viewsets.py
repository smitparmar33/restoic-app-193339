from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .filters import FavoriteFilter, HistoryFilter, QuickLinkFilter
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
import logging
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.apple.client import AppleOAuth2Client
from django.http import Http404

from dj_rest_auth.registration.views import SocialLoginView

from datetime import date, datetime
from rest_framework.views import APIView
from dateutil.relativedelta import relativedelta

import requests
from datetime import timedelta
from django.conf import settings
from django.utils import timezone

from home.api.v1.serializers import *
from home.models import *

User = get_user_model()
logger = logging.getLogger(__name__)


class QuickLinkViewSet(ModelViewSet):
    queryset = QuickLink.objects.all()
    serializer_class = QuickLinkSerializer
    filter_class = QuickLinkFilter


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CustomCategorySerializer


class HistoryRecordViewSet(ModelViewSet):
    queryset = HistoryRecord.objects.all()
    filter_class = HistoryFilter

    def get_serializer_class(self):
        method = self.request.method
        if method == 'GET':
            return HistoryRecordGETSerializer
        else:
            return HistoryRecordPOSTSerializer

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

class FavoriteViewSet(ModelViewSet):
    queryset = Favorite.objects.all()
    filter_class = FavoriteFilter

    def list(self, request):
        user = self.request.user
        queryset = Favorite.objects.filter(user=user)
        if queryset:
           tmp = []
           for t in queryset:
             a = {
               'id': t.track.id,
               'title': t.track.title,
               'subtitle': t.track.subtitle,
               'description': t.track.description,
               'url': t.track.track.url,
               'thumbnail': t.track.thumbnail.url,
               'small_thumbnail': t.track.small_thumbnail.url,
               'duration': t.track.track_duration,
               'intro_duration': t.track.intro_duration,
               'created': t.track.created,
               'order': t.track.order,
               'artist': t.track.artist,
               'is_premium': t.track.is_premium,
               'favorite': None,
               'history': None,
             }
             fav = Favorite.objects.filter(track=t.track, user=user).first()
             if fav:
               b = {
                 "id": fav.id,
                 "status": True

               }
             else:
               b = {
                 "status": False
               }

             a['favorite'] = b

             hist = HistoryRecord.objects.filter(track=t.track, user=user).first()
             if hist:
               h = {
                 "id": hist.id,
                 "is_finished": hist.is_finished,
                 "stopped_at": hist.stopped_at,
                 "status": True

               }
             else:
               h = {
                 "status": False
               }

             a['history'] = h
             tmp.append(a)

        else:
          tmp = {
            'message': 'Nothing favored yet.'
          }
        return Response(tmp)


    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_serializer_class(self):
        method = self.request.method
        if method == 'GET':
            return FavoriteGETSerializer
        else:
            return FavoritePOSTSerializer


class SportViewSet(ModelViewSet):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer

## Team List/Patch/Delete

class TeamList(APIView):

  def get_object(self, pk):
    try:
      return TeamMembers.objects.get(pk=pk)
    except TeamMembers.DoesNotExist:
      raise Http404

  def get(self, request, format=None):
    user = self.request.user
    getTeam = TeamMembers.objects.filter(user=user)
    if getTeam:
      query = TeamMembers.objects.filter(team=getTeam[0].team)
      serialize = TeamMembersSerializer(query, many=True)
      tmp = serialize.data

    else:
      tmp = {
        'error': 'User has no team.',
      }

    return Response(tmp)

  def delete(self, request, pk, format=None):
    member = self.get_object(pk)
    member.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

  def patch(self, request, pk, format=None):
    member = self.get_object(pk)
    serializer = TeamMembersSerializer(member, data=request.data, partial=True)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Team Chat - Messages / POST

class TeamChat(APIView):

  def get(self, request, format=None):
    user = self.request.user
    getTeam = TeamMembers.objects.filter(user=user)

    if getTeam:
      query = TeamChatMessage.objects.filter(team=getTeam[0].team)
      if query:
        serialize = TeamChatMessageGETSerializer(query, many=True)
        lastSeen = LastSeen.objects.filter(user=user).first()
        lastMessage = TeamChatMessage.objects.filter(team=getTeam[0].team).first()
        if lastSeen:
          serializeLastSeen = LastSeenSerializer(lastSeen, many=False)
          tmp = {
            'last_seen_message_id': serializeLastSeen.data['message'],
            'messages': serialize.data
          }

          newData = {
            'message': lastMessage.id,
            'user': user.id
          }
          serializerNewLastSeen = LastSeenSerializer(lastSeen, data=newData)
          if serializerNewLastSeen.is_valid():
            serializerNewLastSeen.save()
          else:
            return Response(serializerNewLastSeen.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
          tmp = {
            'last_seen_message_id': None,
            'messages': serialize.data
          }

          newData = {
            'message': lastMessage.id,
            'user': user.id
          }
          serializerNewLastSeen = LastSeenSerializer(data=newData)
          if serializerNewLastSeen.is_valid():
            serializerNewLastSeen.save()
          else:
            return Response(serializerNewLastSeen.errors, status=status.HTTP_400_BAD_REQUEST)

      else:
        tmp = {
          'No messages.'
        }
    else:
      tmp = {
        'error': 'User has no team.',
      }

    return Response(tmp)

  def post(self, request, format=None):
    getUser = self.request.user
    getTeam = TeamMembers.objects.filter(user=getUser).first()
    if getTeam:
      team = TeamMembersSerializer(getTeam, many=False)
      user = UserSerializer(getUser, many=False)
      newData = {
        'text': request.data['text'],
        'team': team.data['team'],
        'user': user.data['id']
      }
      serializer = TeamChatMessagePOSTSerializer(data=newData)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      tmp = {
        'error': 'User has no team.'
      }
      return Response(tmp)

### End Team Chat

## Team Code ###

class TeamCode(APIView):

  def post(self, request, format=None):
    getUser = self.request.user
    code = request.data['code']
    getCode = Code.objects.filter(code=code).first()

    if getCode:
      user = UserSerializer(getUser)
      serializer = CodeSerializer(getCode, many=False)
      d1 = date.today()

      # Classic CODE
      if getCode.type == 'CODE':
        if datetime.strptime(serializer.data['expire_at'], '%Y-%m-%d') >= datetime.today():

          d2 = d1 + relativedelta(days=int(serializer.data['grant_premium_for_days']))

          newData = {
            'premium_to': d2
          }
          updateUser = UserSerializer(getUser, data=newData, partial=True)
          if updateUser.is_valid():
            updateUser.save()
          tmp = {
            'message': 'You have been updated to premium user for additional ' + str(serializer.data[
              'grant_premium_for_days']) + ' days(s).',
          }
        else:
          tmp = {
            'error': 'Expired code.'
          }
      # END Classic CODE

      # Licence Logic
      if getCode.type == 'LICENCE':
        if serializer.data['used_by'] is None:

          d2 = d1 + relativedelta(days=int(serializer.data['grant_premium_for_days']))

          newData = { 'premium_to': d2 }
          updateUser = UserSerializer(getUser, data=newData, partial=True)
          if updateUser.is_valid():
            updateUser.save()

          newDataCode = { 'used_by': user.data['id'] }
          updateCode = CodeSerializer(getCode, data=newDataCode, partial=True)
          if updateCode.is_valid():
            updateCode.save()


          tmp = {
            'message': 'You have been updated to premium user for additional ' + str(serializer.data[
              'grant_premium_for_days']) + ' day(s).',
          }
        else:
          tmp = {
            'error': 'Code has already been used.'
          }
      # END Licence Logic

      # Custom Code Logic #

      if getCode.type == 'CUSTOM_CODE':

        countUsed = CustomCodeUsed.objects.filter(custom_code=getCode).count()
        if countUsed >= serializer.data['users_limit']:
          tmp = {
            'error': 'This code has exceeded its limit.'
          }
        elif datetime.strptime(serializer.data['expire_at'], '%Y-%m-%d') < datetime.today():
          tmp = {
            'error': 'Expired code.'
          }
        else:

          newData = {'user': getUser.id, 'custom_code': getCode.id}
          updateCode = CustomCodeUsedSerializer(data=newData)
          if updateCode.is_valid():
            updateCode.save()
          else:
            tmp = {
              'errors': updateCode.errors
            }
            return Response(tmp)

          d2 = d1 + relativedelta(days=int(serializer.data['grant_premium_for_days']))

          newData = {'premium_to': d2}
          updateUser = UserSerializer(getUser, data=newData, partial=True)
          if updateUser.is_valid():
            updateUser.save()

          tmp = {
            'message': 'You have been updated to premium user for additional ' + str(serializer.data[
              'grant_premium_for_days']) + ' day(s).',
          }

      # Team Code Logic
      if getCode.type == 'TEAM':
        userTeam = TeamMembers.objects.filter(user=getUser)
        if userTeam:
          tmp = {
            'error': 'You already have a team.'
          }
          return Response(tmp)

        getTeam = Team.objects.filter(id=getCode.team_id).first()
        team = TeamSerializer(getTeam)

        # # Team With Grant Premium
        if team.data['grant_premium'] and team.data['members_count'] < team.data['grant_premium_users_limit']:

          premiumDate = user.data['premium_to']

          if not premiumDate:
            d2 = team.data['grant_premium_to']
          elif datetime.strptime(premiumDate, "%Y-%m-%d").date() < datetime.strptime(team.data['grant_premium_to'], "%Y-%m-%d").date():
            d2 = team.data['grant_premium_to']
          elif datetime.strptime(premiumDate, "%Y-%m-%d").date() > datetime.strptime(team.data['grant_premium_to'], "%Y-%m-%d").date():
            d2 = premiumDate

          newData = {
            'premium_to': d2
          }
          updateUser = UserSerializer(getUser, data=newData, partial=True)
          if updateUser.is_valid():
            updateUser.save()
          else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

          newTeamData = {
            'user': user.data['id'],
            'team': team.data['id'],
            'role': 'Member'
          }

          serializerTeam = TeamMembersPOSTSerializer(data=newTeamData)
          if serializerTeam.is_valid():
            serializerTeam.save()
          else:
            return Response(serializerTeam.errors, status=status.HTTP_400_BAD_REQUEST)

          tmp = {
            'message': 'You have been added to the team and updated to premium user to ' + str(team.data[
              'grant_premium_to']),
            'team': serializerTeam.data
          }

        # # Team Without Grant Premium
        else:
          newTeamData = {
            'user': user.data['id'],
            'team': team.data['id'],
            'role': 'Member'
          }

          serializerTeam = TeamMembersPOSTSerializer(data=newTeamData)
          if serializerTeam.is_valid():
            serializerTeam.save()
          else:
            return Response(serializerTeam.errors, status=status.HTTP_400_BAD_REQUEST)

          tmp = {
            'message': 'You have been added to the team!'
          }
      # END Team Code Logic

    else:
      tmp = {
        'error': 'Wrong code, please try again.'
      }

    return Response(tmp)

## Team Code ##

## Challenge Files ##

class ChallengeFilesApi(APIView):

  def get(self, request, format=None):
    getUser = self.request.user
    getTeam = TeamMembers.objects.filter(user=getUser).first()
    if getTeam:
      selected = SelectedChallenge.objects.filter(team=getTeam.team).last()
      if selected:
        files = ChallengeFile.objects.filter(challenge=selected.challenge).all()
        serializer = ChallengeFileSerializer(files, many=True)
        return Response(serializer.data)
      else:
        tmp = {
          'message': 'You have not selected challenge.'
        }
        return Response(tmp)
    else:
      tmp = {
        'message': 'You have not team.'
      }
      return Response(tmp)


## Team Challanges ##

class ChallangesApi(APIView):

  def get(self, request, format=None):
    query = Challenge.objects.all()
    data = []
    if query:
      for q in query:
        challenge = ChallengeSerializer(q)
        tasks = ChallengeTasks.objects.filter(challenge=challenge.data['id'])
        tasksSerlizer = ChallengeTasksSerializer(tasks, many=True)
        tmp = {
          'challenge': challenge.data,
          'tasks': tasksSerlizer.data
        }
        data.append(tmp)
    else:
      tmp = {
        'error': 'There are no challenges.',
      }

    return Response(data)

class SelectedChallengeApi(APIView):

  def get_object(self, pk):
    try:
      return SelectedChallenge.objects.get(pk=pk)
    except SelectedChallenge.DoesNotExist:
      raise Http404

  def get(self, request, format=None):
    getUser = self.request.user
    getTeam = TeamMembers.objects.filter(user=getUser).first()
    if getTeam:
      team = TeamMembersSerializer(getTeam)
      selected = SelectedChallenge.objects.filter(team=team.data['team']).last()

      if selected:
        serialize = SelectedChallengeGETSerializer(selected)

        if selected.start_date:
          delta = date.today() - selected.start_date
          weeks = delta.days / 7
          currentWeek = round(weeks) + 1

          tmp = {
            'data': serialize.data,
            'current-week': currentWeek,
            'tasks_by_week': {}
          }

        else:
          tmp = {
            'data': serialize.data,
            'current-week': 0,
            'tasks_by_week': {}
          }

        totalWeeks = range(int(selected.challenge.weeks))
        totalTypes = range(6)
        for w in totalWeeks:
          w = w + 1
          tmp['tasks_by_week']['week' + str(w)] = {}
          for typ in totalTypes:
            tmp['tasks_by_week']['week' + str(w)][typ] = []
            tasks = ChallengeTasks.objects.filter(challenge=selected.challenge, week=w, type=typ)
            for t in tasks:
              currentTasksSerializer = ChallengeTasksSerializer(t)
              tmp['tasks_by_week']['week' + str(w)][typ].append(currentTasksSerializer.data)

      else:
        tmp = {
          'error': 'You have not selected a challenge.'
        }

    else:
      tmp = {
        'error': 'You have no team.'
      }

    return Response(tmp)

  def post(self, request, format=None):
    getUser = self.request.user
    getTeam = TeamMembers.objects.filter(user=getUser).first()
    if getTeam:
      team = TeamMembersSerializer(getTeam)
      newData = {
        'team': team.data['team'],
        'challenge': request.data['challenge']
      }
      serialize = SelectedChallengeSerializer(data=newData, partial=True)
      if serialize.is_valid():
        serialize.save()
        return Response(serialize.data)
      else:
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

    else:
      tmp = {
        'error': 'You have no team.'
      }
      return Response(tmp)

  def patch(self, request, pk, format=None):
    selected = self.get_object(pk)
    serializer = SelectedChallengeSerializer(selected, data=request.data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Statistic Team Members

class StatisticByTaskApi(APIView):

  def get(self, request, format=None):
    getUser = self.request.user
    getTeam = TeamMembers.objects.filter(user=getUser).first()

    if getTeam:
      getSelected = SelectedChallenge.objects.filter(team=getTeam.team).last()
      if getSelected:
        delta = date.today() - getSelected.start_date
        weeks = delta.days / 7
        currentWeek = round(weeks) + 1
        if 'week' in request.query_params:
          week = int(request.query_params['week'])
        else:
          week = currentWeek
        # Overall stats
        getTasks = ChallengeTasks.objects.filter(challenge=getSelected.challenge)
        done = 0
        in_progress = 0
        not_started = 0
        totalMembers = 0
        totalTasks = 0
        for t in getTasks:
          task = ChallengeTasksSerializer(t)
          if task.data['task_track']:
            totalTasks = totalTasks + 1

            members = TeamMembers.objects.filter(team=getTeam.team)
            for m in members:
              member = TeamMembersSerializer(m)
              history = HistoryRecord.objects.filter(user=member.data['user']['id'], track=task.data['task_track'], last__gte=getSelected.start_date).first()
              if history:
                if history.is_finished:
                  done = done + 1
                else:
                  in_progress = in_progress + 1
              else:
                not_started = not_started + 1

              totalMembers = totalMembers + 1

        a = {
          'total_members': totalMembers,
          'total_tasks': totalTasks,
          'done': done,
          'in_progress': in_progress,
          'not_started': not_started
        }

        # Weekly Stats
        getTasksWeek = ChallengeTasks.objects.filter(challenge=getSelected.challenge, week=week)
        doneWeek = 0
        in_progressWeek = 0
        not_startedWeek = 0
        totalMembersWeek = 0
        totalTasksWeek = 0

        for t in getTasksWeek:
          task = ChallengeTasksSerializer(t)
          if task.data['task_track']:
            totalTasksWeek = totalTasksWeek + 1

            members = TeamMembers.objects.filter(team=getTeam.team)
            for m in members:
              member = TeamMembersSerializer(m)
              history = HistoryRecord.objects.filter(user=member.data['user']['id'], track=task.data['task_track'],
                                                     last__gte=getSelected.start_date).first()
              if history:
                if history.is_finished:
                  doneWeek = doneWeek + 1
                else:
                  in_progressWeek = in_progressWeek + 1
              else:
                not_startedWeek = not_startedWeek + 1

              totalMembersWeek = totalMembersWeek + 1

        b = {
          'total_members': totalMembersWeek,
          'total_tasks': totalTasksWeek,
          'done': doneWeek,
          'in_progress': in_progressWeek,
          'not_started': not_startedWeek
        }

        tmp = {
          'total_progress': a,
          'weekly_progress': b,
          'current_week': currentWeek
        }

      else:
        tmp = {
          'error': 'You have not selected a challenge.'
        }
    else:
      tmp = {
        'error': 'You have no team'
      }

    return Response(tmp)


# End Statistic

class StatisticByMemberApi(APIView):

  def get(self, request, format=None):
    getUser = self.request.user
    getTeam = TeamMembers.objects.filter(user=getUser).first()

    if getTeam:
      getSelected = SelectedChallenge.objects.filter(team=getTeam.team).last()
      if getSelected:
        tmp = []
        delta = date.today() - getSelected.start_date
        weeks = delta.days / 7
        currentWeek = round(weeks) + 1

        if 'week' in request.query_params:
          week = int(request.query_params['week'])
        else:
          week = currentWeek

        # Overall stats
        getTasksOverall = ChallengeTasks.objects.filter(challenge=getSelected.challenge)
        getTasks = ChallengeTasks.objects.filter(challenge=getSelected.challenge, week=week)
        members = TeamMembers.objects.filter(team=getTeam.team)
        for m in members:
          doneOverall = 0
          in_progressOverall = 0
          not_startedOverall = 0
          totalTasksOverall = 0
          member = TeamMembersSerializer(m)

          for t in getTasksOverall:
            task = ChallengeTasksSerializer(t)
            if task.data['task_track']:
              totalTasksOverall = totalTasksOverall + 1

              history = HistoryRecord.objects.filter(user=member.data['user']['id'], track=task.data['task_track'], last__gte=getSelected.start_date).first()

              if history:
                if history.is_finished:
                  doneOverall = doneOverall + 1
                else:
                  in_progressOverall = in_progressOverall + 1
              else:
                not_startedOverall = not_startedOverall + 1

          done = 0
          in_progress = 0
          not_started = 0
          totalTasks = 0

          for t in getTasks:
            task = ChallengeTasksSerializer(t)
            if task.data['task_track']:
              totalTasks = totalTasks + 1

              history = HistoryRecord.objects.filter(user=member.data['user']['id'], track=task.data['task_track'], last__gte=getSelected.start_date).first()

              if history:
                if history.is_finished:
                  done = done + 1
                else:
                  in_progress = in_progress + 1
              else:
                not_started = not_started + 1

          overall = {
            'total_tasks': totalTasksOverall,
            'done': doneOverall,
            'in_progress': in_progressOverall,
            'not_started': not_startedOverall
          }

          weekly = {
            'total_tasks': totalTasks,
            'done': done,
            'in_progress': in_progress,
            'not_started': not_started
          }

          data = {
            'user': member.data,
            'overall': overall,
            'weekly': weekly,
          }

          tmp.append(data)


      else:
        tmp = {
          'error': 'You have not selected a challenge.'
        }
    else:
      tmp = {
        'error': 'You have no team'
      }

    return Response(tmp)

class CoachSurveyQuestionApi(APIView):

  def get(self, request, format=None):
    user = self.request.user
    answer = CoachSurveyAnswer.objects.filter(user=user, question__type=0).first()

    type = request.data['type']
    query = CoachSurveyQuestion.objects.filter(type=type)
    serializer = CoachSurveyQuestionSerializer(query, many=True)

    if answer:
      tmp = {
        'first_time_login_survey': 'finished',
        'questions': serializer.data
      }
    else:
      tmp = {
        'first_time_login_survey': 'unfinished',
        'questions': serializer.data
      }

    return Response(tmp)

  def post(self, request, format=None):
    user = self.request.user
    question = request.data['question']
    answer = request.data['answer']

    newData = {
      'user': user.id,
      'question': question,
      'answer': answer
    }
    serialize = CoachSurveyAnswerSerializer(data=newData)
    if serialize.is_valid():
      serialize.save()
      return Response(serialize.data)
    else:
      return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)



class NotificationViewSet(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = 'https://restoic-app-19339.botics.co/accounts/google/login/callback/'


class AppleLogin(SocialLoginView):
  adapter_class = AppleOAuth2Adapter
  client_class = AppleOAuth2Client
  callback_url = 'https://restoic-app-19339.botics.co/accounts/apple/login/callback/'
