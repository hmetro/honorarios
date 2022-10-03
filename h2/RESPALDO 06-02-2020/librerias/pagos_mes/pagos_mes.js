$( document ).ready(function() {
	var fecha = new Date();
	var valor =("0"+(fecha.getMonth()+1)).slice(-2);
	$("#select_mes option[value="+valor+"]").prop("selected",true);

    $("#select_tipo_busqueda").change(function(){
    	var vlc_tipo_busqueda = $("#select_tipo_busqueda").val();

    	if (vlc_tipo_busqueda==="PACIENTE") 
    	{
    		$("#grupo_fecha_busqueda").addClass("ocultar_general");
    		$("#grupo_paciente_busqueda").removeClass();
    		$("#grupo_factura_busqueda").addClass("ocultar_general");

    	}else if (vlc_tipo_busqueda==="FECHA") 
    	{
    		$("#grupo_fecha_busqueda").removeClass();
    		$("#grupo_paciente_busqueda").addClass("ocultar_general");
    		$("#grupo_factura_busqueda").addClass("ocultar_general");

    	}else if (vlc_tipo_busqueda==="FACTURA") 
    	{
    		$("#grupo_factura_busqueda").removeClass();
    		$("#grupo_paciente_busqueda").addClass("ocultar_general");
    		$("#grupo_fecha_busqueda").addClass("ocultar_general");
    	}
    });

});

function lista_pagos_mes(vln_proveedor,vlc_fecha_desde,vlc_fecha_hasta,vlc_tipo_busqueda)
	{

		var vlc_forma_busqueda = $("#select_tipo_busqueda").val();
		var vlc_paciente = $("#paciente_busqueda").val();
		var vln_factura = $("#factura_busqueda").val();

		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/pagos_mes/pagos_mes.php',
			type:'POST',
			data:'proveedor='+vln_proveedor+'&boton=buscar'+'&fecha_desde='+vlc_fecha_desde+'&fecha_hasta='+vlc_fecha_hasta+'&tipo_busqueda='+vlc_tipo_busqueda+'&forma_busqueda='+vlc_forma_busqueda+'&paciente='+vlc_paciente+'&factura='+vln_factura,
			beforeSend: function(){
				$('#fade').fadeIn();
				$('#light').fadeIn();
			}	
		}).done(function(vlc_resultado)
		{	 

			$('#fade').fadeOut();
			$('#light').fadeOut();

			if (vlc_resultado=="fecha_error") 
			{
				notificaciones("Error la fecha debe de ser mayor o igual a la fecha 01/01/2017", "error");
			}else
			{
				var vlc_valores = eval(vlc_resultado);
				if(vlc_valores==''){
					$('#pago_vacio_txt').show();
					$('#lista').hide();
				}else{
					$('#pago_vacio_txt').hide();
					$('#lista').show();
					//html="<div class='table-responsive'><table class='table table-hover' id='tabla_pagos_mes'><thead><tr class=active><th id='pagos_mes_fecha'>Fecha</th><th>Tipo</th><th>Descripción</th><th>No Físico</th><th>Cuenta Bancaria</th><th>No Transacción</th><th>SubTotal</th><th>Retención</th><th>Monto</th><th>Opción</th></tr></thead><tbody id='tabla_pagos_mes_body'>";
					html="<div class='table-responsive'><table class='table table-hover' id='tabla_pagos_mes'><thead><tr class=active><th id='pagos_mes_fecha'>Fecha</th><th>Tipo</th><th>Descripción</th><th>Cuenta bancaria</th><th>No Transacción</th><th>Subtotal</th><th>Retención</th><th>Monto</th><th>Opción</th></tr></thead><tbody id='tabla_pagos_mes_body'>";
					var vln_contador = 0;
					for(i=0;i<vlc_valores.length;i++)
					{					
						//vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*"+vlc_valores[i][7]+"*"+vlc_valores[i][8]+"*"+vlc_valores[i][9]+"*";
						vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*"+vlc_valores[i][7]+"*"+vlc_valores[i][8]+"*";
						//html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td>"+vlc_valores[i][1]+"</td><td>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][3]+"</td><td>"+vlc_valores[i][4]+"</td><td>"+vlc_valores[i][5]+"</td><td>"+vlc_valores[i][7]+"</td><td>"+vlc_valores[i][8]+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][6]+"</td><td><button class='btn btn-default btn-xs' data-toggle='modal' data-target='#ver_detalle' onclick='lista_factura_detalle("+'"'+vlc_valores[i][9]+'"'+","+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][5]+'"'+");factura_detalle_total("+'"'+vlc_valores[i][9]+'"'+","+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][5]+'"'+");'><span data-toggle='tooltip' title='Ver detale de Pago' class='glyphicon glyphicon-eye-open'></span></button><button class='btn btn-default btn-xs' id='btn_descargar_pdf' title='Descargar PDF'  onclick=' ruta_imprimir_pdf("+'"'+vlc_valores[i][9]+'"'+","+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][5]+'"'+")'><span class='glyphicon glyphicon-save'></span></button></td></tr> ";
						html+="<tr><td align='center'>"+vlc_valores[i][0]
						+"</td><td>"+vlc_valores[i][1]
						+"</td><td>"+vlc_valores[i][2]
						+"</td><td>"+vlc_valores[i][3]
						+"</td><td>"+vlc_valores[i][4]
						+"</td><td>"+vlc_valores[i][6]
						+"</td><td>"+vlc_valores[i][7]
						+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][5]
						+"</td><td><button class='btn btn-default btn-xs' data-toggle='modal' data-target='#ver_detalle' onclick='lista_factura_detalle("+'"'+vlc_valores[i][8]+'"'+","+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][4]+'"'+");factura_detalle_total("+'"'+vlc_valores[i][8]+'"'+","+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][4]+'"'+");'><span data-toggle='tooltip' title='Ver detale de Pago' class='glyphicon glyphicon-eye-open'></span></button><button class='btn btn-default btn-xs' id='btn_descargar_pdf' title='Descargar PDF'  onclick=' ruta_imprimir_planilla("+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][4]+'"'+")'><span class='glyphicon glyphicon-save'></span></button></td></tr> ";
					}				
	
					html+="</tbody></table></div>"
					$("#lista").html(html);
	
				}
			}
		});
		
	}


function lista_factura_detalle(vlc_proveedor,vlc_fecha,vlc_transaccion)
	{
		$("#lista_factura_detalle").empty();
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/pagos_mes/pagos_mes.php',
			type:'POST',
			data: 'proveedor='+vlc_proveedor+'&boton=ver'+'&fecha='+vlc_fecha+'&transaccion='+vlc_transaccion,
			beforeSend: function(){
				$('#light_modal_detalle').fadeIn();
			}	
				
		}).done(function(vlc_resultado)
		{	

			$('#light_modal_detalle').hide();

			var vlc_valores = eval(vlc_resultado);
			//html="<table class='table table-hover' id='cabecera_tabla'><thead><tr class=active><th id='pagos_mes_fecha'>Fecha</th><th>Factura</th><th>Prefactura</th><th>Historia Clínica</th><th>Admisión</th><th>Paciente/Observación</th><th id='ancho_monto'>Monto</th><th id='ancho_cancela'>Cancela</th></tr></thead><tbody>";
			html="<table class='table table-hover' id='cabecera_tabla'><thead><tr class=active><th id='pagos_mes_fecha'>Fecha</th><th>Factura</th><th>Historia clínica</th><th>Admisión</th><th>Paciente/Observación</th><th id='ancho_monto'>Monto</th><th id='ancho_cancela'>Cancelado</th><th id='ancho_cancela'>Saldo</th></tr></thead><tbody>";
			
			for(i=0;i<vlc_valores.length;i++)
			{					
				
				//vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*"+vlc_valores[i][7]+"*"+vlc_valores[i][8]+"*";
				vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*"+vlc_valores[i][7]+"*"+vlc_valores[i][8]+"*"+vlc_valores[i][9]+"*";
				
				var vlc_paciente = vlc_valores[i][5].replace("?", "Ñ");
				//html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td id='factura_pago_mes'>"+vlc_valores[i][1]+"</td><td>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][3]+"</td><td>"+vlc_valores[i][4]+"</td><td id='tabla_celda_izquierdo'>"+vlc_paciente+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][7]+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][8]+"</td></tr> ";
				html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td id='factura_pago_mes'>"+vlc_valores[i][1]+"</td><td>"+vlc_valores[i][3]+"</td><td>"+vlc_valores[i][4]+"</td><td id='tabla_celda_izquierdo'>"+vlc_paciente+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][7]+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][8]+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][9]+"</td></tr> ";
			}
			
			html+="</tbody></table>"
			$("#lista_factura_detalle").html(html);

			$(document).ready(function() {
 				var ancho_cancela = $("#ancho_cancela").width();
				var ancho_monto = $("#ancho_monto").width();
				$("#total_monto_detalle_factura").width(ancho_monto);
				$("#total_cancela_detalle_factura").width(ancho_cancela);
			});		
		});
		
	}

function factura_detalle_total(vlc_proveedor,vlc_fecha,vlc_transaccion)
	{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/pagos_mes/pagos_mes.php',
			type:'POST',
			data: 'proveedor='+vlc_proveedor+'&boton=ver_total'+'&fecha='+vlc_fecha+'&transaccion='+vlc_transaccion
				
		}).done(function(vlc_resultado)
		{	
			$('#total_monto_detalle_factura').val('');
			$('#total_cancela_detalle_factura').val('');
			$('#total_saldo_detalle_factura').val('');
			var vlc_valor = eval(vlc_resultado);

			for(i=0;i<vlc_valor.length;i++)
			{					
				$('#total_monto_detalle_factura').text(vlc_valor[i][0]);
				$('#total_cancela_detalle_factura').text(vlc_valor[i][1]);
				$('#total_saldo_detalle_factura').text(vlc_valor[i][2]);
			}

		});
		
	}

function imprimir_pdf(vlc_proveedor,vlc_fecha,vlc_transaccion)
	{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/descarga_documentos/preparar_pdf.php',
			type:'POST',
			data: 'proveedor='+vlc_proveedor+'&boton=ver'+'&fecha='+vlc_fecha+'&transaccion='+vlc_transaccion	
				
		}).done(function(vlc_resultado)
		{	
			alert(vlc_resultado);
		});
		
	}

$("#boton_buscar").click(function()
	{
		var vln_proveedor_select = $('#proveedor_oculto').val();
		var vlc_fecha_desde = $('#fecha_desde_pagos').val();
		var vlc_fecha_hasta = $('#fecha_hasta_pagos').val();
		lista_pagos_mes(vln_proveedor_select,vlc_fecha_desde,vlc_fecha_hasta,'simple');
	});

$("#boton_buscar_todos").click(function()
	{
		var vln_proveedor_select = $('#proveedor_oculto').val();
		var vln_mes_select = $('select[name=select_mes]').val();
		var vln_anio_select = $('select[name=select_anio]').val();

		lista_pagos_mes(vln_proveedor_select,vln_anio_select,vln_mes_select,'total');
	});

var vln_proveedor_select = $('#proveedor_oculto').val();
var vln_mes_select = $('select[name=select_mes_planilla]').val();
var vln_anio_select = $('select[name=select_anio_planilla]').val();

function enviar_planilla()
{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/pagos_mes/pagos_mes.php',
			type:'POST',
			data: '&boton=enviar',
			beforeSend: function(){
				$('#light_modal_planilla').fadeIn();
			}	
				
		}).done(function(vlc_resultado)
		{	
			$('#light_modal_planilla').hide();
			$('#txt_planilla').show();
			setTimeout(function(){
					$('#txt_planilla').fadeOut(600);
				},3400);
		});
}

$("#boton_buscar_factura").click(function()
	{
		var vln_proveedor = $('#proveedor_oculto').val();
		var vlc_paciente =  $('#paciente_modal').val();
		var vln_factura =  $('#factura_modal').val();
		window.location= "http://'+vlc_dominio+'/'+vlc_proyecto+'/facturas_buscar?proveedor="+vln_proveedor+"&paciente="+vlc_paciente+"&factura="+vln_factura;
	});

	
