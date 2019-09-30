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
# Pdb Import
# Create your views here.

def mchat_test(request):
	mchats = Mchat.objects.all()
	return render(request, 'testM/mchat.html', {'mchats': mchats})

@login_required
def mchat_edit (request, pk):
	mchat = get_object_or_404(Mchat, pk=pk)
	if request.method == "POST":
		form = mchatForm(request.POST, instance=mchat)
		if form.is_valid():
			mchat = form.save(commit=False)
			mchat.author = request.user
			mchat.save()
			return redirect('mchat')

	else:
		form = mchatForm(instance=mchat)
	return render(request, 'testM/mchatEdit.html', {'form': form})

@login_required
def mchat_start (request):
	item = Item.objects.order_by('pk') # Ordeno en base al autonumerico de cada objeto
	mchatFormSet = modelformset_factory(Item,form=mchatTest,extra=0)
	if request.method == "POST":
		formset = mchatFormSet(request.POST,queryset=item,initial={'option':''})
		if formset.is_valid():
			instances = formset.save(commit=False)
			print("hola")		#for f in formset:				
			for instance in instances:
				instance.save()
			return redirect('mchat')
		else:
			#print(formset)
			print(formset.errors)
			return redirect('mchat')

	else:			
		formset = mchatFormSet(initial='')
	return render(request,'testM/mchatStart.html', {'formset': formset})


@login_required
def post_new(request):
	if request.method == "POST":
		form = PostForm(request.POST)
		if form.is_valid():
			post = form.save(commit=False)
			post.author = request.user
			post.published_date = timezone.now()
			post.save()
		return redirect('post_detail', pk=post.pk)

	else:
		form = PostForm()
		return render(request, 'testM/post_edit.html', {'form': form})


@login_required
def post_edit(request,pk):
	post = get_object_or_404(Post, pk=pk)
	if request.method == "POST":
		form = PostForm(request.POST, instance=post)
		if form.is_valid():
			post = form.save(commit=False)
			post.author = request.user
			post.published_date = timezone.now()
			post.save()
			return redirect('post_detail', pk=post.pk)

	else:
		form = PostForm(instance=post)
	return render(request, 'testM/post_edit.html', {'form': form})



@login_required
def post_remove(request, pk):
	post = get_object_or_404(Post, pk=pk)
	post.delete()
	return redirect('post_list')


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
			return redirect('post_list')

	else:
		form = SignUpForm()
	return render(request, 'signup.html',{'form':form})