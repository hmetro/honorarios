$( document ).ready(function() {
function check_remover(id_change, id_th, id_td)
{
	$( "#"+id_change ).change(function() {
		
		if( $('#'+id_change).prop('checked') ) {

   			$("#"+id_th).removeClass("ocultar_general");
   			$("."+id_td).removeClass("ocultar_general");

		}else {

			$("#"+id_th).addClass("ocultar_general");
			$("."+id_td).addClass("ocultar_general");
		}
	});		
}

	check_remover("hcl_check","hc_th_prealta","hc_td_prealta");
	check_remover("paciente_check","paciente_th_prealta","paciente_td_prealta");
	check_remover("fechaadm_check","fechaadmision_th_prealta","fechaadmision_td_prealta");
	check_remover("habitacion_check","habitacion_th_prealta","habitacion_td_prealta");
	check_remover("diagnostico_check","diagnostico_th_prealta","diagnostico_td_prealta");
	check_remover("medico_check","medico_th_prealta","medico_td_prealta");
	check_remover("seguro_heck","seguro_th_prealta","seguro_td_prealta");

});



function lista_pacientes()
	{
		var vln_proveedor = $("#proveedor_oculto").val();

		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
			type:'POST',
			data:'proveedor='+vln_proveedor+'&boton=listar',
			beforeSend: function(){
				$('#fade').fadeIn();
				$('#light').fadeIn();
			}	
		}).done(function(vlc_resultado)
		{	
			$('#fade').fadeOut();
			$('#light').fadeOut();

			var vlc_valores = eval(vlc_resultado);

			if(vlc_valores==''){
				$('#pago_vacio_txt').show();
				$('#lista').hide();
			}else{
				$('#pago_vacio_txt').hide();
				$('#lista').show();

				html="<div class='table-responsive'><table class='table table-hover' id='tabla_pagos_mes'><thead><tr class=active><th id='hc_th_prealta'>HC</th><th id='paciente_th_prealta'>Paciente</th><th id='fechaadmision_th_prealta' class='ocultar_general'>Fecha Admisión</th><th id='habitacion_th_prealta' class='ocultar_general'>Habitación</th><th id='diagnostico_th_prealta' class='ocultar_general'>Diagnóstico</th><th id='medico_th_prealta' class='ocultar_general'>Médico</th><th id='seguro_th_prealta' class='ocultar_general'>Seguro</th><th>Fecha Posible Alta</th><th>Hora Posible Alta</th><th></th><th></th><th></th></tr></thead><tbody id='tabla_pagos_mes_body'>";
				var vln_contador = 0;
				for(i=0;i<vlc_valores.length;i++)
				{	
					if (vlc_valores[i][7]=='HPN') 
					{
						vlc_origen='HOSPITAL';

					}else if (vlc_valores[i][7]=='EMA') 
					{
						vlc_origen='EMERGENCIA';

					}else if (vlc_valores[i][7]=='SAO') 
					{
						vlc_origen='SERVICIO AMBULATORIO';

					}else if (vlc_valores[i][7]=='CEA') 
					{
						vlc_origen='CONSULTA EXTERNA';
					}

					if (vlc_valores[i][5]=='INT') 
					{
						vlc_tipo_medico ='MÉDICO INTERCONSULTADO';

					}else if (vlc_valores[i][5]=='TRA') 
					{
						vlc_tipo_medico='MÉDICO TRATANTE';

					}


					function addZero(i) {
    					if (i < 10) {
    					    i = '0' + i;
    					}
    					return i;
					}

    				var hoy = new Date();
    				var dd = hoy.getDate();
    				var mm = hoy.getMonth()+1;
    				var yyyy = hoy.getFullYear();
    				    
    				dd = addZero(dd);
    				mm = addZero(mm);
    				vlc_fecha_hoy = yyyy+'-'+mm+'-'+dd;	
						
					function sumarDias(fecha, dias){
  						fecha.setDate(fecha.getDate() + dias);
  						return fecha;
					}

					var vlc_fecha_max_ini = new Date();
					vlc_fecha_max= sumarDias(vlc_fecha_max_ini, 1);

					var dd_max = vlc_fecha_max.getDate();
    				var mm_max = vlc_fecha_max.getMonth()+1;
    				var yyyy_max = vlc_fecha_max.getFullYear();
    				dd_max = addZero(dd_max);
    				mm_max = addZero(mm_max);
    				vlc_fecha_max = yyyy_max+'-'+mm_max+'-'+dd_max;	

					if ( (vlc_valores[i][6]== null 
						&& vlc_valores[i][5]=='TRA' 
						&& vlc_valores[i][9]==null 
						&& vlc_valores[i][10]==null ) 
						|| 
						(vlc_valores[i][6]== null 
						&& vlc_valores[i][5]=='TRA' 
						&& vlc_valores[i][10]=='A') 
						|| 
						( vlc_valores[i][6]== null 
						&& vlc_valores[i][5]=='INT' 
						&& vlc_valores[i][10]== 'A')) 
					{

						vlc_fecha_prealta = "<input type='date' name='fecha_posible_alta"+vlc_valores[i][0]+"' id='fecha_posible_alta"+vlc_valores[i][0]+"' class = 'form-control input-sm' min ='"+vlc_fecha_hoy+"' max='"+vlc_fecha_max+"' value= '"+vlc_fecha_hoy+"' />";
						vlc_icono_accion = "glyphicon glyphicon-ok";
						vlc_color_boton = "btn-success";
						vlc_icono_transferir = "<button class='btn btn-md "+vlc_color_boton+"' data-backdrop='static' data-keyboard='false' data-toggle='modal' data-target='#transferir_responsabilidad' onclick='mostrar_datos_paciente("+'"'+vlc_valores[i][1]+'"'+","+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][7]+'"'+");'><span title='Transferir responsabilidad' class='glyphicon glyphicon-user'></span><span class='glyphicon glyphicon-transfer'></span></button>";
						vlc_hora_prealta = "<input type='time' name='hora_posible_alta"+vlc_valores[i][0]+"' id='hora_posible_alta"+vlc_valores[i][0]+"' class='form-control input-sm' value='09:00' />";
						vlc_icono_final = "<button class='btn btn-md "+vlc_color_boton+"' onclick='finalizar_atencion("+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][7]+'"'+","+'"'+vlc_valores[i][8]+'"'+");'><span title='Finalizar atención' class='glyphicon glyphicon-user'></span><span class='glyphicon glyphicon-remove'></span></button>";

					}else if ((vlc_valores[i][5]=='INT' 
								&& vlc_valores[i][10]==null
								&& vlc_valores[i][6]==null) 
								|| 
								(vlc_valores[i][5]=='INT' 
								&& vlc_valores[i][10]=='I'
								&& vlc_valores[i][6]==null) 
								|| 
								(vlc_valores[i][5]=='TRA' 
								&& vlc_valores[i][10]=='I'
								&& vlc_valores[i][6]==null) 
								|| 
								(vlc_valores[i][5]=='TRA' 
								&& vlc_valores[i][9]!=null 
								&& vlc_valores[i][10]==null
								&& vlc_valores[i][6]==null) )
					{
						vlc_icono_accion = "glyphicon glyphicon-ok";
						vlc_fecha_prealta = "S/F";
						vlc_color_boton = "btn-primary";
						vlc_hora_prealta = "S/H";
						vlc_icono_transferir = "N/A";
						vlc_icono_final = "<button class='btn btn-md "+vlc_color_boton+"' onclick='finalizar_atencion("+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][7]+'"'+","+'"'+vlc_valores[i][8]+'"'+");'><span title='Finalizar atención' class='glyphicon glyphicon-user'></span><span class='glyphicon glyphicon-remove'></span></button>";
					}
					else if ( (vlc_valores[i][5]=='TRA' 
								&& vlc_valores[i][6]!= null 
								&& vlc_valores[i][9]== null) 
								|| 
								(vlc_valores[i][5]=='INT' 
								&& vlc_valores[i][10]== 'A' 
								&& vlc_valores[i][6]!= null) 
								|| 
								(vlc_valores[i][5]=='TRA' 
								&& vlc_valores[i][10]== 'A' 
								&& vlc_valores[i][6]!= null)) 
					{											
						var vlc_resultado_fecha_format= vlc_valores[i][6].split(" ");
	
						var vlc_fecha_format = vlc_resultado_fecha_format[0];
						var vlc_hora_format = vlc_resultado_fecha_format[1];


						vlc_icono_accion = "glyphicon glyphicon-pencil";
						vlc_fecha_prealta = "<input type='date' name='fecha_posible_alta"+vlc_valores[i][0]+"' id='fecha_posible_alta"+vlc_valores[i][0]+"' class = 'form-control input-sm' min ='"+vlc_fecha_hoy+"' max='"+vlc_fecha_max+"' value='"+vlc_fecha_format+"' />";
						vlc_color_boton = "btn-info";
						vlc_icono_transferir = "<button class='btn btn-md "+vlc_color_boton+"' data-toggle='modal' data-backdrop='static' data-keyboard='false' data-target='#transferir_responsabilidad' onclick='mostrar_datos_paciente("+'"'+vlc_valores[i][1]+'"'+","+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][7]+'"'+");'><span title='Transferir responsabilidad' class='glyphicon glyphicon-user'></span><span class='glyphicon glyphicon-transfer'></span></button>";
						vlc_hora_prealta = "<input type='time' name='hora_posible_alta"+vlc_valores[i][0]+"' id='hora_posible_alta"+vlc_valores[i][0]+"' class='form-control input-sm' value='"+vlc_hora_format+"' />";
						vlc_icono_final = "<button class='btn btn-md "+vlc_color_boton+"' onclick='finalizar_atencion("+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][7]+'"'+","+'"'+vlc_valores[i][8]+'"'+");'><span title='Finalizar atención' class='glyphicon glyphicon-user'></span><span class='glyphicon glyphicon-remove'></span></button>";

					}else if ( (vlc_valores[i][5]=='INT' 
								&& vlc_valores[i][10]==null) 
								|| 
								(vlc_valores[i][5]=='INT' 
								&& vlc_valores[i][10]=='I') 
								|| 
								(vlc_valores[i][5]=='TRA' 
								&& vlc_valores[i][10]=='I') 
								|| 
								(vlc_valores[i][5]=='TRA' 
								&& vlc_valores[i][9]!=null 
								&& vlc_valores[i][10]==null) ) 
					{
						var vlc_resultado_fecha_format= vlc_valores[i][6].split(" ");
	
						var vlc_fecha_format = vlc_resultado_fecha_format[0];
						var vlc_hora_format = vlc_resultado_fecha_format[1];

						vlc_icono_accion = "glyphicon glyphicon-ok";
						vlc_fecha_prealta = "<input type='date' class='form-control input-sm' name='fecha_posible_alta"+vlc_valores[i][0]+"' id='fecha_posible_alta"+vlc_valores[i][0]+"' readonly value='"+vlc_fecha_format+"' /> ";
						vlc_color_boton = "btn-primary";
						vlc_icono_transferir = "N/A";
						vlc_hora_prealta = "<input type='time' name='hora_posible_alta"+vlc_valores[i][0]+"' id='hora_posible_alta"+vlc_valores[i][0]+"' readonly class='form-control input-sm' value='"+vlc_hora_format+"' />";
						vlc_icono_final = "<button class='btn btn-md "+vlc_color_boton+"' onclick='finalizar_atencion("+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][7]+'"'+","+'"'+vlc_valores[i][8]+'"'+");'><span title='Finalizar atención' class='glyphicon glyphicon-user'></span><span class='glyphicon glyphicon-remove'></span></button>";
					
					}			

					vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*"+vlc_valores[i][7]+"*"+vlc_valores[i][8]+"*";
					html+="<tr><td align='center' id='hc_td_prealta' class='hc_td_prealta'>"+vlc_valores[i][0]+
					"</td><td align='left' id='paciente_td_prealta' class='paciente_td_prealta'>"+vlc_valores[i][1]+
					"</td><td id='fechaadmision_td_prealta' class='fechaadmision_td_prealta ocultar_general'>"+vlc_valores[i][2]+
					"</td><td id='habitacion_td_prealta' class='ocultar_general habitacion_td_prealta'>"+vlc_valores[i][3]+
					"</td><td align='left' id='diagnostico_td_prealta' class='ocultar_general diagnostico_td_prealta'>"+vlc_valores[i][4]+
					"</td><td id='medico_td_prealta' class='ocultar_general medico_td_prealta'>"+vlc_tipo_medico+
					"</td><td id='seguro_td_prealta' class='ocultar_general seguro_td_prealta'>"+vlc_valores[i][12]+
					"</td><td>"+vlc_fecha_prealta+
					"</td><td>"+vlc_hora_prealta+
					"</td><td><button class='btn btn-md "+vlc_color_boton+
					"' onclick='ingreso_fecha_prealta("+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][7]+'"'+","+'"'+vlc_valores[i][1]+'"'+","+'"'+vlc_valores[i][5]+'"'+","+'"'+vlc_valores[i][10]+'"'+","+'"'+vlc_valores[i][9]+'"'+","+'"'+vlc_valores[i][3]+'"'+");'><span data-toggle='tooltip' data-backdrop='static' data-keyboard='false' title='Ingresar códigos CPT' class='"+vlc_icono_accion+
					"'></span></button></td><td>"+vlc_icono_final+
					"</td><td>"+vlc_icono_transferir+"</td></tr> ";
					
				}				

				html+="</tbody></table></div>"
				$("#lista").html(html);

			}	
		});
		
	}

function ingreso_fecha_prealta(vln_historia_clinica,vln_numero_admision,vlc_paciente_nombre,vlc_tipo_medico,vlc_estado_medico,vlc_medico_asigna,vlc_habitacion)
	{
		if ( (vlc_tipo_medico==='TRA' && vlc_estado_medico=='A') || (vlc_tipo_medico==='INT' && vlc_estado_medico=='A') || (vlc_tipo_medico==='TRA' && vlc_estado_medico=="null" && vlc_medico_asigna=="null")) 
		{
			var vlc_fecha_posible_alta = $('#fecha_posible_alta'+vln_historia_clinica).val();
			var vlc_hora_posible_alta = $('#hora_posible_alta'+vln_historia_clinica).val();
	
			$.ajax(
			{
				url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
				type:'POST',
				data: 'historia_clinica='+vln_historia_clinica+'&boton=ingreso_fecha_prealta'+'&numero_admision='+vln_numero_admision+'&fecha_posible_alta='+vlc_fecha_posible_alta+'&hora_posible_alta='+vlc_hora_posible_alta
					
			}).done(function(vlc_resultado,)
			{	
				if (vlc_resultado=="exito") 
				{
					envio_mensaje(vln_historia_clinica,vlc_paciente_nombre,vlc_habitacion,vlc_fecha_posible_alta,vlc_hora_posible_alta,vln_numero_admision);
					lista_pacientes();
					$("#fecha_prealta_modal").text(vlc_fecha_posible_alta);
					$("#hora_prealta_modal").text(vlc_hora_posible_alta);
					$("#nombre_paciente_modal").text(vlc_paciente_nombre);
					listar_codigos_cpt(vln_historia_clinica,vln_numero_admision);
					$("#hc_paciente_modal_cpt").val(vln_historia_clinica);
					$("#admision_paciente_modal_cpt").val(vln_numero_admision);
					$("#ingresar_cpt").modal("show");

					notificaciones("Fecha ingresada correctamente", "success");	

				}else if (vlc_resultado=="vacio") 
				{
					$('#fade').fadeOut();
					$('#light').fadeOut();

					notificaciones("Faltan datos para procesar", "error");
				
				}else if (vlc_resultado=="error") 
				{
					$('#fade').fadeOut();
					$('#light').fadeOut();

					notificaciones("Existe un error al ingresar la fecha", "error");

				}else if (vlc_resultado=="fecha_error") 
				{
					$('#fade').fadeOut();
					$('#light').fadeOut();

					notificaciones("La fecha y hora ingresada deben de ser mínimo 12 horas y máximo 48 horas de la fecha y hora actual", "error");
				}else
				{
					$('#fade').fadeOut();
					$('#light').fadeOut();

					notificaciones("No se pudo cargar la fecha", "error");
				}

			});

		}else if ( (vlc_tipo_medico==='INT' && vlc_estado_medico=='I') || (vlc_tipo_medico==='TRA' && vlc_estado_medico=='I') || (vlc_tipo_medico==='INT' && vlc_estado_medico==='null' && vlc_medico_asigna==='null' ) ) 
		{
			var vlc_fecha_posible_alta = $('#fecha_posible_alta'+vln_historia_clinica).val();
			var vlc_hora_posible_alta = $('#hora_posible_alta'+vln_historia_clinica).val();

			if (vlc_fecha_posible_alta==null) 
			{
				vlc_fecha_posible_alta = "S/F";
				vlc_hora_posible_alta = "S/F";
			}else{
				var vlc_fecha_posible_alta = $('#fecha_posible_alta'+vln_historia_clinica).val();
			}
			
			$("#fecha_prealta_modal").text(vlc_fecha_posible_alta);
			$("#hora_prealta_modal").text(vlc_hora_posible_alta);
			$("#nombre_paciente_modal").text(vlc_paciente_nombre);
			listar_codigos_cpt(vln_historia_clinica,vln_numero_admision);
			$("#hc_paciente_modal_cpt").val(vln_historia_clinica);
			$("#admision_paciente_modal_cpt").val(vln_numero_admision);
			$("#ingresar_cpt").modal("show");
		}

	}

function busqueda_codigos_cpt(vlc_codigo,vlc_detalle)
	{

		vlc_codigo_f = $("#"+vlc_codigo).val();
		vlc_detalle_f = $("#"+vlc_detalle).val();

		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
			type:'POST',
			data: 'codigo='+vlc_codigo_f+'&detalle='+vlc_detalle_f+'&boton=busqueda_codigos_cpt',
			beforeSend: function(){
				$('#fade').fadeIn();
				$('#light').fadeIn();
			}
				
		}).done(function(vlc_resultado)
		{

			$('#fade').fadeOut();
			$('#light').fadeOut();

			//Creando dropdown a partir de la busqueda
			var vlc_valores = eval(vlc_resultado);
			vlc_select="<div id='codigo_buscar' class='dropdown'>"
			vlc_select+="<ul class='dropdown-menu col-md-12'>"
			//Recorriendo los valores
			for(i=0;i<vlc_valores.length;i++)
			{
				if(i%2==0)
				{
             		
             		vlc_clase_css = "span_href_1";
             		vlc_clase_css_color = "color_a_drop";
        		
        		}else{

            		vlc_clase_css = "span_href_2";
            		vlc_clase_css_color= ""
        		}

				vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*";
				vlc_select+="<li class='col-md-12 col-sm-12 col-xs-12 "+vlc_clase_css+"'><span class='col-md-12 col-sm-12 col-xs-12'><a href='#' class='"+vlc_clase_css_color+" col-md-12 col-xs-12 col-sm-12' onclick='mostrar_cpt("+'"'+vlc_datos+'"'+")' ><span class='col-md-12'> <span> -- </span>"+vlc_valores[i][1]+"</span></a></span></li>";

			}

			//validando los valores de la busqueda
			if (vlc_resultado=="[]")
			{
				vlc_select+="<li><div align=center>No existe Resultados de la consulta</label></div>";
				vlc_select+="</ul>"
				vlc_select+="</div>"
				$("#listar_codigos").html(vlc_select);
			}else
			{
				vlc_select+="</ul>"
				vlc_select+="</div>"
				$("#listar_codigos").html(vlc_select);
			}

			$("#codigo_buscar").addClass('open')
	
		});
		
	}

function mostrar_cpt(datos)
	{
		var vlc_resultado=datos.split("*");
		var vln_codigo_cpt= vlc_resultado[0];
		var vlc_detalle_cpt= vlc_resultado[1];

		$("#codigo_cpt_1").val(vln_codigo_cpt);
		$("#descripcion_ctp_1").val(vlc_detalle_cpt);
		$("#codigo_buscar").removeClass('open');
	}

function ingreso_codigo_cpt()

	{
		var vln_codigo_cpt = $('#codigo_cpt_1').val();
		var vln_codigo_medico = $('#proveedor_oculto').val();
		var vln_cantidad_cpt = $('#cantidad_cpt_1').val();
		var vln_porcentaje_cpt = $('#porcentaje_cpt_1').val();
		var vln_historia_clinica_cpt = $('#hc_paciente_modal_cpt').val();
		var vln_admision_cpt = $('#admision_paciente_modal_cpt').val();
		var vlc_fecha_cpt = $('#fecha_codigo_cpt').val();

		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
			type:'POST',
			data: 'historia_clinica='+vln_historia_clinica_cpt+'&codigo_medico='+vln_codigo_medico+'&cantidad_cpt='+vln_cantidad_cpt+'&admision='+vln_admision_cpt+'&codigo_cpt='+vln_codigo_cpt+'&boton=ingreso_codigo_cpt&fecha_cpt='+vlc_fecha_cpt+'&porcentaje='+vln_porcentaje_cpt,
			beforeSend: function(){
				$('#fade').fadeIn();
				$('#light').fadeIn();
			}
				
		}).done(function(vlc_resultado)
		{	
				if (vlc_resultado=="exito") 
				{
					$("#codigo_cpt_1").val("");
					$("#descripcion_ctp_1").val("");
					$("#cantidad_cpt_1").val("1");
					$("#porcentaje_cpt_1").val("100");
					listar_codigos_cpt(vln_historia_clinica_cpt,vln_admision_cpt);
					$('#fade').fadeOut();
					$('#light').fadeOut();

					notificaciones("Honorario ingresado correctamente", "success");	

				}else if (vlc_resultado=="vacio") 
				{
					$('#fade').fadeOut();
					$('#light').fadeOut();

					notificaciones("Faltan datos para procesar", "error");
				
				}else if (vlc_resultado=="error") 
				{
					$('#fade').fadeOut();
					$('#light').fadeOut();

					notificaciones("Existe un error al ingresar el honorario", "error");

				}else if (vlc_resultado=="fecha_error") 
				{
					$('#fade').fadeOut();
					$('#light').fadeOut();

					notificaciones("La fecha debe de ser máximo 24 horas", "error");

				}else
				{
					$('#fade').fadeOut();
					$('#light').fadeOut();

					notificaciones("No se pudo cargar el honorario", "error");
				}
			
		});
		
	}

function listar_codigos_cpt(vln_historia_clinica,vln_numero_admision)
	{
		function addZero(i) {
    		if (i < 10) {
    		    i = '0' + i;
    		}
    		return i;
		}

    	var hoy = new Date();
    	var dd = hoy.getDate();
    	var mm = hoy.getMonth()+1;
    	var yyyy = hoy.getFullYear();
    	    
    	dd = addZero(dd);
    	mm = addZero(mm);
    	vlc_fecha_hoy = yyyy+'-'+mm+'-'+dd;	
						
		function sumarDias(fecha, dias){
  			fecha.setDate(fecha.getDate() + dias);
  			return fecha;
		}

		var vlc_fecha_max_ini = new Date();
		vlc_fecha_max= sumarDias(vlc_fecha_max_ini, 1);

		var dd_max = vlc_fecha_max.getDate();
    	var mm_max = vlc_fecha_max.getMonth()+1;
    	var yyyy_max = vlc_fecha_max.getFullYear();
    	dd_max = addZero(dd_max);
    	mm_max = addZero(mm_max);
    	vlc_fecha_max = yyyy_max+'-'+mm_max+'-'+dd_max;

    	$('#fecha_codigo_cpt').attr("min",vlc_fecha_hoy);
    	$('#fecha_codigo_cpt').attr('value',vlc_fecha_hoy);
    	$('#fecha_codigo_cpt').attr('max',vlc_fecha_max);	


		var vln_codigo_medico = $('#proveedor_oculto').val();

		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
			type:'POST',
			data: 'codigo_medico='+vln_codigo_medico+'&historia_clinica='+vln_historia_clinica+'&admision='+vln_numero_admision+'&boton=listar_codigos_cpt'
				
		}).done(function(vlc_resultado)
		{	
			var vlc_valores = eval(vlc_resultado);


				html="<div class='table-responsive'><table class='table table-hover table-condensed letra_tabla_cabecera' ><thead><tr class=active><th>Código CPT</th><th>Descripción</th><th>Cantidad</th><th>Porcentaje %</th><th>Fecha</th><th>Eliminar</th></tr></thead><tbody >";

				for(i=0;i<vlc_valores.length;i++)
				{	
					vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*"+vlc_valores[i][7]+"*"+vlc_valores[i][8]+"*";
					html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td align='left'>"+vlc_valores[i][1]+"</td><td>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][6]+"</td><td>"+vlc_valores[i][5]+"</td><td><button class='btn btn-md btn-danger' onclick='remover_honorario("+'"'+vlc_valores[i][3]+'"'+","+'"'+vlc_valores[i][4]+'"'+","+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][5]+'"'+");'><span data-toggle='tooltip' title='Remover Honorario' class='glyphicon glyphicon-remove'></span></button></td></tr> ";
				}	

				html+="</tbody></table></div>"
				$("#listar_codigos_cpt").html(html);	
		});
	}	

function mostrar_datos_paciente(vlc_nombre_paciente, vln_historia_clinica,vln_numero_admision)
	{
		var vlc_fecha_posible_alta = $('#fecha_posible_alta'+vln_historia_clinica).val();

		$("#fecha_paciente_modal_transferir").text(vlc_fecha_posible_alta);
		$("#nombre_paciente_modal_transferir").text(vlc_nombre_paciente);
		$("#admision_paciente_modal").val(vln_numero_admision);
		$("#hc_paciente_modal").val(vln_historia_clinica);


	}

function busqueda_codigo_medico()
	{
		vln_codigo = $("#codigo_doctor_modal").val();
		vlc_nombre = $("#nombre_doctor_modal").val();

		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
			type:'POST',
			data: 'codigo_doctor='+vln_codigo+'&nombre_doctor='+vlc_nombre+'&boton=busqueda_doctor',
			beforeSend: function(){
				$('#fade').fadeIn();
				$('#light').fadeIn();
			}
				
		}).done(function(vlc_resultado)
		{

			$('#fade').fadeOut();
			$('#light').fadeOut();

			//Creando dropdown a partir de la busqueda
			var vlc_valores = eval(vlc_resultado);
			vlc_select="<div id='medico_buscar' class='dropdown'>"
			vlc_select+="<ul class='dropdown-menu buscador_dropdown'>"
			//Recorriendo los valores
			for(i=0;i<vlc_valores.length;i++)
			{
				vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*";
				vlc_select+="<li><a href='#' onclick='mostrar_doctor("+'"'+vlc_datos+'"'+")' >"+vlc_valores[i][1]+"</a></li>";

			}

			//validando los valores de la busqueda
			if (vlc_resultado=="[]")
			{
				vlc_select+="<li><div align=center>No existe Resultados de la consulta</label></div>";
				vlc_select+="</ul>"
				vlc_select+="</div>"
				$("#listar_medicos").html(vlc_select);
			}else
			{
				vlc_select+="</ul>"
				vlc_select+="</div>"
				$("#listar_medicos").html(vlc_select);
			}

			$("#medico_buscar").addClass('open')
	
		});
		
	}

function mostrar_doctor(datos)
	{
		var vlc_resultado=datos.split("*");
		var vln_codigo_doctor= vlc_resultado[0];
		var vlc_nombre_doctor= vlc_resultado[1];

		$("#codigo_doctor_modal").val(vln_codigo_doctor);
		$("#nombre_doctor_modal").val(vlc_nombre_doctor);
		$("#medico_buscar").removeClass('open');
	}

function transferir_responsabilidad()

	{
		var vln_codigo_medico_anterior = $('#proveedor_oculto').val();
		var vln_codigo_medico_nuevo = $('#codigo_doctor_modal').val();
		var vln_numero_admision = $('#admision_paciente_modal').val();
		var vln_historia_clinica = $('#hc_paciente_modal').val();
		swal({
  			title: "Esta seguro?",
  			text: "Se va transferir responsabilidad a otro Doctor",
  			icon: "warning",
  			buttons: ["Cancelar", "Aceptar"],
  			dangerMode: true,
			})
			.then((willDelete) => {
			 	if (willDelete) {
					$.ajax(
					{
						url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
						type:'POST',
						data: 'codigo_medico_nuevo='+vln_codigo_medico_nuevo+'&codigo_medico_anterior='+vln_codigo_medico_anterior+'&boton=transferir_responsabilidad'+'&numero_admision='+vln_numero_admision+'&historia_clinica='+vln_historia_clinica,
						beforeSend: function(){
							$('#fade').fadeIn();
							$('#light').fadeIn();
						}
							
					}).done(function(vlc_resultado)
					{	

						if (vlc_resultado=="exito") 
						{
							$('#codigo_doctor_modal').val("");
							$('#nombre_doctor_modal').val("");
							$('#fade').fadeOut();
							$('#light').fadeOut();
							$("#transferir_responsabilidad").modal("hide");
							lista_pacientes();
			
							notificaciones("La transferencia de responsabilidad fue un exito", "success");	
			
						}else if (vlc_resultado=="vacio") 
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("Faltan datos para procesar", "error");
						
						}else if (vlc_resultado=="error") 
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("Existe un error al transferir la responsabilidad", "error");
						}else
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("No se pudo cargar la transferencia", "error");
						}
						
					});
			  	}
			});
	}

function finalizar_atencion(vln_historia_clinica, vln_numero_admision, vln_codigo_medico)

	{

		swal({
  			title: "Esta seguro?",
  			text: "Se va a finalizar la atención en este paciente",
  			icon: "warning",
  			buttons: ["Cancelar", "Aceptar"],
  			dangerMode: true,
			})
			.then((willDelete) => {
			 	if (willDelete) {
					$.ajax(
					{
						url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
						type:'POST',
						data: 'codigo_medico='+vln_codigo_medico+'&historia_clinica='+vln_historia_clinica+'&boton=finalizar_atencion'+'&numero_admision='+vln_numero_admision,
						beforeSend: function(){
							$('#fade').fadeIn();
							$('#light').fadeIn();
						}
							
					}).done(function(vlc_resultado)
					{	

						if (vlc_resultado=="exito") 
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
							lista_pacientes();
			
							notificaciones("Se finalizó correctamente la atención", "success");	
			
						}else if (vlc_resultado=="vacio") 
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("Faltan datos para procesar", "error");
						
						}else if (vlc_resultado=="error") 
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("Existe un error al finalizar la atención", "error");
						}else
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("No se pudo cargar la orden", "error");
						}
						
					});
			  	}
			});
	}		

function remover_honorario(vln_historia_clinica,vln_numero_admision,vlc_codigo_cpt,vlc_fecha_ingreso)
	{
		var vln_codigo_medico = $('#proveedor_oculto').val();

		swal({
  			title: "Esta seguro?",
  			text: "Se va a eliminar su honorario",
  			icon: "warning",
  			buttons: ["Cancelar", "Aceptar"],
  			dangerMode: true,
			})
			.then((willDelete) => {
			 	if (willDelete) {
					$.ajax(
					{
						url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
						type:'POST',
						data: 'historia_clinica='+vln_historia_clinica+'&admision='+vln_numero_admision+'&boton=remover_honorario'+'&codigo_cpt='+vlc_codigo_cpt+'&codigo_medico='+vln_codigo_medico+'&fecha_ingreso='+vlc_fecha_ingreso,
						beforeSend: function(){
							$('#fade').fadeIn();
							$('#light').fadeIn();
						}
							
					}).done(function(vlc_resultado)
					{	
						if (vlc_resultado=="exito") 
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
							listar_codigos_cpt(vln_historia_clinica,vln_numero_admision);
			
							notificaciones("Se elimino correctamente el honorario", "success");	
			
						}else if (vlc_resultado=="vacio") 
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("Faltan datos para procesar", "error");
						
						}else if (vlc_resultado=="error") 
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("Existe un error al elminar el honorario", "error");

						}else if (vlc_resultado=="honorario_procesado") 
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("El honorario que intenta eliminar ya se proceso", "error");
						}else
						{
							$('#fade').fadeOut();
							$('#light').fadeOut();
			
							notificaciones("Existe un error al eliminar el honorario", "error");
						}
						
					});
			  	}
			});
	}

function envio_mensaje(vln_historia_clinica,vlc_nombre_paciente,vlc_habitacion,vlc_fecha_prealta,vlc_hora_prealta,vln_admision)
	{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/prealta/prealta.php',
			type:'POST',
			data: 'boton=enviar_mensaje&historia_clinica='+vln_historia_clinica+'&nombre_paciente='+vlc_nombre_paciente+'&habitacion='+vlc_habitacion+'&fecha_prealta='+vlc_fecha_prealta+'&hora_prealta='+vlc_hora_prealta+'&admision='+vln_admision	
		})
	}		

function cerrar_honorarios()
{
	$('#ingresar_cpt').modal('hide');
	$("#codigo_cpt_1").val("");
	$("#descripcion_ctp_1").val("");
	$("#cantidad_cpt_1").val("1");
	$("#porcentaje_cpt_1").val("100");


}