<?php
	require_once("../../modelo/facturas_pendientes/facturas_pendientes.php");
	$vgc_boton= $_POST['boton'];

	
	if($vgc_boton=='buscar')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgc_instancia = new facturas();
		$vgc_respuesta=$vgc_instancia ->lista_facturas_pendientes($vgn_proveedor);
		echo json_encode($vgc_respuesta);
	}

?>