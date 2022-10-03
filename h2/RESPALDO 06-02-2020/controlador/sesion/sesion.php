<?php
	session_start(); 
	require_once("../../modelo/sesion/sesion.php");		

		$vgc_boton=$_POST['boton'];

		if($vgc_boton=='ingresar_sistema')
		{
			$vgc_codigo=$_POST['codigo'];	
			$vgc_codigo = str_pad($vgc_codigo, 6, "0", STR_PAD_LEFT);
			$vgc_contrasena=$_POST['contrasena'];

			if(!empty($vgc_codigo) and !empty($_POST['contrasena']))
			{
				
				if(strlen($vgc_codigo)<11 and strlen($vgc_contrasena)<15)
				{
					$vgc_instancia=new sesion();
	
					$vgc_respuesta=$vgc_instancia-> validar_sesion($vgc_codigo,$vgc_contrasena);
					$vgc_array =json_encode($vgc_respuesta);
				
					if($vgc_array=='null'){
						echo "contraseña incorrecta";
					}else
					{
						echo "sesion_correcta";
						$vgc_nombre=substr($vgc_array, 1, -1);
						$_SESSION['vgc_nombre']= $vgc_nombre;
						$_SESSION['vgc_autentificado']='SI';
						$_SESSION['vgc_codigo']= $vgc_codigo;
						
						$vlc_tipo_dispositivo = $_POST['tipo_dispositivo'];
						$vlc_ip=gethostbyaddr($_SERVER['REMOTE_ADDR']);

						$vgc_instancia-> guardar_sesion($vgc_codigo,$vlc_ip,$vlc_tipo_dispositivo);
					}
				}else
				{
					exit();
				}	
	
			}else
			{
				exit();			
			}
		}	


		if($vgc_boton=='enviar_peticion')
		{
			$vgc_codigo=$_POST['codigo'];

			if(!empty($vgc_codigo))
			{
					$vgc_instancia=new sesion();
	
					$vgc_respuesta=$vgc_instancia-> validar_correo($vgc_codigo);
					$vgc_array =json_encode($vgc_respuesta);
					$vgc_correo=substr($vgc_array, 1, -1);

					if($vgc_array=='null'){
						echo "correo_incorrecto";
					}else
					{
						$vgc_respuesta_clave=$vgc_instancia-> listar_clave($vgc_codigo);
						$vgc_array_clave =json_encode($vgc_respuesta_clave);
						$vgc_clave=substr($vgc_array_clave, 1, -1);

						$vgc_respuesta_nombre=$vgc_instancia-> listar_nombre($vgc_codigo);
						$vgc_array_nombre =json_encode($vgc_respuesta_nombre);
						$vgc_nombre=substr($vgc_array_nombre, 1, -1);						

						require_once('../../plugins/phpmailer/class.phpmailer.php');
						echo "correo_correcto";

						$correo = new PHPMailer();
		 
						$correo->IsSMTP();
						 
						$correo->SMTPAuth = true;
						 
						//$correo->SMTPSecure = 'tls';
						 
						$correo->Host = '172.16.2.20';
						 
						$correo->Port = 25;
						 
						$correo->Username   = "cuentasporpagar@hmetro.med.ec";
						 
						$correo->Password   = "mcxp100";
						 
						$correo->SetFrom("cuentasporpagar@hmetro.med.ec", "Cuentas por Pagar");
						 
						$correo->AddReplyTo("cuentasporpagar@hmetro.med.ec","Cuentas por Pagar");
						 //Destinatario
						$correo->AddAddress($vgc_correo,"Honorarios Medicos");
						//otros destinatarios
						$correo->AddCC("jpasuy@hmetro.med.ec"); 
						 //Asunto
						$correo->Subject = "Clave de Acceso APP Celular";
						 //Mensaje
						$correo->MsgHTML("
							<p>-------------------------------------------------------------------------------------------------------</p>
							<p>Estimado(a) ".$vgc_nombre.", </p>
							<p>La contrase&ntilde;a registrada en el sistema es:  ".$vgc_clave.".</p>
							<p>Si existe alg&uacute;n inconveniente, por favor comun&iacute;quese con nuestro asistente de Cuentas por Pagar al 3998 000 extensi&oacute;n 2004.</p>
							<p>Gracias por utilizar nuestro servicio de Consulta de Pagos M&oacute;vil.</p>
							<p>Saludos cordiales,</p>
							<p><b>Cuentas por Pagar</b></p>
							<p><b>Hospital Metropolitano</b></p>
							<p>--------------------------------------------------------------------------------------------------------</p>
							");
						 
						//$correo->AddAttachment("images/phpmailer.gif");
						 
						if(!$correo->Send()) 
						{
							echo "Hubo un error: " . $correo->ErrorInfo;
							exit();
						} else 
						{

						}
	
					}
			}else
			{
				echo "campo_vacio";
				exit();			
			}
		}	
?>
