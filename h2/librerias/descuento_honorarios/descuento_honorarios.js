function lista_descuento_honorario(vln_proveedor,vlc_fecha_desde,vlc_hasta)
{
	
	$.ajax(
	{
		url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/descuento_honorarios/descuento_honorarios.php',
		type:'POST',
		data:'proveedor='+vln_proveedor+'&boton=buscar_descuentos'+'&fecha_desde='+vlc_fecha_desde+'&fecha_hasta='+vlc_hasta,
		beforeSend: function(){
			$('#fade').fadeIn();
			$('#light').fadeIn();
		}	
	}).done(function(vlc_resultado_s)
	{	 	
		console.log(vlc_resultado_s);
		$('#fade').fadeOut();
		$('#light').fadeOut();
		if (vlc_resultado_s === 'fecha_error_s') 
		{
			notificaciones("Error la fecha debe de ser mayor o igual a la fecha 01/01/2017", "error");	
		
		}else
		{
			var vlc_valores = eval(vlc_resultado_s);

			if(vlc_valores==''){
				$('#pago_vacio_txt_seguros').show();
				$('#lista_seguros').hide();
			}else{
				$('#pago_vacio_txt_seguros').hide();
				$('#lista_seguros').show();
				html="<div class='table-responsive'><table class='table table-hover'><thead><tr class=active><th>Fecha</th><th>Tipo</th><th>Valor descuento</th><th>Saldo</th><th>Acción</th></tr></thead><tbody>";
				for(i=0;i<vlc_valores.length;i++)
				{	
					if( vlc_valores[i][1].indexOf('CAFETERI') != -1 ){
   						var tipo = "CONSUMO RESTAURANTE";
					}
					else{
   						var tipo = vlc_valores[i][1];
					} 
									
					vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*";
					html+="<tr><td align='left'>"+vlc_valores[i][0]+"</td><td align='left'>"+
					tipo +"</td><td align='left'>"+
					vlc_valores[i][2]+"</td><td align='left'>"+
					vlc_valores[i][3]+"</td><td align='left'>"+
					"<button class='btn btn-default btn-xs' data-toggle='modal' data-target='#ver_detalle' onclick='lista_descuento_detalle("+'"'+vlc_valores[i][4]+'"'+","+'"'+vlc_valores[i][5]+'"'+")'><span data-toggle='tooltip' title='Ver detale de Pago' class='glyphicon glyphicon-eye-open'></span></button></td></tr>";					
				}				
				html+="</tbody></table></div>"
				$("#lista_descuentos").html(html);
			}
		}		
	});
}

function lista_descuento_detalle(vln_transaccion,vln_proveedor)
{

	$.ajax(
	{
		url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/descuento_honorarios/descuento_honorarios.php',
		type:'POST',
		data:'proveedor='+vln_proveedor+'&boton=buscar_detalle_descuento'+'&transaccion='+vln_transaccion,
		beforeSend: function(){
			$('#fade').fadeIn();
			$('#light').fadeIn();
		}	
	}).done(function(vlc_resultado_s)
	{	 	
		$('#fade').fadeOut();
		$('#light').fadeOut();

		console.log(vlc_resultado_s);

		if (vlc_resultado_s !== 'error' && vlc_resultado_s !== 'no_datos') 
		{
			var vlc_valores = eval(vlc_resultado_s);

			html="<div class='table-responsive'><table class='table table-hover' id='tabla_facturas_mes'><thead><tr class=active><th id='facturas_mes_fecha'>Fecha</th><th>No. Físico</th><th>Tipo</th><th>Detalle</th><th>Transacción</th><th>Monto</th><th>Opción</th></tr></thead><tbody id='tabla_facturas_mes_body'>";

			for(i=0;i<vlc_valores.length;i++)
			{					

				if( vlc_valores[i][3].indexOf('CAFETERI') != -1 ){
   					var tipo = "CONSUMO RESTAURANTE";
				}
				else{
   					var tipo = vlc_valores[i][3];
				} 
						

				vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*";
				html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td>"+
				vlc_valores[i][2]+"</td><td >"+
				vlc_valores[i][1]+"</td><td>"+
				tipo+"</td><td >"+
				vlc_valores[i][4]+"</td><td >"+
				vlc_valores[i][6]+"</td><td >"+
				"<button class='btn btn-default btn-xs' onclick='ruta_imprimir_planilla("+'"'+vlc_valores[i][0]+'"'+","+'"'+vlc_valores[i][5]+'"'+","+'"'+vlc_valores[i][7]+'"'+");'><span data-toggle='tooltip' title='Ver detale de Pago' class='glyphicon glyphicon-download-alt'></span></button></td></tr>";					
			}				
			html+="</tbody></table></div>"
			$("#lista_descuento_detalle").html(html);

				
		}else if (vlc_resultado_s === 'no_datos'){
			$('#ver_detalle').modal('hide')
			notificaciones("No existe comprobantes o planillas de pagos", "error");
		}else
		{
			$('#ver_detalle').modal('hide')
			notificaciones("Existe error al tratar de consultar", "error");
		}		
	});
}	

function limpiar_modal()
{
	$("#lista_descuento_detalle").html("");
	$('#ver_detalle').modal('hide')
}

function ruta_imprimir_planilla(vlc_fecha_transaccion, vln_numero_transaccion, vlc_proveedor)
{
	$('#fade').fadeIn();
	$('#light').fadeIn();

	setTimeout(function(){
		window.location='http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/descarga_documentos/preparar_planilla_pago.php?proveedor='+vlc_proveedor+'&fecha_transaccion='+ vlc_fecha_transaccion +'&numero_transaccion='+vln_numero_transaccion+'&tipo_imprime=DESCUENTOS';
	},1000); // 3000ms = 3s	
	
	setTimeout(function(){
		$('#fade').fadeOut();
		$('#light').fadeOut();
	},8000); // 3000ms = 3s
}	

$("#boton_buscar").click(function()
	{
		var vln_proveedor_select = $('#proveedor_oculto').val();
		var vlc_fecha_desde = $('#fecha_desde_pendiente').val();
		var vlc_fecha_hasta = $('#fecha_hasta_pendiente').val();
		lista_descuento_honorario(vln_proveedor_select,vlc_fecha_desde,vlc_fecha_hasta);
	});
