$(document).ready(function() {
  // VALOR GLOBAL PARA EDITAR
  let edit = false;

  // Testing Jquery
  console.log('jquery is working!');
  fetchTasks();
  $('#task-result').hide();


  // Busca conforme precionas botones en la barra
  $('#search').keyup(function() {
    if($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url: 'task-search.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let tasks = JSON.parse(response);
            let template = '';
            tasks.forEach(task => {
              template += `
                     <li><a href="#" class="task-item">${task.name}</a></li>
                    `
            });
            $('#task-result').show();
            $('#container').html(template);
          }
        }
      })
    }
  });

  $('#task-form').submit(e => {

    e.preventDefault();
    //postData son los datos que enviaremos al servidor para poder insertar
    const postData = {
      name: $('#name').val(),
      description: $('#description').val(),
      id: $('#taskId').val()
    };



    //Si encuentra el id modifica sino lo inserta con la condicion global de edit
    const url = edit === false ? 'task-add.php' : 'task-edit.php';
    console.log(postData, url);
    $.post(url, postData, (response) => {
      console.log(response);
      //lo reseteamos con trigger reset
      $('#task-form').trigger('reset');
      fetchTasks();
    });
  });

  // Mostramos todas las tareas
  function fetchTasks() {
    $.ajax({
      url: 'task-list.php',
      type: 'GET',
      success: function(response) {
        const tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
          //Lo guardamos todo en un id y cada vez que corra el while se guardara con otro id
          template += `

                  <tr taskId="${task.id}">
                  <td>${task.id}</td>
                  <td>
                    ${task.name}
                  </td>
                  <td>${task.description}</td>
                  <td>
                    <button class="task-delete btn btn-danger">
                     Borrar
                    </button>
                  </td>
                  <td>
                    <button class="task-item btn btn-primary">
                    Modificar
                    </button>
                  </td>

                  </tr>
                `
        });
        //Lo mete en en tbody
        $('#tasks').html(template);
      }
    });
  }

  // BORRAR conforme a la classe del botton
  $(document).on('click', '.task-delete', (e) => {
    if(confirm('Estas seguro de eliminar la tarea?')) {
      const element = $(this)[0].activeElement.parentElement.parentElement;
      //Lo consegimos de acuerdo al id con el parentElement
      const id = $(element).attr('taskId');
      //enviamos el id
      $.post('task-delete.php', {id}, (response) => {
        //cuando borra llamamos la funcion de llamar tareas
        fetchTasks();
      });
    }
  });

  // MODIFICAR cuando da un click en modificar
  $(document).on('click', '.task-item', (e) =>{
    let element = $(this)[0].activeElement.parentElement.parentElement;
    let id= $(element).attr('taskId');
    $.post('task-single.php', {id}, (e) =>{
      const task = JSON.parse(e);
      $('#name').val(task.name);
      $('#description').val(task.description);
      $('#taskId').val(task.id);
      //lo cambiamos a verdadero
      edit = true;
    });
  });


});
