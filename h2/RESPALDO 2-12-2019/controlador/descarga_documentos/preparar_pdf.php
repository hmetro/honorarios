<?php
    require_once '../../plugins/dompdf/autoload.inc.php';
    require_once '../../plugins/dompdf/lib/html5lib/Parser.php';
	require_once '../../plugins/dompdf/lib/php-font-lib/src/FontLib/Autoloader.php';
	require_once '../../plugins/dompdf/lib/php-svg-lib/src/autoload.php';
	require_once '../../plugins/dompdf/src/Autoloader.php';
	Dompdf\Autoloader::register();
    $vgc_proveedor=$_GET['proveedor'];
    $vgc_fecha=$_GET['fecha'];
    $vgc_transaccion=$_GET['transaccion'];

    use Dompdf\Dompdf;

// instantiate and use the dompdf class
$dompdf = new Dompdf();
    $paper_orientation = 'landscape';
	$customPaper = 'A4';
	$dompdf->set_paper($customPaper,$paper_orientation);
    $dompdf->load_html( file_get_contents( "http://app.hmetro.med.ec/honorarios/controlador/descarga_documentos/imprimir_pdf.php?vgc_proveedor=".$vgc_proveedor."&vgc_fecha=".$vgc_fecha."&vgc_transaccion=".$vgc_transaccion."" ) );
    $dompdf->render();
    $dompdf->stream("Estado de Cuenta de $vgc_fecha.pdf");
