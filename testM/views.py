from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .models import Mchat , Item, Patient, FollowUpItem
from .forms import mchatForm,mchatTest,PatientForm,mchatFollowup
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
from django.core import serializers

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

def char_to_list(followup_list):
	listf=[]
	charBak=""

	for c in followup_list:
		charBak+=c
		if(len(charBak) == 2):
			listf.append(int(charBak))
			charBak=""
	return listf

def objetc_to_list(listaFollowUp):
	followup_object=[]

	for l in listaFollowUp:
		followup_object.append(Item.objects.get(question_id=l))
	return followup_object






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
					
			Patient.objects.update_or_create(pk = pk, defaults={'mchat_score': total_score,'item_score': lista_score,'followup_list': listaFollowUp})
			
			#return render(request,'testM/resultados_mchat.html', {'formset': formset,'total_score': total_score})			
			dictr = IfMchatFollowUp(total_score)
			messagefinal = dictr["message"]
			if(dictr["result"] == False):
				print("dentro del dict")
				return redirect('mchats:mchats')
			else:
				return render(request,'testM/resultados_mchat.html',{'total_score': total_score, 'messagefinal': messagefinal, 'pk': pk, 'patient': patient})
			return redirect('mchats:mchats')
			

	else:
		print("estoy en el get")			
		formset = mchatFormSet(initial=[{'question': l.question,'question_id': l.question_id} for l in item])
		#print(formset)
	return render(request,'testM/mchatStart.html', {'formset': formset, 'patient': patient})


@login_required
def followup_mchat(request, pk):
	patient=Patient.objects.get(pk=pk)
	item_score=patient.item_score
	followup_array=patient.followup_list
	followup_object=[]
	objects = ""
	list_pk_followup = []

	#transformo el char followup_array a lista
	followup_list=char_to_list(followup_array)
	
	#recorro la lista anterior y genero la lista de item que tienen seguimiento
	followup_object=objetc_to_list(followup_list)

	#utilizo la lista de item para filtrar los objetos followup que corresponden
	followUpItem=FollowUpItem.objects.filter(item__in=followup_object)

	#genero queryset item para paginacion 
	item=Item.objects.order_by('pk').filter(question_id__in=followup_list)
	
	mchatFollowUpFormset = formset_factory(mchatFollowup ,extra=0)
	#print(request.session.items())
	


	if request.method == "POST":
		data_des = request.session['page_query']
		for obj in serializers.deserialize("json", data_des):
			list_pk_followup.append(obj.object.pk)
		followUpItem=FollowUpItem.objects.filter(pk__in=list_pk_followup)
		formset = mchatFollowUpFormset(request.POST,initial=[{'question_group': l.question_group, 'question': l.question} for l in followUpItem])
		if formset.is_valid():
			for f in formset:
				print("valido")
				option=f.cleaned_data['option']
			n_pages=request.session['num_pages']
			a_page=request.session['actual_page']
			if(int(a_page) + 1 <= n_pages):
				return redirect('/mchat/followup/' + str(pk) + '?page=' + str(int(a_page)+1))
			else:
				return redirect('mchats:mchats')
			return redirect('mchats:mchats')
		else:
			print(followUpItem)
	else:
		print("hola")
		paginator = Paginator(item, 1)

		page = request.GET.get('page')
		request.session['num_pages']=paginator.num_pages
		if(page == None):
			page = '1'
		request.session['actual_page']=page

		try:
			objects = paginator.page(page)

		except PageNotAnInteger:
			objects = paginator.page(1)

		except EmptyPage:
			objects = paginator.page(paginator.num_pages)
		#creo otro filtro para los item de siguimiento y asi en cada pagina solo salen los del item correspondiente
		page_query = followUpItem.filter(item__pk__in=[object.pk for object in objects])		
		formset = mchatFollowUpFormset(initial=[{'question_group': l.question_group, 'question': l.question} for l in page_query])
		data = serializers.serialize("json", page_query)
		request.session['page_query'] = data

	return render(request,'testM/followUp_mchat.html',{'patient': patient,'formset': formset,'objects': objects})




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