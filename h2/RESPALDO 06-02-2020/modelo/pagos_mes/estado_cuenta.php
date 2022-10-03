<?php  
	class estado_cuenta
	{
		private $conexion;
		public function __construct()
		{
			require_once('/../conexion/conexion.php');
			$this->conexion= new conexion();
			$this->conexion->conectar();
		}

		function facturas_entregadas($vlc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta)
		{
			$vlc_sql="SELECT   A.no_prove codigo_medico, 
                               to_char(a.fecha,'DD/MM/YYYY') fecha_registro,    
                               A.TIPO_DOC,  
                               A.no_fisico numero_factura, 
                               a.detalle detalle_factura,
                               a.hist_clinica_pac,    
                               a.numero_prefactura,
                               a.no_docu,  --AUMENTAR NO_DOCU DE FM
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
                               (select fun_busca_nombre_pte(a.hist_clinica_pac) from dual),
                               tr.tipo_doc,tr.no_docu,tr.fecha     --AUMENTAR
                        FROM ARCPMD A, ARCPTD B, ARCPMP C,
--AUMENTAR TODO LO AMARILLO
                        (SELECT x.no_docu docu_tr,r.tipo_doc,r.no_docu,d.fecha
                                from arcpmd x,arcprd rd,arcpmd m,CP_AGRUPA_FACTURAS cp,arcprd r,arcpmd d
                                where --x.no_docu = '82709530115'
                                   x.no_docu = rd.no_refe
                                and   rd.tipo_doc = 'AG'
                                and   rd.no_docu = m.no_docu
                                and   m.anulado = 'N'
                                and   rd.tipo_doc = cp.tipo_refe
                                and   rd.no_docu = cp.no_refe
                                and   x.no_prove = cp.no_prove
                                and   cp.tipo_doc = r.tipo_refe
                                and   cp.no_docu = r.no_refe
                                and   r.tipo_doc in ('TR','CK','RH','DM')
                                and   r.tipo_doc = d.tipo_doc
                                and   r.no_docu = d.no_docu
                                and   d.anulado = 'N')tr
                        WHERE A.NO_CIA = '01'  
                        and a.no_prove between '$vlc_proveedor' and '$vlc_proveedor'
                        and trunc(A.fecha)>='$vgc_fecha_desde'
                        and trunc(A.fecha)<='$vgc_fecha_hasta'
                        --and a.no_fisico = '000012873'
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
                        and a.no_docu = tr.docu_tr (+)
                        group by tr.tipo_doc,tr.no_docu,tr.fecha ,  --AUMENTAR
                        a.no_docu,A.no_prove, a.fecha, A.TIPO_DOC, A.no_fisico,
                        a.hist_clinica_pac, 
                        a.numero_prefactura, a.numero_admision,
                        a.detalle
                        ORDER BY A.FECHA, a.no_fisico";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);
			oci_execute($vlc_resultados);
			
?>					

					<b>CONJUNTO CLINICO NACIONAL CONCLINA</b><br>
					<label>Desde: <?php echo $vgc_fecha_desde; ?> </label><br>
					<label>Hasta: <?php echo $vgc_fecha_hasta; ?> </label>
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
								<td align="left"><?php echo $vlc_respuesta[16]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[8]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[9]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[10]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[11]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[12]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[11]; ?></td>
								<td align="right" style="background-color: #cdd8d3;"><?php echo $vlc_respuesta[15]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[17]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[18]; ?></td>
								<td align="right"><?php echo $vlc_respuesta[19]; ?></td>

							</tr>
<?php
			}
?>		
						</tbody>
					</table>	
<?php				
		}

		function pagos_recibidos($vlc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta)
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
					
                    and trunc(md.fecha)>='$vgc_fecha_desde'
                    and trunc(md.fecha)<='$vgc_fecha_hasta'					

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

		function facturas_abiertas($vlc_proveedor,$vgc_fecha_desde,$vgc_fecha_hasta)
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

				and trunc(A.fecha)>='$vgc_fecha_desde'
                and trunc(A.fecha)<='$vgc_fecha_hasta'
				
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
									<td align="center"><?php echo $vlc_respuesta[2]; ?></td>	
									<td align="right"><?php echo $vlc_respuesta[3]; ?></td>
									<td align="center"><?php echo $vlc_respuesta[5]; ?></td>
									<td align="right">N/A</td>
									<td align="center"><?php echo $vlc_respuesta[4]; ?></td>
									<td align="center"><?php echo $vlc_respuesta[9]; ?></td>
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