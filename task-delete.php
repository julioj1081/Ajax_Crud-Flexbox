<?php
  include('backend.php');

  if(isset($_POST['id'])){
  $id = $_POST['id'];
  $query = "DELETE FROM tareas WHERE id=$id";
  $ressult = mysqli_query($connection, $query);
  if(!$result){

    die('Error al borrar tarea');
  }
  echo "Borrado exitoasmente";
  }
 ?>
