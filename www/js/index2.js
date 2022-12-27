$(document).ready(function() {
    task.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          ajouterTache();
        }
      });

    date.innerText = new Date().toDateString();

});


function reinitialiser() {
    taskListDone.innerHTML = '';
    taskListOngoing.innerHTML = '';
}

function swipeLeftHandler1() {
    console.log("swipe left effectué");
    $(this).hide('slow', function () {
        $(this).remove();
        $(taskListOngoing).listview('refresh');
        $(taskListDone).listview('refresh');
    });
}

function swipeRightHandler1(event) {
    console.log("swipe right effectué");

    const taskName = $(this).context.textContent;
    
    if (event.data.taskList == taskListDone) {
        ajouterTache(taskListOngoing, taskName);
    }
    else {
        ajouterTache(taskListDone, taskName);
    }

    swipeLeftHandler1();

}


function ajouterTache(taskList = null, taskName = null) {

    if (taskName == null) {
        taskName = task.value;
    }
    if (taskList == null) {
        taskList = taskListOngoing;
    }

    if (taskName.trim() == '')
        return;

    const newTask = document.createElement('li');
    var counter = document.getElementById('taskListOngoing').childElementCount;
    counter++;

    newTask.innerHTML = `<li class="d-flex align-items-center">
    <p class="icon fs-5 text-white">`+counter+`</p>
    <p class="fs-6 fw-semibold align-middle">`+taskName+`</p>
</li>`


    $(newTask).on('swipeleft', swipeLeftHandler1);
    $(newTask).on('swiperight',{taskList : taskList}, swipeRightHandler1);

    $(newTask).hide('slow').appendTo(taskList).show('slow')

    task.value = '';
    task.focus();

    $(taskList).listview('refresh');

}

