<?php
	require_once("../../modelo/pagos_mes/estado_cuenta.php");
	require_once("../../controlador/master/master.php");

		$vgc_proveedor= $_GET["vgc_proveedor"];
		$vgc_fecha_desde= $_GET["vgc_fecha_desde"];
		$vgc_fecha_hasta= $_GET["vgc_fecha_hasta"];
		$month = date('m');
      	$year = date('Y');
      	$vlc_primer_dia= date('d-M-Y', mktime(0,0,0, $month, 1, $year));
		 	
		$vgc_instancia = new estado_cuenta();

		$vgc_respuesta=$vgc_instancia ->facturas_entregadas($vgc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
		$vgc_respuesta_total = $vgc_respuesta;

		$vgc_respuesta_2=$vgc_instancia ->pagos_recibidos($vgc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
		$vgc_respuesta_total_2 = $vgc_respuesta_2;

		$vgc_respuesta_3=$vgc_instancia ->facturas_abiertas($vgc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta,$vlc_primer_dia);
		$vgc_respuesta_total_3 = $vgc_respuesta_3;

		$vgc_respuesta_global = $vgc_respuesta.$vgc_respuesta_2.$vgc_respuesta_3;

		$vlc_ip=gethostbyaddr($_SERVER['REMOTE_ADDR']);
		$vlc_funcion_nombre = "ESTADO_CUENTA_DESCARGA";
		$vgc_instancia-> guardar_funcion_auditoria($vgc_proveedor, $vlc_funcion_nombre, $vlc_ip);

		echo $vgc_respuesta_global;
?>
