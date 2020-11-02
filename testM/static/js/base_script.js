$.noConflict();
jQuery(document).ready(function(){
  jQuery('[data-toggle="tooltip"]').tooltip({ boundary: 'window' });
  jQuery("#s1").on({
    mouseenter: function(){
      jQuery(this).css("color", "red");
    },  
    mouseleave: function(){
      jQuery(this).css("color", "lightblue");
    } 
  });
});