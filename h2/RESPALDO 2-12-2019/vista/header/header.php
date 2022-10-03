<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" href="vista/css/estilos_sistema.css?v=2">
	<link href="vista/css/preloader.css?v=2" rel="stylesheet"> 
	<link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap-theme.min.css">	
</head>
<body>

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
											<span id="icono_menu" class="glyphicon glyphicon-usd"> </span><b> Facturas Pagadas</b>
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
							<!--<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="#" data-toggle='modal' data-target='#buscar_factura' >
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon glyphicon-search"> </span><b> Buscar facturas</b>
										</div>
									</a>
								</li>
							</ul>-->
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

		<div class= "container-fluid">
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

		<div class= "container-fluid">

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
		</div>				

</body>
</html>