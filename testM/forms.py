from django import forms
from .models import Mchat,Item,Patient,FollowUpItem
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import datetime
from datetime import date

#constantes
SI_NO_CHOICES = ((True,'Si'),(False,'No'))
AUDIT_INFO = [
    (1, 'Audicion normal'),
    (2, 'Audicion por debajo de lo normal'),
    (3, 'Resultados no concluyentes'),
]

MONTHS = {
    1:'jan', 2:'feb', 3:'mar', 4:'apr',
    5:'may', 6:'jun', 7:'jul', 8:'aug',
    9:'sep', 10:'oct', 11:'nov', 12:'dec'
}

class SignUpForm(UserCreationForm):
	"""docstring for SignUpForm"""
	birth_date = forms.DateField(help_text='Required. Format: YYYY-MM-DD')

	class Meta:
		"""docstring for Meta"""
		model = User
		fields = ('username','birth_date', 'password1','password2',)




class mchatForm(forms.ModelForm):

	"""docstring for mchatForm"forms.ModelFormf __init__(self, arg):
		super(mchatForm,forms.ModelForm.__init__()
		self.arg = arg"""
	
	

	class Meta:
		model = Mchat
		fields = ('name','author',)	



class mchatTest(forms.ModelForm):
	"""docstring for mchatTest
	def __init__(self, arg):
		super(mchatTest, self).__init__()
		self.arg = arg"""
	
	question = forms.CharField(required=False,label=False,disabled=True)
	option = forms.ChoiceField(widget=forms.RadioSelect(),choices=SI_NO_CHOICES,label=False,required=True)
	question_id = forms.CharField(label=False,required=False,disabled=True)
	

	class Meta:
		model = Item
		fields = ('question','option','question_id',)


class mchatFollowup(forms.ModelForm):
	
	question =forms.CharField(required=False,label=False,disabled=True)
	question_group = forms.CharField(label=False,required=False,disabled=True)
	option = forms.ChoiceField(widget=forms.RadioSelect(),choices=SI_NO_CHOICES,label=False,required=False)
	extra_option = forms.ChoiceField(widget=forms.RadioSelect(),choices=AUDIT_INFO,label=False,required=False)

	class Meta:
		model = FollowUpItem
		fields = ('question_group','question_item','question','option','extra_option')





def date_today():
	year_now = datetime.datetime.now().year
	return year_now + 1

class PatientForm(forms.ModelForm):
	""" filtro el supervisor para que salga el que esta autenticado en ese momento ya que ese sera el 
	supervisor"""
	birth_date = forms.DateField(widget=forms.SelectDateWidget(years=range(1980, date_today())))
	supervisor = forms.ModelChoiceField(queryset=None, empty_label="...")

	def __init__(self,username, *args, **kwargs):								
		super(PatientForm, self).__init__(*args, **kwargs)		
		self.fields['supervisor'].queryset = User.objects.filter(username=username)
	def clean(self):
		cleaned_data = super(PatientForm, self).clean()

		birth_date = cleaned_data.get('birth_date')
		date_now = date.today()

		if birth_date is not None:
			if (date_now < birth_date):
				self.add_error(None,ValidationError('La fecha de nacimiento no pude ser mayor que la actual'))





	class Meta:
		model = Patient
		fields = ('name','subname','birth_date','supervisor',)


		

		
		