<?php 
	class usuario
	{
		private $conexion;
		public function __construct()
		{
			require_once('/../conexion/conexion.php');
			$this->conexion= new conexion();
			$this->conexion->conectar();
		}

		function generar_clave($vln_proveedor)
		{

			$clave_sql= 0;
			$mensaje_sql= "";
			$vlc_sql="begin cp_reasigna_clave_medico('$vln_proveedor',0,$clave_sql,'$mensaje_sql'); end;";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);
		}

		function listar_clave($vln_proveedor)
		{

			$vlc_sql="select mp.clave_pagos
						from arcpmp mp
						where mp.no_cia = '01'
						and mp.no_prove = '$vln_proveedor'";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);

			$vlc_respuesta=oci_fetch_array($vlc_resultados);

			return $vlc_respuesta[0];
			
		}

		function listar_nombre($vgn_proveedor)
		{
			$vlc_sql="select  mp.nombre
            			from arcpmp mp
            			where mp.no_cia = '01'
            			and mp.no_prove = '$vgn_proveedor'";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);

			$vlc_respuesta=oci_fetch_array($vlc_resultados);

			return $vlc_respuesta[0];
			
		}

		function listar_correo($vgn_proveedor)
		{

			$vlc_sql="select  mc.valor correo_gema
						from arcpmp mp, bab_medios_contacto mc
						where mp.no_cia = '01'
						and mp.no_prove = '$vgn_proveedor'
						and mp.grupo = '88'
						and mc.pk_fk_persona = mp.codigo_persona
						and mc.fk_tipo_medio_contacto in (7)
						and rownum = 1
						order by mp.no_prove";
			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);

			$vlc_respuesta=oci_fetch_array($vlc_resultados);

			return $vlc_respuesta[0];
			
		}
		
	}
	
?>