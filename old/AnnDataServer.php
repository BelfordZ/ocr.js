<?php
header("Content-type: text/plain");
ini_set("allow_url_fopen", true);
ini_set("allow_url_include", true);
//ini_set("display_errors", true);
//error_reporting(E_ALL | E_STRICT);

$action = $_POST['action'];
$annData = $_POST['annData'];

$fileKey = "AnnTrainingData.txt";

$tmpSvr = new AnnServer;
$tmpSvr->process_action($action, $annData);
$tmpSvr = null;

class AnnServer
{
   private $fname;
   private $f;
   private $annData;

   public function process_action($act, $dat)
   {
      switch ($act)
      {
	 case "get":
	    $this->annData = file_get_contents($this->fname);
	    echo $this->annData;
	    break;
	 case "put":
	    file_put_contents($this->fname, $dat);
	    break;	       
      }
   }

   public function __construct()
   {
      $this->annData = null;
      $this->fname = "AnnTrainingData.txt";      
   }
}
?>