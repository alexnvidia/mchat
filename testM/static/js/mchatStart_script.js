    
    jQuery(document).ready(function(){
      
      var almc = 0;   
      var cont = 0;
      var element = "";
      var listE = [];
      var listAux = [];
      var listEParent = [];
      var thisElement = "name";
      const form_error_js = JSON.parse(document.getElementById('form_error').textContent);
      if(form_error_js > 0){

        jQuery("input").each(function( index ) {
          if(jQuery(this).is(":checked") == false){

            if(jQuery(this).attr("value") == "True" || jQuery(this).attr("value") == "False"){
              if(listE.indexOf(jQuery(this).attr("name")) == -1){
                listE.push(jQuery(this).attr("name"));
              }
              else{
                listAux.push(parseInt((jQuery(this).attr("name")).slice(5,7))+1);
                jQuery(this).parents("ul").addClass("alert alert-danger");
                listEParent.push(jQuery(this).parents("ul").attr("id"));
              }
              
            }                      

          }
        });
          
          nowC = 20 - form_error_js;
          cont = (20 - form_error_js)*5;
          var width = (jQuery(window).width())/20;
          almc = (nowC*width);
          jQuery("#animated").width(almc);
          alert("Ha olvidado responder a las siguientes preguntas: " + listAux);
      }
      jQuery("input[type='radio']").click(function(){
        thisElement = jQuery(this).parents("ul");
        if(listEParent.indexOf(thisElement.attr("id")) != -1){
          thisElement.removeClass("alert alert-danger");
          jQuery("div[id=" + thisElement.attr("id") + "]").addClass("d-none");
        }
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