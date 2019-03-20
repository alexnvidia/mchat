from django import forms
from .models import Post,Mchat
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class PostForm(forms.ModelForm):

	class Meta:
		model = Post
		fields = ('title','text',)



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
	question= forms.CharField(disabled=True)


	class Meta:
		model = Mchat
		fields = ('question','option','examples')

		

			


	
		