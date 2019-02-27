<?php 

	include 'Xread/excel_reader.php';
	 // include the class
	include 'main/connection.php';
// creates an object instance of the class, and read the excel file fbsql_database(link_identifier)
	$excel = new PhpExcelReader;
	$excel->read('stock.xls');
	$x = 2;
	//echo $excel->sheets[0]['numRows'];

	echo $excel->sheets[0]['cells'][$x][12];

 	 while($x <= $excel->sheets[0]['numRows']) {
 	 	$category = isset($excel->sheets[0]['cells'][$x][2]) ? $excel->sheets[0]['cells'][$x][2] : '';
 	 	$p_date = isset($excel->sheets[0]['cells'][$x][3]) ? $excel->sheets[0]['cells'][$x][3] : '';
 	 	$b_date = isset($excel->sheets[0]['cells'][$x][4]) ? $excel->sheets[0]['cells'][$x][4] : '';
 	 	$pay_date = isset($excel->sheets[0]['cells'][$x][5]) ? $excel->sheets[0]['cells'][$x][5] : '';
 	 	$bill_no = isset($excel->sheets[0]['cells'][$x][6]) ? $excel->sheets[0]['cells'][$x][6] : '';
 	 	$supp_name = isset($excel->sheets[0]['cells'][$x][7]) ? $excel->sheets[0]['cells'][$x][7] : '';
 	 	$details = isset($excel->sheets[0]['cells'][$x][8]) ? $excel->sheets[0]['cells'][$x][8] : '';
 	 	$type = isset($excel->sheets[0]['cells'][$x][9]) ? $excel->sheets[0]['cells'][$x][9] : '';
 	 	$short_code = isset($excel->sheets[0]['cells'][$x][10]) ? $excel->sheets[0]['cells'][$x][10] : '';
 	 	$quantity = isset($excel->sheets[0]['cells'][$x][11]) ? $excel->sheets[0]['cells'][$x][11] : '';
 	 	$unit_price = isset($excel->sheets[0]['cells'][$x][12]) ? $excel->sheets[0]['cells'][$x][12] : '';
 	 	$page_no = isset($excel->sheets[0]['cells'][$x][16]) ? $excel->sheets[0]['cells'][$x][16] : '';
 	 	$faculty = isset($excel->sheets[0]['cells'][$x][13]) ? $excel->sheets[0]['cells'][$x][13] : '';
 	 	$department = isset($excel->sheets[0]['cells'][$x][14]) ? $excel->sheets[0]['cells'][$x][14] : '';
 	 	$location = isset($excel->sheets[0]['cells'][$x][15]) ? $excel->sheets[0]['cells'][$x][15] : '';
 	 	$remark = isset($excel->sheets[0]['cells'][$x][17]) ? $excel->sheets[0]['cells'][$x][17] : '';

 	 	$func_stat = isset($excel->sheets[0]['cells'][$x][18]) ? $excel->sheets[0]['cells'][$x][18] : '';
 	 	$stock_status = isset($excel->sheets[0]['cells'][$x][19]) ? $excel->sheets[0]['cells'][$x][19] : '';

 	 	if($func_stat == 'Working' || $func_stat == '')
 	 		$func_stat = '1';
 	 	else if($func_stat == 'Not Working')
 	 		$func_stat = '0';

 	 	if($stock_status == 'Present' || $stock_status == '')
 	 		$stock_status = '1';
 	 	else if($stock_status == 'Lost')
 	 		$stock_status = '2';
 	 	else if($stock_status == 'Scrap')
 	 		$stock_status = '3';

 	 	$p_year = substr($p_date,0,4);

 	 	$barcode_half1 = "DDU/".$faculty."/".$department."/".$p_year."/".$short_code."/";
		$barcode_half2 = "/".$quantity."/".$page_no;
		$unit = "1";
	  
		if($quantity > 1)
		{
			$unit = "1-".$quantity;
		}

		$sql = "SELECT * FROM `assets_data` WHERE `date_of_purchase` = '$p_date' AND `supplier_name` = '$supp_name' AND `bill_no` = '$bill_no' AND `short_code` = '$short_code' ";
		$result = $conn->query($sql);
	 
		if($result->num_rows == 0)
		{

				for($i=1;$i<=$quantity;$i=$i+1)
				{
	        
	       			$barcode = $barcode_half1.$i.$barcode_half2;
					$sql = "INSERT INTO `assets_data` (`category`,`date_of_purchase`,`date_of_bill`,`date_of_payment`,`bill_no`,`supplier_name`,`details`,`type`,`short_code`,`quantity`,`unit_no`,`unit_price`,`page_no`,`faculty`,`department`,`location`,`barcode`,`functional_status`,`remark`,`stock_status`) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	       
					$stmt = $conn->prepare($sql);
	       
	        
					$stmt->bind_param("sssssssssiidsssssisi",$category,$p_date,$b_date,$pay_date,$bill_no,$supp_name,$details,$type,$short_code,$quantity,$i,$unit_price,$page_no,$faculty,$department,$location,$barcode,$func_stat,$remark,$stock_status);

	        		$stmt->execute();

					$stmt->close();

				}
		}

		else{
		echo "<script>alert('Data Already Exist');window.location.replace(\"index.php\");</script>";
	}





 	 	$x=$x+1;
 	 }

 	 echo "<script>alert('".$x."');window.location.replace(\"index.php\");</script>";
 ?>