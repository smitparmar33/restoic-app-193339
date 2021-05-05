from django.contrib import admin
from .models import *

class TrackAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'track_duration', 'intro_duration', 'created')
    list_filter = ['title', 'subtitle' ]
    search_fields = ('title',)

admin.site.register(Track, TrackAdmin)

class HistoryAdmin(admin.ModelAdmin):
    list_display = ('track', 'user', 'created')
    list_filter = ('track', 'user', 'created')
    search_fields = ('user', )

admin.site.register(HistoryRecord, HistoryAdmin)

class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('track', 'user', 'created')
    list_filter = ('track', 'created')
    search_fields = ('track', 'user', )

admin.site.register(Favorite, FavoriteAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'created')
    list_filter = ('title', 'created')
    search_fields = ('title', )

admin.site.register(Category, CategoryAdmin)

class TrackCategoryAdmin(admin.ModelAdmin):
    list_display = ('track', 'category')
    list_filter = ('track', 'category')
    search_fields = ('track', 'category')

admin.site.register(TrackCategory, TrackCategoryAdmin)

class QuickLinkAdmin(admin.ModelAdmin):
    list_display = ('title', 'link')
    list_filter = ('link', 'title')
    search_fields = ('link', 'title')

admin.site.register(QuickLink, QuickLinkAdmin)

class SportAdmin(admin.ModelAdmin):
    list_display = ('sport',)
    list_filter = ('sport', )
    search_fields = ('sport',)

admin.site.register(Sport, SportAdmin)


class UserPreferenceAdmin(admin.ModelAdmin):
    list_display = ('user', 'sport', )
    list_filter = ('user', 'sport', )
    search_fields = ('user', 'sport', )

admin.site.register(UserPreference, UserPreferenceAdmin)


class CodeAdmin(admin.ModelAdmin):
  list_display = ('code', 'type', 'expire_at', 'used_by')
  list_filter = ('code', 'type',)
  search_fields = ('code', 'type',)

admin.site.register(Code, CodeAdmin)

class CustomCodeUsedAdmin(admin.ModelAdmin):
  list_display = ('custom_code', 'user')
  list_filter = ('custom_code', 'user')
  search_fields = ('custom_code', 'user')

admin.site.register(CustomCodeUsed, CustomCodeUsedAdmin)

class TeamAdmin(admin.ModelAdmin):
  list_display = ('name', 'grant_premium', 'grant_premium_to', 'grant_premium_users_limit')
  list_filter = ('name', 'grant_premium')
  search_fields = ('name', 'user',)

admin.site.register(Team, TeamAdmin)


class TeamMembersAdmin(admin.ModelAdmin):
  list_display = ('user', 'role', 'team')
  list_filter = ('user', 'role', 'team')
  search_fields = ('team', 'user',)

admin.site.register(TeamMembers, TeamMembersAdmin)


class TeamChatMessageAdmin(admin.ModelAdmin):
  list_display = ('user', 'team', 'text')
  list_filter = ('user', 'team', 'text')
  search_fields = ('team', 'user',)

admin.site.register(TeamChatMessage, TeamChatMessageAdmin)


class ChallengeAdmin(admin.ModelAdmin):
  list_display = ('name',)
  list_filter = ('name',)
  search_fields = ('name',)

admin.site.register(Challenge, ChallengeAdmin)


class ChallengeTasksAdmin(admin.ModelAdmin):
  list_display = ('challenge', 'week', 'task_title', 'task')
  list_filter = ('challenge',)
  search_fields = ('challenge',)

admin.site.register(ChallengeTasks, ChallengeTasksAdmin)


class SelectedChallengeAdmin(admin.ModelAdmin):
  list_display = ('challenge', 'team', 'start_date',)
  list_filter = ('challenge', 'team')
  search_fields = ('challenge', 'team')

admin.site.register(SelectedChallenge, SelectedChallengeAdmin)

class NotificationAdmin(admin.ModelAdmin):
  list_display = ('title', 'text', 'user', 'created', )
  list_filter = ('title', 'user')
  search_fields = ('user', 'title')

admin.site.register(Notification, NotificationAdmin)

class CoachSurveyQuestionAdmin(admin.ModelAdmin):
  list_display = ('question', 'type')
  list_filter = ('question', 'type')
  search_fields = ('question', 'question')

admin.site.register(CoachSurveyQuestion, CoachSurveyQuestionAdmin)

class ChallengeFileAdmin(admin.ModelAdmin):
  list_display = ('challenge', 'week', 'title')
  list_filter = ('challenge', 'week', 'title')
  search_fields = ('challenge', 'week', 'title')

admin.site.register(ChallengeFile, ChallengeFileAdmin)

class CoachSurveyAnswerAdmin(admin.ModelAdmin):
  list_display = ('get_question', 'get_type', 'user', 'answer')

  def get_question(self, obj):
    return obj.question.question
  get_question.admin_order_field  = 'question'
  get_question.short_description = 'Question'

  def get_type(self, obj):
    return obj.question.get_type_display()
  get_type.admin_order_field  = 'Type'
  get_type.short_description = 'Type'

  list_filter = ('question', 'user', 'answer')
  search_fields = ('question', 'user', 'answer')

admin.site.register(CoachSurveyAnswer, CoachSurveyAnswerAdmin)
