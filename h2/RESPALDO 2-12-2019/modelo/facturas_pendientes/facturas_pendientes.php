<?php 
	class facturas
	{
		private $conexion;
		public function __construct()
		{
			require_once('/../conexion/conexion.php');
			$this->conexion= new conexion();
			$this->conexion->conectar();
		}

		function lista_facturas_pendientes($vln_proveedor)
		{

			$vlc_sql=" select trunc(md.fecha) fecha, 
						       decode(md.tipo_doc,'FM','FACTURA TERCEROS','FACTURA CONCLINA') tipo,
						       md.serie_fisico||'-'||md.no_fisico factura,
						       nvl(md.numero_prefactura,'S/N') prefactura,
						       nvl(md.hist_clinica_pac,0) historia_clinica,
						       nvl(fun_busca_nombre_pte(md.hist_clinica_pac),'S/N') paciente,
						       sum(nvl(md.monto,0)) monto,
						       sum(nvl(md.saldo,0)) saldo
						from arcpmd md
						where md.no_cia = '01'
						and md.no_prove = '$vln_proveedor'
						and md.tipo_doc in ( 'FM', 'FP', 'FH', 'FO', 'HC', 'HS' )
						and trunc(md.fecha) >= '01/JAN/2017'
						and md.saldo > 0
						and md.anulado != 'S'
						group by trunc(md.fecha), 
						       md.serie_fisico||'-'||md.no_fisico,
						       md.numero_prefactura,
						       md.hist_clinica_pac,
						       fun_busca_nombre_pte(md.hist_clinica_pac),
						       decode(md.tipo_doc,'FM','FACTURA TERCEROS','FACTURA CONCLINA')
						order by 1 desc
						";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);

			$vlc_arreglo = array();
			while ($vlc_respuesta=oci_fetch_array($vlc_resultados)) 
			{
				$vlc_arreglo[]=$vlc_respuesta;
			}
			return $vlc_arreglo;
			$this->conexion->cerrar();
		}	

	}
	
?>