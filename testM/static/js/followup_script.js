jQuery(document).ready(function(){
			var count = 0;
			var element = jQuery("div");
			var this_element = jQuery("div");
			var other_element = jQuery("div");
		  jQuery(".close").click(function(){
		    jQuery("#myAlert").alert("close");
		  });

		  jQuery("#form_customq").on('submit',function(){
		  	var post_url = jQuery("#form_customq").attr("action");
		    var formData = new FormData(this);

		    jQuery.ajax({

				url : post_url,
				type: "POST",
				data : formData,
				processData: false,
				contentType: false,
				success:function(response){
					console.log("response");
					var message = response.content.message;

					alert(message);
					
					},	
			});

		    return false;
		  });

		  jQuery("#undoClick").click(function(){
		    var get_url = jQuery("#undoClick").attr("href");
		    jQuery.ajax({

				url : get_url,
				type: "GET",
				success:function(response){
					console.log("response");
					var message = response.content.message;

					alert(message);
					
					},	
			});
		    return false;
		  });

		  
		  
		  const question_id_js = JSON.parse(document.getElementById('question_id').textContent);

		  switch(question_id_js){

		  	case 1:
		  	var listN = [];
		  	var listE = [];

		  	jQuery("input").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "True"){
			    		listE.push(jQuery(this).attr("name"));
			    	}
			    	else{
			    		listN.push(jQuery(this).attr("name"));
			    		count++;

			    	}

			  	}			  	
  
			});


			if(listE.length > 0){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}
		  	jQuery("#item_1").removeClass('d-none');

		  	jQuery("input[value='True']").click(function(){
  				other_element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",false);
		  			element = jQuery(this);
		  			if(listN.indexOf(other_element) != -1){
		  				listN.splice(listN.indexOf(other_element), 1);
		  				count--;
		  				}

		  				if(listE.indexOf(other_element) == -1){
		  				listE.push(other_element);
		  				}
  			});

  			jQuery("input[value='False']").click(function(){
  				this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){
		  			jQuery("#buttonnext").prop("disabled",true);
		  			element = jQuery(this).attr("name");
		  			count++;

		  			if(listN.indexOf(this_element) == -1){
		  			listN.push(this_element);
		  			
		  			}

		  			if(listE.length > 0){
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}

		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);
		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					jQuery("#buttonnext").prop("disabled",true);
		  				}
		  				}
		  		}

		  		if(count > 0 && (listN.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count >= 7){
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}
		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);		  				
		  				}

		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					jQuery("#buttonnext").prop("disabled",true);

		  				}

		  			
		  			listN.push(this_element);	  			
		  			
		  		}
  			});



		  	break;

		  	case 2:
		  	var listE = [];

		  	jQuery("input[name!=form-2-option][name!=form-3-extra_option]").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "False"){
			    		count++;
			    	}
			    	else{
			    		listE.push(jQuery(this));
			    	}

			  	}			  	
  
			});


			if(count == 2 || listE.length > 0){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}
		  	
		  	jQuery("input[value='True'][name!=form-2-option]").click(function(){
		    	jQuery("#buttonnext").prop("disabled",false);
		  	});

		  	jQuery("input[value='False'][name!=form-2-option]").click(function(){
		  		if(count == 0 && element != jQuery(this).attr("name")){

		  			element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",true);
		  			count++;
		  		}

		  		if(count > 0 && element != jQuery(this).attr("name")){
		  			count++;
		  			if(count == 2){
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}
		  			else{
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}
		  		}

		  		
		  	});
		  	
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
		  	var listE = [];
		  	var listN = [];

		  	jQuery("input").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "True"){
			    		listN.push(jQuery(this).attr("name"));
			    	}
			    	else{
			    		listE.push(jQuery(this).attr("name"));
			    		count++;

			    	}

			  	}			  	
  
			});


			if(listN.length > 0 || listE.length == 11){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}


			  
		  	jQuery("#item_3").removeClass('d-none');
		  	jQuery("input[value='True']").click(function(){
		    	jQuery("#buttonnext").prop("disabled",false);
		    	other_element = jQuery(this).attr("name");
		    	element = jQuery(this);
		  		
		  			if(listE.indexOf(other_element) != -1){
		  				listE.splice(listE.indexOf(other_element), 1);
		  				count--;
		  				}

		  			if(listN.indexOf(other_element) == -1){
		  				listN.push(other_element);
		  				}
		  			if(other_element == 'form-10-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}		  			
		  			
		  	});

		  	jQuery("input[value='False']").click(function(){
		  		this_element = jQuery(this).attr("name");
		  		
		  		if(count == 0 && element != this_element){

		  			element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",true);
		  			count++;
		  			if(listE.indexOf(this_element) == -1){
		  			listE.push(this_element);
		  			
		  			}

		  			if(listN.indexOf(this_element) != -1){
		  				listN.splice(listN.indexOf(this_element), 1);
		  				if(listN.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					jQuery("#buttonnext").prop("disabled",true);
		  				}
		  				}
		  		}

		  		if(count > 0 && (listE.indexOf(this_element) == -1)){
		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count >= 10){
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}

		  			listE.push(this_element);

		  			if(listN.indexOf(this_element) != -1){
		  				listN.splice(listN.indexOf(this_element), 1);		  				
		  				}

		  				if(listN.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					if(count >= 10){
		  						jQuery("#buttonnext").prop("disabled",false);
		  					}
		  					else{
		  						jQuery("#buttonnext").prop("disabled",true);
		  					}
		  				}
		  		}

		  		if(this_element == 'form-10-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}		

		  		
		  	});

		  	break;

		  	case 4:
		  	var listE = [];
		  	var listN = [];

		  	jQuery("input").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "True"){
			    		listN.push(jQuery(this).attr("name"));
			    	}
			    	else{
			    		listE.push(jQuery(this).attr("name"));
			    		count++;

			    	}

			  	}			  	
  
			});


			if(listN.length > 0 || listE.length == 4){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}
		  	jQuery("#item_4").removeClass('d-none');

		  	jQuery("input[value='True']").click(function(){
		    	jQuery("#buttonnext").prop("disabled",false);
		    	other_element = jQuery(this).attr("name");
		    	element = jQuery(this);
		  		
		  			if(listE.indexOf(other_element) != -1){
		  				listE.splice(listE.indexOf(other_element), 1);
		  				count--;
		  				}

		  			if(listN.indexOf(other_element) == -1){
		  				listN.push(other_element);
		  				}
		  	});

		  	jQuery("input[value='False']").click(function(){
		  		this_element = jQuery(this).attr("name");
		  		
		  		if(count == 0 && element != this_element){

		  			element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",true);
		  			count++;
		  			if(listE.indexOf(this_element) == -1){
		  			listE.push(this_element);
		  			
		  			}

		  			if(listN.indexOf(this_element) != -1){
		  				listN.splice(listN.indexOf(this_element), 1);		  				
		  				}

		  				if(listN.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					jQuery("#buttonnext").prop("disabled",true);
		  				}
		  		}

		  		if(count > 0 && (listE.indexOf(this_element) == -1)){
		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count >= 4){
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}

		  			listE.push(this_element);

		  			if(listN.indexOf(this_element) != -1){
		  				listN.splice(listN.indexOf(this_element), 1);		  				
		  				}

		  				if(listN.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					if(count >= 4){
		  						jQuery("#buttonnext").prop("disabled",false);
		  					}
		  					else{
		  						jQuery("#buttonnext").prop("disabled",true);
		  					}
		  					
		  				}
		  		}

		  		
		  	});

		  	break;

		  	case 5:
		  	var listE = [];

		  	jQuery("input[name!=form-0-option][name!=form-1-option][name!=form-7-option]").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "False"){
			    		listE.push(jQuery(this).attr("name"));
			    		count++;
			    	}

			  	}			  	
  
			});


			if(listE.length ==  5 || jQuery("input[name=form-7-option],#id_form-0-option_0,#id_form-1-option_0").is(":checked") == true){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}


		  	jQuery("#item_5").removeClass('d-none');
		  	jQuery("input[value='True'][name!=form-0-option][name!=form-1-option][name!=form-7-option]").click(function(){
		  		this_element = jQuery(this);
		  		other_element = jQuery(this).attr("name");
		  		element = jQuery(this);

		  		if(listE.indexOf("form-7-option") == -1){
		  			jQuery("#buttonnext").prop("disabled",true);
		  			if(listE.indexOf(other_element) != -1){
		  				listE.splice(listE.indexOf(other_element), 1);
		  				count--;
		  				}		  			
		  			}
		  		if(document.getElementById("span_5")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_5\">**</span>");
		  			document.getElementById("span_5").innerHTML = "ver pregunta 8";
		  			jQuery("#id_form-7-question").removeClass('d-none');		  			
        			jQuery("#id_form-7-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 8.</span>");
		  		}
		  		if(other_element == 'form-6-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}

        		
  			});

  			jQuery("input[value='False'][name!=form-0-option][name!=form-1-option][name!=form-7-option]").click(function(){
  				
		  		if(other_element == jQuery(this).attr("name")){
		  			jQuery("#id_form-7-question").addClass('d-none');
		  			jQuery("input[name=form-7-option]").prop("checked",false)
		  			jQuery("#span_5").remove();
		  			jQuery("#span_done").remove();

		  		}
		  		this_element = jQuery(this).attr("name");
		  		
		  		if(count == 0 && element != this_element){

		  			element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",true);
		  			count++;
		  			if(listE.indexOf(this_element) == -1){
		  			listE.push(this_element);
		  			
		  			}
		  		}

		  		if(count > 0 && (listE.indexOf(this_element) == -1)){
		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count == 5){
		  				jQuery("input[name=form-7-option]").prop("checked",false)
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}
		  			else{
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}

		  			listE.push(this_element);
		  		}

		  		if(this_element == 'form-6-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}		
        		
  			});


  			jQuery("input[name=form-7-option]").click(function(){
		  		jQuery("#buttonnext").prop("disabled",false);
		  		if(listE.indexOf(jQuery(this).attr("name")) == -1){
		  			listE.push(jQuery(this).attr("name"));
		  		}        		
  			});

  			jQuery("input[value='True'][name=form-0-option],input[value='True'][name=form-1-option]").click(function(){
  				other_element = jQuery(this).attr("name")
  				jQuery("input[name!=form-0-option][name!=form-1-option]").prop("checked",false)
		  		jQuery("#buttonnext").prop("disabled",false);
		  		jQuery("#id_form-7-question").addClass('d-none');
		  		jQuery("div[id=NOPASA]").addClass('d-none');
		  		jQuery("#span_5").remove();
		  		jQuery("#span_done").remove();        		
  			});

  			jQuery("input[value='False'][name=form-0-option],input[value='False'][name=form-1-option]").click(function(){
  				if(other_element == jQuery(this).attr("name")){
  					jQuery("#buttonnext").prop("disabled",true);
		  			jQuery("#id_form-7-question").addClass('d-none');
		  			jQuery("div[id=NOPASA]").removeClass('d-none');  
  				}
		  		      		
  			});			  	
		  	break;



		  	case 6:
		  	jQuery("#item_6").removeClass('d-none');
		  	var listE = [];	

		  	jQuery("input[name!=form-4-option]").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "False"){
			    		listE.push(jQuery(this).attr("name"));
			    		count++;
			    	}

			  	}			  	
  
			});


			if(listE.length ==  4 || jQuery("input[name=form-4-option]").is(":checked") == true){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}	  	
		  	jQuery("input[value='True'][name!=form-4-option]").click(function(){
		  		this_element = jQuery(this);
		  		other_element = jQuery(this).attr("name");
		  		element = jQuery(this);

		  		if(listE.indexOf("form-4-option") == -1){
		  			jQuery("#buttonnext").prop("disabled",true);
		  			if(listE.indexOf(other_element) != -1){
		  				listE.splice(listE.indexOf(other_element), 1);
		  				count--;
		  				}		  			
		  			}


		  		if(document.getElementById("span_6")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_6\">**</span>");
		  			document.getElementById("span_6").innerHTML = "ver pregunta 5";
		  			jQuery("#id_form-4-question").removeClass('d-none');
		  			jQuery("#id_form-4-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 5.</span>");
		  		}

		  		
        		
  			});

  			jQuery("input[name=form-4-option]").click(function(){
		  		//this_element = jQuery(this).attr("name");
		  		jQuery("#buttonnext").prop("disabled",false);
		  		if(listE.indexOf(jQuery(this).attr("name")) == -1){
		  			listE.push(jQuery(this).attr("name"));
		  		}
		  			  		
        		
  			});

  			jQuery("input[value='False'][name!=form-4-option]").click(function(){
		  		if(other_element == jQuery(this).attr("name")){
		  			jQuery("input[name=form-4-option]").prop("checked", false);
		  			jQuery("#id_form-4-question").addClass('d-none');
		  			jQuery("#span_6").remove();
		  			jQuery("#span_done").remove();
		  			jQuery("#buttonnext").prop("disabled",true);		  			

		  		}

		  		this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",true);
		  			count++;

		  			if(listE.indexOf(this_element) == -1){
		  			listE.push(this_element);
		  			
		  			}
		  		}

		  		if(count > 0 && (listE.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count == 4){
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}
		  			else{
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}
		  			
		  			listE.push(this_element);
		  			
		  			
		  		}
	
        		
  			});
		  	break;

		  	case 7:
		  	var listE = [];
		  	jQuery("input[name!=form-4-option][name!=form-5-option]").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "False"){
			    		listE.push(jQuery(this).attr("name"));
			    		count++;
			    	}

			  	}			  	
  
			});


			if(listE.length ==  4 || jQuery("input[name=form-5-option],#id_form-4-option_1").is(":checked") == true){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}	
		  	jQuery("#item_7").removeClass('d-none');
		  	jQuery("input[value='True'][name!=form-4-option][name!=form-5-option]").click(function(){
		  		this_element = jQuery(this);
		  		other_element = jQuery(this).attr("name");
		  		element = jQuery(this);		  		

		  		if(listE.indexOf("form-5-option") == -1){
		  			jQuery("#buttonnext").prop("disabled",true);
		  			if(listE.indexOf(other_element) != -1){
		  				listE.splice(listE.indexOf(other_element), 1);
		  				count--;
		  				}		  			
		  			}
		  		if(document.getElementById("span_7") || document.getElementById("span_72")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_7\">**</span>");
		  			document.getElementById("span_7").innerHTML = "ver pregunta 5";
		  			jQuery("#id_form-4-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 5.</span>");
		  			jQuery("#id_form-4-question").removeClass('d-none');
		  		}
        		
  			});

  			jQuery("input[value='False'][name!=form-4-option][name!=form-5-option]").click(function(){
  				
		  		if(other_element == jQuery(this).attr("name")){
		  			jQuery("input[name=form-4-option],input[name=form-5-option").prop('checked', false);
		  			jQuery("#id_form-4-question").addClass('d-none');
		  			jQuery("#id_form-5-question").addClass('d-none');
		  			jQuery("#span_7").remove();
		  			jQuery("#span_done").remove();

		  		}


		  		this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",true);
		  			count++;

		  			if(listE.indexOf(this_element) == -1){
		  			listE.push(this_element);
		  			
		  			}
		  		}

		  		if(count > 0 && (listE.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count == 4){
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}
		  			else{
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}

		  			if(listE.indexOf("form-5-option") != -1){
		  				listE.splice(listE.indexOf("form-5-option"), 1);
		  				}
		  			
		  			listE.push(this_element);
		  			
		  			
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
		  			jQuery("#buttonnext").prop("disabled",true);
		  		}
        		
  			});


  			jQuery("#id_form-4-option_1").click(function(){
  					jQuery("input[name=form-5-option]").prop('checked', false);
		  			jQuery("#span_72").remove();
		  			jQuery("#id_form-5-question").addClass('d-none');
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listE.indexOf("form-5-option") != -1){
		  			listE.splice(listE.indexOf("form-5-option"), 1);
		  		}		  		
        		
  			});

  			jQuery("input[name=form-5-option]").click(function(){
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listE.indexOf(jQuery(this).attr("name")) == -1){
		  			listE.push(jQuery(this).attr("name"));
		  		}

        		
  			});
		  	break;

		  	case 8:
		  	var listE = [];

		  	jQuery("input[name!=form-0-option][name!=form-8-option]").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "False"){
			    		listE.push(jQuery(this).attr("name"));
			    		count++;
			    	}

			  	}			  	
  
			});


			if(listE.length ==  7 || jQuery("input[name=form-8-option],#id_form-0-option_1").is(":checked") == true){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}		  	
		  	jQuery("#item_8").removeClass('d-none');
		  	jQuery("div[id=PASA]").addClass('d-none');
		  	jQuery("input[value='True'][name!=form-0-option][name!=form-8-option]").click(function(){
		  		this_element = jQuery(this)
		  		other_element = jQuery(this).attr("name");
		  		element = jQuery(this);
		  		jQuery("#buttonnext").prop("disabled",true);
		  		if(listE.indexOf("form-8-option") == -1){
		  			jQuery("#buttonnext").prop("disabled",true);
		  			if(listE.indexOf(other_element) != -1){
		  				listE.splice(listE.indexOf(other_element), 1);
		  				count--;
		  				}		  			
		  			}
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
		  		if(other_element == jQuery(this).attr("name")){
		  			jQuery("input[name=form-8-option]").prop('checked', false);
		  			jQuery("#id_form-8-question").addClass('d-none');
		  			jQuery("#span_8").remove();
		  			jQuery("#span_done").remove();		  			

		  		}

		  		this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",true);
		  			count++;

		  			if(listE.indexOf(this_element) == -1){
		  			listE.push(this_element);
		  			
		  			}
		  		}

		  		if(count > 0 && (listE.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			
		  			if(count >= 7){
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}
		  			else{
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}

		  			if(listE.indexOf("form-8-option") != -1){
		  				listE.splice(listE.indexOf("form-8-option"), 1);
		  				}	
		  			
		  			listE.push(this_element);
		  			
		  			
		  		}	


  			});

  			jQuery("input[value='False'][name=form-0-option]").click(function(){		  		
		  			jQuery("input[name!=form-0-option]").prop('checked', false);
		  			jQuery("#PASA,#id_form-8-question").addClass('d-none');
		  			jQuery("#span_8").remove();
		  			jQuery("#span_done").remove();
		  			jQuery("#buttonnext").prop("disabled",false);
		  			listE = [];
		  			jQuery(this).parent().after("<span class=\"badge badge-warning\" id=\"noneed\">*Ya puedes pasar a la siguiente página, esta respuesta es concluyente</span>");
  			});

  			jQuery("input[name=form-8-option]").click(function(){		  		
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listE.indexOf(jQuery(this).attr("name")) == -1){
		  			listE.push(jQuery(this).attr("name"));
		  		}
  			});

  			jQuery("input[value='True'][name=form-0-option]").click(function(){		  		
		  			jQuery("div[id=PASA]").removeClass('d-none');
		  			jQuery("#noneed").remove();
		  			jQuery("#buttonnext").prop("disabled",true);
  			});
		  	break;

		  	case 9:
		  	var listE = [];
		  	jQuery("input[name!=form-6-option]").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "False"){
			    		listE.push(jQuery(this).attr("name"));
			    		count++;
			    	}

			  	}			  	
  
			});


			if(listE.length ==  6 || jQuery("input[name=form-6-option]").is(":checked") == true){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}

		  	jQuery("#item_9").removeClass('d-none');
		  	jQuery("input[value='True'][name!=form-6-option]").click(function(){
		  		this_element = jQuery(this)
		  		other_element = jQuery(this).attr("name");
		  		element = jQuery(this);
		  		jQuery("#buttonnext").prop("disabled",true);

		  		if(listE.indexOf("form-6-option") == -1){
		  			jQuery("#buttonnext").prop("disabled",true);
		  			if(listE.indexOf(other_element) != -1){
		  				listE.splice(listE.indexOf(other_element), 1);
		  				count--;
		  				}		  			
		  			}

		  		if(document.getElementById("span_9")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_9\">**</span>");
		  			document.getElementById("span_9").innerHTML = "ver pregunta 7";
		  			jQuery("#id_form-6-question").removeClass('d-none');
		  			jQuery("#id_form-6-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 7.</span>");

		  		}

		  		if(other_element == 'form-5-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}
        		
  			});

  			jQuery("input[value='False'][name!=form-6-option]").click(function(){
		  		if(other_element == jQuery(this).attr("name")){
		  			jQuery("input[name=form-6-option]").prop('checked', false);
		  			jQuery("#id_form-6-question").addClass('d-none');
		  			jQuery("#span_9").remove();
		  			jQuery("#span_done").remove();

		  		}

		  			this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",true);
		  			count++;

		  			if(listE.indexOf(this_element) == -1){
		  			listE.push(this_element);
		  			
		  			}
		  		}

		  		if(count > 0 && (listE.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count == 6){
		  				jQuery("#buttonnext").prop("disabled",false);
		  				jQuery("input[name=form-6-option]").prop('checked', false);
		  			}
		  			else{
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}

		  			if(listE.indexOf("form-6-option") != -1){
		  				listE.splice(listE.indexOf("form-6-option"), 1);
		  				}
		  			
		  			listE.push(this_element);	  			
		  			
		  		}

		  		if(this_element == 'form-5-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}


  			});

  			jQuery("input[name=form-6-option]").click(function(){		  		
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listE.indexOf(jQuery(this).attr("name")) == -1){
		  			listE.push(jQuery(this).attr("name"));
		  		}
  			});
		  	break;


		  	case 10:
		  	var listN = [];
		  	var listE = [];

		  	jQuery("input").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "True"){
			    		listE.push(jQuery(this).attr("name"));
			    	}
			    	else{
			    		listN.push(jQuery(this).attr("name"));
			    		count++;

			    	}

			  	}			  	
  
			});


			if(listE.length > 0){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}
		  	jQuery("#item_10").removeClass('d-none');

		  	jQuery("input[value='True']").click(function(){
  				jQuery("#buttonnext").prop("disabled",false);
  				other_element = jQuery(this).attr("name");
  				element = jQuery(this);
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listN.indexOf(other_element) != -1){
		  				listN.splice(listN.indexOf(other_element), 1);
		  				count--;
			  				
		  				}

		  			if(listE.indexOf(other_element) == -1){
		  				listE.push(other_element);
		  				}
  			});

  			jQuery("input[value='False']").click(function(){
  				this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			count++;

		  			if(listN.indexOf(this_element) == -1){
		  			listN.push(this_element);
		  			
		  			}


		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);
		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					jQuery("#buttonnext").prop("disabled",true);
		  				}
		  				}
		  		}

		  		if(count > 0 && (listN.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count >= 7){
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}

		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);		  				
		  				}

		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{		  					
		  						jQuery("#buttonnext").prop("disabled",true); 			

		  				}
		  			
		  			listN.push(this_element);	  			
		  			
		  		}
  			});

		  	break;

		  	case 11:
		  	var listN = [];
		  	var listE = [];

		  	jQuery("input").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "True"){
			    		listE.push(jQuery(this).attr("name"));
			    	}
			    	else{
			    		listN.push(jQuery(this).attr("name"));
			    		count++;

			    	}

			  	}			  	
  
			});


			if(listE.length > 0){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}
		  	jQuery("#item_11").removeClass('d-none');

		  	jQuery("input[value='True']").click(function(){
  				jQuery("#buttonnext").prop("disabled",false);
  				other_element = jQuery(this).attr("name");
  				element = jQuery(this);
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listN.indexOf(other_element) != -1){
		  				listN.splice(listN.indexOf(other_element), 1);
		  				count--;
			  		
		  				}

		  				if(listE.indexOf(other_element) == -1){
		  				listE.push(other_element);
		  				}
  			});

  			jQuery("input[value='False']").click(function(){
  				this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			count++;

		  			if(listN.indexOf(this_element) == -1){
		  			listN.push(this_element);
		  			
		  			}

		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);
		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					jQuery("#buttonnext").prop("disabled",true);
		  				}
		  				}
		  		}

		  		if(count > 0 && (listN.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count == 6){
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}

		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);		  				
		  				}

		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{		  					
		  						jQuery("#buttonnext").prop("disabled",true); 			

		  				}
		  			
		  			listN.push(this_element);	  			
		  			
		  		}
  			});

		  	break;

		  	case 12:		  	
		  	var listE = [];
		  	var listN = [];
		  	var countn = 0;

		  	jQuery("input[name!=form-10-option][name!=form-11-option][name!=form-12-option][name!=form-13-option][name!=form-14-option]").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "True"){
			    		listE.push(jQuery(this).attr("name"));
			    		count++;
			    	}

			  	}			  	
  
			});

			jQuery("input[name=form-10-option],[name=form-11-option],[name=form-12-option],[name=form-13-option],[name=form-14-option]").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "False"){
			    		listN.push(jQuery(this).attr("name"));
			    		countn++;
			    	}

			  	}			  	
  
			});


			if(listE.length < 2 || listN.length < 5){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}

		  	jQuery("#item_12").removeClass('d-none');
		  	jQuery("div[id=PASA],[id=NOPASA]").addClass('d-none');

		  	jQuery("input[value='True'][name!=form-10-option][name!=form-11-option][name!=form-12-option][name!=form-13-option][name!=form-14-option]").click(function(){
		  		
		  		this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listE.indexOf(this_element) == -1){
		  			listE.push(this_element);
		  			
		  			}
		  		}

		  		if(count > 0 && (listE.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count == 2){
		  				jQuery("div[id=PASA],[id=NOPASA]").removeClass('d-none');
		  				alert("Se han añadido más cuestiones en la parte inferior.")
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}
		  			
		  			listE.push(this_element);	  			
		  			
		  		}

		  		if(this_element == 'form-9-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}
		  				  		
  			});


  			jQuery("input[value='False'][name!=form-10-option][name!=form-11-option][name!=form-12-option][name!=form-13-option][name!=form-14-option]").click(function(){
		  		

		  		other_element = jQuery(this).attr("name");
		  			element = jQuery(this);
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listE.indexOf(other_element) != -1){
		  				listE.splice(listE.indexOf(other_element), 1);
		  				count--;
			  				if(count < 2 && count >= 0){
			  					jQuery("#buttonnext").prop("disabled",false);
			  					jQuery("div[id=PASA],[id=NOPASA]").addClass('d-none');
			  				}
			  				else{
			  					jQuery("#buttonnext").prop("disabled",true);
			  				}
		  				}	

		  				if(other_element == 'form-9-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  				}	  			
		  		  		
		  	
		  				  		
  			});

  			jQuery("input[value='True']").filter("[name=form-10-option],[name=form-11-option],[name=form-12-option],[name=form-13-option],[name=form-14-option]").click(function(){
  				jQuery("#buttonnext").prop("disabled",false);
  				other_element = jQuery(this).attr("name");
  				element = jQuery(this);
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listN.indexOf(other_element) != -1){
		  				listN.splice(listN.indexOf(other_element), 1);
		  				countn--;
			  				if(countn < 6 && countn > 0){
			  					jQuery("#buttonnext").prop("disabled",false);
			  				}
			  				else{
			  					jQuery("#buttonnext").prop("disabled",true);
			  				}
		  				}
  			});

  			jQuery("input[value='False']").filter("[name=form-10-option],[name=form-11-option],[name=form-12-option],[name=form-13-option],[name=form-14-option]").click(function(){
  				this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(countn == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			countn++;

		  			if(listN.indexOf(this_element) == -1){
		  			listN.push(this_element);
		  			
		  			}
		  		}

		  		if(countn > 0 && (listN.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			countn++;
		  			if(countn == 5){
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}
		  			else{
		  				
		  			}
		  			
		  			listN.push(this_element);	  			
		  			
		  		}
  			});

		  	break;

		  	case 13:
		  	jQuery("#item_13").removeClass('d-none');

		  	if (jQuery("input").is(":checked") == true){
		  		jQuery("#buttonnext").prop("disabled",false);
		  	}
		  	jQuery("input").click(function(){
  				jQuery("#buttonnext").prop("disabled",false);
  			});

		  	break;

		  	case 14:
		  	var listE = [];
		  	var listN = [];
		  	var countn = 0;
		  	// recorrer solo las que nos interesan
		  	jQuery("input[name!=form-6-option][name!=form-7-option]").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "True"){
			    		listE.push(jQuery(this).attr("name"));
			    		count++;
			    	}
			    	else{
			    		listN.push(jQuery(this).attr("name"));
			    		countn++;

			    	}

			  	}			  	
  
			});


			if(listE.length >= 2 || listN.length == 6){
		  			jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else if(jQuery("id_form-6-option_1").is(":checked") == true || jQuery("input[name=form-7-option]").is(":checked") == true){
			  		jQuery("#buttonnext").prop("disabled",false);
			  	}
			  	else{
			  		jQuery("#buttonnext").prop("disabled",true);
			  	}
		  	
		  	jQuery("#item_14").removeClass('d-none');		  	
		  	jQuery("input[value='True'][name!=form-6-option][name!=form-7-option]").click(function(){
		  		other_element = jQuery(this);

        		this_element = jQuery(this).attr("name");
		  		
		  		if(count == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			jQuery("#buttonnext").prop("disabled",true);
		  			count++;
		  			other_element.parent().after("<span class=\"badge badge-warning\" id=\"span_14\">**</span>");
				  	document.getElementById("span_14").innerHTML = "ver pregunta 7";
				  	jQuery("#id_form-6-question").removeClass('d-none');
				  	jQuery("#id_form-6-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 7.</span>");

		  			if(listE.indexOf(this_element) == -1){
		  			listE.push(this_element);
		  			
		  			}

		  			if(listN.indexOf(this_element) != -1){
		  				listN.splice(listN.indexOf(this_element), 1);
		  				countn--;
		  			
		  			}
		  		}

		  		if(count > 0 && (listE.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count >= 2){
		  				jQuery("#id_form-6-question").addClass('d-none');
		        		jQuery("input[name=form-6-option]").prop('checked', false);
		        		jQuery("#span_14").remove();
		        		jQuery("#span_142").remove();
		        		jQuery("#span_done").remove();
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}
		  			else{
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}
		  			
		  			listE.push(this_element);
		  			if(listN.indexOf(this_element) != -1){
		  			listN.splice(listN.indexOf(this_element), 1);
		  			countn--;		  			
		  			
		  			}	  			
		  			
		  		}
  			});

  			jQuery("input[value='False'][name!=form-6-option][name!=form-7-option]").click(function(){
		  		
		  		this_element = jQuery(this).attr("name");


		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);
		  				count--;		  				
		  				if(listN.indexOf(this_element) == -1){
		  					element = jQuery(this);		  					
		  					listN.push(this_element);
		  					countn++;		  					
		  					if(countn == 6){
		  						jQuery("#id_form-6-question").addClass('d-none');
		        				jQuery("input[name=form-6-option]").prop('checked', false);
		        				jQuery("#span_14").remove();
		        				jQuery("#span_142").remove();
		        				jQuery("#span_done").remove();
				  				jQuery("#buttonnext").prop("disabled",false);
				  			}
		  				}
		  						  				
			  				if(count < 2 && count >= 0 && countn < 6){
			  					jQuery("#id_form-6-question").addClass('d-none');
		        				jQuery("input[name=form-6-option]").prop('checked', false);
		        				jQuery("#span_14").remove();
		        				jQuery("#span_142").remove();
		        				jQuery("#span_done").remove();
			  					jQuery("#buttonnext").prop("disabled",true);

			  					if(count == 1){
			  						jQuery("input[value='True'][name="+listE[0]+"]").parent().after("<span class=\"badge badge-warning\" id=\"span_14\">**</span>");
				  					document.getElementById("span_14").innerHTML = "ver pregunta 7";
				  					jQuery("#id_form-6-question").removeClass('d-none');
				  					jQuery("#id_form-6-question").before("<span class=\"badge badge-success\" id=\"span_done\">Ya no es necesario responder mas preguntas excepto la pregunta 7.</span>");
			  					}

			  					
			  				}
			  				else{
			  					jQuery("#buttonnext").prop("disabled",false);
			  				}
		  				}else{
		  					if(listN.indexOf(this_element) == -1){
		  						element = jQuery(this);
			  					listN.push(this_element);
			  					countn++;
			  					if(countn == 6){
				  					jQuery("#buttonnext").prop("disabled",false);
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
		  			jQuery("#buttonnext").prop("disabled",true);
        			
		  		}
        		
  			});

  			jQuery("#id_form-6-option_1").click(function(){
  				jQuery("input[name=form-7-option]").prop('checked', false);
			  	jQuery("#id_form-7-question").addClass('d-none');
			  	jQuery("#span_142").remove();
			  	jQuery("#buttonnext").prop("disabled",false);
        		
  			});

  			jQuery("input[name=form-7-option]").click(function(){
			  	jQuery("#buttonnext").prop("disabled",false);
        		
  			});


		  	break;

		  	case 15:

		  	if (jQuery("input").is(":checked") == true){
		  		jQuery("#buttonnext").prop("disabled",false);
		  	}

		  	jQuery("#item_15").removeClass('d-none');
		  	jQuery("input").click(function(){
			  	jQuery("#buttonnext").prop("disabled",false);
			  	if(jQuery(this).attr("name") == 'form-6-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}
        		
  			});

		  	break;

		  	case 16:
		  	var listN = [];
		  	var listE = [];

		  	jQuery("input").each(function( index ) {
			  	if(jQuery(this).is(":checked") == true){

			  		if(jQuery(this).attr("value") == "True"){
			    		listE.push(jQuery(this).attr("name"));

			    	}
			    	else{
			    		listN.push(jQuery(this).attr("name"));
			    		count++;

			    	}

			  	}

			  	
  
			});

			if(listE.length > 0){
		  		jQuery("#buttonnext").prop("disabled",false);
		  	}
		  	else{
		  		jQuery("#buttonnext").prop("disabled",true);
		  	}
		  	jQuery("#item_16").removeClass('d-none');

		  	jQuery("input[value='True']").click(function(){
  				jQuery("#buttonnext").prop("disabled",false);
  				other_element = jQuery(this).attr("name");
  				element = jQuery(this);
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listN.indexOf(other_element) != -1){
		  				listN.splice(listN.indexOf(other_element), 1);
		  				count--;
		  				}

		  				if(listE.indexOf(other_element) == -1){
		  				listE.push(other_element);
		  				}
  			});

  			jQuery("input[value='False']").click(function(){
  				this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){

		  			element = jQuery(this).attr("name");
		  			count++;

		  			if(listN.indexOf(this_element) == -1){
		  			listN.push(this_element);
		  			
		  			}

		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);
		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					jQuery("#buttonnext").prop("disabled",true);
		  				}
		  				}
		  		}

		  		if(count > 0 && (listN.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count == 5){
		  				jQuery("#buttonnext").prop("disabled",true);
		  			}

		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);		  				
		  				}

		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{		  					
		  						jQuery("#buttonnext").prop("disabled",true); 			

		  				}
		  			
		  			listN.push(this_element);	  			
		  			
		  		}
  			});

		  	break;

		  	case 17:
		  	if (jQuery("input").is(":checked") == true){
		  		jQuery("#buttonnext").prop("disabled",false);
		  	}

		  	jQuery("#item_17").removeClass('d-none');

		  	jQuery("input").click(function(){
		  		jQuery("#buttonnext").prop("disabled",false);
		  		if(jQuery(this).attr("name") == 'form-4-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}
  				
  			});

		  	break;


		  	case 18:

		  	if (jQuery("input[name=form-2-option],[name=form-3-option],[name=form-4-option]").is(":checked") == true || jQuery("#id_form-1-option_1").is(":checked") == true ){
		  		jQuery("#buttonnext").prop("disabled",false);
		  	}
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
  					jQuery("div[id=GROUP]").removeClass('d-none');
		  			jQuery("input[name=form-1-option]").prop('checked', false);
		  			jQuery("#span_18").remove();
  				}		  					  		
        		
  			});

  			jQuery("#id_form-1-option_1").click(function(){
  					jQuery("div[id=GROUP]").addClass('d-none');
		  			jQuery("input[name=form-2-option],input[name=form-3-option],input[name=form-4-option]").prop('checked', false);
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(document.getElementById("noneed")){

		  			}else{
		  				jQuery(this).parent().after("<span class=\"badge badge-warning\" id=\"noneed\">*Ya puedes pasar a la siguiente página, esta respuesta es concluyente</span>");
		  				
		  			}
		  					  			
  						  					  		
        		
  			});


  			jQuery("#id_form-1-option_0").click(function(){
  					jQuery("div[id=GROUP]").removeClass('d-none');
  					jQuery("#buttonnext").prop("disabled",true);
		  			if(document.getElementById("noneed")){
		  				jQuery("#noneed").remove();
		  			} 					  		
        		
  			});


  			jQuery("input[name=form-2-option],[name=form-3-option],[name=form-4-option]").click(function(){
  					jQuery("#buttonnext").prop("disabled",false);			  		
        		
  			});
		  	break;

		  	case 19:
		  	if (jQuery("input[name=form-2-option]").is(":checked") == true || jQuery("#id_form-0-option_0,#id_form-1-option_0").is(":checked") == true ){
		  		jQuery("#buttonnext").prop("disabled",false);
		  	}
		  	jQuery("#item_19").removeClass('d-none');
		  	jQuery("#id_form-0-option_1").click(function(){
		  		this_element = jQuery(this)
		  		jQuery("#buttonnext").prop("disabled",true);
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
		  		jQuery("#buttonnext").prop("disabled",false);
		  		if(document.getElementById("noneed")){
		  			
		  		}else{
		  			jQuery(this).parent().after("<span class=\"badge badge-warning\" id=\"noneed\">*Ya puedes pasar a la siguiente página, esta respuesta es concluyente</span>");
		  		}
		  		
		  		jQuery("input[name=form-1-option],input[name=form-2-option]").prop('checked', false);
		  		jQuery("#span_19").remove();
		  		jQuery("#span_191").remove();
		  		jQuery("#noneed1").remove();
        		
  			});

  			jQuery("#id_form-1-option_1").click(function(){
  				this_element = jQuery(this)
  				jQuery("#buttonnext").prop("disabled",true);
		  		if(document.getElementById("span_191")){

		  		}else{
		  			this_element.parent().after("<span class=\"badge badge-warning\" id=\"span_191\">**</span>");
		  			document.getElementById("span_191").innerHTML = "ver pregunta 3";
		  			jQuery("#id_form-2-question").removeClass('d-none');
		  			jQuery("#noneed1").remove();
        			
		  		}
        		
  			});

  			jQuery("#id_form-1-option_0").click(function(){
		  		jQuery("#id_form-2-question").addClass('d-none');
		  		jQuery("#buttonnext").prop("disabled",false);
		  		if(document.getElementById("noneed")){
		  			
		  		}
		  		else{
		  			jQuery(this).parent().after("<span class=\"badge badge-warning\" id=\"noneed1\">*Ya puedes pasar a la siguiente página, esta respuesta es concluyente</span>");
		  		}
		  		jQuery("input[name=form-2-option]").prop('checked', false);
		  		jQuery("#span_191").remove();
        		
  			});

  			jQuery("input[name=form-2-option]").click(function(){
		  		jQuery("#buttonnext").prop("disabled",false);
        		
  			});
		  	break;


		  	case 20:
		  	var listN = [];
		  	var listE = [];

		  	jQuery("#item_20").removeClass('d-none');


		  	jQuery("input[value='True']").click(function(){
  				jQuery("#buttonnext").prop("disabled",false);
  				other_element = jQuery(this).attr("name");
  				element = jQuery(this);
		  			jQuery("#buttonnext").prop("disabled",false);
		  			if(listN.indexOf(other_element) != -1){
		  				listN.splice(listN.indexOf(other_element), 1);
		  				count--;
		  				}

		  			if(listE.indexOf(other_element) == -1){
		  				listE.push(other_element);
		  				}

		  			if(other_element == 'form-3-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}
  			});

  			jQuery("input[value='False']").click(function(){
  				this_element = jQuery(this).attr("name");
		  		
		  		
		  		if(count == 0 && element != this_element ){
		  			jQuery("#buttonnext").prop("disabled",true);
		  			element = jQuery(this).attr("name");
		  			count++;

		  			if(listN.indexOf(this_element) == -1){
		  			listN.push(this_element);
		  			
		  			}

		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);
		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					jQuery("#buttonnext").prop("disabled",true);
		  				}
		  				}
		  		}

		  		if(count > 0 && (listN.indexOf(this_element) == -1)){

		  			element = jQuery(this).attr("name");
		  			count++;
		  			if(count == 4){
		  				jQuery("#buttonnext").prop("disabled",false);
		  			}

		  			if(listE.indexOf(this_element) != -1){
		  				listE.splice(listE.indexOf(this_element), 1);		  				
		  				}

		  				if(listE.length > 0){
		  					jQuery("#buttonnext").prop("disabled",false);
		  				}
		  				else{
		  					if (count < 4){
		  						jQuery("#buttonnext").prop("disabled",true);
		  					}
		  				}
		  			
		  			listN.push(this_element);	  			
		  			
		  		}

		  		if(this_element == 'form-3-option'){
		  				jQuery("#divQuest,#divUndoQuest").removeClass('d-none');
		  			}
  			});

		  	break;

		  	default:
		  }
		  	
		});