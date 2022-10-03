<?php
	require_once("../../modelo/descuento_honorarios/descuento_honorarios.php");
	require_once("../../controlador/master/master.php");
	$vgc_boton= $_POST['boton'];

	if($vgc_boton=='buscar_descuentos')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgc_fecha_desdeO= $_POST['fecha_desde'];
		$vgc_fecha_hastaO= $_POST['fecha_hasta'];
    	$vgc_fecha_desde=date('d-M-Y' ,strtotime($vgc_fecha_desdeO));
    	$vgc_fecha_hasta=date('d-M-Y' ,strtotime($vgc_fecha_hastaO));
    	
    	if ($vgc_fecha_desdeO>='2017-01-01') 
    	{
			$vgc_instancia = new descuentos();
			$vgc_respuesta=$vgc_instancia ->lista_descuentos($vgn_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
			
			$vlc_ip=gethostbyaddr($_SERVER['REMOTE_ADDR']);
			$vlc_funcion_nombre = "DESCUENTO_HONORARIO_CONSULTA";
			$vgc_instancia-> guardar_funcion_auditoria($vgn_proveedor, $vlc_funcion_nombre, $vlc_ip);
			
			echo json_encode($vgc_respuesta);    		
    	
    	}else{
    		echo "fecha_error_s";
    	}		
	}

	if($vgc_boton=='buscar_detalle_descuento')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgc_transaccion= $_POST['transaccion'];
    	
    	if (!empty($vgc_transaccion) and !empty($vgn_proveedor)) 
    	{
			$vgc_instancia = new descuentos();
			$vgc_respuesta=$vgc_instancia ->lista_descuentos_detalle($vgn_proveedor,$vgc_transaccion);
			$vgc_array = json_encode($vgc_respuesta);
			
			if($vgc_array==='[]'){
				echo "no_datos";
			}else{
				echo $vgc_array;
			}

			$vlc_ip=gethostbyaddr($_SERVER['REMOTE_ADDR']);
			$vlc_funcion_nombre = "DESCUENTO_HONORARIO_DETALLE_CONSULTA";
			$vgc_instancia-> guardar_funcion_auditoria($vgn_proveedor, $vlc_funcion_nombre, $vlc_ip);
    	
    	}else{
    		echo "error";
    	}		
	}
?>