<?php
class planillas_pago
{
    private $conexion;
    public $vln_suma_factura_total = 0.00;
    public $vln_suma_copago_total = 0.00;
    public $vln_suma_anticipo_total = 0.00;
    public $vln_suma_retencion_total = 0.00;
    public $vln_suma_descuento_total = 0.00;
    public $vln_suma_comprobante_total = 0.00;
    public function __construct()
    {
        require_once '/../conexion/conexion.php';
        $this->conexion = new conexion();
        $this->conexion->conectar();
    }

    public function validar_transaccion($vln_proveedor, $vlc_numero_transaccion)
    {

        $vlc_sql = "SELECT
				   a.tipo_refe,
				   a.no_refe,
				   a.no_docu no_transaccion
				from arcprd a, arcptd b, arcpmd c, arckce ce
				where a.no_cia = '01'
				and nvl(c.anulado,'N') = 'N'
				and a.no_prove = '$vln_proveedor'
				and c.tipo_doc in ('CK','TR')
				and a.no_cia = b.no_cia
				and a.tipo_doc = b.tipo_doc
				and a.no_cia = c.no_cia
				and a.no_docu = c.no_docu
				and a.no_docu = '$vlc_numero_transaccion'
				and ce.no_cia = c.no_cia
				and ce.no_secuencia = to_number(c.no_secuencia)
				group by a.tipo_refe,a.no_refe,a.no_cia, c.fecha, a.tipo_doc, b.descripcion, c.no_fisico, ce.cta_bco_transfe, a.no_docu, a.no_prove
				order by c.fecha desc";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);

        $vlc_arreglo = array();
        while ($vlc_respuesta = (oci_fetch_array($vlc_resultados))) {
            $vlc_arreglo[] = $vlc_respuesta;
        }

        return $vlc_arreglo;
        $this->conexion->cerrar();
    }

    public function consultar_numero_referencia($vln_proveedor, $vgn_numero_transaccion)
    {

        $vlc_sql = "SELECT
					   a.no_refe
					from arcprd a, arcptd b, arcpmd c, arckce ce
					where a.no_cia = '01'
					and nvl(c.anulado,'N') = 'N'
					and a.no_prove = '$vln_proveedor'
					and c.tipo_doc in ('CK','TR')
					and a.no_cia = b.no_cia
					and a.tipo_doc = b.tipo_doc
					and a.no_cia = c.no_cia
					and a.no_docu = c.no_docu
					and a.no_docu = '$vgn_numero_transaccion'
					and ce.no_cia = c.no_cia
					and ce.no_secuencia = to_number(c.no_secuencia)
					group by a.tipo_refe,a.no_refe,a.no_cia, c.fecha, a.tipo_doc, b.descripcion, c.no_fisico, ce.cta_bco_transfe, a.no_docu, a.no_prove
					order by c.fecha desc";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);

        $vlc_arreglo = array();
        while ($vlc_respuesta = (oci_fetch_array($vlc_resultados))) {
            $vlc_arreglo[] = $vlc_respuesta;
        }

        return $vlc_arreglo;
        $this->conexion->cerrar();
    }

    public function guardar_funcion_auditoria($vln_proveedor, $vlc_funcion_nombre, $vlc_ip)
    {
        $vlc_sql = "insert into CP_BITACORA_AUD_APP
            			(no_prove,
            				funcion_nombre,
            				ip_acceso)
            			VALUES
            			('$vln_proveedor',
            				'$vlc_funcion_nombre',
            				'$vlc_ip')";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
    }

    public function validar_transaccion_descuento($vln_proveedor, $vlc_numero_transaccion)
    {

        $vlc_sql = "SELECT
						a.tipo_refe,
						a.no_docu,
						a.no_refe
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
						and a.no_docu in ('$vlc_numero_transaccion')
						order by c.fecha desc";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);

        $vlc_arreglo = array();
        while ($vlc_respuesta = (oci_fetch_array($vlc_resultados))) {
            $vlc_arreglo[] = $vlc_respuesta;
        }

        return $vlc_arreglo;
        $this->conexion->cerrar();
    }

    public function consultar_numero_referencia_descuento($vln_proveedor, $vgn_numero_transaccion)
    {

        $vlc_sql = "SELECT
					a.no_refe
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
					and a.no_docu in ('$vgn_numero_transaccion')
					order by c.fecha desc";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);

        $vlc_arreglo = array();
        while ($vlc_respuesta = (oci_fetch_array($vlc_resultados))) {
            $vlc_arreglo[] = $vlc_respuesta;
        }

        return $vlc_arreglo;
        $this->conexion->cerrar();
    }

    public function consultar_transaccion_fm($vlc_proveedor, $vgc_fecha_transaccion, $vgn_numero_transaccion)
    {

        $vlc_sql = "select a.fecha,
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
					and pa.no_docu = '$vgn_numero_transaccion'
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
					and trunc(tr.fecha) = '$vgc_fecha_transaccion'
					and tr.no_docu = '$vgn_numero_transaccion'
					group by a.fecha, a.serie_fisico||'-'||a.no_fisico,
					       a.numero_prefactura, a.hist_clinica_pac,
					       a.numero_admision,
					       a.detalle,
					       tr.no_docu
					order by FECHA asc";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);

        $vlc_arreglo = array();
        while ($vlc_respuesta = (oci_fetch_array($vlc_resultados))) {
            $vlc_arreglo[] = $vlc_respuesta;
        }

        return $vlc_arreglo;
        $this->conexion->cerrar();
    }

    public function facturas_planilla($vlc_proveedor, $vgc_fecha_transaccion, $vgn_numero_transaccion)
    {
        $vlc_sql = "select a.fecha,
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
					and pa.no_docu = '$vgn_numero_transaccion'
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
					and trunc(tr.fecha) = '$vgc_fecha_transaccion'
					and tr.no_docu = '$vgn_numero_transaccion'
					group by a.fecha, a.serie_fisico||'-'||a.no_fisico,
					       a.numero_prefactura, a.hist_clinica_pac,
					       a.numero_admision,
					       a.detalle,
					       tr.no_docu
					order by FECHA asc";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>

					<table border="0" style="width: 100% !important; font-size: 12px !important;">
						<tr>
							<td colspan="5"><b>CONJUNTO CLINICO NACIONAL CONCLINA C.A.</b></td>
							<td>Cuentas por Pagar</td>
						</tr>
						<tr>
							<td>Planilla del Médico Histórico (Abonos)</td>
							<td><b>Fecha Inicial Proceso: </b></td>
							<td><b>01/08/2004</b></td>
							<td><b>Fecha de Pago: </b></td>
							<td><b><?php echo $vgc_fecha_transaccion; ?></b></td>
							<td>RCP001b.RDF</td>
						</tr>
						<tr>
							<td colspan="1"></td>
							<td><b>Fecha Final Proceso: </b></td>
							<td><b>23/11/2004</b></td>
						</tr>
					</table>
					<hr>
					<label style="font-size: 12px !important;"><b>Médico: <?php echo $vlc_proveedor; ?></b></label>
					<h5>FACTURAS</h5>
					<table border="0" style="font-size: 10px; width: 100%;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr align="center" >
								<th align="left">Fecha</th>
								<th align="left">Factura</th>
								<th align="left">Prefactura</th>
								<th align="left">Transac.</th>
								<th align="left">Hist. Clínica</th>
								<th align="left">Admisión</th>
								<th align="left">Paciente</th>
								<th align="left">Monto</th>
								<th align="left">V/Cance</th>
							</tr>
						</thead>

						<tbody align="left">
<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="left">
								<td align="left"><?php echo $vlc_respuesta[0]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[2]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[6]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[3]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[4]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[5]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[7]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[8]; ?></td>
							</tr>

<?php
$this->vln_suma_factura_total += $vlc_respuesta[8];
        }

    }

    public function total_facturas_planilla($vln_proveedor, $vgn_numero_referencia)
    {
        $vlc_sql = "select a.no_prove,
					       sum(decode(cad.tipo_paciente,'HOS',nvl(a.monto,0))) TOTAL_HOS,
					       sum(decode(cad.tipo_paciente,'PRI',nvl(a.monto,0))) TOTAL_PRI,
					       sum(nvl(a.monto,0)) TOTAL_FACTURA
					from arcpmd a,arcptd b, arcpmp c, cp_honorarios_medicos_hist f, int_documentos_cp e, arcpmd n,
					cad_admisiones cad
					where a.no_cia = '01'
					and a.no_cia = c.no_cia
					and a.no_prove = c.no_prove
					and a.ind_act != 'P'
					and n.no_docu in ($vgn_numero_referencia) --NUMERO DE PH
					and a.anulado = 'N'
					and f.no_prove between '$vln_proveedor' and '$vln_proveedor'          --PROVEEDOR
					--and trunc(n.fecha) = '05/nov/2019'                    --FECHA DE LA TRANSFERENCIA
					and a.no_cia = b.no_cia
					and a.tipo_doc = b.tipo_doc
					and a.no_cia = f.no_cia
					and a.no_docu = f.no_docu
					and a.no_cia = e.no_cia(+)
					and a.no_docu = e.no_docu(+)
					and f.no_cia = n.no_cia
					and f.no_docu_ph = n.no_docu
					and f.tipo_doc = nvl('FM',f.tipo_doc)
					and  pk_fk_paciente = a.hist_clinica_pac --'6125401'
					and    pk_numero_admision = a.numero_admision --'92'
					group by a.no_prove";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>


<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="left">
								<td align="right" colspan="2"> Total HOS</td>
								<td align="left"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="right">Total PRI</td>
								<td align="left"><?php echo $vlc_respuesta[2]; ?></td>
								<td align="right" colspan="2"><b>Total Facturas => </b></td>
								<td align="left"><?php echo $vlc_respuesta[3]; ?></td>
								<td><?php echo $this->vln_suma_factura_total; ?></td>
							</tr>
<?php
}
        ?>
						</tbody>
					</table>
<?php
}

    public function copagos_planilla($vlc_numero_referencia)
    {
        $vlc_sql = "SELECT a.TIPO_DOC TIPO_DOC_RI,
           				a.NO_DOCU NO_DOCU_RI,
           				NVL(a.MONTO,0) MONTO_RI,
           				a.TIPO_REFE TIPO_REFE_RI,
           				a.NO_REFE NO_REFE_RI,
           				b.descripcion desc_ri,
           				a.no_prove prove_ri,
           				TO_DATE(c.fecha,'DD,MM,YY'),
           				d.serie_fisico||'-'||d.no_fisico factura,
           				c.detalle
           				 FROM ARCPRD a, arcptd b, arcpmd c, arcpmd d
           				 WHERE a.NO_CIA = '01'
           				 and a.tipo_doc !='AG'
           				 and a.NO_REFE = d.no_docu
           				 and a.no_refe in (
           				 select a.no_docu
           				 from cp_honorarios_medicos_hist a
           				 where a.no_cia = '01'
           				 and no_docu_ph IN ($vlc_numero_referencia)   --DOCUMENTO PH DEL QUERY FACTURA
           				 )
           				 and c.anulado = 'N'
           				 and a.no_cia = b.no_cia
           				 and a.tipo_doc = b.tipo_doc
           				 and a.no_cia = c.no_cia
           				 and a.no_docu = c.no_docu
           				 order by no_refe";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>

					<h5>COPAGOS, ANTICIPOS Y CONTRIBUCIONES</h5>
					<table border="0" style="font-size: 10px; width: 100% !important;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr align="center" >
								<th align="left">Fecha</th>
								<th align="left">T.Doc</th>
								<th align="left">Detalle</th>
								<th colspan="3"></th>
								<th align="left">Referencia Fact.</th>
								<th align="left">Transac.</th>
								<th align="left">Monto</th>
							</tr>
						</thead>

						<tbody align="left">
<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="left">
								<td align="left"><?php echo $vlc_respuesta[7]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[0]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[5] . " " . $vlc_respuesta[9]; ?></td>
								<td colspan="3"></td>
								<td align="left"><?php echo $vlc_respuesta[8]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[2]; ?></td>
							</tr>
<?php
$this->vln_suma_copago_total += $vlc_respuesta[2];
        }
        ?>
							<tr>
								<td colspan="7"></td>
								<td align="left"><b>Total Débitos aplicados => </b></td>
								<td align="left"><b><?php echo $this->vln_suma_copago_total; ?></b></td>
							</tr>
						</tbody>
					</table>
<?php
}

    public function anticipios_planilla($vlc_transaccion_fm, $vgc_fecha_transaccion)
    {
        $vlc_sql = "select d.no_docu no_docu_fm,
						m.fecha,md.tipo_doc,md.no_docu no_docu_ag,md.monto,d.no_fisico
						from arcprd md,arcpmd m,arcpmd d
						where md.no_docu = m.no_docu
						and   m.anulado = 'N'
						and   md.tipo_doc = 'AG'
						and   md.no_refe IN ($vlc_transaccion_fm)
						and  m.fecha < '$vgc_fecha_transaccion'  --FECHA PAGO
						and  md.no_refe = d.no_docu";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>

					<h5>PORCENTAJE DE ANTICIPOS DE HONORARIOS</h5>
					<table border="0" style="font-size: 10px; width: 100% !important;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr align="center" >
								<th align="left">Fecha</th>
								<th align="left">T.Doc</th>
								<th align="left">Detalle</th>
								<th align="left">Referencia Fact.</th>
								<th align="left">Transac.</th>
								<th align="left">Monto</th>
							</tr>
						</thead>

						<tbody align="left">
<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="left">
								<td align="left"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[2]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[0]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[5]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[3]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[4]; ?></td>
							</tr>
<?php
$this->vln_suma_anticipo_total += $vlc_respuesta[4];
        }
        ?>
							<tr>
								<td colspan="4"></td>
								<td align="left"><b>Total Anticipos aplicados => </b></td>
								<td align="left"><b><?php echo $this->vln_suma_anticipo_total; ?></b></td>
							</tr>
						</tbody>
					</table>
<?php
}

    public function retencion_anticipo_planilla($vlc_numero_referencia)
    {
        $vlc_sql = "select distinct c.comp_ret,a.porcentaje ret_porc, a.base ret_base, a.monto ret_monto, b.descripcion ret_descripcion, a.no_docu ret_docu
						from arcpti a, arcgimp b, arcpmd c
						where a.no_cia = '01'
						and a.clave = b.clave
						and a.no_cia = c.no_cia
						and a.no_docu = c.no_docu
						and  a.no_docu IN ($vlc_numero_referencia)";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>
					<br>
					<table align="right" border="0" style="font-size: 10px; width: 80% !important;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr align="center" >
								<th align="left">RETENCIÓN</th>
								<th align="left">Detalle</th>
								<th align="left">Base Retención</th>
								<th align="left">Retenido</th>
							</tr>
						</thead>

						<tbody align="left">
<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="left">
								<td align="left"><?php echo $vlc_respuesta[0]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[4]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[2]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[3]; ?></td>
							</tr>
<?php
$this->vln_suma_retencion_total += $vlc_respuesta[3];
        }
        ?>
							<tr>
								<td colspan="2"></td>
								<td align="left"><b>Total retenido => </b></td>
								<td align="left"><b><?php echo $this->vln_suma_retencion_total; ?></b></td>
							</tr>
							<tr>
								<td colspan="2"></td>
								<td align="left"><b>Total a Pagar => </b></td>
								<td align="left"><b><?php echo $this->vln_suma_factura_total - $this->vln_suma_retencion_total; ?></b></td>
							</tr>
						</tbody>
					</table>
<?php
}

    public function descuentos_planilla($vln_proveedor, $vlc_numero_referencia)
    {
        $vlc_sql = "SELECT a.no_refe,trunc(c.fecha) fecha,c.comp_ret,a.TIPO_DOC PHD_TIPO_DOC, a.NO_DOCU PHD_NO_DOCU, NVL(a.MONTO,0) PHD_MONTO, a.TIPO_REFE PHD_TIPO_REFE, a.NO_REFE PHD_NO_REFE, b.descripcion PHD_desc, a.no_prove PHD_prove, c.detalle PHD_detalle_dm
						FROM ARCPRD a, arcptd b, arcpmd c
						WHERE a.NO_CIA = '01'
						and NVL(c.anulado,'N') = 'N'
						and c.tipo_doc not in ('CK','TR')
						---AND A.NO_REFE = :ENLACE
						AND A.NO_PROVE = '$vln_proveedor'         --PROVEEDOR
						and a.no_cia = b.no_cia
						and a.tipo_doc = b.tipo_doc
						and a.no_cia = c.no_cia
						and a.no_docu = c.no_docu
						and a.no_refe in ($vlc_numero_referencia)    --DOCUMENTO PH DEL QUERY FACTURA
						order by no_refe";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>
					<br>
					<br>
					<br>
					<h5>DESCUENTOS</h5>
					<table border="0" style="font-size: 10px; width: 100% !important;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr align="center" >
								<th align="left">Fecha</th>
								<th align="left">No. Físico</th>
								<th align="left">Tipo Doc.</th>
								<th align="left">Detalle</th>
								<th align="left">Transac.</th>
								<th align="left">Monto</th>
							</tr>
						</thead>

						<tbody align="left">
<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="left">
								<td align="left"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[0]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[3]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[10]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[4]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[5]; ?></td>
							</tr>
<?php
$this->vln_suma_descuento_total += $vlc_respuesta[5];
        }
        ?>
							<tr>
								<td colspan="4"></td>
								<td align="left"><b>Total Descuentos aplicados => </b></td>
								<td align="left"><b><?php echo $this->vln_suma_descuento_total; ?></b></td>
							</tr>
							<tr>
								<td colspan="4"></td>
								<td align="left"><b>Neto a Pagar => </b></td>
								<td align="left"><b><?php echo $this->vln_suma_factura_total - $this->vln_suma_retencion_total - $this->vln_suma_descuento_total; ?></b></td>
							</tr>
						</tbody>
					</table>
<?php
}

    public function formas_pago_planilla($vln_proveedor, $vlc_numero_referencia)
    {
        $vlc_sql = "SELECT a.TIPO_DOC FP_TIPO_DOC,
						a.NO_DOCU FP_NO_DOCU,
						NVL(a.MONTO,0) FP_MONTO,
						a.TIPO_REFE FP_TIPO_REFE,
						a.NO_REFE FP_NO_REFE,
						b.descripcion FP_desc,
						a.no_prove FP_prove,
						C.NO_FISICO FP_FISICO,
						nvl(ce.cta_bco_transfe,'S/N') cta_bancaria
						FROM ARCPRD a, arcptd b, arcpmd c, arckce ce
						WHERE a.NO_CIA = '01'
						and NVL(c.anulado,'N') = 'N'
						AND A.NO_REFE IN ($vlc_numero_referencia)          --DOCUMENTO PH DEL QUERY FACTURA
						AND A.NO_PROVE = '$vln_proveedor'            --PROVEEDOR
						and c.tipo_doc  in ('CK','TR')
						and a.no_cia = b.no_cia
						and a.tipo_doc = b.tipo_doc
						and a.no_cia = c.no_cia
						and a.no_docu = c.no_docu
						and ce.no_cia = c.no_cia
						and ce.no_secuencia = to_number(c.no_secuencia)
						order by no_refe ";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>

					<h5>FORMA DE PAGO</h5>
					<table border="0" style="font-size: 10px; width: 100% !important;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr align="center" >
								<th align="left">No. Físico</th>
								<th align="left">Tipo Doc.</th>
								<th align="left">Detalle</th>
								<th align="left">Cuenta Bancaria</th>
								<th align="left">Transac.</th>
								<th align="left">Monto</th>
							</tr>
						</thead>

						<tbody align="left">
<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="left">
								<td align="left"><?php echo $vlc_respuesta[7]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[0]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[5]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[8]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[2]; ?></td>
							</tr>
<?php
}
        ?>
						</tbody>
					</table>
<?php
}

    public function proximo_debito_planilla($vln_proveedor)
    {
        $vlc_sql = "select a.no_prove,c.nombre,b.descripcion,
					a.tipo_doc, --DOCUMENTO
					a.no_fisico,
					a.fecha,
					a.no_docu,--TRANSAC
					a.saldo,
					a.serie_fisico,
					a.numero_prefactura,
					a.hist_clinica_pac, --HISTORIA CLINICA
					a.detalle, --DETALLE
					c.nombre,
					cc_nombre_paciente(a.hist_clinica_pac, a.numero_prefactura) paciente , --PACIENTE
					a.fecha_vence from arcpmd a,arcptd b, arcpmp c
					where a.no_cia = '01'
					and a.no_prove between  '$vln_proveedor' and '$vln_proveedor'    --PROVEEDOR
					and a.no_cia = c.no_cia
					and a.no_prove = c.no_prove
					and (nvl(saldo,0) <0)
					and b.tipo_mov = 'D'
					and ind_act != 'P'
					----and a.tipo_doc in ( select tipo_doc from arcptd where no_cia = :cia and tipo_mov = 'D' )
					and a.no_cia = b.no_cia
					and a.tipo_doc = b.tipo_doc order by c.nombre,fecha_vence";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>

					<h5>PROXIMAMENTE SE LE DEBITARA</h5>
					<table border="0" style="font-size: 10px; width: 100% !important;" align="center">
						<thead align="center" style="border-bottom: 0.3px solid #625A58;">
							<tr align="center" >
								<th align="left">Fecha</th>
								<th align="left">No. Físico</th>
								<th align="left">Hist. Clínica</th>
								<th align="left">Paciente</th>
								<th align="left">Detalle</th>
								<th align="left">Documento</th>
								<th align="left">Transac.</th>
								<th align="left">Saldo</th>
							</tr>
						</thead>

						<tbody align="left">
<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="left">
								<td align="left"><?php echo $vlc_respuesta[5]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[4]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[10]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[13]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[11]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[3]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[6]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[7]; ?></td>
							</tr>
<?php
}
        ?>
						</tbody>
					</table>
<?php
}

    public function cabecera_comprobante($vlc_numero_transaccion)
    {
        $vlc_sql = "select m.NO_CIA,
       					m.NO_PROVE, --NO_PROVEEDOR
				       mp.nombre,  --NO_PROVEEDOR
				       m.TIPO_DOC, --TIPO_DOCUMENTO
				       ti.descripcion, --TIPO_DOCUMENTO
				       m.NO_DOCU,  --NO_TRANSA
				       m.NO_FISICO, m.SERIE_FISICO,  --# DOCUMENTO
				       m.FECHA,
				       NVL( TO_CHAR(m.MONTO, 'fm9999999990.00'),'0.00'), --MONTO,
				       NVL( TO_CHAR(m.SALDO, 'fm9999999990.00'),'0.00'), --SALDO,
				       m.MONEDA, m.ANULADO, m.MONEDA_FISICO, m.MONTO_FISICO,
				       m.COMP_RET, --SEC.RETENC
				       m.detalle,
				       NVL( TO_CHAR(m.EXCENTOS, 'fm9999999990.00'),'0.00'), --EXCENTOS,
				       NVL( TO_CHAR(m.TOT_IMP, 'fm9999999990.00'),'0.00'), --TOTAL_IMP,
				       NVL( TO_CHAR(m.TOT_RET, 'fm9999999990.00'),'0.00'), --TOTAL_RET,
				       NVL( TO_CHAR(m.subtotal, 'fm9999999990.00'),'0.00'), --SUBTOTAL,
				       NVL( TO_CHAR(m.gravado, 'fm9999999990.00'),'0.00'), --GRAVADO,
				       NVL( TO_CHAR(m.monto, 'fm9999999990.00'),'0.00') --MONTO_TOTAL
				  from arcpmd m,arcpmp mp,arcptd ti
				where m.no_cia  = '01'
				   and m.no_docu = '$vlc_numero_transaccion'
				   and m.tipo_doc = ti.tipo_doc
				   and m.no_prove = mp.no_prove";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>
					<table border="0" style="width: 100% !important; font-size: 12px !important;">
						<tr>
							<td colspan="4"><b>CONJUNTO CLINICO NACIONAL CONCLINA C.A.</b></td>
							<td>COMPROBANTE CONTABLE</td>
							<td>Cuentas por Pagar</td>
						</tr>
						<tr>
							<td colspan="5">AV. MARIANA DE JESUS S/N Y NICOLAS ARTETA</td>
							<td>Rcp30_04</td>
						</tr>
						<tr>
							<td>1790412113001</td>
							<td colspan="5"></td>
						</tr>
					</table>
					<hr>
					<table border="0" style="font-size: 10px; width: 100% !important;" align="center">
						<tbody align="left">
<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="right">
								<td align="right">No Proveedor: </td>
								<td align="left"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[2]; ?></td>
								<td colspan="4"></td>
							</tr>
							<tr>
								<td align="right">Tipo Documento: </td>
								<td align="left"><?php echo $vlc_respuesta[3]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[4]; ?></td>
								<td colspan="2"></td>
								<td align="right">No. Transa.: </td>
								<td align="left"><?php echo $vlc_respuesta[5]; ?></td>
							</tr>
							<tr>
								<td align="right">Fecha Documento: </td>
								<td align="left"><?php echo $vlc_respuesta[8]; ?></td>
								<td colspan="3"></td>
								<td align="right">Sec. Retenc: </td>
								<td align="left"><?php echo $vlc_respuesta[15]; ?></td>
							</tr>
							<tr>
								<td align="right">Monto Original:</td>
								<td align="right"><?php echo $vlc_respuesta[20]; ?></td>
								<td colspan="3"></td>
								<td align="right">#. Documento: </td>
								<td align="left"><?php echo $vlc_respuesta[6] . " - " . $vlc_respuesta[7]; ?></td>
							</tr>
							<tr>
								<td align="right">Gravado: </td>
								<td align="right"><?php echo $vlc_respuesta[21]; ?></td>
								<td colspan="3"></td>
								<td align="right">Moneda Del Proveedor: </td>
								<td align="left"><?php echo $vlc_respuesta[11]; ?></td>
							</tr>
							<tr>
								<td align="right">Excentos: </td>
								<td align="right"><?php echo $vlc_respuesta[17]; ?></td>
								<td colspan="3"></td>
								<td align="right"> Saldo del Documento: </td>
								<td align="left"><?php echo "$ " . $vlc_respuesta[10]; ?></td>
							</tr>
							<tr>
								<td align="right">Impuestos: </td>
								<td align="right"><?php echo $vlc_respuesta[18]; ?></td>
							</tr>
							<tr>
								<td align="right">Retenciones: </td>
								<td align="right"><?php echo $vlc_respuesta[19]; ?></td>
							</tr>
							<tr>
								<td align="right">Total: </td>
								<td align="right" style="border-top: 0.3px solid #625A58;"><?php echo $vlc_respuesta[22]; ?></td>
							</tr>
<?php
}
        ?>
						</tbody>
					</table>
					<br>
					<label style="font-size: 12px;">Afectando a: <?php echo $vlc_respuesta[22]; ?></label>
					<br>
<?php
}

    public function detalle_comprobante($vgc_proveedor, $vgn_numero_transaccion)
    {
        $vlc_sql = "select    R.NO_CIA,
           			       R.TIPO_REFE tipo_documento,  --TIPO_DOC
           			       R.NO_REFE documento,         --TRANSAC
           			       R.TIPO_DOC tipodoc,
           			       R.NO_DOCU nodoc,
           			       R.NO_PROVE,
           			       NVL( TO_CHAR(R.MONTO, 'fm9999999990.00'),'0.00'),
           			       MD.DETALLE,       --DETALLE
           			       MD.NO_FISICO,      --NO_FISICO
           			       MD.FECHA,           --FECHA
           			       NVL( TO_CHAR( MD.MONTO_NOMINAL, 'fm9999999990.00'),'0.00'),
           			       NVL( TO_CHAR( MD.SALDO, 'fm9999999990.00'),'0.00')
           			from arcprd R,ARCPMD MD
           			where  R.no_prove = '$vgc_proveedor'
           			and  R.no_DOCU = '$vgn_numero_transaccion'    --NUMERO DE TR O CK
           			AND  R.NO_REFE = MD.NO_DOCU";

        $vlc_resultados = oci_parse($this->conexion->conexion, $vlc_sql);
        oci_execute($vlc_resultados);
        ?>
					<br>
					<table border="0" style="font-size: 10px; width: 100% !important;" align="center">
						<thead align="center" style="border-bottom: 0.5px solid #625A58;">
							<tr align="center" >
								<th align="left">Tipo Doc.</th>
								<th align="left">Detalle</th>
								<th align="left">No. Físico</th>
								<th align="left">Fecha</th>
								<th align="left">Transac.</th>
								<th align="left">Total</th>
								<th align="left">Saldo</th>
								<th align="left">Monto Aplicado</th>
							</tr>
						</thead>

						<tbody align="left">
<?php
while ($vlc_respuesta = oci_fetch_array($vlc_resultados)) {

            ?>
							<tr align="left">
								<td align="left"><?php echo $vlc_respuesta[1]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[7]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[8]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[9]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[2]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[10]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[11]; ?></td>
								<td align="left"><?php echo $vlc_respuesta[6]; ?></td>
							</tr>
<?php
$this->vln_suma_comprobante_total += $vlc_respuesta[6];
        }
        ?>
							<tr>
								<td colspan="7" align="right">Total => </td>
								<td align="left"><?php echo $this->vln_suma_comprobante_total; ?></td>
							</tr>
						</tbody>
					</table>
					<br>
					<br>
					<br>
					<br>
					<br>
					<br>
					<div align="center">
						<table border="0" style="font-size: 10px;" align="center">
							<tr>
								<td align="left" style="border-top: 0.5px solid #625A58;">Preparado por</td>
								<td style="width: 200px !important;" colspan="2"></td>
								<td align="right" style="border-top: 0.5px solid #625A58;">Acuso Recibo</td>
							</tr>
						</table>
					</div>
<?php
}

}

?>