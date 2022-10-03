<?php
	require_once("../../modelo/pagos_mes/pagos_mes.php");

		$vgc_proveedor= $_GET["vgc_proveedor"];
		$vgc_fecha= $_GET["vgc_fecha"];
		$vgc_transaccion= $_GET["vgc_transaccion"];
		$vgc_instancia = new honorarios();
		$vgc_anio = date("Y", strtotime($vgc_fecha));
		$vgc_mes = date("m", strtotime($vgc_fecha));
		$vgc_respuesta=$vgc_instancia ->imprimir_pdf($vgc_proveedor,$vgc_anio,$vgc_mes);
		$vgc_respuesta_total = $vgc_respuesta;

		$vgc_respuesta_2=$vgc_instancia ->imprimir_pdf_2($vgc_proveedor,$vgc_anio,$vgc_mes);
		$vgc_respuesta_total_2 = $vgc_respuesta_2;

		$vgc_respuesta_3=$vgc_instancia ->imprimir_pdf_3($vgc_proveedor,$vgc_anio,$vgc_mes);
		$vgc_respuesta_total_3 = $vgc_respuesta_3;

		$vgc_respuesta_global = $vgc_respuesta.$vgc_respuesta_2.$vgc_respuesta_3;

		echo $vgc_respuesta_global;
?>
