
/*$( document ).ready(function() {
	var fecha = new Date();
	var valor =("0"+(fecha.getMonth()+1)).slice(-2);
	$("#select_mes option[value="+valor+"]").prop("selected",true);
});*/


function lista_facturas_mes_seguros(vln_proveedor,vlc_fecha_desde,vlc_hasta)
	{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/facturas_mes/facturas_mes.php',
			type:'POST',
			data:'proveedor='+vln_proveedor+'&boton=buscar_seguros'+'&fecha_desde='+vlc_fecha_desde+'&fecha_hasta='+vlc_hasta,
			beforeSend: function(){
				$('#fade').fadeIn();
				$('#light').fadeIn();
			}	
		}).done(function(vlc_resultado_s)
		{	 	
			$('#fade').fadeOut();
			$('#light').fadeOut();

			if (vlc_resultado_s.length==20) 
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
					//html="<div class='table-responsive'><table class='table table-hover' id='tabla_facturas_mes'><thead><tr class=active><th id='facturas_mes_fecha'>Fecha</th><th>Cliente</th><th>Factura</th><th>Prefactura</th><th>Historia Clínica</th><th>Paciente</th><th>Monto</th><th>Saldo</th></tr></thead><tbody id='tabla_facturas_mes_body'>";
					html="<div class='table-responsive'><table class='table table-hover' id='tabla_facturas_mes'><thead><tr class=active><th id='facturas_mes_fecha'>Fecha</th><th>Pagador/Cliente</th><th>Factura</th><th>Historia clínica</th><th>Paciente</th><th>Monto</th><th>Saldo</th></tr></thead><tbody id='tabla_facturas_mes_body'>";
					var vln_contador = 0;
					for(i=0;i<vlc_valores.length;i++)
					{					
						//vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*";
						vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*";
						//html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td align='left'>"+vlc_valores[i][1]+"</td><td align='center'>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][3]+"</td><td>"+vlc_valores[i][4]+"</td><td align='left'>"+vlc_valores[i][5]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][6]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][7]+"</td></tr>";
						html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td align='left'>"+vlc_valores[i][1]+"</td><td align='center'>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][4]+"</td><td align='left'>"+vlc_valores[i][5]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][6]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][7]+"</td></tr>";					
					}				
	
					html+="</tbody></table></div>"
					$("#lista_seguros").html(html);
	
				}
			}		
		});
		
	}


function lista_facturas_mes_hospital_metropolitano(vln_proveedor,vlc_fecha_desde,vlc_hasta)
	{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/facturas_mes/facturas_mes.php',
			type:'POST',
			data:'proveedor='+vln_proveedor+'&boton=buscar_hospital_metropolitano'+'&fecha_desde='+vlc_fecha_desde+'&fecha_hasta='+vlc_hasta,
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
				$('#pago_vacio_txt_hospital_metropolitano').show();
				$('#lista_hospital_metropolitano').hide();
			}else{
				$('#pago_vacio_txt_hospital_metropolitano').hide();
				$('#lista_hospital_metropolitano').show();
				html="<div class='table-responsive'><table class='table table-hover' id='tabla_facturas_mes'><thead><tr class=active><th id='facturas_mes_fecha'>Fecha</th><th>Cliente</th><th>Factura</th><th>Prefactura</th><th>Historia Clínica</th><th>Paciente</th><th>Monto</th><th>Saldo</th></tr></thead><tbody id='tabla_facturas_mes_body'>";
				var vln_contador = 0;
				for(i=0;i<vlc_valores.length;i++)
				{					
					vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*";
					html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td align='left'>"+vlc_valores[i][1]+"</td><td align='center'>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][3]+"</td><td>"+vlc_valores[i][4]+"</td><td align='left'>"+vlc_valores[i][5]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][6]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][7]+"</td></tr>";
				}				

				html+="</tbody></table></div>"
				$("#lista_hospital_metropolitano").html(html);

			}	
		});
		
	}

function lista_facturas_mes_instituciones_publicas(vln_proveedor,vlc_fecha_desde,vlc_hasta)
	{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/facturas_mes/facturas_mes.php',
			type:'POST',
			data:'proveedor='+vln_proveedor+'&boton=buscar_instituciones_publicas'+'&fecha_desde='+vlc_fecha_desde+'&fecha_hasta='+vlc_hasta,
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
				$('#pago_vacio_txt_instituciones_publicas').show();
				$('#lista_instituciones_publicas').hide();
			}else{
				$('#pago_vacio_txt_instituciones_publicas').hide();
				$('#lista_instituciones_publicas').show();
				html="<div class='table-responsive'><table class='table table-hover' id='tabla_facturas_mes'><thead><tr class=active><th id='facturas_mes_fecha'>Fecha</th><th>Cliente</th><th>Factura</th><th>Prefactura</th><th>Historia Clínica</th><th>Paciente</th><th>Monto</th><th>Saldo</th></tr></thead><tbody id='tabla_facturas_mes_body'>";
				var vln_contador = 0;
				for(i=0;i<vlc_valores.length;i++)
				{					
					vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*";
					html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td align='left'>"+vlc_valores[i][1]+"</td><td align='center'>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][3]+"</td><td>"+vlc_valores[i][4]+"</td><td align='left'>"+vlc_valores[i][5]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][6]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][7]+"</td></tr>";
				}				

				html+="</tbody></table></div>"
				$("#lista_instituciones_publicas").html(html);

			}	
		});
		
	}


$("#boton_buscar").click(function()
	{
		var vln_proveedor_select = $('#proveedor_oculto').val();
		var vlc_fecha_desde = $('#fecha_desde_pendiente').val();
		var vlc_fecha_hasta = $('#fecha_hasta_pendiente').val();
		lista_facturas_mes_seguros(vln_proveedor_select,vlc_fecha_desde,vlc_fecha_hasta);
		lista_facturas_mes_hospital_metropolitano(vln_proveedor_select,vlc_fecha_desde,vlc_fecha_hasta);
		lista_facturas_mes_instituciones_publicas(vln_proveedor_select,vlc_fecha_desde,vlc_fecha_hasta);

	});
