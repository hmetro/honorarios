<?php
	require_once("../../modelo/pagos_mes/planillas_pago.php");

		$vgc_proveedor= $_GET["vgc_proveedor"];
		$vgc_fecha_transaccion= $_GET["vgc_fecha_transaccion"];
		$vgn_numero_transaccion= $_GET["vgn_numero_transaccion"];
		$vgc_instancia_planillas = new planillas_pago();

		$vgc_array_transaccion=$vgc_instancia_planillas ->validar_transaccion($vgc_proveedor,$vgn_numero_transaccion);
		$vgc_tipo_transaccion= $vgc_array_transaccion[0][0];

		$vgc_array_numero_referencia=$vgc_instancia_planillas ->consultar_numero_referencia($vgc_proveedor,$vgn_numero_transaccion);
		$vgn_conteo_array_referencia = count($vgc_array_numero_referencia);
		
		$vgn_conteo_array_referencia_f = $vgn_conteo_array_referencia - 1;

		for ($i=0; $i < $vgn_conteo_array_referencia; $i++) 
		{ 
			if ($vgn_conteo_array_referencia_f == 0) 
			{
				$vgc_numero_referencia = "'".$vgc_array_numero_referencia[$i][0]."'";
			
			}else if ($vgn_conteo_array_referencia_f > 0) {
			
				if ($i == 0) 
				{
					$vgc_numero_referencia = "'".$vgc_array_numero_referencia[$i][0]."',";
				
				}elseif ($vgn_conteo_array_referencia_f == $i) 
				{
					$vgc_numero_referencia = $vgc_numero_referencia."'".$vgc_array_numero_referencia[$i][0]."'";
				
				}elseif ($i > 0) 
				{
					$vgc_numero_referencia =$vgc_numero_referencia. "'".$vgc_array_numero_referencia[$i][0]."',";
				}
			}
		}

		$vgc_array_transaccion_fm=$vgc_instancia_planillas ->consultar_transaccion_fm($vgc_proveedor,$vgc_fecha_transaccion,$vgn_numero_transaccion);
		$vgn_conteo_array_transaccion_fm = count($vgc_array_transaccion_fm);		
		

		$vgn_conteo_array_transaccion_fm_c = $vgn_conteo_array_transaccion_fm - 1;

		for ($e=0; $e < $vgn_conteo_array_transaccion_fm; $e++) 
		{ 
			if ($vgn_conteo_array_transaccion_fm_c == 0) 
			{
				$vgc_transaccion_fm = "'".$vgc_array_transaccion_fm[$e][6]."'";
			
			}else if ($vgn_conteo_array_transaccion_fm_c > 0) {
			
				if ($e == 0) 
				{
					$vgc_transaccion_fm = "'".$vgc_array_transaccion_fm[$e][6]."',";
				
				}elseif ($vgn_conteo_array_transaccion_fm_c == $e) 
				{
					$vgc_transaccion_fm = $vgc_transaccion_fm."'".$vgc_array_transaccion_fm[$e][6]."'";
				
				}elseif ($e > 0) 
				{
					$vgc_transaccion_fm =$vgc_transaccion_fm. "'".$vgc_array_transaccion_fm[$e][6]."',";
				}
			}
		}

		if ($vgc_tipo_transaccion =="PH") 
		{
		
			$facturas_planilla=$vgc_instancia_planillas ->facturas_planilla($vgc_proveedor,$vgc_fecha_transaccion,$vgn_numero_transaccion);
			$total_facturas_planilla=$vgc_instancia_planillas ->total_facturas_planilla($vgc_proveedor,$vgc_numero_referencia);
			$copagos_planilla=$vgc_instancia_planillas ->copagos_planilla($vgc_numero_referencia);
			$anticipos_planilla=$vgc_instancia_planillas ->anticipios_planilla($vgc_transaccion_fm,$vgc_fecha_transaccion);
			$retencion_planilla=$vgc_instancia_planillas ->retencion_anticipo_planilla($vgc_numero_referencia);
			$descuento_planilla=$vgc_instancia_planillas ->descuentos_planilla($vgc_proveedor,$vgc_numero_referencia);
			$formas_pago_planilla=$vgc_instancia_planillas ->formas_pago_planilla($vgc_proveedor,$vgc_numero_referencia);
			//$proximo_debito_planilla=$vgc_instancia_planillas ->proximo_debito_planilla($vgc_proveedor);

			/*$vgc_respuesta_3=$vgc_instancia ->imprimir_pdf_3($vgc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta);
			$vgc_respuesta_total_3 = $vgc_respuesta_3;*/
	
			$vgc_respuesta_global = $facturas_planilla.$total_facturas_planilla.$copagos_planilla.$anticipos_planilla.$retencion_planilla.$descuento_planilla.$formas_pago_planilla;
	
			echo $vgc_respuesta_global;
		
		}else{

			$cabecera_comprobante=$vgc_instancia_planillas ->cabecera_comprobante($vgn_numero_transaccion);
			$detalle_comprobante=$vgc_instancia_planillas ->detalle_comprobante($vgc_proveedor,$vgn_numero_transaccion);
	
			$vgc_respuesta_global = $cabecera_comprobante.$detalle_comprobante;
	
			echo $vgc_respuesta_global;			
		}
?>
