from django import forms
from .models import Post
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
			


	
		