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

		function listar_facturas($vgc_paciente,$vgn_factura,$vgn_proveedor)
		{

			if ( empty($vgc_paciente) ) {
				$vlc_sql= "	SELECT trunc(md.fecha) fecha,
							       fun_nombre_pagador('01',md.numero_prefactura) pagador,
							       fun_nombre_cliente('01',nvl(md.numero_prefactura,'1')) cliente,
							       md.serie_fisico||'-'||md.no_fisico factura,
							       nvl(md.numero_prefactura,'S/N') prefactura,
							       nvl(md.hist_clinica_pac,0) historia_clinica,
							       nvl(fun_busca_nombre_pte(md.hist_clinica_pac),'S/N') paciente,
							       sum(nvl(md.monto,0)) monto, --6
							       sum(nvl(md.saldo,0)) saldo --7
							from arcpmd md
							where md.no_cia = '01'
							and md.no_prove = '$vgn_proveedor'
							and md.no_fisico like '%$vgn_factura%'
							and md.tipo_doc in ( 'FM', 'FP', 'FH', 'FO', 'HC', 'HS' )
							and md.anulado != 'S'
							and md.saldo >= 0
							and trunc(md.fecha) >= '01/JAN/2017'
							group by trunc(md.fecha), 
							md.serie_fisico||'-'||md.no_fisico,
							md.numero_prefactura,
							md.hist_clinica_pac,
							fun_busca_nombre_pte(md.hist_clinica_pac),
							decode(md.tipo_doc,'FM','FACTURA TERCEROS','FACTURA CONCLINA')
							order by 1 desc";
				}				
			if ( empty($vgn_factura) ) {
				$vlc_sql= "	SELECT trunc(md.fecha) fecha,
       						fun_nombre_pagador('01',md.numero_prefactura) pagador,
       						fun_nombre_cliente('01',nvl(md.numero_prefactura,'1')) cliente,
       						md.serie_fisico||'-'||md.no_fisico factura,
       						nvl(md.numero_prefactura,'S/N') prefactura,
       						nvl(md.hist_clinica_pac,0) historia_clinica,
       						nvl(fun_busca_nombre_pte(md.hist_clinica_pac),'S/N') paciente,
       						sum(nvl(md.monto,0)) monto, --6
       						sum(nvl(md.saldo,0)) saldo --7
					from arcpmd md
					where md.no_cia = '01'
							and md.no_prove = '$vgn_proveedor'
							and ( fun_busca_nombre_pte(md.hist_clinica_pac) like upper('%$vgc_paciente%')
							or fun_busca_nombre_pte(md.hist_clinica_pac) like upper('%$vgc_paciente%') )
							and md.tipo_doc in ( 'FM', 'FP', 'FH', 'FO', 'HC', 'HS' )
							and md.anulado != 'S'
							and trunc(md.fecha) >= '01/JAN/2017'
							group by trunc(md.fecha), 
							md.serie_fisico||'-'||md.no_fisico,
							md.numero_prefactura,
							md.hist_clinica_pac,
							fun_busca_nombre_pte(md.hist_clinica_pac),
							decode(md.tipo_doc,'FM','FACTURA TERCEROS','FACTURA CONCLINA') 
							order by 1 desc";
			}
			if ( !empty($vgn_factura) && !empty($vgc_paciente) ) {
				$vlc_sql= "	SELECT trunc(md.fecha) fecha,
       						fun_nombre_pagador('01',md.numero_prefactura) pagador,
       						fun_nombre_cliente('01',nvl(md.numero_prefactura,'1')) cliente,
       						md.serie_fisico||'-'||md.no_fisico factura,
       						nvl(md.numero_prefactura,'S/N') prefactura,
       						nvl(md.hist_clinica_pac,0) historia_clinica,
       						nvl(fun_busca_nombre_pte(md.hist_clinica_pac),'S/N') paciente,
       						sum(nvl(md.monto,0)) monto, --6
       						sum(nvl(md.saldo,0)) saldo --7
					from arcpmd md
					where md.no_cia = '01'
							and md.no_prove = '$vgn_proveedor'
							and ( fun_busca_nombre_pte(md.hist_clinica_pac) like upper('%$vgc_paciente%')
							or fun_busca_nombre_pte(md.hist_clinica_pac) like upper('%$vgc_paciente%') )
							and md.no_fisico like '%$vgn_factura%'							
							and md.tipo_doc in ( 'FM', 'FP', 'FH', 'FO', 'HC', 'HS' )
							and md.anulado != 'S'
							and trunc(md.fecha) >= '01/JAN/2017'
							group by trunc(md.fecha), 
							md.serie_fisico||'-'||md.no_fisico,
							md.numero_prefactura,
							md.hist_clinica_pac,
							fun_busca_nombre_pte(md.hist_clinica_pac),
							decode(md.tipo_doc,'FM','FACTURA TERCEROS','FACTURA CONCLINA')
							order by 1 desc";
			}				

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

