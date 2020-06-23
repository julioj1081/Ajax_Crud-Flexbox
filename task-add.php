<?php
include('backend.php');

if(isset($_POST['name'])){
  $name = $_POST['name'];
  $description = $_POST['description'];
  $query = "INSERT INTO tareas (name, description) VALUES ('$name', '$description')";
  $result = mysqli_query($connection, $query);
  if(!$result){
    die('Error al guardar la tarea');
  }
  echo 'Tarea exitosa';
}
 ?>
