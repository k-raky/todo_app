
/* 
function ajouterTache() {
    const taskName = task.value;

    if (taskName.trim() == '')
        return;

    const newTask = document.createElement('li');

    newTask.innerHTML = taskName;

    $(newTask).on('swipeleft', swipeLeftHandler1);
    $(newTask).on('swiperight', swipeRightHandler1);

    taskListOngoing.append(newTask);

    task.value = '';
    task.focus();

    $(taskListOngoing).listview('refresh');
} */

function reinitialiser() {
    taskListDone.innerHTML = '';
    taskListOngoing.innerHTML = '';
}

function swipeLeftHandler1() {
    console.log("swipe left effectué");
    $(this).hide('slow', function () {
        $(this).remove();
        $(taskListOngoing).listview('refresh');
    });
}

function swipeRightHandler1() {
    console.log("swipe right effectué");
    const taskName = $(this).context.textContent;

    const newTask = document.createElement('li');

    newTask.innerHTML = taskName;

    $(newTask).on('swipeleft', swipeLeftHandler2);

    taskListDone.append(newTask);

    //removing entry from the previous list
    $(this).hide('slow', function () {
        $(this).remove();
        $(taskListOngoing).listview('refresh');
    });

    $(taskListOngoing).listview('refresh');
    $(taskListDone).listview('refresh');
}

function swipeLeftHandler2() {
    console.log("swipe left effectué");
    $(this).hide('slow', function () {
        $(this).remove();
        $(taskListDone).listview('refresh');
    });
}

function ajouterTache(taskList) {

    const taskName = task.value;

    if (taskName.trim() == '')
        return;

    const newTask = document.createElement('li');
    const counter = document.getElementById('taskListOngoing').childElementCount;

    newTask.innerHTML = `<li class="d-flex align-items-center border-bottom">
    <p class="icon mx-2 fs-3 text-white">`+counter+1+`</p>
    <p class="fs-6 fw-semibold align-middle">`+taskName+`</p>
</li>`


    $(newTask).on('swipeleft', swipeLeftHandler1);
    $(newTask).on('swiperight', swipeRightHandler1);

    taskList.append(newTask);

    task.value = '';
    task.focus();

    $(taskList).listview('refresh');

}

