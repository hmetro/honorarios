<?php
	require_once("../config/config.php");
?>
<!DOCTYPE html>
<html>
<head>
	<link rel="shortcut icon"  href="http://<?php echo $vlc_dominio."/".$vlc_proyecto; ?>/vista/imagen/logo.ico"/>
	<title></title>
	<script type="text/javascript" src="config/config.js"></script>
	<link rel="stylesheet" href="vista/css/estilos_sistema.css?v=2">
	<link href="vista/css/preloader.css?v=1" rel="stylesheet"> 
	<link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="plugins/toastr/toastr.css">
    
    <script type="text/javascript">
    	function notificaciones (mensaje, tipo) 
 		{
    	    toastr.options = {
    	        closeButton: true,
    	        newestOnTop: true,
    	        progressBar: true,
    	        positionClass: 'toast-bottom-left',
    	        //preventDuplicates: true, con esto se puede quitar el duplicado
    	        timeOut: '5000'
    	    };
	
    	    if (tipo == 'error') {
    	        toastr.error(mensaje);
    	    } else if (tipo == 'success') {
    	        toastr.success(mensaje);
    	    } else if (tipo == 'info') {
    	        toastr.info(mensaje);
    	    } else if (tipo == 'warning') {
    	        toastr.warning(mensaje);
    	    }
    	}
    </script>	
</head>
<body>
		<div id="fade" class="overlay"></div>
     	<div id="light" class="preloader">
        	<center>  
           		<p><b>Procesando...</b></p>
           		<img src="vista/imagen/66.gif">
        	</center>    
    	</div>

		<div class="modal fade " id="guia_usuario" data-backdrop="static" data-keyboard="false">
			<div  class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Guía del usuario</h4>
					</div>
					<div class="modal-body">
						<div class="body_scrollspy" data-spy="scroll" data-target="#myScrollspy" data-offset="20">
							<div class="container">
							  	<div class="row">
							  	  	<nav class="col-sm-2" id="myScrollspy">
							  	  	  	<ul class="nav nav-pills nav-stacked">
							  	  	    	<li class="active"><a href="#section1">Ingreso Prealta</a></li>
							  	  	    	<li><a href="#section2">Facturas Pagadas</a></li>
							  	  	    	<li><a href="#section3">Facturas Pendientes</a></li>
							  	  	    	<li><a href="#section4">HCPT</a></li>
							  	  	    	<li><a href="#section5">Cuenta</a></li>
							  	  	  	</ul>
							  	  	</nav>
							  		<div class="col-sm-7">
							  		    <div id="section1">    
							  		      	<h3>Ingreso Fecha Prealta</h3>
							  		      	<p><b>1.-)  Primero damos click en el botón</b></p>
							  		      	<img src="vista/imagen/boton_prealta.png">
							  		      	<hr>
							  		      	<p><b>2.-) Vizualizaremos la siguiente pantalla</b></p>
							  		      	<img class="imagen_guia_usuario" src="vista/imagen/pantalla_prealta.png">
							  		      	<hr>
							  		      	<p><b>3.-) El color verde significa que es la primera vez que se va a ingresar la fecha de prealta</b></p>
							  		      	<img  src="vista/imagen/botones_verdes_prealta.PNG">
							  		      	<hr>
							  		      	<p><b>4.-) El color celeste significa que la fecha de prealta ya se ingreso y usted la va a modificar</b></p>
							  		      	<img src="vista/imagen/botones_celestes_prealta.PNG">
							  		      	<hr>
							  		      	<p><b>5.-) El color azul significa que no puede modificar la fecha de prealta</b></p>
							  		      	<img src="vista/imagen/botones_azules_prealta.PNG">
							  		      	<hr>
							  		      	<p><b>6.-) Ingresamos la fecha y la hora de Prealta en los campos indicados con el Formato dd/mm/yyyy para fecha y para la hora hh:mm </b></p>
							  		      	<img src="vista/imagen/ingreso_prealta.PNG">
							  		      	<hr>
							  		      	<p><b>7.-) Luego pulsamos en el boton <img src="vista/imagen/boton_verde_prealta.PNG"> o <img src="vista/imagen/boton_azul_prealta.PNG"> para guardar los cambios</b></p>
							  		      	<hr>
							  		      	<p><b>8.-) Al pulsar en los botones antes mencionados nos aparece una pantalla en la cual usted puede ingresar los códigos de honorarios</b></p>
							  		      	<img class="imagen_guia_usuario" src="vista/imagen/modal_cpt.PNG">
							  		      	<hr>
							  		      	<p><b>9.-) Para buscar un honorario lo podemos hacer por código digitando en <img src="vista/imagen/codigo_cpt.PNG"> o por descripción digitando en <img src="vista/imagen/decripcion_cpt.PNG"></b></p>
							  		      	<hr>
							  		      	<p><b>10.-) Para efectuar la busqueda damos un click en <img src="vista/imagen/boton_buscar_cpt.PNG"> y para añadir el honorario buscado pulsamos en el botón <img src="vista/imagen/boton_añadir_cpt.PNG"></b></p>
							  		    </div>
							  		    <div id="section2"> 

							  		    </div>        
							  		    <div id="section3">         
							  		    </div>
							  		    <div id="section41">         
							  		    </div>      
							  		    <div id="section42">         
							  		    </div>
							  		</div>
							  	</div>
							</div>
						</div>						
					</div>				
					<div class="modal-footer">  
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>				
				</div>
			</div>
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
										<li class="menu_subdatos" id="cerrar_sesion_telefono">
											<a href="http://<?php echo $vlc_dominio."/".$vlc_proyecto; ?>/controlador/sesion/cerrar_sesion.php" class="letra_color"><span id="icono_menu" class="glyphicon glyphicon-off"></span> Cerrar sesión</a>
										</li>
									</ul>
								</li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="buton">
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon-book"> </span><b> Facturas</b>
											<span class="caret"></span>
										</div>
									</a>
									<ul class="dropdown-menu color_menu_nav">
										<li class="menu_subdatos">
											<a href="http://<?php echo $vlc_dominio."/".$vlc_proyecto; ?>/pagos_mes" class="letra_color"><span id="icono_menu" class="glyphicon glyphicon-usd"></span> Facturas Pagadas</a>
										</li>
										<li class="menu_subdatos">
											<a href="http://<?php echo $vlc_dominio."/".$vlc_proyecto; ?>/facturas_mes" class="letra_color"><span id="icono_menu" class="glyphicon glyphicon-duplicate"></span> Facturas Pendientes</a>
										</li>
									</ul>
								</li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="buton">
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon-book"> </span><b> Consultas</b>
											<span class="caret"></span>
										</div>
									</a>
									<ul class="dropdown-menu color_menu_nav">
										<li class="menu_subdatos">
											<a href="http://<?php echo $vlc_dominio."/".$vlc_proyecto; ?>/cpt" class="letra_color"><span id="icono_menu" class="glyphicon glyphicon-header"></span> CPT</a>
										</li>
										<li class="menu_subdatos">
											<a href="http://<?php echo $vlc_dominio."/".$vlc_proyecto; ?>/estado_cuenta" class="letra_color"><span id="icono_menu" class="glyphicon glyphicon-download-alt"></span> Estado de Cuenta</a>
										</li>
									</ul>
								</li>
							</ul>															
							<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="http://<?php echo $vlc_dominio."/".$vlc_proyecto; ?>/prealta">
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon-home"> </span><b> Ingresar Pre-alta</b>
										</div>
									</a>
								</li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<li class="dropdown">
									<a href="#" data-toggle='modal' data-target='#guia_usuario'>
										<div class="text letra_color">
											<span id="icono_menu" class="glyphicon glyphicon-alert"> </span><b> Ayuda</b>
										</div>
									</a>
								</li>
							</ul>															
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
								$nombre = str_replace("\u00d1", "ñ", $nombre);
								echo " ". $nombre;
							?>
							</b>			
						</div>
				</div>
			</div>
		</div>

		<div class= "container-fluid">

			<div class="modal fade" id="cambiar_contrasena" data-backdrop="static" data-keyboard="false">
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