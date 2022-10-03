<?php
	require_once("../controlador/sesion/comprobar_sesion.php");
	comprobar_sesion();
?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0 maximun-scale=1.0, minimum-scale=1.0">
		<link rel="shortcut icon" type="imagen/x-icon" href="imagen/logo.ico"/>
		<title>Hospital Metropolitano</title>
	</head>
	<body onload="lista_facturas_pendientes(
			'<?php echo $_SESSION['vgc_codigo']; ?>');">
		<div class= "container">

<?php  
	require_once("header/header.php");
?>			
			<!-- Código de Proveedor oculto -->
			<input type="hidden" name="proveedor_oculto" id="proveedor_oculto" value="<?php echo $_SESSION['vgc_codigo']; ?>">
			<div class="panel panel-primary">
				<div class="panel-heading"><b>Facturas pendientes</b></div>
					<div class="panel-body">
						<div id="factura_vacia_txt" align="center">
							<h4>Al momento no tiene facturas pendientes</h4>
						</div>
						<div class="form-group">
		        	        <div id="lista"></div>
						</div>
					</div>	
				</div>
			</div>
		</div>

		<!-- Siempre antess del body -->	
		<script src="plugins/jquery/jquery-3.1.1.min.js"></script>
		<script src="plugins/bootstrap/js/bootstrap.min.js"></script>
		<script src="librerias/facturas_pendientes/facturas_pendientes.js"></script>
		<script src="librerias/pagos_mes/pagos_mes.js"></script>
		<script src="librerias/pagos_mes/usuario.js"></script>
	</body>

</html>