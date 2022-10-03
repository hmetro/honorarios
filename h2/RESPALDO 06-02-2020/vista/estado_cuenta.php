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
			<div class="panel" id="panel_buscar">
				<div class="panel-heading" id="panel_heading_buscar"><b>Estado de Cuenta</b></div>
					<div class="panel-body">
						<div class="row form-horizontal">
							<div class="form-group">
								<input type="hidden" name="proveedor_oculto" id="proveedor_oculto" value="<?php echo $_SESSION['vgc_codigo']; ?>">
								<label for="nombre" class="col-xs-offset-2 control-label col-xs-3 control-label col-md-4"><span id="campo_vacio_crear_empresa"></span> Desde:</label>
								<div class="col-xs-5 col-md-2">	
									<input type="date" class="form-control" name="desde_fecha" id="desde_fecha">
								</div>
							</div>

							<div class="form-group" id="error_direccion_empresa_crear">
								<label for="ruc" class="col-xs-offset-2 control-label col-xs-3 col-md-4"><span id="campo_vacio_crear_empresa"></span> Hasta:</label>	
								<div class="col-xs-5 col-md-2">
									<input type="date" class="form-control" name="hasta_fecha" id="hasta_fecha">
								</div>
							</div>
							<div class="form-group">	
								<div class="col-xs-offset-5 col-md-5 col-md-offset-6">

									<button type="button" class="btn btn-default col-md-4 col-xs-8" onclick="ruta_imprimir_pdf()" id="boton_buscar"><span class="glyphicon glyphicon-floppy-save"></span> Descargar</button>
								</div>
							</div>
						</div>					
					</div>	
				</div>
			</div>	
		</div>	
			
		<!-- Siempre antess del body -->
		<script src="plugins/jquery/jquery-3.1.1.min.js"></script>
		<script src="plugins/bootstrap/js/bootstrap.min.js"></script>		
		<script src="librerias/pagos_mes/estado_cuenta.js"></script>
	</body>

</html>