<?php 

  function IpClient() 
    {
        $aud = '';

        if (!empty(gethostbyaddr($_SERVER['HTTP_CLIENT_IP']) ) ) {

            $aud = gethostbyaddr($_SERVER['HTTP_CLIENT_IP']);

        } elseif (!empty(gethostbyaddr($_SERVER['HTTP_X_FORWARDED_FOR']) ) ) {

            $aud = gethostbyaddr($_SERVER['HTTP_X_FORWARDED_FOR']);

        } else {
            
            $aud = gethostbyaddr($_SERVER['REMOTE_ADDR']);
        }

        return $aud;
    }

?>