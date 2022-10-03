<?php
	require_once("../../modelo/facturas_buscar/facturas_buscar.php");
	$vgc_boton= $_POST['boton'];

	
	if($vgc_boton=='buscar')
	{
		$vgc_paciente= $_POST['paciente'];
		$vgc_paciente= str_replace(" ", "%", $vgc_paciente);
		$vgn_factura= $_POST['factura'];
		$vgn_proveedor= $_POST['proveedor'];
		$vgc_instancia = new facturas();
		$vgc_respuesta=$vgc_instancia ->listar_facturas($vgc_paciente,$vgn_factura,$vgn_proveedor);
		echo json_encode($vgc_respuesta);
	}

?>