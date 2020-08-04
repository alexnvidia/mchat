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
TRIGGER = "TRIGGER"
GROUP = "GROUP"
SINGLE = "SINGLE"
PASA = "PASA"
NOPASA = "NOPASA"
GROUP = "GROUP"
AUDIT = "AUDIT"


""" Constants """

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
	elif (option == "False"):
		lista_score+='0'
		return lista_score
	else:
		lista_score+='X'
		return lista_score
	return lista_score

def option_to_n(option):
	n = 0
	if(option == "True"):
		n = 1
		return n
	else:
		n = 0
		return n
	return n

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

def MchatScoreRf(question_id,count_pasa,list_trigger,count_nopasa,count_group,list_single):
	score = 1 # 0 es PASA y 1 es NOPASA
	if (question_id == 1 or question_id == 10 or question_id == 11 or question_id == 16):
		if(count_pasa > count_nopasa):
			score = 0
			return score
		elif (count_pasa < count_nopasa):
			score = 1
			return score
		else:
			return score
	elif (question_id == 2):
		if(count_group == 0):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 3 or question_id == 4):
		if (count_pasa > 0):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 5):
		if (count_pasa > 0 or count_nopasa == 0):
			score = 0
			return score
		elif (count_nopasa > 0 and list_trigger[0] == 0):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 6):
		if (count_group > 0 and list_trigger[0] == 1):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 7):
		if (count_pasa > 0 and list_trigger[0] == 1 and list_trigger[1] == 1):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 8):
		if (list_single[0] == 1 and count_pasa > 0 and list_trigger[0] == 1):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 9):
		if (count_pasa > 0 and list_trigger[0] == 1):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 12):
		if (count_group >= 2 and count_pasa > count_nopasa):
			score = 0
			return score
		elif (count_group < 2):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 13):
		if (list_single[0] == 1):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 14):
		if (count_pasa >= 2):
			score = 0
			return score
		elif (count_pasa == 1 and list_trigger[0] == 1 and list_trigger[1] == 1):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 15):
		if (count_group >= 2):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 17 or question_id == 20):
		if (count_group > 0 ):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 18):
		if (list_single[0] == 0 and list_trigger[0] == 1 and count_group > 0):
			score = 0
			return score
		elif (list_single[0] == 1 and count_group > 0):
			score = 0
			return score
		else:
			score = 1
			return score
	elif (question_id == 19):
		if (list_single[0] == 1):
			score = 0
			return score
		elif (list_single[0] == 0 and list_trigger[0] == 0 and list_trigger[1] == 0):
			score = 1
			return score
		else:
			score = 0
			return score
	return score

def set_option_to_rf(queryset,item_scoreRF):
	i = 0
	j = 0
	lista_rf_def = []
	lista_option = []
	for q in queryset:
		if (item_scoreRF[i] == '1'):
			lista_rf_def.append(q.pk)
			lista_option.append(True)
			i+=1
		elif (item_scoreRF[i] == '0'):
			lista_rf_def.append(q.pk)
			lista_option.append(False)
			i+=1
		else:
			i+=1
	queryset = queryset.filter(pk__in=lista_rf_def)

	for q in queryset:		
		q.option = lista_option[j]
		j+=1

	return queryset


def set_option_to_item(mchat_item,item_score):
	i = 0

	for m in mchat_item:
		if (item_score[i] == '1'):
			m.option = True
			i+=1
		else:
			m.option = False
			i+=1
	return mchat_item

	


@login_required
def mchat_start (request, pk):
	total_score=0
	listaFollowUp = ""
	lista_score = ""
	contador=0
	request.session['form_error'] = 0
	
	
	item = Item.objects.order_by('question_id') # Ordeno en base al numero de item	
	patient=Patient.objects.get(pk=pk)

	mchatFormSet = formset_factory(mchatTest ,extra=0)
	if request.method == "POST":
		print("entro en post")
		formset = mchatFormSet(request.POST,initial=[{'question': l.question,'question_id': l.question_id} for l in item])#debo pasar initial para que se sigan mostrando los datos en el caso de que no sea valido
		if formset.is_valid():
			print("valido")							
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
			print(dictr["result"])
			return render(request,'testM/resultados_mchat.html',{'total_score': total_score, 'dictr': dictr, 'pk': pk, 'patient': patient})
		else:
			request.session['form_error'] = formset.total_error_count()
			print("no es valido pinto esto")
			print(request.session['form_error'])

	else:
		print("estoy en el get")			
		formset = mchatFormSet(initial=[{'question': l.question,'question_id': l.question_id} for l in item])
	return render(request,'testM/mchatStart.html', {'formset': formset, 'patient': patient})


@login_required
def followup_mchat(request, pk):
	patient=Patient.objects.get(pk=pk)
	item_score=patient.item_score
	followup_array=patient.followup_list
	followup_object=[]
	objects = ""
	list_pk_followup = []
	count_pasa = 0
	count_nopasa = 0
	count_group = 0
	list_trigger = []
	list_single = []
	item_scoreRF = ""

	

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
		formset = mchatFollowUpFormset(request.POST,initial=[{'question_group': l.question_group,'question_item':l.question_item, 'question': l.question, 'extra_option': l.extra_option} for l in followUpItem])
		if formset.is_valid():
			for f in formset:
				print("valido")
				option=f.cleaned_data['option']
				group=f.cleaned_data['question_group']
				item_scoreRF = request.session['item_scoreRF']
				item_scoreRF=option_to_score_list(option,item_scoreRF)
				request.session['item_scoreRF'] = item_scoreRF
				if (group == TRIGGER):
					list_trigger.append(option_to_n(option))					

				elif (group == SINGLE):
					list_single.append(option_to_n(option))

				elif (group == GROUP):
					count_group+=option_to_n(option)

				elif (group == PASA):
					count_pasa+=option_to_n(option)

				elif (group == NOPASA):
					count_nopasa+=option_to_n(option)
				elif (group == AUDIT):
					extra_option = f.cleaned_data['extra_option']
					print("esto es " + extra_option)
			question_id = request.session['question_id']
			request.session['score_rf']+=MchatScoreRf(question_id,count_pasa,list_trigger,count_nopasa,count_group,list_single)
			print("entro al contador " + str(MchatScoreRf(question_id,count_pasa,list_trigger,count_nopasa,count_group,list_single)))

			if (question_id == 2):
				request.session['audit_info'] = 0
				request.session['audit_info'] = extra_option

			n_pages=request.session['num_pages']
			a_page=request.session['actual_page']
			request.session['post_send'] = a_page + 1
			if(a_page + 1 <= n_pages):
				return redirect('/mchat/followup/' + str(pk) + '?page=' + str(a_page+1))
			else:
				score_rf = request.session['score_rf']
				audit_info = request.session['audit_info']
				positive=FinalMchatRfScore(score_rf)
				item_scoreRF = request.session['item_scoreRF']
				Patient.objects.update_or_create(pk = pk, defaults={'positive': positive,'audit_info': audit_info,'item_scoreRF': item_scoreRF})
				return render(request,'testM/resultados_mchatRF.html',{'score_rf': score_rf, 'positive': positive, 'patient': patient,})
			return redirect('mchats:mchats')
		else:
			print("Not Valid")
			print(formset.errors)
	else:
		print("hola")
		paginator = Paginator(item, 1)
		page = request.GET.get('page')
		if(page == None):
			request.session['post_send'] = 1
			request.session['actual_page']= 1
			request.session['score_rf'] = 0
			request.session['audit_info'] = "none"
			request.session['item_scoreRF'] = ""
		else:
			request.session['actual_page']= int(page)
		request.session['num_pages']=paginator.num_pages		

		try:
			objects = paginator.page(page)

		except PageNotAnInteger:
			objects = paginator.page(1)

		except EmptyPage:
			objects = paginator.page(paginator.num_pages)
		#creo otro filtro para los item de siguimiento y asi en cada pagina solo salen los del item correspondiente
		page_query = followUpItem.filter(item__pk__in=[object.pk for object in objects])
		for o in objects:
			request.session['question_id'] = o.question_id

		formset = mchatFollowUpFormset(initial=[{'question_group': l.question_group,'question_item':l.question_item, 'question': l.question, 'extra_option': l.extra_option} for l in page_query])
		data = serializers.serialize("json", page_query)
		request.session['page_query'] = data

	return render(request,'testM/followUp_mchat.html',{'patient': patient,'formset': formset,'objects': objects,})

def patient_result(request,pk):
	patient = Patient.objects.get(pk=pk)
	item_score = patient.item_score
	item_scoreRF = patient.item_scoreRF
	followup_array = patient.followup_list
	mchat_item = Item.objects.all()
	Item_list = []

	#transformo el char followup_array a lista
	followup_list = char_to_list(followup_array)
	
	#recorro la lista anterior y genero la lista de item que tienen seguimiento
	Item_list = objetc_to_list(followup_list)

	#utilizo la lista de item para filtrar los objetos followup que corresponden
	followUpItem = FollowUpItem.objects.filter(item__in=Item_list)

	followUpItem = set_option_to_rf(followUpItem,item_scoreRF)

	mchat_item = set_option_to_item(mchat_item,item_score)


	if request.method == 'POST':
		print("post")

	else:
		print("GET")
		for m in mchat_item:
			print(m.option)


	return render(request, 'testM/patient_result.html',{'followUpItem': followUpItem,'mchat_item': mchat_item})






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