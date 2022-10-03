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

		function lista_pagos_mes($vln_proveedor,$vlc_fecha_desde,$vlc_fecha_hasta)
		{

			$vlc_sql="SELECT c.fecha,	--0
						     a.tipo_doc, --1
						     b.descripcion, --2
						     --c.no_fisico, --3
						     nvl(ce.cta_bco_transfe,'S/N') cta_bancaria, --4
						     a.no_docu no_transaccion, --5
						     sum(nvl(a.monto,0)) monto,	--6					       
						     fun_subtotal_pago(a.no_cia,a.no_docu) subtotal, --7 FUNCION DE SUBTOTAL
						     fun_retencion_pago(a.no_cia,a.no_docu) retencion, --8 FUNCION DE RETENCION
						     a.no_prove no_prove --9
						from arcprd a, arcptd b, arcpmd c, arckce ce
						where a.no_cia = '01'
						and nvl(c.anulado,'N') = 'N'
						and a.no_prove = '$vln_proveedor'
						and c.tipo_doc in ('CK','TR')
						and a.no_cia = b.no_cia
						and a.tipo_doc = b.tipo_doc
						and a.no_cia = c.no_cia
						and a.no_docu = c.no_docu

                        and trunc(c.fecha)>='$vlc_fecha_desde'
                        and trunc(c.fecha)<='$vlc_fecha_hasta'

						and ce.no_cia = c.no_cia
						and ce.no_secuencia = to_number(c.no_secuencia)
						group by a.no_cia, c.fecha, a.tipo_doc, b.descripcion, c.no_fisico, ce.cta_bco_transfe, a.no_docu, a.no_prove
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
	

		function lista_pagos_paciente($vln_proveedor,$vlc_paciente)
		{

			$vlc_sql="SELECT md.hist_clinica_pac,
      c.fecha,  --0
                 a.tipo_doc, --1
                 b.descripcion, --2
                 --c.no_fisico, --3
                 nvl(ce.cta_bco_transfe,'S/N') cta_bancaria, --4
                 a.no_docu no_transaccion, --5
                 sum(nvl(a.monto,0)) monto,  --6                 
                 fun_subtotal_pago(a.no_cia,a.no_docu) subtotal, --7 FUNCION DE SUBTOTAL
                 fun_retencion_pago(a.no_cia,a.no_docu) retencion, --8 FUNCION DE RETENCION
                 a.no_prove no_prove --9
            from arcprd a, arcptd b, arcpmd c, arckce ce,arcpmd md
            where a.no_cia = '01'
            and nvl(c.anulado,'N') = 'N'
           -- and a.no_docu = '87853833'
            and a.no_prove = '$vln_proveedor'
            and c.tipo_doc in ('CK','TR')
            and a.no_cia = b.no_cia
            and a.tipo_doc = b.tipo_doc
            and a.no_cia = c.no_cia
            and a.no_docu = c.no_docu
            and a.no_refe = md.no_docu     
            and ( fun_busca_nombre_pte(md.hist_clinica_pac) like upper('%$vlc_paciente%')
            or fun_busca_nombre_pte(md.hist_clinica_pac) like upper('%$vlc_paciente%') )
            and ce.no_cia = c.no_cia
            and ce.no_secuencia = to_number(c.no_secuencia)
            and md.origen = 'FA'
            group by md.hist_clinica_pac,
            a.no_cia, c.fecha, a.tipo_doc, b.descripcion, c.no_fisico, ce.cta_bco_transfe, a.no_docu, a.no_prove
            order by c.fecha desc
";

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

		function lista_pagos_factura($vln_proveedor,$vln_factura)
		{

			$vlc_sql="SELECT c.fecha,	--0
						     a.tipo_doc, --1
						     b.descripcion, --2
						     --c.no_fisico, --3
						     nvl(ce.cta_bco_transfe,'S/N') cta_bancaria, --4
						     a.no_docu no_transaccion, --5
						     sum(nvl(a.monto,0)) monto,	--6					       
						     fun_subtotal_pago(a.no_cia,a.no_docu) subtotal, --7 FUNCION DE SUBTOTAL
						     fun_retencion_pago(a.no_cia,a.no_docu) retencion, --8 FUNCION DE RETENCION
						     a.no_prove no_prove --9
						from arcprd a, arcptd b, arcpmd c, arckce ce
						where a.no_cia = '01'
						and nvl(c.anulado,'N') = 'N'
						and a.no_prove = '$vln_proveedor'
						and c.tipo_doc in ('CK','TR')
						and a.no_cia = b.no_cia
						and a.tipo_doc = b.tipo_doc
						and a.no_cia = c.no_cia
						and a.no_docu = c.no_docu
						and to_char(c.fecha,'YYYY') = '$vln_anio'
						and to_char(c.fecha,'MM') = '$vln_mes'
						and ce.no_cia = c.no_cia
						and ce.no_secuencia = to_number(c.no_secuencia)
						group by a.no_cia, c.fecha, a.tipo_doc, b.descripcion, c.no_fisico, ce.cta_bco_transfe, a.no_docu, a.no_prove
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

		function lista_pagos_anio($vln_proveedor,$vln_anio)
		{

			$vlc_sql="SELECT c.fecha,	--0
						     a.tipo_doc, --1
						     b.descripcion, --2
						     --c.no_fisico, --3
						     nvl(ce.cta_bco_transfe,'S/N') cta_bancaria, --4
						     a.no_docu no_transaccion, --5
						     sum(nvl(a.monto,0)) monto,	--6					       
						     fun_subtotal_pago(a.no_cia,a.no_docu) subtotal, --7 FUNCION DE SUBTOTAL
						     fun_retencion_pago(a.no_cia,a.no_docu) retencion, --8 FUNCION DE RETENCION
						     a.no_prove no_prove --9
						from arcprd a, arcptd b, arcpmd c, arckce ce
						where a.no_cia = '01'
						and nvl(c.anulado,'N') = 'N'
						and a.no_prove = '$vln_proveedor'
						and c.tipo_doc in ('CK','TR')
						and a.no_cia = b.no_cia
						and a.tipo_doc = b.tipo_doc
						and a.no_cia = c.no_cia
						and a.no_docu = c.no_docu
						and to_char(c.fecha,'YYYY') = '$vln_anio'
						and ce.no_cia = c.no_cia
						and ce.no_secuencia = to_number(c.no_secuencia)
						group by a.no_cia, c.fecha, a.tipo_doc, b.descripcion, c.no_fisico, ce.cta_bco_transfe, a.no_docu, a.no_prove
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

		function lista_pagos_total($vln_proveedor)
		{

			$vlc_sql="SELECT c.fecha,	--0
						     a.tipo_doc, --1
						     b.descripcion, --2
						     --c.no_fisico, --3
						     nvl(ce.cta_bco_transfe,'S/N') cta_bancaria, --4
						     a.no_docu no_transaccion, --5
						     sum(nvl(a.monto,0)) monto,	--6					       
						     fun_subtotal_pago(a.no_cia,a.no_docu) subtotal, --7 FUNCION DE SUBTOTAL
						     fun_retencion_pago(a.no_cia,a.no_docu) retencion, --8 FUNCION DE RETENCION
						     a.no_prove no_prove --9
						from arcprd a, arcptd b, arcpmd c, arckce ce
						where a.no_cia = '01'
						and nvl(c.anulado,'N') = 'N'
						and a.no_prove = '$vln_proveedor'
						and c.tipo_doc in ('CK','TR')
						and a.no_cia = b.no_cia
						and a.tipo_doc = b.tipo_doc
						and a.no_cia = c.no_cia
						and a.no_docu = c.no_docu
						and to_char(c.fecha,'YYYY') >= '2016'
						and ce.no_cia = c.no_cia
						and ce.no_secuencia = to_number(c.no_secuencia)
						group by a.no_cia, c.fecha, a.tipo_doc, b.descripcion, c.no_fisico, ce.cta_bco_transfe, a.no_docu, a.no_prove
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


		function lista_subtotal($vln_transaccion)
		{

			$vlc_sql=" select sum(md.subtotal) subtotal,
						       sum(md.tot_ret) retencion,
						       sum(md.monto) monto
						from arcpmd md
						where md.no_cia = '01'
						and md.anulado != 'S'
						and ( md.tipo_doc, md.no_docu ) in ( select rd.tipo_refe, rd.no_refe
						                                     from arcprd rd
						                                     where rd.no_cia = '01'
						                               and rd.no_docu = '$vln_transaccion' )
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

		function lista_factura_detalle($vlc_proveedor,$vlc_fecha,$vlc_transaccion)
		{

			$vlc_sql="	--
						-- INFORMACIÓN FACTURAS CANCELADAS 
						-- 
						-- HONORARIOS
						select a.fecha,
						       a.serie_fisico||'-'||a.no_fisico factura,
						       a.numero_prefactura prefactura,
						       a.hist_clinica_pac historia_clinica,
						       a.numero_admision admision,
						       fun_busca_nombre_pte(a.hist_clinica_pac) paciente,
						       a.no_docu transaccion,
						       nvl(a.monto,0) monto,
						       nvl(rd.monto,0) cancela,
						       nvl(a.saldo,0) saldo
						from arcpmd a, arcptd b, arcpmp c, cp_honorarios_medicos_hist f, int_documentos_cp e, arcpmd n, arcprd rd, arcprd pa
						where a.no_cia = '01'
						and a.no_cia = c.no_cia
						and a.no_prove = c.no_prove
						and a.ind_act != 'P' 
						and a.anulado = 'N'
						and f.no_prove between '$vlc_proveedor' and '$vlc_proveedor'
						and a.no_cia = b.no_cia 
						and a.tipo_doc = b.tipo_doc 
						and a.no_cia = f.no_cia
						and a.no_docu = f.no_docu
						and a.no_cia = e.no_cia(+)
						and a.no_docu = e.no_docu(+)
						and f.no_cia = n.no_cia
						and f.no_docu_ph = n.no_docu
						and rd.no_cia = f.no_cia
						and rd.no_docu = f.no_docu_ag
						and rd.no_refe = a.no_docu
						and pa.no_cia =  n.no_cia
						and pa.no_docu = '$vlc_transaccion'
						and pa.no_refe = n.no_docu
						union
						-- OTRAS FACTURAS
						select a.fecha,
						       a.serie_fisico||'-'||a.no_fisico factura,
						       nvl(a.numero_prefactura,'S/N') prefactura,
     						   nvl(a.hist_clinica_pac,0) historia_clinica,
     						   nvl(a.numero_admision,0) admision,
						       substr(a.detalle,1,50) paciente,
						       tr.no_docu transaccion,
						       sum(nvl(a.monto,0)) monto,
						       sum(nvl(rd.monto,0)) cancela,
						       sum(nvl(a.saldo,0)) saldo
						from arcpmd a, arcprd rd, arcpmd tr
						where a.no_cia = '01'
						and a.no_prove = '$vlc_proveedor'
						and a.tipo_doc not in ( 'PH' )
						and a.ind_act != 'P' 
						and a.anulado = 'N'
						and rd.no_cia = a.no_cia
						and rd.tipo_refe = a.tipo_doc
						and rd.no_refe = a.no_docu
						and rd.tipo_doc in ( 'CK', 'TR' )
						and tr.no_cia = rd.no_cia
						and tr.tipo_doc = rd.tipo_doc
						and tr.no_docu = rd.no_docu
						and tr.no_prove = rd.no_prove
						and trunc(tr.fecha) = '$vlc_fecha'
						and tr.no_docu = '$vlc_transaccion'
						group by a.fecha, a.serie_fisico||'-'||a.no_fisico,
						       a.numero_prefactura, a.hist_clinica_pac,
						       a.numero_admision,
						       a.detalle,       
						       tr.no_docu
						order by 1 desc";

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

		function factura_detalle_total($vlc_proveedor,$vlc_fecha,$vlc_transaccion)
		{

			$vlc_sql="	--
            -- INFORMACIÓN FACTURAS CANCELADAS 
           				 -- 
           				 -- HONORARIOS
           				 select sum(a.monto) monto , sum(a.cancela) cancela , sum(a.saldo) saldo
           				 from (
           				 select sum(nvl(a.monto,0)) monto,
           				        sum(nvl(rd.monto,0)) cancela,
           				        sum(nvl(a.saldo,0)) saldo
           				 from arcpmd a, arcptd b, arcpmp c, cp_honorarios_medicos_hist f, int_documentos_cp e, arcpmd n, arcprd rd, arcprd pa
           				 where a.no_cia = '01'
           				 and a.no_cia = c.no_cia
           				 and a.no_prove = c.no_prove
           				 and a.ind_act != 'P' 
           				 and a.anulado = 'N'
           				 and f.no_prove between '$vlc_proveedor' and '$vlc_proveedor'
           				 and a.no_cia = b.no_cia 
           				 and a.tipo_doc = b.tipo_doc 
           				 and a.no_cia = f.no_cia
           				 and a.no_docu = f.no_docu
           				 and a.no_cia = e.no_cia(+)
           				 and a.no_docu = e.no_docu(+)
           				 and f.no_cia = n.no_cia
           				 and f.no_docu_ph = n.no_docu
           				 and rd.no_cia = f.no_cia
           				 and rd.no_docu = f.no_docu_ag
           				 and rd.no_refe = a.no_docu
           				 and pa.no_cia =  n.no_cia
           				 and pa.no_docu = '$vlc_transaccion'
           				 and pa.no_refe = n.no_docu 
           				 union
           				 -- OTRAS FACTURAS
           				 select sum(nvl(a.monto,0)) monto,
           				        sum(nvl(rd.monto,0)) cancela,
           				        sum(nvl(a.saldo,0)) saldo
           				 from arcpmd a, arcprd rd, arcpmd tr
           				 where a.no_cia = '01'
           				 and a.no_prove = '$vlc_proveedor'
           				 and a.tipo_doc not in ( 'PH' )
           				 and a.ind_act != 'P' 
           				 and a.anulado = 'N'
           				 and rd.no_cia = a.no_cia
           				 and rd.tipo_refe = a.tipo_doc
           				 and rd.no_refe = a.no_docu
           				 and rd.tipo_doc in ( 'CK', 'TR' )
           				 and tr.no_cia = rd.no_cia
           				 and tr.tipo_doc = rd.tipo_doc
           				 and tr.no_docu = rd.no_docu
           				 and tr.no_prove = rd.no_prove
           				 and trunc(tr.fecha) = '$vlc_fecha'
           				 and tr.no_docu = '$vlc_transaccion'
           				 group by a.fecha, a.serie_fisico||'-'||a.no_fisico,
           				        a.numero_prefactura, a.hist_clinica_pac,
           				        a.numero_admision,
           				        a.detalle,       
           				        tr.no_docu  
           				 order by 1 desc ) a";

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

		function enviar_planilla()
		{

			$vlc_sql="begin PRO_ENVIA_PLANILLA_MEDICO('rsalazar','orden','RCP001b.PDF');  end;";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);
		}
	}

?>						