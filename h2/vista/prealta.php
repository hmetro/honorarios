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
	<body onload="lista_pacientes();">

<?php  
	require_once("header/header.php");
?>		
		<div class= "container">
			<!-- Código de Proveedor oculto -->
			<input type="hidden" name="proveedor_oculto" id="proveedor_oculto" value="<?php echo $_SESSION['vgc_codigo']; ?>">
			<div class="panel panel-primary">
				<div class="panel-heading"><b>Ingresar Pre-Alta</b></div>
					<div class="panel-body">
						<div align="center">
							<label>Historia Clínica </label>
							<input type="checkbox" checked="" id="hcl_check" name="hcl_check">
							<label>Paciente </label>
							<input type="checkbox" checked="" id="paciente_check" name="paciente_check">
							<label>Fecha admisión </label>
							<input type="checkbox" id="fechaadm_check" name="fechaadm_check">
							<label>Habitación </label>
							<input type="checkbox" id="habitacion_check" name="habitacion_check">
							<label>Diagnóstico </label>
							<input type="checkbox" id="diagnostico_check" name="diagnostico_check">
							<label>Médico </label>
							<input type="checkbox" id="medico_check" name="medico_check">
							<label>Seguro </label>
							<input type="checkbox" id="seguro_heck" name="seguro_heck">							
						</div><br>
						<div id="pago_vacio_txt" align="center">
							<h4>Al momento no tiene Pacientes</h4>
						</div>
						<div class="form-group">
		        	        <div id="lista"></div>
		        	    </div>
		        	    <div align="center"> <img id="img_flecha_invertida" class="img_flecha ocultar_general" src="vista/imagen/flecha_invertida.png"></div>
					</div>	
				</div>
			</div>
		</div>



		<div class="modal fade " data-backdrop="static" data-keyboard="false" id="ingresar_cpt">
			<div  class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title titulo_modal"><span class="glyphicon glyphicon-list-alt"></span> Honorarios</h4>
					</div>
					<div class="modal-body">
						<label >Paciente: &nbsp;</label><span  id="nombre_paciente_modal"> </span><br>
						<label >Fecha Posible Alta: &nbsp;</label><span id="fecha_prealta_modal"> </span><br>
						<label >Hora Posible Alta: &nbsp;</label><span id="hora_prealta_modal"> </span><br>

							<div id="listar_codigos" class="dropdown_editar"></div>

						<div class="form-group">
							<input type="hidden" name="hc_paciente_modal_cpt" id="hc_paciente_modal_cpt">
							<input type="hidden" name="admision_paciente_modal_cpt" id="admision_paciente_modal_cpt">
							<div class="row form-horizontal">
								<div id="grupo_paciente_busqueda" class="ocultar_general">
									<div class="form-group">
										<label for="ruc" class="col-xs-offset-1 control-label col-xs-3 col-md-4"> Paciente:</label>	
										<div class="col-xs-5 col-md-2">
											<input type="text" class="form-control" name="paciente_busqueda" id="paciente_busqueda">
										</div>
									</div>								
								</div>

								<div id="grupo_factura_busqueda" class="ocultar_general">
									<div class="form-group">
										<label for="ruc" class="col-xs-offset-1 control-label col-xs-3 col-md-4"> Factura:</label>	
										<div class="col-xs-5 col-md-2">
											<input type="text" class="form-control" name="factura_busqueda" id="factura_busqueda">
										</div>
									</div>								
								</div>									
							</div>

							<div class="container">
								<div class="row form-horizontal">

		        		    		<div class="form-group">
		        		    			<label class="control-label col-xs-8 control-label col-md-2">Código CPT</label>
		        		    			<div class="col-md-3 col-lg-4">
		        		    				<input type="number" class="form-control input-sm" placeholder="Insertar Código CPT" name="codigo_cpt_1" id="codigo_cpt_1">
		        		    			</div>
		        		    		</div>

		        		    		<div class="form-group">
										<label class="control-label col-xs-8 control-label col-md-2">Descripción CPT</label>
										<div class="col-md-7">		
											<input type="text" placeholder="Insertar Descripción CPT" class="form-control input-sm" name="descripcion_ctp_1" id="descripcion_ctp_1">		
										</div>
									</div>

									<div class="form-group">
										<label class="control-label col-xs-8 control-label col-md-2">Cantidad</label>	
										<div class="col-md-3">
											<input type="number" class="form-control input-sm" name="cantidad_cpt_1" id="cantidad_cpt_1" value="1">
										</div>
									</div>	
									
									<div class="form-group">
										<label class="control-label col-xs-8 control-label col-md-2">Porcentaje %</label>	
										<div class="col-md-3">	
											<input type="number" class="form-control input-sm" name="porcentaje_cpt_1" id="porcentaje_cpt_1" value="100">
										</div>
									</div>
								
									<div class="form-group">
										<label class="control-label col-xs-8 control-label col-md-2">Fecha</label>
										<div class="col-md-3">	
											<input type="date" class="form-control input-sm" name="fecha_codigo_cpt" id="fecha_codigo_cpt">
										</div>
									</div>	
									<br>

									<div class="form-group">	
										<div class="col-md-offset-2 col-md-1 col-xs-2">	
											<a class="btn btn-default btn-md" href="#" onclick="busqueda_codigos_cpt('codigo_cpt_1','descripcion_ctp_1');" ><span class="glyphicon glyphicon-search"></span></a>
										</div>
										<div class="col-md-1 col-xs-1">	
											<button class="btn btn-primary btn-md" onclick="ingreso_codigo_cpt();"><span class="glyphicon glyphicon-plus"></span></button>
										</div>
									</div>	
								</div>	
								<br>		

		        		   	</div>
		        		   	<div id="listar_codigos_cpt"></div>
		        		   	<div align="center"> <img id="img_flecha_invertida" class="img_flecha ocultar_general" src="vista/imagen/flecha_invertida.png"></div>
						</div>
					</div>				
					<div class="modal-footer">  
                        <button type="button" class="btn btn-default" onclick="cerrar_honorarios();">Cerrar</button>
                    </div>				
				</div>
			</div>
		</div>

		<div class="modal fade " data-backdrop="static" data-keyboard="false" id="transferir_responsabilidad">
			<div  class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Transferir Responsabilidad</h4>
					</div>
					<div class="modal-body">
						<label >Paciente: &nbsp;</label><span  id="nombre_paciente_modal_transferir"> </span><br>
						<label >Fecha Posible Alta: &nbsp;</label><span id="fecha_paciente_modal_transferir"> </span><br>
						<div   id="listar_medicos"></div>
						<div class="container-fluid" align="center">
						<div class="form-group">
							<div class='table-responsive'>
		        		    	<div id="lista_factura_detalle"></div>
		        		    	<table class="table table-condensed letra_tabla_cabecera">
		        		    		<thead>
		        		    			<tr>
		        		    				<th class="active col-md-1"></th>
		        		    				<th class="active col-md-2">Código Médico</th>
		        		    				<th class="active">Nombre</th>
		        		    				<th class="active col-md-1"></th>
		        		    			</tr>
		        		    		</thead>
		        		    		<tbody>
		        		    			<input type="hidden" name="admision_paciente_modal" id="admision_paciente_modal">
		        		    			<input type="hidden" name="hc_paciente_modal" id="hc_paciente_modal">
		        		    			<input type="hidden" name="tipo_medico_modal" id="tipo_medico_modal">
		        		    			<form id="form_codigos_cpt">
		        		    				<tr>
		        		    					<td><a class="btn btn-default btn-md" href="#" onclick="busqueda_codigo_medico();"><span class="glyphicon glyphicon-search"></span></a></td>
		        		    					<td><input type="number" class="form-control input-sm" name="codigo_doctor_modal" id="codigo_doctor_modal"></td>
		        		    					<td><input type="text" class="form-control input-sm" name="nombre_doctor_modal" id="nombre_doctor_modal"></td>
		        		    					<td align="left"><a class="btn btn-primary btn-md" href="#" onclick="transferir_responsabilidad();"><span class="glyphicon glyphicon-ok"></span></a></td>
											</tr>																					
										</form>	
									</tbody>
								</table>
		        		   	</div>
						</div>
					</div>				
					<div class="modal-footer">  
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>				
				</div>
			</div>
		</div>

		<!-- Siempre antess del body -->
		<script src="plugins/jquery/jquery-3.1.1.min.js"></script>
		<script src="plugins/bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="plugins/toastr/toastr.js"></script>
		<script type="text/javascript" src="plugins/sweetalert/sweetalert.js"></script>		
		<script src="librerias/prealta/prealta.js?v=2"></script>
				
	</body>

</html>