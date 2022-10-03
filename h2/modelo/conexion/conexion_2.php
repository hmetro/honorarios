<?php
	class conexion
	{
		private $servidor;
		private $usuario;
		private $contraseña;
		private $basedatos;
		public  $conexion;

		public function __construct(){
			$this->servidor   = "(DESCRIPTION=( ADDRESS_LIST= (ADDRESS= (PROTOCOL=TCP) (HOST=172.16.9.77) (PORT=1521)))( CONNECT_DATA= (SID=desa) ))";
			$this->usuario	  = "naf";
			$this->contraseña = "fan0920";
		}

		function conectar(){
			$this->conexion= oci_new_connect($this->usuario,$this->contraseña,$this->servidor, 'AL32UTF8');
		}

		function cerrar(){
			$this->conexion->close();
		}
	}

?>