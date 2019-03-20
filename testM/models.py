from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.


class Post(models.Model):
	"""docstring for ClassName"""

	author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
	title  = models.CharField(max_length=200)
	text = models.TextField()
	created_date = models.DateTimeField(default=timezone.now)
	published_date = models.DateTimeField(blank = True, null = True)

	def publish(self):
		self.published_date = timezone.now()
		self.save()


	def __str__(self):
		return self.title


class Mchat(models.Model):

	SI_NO_CHOICES = ((None,''),(True,'Si'),(False,'No'))
	author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
	question = models.CharField(max_length=400)
	option = models.BooleanField(choices=SI_NO_CHOICES,max_length=3,default=None)
	examples = models.CharField(max_length=400,null=True)
	puntuacion_mchat = models.IntegerField(null=True,blank=True)

	def puntuacion(self):
		self.puntuacion_mchat = 0
		self.save()

	def __str__(self):
		return self.question

		
		
		

class Profile(models.Model):

	user=models.OneToOneField(User, on_delete=models.CASCADE)
	bio=models.TextField(max_length=500, blank=True)
	location = models.CharField(max_length=30, blank=True)
	birth_date = models.DateField(null=True,blank=True)

	
	def __str_(self):
		return self.location


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
    

    