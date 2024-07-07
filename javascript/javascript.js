const box = document.querySelector(".box");
const desktop = document.querySelector(".desktop");
const RightClick = document.querySelector(".rightClick");
const rightClickNew = document.querySelector(".rightClick--new");
const taskbar = document.querySelector(".taskbar");
const folderRC = document.querySelector(".folderRightClick");
const rename = document.querySelector(".rename");
const boxName = document.querySelectorAll(".box__folder--name");
const rcNewFolder = document.querySelector(".rcNewFolder");
const nameNbuttons = document.querySelector(".nameNbuttons");
const fileExplorer = document.querySelector(".fileExplorer");
const NavigantionPane = document.querySelector(".navigationPane");
let boxNameInput = document.querySelectorAll(".box__folder--input");
let boxes = document.querySelectorAll(".box");
let selected = document.querySelector(".selected");
// Creating New Folder //
const newFolder = document.createElement("div");
const imgChild = document.createElement("img");
const spanChild = document.createElement("span");
const textareaChild = document.createElement("textarea");
const boxInputs = [];
let boxNames = [];
let getInput;
let selectedBox;
let isDown;
let mx;
let my;
let fx;
let fy;
let movinG;
let folderX;
let folderY;

function stopRenaming() {
  if (selectedBox) {
    selectedBox[0].classList.remove("hidden");
    selectedBox[1].classList.remove("getInput");
    selectedBox[1].classList.add("hidden");
  }
}

/////////////////////////////////////////
//////// Selecting Desktop Boxes ////////
/////////////////////////////////////////
desktop.addEventListener("click", function (e) {
  if (e.target.closest(".box")) {
    boxes.forEach((box) => {
      box.classList.remove("specified");
    });
    e.target.closest(".box").classList.add("specified");
  }

  if (!e.target.closest(".box"))
    boxes.forEach((box) => {
      box.classList.remove("specified");
    });

  boxes.forEach((box) => {
    if (!e.target.classList.contains("getInput")) {
      box.classList.remove("selected");
    }
  });

  RightClick.style.display = "none";
  folderRC.style.display = "none";
});

///////////////////////////////////
///////// Right Click Menu ////////
///////////////////////////////////
desktop.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  RightClick.style.display = "flex";
  folderRC.style.display = "none";

  let x = e.offsetX;
  let y = e.offsetY;
  let winWidth = window.innerWidth;
  let winHeight = window.innerHeight;
  let rcWidth = RightClick.offsetWidth;
  let rcHeight = RightClick.offsetHeight;
  let taskbarHeight = taskbar.offsetHeight;
  let rcnWidth = rightClickNew.offsetWidth;

  folderX = e.offsetX / 80 + 1;
  folderY = e.offsetY / 80 + 1;
  console.log(folderX);
  console.log(folderY);

  if (x > winWidth - rcWidth - rcnWidth) {
    rightClickNew.style.left = "-100%";
  } else {
    rightClickNew.style.left = "100%";
  }

  x = x > winWidth - rcWidth ? winWidth - rcWidth : x;
  y =
    y > winHeight - rcHeight - taskbarHeight
      ? winHeight - rcHeight - taskbarHeight
      : y;

  RightClick.style.left = `${x}px`;
  RightClick.style.top = `${y}px`;
  boxes.forEach((box) => {
    if (box.classList.contains("selected")) {
      stopRenaming();
    }
    box.classList.remove("selected");
    box.classList.remove("specified");
  });

  ///////////////////////////////////////
  ///////// Box Right Click Menu ////////
  ///////////////////////////////////////

  if (e.target.closest(".box")) {
    let focusedBox = e.target.closest(".box");
    let bx = e.pageX;
    let by = e.pageY;
    boxes.forEach((box) => {
      if (box.classList.contains("selected")) {
        stopRenaming();
      }
    });

    boxes.forEach((box) => {
      box.classList.remove("selected");
      box.classList.remove("specified");
    });
    focusedBox.classList.add("selected");
    selected = document.querySelector(".selected");

    focusedBox.classList.add("specified");
    selectedBox = document.querySelectorAll(
      ".selected > span, .selected > textarea"
    );

    folderRC.style.display = "flex";
    RightClick.style.display = "none";

    bx =
      bx > winWidth - folderRC.offsetWidth
        ? winWidth - folderRC.offsetWidth
        : bx;
    by =
      by > winHeight - folderRC.offsetHeight - taskbarHeight
        ? winHeight - folderRC.offsetHeight - taskbarHeight
        : by;

    folderRC.style.left = `${bx}px`;
    folderRC.style.top = `${by}px`;
  }
});

//////////////////////////////
////////// Rename ////////////
//////////////////////////////
rename.addEventListener("click", (e) => {
  e.stopPropagation();

  folderRC.style.display = "none";
  selectedBox[0].classList.add("hidden");
  selectedBox[1].classList.add("getInput");
  selectedBox[1].classList.remove("hidden");

  for (input of boxNameInput) {
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  }

  getInput = document.querySelector(".getInput");
  getInput.focus();
  getInput.select();

  getInput.addEventListener("input", Value);
  function Value(e) {
    newName = e.target.value;
    selectedBox[0].textContent = `${newName}`;
    selectedBox[1].textContent = `${newName}`;
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("getInput")) {
    stopRenaming();
  }
});

for (input of boxNameInput) {
  input.addEventListener("input", function (e) {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
}

/////////////////////////////////////////////////////
//////// Box And Input Names To Adding Array ////////
/////////////////////////////////////////////////////

boxName.forEach((names) => {
  boxNames.push(names.textContent);
});

boxNameInput.forEach((inputs) => {
  boxInputs.push(inputs.textContent);
});

function addNewName(arr, name) {
  let newName = name;
  let count = 2;
  while (arr.includes(newName)) {
    newName = `${name} (${count})`;
    count++;
  }
  return newName;
}

let changingArea = function (e) {
  document.querySelector(".selected").style.gridColumn = Math.floor(folderX);
  document.querySelector(".selected").style.gridRow = Math.floor(folderY);
};

///////////////////////////////////
//////// Create New Folder ////////
///////////////////////////////////
rcNewFolder.addEventListener("click", function (e) {
  e.stopPropagation();
  newFolder.classList.add("box", "selected");
  imgChild.classList.add("box__folder--icon");
  imgChild.src = "icons/folder.svg";
  imgChild.alt = "Folder";
  spanChild.classList.add("box__folder--name");
  spanChild.textContent = addNewName(boxNames, "New Folder");
  textareaChild.classList.add("box__folder--input", "hidden");
  textareaChild.rows = 1;
  textareaChild.textContent = spanChild.textContent;
  newFolder.appendChild(imgChild);
  newFolder.appendChild(spanChild);
  newFolder.appendChild(textareaChild);
  desktop.insertAdjacentHTML("beforeend", newFolder.outerHTML);
  boxes = document.querySelectorAll(".box");
  boxNames.push(spanChild.textContent);
  boxInputs.push(textareaChild.textContent);
  boxNameInput = document.querySelectorAll(".box__folder--input");
  RightClick.style.display = "none";

  selectedBox = document.querySelectorAll(
    ".selected > span, .selected > textarea"
  );

  selectedBox[0].classList.add("hidden");
  selectedBox[1].classList.add("getInput");
  selectedBox[1].classList.remove("hidden");

  for (input of boxNameInput) {
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  }
  getInput = document.querySelector(".getInput");
  getInput.focus();
  getInput.select();

  getInput.addEventListener("input", Value);
  function Value(e) {
    newName = e.target.value;
    selectedBox[0].textContent = `${newName}`;
    selectedBox[1].textContent = `${newName}`;
  }

  boxes = document.querySelectorAll(".box");

  changingArea();
});

//////////////////////////////////
////////// Delete Folder /////////
//////////////////////////////////
const deleteFolder = document.querySelector(".delete");

deleteFolder.addEventListener("click", function (e) {
  selectedBox = document.querySelectorAll(
    ".selected > span, .selected > textarea"
  );
  let folderName = selectedBox[0].textContent;
  boxNames = boxNames.filter((n) => n !== folderName);
  console.log(boxNames);
  selected.remove();
  folderRC.style.display = "none";
});

/////////////////////////////////////////////////////
desktop.addEventListener("mousemove", function (e) {
  e.preventDefault();

  if (isDown) {
    mx = e.pageX / 80 + 1;
    my = e.pageY / 80 + 1;
    fx = Math.floor(mx);
    fy = Math.floor(my);
    // console.log(movinG);

    movinG.style.gridRow = fy;
    movinG.style.gridColumn = fx;
    // movinG.style.zIndex = "1";
  }
});

desktop.addEventListener("mousedown", function (e) {
   e.preventDefault();
  if (e.target.closest(".box")) {
    boxes.forEach((box) => {
      box.classList.remove("specified");
      box.classList.remove("selected");
    });

 

    isDown = true;
    e.target.closest(".box").classList.add("moving");
    movinG = document.querySelector(".moving");
  }
});

document.addEventListener("mouseup", function (e) {
  isDragging = false;
  isDown = false;
  boxes.forEach((box) => {
    box.classList.remove("moving");
  });
});

//////////////////////////////////////
//////////// File Explorer ///////////
//////////////////////////////////////

let x;
let y;
let x1;
let y1;
let isDragging = false;

nameNbuttons.addEventListener("mousedown", function (e) {
  e.preventDefault();
  isDragging = true;
  x1 = e.offsetX;
  y1 = e.offsetY;
});
nameNbuttons.addEventListener("mouseup", function (e) {
  isDragging = false;
});

document.addEventListener("mousemove", function (e) {
  x = e.pageX;
  y = e.pageY;
  if (isDragging) {
    fileExplorer.style.left = `${x - x1}px`;
    fileExplorer.style.top = `${y - y1}px`;
  }
});

let boxNames2 = [];
boxes.forEach((box) => {
  explorerNameArea = document.createElement("span");
  explorerNameArea.textContent = box.children[1].textContent;
  NavigantionPane.appendChild(explorerNameArea);
});



/////////////////////////////////////////
//            Start Menu               //
/////////////////////////////////////////
const openStartMenu = document.querySelector(".o-start");
const start = document.querySelector(".start");

openStartMenu.addEventListener("click", () => {
  start.classList.toggle("hidden");
});

//////////////////////////////////////////

function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let timeString = hours + ":" + minutes + ":" + seconds;
  let dateString = day + "/" + month + "/" + year;

  document.querySelector(".clock").innerHTML = timeString;
  document.querySelector(".date").innerHTML = dateString;
}

setInterval(updateClock, 1000);
updateClock();
