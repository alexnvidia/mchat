from django.urls import path
from . import views

urlpatterns = [
	
	
	path('', views.mchat_test, name='mchat'),
	path('mchat/<int:pk>/edit', views.mchat_edit, name='mchat_edit'),
	path('mchat/start', views.mchat_start, name='mchat_start'),
	path('post/new' , views.post_new, name='post_new'),
	path('post/<int:pk>/edit/', views.post_edit , name='post_edit'),
	path('post/<pk>/remove/', views.post_remove, name='post_remove'),	
	]