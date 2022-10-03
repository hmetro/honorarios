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
			<div class="modal fade" id="enviar_planilla">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Generación de planilla de pago</h4>
					</div>

					<div class="modal-body">
						<div id="light_modal_planilla" class="preloader_modal">
       						<center>  
       							<p><b>Procesando...</b></p>
       							<img src="vista/imagen/66.gif">
       						</center>    
    					</div>
    					
						<div class="row form-horizontal">
							<div class="form-group">
								<div align="center" id="txt_planilla"><h4>Planilla de pago enviada correctamente</h4></div>
							</div>
							<div class="form-group">
								<label for="nombre" class="col-xs-offset-2 control-label col-xs-2 control-label col-md-3"><span id="campo_vacio_crear_empresa"></span> Año:</label>
								<div class="col-xs-5 col-md-2">	
									<select class="selectpicker form-control" name="select_anio_planilla">
										<option value='<?php echo date("Y"); ?>' selected><?php echo date("Y"); ?></option>
									</select>
								</div>
							</div>

							<div class="form-group" id="error_direccion_empresa_crear">
								<label for="ruc" class="col-xs-offset-2 control-label col-xs-2 col-md-3"><span id="campo_vacio_crear_empresa"></span> Mes:</label>	
								<div class="col-xs-5 col-md-2">
									<select name="select_mes" id="select_mes_planilla" class="selectpicker form-control">
										<option value="01">Enero</option>
										<option value="02">Febrero</option>
										<option value="03">Marzo</option>
										<option value="04">Abril</option>
										<option value="05">Mayo</option>
										<option value="06">Junio</option>
										<option value="07">Julio</option>
										<option value="08">Agosto</option>
										<option value="09">Septiembre</option>
										<option value="10">Octubre</option>
										<option value="11">Noviembre</option>
										<option value="12">Diciembre</option>
									</select>
								</div>
							</div>
							<div class="form-group">	
								<div class="col-xs-offset-4 col-md-5 col-md-offset-5">
									<button type="button" class="btn btn-default" onclick="enviar_planilla()" id="btn_enviar_planilla"><span class="glyphicon glyphicon-send"></span> Enviar</button>
								</div>
							</div>
						</div>
					</div>				
					<div class="modal-footer">  
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    </div>				
				</div>
			</div>
		</div>	
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