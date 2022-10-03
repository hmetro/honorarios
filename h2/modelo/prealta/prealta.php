<?php  
	class prealta
	{
		private $conexion;
		public function __construct()
		{
			require_once('/../conexion/conexion.php');
			$this->conexion= new conexion();
			$this->conexion->conectar();
		}

		function lista_pacientes($vln_proveedor)
		{

			$vlc_sql="select t.hc,
						      t.nombre_pte,
						      ad.fecha_admision,
						      t.ubicacion,
						      t.diagnostico,
						      t.clasificacion_medico,
						      ad.campo_aux1,
						      ad.pk_numero_admision adm,
						      ar.no_prove,
						      (select m.fk_medico_asignado
						      from cad_asigna_medico_tratante m
						      where m.fk_paciente = t.hc and m.fk_admision = ad.pk_numero_admision
						      and m.fk_medico_asigna = ar.no_prove
						      and m.estado = 'A') Med_asignado,
						      (select m.estado
						      from cad_asigna_medico_tratante m
						      where m.fk_paciente = t.hc and m.fk_admision = ad.pk_numero_admision
						      and m.fk_medico_asignado = ar.no_prove
						      and m.estado = 'A') Med_estado,
						      (select m.fk_medico_asigna
						      from cad_asigna_medico_tratante m
						      where m.fk_paciente = t.hc and m.fk_admision = ad.pk_numero_admision
						      and m.fk_medico_asigna = ar.no_prove
						      and m.estado = 'A') Med_asigna,
						      fun_nombre_dcto(ad.pk_fk_institucion, ad.pk_fk_paciente, ad.pk_numero_admision) Plan_dcto   
						 from web_vw_ptes_en_hospital t,
						      cad_medicos_admision    a,
						      arcpmp                  ar,
						      cad_admisiones          ad
						where t.hc = a.pk_fk_paciente
						  and a.fecha_alta is null
						  and t.persona_medico = ar.codigo_persona
						  and lpad(a.pk_fk_medico, 10, '0') = lpad(ar.no_prove, 10, '0')
						  and ar.no_prove = '$vln_proveedor'
						  and t.hc = ad.pk_fk_paciente
						  and ad.alta_clinica is null
						  and ad.anulado = 'N'
						  and ad.pre_admision = 'N' 
						  and a.pk_fk_paciente = ad.pk_fk_paciente
						  and a.pk_fk_admision = ad.pk_numero_admision";

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

		function busqueda_codigos_cpt($vgc_codigo,$vgc_detalle)
		{

			$vlc_sql="select  cod_cpt, desc_cpt from ctm_vw_tarifario_medico where (cod_cpt like '%$vgc_codigo%' and UPPER (desc_cpt) like UPPER ('%$vgc_detalle%') ) and rownum <= 8 order by DESC_CPT";

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

		function busqueda_doctor($vlc_codigo_doctor,$vlc_nombre_doctor)
		{

			$vlc_sql="select a.no_prove, a.nombre 
						from arcpmp a 
						where (a.no_prove like '%$vlc_codigo_doctor%' and a.nombre like '%$vlc_nombre_doctor%' ) and rownum <= 10 order by a.nombre";

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

		function ingreso_fecha_prealta($vgn_admision, $vgn_historia_clinica,$vlc_hora_fecha_posible_alta)
		{

			$vlc_sql="UPDATE cad_admisiones SET CAMPO_AUX1 = '$vlc_hora_fecha_posible_alta'
						WHERE pk_numero_admision='$vgn_admision' and pk_fk_paciente = '$vgn_historia_clinica'";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);			

			if(oci_execute($vlc_resultados))
			{	

				return true;
			}
			else
			{
				return false;
			}
			
			$this->conexion->cerrar();
		}

		function ingreso_codigo_cpt($vln_codigo_cpt, $vln_codigo_medico,$vln_cantidad_cpt,$vln_codigo_medico_0,$vln_historia_clinica,$vln_admision,$vlc_fecha_posible,$vln_porcentaje_cpt)
		{

			$vlc_sql="INSERT INTO ccp_honorarios_medicos_web(pk_fk_institucion,
								pk_fk_arinvtm_no_cia,
								pk_fk_arinvtm_tipo_m,
								pk_fk_transaccion,
								pk_linea,
								discriminante,
								fk_medico,
								fk_categoria,
								fk_arinda_no_cia,
								fk_arinda_clase,
								fk_arinda_categoria,
								fk_arinda_no_arti,
								cantidad,
								porcentaje_calculo,
								valor_honorario,
								porcentaje_descuento,
								valor_descuento,
								tipo_doc_hon,
								afecta_cxp,
								serie_doc_hon,
								num_doc_hon,
								observacion,
								fk_paciente,
								fk_admision,
								fecha)
								VALUES (1,'01','SC',NULL,NULL,
								'HMO',
								'$vln_codigo_medico', --codigo del medico
								(SELECT b.pk_fk_categoria
								FROM   edm_medicos a, edm_medicos_institucion b
								WHERE  a.pk_codigo = b.pk_fk_medico
								AND    b.activo = 'S'
								AND    a.pk_codigo = '$vln_codigo_medico_0'), --codigo del medico sin 00
								'01',
								'000',
								'000',
								'$vln_codigo_cpt', --codigo del articulo cpt
								'$vln_cantidad_cpt', -- cantidad del cpt
								'$vln_porcentaje_cpt',
								NULL,NULL,NULL,'FA','S',NULL,NULL,
								'$vln_codigo_medico', -- codigo del medico
								'$vln_historia_clinica',
								'$vln_admision',
								TO_DATE ('$vlc_fecha_posible','YYYY-MM-DD'))";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);			

			if(oci_execute($vlc_resultados))
			{	

				return true;
			}
			else
			{
				return false;
			}
			
			$this->conexion->cerrar();
		}

		function listar_codigos_cpt($vgn_proveedor,$vgn_historia_clinica,$vgn_admision)
		{

			$vlc_sql="select a.fk_arinda_no_arti, (select b.desc_cpt from ctm_vw_tarifario_medico b where b.cod_cpt=a.fk_arinda_no_arti), a.cantidad,a.fk_paciente, a.fk_admision, a.fecha, porcentaje_calculo 
						from ccp_honorarios_medicos_web a 
						where a.fk_medico = '$vgn_proveedor' and a.fk_paciente ='$vgn_historia_clinica' and  a.fk_admision = '$vgn_admision' order by a.fk_arinda_no_arti";

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

		function transferir_responsabilidad_insert($vgn_codigo_medico_anterior,$vgn_codigo_medico_nuevo, $vgn_numero_admision,$vln_historia_clinica,$vlc_hoy)
		{

			$vlc_sql="insert into cad_asigna_medico_tratante 
			(fk_paciente,
			fk_admision,
			fk_medico_asigna,
			fk_medico_asignado, 
			fecha_asigna, 
			estado,
			tipo_medico_asignado) 
			values 
			('$vln_historia_clinica',
			'$vgn_numero_admision', 
			'$vgn_codigo_medico_anterior',
			'$vgn_codigo_medico_nuevo',
			(to_date('$vlc_hoy', 'yyyy-mm-dd hh24:mi:ss')),
			'A',
			(select a.clasificacion_medico from cad_medicos_admision a where a.pk_fk_paciente = '$vln_historia_clinica' and a.pk_fk_admision ='$vgn_numero_admision' and a.pk_fk_medico ='$vgn_codigo_medico_nuevo') )";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);		

			if(oci_execute($vlc_resultados))
			{	
				return true;
			}
			else
			{
				return false;
			}
			
			$this->conexion->cerrar();
			
		}

		function transferir_responsabilidad_update_anterior($vgn_codigo_medico_anterior, $vgn_numero_admision,$vln_historia_clinica)
		{

			$vlc_sql="UPDATE cad_asigna_medico_tratante a SET a.estado = 'I'
						WHERE a.fk_paciente = '$vln_historia_clinica' and a.fk_admision = '$vgn_numero_admision' and a.fk_medico_asignado ='$vgn_codigo_medico_anterior'";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);			

			if(oci_execute($vlc_resultados))
			{	

				return true;
			}
			else
			{
				return false;
			}
			
			$this->conexion->cerrar();
		}				

		function buscar_doctor_paciente($vgn_codigo_medico_anterior, $vgn_historia_clinica, $vgn_numero_admision)
		{

			$vlc_sql="select m.estado
       					from cad_asigna_medico_tratante m
       					where m.fk_paciente = '$vgn_historia_clinica' 
       					and m.fk_admision = '$vgn_numero_admision'
       					and m.fk_medico_asignado = '$vgn_codigo_medico_anterior'
       					and m.estado = 'A'";

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

		function listar_terminales()
		{

			$vlc_sql="select a.pk_usuario from aas_usuarios_mensaje a where a.pk_tipo ='ALT' ";

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

		function listar_celulares($vgn_numero_admision,$vln_historia_clinica)
		{

			$vlc_sql="select t.celular 
						from edm_celulares_residentes t 
						where t.fk_especialidad = (select ad.fk_especialidad 
                          from cad_admisiones ad 
                          where ad.pk_fk_paciente =  '$vln_historia_clinica'
                          and   ad.pk_numero_admision = '$vgn_numero_admision') ";

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

		function fecha_fin_atencion($vgn_codigo_medico, $vgn_numero_admision,$vln_historia_clinica)
		{

			$vlc_sql="UPDATE cad_medicos_admision t SET t.fecha_alta = SYSDATE, t.hora_alta = SYSDATE
							WHERE t.pk_fk_paciente = '$vln_historia_clinica'
							AND t.pk_fk_admision = '$vgn_numero_admision'
							AND LPAD(t.pk_fk_medico,10,'0') = LPAD('$vgn_codigo_medico','10','0')";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);			

			if(oci_execute($vlc_resultados))
			{	

				return true;
			}
			else
			{
				return false;
			}
			
			$this->conexion->cerrar();
		}

		function remover_honorario($vgn_proveedor,$vgn_historia_clinica,$vgn_admision,$vgn_codigo_cpt,$vgc_fecha_ingreso)
		{

			$vlc_sql="delete from ccp_honorarios_medicos_web es 
					where es.fk_paciente = '$vgn_historia_clinica' and es.fk_admision = '$vgn_admision' and es.fk_medico = '$vgn_proveedor' and es.fk_arinda_no_arti = '$vgn_codigo_cpt' and es.fecha = '$vgc_fecha_ingreso' ";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);			

			if(oci_execute($vlc_resultados))
			{	

				return true;
			}
			else
			{
				return false;
			}
			
			$this->conexion->cerrar();
		}

		function consultar_honorario($vgn_proveedor,$vgn_historia_clinica,$vgn_admision,$vgn_codigo_cpt,$vgc_fecha_ingreso)
		{

			$vlc_sql="select hs.estado from ccp_honorarios_medicos_web hs 
						where hs.fk_medico='$vgn_proveedor' 
						and hs.fk_arinda_no_arti = '$vgn_codigo_cpt' 
						and hs.fk_paciente = '$vgn_historia_clinica'
						and hs.fk_admision = '$vgn_admision'
						and hs.fecha = '$vgc_fecha_ingreso'";

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

		function pro_envio_mensaje($vln_historia_clinica,$vln_admision,$vlc_fecha_prealta,$vlc_mensaje)
		{
			$vlc_salida = "";

			$vlc_sql="DECLARE
     				pc_error char(1);
				begin     
				     web_pro_envio_mensaje(1,$vln_historia_clinica,$vln_admision,'$vlc_fecha_prealta','$vlc_mensaje',PC_ERROR);
				end;
				";

			$vlc_resultados=oci_parse($this->conexion->conexion,$vlc_sql);			

			if(oci_execute($vlc_resultados))
			{	

				return true;
			}
			else
			{
				return false;
			}
			
			$this->conexion->cerrar();
		}			

	}	
			
?>