jQuery(document).ready(function(){
			var count = 0;
			var element = jQuery("div");
			var this_element = jQuery("div");
		  jQuery(".close").click(function(){
		    jQuery("#myAlert").alert("close");
		  });

		  jQuery("input").click(function(){
		    jQuery("#buttonnext").prop("disabled",false);
		  });
		  
		  const question_id_js = JSON.parse(document.getElementById('question_id').textContent);

		  switch(question_id_js){

		  	case 1:
		  	jQuery("#item_1").removeClass('d-none');

		  	break;

		  	case 2:
		  	
		  	jQuery("#item_2").removeClass('d-none');
		  	jQuery("#id_form-2-option_0").click(function(){		  		
        		jQuery("#AUDIT").removeClass('d-none');
  			});

  			jQuery("#id_form-2-option_1").click(function(){		  		
        		jQuery("#AUDIT").addClass('d-none');
        		jQuery("input[name=form-3-extra_option]").prop('checked',false);
  			});

		  		
		  	break;

		  	case 3:
		  	jQuery("#item_3").removeClass('d-none');

		  	break;

		  	case 4:
		  	jQuery("#item_4").removeClass('d-none');

		  	break;

		  	case 5:
		  	jQuery("#item_5").removeClass('d-none');
		  	var lock = 0;
		  	jQuery("input[value='True'][name!=form-0-option][name!=form-1-option]").click(function(){
		  		this_element = jQuery(this);
		  		if(document.getElementById("span_5")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_5\">**</span>");
		  			document.getElementById("span_5").innerHTML = "ver pregunta 8";
		  			jQuery("#id_form-7-question").removeClass('d-none');
        			jQuery("#id_form-7-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 8.</span>");
		  		}
		  		

        		
  			});

  			jQuery("input[value='False'][name!=form-0-option][name!=form-1-option][name!=form-7-option]").click(function(){
  				
		  		if(this_element.attr("name") == jQuery(this).attr("name")){
		  			jQuery("#id_form-7-question").addClass('d-none');
		  			jQuery("input[name=form-7-option]").prop("checked",false)
		  			jQuery("#span_5").remove();
		  			jQuery("#span_done").remove();

		  		}		
        		
  			});		  	
		  	break;



		  	case 6:
		  	jQuery("#item_6").removeClass('d-none');
		  	jQuery("input[value='True']").click(function(){
		  		this_element = jQuery(this);
		  		if(document.getElementById("span_6")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_6\">**</span>");
		  			document.getElementById("span_6").innerHTML = "ver pregunta 5";
		  			jQuery("#id_form-4-question").removeClass('d-none');
		  			jQuery("#id_form-4-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 5.</span>");
		  		}
        		
  			});

  			jQuery("input[value='False'][name!=form-4-option]").click(function(){
		  		if(this_element.attr("name") == jQuery(this).attr("name")){
		  			jQuery("input[name=form-4-option]").prop("checked", false);
		  			jQuery("#id_form-4-question").addClass('d-none');
		  			jQuery("#span_6").remove();
		  			jQuery("#span_done").remove();

		  		}	
        		
  			});
		  	break;

		  	case 7:
		  	jQuery("#item_7").removeClass('d-none');
		  	jQuery("input[value='True']").click(function(){
		  		this_element = jQuery(this);
		  		if(document.getElementById("span_7") || document.getElementById("span_72")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_7\">**</span>");
		  			document.getElementById("span_7").innerHTML = "ver pregunta 5";
		  			jQuery("#id_form-4-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 5.</span>");
		  			jQuery("#id_form-4-question").removeClass('d-none');
		  		}
        		
  			});

  			jQuery("input[value='False'][name!=form-4-option][name!=form-5-option]").click(function(){
  				alert(this_element.attr("name"));
		  		if(this_element.attr("name") == jQuery(this).attr("name")){
		  			jQuery("input[name=form-4-option],input[name=form-5-option").prop('checked', false);
		  			jQuery("#id_form-4-question").addClass('d-none');
		  			jQuery("#id_form-5-question").addClass('d-none');
		  			jQuery("#span_7").remove();
		  			jQuery("#span_done").remove();

		  		}	
  			});

  			jQuery("#id_form-4-option_0").click(function(){
  				this_element = jQuery(this)
		  		if(document.getElementById("span_72")){

		  		}else{
		  			this_element.parent("").after("<span class=\"badge badge-warning\" id=\"span_72\">**</span>");
		  			document.getElementById("span_72").innerHTML = "ver pregunta 6";
		  			jQuery("#id_form-5-question").removeClass('d-none');
		  			jQuery("#span_done").remove();
		  		}
        		
  			});


  			jQuery("#id_form-4-option_1").click(function(){
  					jQuery("input[name=form-5-option]").prop('checked', false);
		  			jQuery("#span_72").remove();
		  			jQuery("#id_form-5-question").addClass('d-none');		  		
        		
  			});
		  	break;

		  	case 8:
		  	jQuery("#item_8").removeClass('d-none');
		  	jQuery("input[value='True'][name!=form-0-option]").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_8")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_8\">**</span>");
		  			document.getElementById("span_8").innerHTML = "ver pregunta 9";
		  			jQuery("#id_form-8-question").removeClass('d-none');
		  			jQuery("#id_form-8-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 9.</span>");
        			jQuery("#noneed").remove();
		  		}
        		
  			});

  			jQuery("input[value='False'][name!=form-0-option][name!=form-8-option]").click(function(){
		  		if(this_element.attr("name") == jQuery(this).attr("name")){
		  			jQuery("input[name=form-8-option]").prop('checked', false);
		  			jQuery("#id_form-8-question").addClass('d-none');
		  			jQuery("#span_8").remove();
		  			jQuery("#span_done").remove();

		  		}	
  			});

  			jQuery("input[value='False'][name=form-0-option]").click(function(){		  		
		  			jQuery("input[name!=form-0-option]").prop('checked', false);
		  			jQuery("#PASA,#id_form-8-question").addClass('d-none');
		  			jQuery("#span_8").remove();
		  			jQuery("#span_done").remove();
		  			jQuery(this).parent().after("<span class=\"badge badge-warning\" id=\"noneed\">*Ya puedes pasar a la siguiente página, esta respuesta es concluyente</span>");
  			});

  			jQuery("input[value='True'][name=form-0-option]").click(function(){		  		
		  			jQuery("div[id=PASA]").removeClass('d-none');
		  			jQuery("#noneed").remove();
  			});
		  	break;

		  	case 9:
		  	jQuery("#item_9").removeClass('d-none');
		  	jQuery("input[value='True'][name!=form-6-option]").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_9")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_9\">**</span>");
		  			document.getElementById("span_9").innerHTML = "ver pregunta 7";
		  			jQuery("#id_form-6-question").removeClass('d-none');
		  			jQuery("#id_form-6-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 7.</span>");

		  		}
        		
  			});

  			jQuery("input[value='False'][name!=form-6-option]").click(function(){
		  		if(this_element.attr("name") == jQuery(this).attr("name")){
		  			jQuery("input[name=form-6-option]").prop('checked', false);
		  			jQuery("#id_form-6-question").addClass('d-none');
		  			jQuery("#span_9").remove();
		  			jQuery("#span_done").remove();

		  		}	
  			});
		  	break;


		  	case 10:
		  	jQuery("#item_10").removeClass('d-none');

		  	break;

		  	case 11:
		  	jQuery("#item_11").removeClass('d-none');

		  	break;

		  	case 12:
		  	jQuery("#item_12").removeClass('d-none');

		  	break;

		  	case 13:
		  	jQuery("#item_13").removeClass('d-none');

		  	break;

		  	case 14:
		  	jQuery("#item_14").removeClass('d-none');
		  	jQuery("input[value='True'][name!=form-6-option][name!=form-7-option]").click(function(){
		  		this_element = jQuery(this)
		  		
		  		if(count == 0 && element != jQuery(this).attr("name")){		  			
		  		count++;
		  		element = jQuery(this).attr("name");
		  		}
		  		if(count == 1){
		  			if(document.getElementById("span_14")){

			  		}else{
			  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_14\">**</span>");
			  			document.getElementById("span_14").innerHTML = "ver pregunta 7";
			  			jQuery("#id_form-6-question").removeClass('d-none');
			  			jQuery("#id_form-6-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 7.</span>");
        				
			  		}
        		
        		
        		count++;
        		}
        		else if (count >= 2 && element != jQuery(this).attr("name")){
        		jQuery("#id_form-6-question").addClass('d-none');
        		jQuery("input[name=form-6-option]").prop('checked', false);
        		jQuery("#span_14").remove();
        		jQuery("#span_142").remove();
        		jQuery("#span_done").remove();
        		}

        		else {


        		}
  			});

  			jQuery("input[value='False'][name!=form-6-option][name!=form-7-option]").click(function(){
		  		if(this_element.attr("name") == jQuery(this).attr("name")){
		  			if(count - 1 < 0){
		  				count=1;
		  			}
		  			else{
		  				count--;
		  				if(count == 1){

			  				jQuery("input[name=form-6-option]").prop('checked', false);
			  				jQuery("#id_form-6-question").addClass('d-none');
			  				jQuery("#id_form-7-question").addClass('d-none');
			  				jQuery("#span_14").remove();
			  				jQuery("#span_142").remove();
			  				jQuery("#span_done").remove();
			  				count = 1;
		  				}
		  				else if(count == 0){
			  				jQuery("#id_form-6-question").addClass('d-none');
	        				jQuery("input[name=form-6-option]").prop('checked', false);
	        				jQuery("#span_14").remove();

		  				}
		  			}
		  			
		  		}	
  			});



  			jQuery("#id_form-6-option_0").click(function(){
  				this_element = jQuery(this)
		  		if(document.getElementById("span_142")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_142\">**</span>");
		  			document.getElementById("span_142").innerHTML = "ver pregunta 8";
		  			jQuery("#id_form-7-question").removeClass('d-none');
        			
		  		}
        		
  			});

  			jQuery("#id_form-6-option_1").click(function(){
  				jQuery("input[name=form-7-option]").prop('checked', false);
			  	jQuery("#id_form-7-question").addClass('d-none');
			  	jQuery("#span_142").remove();
        		
  			});


		  	break;

		  	case 15:
		  	jQuery("#item_15").removeClass('d-none');

		  	break;

		  	case 16:
		  	jQuery("#item_16").removeClass('d-none');

		  	break;

		  	case 17:
		  	jQuery("#item_17").removeClass('d-none');

		  	break;


		  	case 18:
		  	jQuery("#item_18").removeClass('d-none');

		  	jQuery("#id_form-0-option_1").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_18")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_18\">**</span>");
		  			document.getElementById("span_18").innerHTML = "ver pregunta 2";
		  			jQuery("#id_form-1-question").removeClass('d-none');
		  		}
        		
  			});

  			jQuery("#id_form-0-option_0").click(function(){
  				if(document.getElementById("span_18")){
  					jQuery("#id_form-1-question").addClass('d-none');
		  			jQuery("input[name=form-1-option]").prop('checked', false);
		  			jQuery("#span_18").remove();
  				}		  					  		
        		
  			});

  			jQuery("#id_form-1-option_1").click(function(){
  					jQuery("div[id=GROUP]").addClass('d-none');
		  			jQuery("input[name=form-2-option],input[name=form-3-option],input[name=form-4-option]").prop('checked', false);
		  			if(document.getElementById("noneed")){

		  			}else{
		  				jQuery(this).parent().after("<span class=\"badge badge-warning\" id=\"noneed\">*Ya puedes pasar a la siguiente página, esta respuesta es concluyente</span>");
		  				
		  			}
		  					  			
  						  					  		
        		
  			});


  			jQuery("#id_form-1-option_0").click(function(){
  					jQuery("div[id=GROUP]").removeClass('d-none');
		  			if(document.getElementById("noneed")){
		  				jQuery("#noneed").remove();
		  			}
		  					  			
  						  					  		
        		
  			});
		  	break;

		  	case 19:
		  	jQuery("#item_19").removeClass('d-none');
		  	jQuery("#id_form-0-option_1").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_19")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_19\">**</span>");
		  			document.getElementById("span_19").innerHTML = "ver pregunta 2";
		  			jQuery("#id_form-1-question").removeClass('d-none');
		  			jQuery("#noneed").remove();
        			
		  		}
        		
  			});

  			jQuery("#id_form-0-option_0").click(function(){
		  		jQuery("#id_form-1-question").addClass('d-none');
		  		jQuery("#id_form-2-question").addClass('d-none');
		  		if(document.getElementById("noneed")){
		  			
		  		}else{
		  			jQuery(this).parent().after("<span class=\"badge badge-warning\" id=\"noneed\">*Ya puedes pasar a la siguiente página, esta respuesta es concluyente</span>");
		  		}
		  		
		  		jQuery("input[name=form-1-option],input[name=form-2-option]").prop('checked', false);
		  		jQuery("#span_19").remove();
		  		jQuery("#span_191").remove();
        		
  			});

  			jQuery("#id_form-1-option_1").click(function(){
  				this_element = jQuery(this)
		  		if(document.getElementById("span_191")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_191\">**</span>");
		  			document.getElementById("span_191").innerHTML = "ver pregunta 3";
		  			jQuery("#id_form-2-question").removeClass('d-none');
		  			jQuery("#noneed").remove();
        			
		  		}
        		
  			});

  			jQuery("#id_form-1-option_0").click(function(){
		  		jQuery("#id_form-2-question").addClass('d-none');
		  		if(document.getElementById("noneed")){
		  			
		  		}
		  		else{
		  			jQuery(this).parent().after("<span class=\"badge badge-warning\" id=\"noneed\">*Ya puedes pasar a la siguiente página, esta respuesta es concluyente</span>");
		  		}
		  		jQuery("input[name=form-2-option]").prop('checked', false);
		  		jQuery("#span_191").remove();
        		
  			});
		  	break;


		  	case 20:
		  	jQuery("#item_20").removeClass('d-none');

		  	break;

		  	default:
		  }
		  	
		});