<?php
	session_start();
	function comprobar_sesion()
		{ 		
			if(!empty($_SESSION['vgc_codigo']) and $_SESSION['vgc_autentificado']=='SI'){

			}else{
				header("Location: login");
				exit();
			}

		}
?>
