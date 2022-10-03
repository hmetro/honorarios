<?php
	require_once("../controlador/sesion/comprobar_sesion.php");
	comprobar_sesion();
?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0 maximun-scale=1.0, minimum-scale=1.0">
		<meta http-equiv="Expires" content="0">
		<meta http-equiv="Last-Modified" content="0">
		<meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
		<meta http-equiv="Pragma" content="no-cache">
		<link rel="shortcut icon" type="imagen/x-icon" href="imagen/logo.ico"/>
		<title>Hospital Metropolitano</title>
	</head>
	<body onload="lista_descuento_honorario(
			'<?php echo $_SESSION['vgc_codigo']; ?>',
			'<?php echo date("Y-m-01"); ?>',
			'<?php echo date("d-m-Y"); ?>');">
<?php  
	require_once("header/header.php");
?>	
		<div class= "container">
			<!-- Código de Proveedor oculto -->
			<input type="hidden" name="proveedor_oculto" id="proveedor_oculto" value="<?php echo $_SESSION['vgc_codigo']; ?>">

			<div class="panel panel-info">
				<div class="panel-heading"><b>Listado descuento honorarios</b></div>
					<div class="panel-body">
						<div id="pago_vacio_txt_seguros" align="center">
							<h5>Al momento no tiene descuentos de honorarios, según el rango de fechas seleccionado</h4>
						</div>
						<div class="form-group">
		        	        <div id="lista_descuentos"></div>
		        	        <div align="center"> <img id="img_flecha_invertida" class="img_flecha ocultar_general" src="vista/imagen/flecha_invertida.png"></div>
		        	    </div>
					</div>	
				</div>
			</div>
		</div>
		<div class= "container">
			<div class="panel" id="panel_buscar">
				<div class="panel-heading" id="panel_heading_buscar"><b>Consulta descuentos de honorarios</b></div>
					<div class="panel-body">
						<div class="row form-horizontal">
							<div class="form-group">
								<label for="nombre" class="col-xs-offset-1 control-label col-xs-3 control-label col-md-4"> Fecha desde:</label>
								<div class="col-xs-5 col-md-2">	
									<input type="date" name="fecha_desde_pendiente" class="form-control" id="fecha_desde_pendiente">
								</div>
							</div>
							<div class="form-group">
								<label for="nombre" class="col-xs-offset-1 control-label col-xs-3 control-label col-md-4"> Fecha hasta:</label>
								<div class="col-xs-5 col-md-2">	
									<input type="date" name="fecha_hasta_pendiente" class="form-control" id="fecha_hasta_pendiente">
								</div>
							</div>								

							<div class="form-group">	
								<div class="col-xs-offset-4 col-md-5 col-xs-7 col-md-offset-5">
									<button type="button" class="btn btn-default col-md-4 col-xs-8" id="boton_buscar"><span class="glyphicon glyphicon-search"></span> Buscar</button>
								</div>
							</div>
						</div>						
					</div>	
				</div>
			</div>	
		</div>
		<div class="modal fade " id="ver_detalle" data-backdrop="static" data-keyboard="false">
			<div  class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Detalle de descuentos</h4>
					</div>

					<div class="modal-body">
	
						<div class="form-group">
							<div class='table-responsive'>
		        		    	<div id="lista_descuento_detalle"></div>
		        		   	</div>
						</div>
					</div>				
					<div class="modal-footer">  
                        <button type="button" class="btn btn-danger" onclick="limpiar_modal();">Cerrar</button>
                    </div>				
				</div>
			</div>
		</div>		
		<!-- Siempre antess del body -->
		<script src="plugins/jquery/jquery-3.1.1.min.js"></script>
		<script src="plugins/bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="plugins/toastr/toastr.js"></script>
		<script type="text/javascript" src="plugins/sweetalert/sweetalert.js"></script>		
		<script src="librerias/descuento_honorarios/descuento_honorarios.js"></script>
	</body>

</html>