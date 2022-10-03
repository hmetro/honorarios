<?php
    require_once '../../plugins/dompdf/autoload.inc.php';
    require_once '../../plugins/dompdf/lib/html5lib/Parser.php';
	require_once '../../plugins/dompdf/lib/php-font-lib/src/FontLib/Autoloader.php';
	require_once '../../plugins/dompdf/lib/php-svg-lib/src/autoload.php';
	require_once '../../plugins/dompdf/src/Autoloader.php';
    require_once '../../config/config.php';
	Dompdf\Autoloader::register();
    $vgc_proveedor=$_GET['proveedor'];
    $vgc_fecha_desde_g=$_GET['fecha_desde'];
    $vgc_fecha_hasta_g=$_GET['fecha_hasta'];
    $vgc_fecha_desde=date('d-M-Y' ,strtotime($vgc_fecha_desde_g));
    $vgc_fecha_hasta=date('d-M-Y' ,strtotime($vgc_fecha_hasta_g));

    use Dompdf\Dompdf;

    // instantiate and use the dompdf class
    $dompdf = new Dompdf();
    $paper_orientation = 'landscape';
	$customPaper = 'A4';
	$dompdf->set_paper($customPaper,$paper_orientation);
    $dompdf->load_html( file_get_contents( "http://".$vlc_dominio."/".$vlc_proyecto."/controlador/descarga_documentos/imprimir_estado_cuenta.php?vgc_proveedor=".$vgc_proveedor."&vgc_fecha_desde=".$vgc_fecha_desde."&vgc_fecha_hasta=".$vgc_fecha_hasta."" ) );
    $dompdf->render();
    $dompdf->stream("Estado de Cuenta de $vgc_proveedor.pdf");
