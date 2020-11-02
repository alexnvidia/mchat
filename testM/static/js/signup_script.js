
  jQuery(function () {
    jQuery("#id_birth_date").datepicker({
      format:'dd/mm/yyyy',
      language:'es-ES',
      autoHide: true,
      autoShow: true,
      autoPick: true,
    });

    jQuery('#id_email').on('input', function() {
          var input=jQuery(this);
          var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          var is_email=re.test(input.val());
          if(is_email){input.removeClass("invalid").addClass("valid");}
          else{input.removeClass("valid").addClass("invalid");}
        });

    jQuery('input[name=password1], input[name=password2]').on('change', function () {
    var password   = jQuery('input[name=password1]'),
        repassword = jQuery('input[name=password2]'),
        both       = password.add(repassword).removeClass('valid invalid');
        var user = jQuery("input[name=username]").val();
        var newuser = user.replace(/[0-9_@.+-]/g, '');
        var patt = new RegExp(newuser, "i");
        var search_password_ok = patt.test(password.val());

    password.addClass(
        password.val().length > 0 ? 'valid' : 'invalid' 
        
    );
    jQuery('#small_equal,#small_sm,#small_eq_user').addClass('d-none');
    repassword.addClass(
        password.val().length > 0 ? 'valid' : 'invalid'

    );
    

    if (password.val() != repassword.val()) {
        both.removeClass("valid").addClass("invalid");
        if(document.getElementById("small_equal")){
              jQuery('#small_equal').removeClass("d-none");
            }
            else{
              jQuery('input[name=password1], input[name=password2]').after("<small style=\"color: grey\" id=\"small_equal\">Las contraseñas no coinciden</small>");
            }
        
    }
    else if (password.val().length > 0  && password.val().length < 8){
        password.removeClass("valid").addClass("invalid");
        if(document.getElementById("small_sm")){
              jQuery('#small_sm').removeClass("d-none");
            }
            else{
              jQuery('input[name=password1]').after("<small style=\"color: grey\" id=\"small_sm\">La contraseña debe tener al menos 8 carácteres </small>");
            }
        

    }
    else if(search_password_ok){
        password.removeClass("valid").addClass("invalid");
        if(document.getElementById("small_eq_user")){
              jQuery('#small_eq_user').removeClass("d-none");
            }
            else{
              jQuery('input[name=password1]').after("<small style=\"color: grey\" id=\"small_eq_user\">La contraseña es demasiado similar al nombre de usuario</small>");
            }

        
    }

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

      jQuery('#id_username').on('input', function() {
          var input_user=jQuery(this);
         
          if(input_user.val().length >= 8){input_user.removeClass("invalid").addClass("valid");
            jQuery('#small_user').addClass('d-none');
          }
          else{
            input_user.removeClass("valid").addClass("invalid");
            if(document.getElementById("small_user")){
              
            }
            else{
              input_user.after("<small style=\"color: grey\" id=\"small_user\">El nombre de usuario debe tener al menos 8 carácteres. </small>");
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