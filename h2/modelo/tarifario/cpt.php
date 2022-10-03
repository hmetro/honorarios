<?php  
	class honorarios
	{
		private $conexion;
		public function __construct()
		{
			require_once('/../conexion/conexion.php');
			$this->conexion= new conexion();
			$this->conexion->conectar();
		}

		function lista_cpt($vgn_codigo,$vgc_descripcion)
		{

			$vlc_sql="select * from ctm_vw_tarifario_medico where (cod_cpt like '%$vgn_codigo%' and UPPER (desc_cpt) like UPPER('%$vgc_descripcion%') ) and rownum <= 5 order by DESC_CPT ";

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

		function guardar_funcion_auditoria($vln_proveedor,$vlc_funcion_nombre, $vlc_ip)
		{
			$vlc_sql="insert into CP_BITACORA_AUD_APP
            			(no_prove,
            				funcion_nombre,
            				ip_acceso)
            			VALUES	
            			('$vln_proveedor',
            				'$vlc_funcion_nombre',
            				'$vlc_ip')";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);
		}

	}		
?>					
