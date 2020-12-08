from django import forms
from .models import Mchat,Item,Patient,FollowUpItem, Profile
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator
import datetime
from datetime import date

#constantes
SI_NO_CHOICES = ((True,'Si'),(False,'No'))
AUDIT_INFO = [
    (2, 'Audicion normal'),
    (3, 'Audicion por debajo de lo normal'),
    (4, 'Resultados no concluyentes'),
]

MONTHS = {
    1:'jan', 2:'feb', 3:'mar', 4:'apr',
    5:'may', 6:'jun', 7:'jul', 8:'aug',
    9:'sep', 10:'oct', 11:'nov', 12:'dec'
}

month_float = 30.417

class SignUpForm(UserCreationForm):
	"""docstring for SignUpForm"""
	birth_date = forms.DateField(help_text='Formato requerido: DD/MM/YYYY',label="Fecha de nacimiento",required=True)
	username = forms.CharField(help_text='Requerido. 150 carácteres como máximo y mínimo 8 carácteres. Únicamente letras, dígitos y @/./+/-/_ ',label="Nombre de Usuario",validators=[MinLengthValidator(8,'Mínimo 8 caracteres')],
		widget=forms.TextInput(attrs={'class':'form-control mt2', 'placeholder': 'Nombre de Usuario'}))
	first_name = forms.CharField(max_length=128, label='Nombre',
		widget=forms.TextInput(attrs={'class':'form-control mt2', 'placeholder': 'Nombre'}))
	last_name = forms.CharField(max_length=256, label='Apellidos',
		widget=forms.TextInput(attrs={'class':'form-control mt3', 'placeholder': 'Apellidos'}))
	email = forms.EmailField(required=True,max_length=256, label='Dirección de correo electrónico',help_text="Requerido. 256 caracteres como maximo",
		widget=forms.EmailInput(attrs={'class':'form-control mt2', 'placeholder': 'Correo electrónico'}))
	password1 = forms.CharField(required=True,label="Contraseña",
		widget=forms.PasswordInput(attrs={'class':'form-control mt3', 'placeholder': 'Contraseña'}))

	password2 = forms.CharField(required=True,label="",
		widget=forms.PasswordInput(attrs={'class':'form-control mt3', 'placeholder': 'Repita la contraseña'}))

	birth_date.widget.attrs.update({'class':'form-control w-25 mb-2 mr-sm-2', 'placeholder': 'Fecha'})

	class Meta:
		"""docstring for Meta"""
		model = User
		fields = ('username','first_name','last_name','email','birth_date', 'password1','password2',)
		widgets = {
				'username' : forms.TextInput(attrs={'class':'form-control mt2', 'placeholder': 'Nombre de Usuario'}),
		}

	def clean_email(self):
		email = self.cleaned_data.get("email")
		if User.objects.filter(email=email).exists():
			raise forms.ValidationError("El email ya está registrado por otro usuario, introduzca otro diferente")
		return email


	def clean_birth_date(self):
		cleaned_data = super(SignUpForm, self).clean()

		birth_date = cleaned_data.get('birth_date')
		date_now = date.today()

		if birth_date is not None:
			if (date_now < birth_date):
				raise forms.ValidationError("La fecha de nacimiento no puede ser mayor que la actual")
		return birth_date












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

class profileForm(forms.ModelForm):

	birth_date = forms.DateField(required=True)
	birth_date.widget.attrs.update({'class':'form-control w-25 mb-2 mr-sm-2', 'placeholder': 'Fecha'})

	class Meta:
		model = Profile
		fields = ('first_name','last_name','bio','location','center','birth_date',)
		widgets = {
				'first_name' : forms.TextInput(attrs={'class':'form-control mt3', 'placeholder': 'Nombre'}),
				'last_name' : forms.TextInput(attrs={'class':'form-control mt3', 'placeholder': 'Apellidos'}),
				'bio': forms.Textarea(attrs={'class':'form-control mt-3', 'rows':3, 'placeholder':'Biografía'}),
				'location': forms.TextInput(attrs={'class':'form-control mt-3', 'placeholder':'Dirección'}),
				'center' : forms.TextInput(attrs={'class':'form-control mt-3', 'placeholder':'Centro de trabajo'}),
							
		}
	def clean_birth_date(self):
		cleaned_data = super(profileForm, self).clean()

		birth_date = cleaned_data.get('birth_date')
		date_now = date.today()

		if birth_date is not None:
			if (date_now < birth_date):
				raise forms.ValidationError("La fecha de nacimiento no puede ser mayor que la actual")
		return birth_date




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
	birth_date = forms.DateField(required=True,label="Fecha de nacimiento")
	birth_date.widget.attrs.update({'class':'form-control w-25 mb-2 mr-sm-2', 'placeholder': 'Fecha'})

	def clean_birth_date(self):
		cleaned_data = super(PatientForm, self).clean()

		birth_date = cleaned_data.get('birth_date')
		date_now = date.today()
		delta = date_now - birth_date
		delta = delta.days
		month = delta/month_float

		if birth_date is not None:
			if (date_now < birth_date):
				raise forms.ValidationError("La fecha de nacimiento no puede ser mayor que la actual")
			elif (month < 16 or month > 30):
				raise forms.ValidationError("La edad recomendada está entre 16 y 30 meses")
		return birth_date

	def clean(self):
		cleaned_data = super(PatientForm, self).clean()

		name = cleaned_data.get('name').lower().capitalize()
		subname = cleaned_data.get('subname').lower().capitalize()

		return cleaned_data



	class Meta:
		model = Patient
		fields = ('name','subname','sex','birth_date',)
		exclude = ['supervisor']
		widgets = {				
				
				'name': forms.TextInput(attrs={'class':'form-control w-25 mb-2 mr-sm-2', 'placeholder': 'Nombre'}),
				'subname': forms.TextInput(attrs={'class':'form-control mt3', 'placeholder': 'Apellidos'}),
				'sex': forms.Select(attrs={'class':'form-control mt3', 'placeholder': 'Sexo'})
		}


class custom_question(forms.ModelForm):

	"""docstring for mchatForm"forms.ModelFormf __init__(self, arg):
		super(mchatForm,forms.ModelForm.__init__()
		self.arg = arg"""	

	custom_quest =forms.CharField(label=False,widget=forms.TextInput(
		attrs={'class':'form-control mt3 my-2', 'placeholder': 'Otro(Describa)'}))

	class Meta:
		model = Patient
		fields = ('custom_quest',)
		widgets = {				
				
				'custom_quest': forms.TextInput(attrs={'class':'form-control mt3 my-2', 'placeholder': 'Otro(Describa)'})
		}


class adicional_info(forms.ModelForm):

	adic_info = forms.CharField(label=False, widget = forms.Textarea(
		attrs={'class':'form-control mt-3', 'rows':6, 'placeholder':'Contenido adicional'}))

	class Meta:
		model = Patient
		fields = ('adic_info',)

	def clean_adic_info(self):
		cleaned_data = super(adicional_info, self).clean()

		adic_info = cleaned_data.get('adic_info')

		if adic_info.find('|') != -1:
			raise forms.ValidationError("No se permite el caracter '|' ")
		return adic_info





