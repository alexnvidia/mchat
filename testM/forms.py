from django import forms
from .models import Post,Mchat,Item,Patient
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
	
	

	class Meta:
		model = Mchat
		fields = ('name','author',)	



class mchatTest(forms.ModelForm):
	"""docstring for mchatTest
	def __init__(self, arg):
		super(mchatTest, self).__init__()
		self.arg = arg"""
	SI_NO_CHOICES = ((True,'Si'),(False,'No'))
	option= forms.BooleanField(widget=forms.RadioSelect(choices=SI_NO_CHOICES),label=False,required=False)

	class Meta:
		model = Item
		fields = ('question','option',)
		

		
		