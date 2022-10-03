<?php
	require_once("../../modelo/facturas_mes/facturas_mes.php");
	$vgc_boton= $_POST['boton'];

	if($vgc_boton=='buscar_seguros')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgc_fecha_desde= $_POST['fecha_desde'];
		$vgc_fecha_hasta= $_POST['fecha_hasta'];
    	$vgc_fecha_desde=date('d-M-Y' ,strtotime($vgc_fecha_desde));
    	$vgc_fecha_hasta=date('d-M-Y' ,strtotime($vgc_fecha_hasta));
    	
    	if ($vgc_fecha_desde>='01-01-2017') 
    	{
			$vgc_instancia = new honorarios();
			$vgc_respuesta=$vgc_instancia ->lista_facturas_mes_seguros($vgn_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
			echo json_encode($vgc_respuesta);    		
    	
    	}else{
    		echo "fecha_error_s";
    	}		
	}

	if($vgc_boton=='buscar_hospital_metropolitano')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgc_fecha_desde= $_POST['fecha_desde'];
		$vgc_fecha_hasta= $_POST['fecha_hasta'];
    	$vgc_fecha_desde=date('d-M-Y' ,strtotime($vgc_fecha_desde));
    	$vgc_fecha_hasta=date('d-M-Y' ,strtotime($vgc_fecha_hasta));			
		
    	if ($vgc_fecha_desde>='01-01-2017') 
    	{

			$vgc_instancia = new honorarios();
			$vgc_respuesta=$vgc_instancia ->lista_facturas_mes_hospital_metropolitano($vgn_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
			echo json_encode($vgc_respuesta);
		
		}else{
			echo "fecha_error_m";
		}	
	}

	if($vgc_boton=='buscar_instituciones_publicas')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgc_fecha_desde= $_POST['fecha_desde'];
		$vgc_fecha_hasta= $_POST['fecha_hasta'];
    	$vgc_fecha_desde=date('d-M-Y' ,strtotime($vgc_fecha_desde));
    	$vgc_fecha_hasta=date('d-M-Y' ,strtotime($vgc_fecha_hasta));			
		
		if ($vgc_fecha_desde>='01-Jan-2017') 
		{
			$vgc_instancia = new honorarios();
			$vgc_respuesta=$vgc_instancia ->lista_facturas_mes_instituciones_publicas($vgn_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
			echo json_encode($vgc_respuesta);			
		
		}else{
			echo "fecha_error_p";
		}
	}

?>