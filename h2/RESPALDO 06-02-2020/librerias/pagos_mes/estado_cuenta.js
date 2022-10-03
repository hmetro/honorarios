function ruta_imprimir_pdf()
{
	$('#fade').fadeIn();
	$('#light').fadeIn();

	setTimeout(function(){
		var vlc_proveedor = $("#proveedor_oculto").val();
		var vlc_fecha_desde = $("#desde_fecha").val();
		var vlc_fecha_hasta = $("#hasta_fecha").val();
		window.location='http://app.hmetro.med.ec/honorarios/controlador/descarga_documentos/preparar_estado_cuenta.php?proveedor='+vlc_proveedor+'&fecha_desde='+ vlc_fecha_desde +'&fecha_hasta='+vlc_fecha_hasta+'';
	},1000); // 3000ms = 3s	
	
	setTimeout(function(){
		$('#fade').fadeOut();
		$('#light').fadeOut();
	},8000); // 3000ms = 3s
}	