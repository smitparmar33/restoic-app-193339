from django.db import models
from users.models import User
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from django.db.models import signals
import mutagen
import uuid
from datetime import date

## Tracks with mutagen that will pre_save duration of track ##
class Track(models.Model):
    title = models.CharField(max_length=250)
    subtitle = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    track = models.FileField(upload_to='tracks/')
    thumbnail = models.ImageField(upload_to='thumbnail/', default='default.jpg')
    small_thumbnail = models.ImageField(upload_to='thumbnail/', default='default.jpg')
    track_duration = models.FloatField(null=True, blank=True)
    intro_duration = models.FloatField(default=0.0)
    is_premium = models.BooleanField(default=False)
    artist = models.CharField(max_length=250, null=True, blank=True, default='Restoic')
    created = models.DateTimeField(auto_now_add=True, editable=False)
    order = models.IntegerField(default=0)
    added_by = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Tracks'
        ordering = ('-order',)

    def __str__(self):
        return str(self.title)

    @staticmethod
    def pre_save(sender, instance, **kwargs):
        if instance.track:
            audio_info = mutagen.File(instance.track).info
            instance.track_duration = int(audio_info.length)

pre_save.connect(Track.pre_save, Track, dispatch_uid="home.models.Track")


## History with is_finished and stopped_at feature ##
class HistoryRecord(models.Model):
    track = models.ForeignKey(Track, related_name="track_history", on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    is_finished = models.BooleanField(default=False)
    stopped_at = models.FloatField(null=True, blank=True)
    created = models.DateTimeField(auto_now=True, editable=False)
    last = models.DateField(auto_now=True, editable=True)

    class Meta:
        verbose_name_plural = 'History Records'
        ordering = ('-created',)
        unique_together = ('track', 'user')

    def __str__(self):
        return str(self.user)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        today = date.today()
        trans = HistoryTransaction.objects.filter(history=self, created__date=today)
        if trans:
            return None
        else:
            HistoryTransaction(history=self).save()


class HistoryTransaction(models.Model):
    history = models.ForeignKey(HistoryRecord, related_name="history_transaction", on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        verbose_name_plural = 'History Transactions'
        ordering = ('-created',)

    def __str__(self):
        return str(self.history)

## Categories ##
class Category(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    thumbnail = models.ImageField(upload_to='category/thumbnail/', default='default.jpg')
    small_thumbnail = models.ImageField(upload_to='category/thumbnail/', default='default.jpg')
    created = models.DateTimeField(auto_now_add=True, editable=False)
    added_by = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ('-created',)

    def __str__(self):
        return str(self.title)

## Track Category With Many To Many Relation ##
class TrackCategory(models.Model):
    track = models.ForeignKey(Track, related_name="track_category", on_delete=models.PROTECT)
    category = models.ForeignKey(Category, related_name="tracks_in_category", on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    added_by = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Track Categories'
        ordering = ('-created',)

    def __str__(self):
        return str(self.track)

## Favourites Tracks ##
class Favorite (models.Model):
    track = models.ForeignKey(Track, related_name="track_favorite", on_delete=models.PROTECT)
    user = models.ForeignKey(User, related_name="user_favorite", on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        verbose_name_plural = 'Favorites'
        ordering = ('-created',)
        unique_together = ('track', 'user')

    def __str__(self):
        return str(self.track)

## Quick Links ##
class QuickLink (models.Model):
    track = models.FileField(upload_to='quicklinks/track/')
    title = models.CharField(max_length=250)
    subtitle = models.CharField(max_length=250, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    thumbnail = models.ImageField(upload_to='quicklinks/thumbnail/', default='default.jpg')
    link = models.CharField(max_length=250, null=True, blank=True)
    in_app = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        verbose_name_plural = 'QuickLinks'
        ordering = ('-created',)

    def __str__(self):
        return str(self.title)

### User Profile Settings ###
class Sport (models.Model):
    sport = models.CharField(max_length=250)

    class Meta:
      verbose_name_plural = 'Sports'

    def __str__(self):
      return str(self.sport)


class UserPreference (models.Model):
    user = models.ForeignKey(User, related_name="user_preference", on_delete=models.PROTECT)
    sport = models.ForeignKey(Sport, related_name="user_sport", on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        verbose_name_plural = 'User Preferences'
        ordering = ('-created',)
        unique_together = ('user', 'sport')

    def __str__(self):
        return str(self.user)


# Teams #
class Team(models.Model):

    months = (
      ("0", "0"),
      ("1", "1"),
      ("2", "2"),
      ("3", "3"),
      ("4", "4"),
      ("5", "5"),
      ("6", "6"),
      ("7", "7"),
      ("8", "8"),
      ("9", "9"),
      ("10", "10"),
      ("11", "11"),
      ("12", "12"),
      ("18", "18"),
      ("24", "24"),
      ("36", "36"),
      ("48", "48"),
      ("50", "50"),
    )
    name = models.CharField(max_length=244)
    grant_premium = models.BooleanField(default=False)
    grant_premium_to = models.DateField(null=True, blank=True)
    grant_premium_users_limit = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = 'Teams'

    def __str__(self):
        return str(self.name)

    @staticmethod
    def post_save(sender, instance, **kwargs):
      Code.objects.create(type="TEAM", team=instance)

post_save.connect(Team.post_save, Team, dispatch_uid="home.models.Team")
# END Teams END #

class Code (models.Model):
    types = (
      ("CODE", "CODE"),
      ("LICENCE", "LICENCE"),
      ("TEAM", "TEAM"),
      ("CUSTOM_CODE", "CUSTOM_CODE"),
    )

    code = models.CharField(max_length=244, unique=True, null=True, blank=True)
    type = models.CharField(max_length=225, choices=types, default="CODE")
    grant_premium_for_days = models.IntegerField(default=1)
    expire_at = models.DateField(null=True, blank=True)
    used_by = models.ForeignKey(User, related_name="code_used_by_user", on_delete=models.PROTECT, null=True, blank=True)
    users_limit = models.IntegerField(null=True, blank=True)
    team = models.ForeignKey(Team, related_name="code_team", on_delete=models.PROTECT, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Codes'

    def __str__(self):
        return str(self.code)

    @staticmethod
    def pre_save(sender, instance, **kwargs):
      if instance._state.adding:
        cd = uuid.uuid4().hex[:6].upper()
        if instance.code == '' or instance.code is None:
          instance.code = cd


pre_save.connect(Code.pre_save, Code, dispatch_uid="home.models.Code")

class CustomCodeUsed(models.Model):

  user = models.ForeignKey(User, related_name="user_custom_code", on_delete=models.PROTECT)
  custom_code = models.ForeignKey(Code, related_name="code_used_by_user", on_delete=models.PROTECT)

### User Profile Settings END ###

### Coaches ###

# Team Members #
class TeamMembers(models.Model):
  roles = (
    ("Member", "Member"),
    ("Admin", "Admin"),
    ("Owner", "Owner"),
  )
  user = models.ForeignKey(User, related_name="user_team", on_delete=models.PROTECT, unique=True)
  team = models.ForeignKey(Team, related_name="team_of_user", on_delete=models.PROTECT, null=True, blank=True)
  role = models.CharField(max_length=225, choices=roles, default="Member")

  class Meta:
    verbose_name_plural = 'Team Members'

  def __str__(self):
    return str(self.team)
# END Team Members END #

# Team Chat #
class TeamChatMessage(models.Model):
  user = models.ForeignKey(User, related_name="user_message", on_delete=models.PROTECT, null=True, blank=True)
  team = models.ForeignKey(Team, related_name="team_message", on_delete=models.PROTECT, null=True, blank=True)
  text = models.TextField(null=True, blank=True)
  created = models.DateTimeField(auto_now_add=True, editable=False)

  class Meta:
    ordering = ('-created',)
    verbose_name_plural = 'Team Chat Messages'

  def __str__(self):
    return str(self.team)

  def save(self, *args, **kwargs):
    super().save(*args, **kwargs)
    title = 'New Message'
    text = str(self.user.first_name) + ' ' + str(self.user.last_name) + ' sent new message in team chat.'
    getMembers = TeamMembers.objects.filter(team=self.team)
    for member in getMembers:
      if member.user != self.user:
        Notification(title=title, text=text, seen=False, user=member.user).save()

# END Team Chat END #

# Notifications #

class Notification(models.Model):
  title = models.CharField(max_length=244)
  text = models.TextField(null=True, blank=True)
  seen = models.BooleanField(default=False)
  user = models.ForeignKey(User, related_name='users_notifications', on_delete=models.PROTECT, null=True, blank=True)
  created = models.DateTimeField(auto_now_add=True, editable=False)

# End Notifications #

# Last Seen #
class LastSeen(models.Model):
  user = models.ForeignKey(User, related_name="user_last_seen", on_delete=models.PROTECT, null=True, blank=True)
  message = models.ForeignKey(TeamChatMessage, related_name="message_last_seen", on_delete=models.PROTECT, null=True, blank=True)

  class Meta:
    verbose_name_plural = 'Last Seen Message'

  def __str__(self):
    return str(self.user)
# END Last Seen END #

# Challenge #
class Challenge(models.Model):
  week = (
    ("4", "4"),
    ("8", "8"),
    ("12", "12"),
  )

  name = models.CharField(max_length=244)
  weeks = models.CharField(max_length=225, choices=week, default="4")

  class Meta:
    verbose_name_plural = 'Challenges'

  def __str__(self):
    return str(self.name)
# END Challenge END #

# Challenge Tasks#
class ChallengeTasks(models.Model):
  week = (
    ("1", "1"),
    ("2", "2"),
    ("3", "3"),
    ("4", "4"),
    ("5", "5"),
    ("6", "6"),
    ("7", "7"),
    ("8", "8"),
    ("9", "9"),
    ("10", "10"),
    ("11", "11"),
    ("12", "12"),
  )

  type = (
    ("0", "Listen Task"),
    ("1", "Homework Taks"),
    ("2", "Weekly Taks"),
    ("3", "Print and provide"),
    ("4", "Team Activity"),
    ("5", "Team Discussion"),
  )

  challenge = models.ForeignKey(Challenge, related_name="challenge_tasks", on_delete=models.PROTECT, null=True, blank=True)
  week = models.CharField(max_length=225, choices=week, default="1")
  task_title = models.CharField(max_length=244)
  task = models.TextField(null=True, blank=True)
  type = models.TextField(max_length=225, choices=type, default="0")
  task_track = models.ForeignKey(Track, related_name="task_track", on_delete=models.PROTECT, null=True, blank=True)
  print_and_provide = models.FileField(upload_to='provide/', null=True, blank=True)

  class Meta:
    verbose_name_plural = 'Challenge Tasks'

  def __str__(self):
    return str(self.challenge)
# END Challenge Tasks END #

# Selected Challenge #
class SelectedChallenge(models.Model):

  challenge = models.ForeignKey(Challenge, related_name="selected_challenge", on_delete=models.PROTECT, null=True, blank=True)
  team = models.ForeignKey(Team, related_name="selected_challenge_team", on_delete=models.PROTECT, null=True, blank=True)
  start_date = models.DateField(null=True, blank=True)

  class Meta:
    verbose_name_plural = 'Selected Challenge'

  def __str__(self):
    return str(self.challenge)
# END Selected Challenge END #

# Coach Surveys #
class CoachSurveyQuestion(models.Model):
  surveyType = (
    ("0", "First Time Log In"),
    ("1", "Challenge End"),
  )

  question = models.TextField(null=True, blank=True)
  type = models.CharField(max_length=225, choices=surveyType, default="1")

class CoachSurveyAnswer(models.Model):
  answers = (
    ("1", "Strongly Disagree"),
    ("2", "Disagree"),
    ("3", "Neutral"),
    ("4", "Agree"),
    ("5", "Strongly Agree"),
  )

  question = models.ForeignKey(CoachSurveyQuestion, related_name="question_answer", on_delete=models.PROTECT)
  user = models.ForeignKey(User, related_name="user_answer", on_delete=models.PROTECT)
  answer = models.CharField(max_length=225, choices=answers)
# END Coach Surveys #

# Challange Downloads
class ChallengeFile(models.Model):
  week = (
    ("1", "1"),
    ("2", "2"),
    ("3", "3"),
    ("4", "4"),
    ("5", "5"),
    ("6", "6"),
    ("7", "7"),
    ("8", "8"),
    ("9", "9"),
    ("10", "10"),
    ("11", "11"),
    ("12", "12"),
  )

  challenge = models.ForeignKey(Challenge, related_name="challenge_download", on_delete=models.PROTECT, null=True,
                                blank=True)
  week = models.CharField(max_length=225, choices=week, default="1")
  title = models.CharField(max_length=244)
  file = models.FileField(upload_to='challenge-download/', null=True, blank=True)
  is_bulk = models.BooleanField(default=False)

  ### END Coaches END ###

class CustomText(models.Model):
    title = models.CharField(max_length=150)

    def __str__(self):
        return self.title

    @property
    def api(self):
        return f'/api/v1/customtext/{self.id}/'

    @property
    def field(self):
        return 'title'


class HomePage(models.Model):
    body = models.TextField()

    @property
    def api(self):
        return f'/api/v1/homepage/{self.id}/'

    @property
    def field(self):
        return 'body'
