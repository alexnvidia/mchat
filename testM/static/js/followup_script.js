jQuery(document).ready(function(){
			var count = 0;
			var element = jQuery("div");
		  jQuery(".close").click(function(){
		    jQuery("#myAlert").alert("close");
		  });
		  
		  const question_id_js = JSON.parse(document.getElementById('question_id').textContent);

		  switch(question_id_js){

		  	case 2:
		  	jQuery("#id_form-2-option_0").click(function(){		  		
        		jQuery("#AUDIT").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});  			
		  	break;

		  	case 5:
		  	jQuery("input[value='True']").parent("label[for!=id_form-0-option_0][for!=id_form-1-option_0]").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_5")){

		  		}else{
		  			this_element.parent("li").after("<span class=\"badge badge-warning\" id=\"span_5\">**</span>");
		  			document.getElementById("span_5").innerHTML = "ver pregunta 8";
		  		}
		  		
        		jQuery("#id_form-7-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});		  	
		  	break;

		  	case 6:
		  	jQuery("input[value='True']").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_6")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_6\">**</span>");
		  			document.getElementById("span_7").innerHTML = "ver pregunta 5";
		  		}
        		jQuery("#id_form-4-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});
		  	break;

		  	case 7:
		  	jQuery("input[value='True']").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_7")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_7\">**</span>");
		  			document.getElementById("span_7").innerHTML = "ver pregunta 5";
		  		}
        		jQuery("#id_form-4-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});

  			jQuery("#id_form-4-option_0").click(function(){
  				this_element = jQuery(this)
		  		if(document.getElementById("span_72")){

		  		}else{
		  			this_element.parent("").after("<span class=\"badge badge-warning\" id=\"span_72\">**</span>");
		  			document.getElementById("span_72").innerHTML = "ver pregunta 6";
		  		}
        		jQuery("#id_form-5-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});
		  	break;

		  	case 8:
		  	jQuery("input[value='True']").parent("label[for!=id_form-0-option_0]").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_8")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_8\">**</span>");
		  			document.getElementById("span_8").innerHTML = "ver pregunta 9";
		  		}
        		jQuery("#id_form-8-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});
		  	break;

		  	case 9:
		  	jQuery("input[value='True']").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_9")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_9\">**</span>");
		  			document.getElementById("span_9").innerHTML = "ver pregunta 7";
		  		}
        		jQuery("#id_form-6-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});
		  	break;

		  	case 14:
		  	jQuery("input[value='True']").parent("label[for!=id_form-6-option_0][for!=id_form-7-option_0]").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_14")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_14\">**</span>");
		  			document.getElementById("span_14").innerHTML = "ver pregunta 7";
		  		}
		  		if(count == 0 && element != jQuery(this).attr("for")){
		  		count++;
		  		element = jQuery(this).attr("for");
		  		}
		  		if(count == 1){
        		jQuery("#id_form-6-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
        		count++;
        		}
        		else if (count >= 2 && element != jQuery(this).attr("for")){
        		jQuery("#id_form-6-question").addClass('d-none');
        		jQuery("#span_14").addClass('d-none')
        		}

        		else {


        		}
  			});

  			jQuery("#id_form-6-option_0").click(function(){
  				this_element = jQuery(this)
		  		if(document.getElementById("span_142")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_142\">**</span>");
		  			document.getElementById("span_142").innerHTML = "ver pregunta 8";
		  		}
        		jQuery("#id_form-7-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});


		  	break;

		  	case 18:

		  	jQuery("#id_form-0-option_1").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_18")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_18\">**</span>");
		  			document.getElementById("span_18").innerHTML = "ver pregunta 2";
		  		}
        		jQuery("#id_form-1-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});
		  	break;

		  	case 19:
		  	jQuery("#id_form-0-option_1").click(function(){
		  		this_element = jQuery(this)
		  		if(document.getElementById("span_19")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_19\">**</span>");
		  			document.getElementById("span_19").innerHTML = "ver pregunta 2";
		  		}
        		jQuery("#id_form-1-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});

  			jQuery("#id_form-1-option_1").click(function(){
  				this_element = jQuery(this)
		  		if(document.getElementById("span_191")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_191\">**</span>");
		  			document.getElementById("span_191").innerHTML = "ver pregunta 3";
		  		}
        		jQuery("#id_form-2-question").removeClass('d-none');
        		jQuery(document).scrollTop(jQuery(document).height());
  			});
		  	break;

		  	default:
		  }
		  	
		});