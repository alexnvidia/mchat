from django.urls import path
from . import views
from .views import MchatListView, MchatUpdate, PatientCreate, HomePageView, PatientListView

mchats_patterns = ([
	
	
	path('', MchatListView.as_view(), name='mchats'),
	path('mchat/listPatient', PatientListView.as_view(), name='patients'),	
	path('update/<int:pk>', MchatUpdate.as_view(), name='update'),
	path('mchat/start/<int:pk>', views.mchat_start, name='mchat_start'),
	path('mchat/followup', views.followup_mchat, name='followup_mchat'),
	path('mchat/patient', PatientCreate.as_view(), name='patient_create'),
		
	], 'mchats')