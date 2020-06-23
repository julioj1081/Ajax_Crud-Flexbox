<?php
  include ('backend.php');
  $query = "SELECT * FROM tareas";
  $result = mysqli_query($connection, $query);
  if(!$result){
    die('Fallo en el sql'. mysqli_error($connection));
  }
  while($row = mysqli_fetch_array($result)){
    $json[] = array(
      'name' => $row['name'],
      'description' => $row['description'],
      'id' => $row['id']
    );
  }
  //Lo convertimos en un arreglo para poderlo mostrar en las tabla
  $jsonstring = json_encode($json);
  echo $jsonstring;
 ?>
