$( document ).ready(function() {
    $( "#btn_menu_navbar" ).click(function() {
        if ($('#btn_menu_navbar').attr('aria-expanded') === "true") {
   			
   			$("#btn_menu_navbar").removeClass("btn_nav_bar_zindex");
  		
  		}else{
  			$("#btn_menu_navbar").addClass("btn_nav_bar_zindex");
  		}
    });

});