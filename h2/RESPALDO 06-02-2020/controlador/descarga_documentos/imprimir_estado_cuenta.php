<?php
	require_once("../../modelo/pagos_mes/estado_cuenta.php");

		$vgc_proveedor= $_GET["vgc_proveedor"];
		$vgc_fecha_desde= $_GET["vgc_fecha_desde"];
		$vgc_fecha_hasta= $_GET["vgc_fecha_hasta"];
		$vgc_instancia = new estado_cuenta();

		$vgc_respuesta=$vgc_instancia ->facturas_entregadas($vgc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
		$vgc_respuesta_total = $vgc_respuesta;

		$vgc_respuesta_2=$vgc_instancia ->pagos_recibidos($vgc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
		$vgc_respuesta_total_2 = $vgc_respuesta_2;

		$vgc_respuesta_3=$vgc_instancia ->facturas_abiertas($vgc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
		$vgc_respuesta_total_3 = $vgc_respuesta_3;

		$vgc_respuesta_global = $vgc_respuesta.$vgc_respuesta_2.$vgc_respuesta_3;

		echo $vgc_respuesta_global;
?>
