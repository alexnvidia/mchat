from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .models import Post, Mchat
from .forms import PostForm,mchatForm
from .forms import SignUpForm
from django.contrib.auth.models import User
# Create your views here.

def post_list(request):
	posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
	return render(request, 'testM/post_list.html' , {'posts': posts})
@login_required
def post_detail (request, pk):
	post = get_object_or_404(Post, pk=pk)
	return render(request, 'testM/post_detail.html', {'post': post})


def mchat_test(request):
	mchats = Mchat.objects.all()
	return render(request, 'testM/mchat.html', {'mchats': mchats})

@login_required
def mchat_start (request, pk):
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
	return render(request, 'testM/mchatStart.html', {'form': form})

		

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