from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Profile, Mchat,Item,Patient,FollowUpItem,Patient_historic
# Register your models here.


admin.site.register(Profile)
admin.site.register(Mchat)
admin.site.register(Item)
admin.site.register(Patient)
admin.site.register(FollowUpItem)
admin.site.register(Patient_historic)


class ProfileInLine(admin.StackedInline):
	model = Profile
	can_delete = False
	verbose_name_plural = 'Perfiles'
	fk_name = 'user'


class CustomUserAdmin(UserAdmin):
	inlines = (ProfileInLine, )

	def get_inline_instances(self, request, obj=None):
		if not obj:
			return list()
		return super(CustomUserAdmin, self).get_inline_instances(request,obj)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)