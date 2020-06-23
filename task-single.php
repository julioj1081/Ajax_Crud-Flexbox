<?php
    include('backend.php');
    $id = $_POST['id'];
    $query = "SELECT * FROM tareas WHERE id = $id";
    $result = mysqli_query($connection, $query);
    if(!$result){
      die('Error ');
    }
    $json = array();
    while ($row = mysqli_fetch_array($result)) {
     $json[] = array(
       'name' => $row['name'],
       'description' => $row['description'],
       'id' => $row['id']
     );
    }
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
 ?>
