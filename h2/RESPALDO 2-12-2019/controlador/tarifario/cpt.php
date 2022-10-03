<?php
	require_once("../../modelo/tarifario/cpt.php");
	$vgc_boton= $_POST['boton'];

	
	if($vgc_boton=='buscar')
	{
		$vgn_codigo= $_POST['codigo'];
		$vgc_descripcion= $_POST['descripcion'];
		$vgc_instancia = new honorarios();

		$vgc_respuesta=$vgc_instancia ->lista_cpt($vgn_codigo,$vgc_descripcion);
		echo json_encode($vgc_respuesta);
	}

	if($vgc_boton=='enviar')
	{
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->enviar_planilla();
		echo json_encode($vgc_respuesta);
	}


?>