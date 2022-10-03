<?php
	require_once("../controlador/sesion/comprobar_sesion.php");
	comprobar_sesion();
?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0 maximun-scale=1.0, minimum-scale=1.0">
		<link rel="shortcut icon" type="image/x-icon" href="imagen/logo.ico" />
		<title>Hospital Metropolitano</title>
	</head>
	<body>
	
<?php  
	require_once("header/header.php");
?>
		<div class= "container-fluid">
			<img src="vista/imagen/inicio_medico_grande.jpg" class="img_bienvenida">
		</div>
		<div class= "">
			<img src="vista/imagen/doctor.jpg" class="img_bienvenida_doctor">
		</div>
		<div class="fondo_bienvenido">
			<img src="vista/imagen/fondo_degradado.jpg" class="fondo_bienvenido">
		</div>

		<a href="http://app.hmetro.med.ec/honorarios/pagos_mes">
			<div >
				<img class="icono_pago" src="vista/imagen/pago.png">
				<h4 class="icono_texto_pago">FACTURAS PAGADAS</h4>
			</div>
		</a>

		<a href="http://app.hmetro.med.ec/honorarios/prealta">
			<div >
				<img class="icono_prealta" src="vista/imagen/paciente.png">
				<h4 class="icono_texto_prealta">INGRESAR PRE-ALTA</h4>
			</div>
		</a>
		<!-- Siempre antess del body -->	
	</body>
	<script src="plugins/bootstrap/js/bootstrap.min.js"></script>
</html>