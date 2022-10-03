<?php
	require_once("../../modelo/pagos_mes/pagos_mes.php");

	$vgc_ruta = $_GET['ruta'];

	if($vgc_ruta =='paciente'){
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->lista_pagos_mes('000316','28/SEP/2020','02/OCT/2020');
		echo json_encode($vgc_respuesta);
		print_r($vgc_respuesta);
	}




?>