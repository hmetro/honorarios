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

		function lista_pagos_mes($vln_proveedor,$vln_anio,$vln_mes)
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

		function imprimir_pdf($vlc_proveedor,$vlc_anio,$vlc_mes)
		{
			$vlc_sql="SELECT A.no_prove codigo_medico, 
       to_char(a.fecha,'DD/MM/YYYY') fecha_registro,    
       A.TIPO_DOC,  
       A.no_fisico numero_factura, 
       a.detalle detalle_factura,
       a.hist_clinica_pac,    
       a.numero_prefactura,
      (fun_nombre_dcto('01',nvl(a.hist_clinica_pac,0),nvl(a.numero_admision,0))),
      to_char( nvl((select NVL(sum(md.monto),0) 
                               from arcpmd md, arcptd td, arcprd rd, arcpmd mm
                               where md.no_cia = '01'
                               and md.numero_prefactura = a.numero_prefactura
                               and md.anulado = 'N'
                               and td.no_cia = md.no_cia
                               and td.tipo_doc = md.tipo_doc
                               and td.tipo_mov = 'D'
                               and td.ind_recorte = 'S'
                               and rd.no_cia = md.no_cia
                               and rd.tipo_doc = md.tipo_doc
                               and rd.no_docu = md.no_docu
                               and mm.no_cia = rd.no_cia
                               and mm.tipo_doc = rd.tipo_refe
                               and mm.no_prove = md.no_prove
                               and mm.no_docu = rd.no_refe
                               and mm.no_fisico = A.no_fisico
                               group by rd.tipo_refe, md.numero_prefactura, mm.no_fisico),0),'fm9990.00'),
      to_char ( nvl((select sum(md.monto) total_comision
                               from arcpmd md, arcptd td, arcprd rd, arcpmd mm
                               where md.no_cia = '01'
                               and md.tipo_doc = 'RT'
                               and md.numero_prefactura = a.numero_prefactura
                               and md.anulado = 'N'
                               and td.no_cia = md.no_cia
                               and td.tipo_doc = md.tipo_doc
                               and td.tipo_mov = 'D'
                               and rd.no_cia = md.no_cia
                               and rd.tipo_doc = md.tipo_doc
                               and rd.no_docu = md.no_docu
                               and mm.no_cia = rd.no_cia
                               and mm.tipo_doc = rd.tipo_refe
                               and mm.no_prove = md.no_prove
                               and mm.no_docu = rd.no_refe
                               and mm.no_fisico = A.no_fisico
                               group by rd.tipo_doc, md.no_prove, md.numero_prefactura, mm.no_fisico),0),'fm9990.00'),
       to_char( nvl((select sum(md.monto) total_contribucion
                               from arcpmd md, arcptd td, arcprd rd, arcpmd mm
                               where md.no_cia = '01'
                               and md.tipo_doc = 'CH'
                               and md.numero_prefactura = a.numero_prefactura
                               and md.anulado = 'N'
                               and td.no_cia = md.no_cia
                               and td.tipo_doc = md.tipo_doc
                               and td.tipo_mov = 'D'
                               and rd.no_cia = md.no_cia
                               and rd.tipo_doc = md.tipo_doc
                               and rd.no_docu = md.no_docu
                               and mm.no_cia = rd.no_cia
                               and mm.tipo_doc = rd.tipo_refe
                               and mm.no_prove = md.no_prove
                               and mm.no_docu = rd.no_refe
                               and mm.no_fisico = A.no_fisico
                               group by rd.tipo_doc, md.no_prove, md.numero_prefactura, mm.no_fisico),0),'fm9990.00'),
       to_char( nvl((select sum(rd.monto) total_descuento
                               from arcpmd md, arcptd td, arcprd rd, arcpmd mm
                               where md.no_cia = '01'
                               and md.tipo_doc IN ( 'D1' , 'ND' )
                               and md.no_prove = A.no_prove
                               and md.anulado = 'N'
                               and td.no_cia = md.no_cia
                               and td.tipo_doc = md.tipo_doc
                               and td.tipo_mov = 'D'
                               and rd.no_cia = md.no_cia
                               and rd.tipo_doc = md.tipo_doc
                               and rd.no_docu = md.no_docu
                               and mm.no_cia = rd.no_cia
                               and mm.tipo_doc = rd.tipo_refe
                               and mm.no_prove = md.no_prove
                               and mm.no_docu = rd.no_refe
                               and mm.no_fisico = A.no_fisico
                               group by rd.tipo_doc, md.no_prove, md.numero_prefactura, mm.no_fisico),0),'fm9990.00'),
                               a.numero_admision, 
                               to_char (sum(nvl(a.monto,0)),'fm9990.00') MONTO_FACTURA,
                               to_char (sum(NVL(A.SALDO,0)),'fm9990.00') SALDO,
                               (select fun_busca_nombre_pte(a.hist_clinica_pac) from dual)  
                        FROM ARCPMD A, ARCPTD B, ARCPMP C  
                        WHERE A.NO_CIA = '01'  
                        --AND TRUNC(A.FECHA) BETWEEN '01-ENE-2019' AND '31-MAY-2019' 
                        and a.no_prove between '$vlc_proveedor' and '$vlc_proveedor'
                        and to_char(A.fecha,'YYYY') = '$vlc_anio'
            and to_char(A.fecha,'MM') = '$vlc_mes'
                        and nvl(a.anulado,'N') != 'S'
                        AND A.NO_CIA = B.NO_CIA
                        AND A.TIPO_DOC = B.TIPO_DOC
                        AND A.NO_CIA = C.NO_CIA
                        AND A.NO_PROVE = C.NO_PROVE
                        and b.tipo_doc not in ('PH','AN','AG')
                        and b.documento in ( 'F' , 'H' )
                        and b.tipo_mov in ( 'C' )
                        and a.no_docu not in( select no_refe from arcprd 
                        where no_refe = a.no_docu and tipo_doc in ( 'AN')
                        and no_cia = a.no_cia)
                        group by A.no_prove, a.fecha, A.TIPO_DOC, A.no_fisico,
                        a.hist_clinica_pac, 
                        a.numero_prefactura, a.numero_admision,
                        a.detalle
                        ORDER BY A.FECHA, a.no_fisico";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);
			
?>					

					<b>CONJUNTO CLINICO NACIONAL CONCLINA</b><br>
					<label>Movimientos del Mes </label><br>
					<label>Mes: <?php echo $vlc_mes; ?> </label><br>
					<label>Año: <?php echo $vlc_anio; ?> </label>
					<hr>
					<h4>1 - FACTURAS ENTREGADAS</h4>
					<table border="0" style="font-size: 8.5px; width: 100%;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th colspan="3" style="border-bottom: 0.3px solid #625A58;">Información de Pago</th>
							</tr>
							<tr align="center" >
								<th>Tipo</th>
								<th>No Factura</th>
								<th>Fecha</th>
								<th>H.C.U</th>
								<th>Apellidos y Nombres del Paciente</th>
								<th>Plan-convenio</th>
								<th>Total Factura</th>
								<th>COPAGO</th>
								<th>Descuento Tart. Créd.</th>
								<th>Contribución 10%</th>
								<th>Descuentos Varios</th>
								<th>saldo</th>
								<th>Tipo</th>
								<th>Número</th>
								<th>Fecha</th>
							</tr>
						</thead>

						<tbody align="left">
<?php							
			while ($vlc_respuesta=oci_fetch_array($vlc_resultados)) 
			{

?>
							<tr align="left">
								<td align="left"><?php echo $vlc_respuesta[2]; ?></td>	
								<td align="left"><?php echo $vlc_respuesta[3]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[5]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[15]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[7]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[13]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[8]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[9]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[10]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[11]; ?></td>
								<td align="right" style="background-color: #cdd8d3;"><?php echo $vlc_respuesta[14]; ?></td>
								<td align="right"><?php echo "N/A"; ?></td>
								<td align="right"><?php echo "N/A"; ?></td>
								<td align="right"><?php echo "N/A"; ?></td>

							</tr>
<?php
			}
?>		
						</tbody>
					</table>	
<?php				
		}

		function imprimir_pdf_2($vlc_proveedor,$vlc_anio,$vlc_mes)
		{
			$vlc_sql="select a.*,b.*,c.*
					from
					(select distinct md.no_prove,md.comp_ret,
					md.no_docu documento_pago,
					md.tipo_doc tipo_doc_pago,  --TR/CK
					to_char(md.fecha,'DD/MM/YYYY') fecha_pago,  --FECHA
					md.fecha,
					md.no_fisico numero_pago,  --NUMERO
					md.monto monto_pago      --VALOR
					from arcpmd md, arcprd rd, arcptd td
					where md.no_cia = '01'
					and md.no_prove = '$vlc_proveedor'
					
					and to_char(md.fecha,'YYYY') = '$vlc_anio'
					and to_char(md.fecha,'MM') = '$vlc_mes'
					
					and md.anulado = 'N'
					and rd.no_cia = md.no_cia
					and rd.no_prove = md.no_prove
					and rd.tipo_doc = md.tipo_doc
					and rd.no_docu = md.no_docu
					and rd.no_prove = md.no_prove
					and td.no_cia = md.no_cia
					and td.tipo_doc = md.tipo_doc
					and td.tipo_mov = 'D'
					and td.documento = 'K'
					order by md.fecha)a,
					--RETENCIONES
					(select md.tipo_doc tipo_pago, md.no_docu docu_pago, ph.no_prove, ph.tipo_doc tipo_agrupacion, ph.no_docu docu_agrupacion,
					ph.comp_ret   --NO RETENCION
					from arcpmd md, arcprd rd, arcpmd ph, arcptd td
					where md.no_cia = '01'
					and md.no_prove between '$vlc_proveedor' and '$vlc_proveedor'
					--and md.tipo_doc = 'CK'
					--and md.no_docu = '31444632'
					and md.anulado = 'N'
					and rd.no_cia = md.no_cia
					and rd.no_prove = md.no_prove
					and rd.tipo_doc = md.tipo_doc
					and rd.no_docu = md.no_docu
					and ph.no_cia = rd.no_cia
					and ph.no_prove = rd.no_prove
					and ph.tipo_doc = rd.tipo_refe
					and ph.no_docu = rd.no_refe
					and ph.anulado = 'N'
					and td.no_cia = md.no_cia
					and td.tipo_doc = md.tipo_doc
					-- PARA SELECCIONAR SOLO TIPOS PAGOS
					and td.tipo_mov = 'D'
					and td.documento = 'K'
					order by comp_ret)b,
					(select ti.no_prove, ti.tipo_doc, ti.no_docu, ti.clave, im.descripcion descripcion_retencion
					, ti.base, ti.porcentaje, --PORCENTAJE
					ti.monto monto_retencion  --VALOR
					from arcpti ti, arcgimp im
					where ti.no_cia = '01'
					and ti.no_prove = '$vlc_proveedor'
					--and ti.tipo_doc = 'PH'
					--and ti.no_docu = '85624033'
					and ti.ind_imp_ret = 'R'
					and im.no_cia = ti.no_cia
					and im.clave = ti.clave)c
					where a.no_prove = b.no_prove
					and   a.no_prove = c.no_prove
					and   a.documento_pago = b.docu_pago
					and   b.docu_agrupacion = c.no_docu";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);
			
?>					
					<h4>2 - PAGOS RECIBIDOS - RETENCIONES - DESCUENTOS</h4>
					<table border="0" style="font-size: 8.5px; width: 100%;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr>
								<th colspan="4" style="border-bottom: 0.3px solid #625A58;"><b>PAGOS RECIBIDOS</b></th>
								<th colspan="4" style="border-bottom: 0.3px solid #625A58;"><b>RETENCIONES</b></th>
								<th colspan="2" style="border-bottom: 0.3px solid #625A58;"><b>DESCUENTOS</b></th>
							</tr>
							<tr align="center" style="height: 25px;">
								<th>TR / CK</th>
								<th>Número</th>
								<th>Fecha</th>
								<th style="border-right: 0.3px solid #625A58;">Valor</th>
								<th>N° Retención</th>
								<th>Facturas Aplicadas</th>
								<th>Porcentaje</th>
								<th style="border-right: 0.3px solid #625A58;">Valor</th>
								<th>Descripción Descuento</th>
								<th>Valor</th>
							</tr>
						</thead>

						<tbody align="left">
<?php							
			while ($vlc_respuesta=oci_fetch_array($vlc_resultados)) 
			{

?>
							<tr align="left">
								<td align="center"><?php echo $vlc_respuesta[3]; ?></td>	
								<td align="right"><?php echo $vlc_respuesta[6]; ?></td>
								<td align="center"><?php echo $vlc_respuesta[4]; ?></td>
								<td align="right" ><?php echo $vlc_respuesta[7]; ?></td>
								<td align="center" ><?php echo $vlc_respuesta[13]; ?></td>
								<td align="left"><?php echo "N/A" ?></td>
								<td align="center"><?php echo $vlc_respuesta[20]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[21]; ?></td>
								<td align="left" ><?php echo "N/A"; ?></td>
								<td align="right"><?php echo "N/A"; ?></td>
							</tr>
<?php
			}
?>		
						</tbody>
					</table>	
<?php				
		}

function imprimir_pdf_3($vlc_proveedor,$vlc_anio,$vlc_mes)
		{
			$vlc_sql="SELECT A.no_prove codigo_medico_fa, 
				       to_char(a.fecha,'DD/MM/YYYY') fecha_registro_fa, --FECHA
				       A.TIPO_DOC tipo_doc_fa,   --TIPO
				       A.no_fisico numero_factura_fa,  --NO FACTURA
				       a.detalle detalle_factura_fa,
				       a.hist_clinica_pac hist_clinica_pac_fa,  --H.C.U.
				       a.numero_prefactura numero_prefactura_fa,
				       a.numero_admision numero_admision_fa,
				       sum(nvl(a.monto,0)) MONTO_FACTURA_FA,
				       sum(NVL(A.SALDO,0)) SALDO_FA  --SALDO
				FROM ARCPMD A, ARCPTD B, ARCPMP C
				WHERE A.NO_CIA = '01'  
				and to_char(A.fecha,'YYYY') < '$vlc_anio'
				and to_char(A.fecha,'MM') < '$vlc_mes'
				and a.no_prove = '$vlc_proveedor'
				and nvl(a.anulado,'N') != 'S'
				AND A.NO_CIA = B.NO_CIA
				AND A.TIPO_DOC = B.TIPO_DOC
				AND A.NO_CIA = C.NO_CIA
				AND A.NO_PROVE = C.NO_PROVE
				--
				-- SOLO DOCUMENTOS CON SALDO
				--
				and a.saldo > 0
				and b.tipo_doc not in ('PH','AN','AG')
				and b.documento in ( 'F' , 'H' )
				and b.tipo_mov in ( 'C' )
				and a.no_docu not in( select no_refe from arcprd 
				where no_refe = a.no_docu and tipo_doc in ( 'AN')
				and no_cia = a.no_cia)
				group by A.no_prove, a.fecha, A.TIPO_DOC, A.no_fisico,
				a.hist_clinica_pac, 
				a.numero_prefactura, a.numero_admision,
				a.detalle
				ORDER BY A.FECHA, a.no_fisico";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);
			
?>					
					<h4>3 - FACTURAS ABIERTAS MESES ANTERIORES</h4>
					<table border="0" style="font-size: 8.5px; width: 100%;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr align="center" style="height: 25px;">
								<th>Tipo</th>
								<th>N° Factura</th>
								<th>H.C.U.</th>
								<th>Apellidos y Nombres del Paciente</th>
								<th>Plan - Convenio</th>
								<th>Saldo</th>
							</tr>
						</thead>

						<tbody align="left">
<?php							
			while ($vlc_respuesta=oci_fetch_array($vlc_resultados)) 
			{

?>
							<tr align="left">
								<td align="center"><?php echo $vlc_respuesta[0]; ?></td>	
								<td align="right"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="center"><?php echo $vlc_respuesta[2]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[3]; ?></td>
								<td align="center"><?php echo $vlc_respuesta[4]; ?></td>
								<td align="center"><?php echo $vlc_respuesta[5]; ?></td>
								<td align="right" ><?php echo $vlc_respuesta[6]; ?></td>
							</tr>
<?php
			}
?>		
						</tbody>
					</table>

					<h4>CONCEPTO DE DOCUMENTOS</h4>

					<table border="0">
						<tr>
							<td>FM - Facturas a Terceros</td>
							<td>DM - Descuento de Médicos</td>
						</tr>
						<tr>
							<td>FH - Factura Chequeo y Otros Honorarios</td>
							<td>D1 - Descuento Ajuste</td>
						</tr>
						<tr>
							<td>FO - Facturas SOAT</td>
							<td>TR - Pago con Transferencia</td>
						</tr>
						<tr>
							<td>FP - Facturas a Conclina</td>
							<td>CK - Pago con Cheque</td>
						</tr>
						<tr>
							<td>DV - Dividendo</td>
						</tr>
					</table>	
<?php				
		}						

	}
	
?>