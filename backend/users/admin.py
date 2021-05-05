from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("email", "first_name", "last_name", "competition", "image", "premium_to", "is_coach",)}),)
    add_fieldsets = (
      (None, {
        'classes': ('wide',),
        'fields': ('email', 'password1', 'password2', 'is_coach', 'first_name', 'last_name')}
       ),
    )
    list_display = ["email", "first_name","last_name", "is_superuser"]
    search_fields = ["email"]
