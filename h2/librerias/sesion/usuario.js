$( document ).ready(function() {
	$( "#btn_menu_navbar" ).click(function() {
        if ($('#btn_menu_navbar').attr('aria-expanded') === "true") {
   			
   			$("#btn_menu_navbar").removeClass("btn_nav_bar_zindex");
  		
  		}else{
  			$("#btn_menu_navbar").addClass("btn_nav_bar_zindex");
  		}
    });

	listar_perfil();
});



function generar_clave(vln_proveedor)
	{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/sesion/usuario.php',
			type:'POST',
			data:'proveedor='+vln_proveedor+'&boton=generar',
			beforeSend: function(){
				$('#light_modal').fadeIn();
			}	
		}).done(function(vlc_resultado)
		{	
			$('#light_modal').hide();
			var vlc_valor = eval(vlc_resultado);
			$('#txt_mensaje_clave').show();
			$('#txt_mensaje_clave').text(" Su nueva clave generada automáticamente es: ");
			$('#txt_clave').show();
			$('#txt_clave').text(vlc_valor);
			$('#txt_mensaje_clave_generada').show();
			$('#txt_mensaje_clave_generada').text(" A continuación se le redireccionará a la página de Login para que inicie sesión con su nueva clave.");

			setTimeout(function(){ window.location="http://"+vlc_dominio+"/"+vlc_proyecto+"/controlador/sesion/cerrar_sesion.php"; }, 10000);

		});
		
	}

function listar_perfil()
	{
		vln_proveedor = $("#CodigoProveedorHeader").val();
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/sesion/usuario.php',
			type:'POST',
			data:'proveedor='+vln_proveedor+'&boton=listar_perfil'
		}).done(function(vlc_resultado)
		{	

			var vlc_valores = eval(vlc_resultado);
			//html="<table class='table table-hover' id='cabecera_tabla'><thead><tr class=active><th id='pagos_mes_fecha'>Fecha</th><th>Factura</th><th>Prefactura</th><th>Historia Clínica</th><th>Admisión</th><th>Paciente/Observación</th><th id='ancho_monto'>Monto</th><th id='ancho_cancela'>Cancela</th></tr></thead><tbody>";
			html="<div class='table-responsive'><table class='table'><tbody>";
			
			for(i=0;i<vlc_valores.length;i++)
			{					
				
				html+="<tr><td>Código</td><td align='left'>"+vlc_valores[i][0]+
				"<tr><td>Nombre</td><td align='left'>"+vlc_valores[i][1]+
				"<tr><td>Cédula</td><td align='left'>"+vlc_valores[i][2]+
				"<tr><td>Correo</td><td align='left'>"+vlc_valores[i][3]
				;
			}
			
			html+="</tbody></table></div>"
			$("#listar_perfil").html(html);

		});
		
	}