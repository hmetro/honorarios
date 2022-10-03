$( document ).ready(function() {
	var fecha = new Date();
	var valor =("0"+(fecha.getMonth()+1)).slice(-2);
	$("#select_mes option[value="+valor+"]").prop("selected",true);
});

function lista_cpt(vln_codigo,vlc_descripcion)
	{
		$.ajax(
		{
			url:'http://'+vlc_dominio+'/'+vlc_proyecto+'/controlador/tarifario/cpt.php',
			type:'POST',
			data:'codigo='+vln_codigo+'&boton=buscar'+'&descripcion='+vlc_descripcion,
			beforeSend: function(){
				$('#fade').fadeIn();
				$('#light').fadeIn();
			}	
		}).done(function(vlc_resultado)
		{	

			console.log(vlc_resultado);
			$('#fade').fadeOut();
			$('#light').fadeOut();

			var vlc_valores = eval(vlc_resultado);

			if(vlc_valores==''){
				$('#pago_vacio_txt').show();
				$('#lista').hide();
			}else{
				$('#pago_vacio_txt').hide();
				$('#lista').show();
				html="<div class='table-responsive'><table class='table table-hover' id='tabla_cpt'><thead><tr class=active><th>Agrupación</th><th>Código CPT</th><th>Descripción</th><th>Descripción CPT</th><th># Unidades</th><th># Unidades Anestesia</th></tr></thead><tbody id='tabla_pagos_mes_body'>";
				var vln_contador = 0;
				for(i=0;i<vlc_valores.length;i++)
				{					
					
					html+="<tr><td align='center'>"+vlc_valores[i][0]+"</td><td>"+vlc_valores[i][3]+"</td><td>"+vlc_valores[i][2]+"</td><td>"+vlc_valores[i][4]+"</td><td>"+vlc_valores[i][5]+"</td><td>"+vlc_valores[i][6]+"</td></tr> ";
				}				

				html+="</tbody></table></div>"
				$("#lista").html(html);

			}	
		});
		
	}



$("#boton_buscar").click(function()
	{
		var vln_codigo_cpt = $('#codigo_cpt').val();
		var vlc_descripcion_ctp = $('#descripcion_cpt').val();
		lista_cpt(vln_codigo_cpt,vlc_descripcion_ctp);
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

	
