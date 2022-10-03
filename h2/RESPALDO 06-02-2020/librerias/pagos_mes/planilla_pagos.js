function ruta_imprimir_planilla(vlc_fecha_transaccion, vln_numero_transaccion)
{
	$('#fade').fadeIn();
	$('#light').fadeIn();

	setTimeout(function(){
		var vlc_proveedor = $("#proveedor_oculto").val();
		window.location='http://app.hmetro.med.ec/honorarios/controlador/descarga_documentos/preparar_planilla_pago.php?proveedor='+vlc_proveedor+'&fecha_transaccion='+ vlc_fecha_transaccion +'&numero_transaccion='+vln_numero_transaccion+'';
	},1000); // 3000ms = 3s	
	
	setTimeout(function(){
		$('#fade').fadeOut();
		$('#light').fadeOut();
	},8000); // 3000ms = 3s
}	