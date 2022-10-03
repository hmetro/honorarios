<?php
    require_once '../../plugins/dompdf/autoload.inc.php';
    require_once '../../plugins/dompdf/lib/html5lib/Parser.php';
	require_once '../../plugins/dompdf/lib/php-font-lib/src/FontLib/Autoloader.php';
	require_once '../../plugins/dompdf/lib/php-svg-lib/src/autoload.php';
	require_once '../../plugins/dompdf/src/Autoloader.php';
    require_once '../../config/config.php';
	Dompdf\Autoloader::register();
    $vgc_proveedor=$_GET['proveedor'];
    $vgc_fecha_transaccion=$_GET['fecha_transaccion'];
    $vgn_numero_transaccion=$_GET['numero_transaccion'];
    //$vgc_fecha_desde=date('d-M-Y' ,strtotime($vgc_fecha_desde_g));
    //$vgc_fecha_hasta=date('d-M-Y' ,strtotime($vgc_fecha_hasta_g));

    use Dompdf\Dompdf;

    // instantiate and use the dompdf class
    $dompdf = new Dompdf();
    $paper_orientation = 'portrait';
	$customPaper = 'A4';
	$dompdf->set_paper($customPaper,$paper_orientation);
    $dompdf->load_html( file_get_contents( "http://".$vlc_dominio."/".$vlc_proyecto."/controlador/descarga_documentos/imprimir_planilla_pago.php?vgc_proveedor=".$vgc_proveedor."&vgc_fecha_transaccion=".$vgc_fecha_transaccion."&vgn_numero_transaccion=".$vgn_numero_transaccion."" ) );
    $dompdf->render();
    $dompdf->stream("Planilla de pago de la transacción $vgn_numero_transaccion.pdf");
