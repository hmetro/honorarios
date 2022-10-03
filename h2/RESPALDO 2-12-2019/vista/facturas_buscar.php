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
		<link rel="stylesheet" href="vista/css/estilos_sistema.css">
		<link href="vista/css/preloader.css?v=1" rel="stylesheet"> 
		<link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">
    	<link rel="stylesheet" href="plugins/bootstrap/css/bootstrap-theme.min.css">
	</head>
	<body onload="listar_facturas(
			'<?php echo $_GET['paciente'];?>',
			'<?php echo $_GET['factura']; ?>',
			'<?php echo $_GET['proveedor']; ?>');">
		<div id="fade" class="overlay"></div>
     	<div id="light" class="preloader">
        	<center>  
           		<p><b>Procesando...</b></p>
           		<img src="vista/imagen/66.gif">
        	</center>    
    	</div>

		<div class="container">
			<header>
				<nav class="navbar navbar-fixed-top color_menu_nav ">
					<div class="container-fluid">
						<div id="navbar-header" class="navbar-header">
							<button type="button" class="navbar-toggle collapsed icono_color" data-toggle="collapse" data-target="#menu-navbar">
								<span class="sr-only">Menu</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<span id="logo_menu_texto" class="navbar-brand">Hospital Metropolitano</span>
							<img id="logo_menu" class="navbar-brand" src="vista/imagen/logo.png">
						</div>
						<div class="collapse navbar-collapse" id="menu-navbar">
							<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="buton">
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon-user"> </span><b> Mi cuenta</b>
											<span class="caret"></span>
										</div>
									</a>
									<ul class="dropdown-menu color_menu_nav">
										<li class="menu_subdatos">
											<a href="#" data-toggle='modal' data-target='#cambiar_contrasena' class="letra_color"><span id="icono_menu" class="glyphicon glyphicon-wrench"></span> Cambiar contraseña</a>
										</li>
										<li class="menu_subdatos">
											<a href="http://app.hmetro.med.ec/honorarios/controlador/sesion/cerrar_sesion.php" class="letra_color"><span id="icono_menu" class="glyphicon glyphicon-off"></span> Cerrar sesión</a>
										</li>
									</ul>
								</li>
							</ul>

							<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="http://app.hmetro.med.ec/honorarios/pagos_mes">
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon-usd"> </span><b> Pagos del mes</b>
										</div>
									</a>
								</li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="http://app.hmetro.med.ec/honorarios/facturas_mes" >
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon-duplicate"> </span><b> Facturas pendientes</b>
										</div>
									</a>
								</li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="#" data-toggle='modal' data-target='#buscar_factura' >
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon glyphicon-search"> </span><b> Buscar facturas</b>
										</div>
									</a>
								</li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="http://app.hmetro.med.ec/honorarios/cpt">
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon-header"> </span><b> CPT</b>
										</div>
									</a>
								</li>
							</ul>							
							<!--<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="#" data-toggle='modal' data-target='#enviar_planilla' >
										<div class="text-capitalize">
											<span id="icono_menu" class="glyphicon glyphicon-envelope"> </span><b> Planillas de Pago</b>
										</div>
									</a>
								</li>
							</ul>-->
						</div>	
					</div>
				</nav>
			</header>
		</div>

		<div class= "container">
			<div class="panel panel-default">
				<div class="panel-heading">
						<div align="center" style="padding-bottom: 5px;">
							<b>Bienvenido 
							<?php 
								$nombre =  $_SESSION['vgc_nombre'];
								$nombre = ucwords($nombre);
								$nombre = ucwords(strtolower($nombre));
								$nombre = str_replace("?", "ñ", $nombre);
								echo " ". $nombre;
							?>
							</b>			
						</div>
				</div>
			</div>
		</div>

		<div class= "container">
			<div class="modal fade" id="cambiar_contrasena">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">Cambiar contraseña</h4>
						</div>

						<div class="modal-body">
							<div id="light_modal" class="preloader_modal">
       							<center>  
       								<p><b>Procesando...</b></p>
       								<img src="vista/imagen/66.gif">
       							</center>    
    						</div>
    						<div class="form-group" align="center">
    							<button type="button" onclick="generar_clave('<?php echo $_SESSION['vgc_codigo']; ?>')" class="btn btn-default">Generar clave</button>
    						</div>
    						<div class="form-group" align="center">	
    							<label id="txt_mensaje_clave"></label>
    						</div>
    						<div class="form-group" align="center">	
    							<label id="txt_clave"></label>
    						</div>
    						<div class="form-group" align="center">
    							<label id="txt_mensaje_clave_generada"></label>
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

			<div class="panel panel-info">
				<div class="panel-heading"><b>Resultado de la búsqueda de facturas</b></div>
					<div class="panel-body">
						<div id="factura_vacio_txt" align="center">
							<h5>No se encontro resultado de la busqueda</h5>
						</div>
						<div class="form-group">
		        	        <div id="lista_facturas"></div>
		        	    </div>
					</div>	
				</div>
			</div>
		</div>

		<div class= "container">
			<div class="panel" id="panel_buscar">
				<div class="panel-heading" id="panel_heading_buscar"><b>Consulta de facturas</b></div>
					<div class="panel-body">
						<div class="row form-horizontal">
							<div class="form-group">
								<label for="nombre" class="col-xs-offset-1 col-md-offset-1 control-label col-xs-2 col-md-3">Factura:</label>
								<div class="col-xs-offset-1 col-xs-6 col-md-2">	
									<input type="number" class="form-control" id="factura_buscar" name="factura_buscar">
								</div>
							</div>

							<div class="form-group">
								<label for="ruc" class="col-xs-offset-1 control-label col-xs-2 col-md-3">Paciente: </label>	
								<div class="col-xs-offset-1 col-xs-6 col-md-2">
									<input type="text" class="form-control" id="paciente_buscar" name="paciente_buscar">
								</div>
							</div>
							<div class="form-group">	
								<div class="col-xs-offset-5 col-xs-6 col-md-2">
									<button type="button" class="btn btn-default" id="boton_buscar"><span class="glyphicon glyphicon-search"></span> Buscar</button>
								</div>
							</div>
						</div>						
					</div>	
				</div>
			</div>	
		</div>	

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
								<label for="nombre" class="col-xs-offset-1 col-xs-2 control-label col-md-3">Factura:</label>
								<div class="col-xs-offset-1 col-xs-6 col-md-3">	
									<input class="form-control input-sm" type="text" id="factura_modal" name="factura_modal">
								</div>
							</div>

							<div class="form-group">
								<label for="nombre" class="col-xs-offset-1 col-xs-2 control-label col-md-3">Paciente:</label>
								<div class=" col-xs-offset-1 col-xs-6 col-md-3">	
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
		<script src="librerias/facturas_buscar/facturas_buscar.js"></script>
	</body>

</html>