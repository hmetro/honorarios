<?php
	require_once("../../modelo/pagos_mes/pagos_mes.php");
	$vgc_boton= $_POST['boton'];

	
	if($vgc_boton=='buscar')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vlc_fecha_desde= $_POST['fecha_desde'];
		$vlc_fecha_hasta= $_POST['fecha_hasta'];
    	$vlc_fecha_desde=date('d-M-Y' ,strtotime($vlc_fecha_desde));
    	$vlc_fecha_hasta=date('d-M-Y' ,strtotime($vlc_fecha_hasta));
		$vgc_tipo_busqueda= $_POST['tipo_busqueda'];
		$vgc_forma_busqueda = $_POST['forma_busqueda'];

		if ($vgc_forma_busqueda=="FECHA") 
		{
			$vgc_instancia = new honorarios();

			if ($vlc_fecha_desde>='01-01-2017') 
			{
				if($vgc_tipo_busqueda=="simple")
				{
					$vgc_respuesta=$vgc_instancia ->lista_pagos_mes($vgn_proveedor,$vlc_fecha_desde,$vlc_fecha_hasta);
					echo json_encode($vgc_respuesta);
				
				}elseif ($vgc_tipo_busqueda=="total") 
				{
					$vgc_respuesta=$vgc_instancia ->lista_pagos_total($vgn_proveedor);
					echo json_encode($vgc_respuesta);
				}
			}else
			{
				echo "fecha_error";
			}	

		}else if ($vgc_forma_busqueda=="PACIENTE") 
		{
			$vgc_instancia = new honorarios();
			$vgc_paciente = $_POST['paciente'];

			$vgc_respuesta=$vgc_instancia ->lista_pagos_paciente($vgn_proveedor,$vgc_paciente);
			echo json_encode($vgc_respuesta);

		}else if ($vgc_forma_busqueda=="FACTURA") 
		{
			$vgc_instancia = new honorarios();
			$vgc_factura = $_POST['factura'];

			$vgc_respuesta=$vgc_instancia ->lista_pagos_factura($vgn_proveedor,$vgn_factura);
			echo json_encode($vgc_respuesta);			
		}

	}

	if($vgc_boton=='buscar_anio')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgn_anio= $_POST['anio'];
		$vgc_tipo_busqueda= $_POST['tipo_busqueda'];

		$vgc_instancia = new honorarios();

		if($vgc_tipo_busqueda=="simple")
		{
			$vgc_respuesta=$vgc_instancia ->lista_pagos_anio($vgn_proveedor,$vgn_anio);
			echo json_encode($vgc_respuesta);
		}elseif ($vgc_tipo_busqueda=="total") 
		{
			$vgc_respuesta=$vgc_instancia ->lista_pagos_total($vgn_proveedor);
			echo json_encode($vgc_respuesta);
		}	


	}	

	if($vgc_boton=='ver')
	{
		$vgc_proveedor=$_POST['proveedor'];
		$vgc_fecha=$_POST['fecha'];
		$vgc_transaccion=$_POST['transaccion'];
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->lista_factura_detalle($vgc_proveedor,$vgc_fecha,$vgc_transaccion);
		echo json_encode($vgc_respuesta);

	}

	if($vgc_boton=='subtotal')
	{
		$vgc_transaccion=$_POST['transaccion'];
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->lista_subtotal($vgc_transaccion);
		echo json_encode($vgc_respuesta);

	}

	if($vgc_boton=='ver_total')
	{
		$vgc_proveedor=$_POST['proveedor'];
		$vgc_fecha=$_POST['fecha'];
		$vgc_transaccion=$_POST['transaccion'];
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->factura_detalle_total($vgc_proveedor,$vgc_fecha,$vgc_transaccion);
		echo json_encode($vgc_respuesta);

	}

	if($vgc_boton=='enviar')
	{
		$vgc_instancia = new honorarios();
		$vgc_respuesta=$vgc_instancia ->enviar_planilla();
		echo json_encode($vgc_respuesta);
	}


?>