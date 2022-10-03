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

		function lista_facturas_mes_seguros($vln_proveedor,$vlc_fecha_desde,$vlc_fecha_hasta)
		{

			$vlc_sql="SELECT trunc(md.fecha) fecha, --0
						     fun_nombre_cliente('01',nvl(md.numero_prefactura,'1')) cliente, --1
						     md.serie_fisico||'-'||md.no_fisico factura, --2
						     nvl(md.numero_prefactura,'S/N') prefactura, --3
						     nvl(md.hist_clinica_pac,0) historia_clinica, --4
						     nvl(fun_busca_nombre_pte(md.hist_clinica_pac),'S/N') paciente, --5
						     sum(nvl(md.monto,0)) monto, --6
						     sum(nvl(md.saldo,0)) saldo --7
						from arcpmd md
						where md.no_cia = '01'
						and md.no_prove = '$vln_proveedor'
						and md.tipo_doc in ( 'FM', 'FH','HC', 'HS' )
                        and trunc(md.fecha)>='$vlc_fecha_desde'
                        and trunc(md.fecha)<='$vlc_fecha_hasta'						
						and md.saldo > 0
						and md.anulado != 'S'
						and fun_nombre_pagador('01',nvl(md.numero_prefactura,'1')) = 'SEGUROS'
						group by trunc(md.fecha), 
						       md.serie_fisico||'-'||md.no_fisico,
						       md.numero_prefactura,
						       md.hist_clinica_pac,
						       fun_busca_nombre_pte(md.hist_clinica_pac),
						       decode(md.tipo_doc,'FM','FACTURA TERCEROS','FACTURA CONCLINA')
						order by 1 desc";

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

		function lista_facturas_mes_hospital_metropolitano($vln_proveedor,$vlc_fecha_desde,$vlc_fecha_hasta)
		{

			$vlc_sql="SELECT trunc(md.fecha) fecha, --0
						     fun_nombre_cliente('01',nvl(md.numero_prefactura,'1')) cliente, --1
						     md.serie_fisico||'-'||md.no_fisico factura, --2
						     nvl(md.numero_prefactura,'S/N') prefactura, --3
						     nvl(md.hist_clinica_pac,0) historia_clinica, --4
						     nvl(fun_busca_nombre_pte(md.hist_clinica_pac),'S/N') paciente, --5
						     sum(nvl(md.monto,0)) monto, --6
						     sum(nvl(md.saldo,0)) saldo --7
						from arcpmd md
						where md.no_cia = '01'
						and md.no_prove = '$vln_proveedor'
						and md.tipo_doc in ( 'FM', 'FP', 'FH', 'FO', 'HC', 'HS' )
                        and trunc(md.fecha)>='$vlc_fecha_desde'
                        and trunc(md.fecha)<='$vlc_fecha_hasta'	
						and md.saldo > 0
						and md.anulado != 'S'
						and fun_nombre_pagador('01',nvl(md.numero_prefactura,'1')) not in('SEGUROS','INSTITUCIONES PÚBLICAS')
						group by trunc(md.fecha), 
						       md.serie_fisico||'-'||md.no_fisico,
						       md.numero_prefactura,
						       md.hist_clinica_pac,
						       fun_busca_nombre_pte(md.hist_clinica_pac),
						       decode(md.tipo_doc,'FM','FACTURA TERCEROS','FACTURA CONCLINA')
						order by 1 desc";

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

		function lista_facturas_mes_instituciones_publicas($vln_proveedor,$vlc_fecha_desde,$vlc_fecha_hasta)
		{

			$vlc_sql="SELECT trunc(md.fecha) fecha, --0
						     fun_nombre_cliente('01',nvl(md.numero_prefactura,'1')) cliente, --1
						     md.serie_fisico||'-'||md.no_fisico factura, --2
						     nvl(md.numero_prefactura,'S/N') prefactura, --3
						     nvl(md.hist_clinica_pac,0) historia_clinica, --4
						     nvl(fun_busca_nombre_pte(md.hist_clinica_pac),'S/N') paciente, --5
						     sum(nvl(md.monto,0)) monto, --6
						     sum(nvl(md.saldo,0)) saldo --7
						from arcpmd md
						where md.no_cia = '01'
						and md.no_prove = '$vln_proveedor'
						and md.tipo_doc in ('FP','FO')
                        and trunc(md.fecha)>='$vlc_fecha_desde'
                        and trunc(md.fecha)<='$vlc_fecha_hasta'	
						and md.saldo > 0
						and md.anulado != 'S'
						and fun_nombre_pagador('01',nvl(md.numero_prefactura,'1')) = 'INSTITUCIONES PÚBLICAS'
						group by trunc(md.fecha), 
						       md.serie_fisico||'-'||md.no_fisico,
						       md.numero_prefactura,
						       md.hist_clinica_pac,
						       fun_busca_nombre_pte(md.hist_clinica_pac),
						       decode(md.tipo_doc,'FM','FACTURA TERCEROS','FACTURA CONCLINA')
						order by 1 desc";

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

