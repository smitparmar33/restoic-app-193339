from django.urls import path, include
from rest_framework.routers import DefaultRouter
from fcm_django.api.rest_framework import FCMDeviceViewSet

from home.api.v1.viewsets import (
    # Mobile App
    HistoryRecordViewSet,
    CategoryViewSet,
    FavoriteViewSet,
    QuickLinkViewSet,
    SportViewSet,
    # Coaching Dashboard and Teams
    TeamList,
    TeamChat,
    TeamCode,
    ChallangesApi,
    SelectedChallengeApi,
    StatisticByTaskApi,
    StatisticByMemberApi,
    CoachSurveyQuestionApi,
    ChallengeFilesApi,
    # Other
    NotificationViewSet,
)

router = DefaultRouter()
router.register("history", HistoryRecordViewSet)
router.register("categories", CategoryViewSet)
router.register("favorites", FavoriteViewSet)
router.register("quick-links", QuickLinkViewSet)
router.register("sports", SportViewSet)
router.register(r'devices', FCMDeviceViewSet)
router.register("notifications", NotificationViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("team-members", TeamList.as_view()),
    path("team-members/<int:pk>/", TeamList.as_view()),
    path("team-chat", TeamChat.as_view()),
    path("code", TeamCode.as_view()),
    path("challenges", ChallangesApi.as_view()),
    path("selected-challenge", SelectedChallengeApi.as_view()),
    path("selected-challenge/<int:pk>/", SelectedChallengeApi.as_view()),
    path("statistic-task", StatisticByTaskApi.as_view()),
    path("statistic-member", StatisticByMemberApi.as_view()),
    path("coach-survey", CoachSurveyQuestionApi.as_view()),
    path("challenge-files", ChallengeFilesApi.as_view())
]
