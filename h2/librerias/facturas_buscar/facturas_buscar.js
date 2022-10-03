
function listar_facturas(vlc_paciente,vln_factura,vln_proveedor)
	{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/facturas_buscar/facturas_buscar.php',
			type:'POST',
			data:'paciente='+vlc_paciente+'&boton=buscar'+'&factura='+vln_factura+'&proveedor='+vln_proveedor,
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
				$('#factura_vacio_txt').show();
				$('#lista_facturas').hide();
			}else{
				$('#factura_vacio_txt').hide();
				$('#lista_facturas').show();
				//html="<div class='table-responsive'><table class='table table-hover' id='tabla_facturas_mes'><thead><tr class=active><th id='facturas_mes_fecha'>Fecha</th><th>Pagador</th><th>Cliente</th><th>Factura</th><th>Prefactura</th><th>Historia Clínica</th><th>Paciente</th><th>Monto</th><th>Saldo</th></tr></thead><tbody id='tabla_facturas_mes_body'>";
				html="<div class='table-responsive'><table class='table table-hover' id='tabla_facturas_mes'><thead><tr class=active><th id='facturas_mes_fecha'>Fecha</th><th>Pagador/Cliente</th><th>Factura</th><th>Historia clínica</th><th>Paciente</th><th>Monto</th><th>Saldo</th></tr></thead><tbody id='tabla_facturas_mes_body'>";				
				var vln_contador = 0;
				for(i=0;i<vlc_valores.length;i++)
				{					
					//vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*";
					vlc_datos=vlc_valores[i][0]+"*"+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*";
					//html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td align='left'>"+vlc_valores[i][1]+"</td><td align='center'>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][3]+"</td><td>"+vlc_valores[i][4]+"</td><td align='left'>"+vlc_valores[i][5]+"</td><td align='rigth'>"+vlc_valores[i][6]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][7]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][8]+"</td></tr>";
					html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td align='left'>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][3]+"</td><td align='center'>"+vlc_valores[i][5]+"</td><td align='left'>"+vlc_valores[i][6]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][7]+"</td><td id='tabla_facturas_mes_monto' align='rigth'>"+vlc_valores[i][8]+"</td></tr>";					
				}				

				html+="</tbody></table></div>"
				$("#lista_facturas").html(html);

			}	
		});
		
	}

$("#boton_buscar_factura").click(function()
	{
		var vln_proveedor = $('#proveedor_oculto').val();
		var vlc_paciente =  $('#paciente_modal').val();
		var vln_factura =  $('#factura_modal').val();
		window.location= "http://'+vlc_dominio+'/'+vlc_proyecto+'/facturas_buscar?proveedor="+vln_proveedor+"&paciente="+vlc_paciente+"&factura="+vln_factura;
	});

$("#boton_buscar").click(function()
	{
		var vln_proveedor = $('#proveedor_oculto').val();
		var vlc_paciente =  $('#paciente_buscar').val();
		var vln_factura =  $('#factura_buscar').val();
		listar_facturas(vlc_paciente,vln_factura,vln_proveedor);
	});


