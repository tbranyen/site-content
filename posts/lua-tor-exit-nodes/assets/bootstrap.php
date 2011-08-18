<?php
 
  // Get ip
  $ip = $_SERVER["REMOTE_ADDR"];

  // Echo the result
  echo shell_exec("lua TorBlock.lua " . $ip);
 
?>
