from datetime import timedelta
from datetime import date

from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from rest_framework.authtoken.models import Token

from home.models import CoachSurveyAnswer, CoachSurveyQuestion, Notification, ChallengeFile, HomePage, Track, HistoryRecord, Category, TrackCategory, Favorite, QuickLink, UserPreference, Sport, HistoryTransaction, Code, CustomCodeUsed, Team, TeamMembers, TeamChatMessage, Challenge, ChallengeTasks, SelectedChallenge, LastSeen

User = get_user_model()

class UserFilter(serializers.ListSerializer):

    def to_representation(self, data):
        if self.context['request'].user:
            userParam = self.context['request'].user
        else:
            userParam = 0

        data = data.filter(user=userParam)
        return super().to_representation(data)


class TrackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Track
        fields = ('id', 'title', 'subtitle', 'track', 'thumbnail', 'track_duration', 'intro_duration', 'created', 'order', 'artist')

class HistoryRecordGETSerializer(serializers.ModelSerializer):

    class Meta:
        model = HistoryRecord
        fields = ('id', 'is_finished', 'stopped_at', 'created', 'track')
        depth = 1
        list_serializer_class = UserFilter


class HistoryRecordPOSTSerializer(serializers.ModelSerializer):

    class Meta:
        model = HistoryRecord
        fields = ('id', 'is_finished', 'stopped_at', 'created', 'track', 'last')

    def create(self, validated_data):
        gettrack = validated_data['track']
        stopped_at = validated_data['stopped_at']
        is_finished = validated_data['is_finished']

        hist = HistoryRecord.objects.filter(user=self.context['request'].user, track=gettrack).first()

        if hist:
            HistoryRecord.objects.filter(user=self.context['request'].user, track=gettrack).update(stopped_at=stopped_at, is_finished=is_finished, last=date.today())
            return hist
        else:
            new = HistoryRecord(
                user=self.context['request'].user,
                track=gettrack,
                stopped_at=stopped_at,
                is_finished=is_finished
            )
            new.save()
            return new



class FavoritePOSTSerializer(serializers.ModelSerializer):
    track_details = serializers.SerializerMethodField('get_track_details')

    class Meta:
        model = Favorite
        fields = ('id', 'track', 'track_details')

    def get_track_details(self, obj):
        track = Track.objects.filter(id=obj.track.id).first()
        a = {
          'id': track.id,
          'title': track.title,
          'subtitle': track.subtitle,
          'description': track.description,
          'url': track.track.url,
          'thumbnail': track.thumbnail.url,
          'small_thumbnail': track.small_thumbnail.url,
          'duration': track.track_duration,
          'intro_duration': track.intro_duration,
          'created': track.created,
          'order': track.order,
          'artist': track.artist,
          'is_premium': track.is_premium,
          'favorite': None,
          'history': None,
        }
        fav = Favorite.objects.filter(track=track.id, user=self.context['request'].user).first()
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
        hist = HistoryRecord.objects.filter(track=track.id, user=self.context['request'].user).first()
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
        return a

    def create(self, validated_data):
        gettrack = validated_data['track']
        fav = Favorite.objects.filter(user=self.context['request'].user, track=gettrack).first()

        if fav:
            fav.delete()
            return fav
        else:
            new = Favorite(
                user=self.context['request'].user,
                track=gettrack,
            )
            new.save()
            return new


class FavoriteGETSerializer(serializers.ModelSerializer):
    track = TrackSerializer()

    class Meta:
        model = Favorite
        fields = ('id', 'created', 'track')


class QuickLinkSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuickLink
        fields = '__all__'


class ChallengeFileSerializer(serializers.ModelSerializer):
  class Meta:
    model = ChallengeFile
    fields = '__all__'

class CustomCategorySerializer(serializers.ModelSerializer):
    tracks = serializers.SerializerMethodField('get_tracks')

    def get_tracks(self, obj):
        user = self.context['request'].user
        catracks = TrackCategory.objects.filter(category=obj.id)

        tmp = []
        for t in catracks:
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
                'is_premium':  t.track.is_premium,
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

        return tmp

    class Meta:
        model = Category
        fields = ('id', 'title', 'description', 'thumbnail', 'small_thumbnail', 'tracks')


class CodeSerializer(serializers.ModelSerializer):

    class Meta:
      model = Code
      fields = ('code', 'type', 'grant_premium_for_days', 'users_limit', 'expire_at', 'used_by')


class CustomCodeUsedSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomCodeUsed
    fields = ('custom_code', 'user')

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this email address."))
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
        )
        user.set_password(validated_data.get('password'))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()

class SportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sport
        fields = '__all__'


class UserPreferencesGETSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserPreference
        fields = ('id', 'sport',)
        depth = 1
        list_serializer_class = UserFilter


class UserPreferencesPOSTSerializer(serializers.ModelSerializer):
    class Meta:
      model = UserPreference
      fields = ('sport',)


class UserDetailSerializer(serializers.ModelSerializer):
    streak = serializers.SerializerMethodField('get_streak')
    sports = serializers.SerializerMethodField('get_sports')
    foo = serializers.CharField(write_only=True)

    def get_sports(self, obj):
      user = self.context['request'].user
      prefs = UserPreference.objects.filter(user=user)
      tmp = []

      for p in prefs:
        tmp.append(p.sport.id)

      return tmp

    def get_streak(self, obj):
        user = self.context['request'].user
        trans = HistoryTransaction.objects.filter(history__user=user).last()

        count = 0
        streaks = []

        if trans:
          d1 = trans.created.date()
          d2 = date.today() + timedelta(days=1)
          dd = [d1 + timedelta(days=x) for x in range((d2 - d1).days + 1)]

          for d in dd:
              n = HistoryTransaction.objects.filter(history__user=user, created__date=d)
              if n:
                  count = count + 1
              else:
                  streaks.append(count)
                  count = 0

          tmp = {
              'current': streaks[-1],
              'highest': max(streaks)
          }

        else:
            tmp = {
                'current': 0,
                'highest': 0
            }

        return tmp

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'image', 'competition', 'sports', 'premium_to', 'is_coach', 'date_joined', 'streak', 'foo')

    def update(self, instance, validated_data):
      instance.first_name = validated_data.get('first_name', instance.first_name)
      instance.last_name = validated_data.get('last_name', instance.last_name)
      instance.email = validated_data.get('email', instance.email)
      instance.competition = validated_data.get('competition', instance.competition)
      instance.premium_to = validated_data.get('premium_to', instance.premium_to)
      instance.is_coach = validated_data.get('is_coach', instance.is_coach)
      if validated_data.get('image'):
        instance.image = validated_data.get('image', instance.image)
        instance.image.save(validated_data.get('image', instance.image).name,
                            validated_data.get('image', instance.image))
      if validated_data.get('foo'):
        userSports = UserPreference.objects.filter(user=self.data['id'])
        if userSports:
          for s in userSports:
            s.delete()

        newSports = validated_data.get('foo').split(',')
        for n in newSports:
          new = UserPreference(
            user_id=self.data['id'],
            sport_id=n
          )
          new.save()

      instance.save()

      return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'image', 'premium_to', 'is_coach']



class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm

### Coaches ###

class TeamSerializer(serializers.ModelSerializer):
  members_count = serializers.SerializerMethodField('get_members_count')


  def get_members_count(self, obj):
    members = TeamMembers.objects.filter(team=obj.id)
    count = 0
    for m in members:
      count = count + 1
    return count

  class Meta:
    model = Team
    fields = ('id', 'name', 'grant_premium', 'grant_premium_to', 'grant_premium_users_limit', 'members_count')

class TeamMembersSerializer(serializers.ModelSerializer):
  user = UserSerializer()

  class Meta:
    model = TeamMembers
    fields = ('id', 'user', 'team', 'role')


class TeamMembersPOSTSerializer(serializers.ModelSerializer):

  class Meta:
    model = TeamMembers
    fields = ('id', 'user', 'team', 'role')

class TeamChatMessageGETSerializer(serializers.ModelSerializer):
  user = UserSerializer()

  class Meta:
    model = TeamChatMessage
    fields = ('id', 'user', 'team', 'text', 'created')


class TeamChatMessagePOSTSerializer(serializers.ModelSerializer):

  class Meta:
    model = TeamChatMessage
    fields = ('id', 'user', 'team', 'text', 'created')

class LastSeenSerializer(serializers.ModelSerializer):

  class Meta:
    model = LastSeen
    fields = ('id', 'user', 'message')

class ChallengeSerializer(serializers.ModelSerializer):

  class Meta:
    model = Challenge
    fields = ('id', 'name', 'weeks')

class ChallengeTasksSerializer(serializers.ModelSerializer):
  type_name = serializers.SerializerMethodField()

  class Meta:
    model = ChallengeTasks
    fields = ('id', 'task_title', 'week', 'task', 'type', 'type_name', 'task_track', 'print_and_provide', 'challenge')

  def get_type_name(self, obj):
    return obj.get_type_display()

class SelectedChallengeGETSerializer(serializers.ModelSerializer):

  class Meta:
    model = SelectedChallenge
    depth = 1
    fields = ('id', 'challenge', 'start_date')

class SelectedChallengeSerializer(serializers.ModelSerializer):

  class Meta:
    model = SelectedChallenge
    fields = ('challenge', 'team', 'start_date')

class CoachSurveyQuestionSerializer(serializers.ModelSerializer):

  class Meta:
    model = CoachSurveyQuestion
    fields = ('id', 'question', 'type')

class CoachSurveyAnswerSerializer(serializers.ModelSerializer):

  class Meta:
    model = CoachSurveyAnswer
    fields = ('id', 'user', 'question', 'answer')

### END Coaches END ###

class NotificationSerializer(serializers.ModelSerializer):

  class Meta:
    model = Notification
    fields = ('id', 'title', 'text', 'user', 'created')
    list_serializer_class = UserFilter

class TokenSerializer(serializers.ModelSerializer):
  user = UserSerializer(many=False, read_only=True)

  class Meta:
    model = Token
    fields = ('key', 'user')
