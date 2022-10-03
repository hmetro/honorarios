
function generar_clave(vln_proveedor)
	{
		alert(vln_proveedor);
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/pagos_mes/usuario.php',
			type:'POST',
			data:'proveedor='+vln_proveedor+'&boton=generar',
			beforeSend: function(){
				$('#light_modal').fadeIn();
			}	
		}).done(function(vlc_resultado)
		{	
			alert(vlc_resultado);
			$('#light_modal').hide();
			var vlc_valor = eval(vlc_resultado);
			$('#txt_mensaje_clave').show();
			$('#txt_mensaje_clave').text(" Su nueva clave generada automáticamente es: ");
			$('#txt_clave').show();
			$('#txt_clave').text(vlc_valor);
			$('#txt_mensaje_clave_generada').show();
			$('#txt_mensaje_clave_generada').text(" A continuación se le redireccionará a la página de Login para que inicie sesión con su nueva clave.");

			setTimeout(function(){ window.location="http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/sesion/cerrar_sesion.php"; }, 10000);

		});
		
	}
