<?php
	session_start(); 
	require_once("../../modelo/sesion/sesion.php");
	require_once("../../config/config.php");			
		//$vgc_url = $_SERVER['HTTP_REFERER'];
		
		$vgc_codigo_recibir = $_GET['246abed3d0b2648a642f52952e60c3e26117a85a'];
		$vgc_codigo= filter_var($vgc_codigo_recibir, FILTER_SANITIZE_NUMBER_INT);

		$posicion_coincidencia = strpos($vgc_url, 'http://app.hmetro.med.ec');
		$posicion_coincidencia_2 = strpos($vgc_url, 'http://phplaravel-207760-645621.cloudwaysapps.com');
		$posicion_coincidencia_3 = strpos($vgc_url, 'https://hospitalmetropolitano.org');

		if(!empty($vgc_codigo))
		{
			
			if(strlen($vgc_codigo_recibir)<8)
			{
				//if($posicion_coincidencia===false and $posicion_coincidencia_2===false and $posicion_coincidencia_3===false)
				//{
				//	header('Location: https://www.hospistalmetropolitano.org?error='.$posicion_coincidencia_3);
				
				//}else
				//{
					$vgc_instancia=new sesion();
	
					$vgc_respuesta=$vgc_instancia-> listar_nombre($vgc_codigo);
					$vgc_array =json_encode($vgc_respuesta);
				
					if($vgc_array=='null'){
						header('Location: http://'.$vlc_dominio.'/'.$vlc_proyecto.'/login');
					}else
					{
						$vgc_nombre=substr($vgc_array, 1, -1);
						$_SESSION['vgc_nombre']= $vgc_nombre;
						$_SESSION['vgc_autentificado']='SI';
						$_SESSION['vgc_codigo']=$vgc_codigo;
						
						$vlc_tipo_dispositivo = 'M';
						$vlc_ip=gethostbyaddr($_SERVER['REMOTE_ADDR']);
						$vgc_instancia-> guardar_sesion($vgc_codigo,$vlc_ip,$vlc_tipo_dispositivo);
						header('Location: http://'.$vlc_dominio.'/'.$vlc_proyecto.'/pagos_mes');
					}
				//}	
			}else
			{
				header('Location: https://www.hospitalmetropolitano.org');
			}	

		}else
		{
			header('Location: https://www.hospitalmetropolitano.org');		
		}
			

?>