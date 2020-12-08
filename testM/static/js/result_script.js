$.noConflict();
  jQuery("#form_adicional").on('submit',function(){
        var post_url = jQuery("#form_adicional").attr("action");
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