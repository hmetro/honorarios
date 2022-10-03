<?php
	require_once("../../modelo/pagos_mes/usuario.php");
	$vgc_boton= $_POST['boton'];

	
	if($vgc_boton=='generar')
	{
		$vgn_proveedor= $_POST['proveedor'];
		$vgc_instancia = new usuario();
		$vgc_respuesta=$vgc_instancia ->generar_clave($vgn_proveedor);

		$vgc_nueva_clave=$vgc_instancia ->listar_clave($vgn_proveedor);
		$vgc_array =json_encode($vgc_nueva_clave);
		$vgc_clave=substr($vgc_array, 1, -1);
		echo $vgc_array;

		$vgc_respuesta_nombre=$vgc_instancia-> listar_nombre($vgn_proveedor);
		$vgc_array_nombre =json_encode($vgc_respuesta_nombre);
		$vgc_nombre=substr($vgc_array_nombre, 1, -1);

		$vgc_respuesta_correo=$vgc_instancia-> listar_correo($vgn_proveedor);
		$vgc_array_correo =json_encode($vgc_respuesta_correo);
		$vgc_correo=substr($vgc_array_correo, 1, -1);						

		require_once('../../plugins/phpmailer/class.phpmailer.php');

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
		$correo->Subject = "Nueva Clave de Acceso APP Celular";
						 //Mensaje
		$correo->MsgHTML("
			<p>-------------------------------------------------------------------------------------------------------</p>
			<p>Estimado(a) ".$vgc_nombre.", </p>
			<p>Su nueva contrase&ntilde;a de acceso a la aplicaci&oacute;n m&oacute;vil es: ".$vgc_clave.".</p>
			<p>Si usted no solicit&oacute; el cambio o existe alg&uacute;n inconveniente, por favor comun&iacute;quese con nuestro asistente de Cuentas por Pagar al 3998 000 extensi&oacute;n 2004.</p>
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
		} else{ 
		
		}
		
	}

?>