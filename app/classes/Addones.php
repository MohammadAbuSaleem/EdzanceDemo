<?php
class Addones {
    public static function Upload($file,$path='',$name='',$size='m') {
		if($file!==null )
			{	
	   		if($path!==''){$destinationPath = $path;}else{$destinationPath = 'uploads'; }// upload path
      		$extension = $file->getClientOriginalExtension(); // getting image extension
	      	if($name!==''){$fileName=$name.'.'.$extension;}else{$fileName = rand(11111,99999).'_.'.$extension;} // renaming image
	      	$file->move($destinationPath, $fileName); // uploading file to given path
	     	$image = $destinationPath .'/'. $fileName ;
		}else{$image='';}
		switch ($size) 
			{
				case 'xs':
					Image::make($image)->resize(null, 100, function ($constraint) {$constraint->aspectRatio();})->save($destinationPath .'/'.$size.'_'.$fileName);
					$image = $destinationPath .'/'.$size.'_'.$fileName;
				break;
				case 's':
					Image::make($image)->resize(null, 200, function ($constraint) {$constraint->aspectRatio();})->save($destinationPath .'/'.$size.'_'.$fileName);
					$image = $destinationPath .'/'.$size.'_'.$fileName;
				break;
				case 'm':
					Image::make($image)->resize(null, 300, function ($constraint) {$constraint->aspectRatio();})->save($destinationPath .'/'.$size.'_'.$fileName);
					$image = $destinationPath .'/'.$size.'_'.$fileName;
				break;
				case 'l':
					Image::make($image)->resize(null, 400, function ($constraint) {$constraint->aspectRatio();})->save($destinationPath .'/'.$size.'_'.$fileName);
					$image = $destinationPath .'/'.$size.'_'.$fileName;
				break;
				case 'xl':
					Image::make($image)->resize(null, 500, function ($constraint) {$constraint->aspectRatio();})->save($destinationPath .'/'.$size.'_'.$fileName);
					$image = $destinationPath .'/'.$size.'_'.$fileName;
				break;
				case 'tw':
					Image::make($image)->resize(350, 350)->save($destinationPath .'/'.$size.'_'.$fileName);
					$image = $fileName;
				break;
				default:
				break;
			}
	return $image;
    }

    public static function ArabNum($parm) 
	{
    	$english_symbols = array("0","1","2","3","4","5","6","7","8","9");
		$arabic_symbols = array("٠","١","٢","٣","٤","٥","٦","٧","٨","٩");
		$number = $parm;//date('d').'-'.date('m').'-'.date('Y');
		$changed = str_replace($english_symbols , $arabic_symbols , $number);
	return  $changed;
	}
	  public static function Arabdate($parm,$type='Y/m/d') {return  self::ArabNum(date($type, strtotime($parm)));}

}