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
		<div class= "container">
			<!-- Código de Proveedor oculto -->
			<input type="hidden" name="proveedor_oculto" id="proveedor_oculto" value="<?php echo $_SESSION['vgc_codigo']; ?>">
			<div class="panel panel-primary">
				<div class="panel-heading"></div>
					<div class="panel-body">

						<div class="form-group">
		        	        <a href="http://app.hmetro.med.ec/honorarios/prealta" class="btn btn-info col-md-offset-5 col-xs-12 col-md-3"><span class="glyphicon glyphicon-user"> </span> Ingresar Pre-Alta</a><br><br>
		        	        <a href="http://app.hmetro.med.ec/honorarios/pagos_mes" class="btn btn-default col-xs-12 col-md-offset-5 col-md-3"><span class="glyphicon glyphicon-usd"></span> Consultar Honorarios</a>
		        	    </div>
					</div>	
				</div>
			</div>
		</div>

		<!-- Siempre antess del body -->	
		<script src="plugins/jquery/jquery-3.1.1.min.js"></script>
		<script src="plugins/bootstrap/js/bootstrap.min.js"></script>
	</body>

</html>