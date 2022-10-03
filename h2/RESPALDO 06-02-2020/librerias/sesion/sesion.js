function validar_datos()
	{

		if (screen.width<1024)
		{ 
			var vlc_tipo_dispositivo = "M";
		}	
		else if (screen.width<1280)
		{ 
		    var vlc_tipo_dispositivo = "M";
		}
		else
		{ 
		    var vlc_tipo_dispositivo = "C";
		}

		var vlc_datosform=$("#form_sesion").serialize();
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/sesion',
			type:'POST',
			data:vlc_datosform+'&boton=ingresar_sistema'+'&tipo_dispositivo='+vlc_tipo_dispositivo,
			beforeSend: function(){
				$('#fade').fadeIn();
				$('#light').fadeIn();
			}
		}).done(function(vlc_resultado)
		{	

			$('#fade').fadeOut(600);
			$('#light').fadeOut(600);
			
			if(vlc_resultado=='sesion_correcta'){
				window.location= "http://"+vlc_dominio+'/'+vlc_proyecto+"/inicio";
			}else{
				$('#mensaje_alerta').fadeIn();
      			$('#div_error_codigo').addClass('has-error');
      			$('#div_error_contrasena').addClass('has-error');  
				$('#texto_mensaje_alerta').text(" Usuario o Contraseña Incorrecta");			
			}	
		});
	}

	$("#contrasena").keypress(function(e) 
	{
    	if(e.which == 13) 
    	{
    		validar_datos();		
    	}
    });

function validar_contrasena()
	{
		var vlc_datosform=$("#form_olvidar_contrasena").serialize();
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/sesion',
			type:'POST',
			data:vlc_datosform+'&boton=enviar_peticion',
			beforeSend: function(){
				$('#fade').fadeIn();
				$('#light').fadeIn();
			}
		}).done(function(vlc_resultado)
		{
			$('#fade').fadeOut(600);
			$('#light').fadeOut(600);
			
			if(vlc_resultado=='correo_correcto'){
				$('#codigo').val('');
				$('#div_error_codigo').removeClass('has-error');
				$('#mensaje_alerta').removeClass('alert-danger');
				$('#mensaje_alerta').addClass('alert-info');
				$('#mensaje_alerta').fadeIn();
				$('#texto_mensaje_alerta').text(" Se ha enviado correctamente la contraseña a su correo, a continuación pulse en Acceder al Sistema");
			}

			if(vlc_resultado=='correo_incorrecto'){
				$('#mensaje_alerta').fadeIn();
      			$('#div_error_codigo').addClass('has-error');
				$('#texto_mensaje_alerta').text(" Al momento no dispone de un correo, por favor acercarse al Departamento de Cuentas por pagar para regularizar su información  ");	
			}

			if(vlc_resultado=='campo_vacio'){
				$('#mensaje_alerta').fadeIn();
      			$('#div_error_codigo').addClass('has-error');
				$('#texto_mensaje_alerta').text(" Error, Ingrese un código");	
			}	
		});
	}