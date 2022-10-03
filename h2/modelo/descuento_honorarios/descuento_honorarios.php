<?php 
	class descuentos
	{
		private $conexion;
		public function __construct()
		{
			require_once('/../conexion/conexion.php');
			$this->conexion= new conexion();
			$this->conexion->conectar();
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

		function lista_descuentos($vln_proveedor,$vlc_fecha_desde,$vlc_fecha_hasta)
		{

			$vlc_sql="select md.fecha, md.detalle, md.monto, md.saldo, md.no_docu, md.no_prove
			from arcpmd md
			where  md.tipo_doc = 'DM'
			and (md.detalle like 'PLAN DE ASISTE%' or md.detalle like '%CAF%ROT%')
			AND  md.fecha between '$vlc_fecha_desde' and ('$vlc_fecha_hasta')
			and  md.no_prove = '$vln_proveedor' ORDER BY md.fecha";

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

		function lista_descuentos_detalle($vln_proveedor,$vlc_transaccion)
		{

			$vlc_sql="SELECT
					m.fecha,
					a.tipo_refe,
					a.no_docu no_transaccion,
					c.detalle,
					a.no_refe,
					a.no_docu,
					c.monto,
					a.no_prove
				from arcprd a, arcptd b, arcpmd c,arcpmd m
				where a.no_cia = '01'
					and nvl(c.anulado,'N') = 'N'
					and a.no_prove = '$vln_proveedor'
					and c.tipo_doc in ('DM')
					and a.no_cia = b.no_cia
					and a.tipo_doc = b.tipo_doc
					and a.no_cia = c.no_cia
					and a.no_docu = c.no_docu
					and a.no_refe = m.no_docu
					and a.no_docu in ('$vlc_transaccion')
					order by c.fecha desc";

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
	}
?>