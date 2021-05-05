from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import pre_save
import uuid

class UserManager(BaseUserManager):

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            email=self.normalize_email(email)
        )
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    image = models.ImageField(upload_to='users/images/', default='default.jpg')
    COMPETITION_LEVEL = (
      ("0", "Choose Competition Level"),
      ("1", "High School"),
      ("2", "College"),
      ("3", "Professional"),
      ("4", "Recreational"),
      ("5", "Other"),
    )
    competition = models.CharField(max_length=225, choices=COMPETITION_LEVEL, default="0")
    username = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(_('email address'), unique=True)
    is_coach = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    premium_to = models.DateField(null=True, blank=True)
    REQUIRED_FIELDS = []

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"id": self.id})

    objects = UserManager()

    @staticmethod
    def pre_save(sender, instance, **kwargs):
      cd = uuid.uuid4().hex[:6].upper()
      instance.username = instance.email.split('@')[0] + cd

pre_save.connect(User.pre_save, User, dispatch_uid="users.models.User")
