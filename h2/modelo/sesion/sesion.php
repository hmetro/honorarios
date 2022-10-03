<?php 
	class sesion
	{
		private $conexion;
		public function __construct()
		{
			require_once('/../conexion/conexion.php');
			$this->conexion= new conexion();
			$this->conexion->conectar();
		}

		function validar_sesion($vlc_codigo,$vlc_contrasena)
		{

			$vlc_sql="select mp.no_prove, mp.nombre, mp.clave_pagos
						from arcpmp mp
						where mp.no_cia = '01'
						and mp.no_prove = '$vlc_codigo'
						and mp.clave_pagos =$vlc_contrasena";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);

			$vlc_respuesta=oci_fetch_array($vlc_resultados);

			return $vlc_respuesta[1];
			$this->conexion->cerrar();
		}

		function validar_sesion_telefono($vlc_codigo,$vlc_contrasena)
		{

			$vlc_sql="select mp.no_prove, mp.nombre, mp.clave_pagos
						from arcpmp mp
						where mp.no_cia = '01'
						and mp.no_prove = '$vlc_codigo'
						and mp.clave_pagos =$vlc_contrasena";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);

			$vlc_arreglo = array();
			while ($vlc_respuesta=(oci_fetch_array($vlc_resultados))) 
			{
				$vlc_arreglo[]=$vlc_respuesta;
			}


			return $vlc_arreglo;
			$this->conexion->cerrar();
		}


		function validar_correo($vlc_codigo)
		{

			$vlc_sql="select  mc.valor correo_gema
						from arcpmp mp, bab_medios_contacto mc
						where mp.no_cia = '01'
						and mp.no_prove = '$vlc_codigo'
						and mp.grupo = '88'
						and mc.pk_fk_persona = mp.codigo_persona
						and mc.fk_tipo_medio_contacto in (7,8)
						and rownum = 1
						order by mp.no_prove";
			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);

			$vlc_respuesta=oci_fetch_array($vlc_resultados);

			return $vlc_respuesta[0];
			
		}

		function listar_clave($vlc_codigo)
		{
			$vlc_sql="select  mp.clave_pagos
            			from arcpmp mp
            			where mp.no_cia = '01'
            			and mp.no_prove = '$vlc_codigo'";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);

			$vlc_respuesta=oci_fetch_array($vlc_resultados);

			return $vlc_respuesta[0];
			
		}

		function listar_nombre($vlc_codigo)
		{
			$vlc_sql="select  mp.nombre
            			from arcpmp mp
            			where mp.no_cia = '01'
            			and mp.no_prove = '$vlc_codigo'";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);

			$vlc_respuesta=oci_fetch_array($vlc_resultados);

			return $vlc_respuesta[0];
			
		}

		function guardar_sesion($vlc_codigo,$vlc_ip,$vlc_tipo_dispositivo)
		{
			$vlc_sql="insert into CP_BITACORA_ACCESO_APP
            			(no_prove,
            				ip_acceso,
            				tipo_dispositivo)
            			VALUES	
            			('$vlc_codigo',
            				'$vlc_ip',
            				'$vlc_tipo_dispositivo')";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);
		}				

	}
	
?>