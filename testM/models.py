from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.

#global
SI_NO_CHOICES = (((None,''),(True,'Si'),(False,'No')))


class Mchat(models.Model):
	id = models.AutoField(primary_key=True,)
	name = models.CharField(max_length=50,default='M-CHAT-R/F',)
	author = models.OneToOneField('auth.User', on_delete=models.CASCADE,)	
	start_date = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.name



class Item(models.Model):	
	question_id = models.IntegerField(default=1,null=False)
	question = models.CharField(max_length=400,default='')
	option = models.BooleanField(choices=SI_NO_CHOICES,max_length=3,null=True,default=None,blank=True)
	mchat = models.ForeignKey(Mchat, on_delete=models.CASCADE)

	class Meta:
		ordering = ["question_id"]
	

	def __str__(self):
		return str(self.question_id)


class FollowUpItem(models.Model):	
	item= models.ForeignKey(Item, on_delete=models.CASCADE)
	question_item = models.CharField(max_length=400,default='',null=True,blank=True)
	question_group = models.CharField(max_length=50,default='none')
	question = models.CharField(max_length=400,default='')
	option = models.BooleanField(choices=SI_NO_CHOICES,max_length=3,null=True,default=None,blank=True)
	extra_option = models.CharField(max_length=40,null=True,default=None,blank=True)

	def __str__(self):
		return str(self.item)



		
		
class Patient(models.Model):
	name = models.CharField(max_length=150,default='')
	subname = models.CharField(max_length=150)
	birth_date = models.DateField(null=True,blank=True)	
	supervisor = models.ForeignKey('auth.User', on_delete=models.CASCADE)
	mchat_score = models.IntegerField(default=0,)
	mchatrf_score = models.IntegerField(default=0,)
	positive = 	models.BooleanField(choices=SI_NO_CHOICES,max_length=3,null=True,default=False,blank=True)
	positive_tr = models.BooleanField(choices=SI_NO_CHOICES,max_length=3,null=True,default=False,blank=True)
	item_score = models.CharField(max_length=21, default='')
	item_scoreRF = models.CharField(max_length=128, default='')
	followup_list = models.CharField(max_length=50, default='')
	audit_info = models.CharField(max_length=30, default='none')
	finish = models.BooleanField(choices=SI_NO_CHOICES,max_length=3,null=True,default=False,blank=True)



	def __str__(self):
		return (self.name + self.subname)


		

class Profile(models.Model):

	user=models.OneToOneField(User, on_delete=models.CASCADE)
	bio=models.TextField(max_length=500, blank=True)
	location = models.CharField(max_length=30, blank=True)
	birth_date = models.DateField(null=True,blank=True)

	
	def __str_(self):
		return self.location

"""Necesito crear una señal , puesto que si se crear un nuevo usuario este debe tener
asignado un perfil, el usuario es clave foranea en el perfil y este no puede ser nulo """
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
    


    