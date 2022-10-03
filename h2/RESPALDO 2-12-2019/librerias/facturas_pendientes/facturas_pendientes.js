 
function lista_facturas_pendientes(vln_proveedor)
	{
		$.ajax(
		{
			url:'http://app.hmetro.med.ec/honorarios/controlador/facturas_pendientes/facturas_pendientes.php',
			type:'POST',
			data:'proveedor='+vln_proveedor+'&boton=buscar',
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
				$('#factura_vacia_txt').show();
				$('#lista').hide();

			}else{

				$('#factura_vacia_txt').hide();
				$('#lista').show();
				//html="<div class='table-responsive' align='center'><table class='table table-hover table-condensed' id='cabecera_tabla'><thead><tr class=active><th>Fecha</th><th id='facturas_tipo'>Tipo</th><th>Factura</th><th>Prefactura</th><th>Historia Clínica</th><th>Paciente</th><th>Monto</th><th>Saldo</th></tr></thead><tbody id='tabla_facturas_body'>";
				html="<div class='table-responsive' align='center'><table class='table table-hover table-condensed' id='cabecera_tabla'><thead><tr class=active><th>Fecha</th><th id='facturas_tipo'>Tipo</th><th>Factura</th><th>Historia clínica</th><th>Paciente</th><th>Monto</th><th>Saldo</th></tr></thead><tbody id='tabla_facturas_body'>";
			
				for(i=0;i<vlc_valores.length;i++)
				{					
					//vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][3]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*"+vlc_valores[i][7]+"*";
					vlc_datos=vlc_valores[i][0]+"*"+vlc_valores[i][1]+"*"+vlc_valores[i][2]+"*"+vlc_valores[i][4]+"*"+vlc_valores[i][5]+"*"+vlc_valores[i][6]+"*"+vlc_valores[i][7]+"*";
					var vlc_paciente = vlc_valores[i][5].replace("?", "Ñ");
					//html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td>"+vlc_valores[i][1]+"</td><td>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][3]+"</td><td>"+vlc_valores[i][4]+"</td><td id='tabla_celda_izquierdo'>"+vlc_paciente+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][6]+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][7]+"</td></tr> ";
					html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td>"+vlc_valores[i][1]+"</td><td>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][4]+"</td><td id='tabla_celda_izquierdo'>"+vlc_paciente+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][6]+"</td><td id='tabla_pagos_mes_monto'>"+vlc_valores[i][7]+"</td></tr> ";
				}
			
				html+="</tbody></table></div>"
				$("#lista").html(html);
			}	
		});
		
	}

