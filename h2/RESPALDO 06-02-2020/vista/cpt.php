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
	<body onload="lista_cpt(
			'',
			'');">
<?php  
	require_once("header/header.php");
?>			
		<div class= "container">
			<!-- Código de Proveedor oculto -->
			<input type="hidden" name="proveedor_oculto" id="proveedor_oculto" value="<?php echo $_SESSION['vgc_codigo']; ?>">
			<div class="panel panel-primary">
				<div class="panel-heading"><b>Listado CPT</b></div>
					<div class="panel-body">
						<div id="pago_vacio_txt" align="center">
							<h4>No se encontro resultados de la busqueda</h4>
						</div>
						<div class="form-group">
		        	        <div id="lista"></div>
		        	    </div>
					</div>	
				</div>
			</div>
		</div>

		<div class= "container">
			<div class="panel" id="panel_buscar">
				<div class="panel-heading" id="panel_heading_buscar"><b>Consulta CPT</b></div>
					<div class="panel-body">
						<div class="row form-horizontal">
							<div class="form-group">
								<label for="nombre" class="col-xs-offset-2 control-label col-xs-3 control-label col-md-4"><span id="campo_vacio_crear_empresa"></span> Código:</label>
								<div class="col-xs-5 col-md-2">	
									<input type="number" class="form-control" name="codigo_cpt" id="codigo_cpt">
								</div>
							</div>

							<div class="form-group" id="error_direccion_empresa_crear">
								<label for="ruc" class="col-xs-offset-2 control-label col-xs-3 col-md-4"><span id="campo_vacio_crear_empresa"></span> Descripción:</label>	
								<div class="col-xs-5 col-md-2">
									<input type="text" class="form-control" name="descripcion_cpt" id="descripcion_cpt">
								</div>
							</div>
							<div class="form-group">	
								<div class="col-xs-offset-5 col-md-6 col-md-offset-6">
									<button type="button" class="btn btn-default col-md-4 col-xs-8" id="boton_buscar"><span class="glyphicon glyphicon-search"></span> Buscar</button>
								</div>
							</div>
						</div>						
					</div>	
				</div>
			</div>	
		</div>	

		<div class="modal fade" id="buscar_factura">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Búsqueda de facturas</h4>
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
								<label for="nombre" class="col-xs-offset-2 col-xs-2 control-label col-md-3">Factura:</label>
								<div class="col-xs-6 col-md-3">	
									<input class="form-control input-sm" type="text" id="factura_modal" name="factura_modal">
								</div>
							</div>

							<div class="form-group">
								<label for="nombre" class="col-xs-offset-2 col-xs-2 control-label col-md-3">Paciente:</label>
								<div class="col-xs-6 col-md-3">	
									<input class="form-control input-sm" type="text" id="paciente_modal" name="paciente_modal">
								</div>
							</div>

							<div class="form-group">	
								<div class="col-xs-offset-4 col-md-5 col-md-offset-5">
									<button type="button" class="btn btn-default"  id="boton_buscar_factura"><span class="glyphicon glyphicon-search"></span> Buscar</button>
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

			
		<!-- Siempre antess del body -->
		<script src="plugins/jquery/jquery-3.1.1.min.js"></script>
		<script src="plugins/bootstrap/js/bootstrap.min.js"></script>		
		<script src="librerias/tarifario/cpt.js"></script>
	</body>

</html>