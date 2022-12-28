document.addEventListener('deviceready', function(){
    // Change the color
    window.plugins.headerColor.tint("#becb29");
}, false);


$(document).ready(function() {
    task.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          ajouterTache();
        }
      });

    const empty = document.createElement("p");
    empty.innerText = "Aucune Tache"

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
        $(this).hide('slow', function(){
            $(this).remove();
            $(taskListDone).listview('refresh');
        });
    }
    else {
        ajouterTache(taskListDone, taskName);
        $(this).hide('slow', function(){
            $(this).remove();
            $(taskListOngoing).listview('refresh');
        });
    }

    $(taskListOngoing).listview('refresh');
    $(taskListDone).listview('refresh');
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
    var counter = taskList.childElementCount;
    counter++;

    newTask.innerHTML = `<li>
    <i class="icon mx-3 fa-solid fa-`+counter+` fa-1x"></i>
    <p class="fs-6 fw-semibold align-middle">`+taskName+`</p>
</li>`


    $(newTask).on('swipeleft', swipeLeftHandler1);
    $(newTask).on('swiperight',{taskList : taskList}, swipeRightHandler1);

    taskList.append(newTask);

    task.value = '';
    task.focus();

    $(taskList).listview('refresh');

}

