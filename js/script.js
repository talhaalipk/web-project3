let numOfTaskCreated;
let numOfTaskDone;
let zeroTaskHtml = `<img class="imageStyle" src="./assets/images/noTask.png" alt="Not have task img" /><h2 class="h2Style">You don't have tasks registered yet</h2><h2 class="h2Style">Create tasks and organize your to-do items</h2>`;
const taskCreaterEle = document.querySelector("#taskCreater");
const taskCompletedEle = document.querySelector("#taskDone");
const taskContainer = document.querySelector("#taskContainer");
const addButton = document.querySelector("#addButton");
const input = document.querySelector("#input");
const errorText = document.querySelector("#errorText");

// console.log(taskCreaterEle);
// console.log(taskCompletedEle);
// console.log(taskContainer);
// console.log(addButton);

function ZeroTaskContent() {
  taskContainer.innerHTML = zeroTaskHtml;
  taskContainer.classList.add("center");
}

function startUp() {
  numOfTaskCreated = 0;
  numOfTaskDone = 0;
  taskCreaterEle.innerHTML = numOfTaskCreated;
  taskCompletedEle.innerHTML = numOfTaskDone;
  ZeroTaskContent();
}

function addnewTask(value) {
  let tempContainer = document.createElement("div");
  tempContainer.innerHTML = `<div class="singleTask"><img class="disable" src="./assets/images/notFill.png" alt="not done" /><div class="content"><p>${value}</p></div><img class="deleteButton" src="./assets/images/delete.png" alt="delete" /></div>`;

  let newtask = tempContainer;

  if (numOfTaskCreated === 0) {
    taskContainer.innerHTML = "";
    taskContainer.classList.remove("center");
  }

  taskContainer.prepend(newtask);
  numOfTaskCreated++;
  taskCreaterEle.innerHTML = numOfTaskCreated;
  taskCompletedEle.innerHTML = `${numOfTaskDone} of ${numOfTaskCreated}`;

  newtask.querySelector(".disable").addEventListener("click", function (e) {
    let fillCircleImg = document.createElement("img");
    fillCircleImg.src = "./assets/images/FillCircle.png";
    fillCircleImg.alt = "completedpaas";
    e.target.replaceWith(fillCircleImg);
    // console.log(fillCircleImg.nextSibling);
    let para = fillCircleImg.nextSibling.querySelector("p");
    // console.log(para);
    let content = para.innerHTML;
    para.innerHTML = `<s>${content}</s>`;
    numOfTaskDone++;
    taskCompletedEle.innerHTML = `${numOfTaskDone} of ${numOfTaskCreated}`;
  });

  newtask
    .querySelector(".deleteButton")
    .addEventListener("click", function (e) {
      console.log(e.target.parentNode);
      e.target.parentNode.remove();
      // removeElement(e.target.parentNode);
      numOfTaskCreated--;

      let parent = e.target.parentNode;
      console.log(parent.querySelector('img').alt);
      if( parent.querySelector('img').alt == "completedpaas")
      {
        console.log("inside");
        numOfTaskDone-- ;
      }

      if (numOfTaskCreated === 0) {
        startUp();
      }
      taskCompletedEle.innerHTML = `${numOfTaskDone} of ${numOfTaskCreated}`;
    });
}

async function clearErrorTextWithDelay() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
  errorText.innerHTML = "";
}

//task addEventListener
addButton.addEventListener("click", (e) => {
  let value = input.value;
  input.value = "";
  // console.log(typeof input.value);

  if (value === "") {
    errorText.innerHTML = "Invalid Input";
    clearErrorTextWithDelay();
  } else {
    addnewTask(value);
  }
});

// Function to add a new task
function addTask() {
  let value = input.value;
  input.value = "";
  // console.log(typeof input.value);

  if (value === "") {
    errorText.innerHTML = "Invalid Input";
    clearErrorTextWithDelay();
  } else {
    addnewTask(value);
  }
}

// Function to handle keypress event
function handleKeyPress(event) {
  if (event.key === 'Enter') { 
    addTask(); 
  }
}

document.querySelector('input').addEventListener("keypress", handleKeyPress);


//Calling functions
startUp();
