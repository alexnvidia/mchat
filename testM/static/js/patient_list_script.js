jQuery(document).ready(function animt(){
	jQuery('[data-toggle="popover"]').popover({html: true});
			  jQuery("#divAlert2").hover(function(){
			    
			  },
			  function animt(){
			    jQuery("#guide").css({"font-size": "100%", "text-shadow": "1px 1px 2px DarkCian, 0 0 25px blue, 0 0 5px Orange", "box-shadow":"1px 1px 2px grey, 0 0 25px Green, 0 0 5px darkRed", "border-radius":"15px"});
			    
			      jQuery("#guide").fadeOut(700).fadeIn(700);
			  });
			 
			});