from django.urls import path
from . import views
from .views import (MchatListView, MchatUpdate, PatientCreate, PatientListView, PatientUpdate, 
PatientDelete, activation_sent_view, activate, ProfileUpdate, PatientDetailView, PatientListUserProfileView,
PatientHistoricView)

mchats_patterns = ([
	
	
	path('', MchatListView.as_view(), name='mchats'),
	path('mchat/listPatient', PatientListView.as_view(), name='patients'),
	path('mchat/listPatientProfile', PatientListUserProfileView.as_view(), name='ProfilePatients'),	
	path('update/<int:pk>', MchatUpdate.as_view(), name='update'),
	path('mchat/start/<int:pk>', views.mchat_start, name='mchat_start'),
	path('mchat/followup/<int:pk>', views.followup_mchat, name='followup_mchat'),
	path('mchat/patient', PatientCreate.as_view(), name='patient_create'),
	path('mchat/patientEdit/<int:pk>', PatientUpdate.as_view(), name='patient_update'),
	path('UserProfileEdit/<int:pk>', ProfileUpdate.as_view(), name='profile_update'),
	path('UserProfile/<int:pk>', PatientDetailView.as_view(),name='user_profile'),
	path('mchat/patient/result/<int:pk>', views.patient_result, name='patient_result'),
	path('mchat/patientHistoric/result/<int:pk>', views.patient_historic_result, name='patient_historic_result'),
	path('mchat/patientDelete/<int:pk>', PatientDelete.as_view(), name='patient_delete'),
	path('mchat/patientHistoric/<int:pk>', PatientHistoricView.as_view(), name='patient_historic'),
	path('mchat/graphic', views.graphics, name='graphic_mchat'),
	path('sent/', activation_sent_view, name="activation_sent"),
	path('activate/<slug:uidb64>/<slug:token>/', activate, name='activate')

		
	], 'mchats')