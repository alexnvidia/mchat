from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.

#global
SI_NO_CHOICES = (((None,''),(True,'Si'),(False,'No')))
MALE_FEMALE = (
        ('F', 'Femenino',),
        ('M', 'Masculino',),
        ('U', 'no especificado',),
    )


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
	name = models.CharField(max_length=150,default='',verbose_name = 'Nombre')
	subname = models.CharField(max_length=150,verbose_name = 'Apellidos')
	birth_date = models.DateField(null=True,blank=True,verbose_name = 'Fecha de nacimiento')	
	supervisor = models.ForeignKey('auth.User', on_delete=models.CASCADE)
	mchat_score = models.IntegerField(default=0,verbose_name = 'Puntuacion Mchat primera etapa')
	mchatrf_score = models.IntegerField(default=0,verbose_name = 'Puntuacion Mchat segunda etapa')
	positive = 	models.BooleanField(choices=SI_NO_CHOICES,max_length=3,null=True,default=False,blank=True,verbose_name = 'Positivo')
	positive_tr = models.BooleanField(choices=SI_NO_CHOICES,max_length=3,null=True,default=False,blank=True,verbose_name = 'Positivo confirmado')
	item_score = models.CharField(max_length=21, default='',verbose_name = 'Lista de respuestas primera etapa')
	item_scoreRF = models.CharField(max_length=128, default='',verbose_name = 'Lista de respuestas segunda etapa')
	followup_list = models.CharField(max_length=50, default='',verbose_name = 'Lista de item necesarios a revisar')
	audit_info = models.CharField(max_length=30, default='No aplica',verbose_name = 'Nivel de audición')
	sex = models.CharField(max_length=1,choices=MALE_FEMALE,null=True,default="",blank=True,verbose_name="Sexo")
	finish = models.BooleanField(choices=SI_NO_CHOICES,max_length=3,null=True,default=False,blank=True,verbose_name = 'Test Realizado')



	def __str__(self):
		return (self.name + self.subname)


class Patient_historic(models.Model):
	patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
	date_test = models.DateTimeField(default=timezone.now)
	mchat_score = models.IntegerField(default=0,verbose_name = 'Puntuacion Mchat primera etapa')
	mchatrf_score = models.IntegerField(default=0,verbose_name = 'Puntuacion Mchat segunda etapa')
	positive = 	models.BooleanField(choices=SI_NO_CHOICES,max_length=3,null=True,default=False,blank=True,verbose_name = 'Positivo')
	item_score = models.CharField(max_length=21, default='',verbose_name = 'Lista de respuestas primera etapa')
	item_scoreRF = models.CharField(max_length=128, default='',verbose_name = 'Lista de respuestas segunda etapa')
	followup_list = models.CharField(max_length=50, default='',verbose_name = 'Lista de item necesarios a revisar')
	audit_info = models.CharField(max_length=30, default='No aplica',verbose_name = 'Nivel de audición')

	class Meta:
		ordering = ["date_test"]


	def __str__(self):
		return (self.patient.name + " " + str(self.date_test))

		

class Profile(models.Model):

	user=models.OneToOneField(User, on_delete=models.CASCADE, verbose_name = 'Usuario')
	bio=models.TextField(max_length=500, blank=True,verbose_name = 'Biografía')
	first_name = models.CharField(max_length=128, blank=True,verbose_name = 'Nombre')
	last_name = models.CharField(max_length=256, blank=True,verbose_name = 'Apellidos')
	email = models.EmailField(max_length=256,default="example@mail.com",verbose_name = 'Email')
	location = models.CharField(max_length=128, blank=True, verbose_name = 'Dirección')
	center = models.CharField(max_length=128, blank=True, default="No especificado", verbose_name = 'Centro de trabajo')
	birth_date = models.DateField(null=True,blank=True,verbose_name = 'Fecha de nacimiento')
	signup_confirmation = models.BooleanField(default=False)

	class Meta:
		verbose_name = "Perfil"
		verbose_name_plural ="Perfiles"

	
	def __str__(self):
		return self.user.username

"""Necesito crear una señal , puesto que si se crear un nuevo usuario este debe tener
asignado un perfil, el usuario es clave foranea en el perfil y este no puede ser nulo """
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
    


    