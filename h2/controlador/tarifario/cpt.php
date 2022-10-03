<?php
	session_start();
	require_once("../../modelo/tarifario/cpt.php");
	require_once("../../controlador/master/master.php");
	$vgc_boton= $_POST['boton'];

	
	if($vgc_boton=='buscar')
	{
		$vgn_codigo= $_POST['codigo'];
		$vgc_descripcion= $_POST['descripcion'];
		$vgc_instancia = new honorarios();

		$vgc_respuesta=$vgc_instancia ->lista_cpt($vgn_codigo,$vgc_descripcion);
		
		$vgc_proveedor = $_SESSION['vgc_codigo'];
		$vlc_ip=gethostbyaddr($_SERVER['REMOTE_ADDR']);

		$vlc_funcion_nombre = "CPT_CONSULTA";
		$vgc_instancia-> guardar_funcion_auditoria($vgc_proveedor, $vlc_funcion_nombre, $vlc_ip);

		echo json_encode($vgc_respuesta);
	}

	if($vgc_boton=='enviar')
	{
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->enviar_planilla();
		echo json_encode($vgc_respuesta);
	}

?>