<?php
$vgnumerr = "";
$vgerror = "";
$vgdest = "";

function enviarsms($parServicio, $parEmisor, $parLogin, $parPwd, $parRef, $parFechaEnv, $parHoraEnv, $parPc, $parMsg, $parDest) {
	global $vgerror;

	$envio = "N";
	$key = md5($parServicio.";csms@auto;".$parEmisor.";".$parLogin.";".$parPwd.";".$parRef);
	
	//Xml
	$xml = '<?xml version="1.0" encoding="ISO-8859-1"?>';
	$xml .= '<enviar Servicio="'.$parServicio.'" Emisor="'.$parEmisor.'" Login="'.$parLogin.'" Pwd="'.$parPwd.'" NumDest="1" Referencia="'.$parRef.'" FechaEnv="'.$parFechaEnv.'" HoraEnv="'.$parHoraEnv.'" NombrePC="'.$parPc.'" Key="'.$key.'">';
	$xml .= '<Mensaje>' . $parMsg . '</Mensaje>';
	$xml .= '<Dest>' . $parDest . '</Dest>';
	$xml .= '</enviar>';

	
	$xmlres = HTTPrequest("POST", "201.234.87.171", "/contactosms/wclsContactoSMS.aspx", $xml);
	
	
	$posdata = strpos($xmlres, "\r\n\r\n");
	if ($posdata === false) { $vgerror = "Documento XML Invalido: ".$xmlres; }
	else {
		$xmlres = substr($xmlres, $posdata+2);
		XMLParse($xmlres); 
	}
}

function HTTPrequest($method, $host, $usepath, $postdata = "") {  

    if(is_array($postdata)) { 
          foreach($postdata as $key=>$val) { 
              if(!is_integer($key)) { $data .= "$key=".urlencode($val)."&"; }
          } 
     } else { 
          $data = $postdata; 
     }

     //$fp = pfsockopen( $host, 80, &$errno, &$errstr, 120);  
	$fp = fsockopen( $host, 80, $errno, $errstr, 120);  

      
     if( !$fp ) {  
        $output = '<resenviar Errores="1"><Error Dest="0">'.$errstr.'('.$errno.')</Error></resenviar>';
     } 
     else {
	     if( strtoupper($method) == "GET" ) {  
        	    fputs( $fp, "GET $usepath HTTP/1.0\n");  
	     }  
	     else if( strtoupper($method) == "POST" ) {  
        	    fputs( $fp, "POST $usepath HTTP/1.0\n");  
	     }  
     
	     fputs( $fp, "Accept: */*\n");  
	     fputs( $fp, "Accept: image/gif\n");  
	     fputs( $fp, "Accept: image/x-xbitmap\n");  
	     fputs( $fp, "Accept: image/jpeg\n");  
     
	     if( strtoupper($method) == "POST" ) {  
	            $strlength = strlen( $postdata); 
	            fputs( $fp, "Content-type: text/xml\n");  
	            fputs( $fp, "Content-length: ".$strlength."\n\n");  
	            fputs( $fp, $postdata."\n");  
	     } 

	     fputs( $fp, "\n" , 1);  
	     $output = "";   
	     stream_set_timeout($fp, 60);
	     while( !feof( $fp ) ) {  			
	            $output .= fgets( $fp, 1024);  
	     }  
	     $info = stream_get_meta_data($fp);
	     fclose( $fp); 
	     if ($info['timed_out']) {
           $output = '<resenviar Errores="1"><Error Dest="0">Tiempo de espera agotado.</Error></resenviar>';
    		} 
 
     }  
     return $output;  
}

function XMLParse($xml) {
	global $vgerror;
	global $vgnumerr;
	global $vgdest;

	$xml_parser = xml_parser_create();
	xml_parse_into_struct($xml_parser, $xml, $vals, $idxs);
	
	//se comento está funcion no existe idxs envio 
	/*if ($idxs['ENVIO']) { $vgnumerr = $vals[$idxs['ENVIO'][0]]['attributes']['ERRORES'];}
	else { $vgnumerr = $vals[$idxs['RESENVIAR'][0]]['attributes']['ERRORES']; }
	$vgdest = $vals[$idxs['ERROR'][0]]['attributes']['DEST'];
	$vgerror = $vals[$idxs['ERROR'][0]]['value'];*/

	if(array_key_exists('ERROR',$idxs)){
		 $vgnumerr = 1;
		 $vgdest = $vals[$idxs['ERROR'][0]]['attributes']['DEST'];
		 $vgerror = $vals[$idxs['ERROR'][0]]['value'];
	}
	else{
		$vgnumerr = 0;
		$vgdest = '';
		$vgerror = '';
	}


	xml_parser_free($xml_parser);	
	

}

function respuestasms(&$numerr, &$dest, &$error) {
	global $vgerror;
	global $vgnumerr;
	global $vgdest;

	$numerr = $vgnumerr;
	$dest = $vgdest;
	$error = $vgerror;	
}


?>