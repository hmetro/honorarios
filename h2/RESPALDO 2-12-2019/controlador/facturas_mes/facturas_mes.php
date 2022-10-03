<?php
	require_once("../../modelo/facturas_mes/facturas_mes.php");
	$vgc_boton= $_POST['boton'];

	
	if($vgc_boton=='buscar_seguros')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgn_anio= $_POST['anio'];
		$vgn_mes= $_POST['mes'];
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->lista_facturas_mes_seguros($vgn_proveedor,$vgn_anio,$vgn_mes);
		echo json_encode($vgc_respuesta);
	}

	if($vgc_boton=='buscar_hospital_metropolitano')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgn_anio= $_POST['anio'];
		$vgn_mes= $_POST['mes'];
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->lista_facturas_mes_hospital_metropolitano($vgn_proveedor,$vgn_anio,$vgn_mes);
		echo json_encode($vgc_respuesta);
	}

	if($vgc_boton=='buscar_instituciones_publicas')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgn_anio= $_POST['anio'];
		$vgn_mes= $_POST['mes'];
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->lista_facturas_mes_instituciones_publicas($vgn_proveedor,$vgn_anio,$vgn_mes);
		echo json_encode($vgc_respuesta);
	}

?>