from django.urls import path
from . import views
from .views import MchatListView, MchatUpdate, PatientCreate, PatientListView, PatientUpdate, PatientDelete

mchats_patterns = ([
	
	
	path('', MchatListView.as_view(), name='mchats'),
	path('mchat/listPatient', PatientListView.as_view(), name='patients'),	
	path('update/<int:pk>', MchatUpdate.as_view(), name='update'),
	path('mchat/start/<int:pk>', views.mchat_start, name='mchat_start'),
	path('mchat/followup/<int:pk>', views.followup_mchat, name='followup_mchat'),
	path('mchat/patient', PatientCreate.as_view(), name='patient_create'),
	path('mcaht/patientEdit/<int:pk>', PatientUpdate.as_view(), name='patient_update'),
	path('mchat/patient/result/<int:pk>', views.patient_result, name='patient_result'),
	path('mchat/patientDelete/<int:pk>', PatientDelete.as_view(), name='patient_delete'),
	path('mchat/graphic', views.graphics, name='graphic_mchat'),

		
	], 'mchats')