jQuery(function () {
    jQuery("#id_birth_date").datepicker({
      format:'dd/mm/yyyy',
      language:'es-ES',
      autoHide: true,
      autoShow: true,
    });

    jQuery('#id_birth_date').on('input', function() {
          var input=jQuery(this);
          var datenow = new Date();
          var day = input.val().slice(0,2);
          var month = input.val().slice(3,5);
          var year = input.val().slice(6,10);
          var birth_date = new Date(month + "/" + day + "/" + year);
          
          if(birth_date < datenow){input.removeClass("invalid").addClass("valid");
            jQuery('#small_fecha').addClass('d-none');
          }
          else{input.removeClass("valid").addClass("invalid");

            if(document.getElementById("small_fecha")){
              
            }
            else{
              input.after("<small style=\"color: grey\" id=\"small_fecha\">La fecha introducida no puede ser mayor que la actual.</small>");

            }
            

          }
        });



      jQuery('#id_first_name,#id_last_name').on('input', function() {
          var input_user_name=jQuery(this);
         
          if(input_user_name.val().length > 0){input_user_name.removeClass("invalid").addClass("valid");
            jQuery('#small_name').addClass('d-none');
          }
          else{
            input_user_name.removeClass("valid").addClass("invalid");
            if(document.getElementById("small_name")){
              
            }
            else{
              input_user_name.after("<small style=\"color: grey\" id=\"small_name\">No puede estar vacío</small>");
            }
            

          }
        });
  });