from django.contrib import admin
from account.models import User, Keyword, OTP, Project
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
  
  list_display = ('id', 'email', 'name', 'tc', 'is_admin')
  list_filter = ('is_admin', )
  fieldsets = (
      ('User Credentials', {'fields': ('email', 'password')}),
      ('Personal info', {'fields': ('name', 'tc')}),
      ('Permissions', {'fields': ('is_admin',)}),
  )

  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'name', 'tc', 'password1', 'password2'),
      }),
  )
  search_fields = ('email',)
  ordering = ('email', 'id')
  filter_horizontal = ()


admin.site.register(User, UserModelAdmin)
# admin.site.register(KeywordId)
admin.site.register(OTP)
admin.site.register(Project)
# admin.site.register(Finding)
# admin.site.register(MultiPr)
admin.site.register(Keyword)