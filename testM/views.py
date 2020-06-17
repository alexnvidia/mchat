from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .models import Mchat , Item, Patient
from .forms import mchatForm,mchatTest,PatientForm
from .forms import SignUpForm
from django.forms import formset_factory, modelformset_factory
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.models import User
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView, UpdateView, DeleteView, FormMixin
from django.views.generic.base import TemplateView
from django.urls import reverse, reverse_lazy
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator

# Pdb Import
# Create your views here.

"""
class StaffRequiredMixin(object):
	
	Mixin que solo permite acceso a los usuarios que son
	de tipo staff

	def dispatch(self, request, *args, **kwargs):
		if not request.user.is_staff:
			return redirect(rever)
"""
""" Costants"""

messageFinalScoreNoFollow = "No es necesario hacer seguimiento"
messageFinalScoreFollow = "Es necesario hacer la entrevista de Seguimiento"
messageFinalScoreNoFollowRisk = "No es necesario hacer seguimiento, por favor es necesario llevar a diagnóstico avanzado"

class HomePageView(TemplateView):

    template_name = "home.html"

    def get_context_data(self, **kwargs):
    	supervisor_filter=User.objects.get(username=self.request.user)
    	context = super(HomePageView, self).get_context_data(**kwargs)
    	context['Mchat'] = Mchat.objects.all()[:1]
    	context['Patient'] = Patient.objects.filter(supervisor=supervisor_filter)
    	return context


class MchatListView(ListView):

    model = Mchat        

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['now'] = timezone.now()                        
        return context

@method_decorator(login_required, name='dispatch')
class PatientListView(ListView):

	model = Patient

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['now'] = timezone.now()
		return context
	def get_queryset(self):
		supervisor_filter=User.objects.get(username=self.request.user)
		return Patient.objects.filter(supervisor=supervisor_filter)


""" para que el PatientForm permita el request.user debo meter 
	como argumentos permitidos el username que tiene ya el valor del
	request.user"""
@method_decorator(login_required, name='dispatch')
class PatientCreate(CreateView):
	model = Patient
	form_class = PatientForm
	template_name_suffix = '_create_form'
	success_url = reverse_lazy('mchats:patients')

	def get_form_kwargs(self):
		kwargs = super(PatientCreate, self).get_form_kwargs()
		kwargs.update({'username': self.request.user})
		return kwargs

	

@method_decorator(staff_member_required, name='dispatch')
class MchatUpdate(UpdateView):
    model = Mchat
    form_class = mchatForm
    template_name_suffix = '_update_form'

    def get_success_url(self):
        return reverse_lazy('mchats:update', args=[self.object.id])

def MchatScore(question_id,option):
		puntuacion = 0
		if(question_id == 2 or question_id == 5 or question_id == 12 ):
			if(option == "True"):
				puntuacion = 1
		else:
			if(option == "False"):
				puntuacion = 1
		return puntuacion

def FinalMchatRfScore(puntuacion_mchat):
	if(puntuacion_mchat >= 2):
		return True
	return False



def str_to_bool(string):
	if(string == "True"):
		return True
	else:
		return False

def option_to_score_list(option,lista_score):
	if (option == "True"):
		lista_score+='1'
		return lista_score
	else:
		lista_score+='0'
		return lista_score
	return lista_score

def construct_followup_list(question_id,followup_list):
	
	if (question_id > 0 and question_id <=9):
		followup_list+=('0'+str(question_id))
		return followup_list
	else:
		followup_list+=str(question_id)
		return followup_list
	return followup_list




def IfMchatFollowUp(puntuacion_mchat):
	resultDict = {
	  "message": "none",
	  "result": False
	  
	}
	if (puntuacion_mchat >= 0 and puntuacion_mchat <=2):
		resultDict["result"] = False
		resultDict["message"] = messageFinalScoreNoFollow
		return resultDict
	elif (puntuacion_mchat >= 3 and puntuacion_mchat <=7):
		resultDict["result"] = True
		resultDict["message"] = messageFinalScoreFollow
		return resultDict
	elif (puntuacion_mchat >= 8 and puntuacion_mchat <=20):
		resultDict["result"] = False
		resultDict["message"] = messageFinalScoreNoFollowRisk
		return resultDict
	return resultDict 

"""def MchatScoreRf(question_group,option):
		contTrue=0
	if (question_group == "PASA" and option == True):
		contTrue+=1
		

	elif ():


	elif ():


	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

	elif ():

"""

@login_required
def mchat_start (request, pk):
	total_score=0
	listaFollowUp = ""
	lista_score = ""
	contador=0
	
	
	item = Item.objects.order_by('pk') # Ordeno en base al autonumerico de cada objeto	
	patient=Patient.objects.get(pk=pk)

	mchatFormSet = formset_factory(mchatTest ,extra=0)
	if request.method == "POST":
		formset = mchatFormSet(request.POST,initial=[{'question': l.question,'question_id': l.question_id} for l in item])#debo pasar initial para que se sigan mostrando los datos en el caso de que no sea valido
		if formset.is_valid():							
			for f in formset:
				option=f.cleaned_data['option']
				lista_score=option_to_score_list(option,lista_score)
				question_id=int(f.cleaned_data['question_id'])
				total_score+=MchatScore(question_id,option)
				if(MchatScore(question_id,option) == 1):
					listaFollowUp=(construct_followup_list(question_id,listaFollowUp))

				Item.objects.update_or_create(question_id = question_id,defaults={'option': option})
				


				"""Aqui debo de tratar cada uno de los datos para discernir
				el resultado del mchat que se pasará el formset
				a otra plantilla para ver los resultados y decidir si es necesario 
				un seguimiento
				ademas debo guardar antes los datos en BBDD puesto que no puedo pasar el formset a al vista
				con los valores , para ello debo utilizar Item.objects.update_or_create()
				 """
			Patient.objects.update_or_create(pk = pk, defaults={'mchat_score': total_score,'item_score': lista_score,'followup_list': listaFollowUp})
			
			#return render(request,'testM/resultados_mchat.html', {'formset': formset,'total_score': total_score})			
			dictr = IfMchatFollowUp(total_score)
			messagefinal = dictr["message"]
			if(dictr["result"] == False):
				print("dentro del dict")
				return redirect('mchats:mchats')
			else:
				return render(request,'testM/resultados_mchat.html',{'total_score': total_score, 'messagefinal': messagefinal})
			return redirect('mchats:mchats')
			

	else:
		print("estoy en el get")			
		formset = mchatFormSet(initial=[{'question': l.question,'question_id': l.question_id} for l in item])
		#print(formset)
	return render(request,'testM/mchatStart.html', {'formset': formset, 'patient': patient})


@login_required
def followup_mchat(request):
	return render(request,'testM/followUp_mchat.html',)




def signup(request):
	if request.method == 'POST':
		form = SignUpForm(request.POST)
		if form.is_valid():
			user = form.save()
			user.refresh_from_db()
			user.profile.birth_date = form.cleaned_data.get('birth_date')
			user.save()
			raw_pasword = form.cleaned_data.get('password1')
			user = authenticate(username=user.username, password=raw_pasword)
			login(request,user)
			return redirect('mchats:mchats')

	else:
		form = SignUpForm()
	return render(request, 'signup.html',{'form':form})