from django.urls import path, include
from .views import home
from home.api.v1.viewsets import GoogleLogin, AppleLogin
from django.conf.urls import url

urlpatterns = [
    path("", home, name="home"),
    url(r'^rest-auth/google/$', GoogleLogin.as_view(), name='google_login'),
    url(r'^rest-auth/apple/$', AppleLogin.as_view(), name='apple-login'),

]
