<?php
	require_once("../../modelo/prealta/prealta.php");
	require_once("enviarsms.php");
	require_once("../../plugins/nusoap/src/nusoap.php");

	$vgc_boton= $_POST['boton'];

	if($vgc_boton=='listar')
	{
		$vgc_instancia = new prealta();
		$vgn_proveedor= $_POST['proveedor'];

		if (!empty($vgn_proveedor)) 
		{
			$vgc_respuesta=$vgc_instancia ->lista_pacientes($vgn_proveedor);
			echo json_encode($vgc_respuesta);
		}

	}

	if($vgc_boton=='busqueda_codigos_cpt')
	{
		$vgc_instancia = new prealta();
		$vgc_detalle= $_POST['detalle'];
		$vgc_codigo= $_POST['codigo'];

		$vgc_respuesta=$vgc_instancia ->busqueda_codigos_cpt($vgc_codigo,$vgc_detalle);
		echo json_encode($vgc_respuesta);
	}

	if($vgc_boton=='enviar_mensaje')
	{

		$vln_historia_clinica = $_POST['historia_clinica'];
		$vlc_nombre_paciente = $_POST['nombre_paciente'];
		$vlc_habitacion = $_POST['habitacion'];
		$vlc_fecha_prealta = $_POST['fecha_prealta'];
		$vlc_hora_prealta = $_POST['hora_prealta'];
		$vln_admision = $_POST['admision'];
		$vlc_fecha_hoy = date("m/d/Y");

		$vlc_mensaje = "Estimado(a), Paciente ".$vlc_nombre_paciente." H.CL ".$vln_historia_clinica." Hab. ".$vlc_habitacion." con posible alta ".$vlc_fecha_prealta." a las ".$vlc_hora_prealta." "."Hospital Metropolitano" ;

		$vgc_instancia = new prealta();
		$vgc_respuesta_terminal=$vgc_instancia ->listar_terminales();
		$vgc_respuesta_celular=$vgc_instancia ->listar_celulares($vln_admision,$vln_historia_clinica);
		
		$vgc_contar_array_terminal = count($vgc_respuesta_terminal);
		$vgc_contar_array_terminal = $vgc_contar_array_terminal -1;

		$vgc_contar_array_celular = count($vgc_respuesta_celular);
		$vgc_contar_array_celular = $vgc_contar_array_celular -1;

		for ($i = 0; $i <= $vgc_contar_array_terminal; $i++) 
		{	
			if ($i==$vgc_contar_array_terminal) 
			{
				$vlc_terminales = $vlc_terminal.$vgc_respuesta_terminal[$i][0];
			
			}else{

				$vlc_terminal .= $vgc_respuesta_terminal[$i][0].",";
			}
		}

		/*$url = "http://172.16.2.30:8082/GemaWebServicesJboss-web/rest/Mensajeria/enviarMensajeUsuarios";
		   
		$content = json_encode(array(
		    "nombrePaciente"  => $vlc_nombre_paciente,
		    "numeroHistoriaClinica"  => $vln_historia_clinica,
		    "numeroHabitacion"  => $vlc_habitacion,
		    "fechaPreAlta"  => $vlc_fecha_prealta,
		    "horaPreAlta"  => $vlc_hora_prealta,
		    ) );
		
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_HEADER, true);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HTTPHEADER,
		        array("Content-type: application/json"));
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
		
		$json_response = curl_exec($curl);
		
		$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);*/		

		$vlc_repuesta_envio = shell_exec('SENT /u:'.$vlc_terminales.' "'.$vlc_mensaje.'"');

		for ($e = 0; $e <= $vgc_contar_array_celular; $e++) { 
			
			enviarsms('contactosms', 'HOSPMET', 'admin', 'hosmt@csms', 'P', $vlc_fecha_hoy, '00:00', 'servidor', $vlc_mensaje,$vgc_respuesta_celular[$e][0]);
		}

		//shell_exec('SENT /u:gersis7 "'.$vlc_mensaje,$vgc_respuesta_celular[$e][0].'"'); probador de mensaje 

		$vgc_instancia->pro_envio_mensaje($vln_historia_clinica,$vln_admision,$vlc_fecha_prealta,$vlc_mensaje);
	}	

	if($vgc_boton=='busqueda_doctor')
	{
		$vgc_instancia = new prealta();
		$vlc_codigo_doctor= $_POST['codigo_doctor'];
		$vlc_nombre_doctor= $_POST['nombre_doctor'];
		$vlc_nombre_doctor= strtoupper($vlc_nombre_doctor);
		
		$vgc_respuesta=$vgc_instancia ->busqueda_doctor($vlc_codigo_doctor,$vlc_nombre_doctor);
		echo json_encode($vgc_respuesta);
	}		

	if($vgc_boton=='ingreso_fecha_prealta')
	{
		$vgn_admision= $_POST['numero_admision'];
		$vgn_historia_clinica= $_POST['historia_clinica'];
		$vlc_fecha_posible_alta = $_POST['fecha_posible_alta'];
		$vlc_hora_posible_alta = $_POST['hora_posible_alta'];
		$vlc_hora_fecha_posible_alta = $vlc_fecha_posible_alta." ".$vlc_hora_posible_alta;
		$vlc_fecha_hoy = date("Y-m-d");
		$nuevafecha = strtotime ( '+1 day' , strtotime ( $vlc_fecha_hoy ) ) ;
		$nuevafecha = date ( 'Y-m-d' , $nuevafecha );
		$vlc_hora_hoy = date("H:i:s");
		//$vlc_hora_hoy = strtotime ( '+12 hour' , strtotime ($vlc_hora_hoy) ) ;
		//$vlc_hora_hoy = date ( 'H:i' , $vlc_hora_hoy);
		$vlc_hoy_fecha_hora =$vlc_fecha_hoy." ".$vlc_hora_hoy;
		$vlc_hoy_fecha_hora = strtotime ( '+12 hour' , strtotime ($vlc_hoy_fecha_hora) ) ;
		$vlc_hoy_fecha_hora = date ( 'Y-m-d H:i' , $vlc_hoy_fecha_hora);
		$vgc_instancia = new prealta();

		if(!empty($vgn_admision) and !empty($vgn_historia_clinica) and !empty($vlc_fecha_posible_alta) and !empty($vlc_hora_posible_alta))
		{
			if ( $vlc_hora_fecha_posible_alta>=$vlc_hoy_fecha_hora) 
			{
				if($vgc_instancia->ingreso_fecha_prealta($vgn_admision, $vgn_historia_clinica,$vlc_hora_fecha_posible_alta))
				{
					echo "exito";
	
				}else{
					echo "error";
				}				
			}else
			{
				echo "fecha_error";
			}
			
		}else{
			echo "vacio";
		}
	}

	if($vgc_boton=='ingreso_codigo_cpt')
	{
		$vln_codigo_cpt= $_POST['codigo_cpt'];
		$vln_codigo_medico= $_POST['codigo_medico'];
		$vln_cantidad_cpt = $_POST['cantidad_cpt'];
		$vln_porcentaje_cpt = $_POST['porcentaje'];
		$vln_historia_clinica = $_POST['historia_clinica'];
		$vln_admision = $_POST['admision'];
		$vlc_fecha_posible = $_POST['fecha_cpt'];
		$vlc_fecha_posible = date('Y-m-d', strtotime($vlc_fecha_posible));
		$vlc_hoy = date("Y-m-d");
		$nuevafecha = strtotime ( '+1 day' , strtotime($vlc_hoy)) ;
		$nuevafecha = date ( 'Y-m-d' , $nuevafecha );
		$vln_codigo_medico_0 =(string)(int)$vln_codigo_cpt;

		$vgc_instancia = new prealta();

		if(!empty($vln_codigo_cpt) and !empty($vln_codigo_medico) and !empty($vln_cantidad_cpt) and !empty($vln_historia_clinica) and !empty($vln_admision and !empty($vlc_fecha_posible) and !empty($vln_porcentaje_cpt)))
		{
			if ( $vlc_fecha_posible >= $vlc_hoy and $vlc_fecha_posible<=$nuevafecha) 
			{

				if($vgc_instancia->ingreso_codigo_cpt($vln_codigo_cpt, $vln_codigo_medico,$vln_cantidad_cpt,$vln_codigo_medico_0,$vln_historia_clinica,$vln_admision,$vlc_fecha_posible,$vln_porcentaje_cpt))
				{
					echo "exito";
	
				}else{
					echo "error";
				}

			}else{
				echo "fecha_error";
			}				
		}else{
			echo "vacio";
		}
	}

	if($vgc_boton=='listar_codigos_cpt')
	{
		$vgc_instancia = new prealta();
		$vgn_proveedor= $_POST['codigo_medico'];
		$vgn_historia_clinica= $_POST['historia_clinica'];
		$vgn_admision= $_POST['admision'];

		if (!empty($vgn_proveedor) and !empty($vgn_historia_clinica) and !empty($vgn_admision)) 
		{
			$vgc_respuesta=$vgc_instancia ->listar_codigos_cpt($vgn_proveedor,$vgn_historia_clinica,$vgn_admision);
			echo json_encode($vgc_respuesta);
		}

	}

	if($vgc_boton=='remover_honorario')
	{
		$vgc_instancia = new prealta();
		$vgn_proveedor= $_POST['codigo_medico'];
		$vgn_historia_clinica= $_POST['historia_clinica'];
		$vgn_admision= $_POST['admision'];
		$vgn_codigo_cpt= $_POST['codigo_cpt'];
		$vgc_fecha_ingreso= $_POST['fecha_ingreso'];

		if (!empty($vgn_proveedor) and !empty($vgn_historia_clinica) and !empty($vgn_admision) and !empty($vgn_codigo_cpt) and !empty($vgc_fecha_ingreso)) 
		{
			$vgc_respuesta_honorario=$vgc_instancia ->consultar_honorario($vgn_proveedor,$vgn_historia_clinica,$vgn_admision,$vgn_codigo_cpt,$vgc_fecha_ingreso);

			if (empty($vgc_respuesta_honorario[0][0])) 
			{
				if ($vgc_instancia ->remover_honorario($vgn_proveedor,$vgn_historia_clinica,$vgn_admision,$vgn_codigo_cpt,$vgc_fecha_ingreso)) 
				{
					echo "exito";
	
				}else{
	
					echo "error";
				}

			}else{
				echo "honorario_procesado";
			}

		}else{

			echo "vacio";
		}

	}

	if($vgc_boton=='finalizar_atencion')
	{
		$vgc_instancia = new prealta();
		$vgn_proveedor= $_POST['codigo_medico'];
		$vgn_historia_clinica= $_POST['historia_clinica'];
		$vgn_admision= $_POST['numero_admision'];

		if (!empty($vgn_proveedor) and !empty($vgn_historia_clinica) and !empty($vgn_admision)) 
		{
			if($vgc_instancia->fecha_fin_atencion($vgn_proveedor, $vgn_admision,$vgn_historia_clinica))
			{
				echo "exito";

			}else
			{
				echo "error";
			}

		}else{
			echo "vacio";
		}

	}		

	if($vgc_boton=='transferir_responsabilidad')
	{
		$vgn_codigo_medico_anterior= $_POST['codigo_medico_anterior'];
		//$vgn_codigo_medico_anterior =(string)(int)$vgn_codigo_medico_anterior;
		$vgn_codigo_medico_nuevo= $_POST['codigo_medico_nuevo'];
		//$vgn_codigo_medico_nuevo =(string)(int)$vgn_codigo_medico_nuevo;
		$vgn_numero_admision= $_POST['numero_admision'];
		$vln_historia_clinica = $_POST['historia_clinica'];
		$vlc_hoy = date("Y-M-d H:i:s");

		$vgc_instancia = new prealta();

		if(!empty($vgn_codigo_medico_anterior) and !empty($vgn_codigo_medico_nuevo) and !empty($vgn_numero_admision) and !empty($vln_historia_clinica))
		{

			$vgc_respuesta=$vgc_instancia ->buscar_doctor_paciente($vgn_codigo_medico_anterior, $vln_historia_clinica, $vgn_numero_admision);

			if (empty($vgc_respuesta[0][0])) 
			{
				$vgc_estado_medico_anterior = 'N/R';
			
			}else if (!empty($vgc_respuesta[0][0])) 
			{
				$vgc_estado_medico_anterior = $vgc_respuesta[0][0];
			}

			if ($vgc_estado_medico_anterior =='A') 
			{
				if($vgc_instancia->transferir_responsabilidad_update_anterior($vgn_codigo_medico_anterior, $vgn_numero_admision,$vln_historia_clinica))
				{
					if($vgc_instancia->transferir_responsabilidad_insert($vgn_codigo_medico_anterior,$vgn_codigo_medico_nuevo, $vgn_numero_admision,$vln_historia_clinica,$vlc_hoy))
					{
						if($vgc_instancia->fecha_fin_atencion($vgn_codigo_medico_anterior, $vgn_numero_admision,$vln_historia_clinica))
						{
							echo "exito";
			
						}else
						{
							echo "error";
						}
			
					}else
					{
						echo "error";
					}
		
				}else
				{
					echo "error";
				}				

			}else if ($vgc_estado_medico_anterior =='N/R') 
			{
				if($vgc_instancia->transferir_responsabilidad_insert($vgn_codigo_medico_anterior,$vgn_codigo_medico_nuevo, $vgn_numero_admision,$vln_historia_clinica,$vlc_hoy))
				{
					if($vgc_instancia->fecha_fin_atencion($vgn_codigo_medico_anterior, $vgn_numero_admision,$vln_historia_clinica))
					{
						echo "exito";
		
					}else
					{
						echo "error";
					}
		
				}else
				{
					echo "error";
				}	
			}

		}else{
			echo "vacio";
		}
	}

?>