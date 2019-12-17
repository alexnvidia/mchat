from django.shortcuts import render, get_object_or_404, redirect, render_to_response
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .models import Post, Mchat , Item, Patient
from .forms import PostForm,mchatForm,mchatTest
from .forms import SignUpForm
from django.forms import formset_factory, modelformset_factory
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.models import User
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
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

class MchatListView(ListView):

    model = Mchat        

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['now'] = timezone.now()
        return context


@method_decorator(staff_member_required, name='dispatch')
class MchatUpdate(UpdateView):
    model = Mchat
    form_class = mchatForm
    template_name_suffix = '_update_form'

    def get_success_url(self):
        return reverse_lazy('mchats:update', args=[self.object.id])

@login_required
def mchat_start (request):
	item = Item.objects.order_by('pk') # Ordeno en base al autonumerico de cada objeto
	mchatFormSet = modelformset_factory(Item,form=mchatTest ,extra=0)
	if request.method == "POST":
		formset = mchatFormSet(request.POST)
		if formset.is_valid():
			instances = formset.save(commit=False)
			print("hola")		#for f in formset:				
			for instance in instances:
				instance.save()
			return redirect('mchats:mchats')
			

	else:
		print("estoy en el get")			
		formset = mchatFormSet()
	return render(request,'testM/mchatStart.html', {'formset': formset})

@login_required
def resultados(request):
	return render(request,'testM/resultados_mchat.html',)




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
			return redirect('mchat')

	else:
		form = SignUpForm()
	return render(request, 'signup.html',{'form':form})