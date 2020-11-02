    
    jQuery(document).ready(function(){
      
      var almc = 0;   
      var cont = 0;
      var element = "";
      const form_error_js = JSON.parse(document.getElementById('form_error').textContent);
      if(form_error_js > 0){
          nowC = 20 - form_error_js;
          cont = (20 - form_error_js)*5;
          var width = (jQuery(window).width())/20;
          almc = (nowC*width);
          jQuery("#animated").width(almc);
      }
      jQuery("input[type='radio']").click(function(){
        if(element.search(jQuery(this).attr("name")) == -1 ){
            var width = (jQuery(window).width())/20;            
            cont+=5;
            almc+=width
            jQuery("#animated").width(almc);
            element += jQuery(this).attr("name");
            if(cont == 100){
                jQuery("#divAlert").removeClass("d-none");
                jQuery(document).scrollTop(jQuery(document).height());

            }

        }
        

        

  });

      jQuery( window ).resize(function() {
        realsize = ((jQuery(window).width())*cont)/100
        almc = realsize        
        jQuery("#animated").width(almc);  
            
      });
});