<?php
	session_start(); 
	require_once("../../modelo/sesion/sesion.php");		
		//$vgc_url = $_SERVER['HTTP_REFERER'];

	$handle = fopen('php://input','r');
	$jsonInput = fgets($handle);
	$post = json_decode($jsonInput,true);


		if (!empty($_REQUEST['ea64e6566bed138fbf2f05138529c762796d084a'])) 
		{
			$vgc_tipo_consulta = $_REQUEST['ea64e6566bed138fbf2f05138529c762796d084a'];
		}else{
			$vgc_tipo_consulta = $post['ea64e6566bed138fbf2f05138529c762796d084a'];
		}

		

		if ($vgc_tipo_consulta=="validar_sesion") 
		{
			$vgc_codigo_recibir = $post['f8d8d9902776c54006f41ef59e296da398584c84'];
			$vgc_codigo= filter_var($vgc_codigo_recibir, FILTER_SANITIZE_NUMBER_INT);

			$vgc_clave_recibir = $post['2d642a067a03151b4603f26844f630722624b173'];
			$vgc_clave= filter_var($vgc_clave_recibir, FILTER_SANITIZE_NUMBER_INT);		

			$vgc_codigo = str_pad($vgc_codigo, 6, "0", STR_PAD_LEFT);

			if(!empty($vgc_codigo) and !empty($vgc_clave))
			{	
				if(strlen($vgc_codigo)<=6 and strlen($vgc_clave)<15)
				{
					$vgc_instancia=new sesion();

					$vgc_respuesta=$vgc_instancia-> validar_sesion_telefono($vgc_codigo,$vgc_clave);
					$vgc_array =json_encode($vgc_respuesta);
				
					if($vgc_array=='[]'){

						$array_error = array( 0 => array ('error' => 'Código o clave incorrecta') );
						echo json_encode($array_error);

					}else
					{
						echo json_encode($vgc_respuesta);
					}
				}else
				{
					$array_error = array( 0 => array ('error' => 'Excede maximo de caracteres') );
					echo json_encode($array_error);
					exit();
				}	

			}else
			{
				$array_error = array( 0 => array ('error' => 'LLene todos los campos') );
				echo json_encode($array_error);
				exit();			
			}

		}else if ($vgc_tipo_consulta=="confimar_sesion") 
		{
			

			if ( !empty($_REQUEST['f8d8d9902776c54006f41ef59e296da398584c84'])) 
			{
				$vgc_codigo_recibir = $_REQUEST['f8d8d9902776c54006f41ef59e296da398584c84'];

			}else{

				$vgc_codigo_recibir = $post['f8d8d9902776c54006f41ef59e296da398584c84'];
			}

			$vgc_codigo= filter_var($vgc_codigo_recibir, FILTER_SANITIZE_NUMBER_INT);

			$vgc_codigo = str_pad($vgc_codigo, 6, "0", STR_PAD_LEFT);

			if (strlen($vgc_codigo)<=6 and !empty($vgc_codigo)) 
			{
				$vgc_instancia=new sesion();
				$vgc_respuesta=$vgc_instancia-> listar_nombre($vgc_codigo);

				$vgc_array =json_encode($vgc_respuesta);
				$vgc_nombre=substr($vgc_array, 1, -1);
				$_SESSION['vgc_nombre']= $vgc_nombre;
				$_SESSION['vgc_autentificado']='SI';
				$_SESSION['vgc_codigo']= $vgc_codigo;
			
				$vlc_ip=gethostbyaddr($_SERVER['REMOTE_ADDR']);
				$vgc_instancia-> guardar_sesion($vgc_codigo,$vlc_ip,"C");
				header('Location: http://app.hmetro.med.ec/honorarios/inicio');
		
			}else{
				header('Location: http://app.hmetro.med.ec/honorarios/login');
			}

		}else if ($vgc_tipo_consulta=="recuperar_clave") 
		{
			if ( !empty($_REQUEST['f8d8d9902776c54006f41ef59e296da398584c84'])) 
			{
				$vgc_codigo_recibir = $_REQUEST['f8d8d9902776c54006f41ef59e296da398584c84'];

			}else{

				$vgc_codigo_recibir = $post['f8d8d9902776c54006f41ef59e296da398584c84'];
			}

			$vgc_codigo= filter_var($vgc_codigo_recibir, FILTER_SANITIZE_NUMBER_INT);

			$vgc_codigo = str_pad($vgc_codigo, 6, "0", STR_PAD_LEFT);

			if(!empty($vgc_codigo))
			{
					$vgc_instancia=new sesion();

					$vgc_respuesta=$vgc_instancia-> validar_correo($vgc_codigo);
					$vgc_array =json_encode($vgc_respuesta);
					$vgc_correo=substr($vgc_array, 1, -1);

					if($vgc_array=='null'){

						$array_error = array( 0 => array ('error' => 'No dispone de un correo registrado') );
						echo json_encode($array_error);	

					}else
					{
						$vgc_respuesta_clave=$vgc_instancia-> listar_clave($vgc_codigo);
						$vgc_array_clave =json_encode($vgc_respuesta_clave);
						$vgc_clave=substr($vgc_array_clave, 1, -1);
						$vgc_respuesta_nombre=$vgc_instancia-> listar_nombre($vgc_codigo);
						$vgc_array_nombre =json_encode($vgc_respuesta_nombre);
						$vgc_nombre=substr($vgc_array_nombre, 1, -1);						
						require_once('../../plugins/phpmailer/class.phpmailer.php');

						$correo = new PHPMailer();
		
						$correo->IsSMTP();
					 
						//$correo->SMTPAuth = true;
					 
						//$correo->SMTPSecure = 'tls';
					 
						$correo->Host = 'hmetro-med-ec.mail.protection.outlook.com';
					 
						$correo->Port = 25;
					 
						$correo->Username   = "cuentasporpagar@hmetro.med.ec";
					 
						//$correo->Password   = "mcxp100";
					 
						$correo->SetFrom("cuentasporpagar@hmetro.med.ec", "Cuentas por Pagar");
					 
						$correo->AddReplyTo("cuentasporpagar@hmetro.med.ec","Cuentas por Pagar");
						 //Destinatario
						$correo->AddAddress($vgc_correo,"Honorarios Medicos");
						//otros destinatarios
						//$correo->AddCC("jpasuy@hmetro.med.ec"); 
						 //Asunto
						$correo->Subject = "Clave de Acceso APP Celular";
						 //Mensaje
						$correo->MsgHTML("
						<p>-------------------------------------------------------------------------------------------------------</p>
						<p>Estimado(a) ".$vgc_nombre.", </p>
						<p>La contrase&ntilde;a registrada en el sistema es:  ".$vgc_clave.".</p>
						<p>Si existe alg&uacute;n inconveniente, por favor comun&iacute;quese con nuestro asistente de Cuentas por Pagar al 3998000 extensi&oacute;n 2004.</p>
						<p>Gracias por utilizar nuestro servicio de Consulta de Pagos M&oacute;vil.</p>
						<p>Saludos cordiales,</p>
						<p><b>Cuentas por Pagar</b></p>
						<p><b>Hospital Metropolitano</b></p>
						<p>--------------------------------------------------------------------------------------------------------</p>
						");
					 
						//$correo->AddAttachment("images/phpmailer.gif");
						 
						if(!$correo->Send()) 
						{
							$array_error = array( 0 => array ('error' => "Hubo un error: " . $correo->ErrorInfo) );
							echo json_encode($array_error);
						} else 
						{
							$array_correcto = array( 0 => array ('correcto' => 'La clave se envió a su correo correctamente') );
							echo json_encode($array_correcto);
						}

					}
			}else
			{
				$array_error = array( 0 => array ('error' => 'LLene todos los campos') );
				echo json_encode($array_error);	
			}
		}
				
?>