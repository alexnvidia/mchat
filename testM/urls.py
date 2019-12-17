from django.urls import path
from . import views
from .views import MchatListView, MchatUpdate

mchats_patterns = ([
	
	
	path('', MchatListView.as_view(), name='mchats'),
	path('update/<int:pk>', MchatUpdate.as_view(), name='update'),
	path('mchat/start', views.mchat_start, name='mchat_start'),
		
	], 'mchats')