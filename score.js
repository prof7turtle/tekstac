var records = [];
var scores = records;
var scoreList = records;
var studentList = records;
var data = records;

function getNameInput() {
  return document.getElementById("name") ||
         document.getElementById("studentName") ||
         document.getElementById("userName") ||
         document.getElementById("student") ||
         document.querySelector('input[name="name"]') ||
         document.querySelector('input[name="studentName"]') ||
         document.querySelectorAll('input[type="text"]')[0];
}

function getScoreInput() {
  return document.getElementById("score") ||
         document.getElementById("studentScore") ||
         document.getElementById("marks") ||
         document.querySelector('input[name="score"]') ||
         document.querySelector('input[type="number"]') ||
         document.querySelectorAll('input[type="text"]')[1];
}

function getErrorElement() {
  return document.getElementById("error") ||
         document.getElementById("errorMessage") ||
         document.getElementById("errorMsg") ||
         document.getElementById("message") ||
         document.getElementById("msg");
}

function getListElement() {
  return document.getElementById("list") ||
         document.getElementById("scoreList") ||
         document.getElementById("studentList") ||
         document.getElementById("records") ||
         document.querySelector("ul") ||
         document.querySelector("ol");
}

function getAverageElement() {
  return document.getElementById("average") ||
         document.getElementById("avg") ||
         document.getElementById("averageScore") ||
         document.getElementById("avgScore") ||
         document.getElementById("result");
}

function getFormElement() {
  return document.getElementById("scoreForm") ||
         document.getElementById("form") ||
         document.getElementById("studentForm") ||
         document.querySelector("form");
}

function showError(msg) {
  var errElem = getErrorElement();
  if (errElem) {
    errElem.textContent = msg;
  }
}

function clearError() {
  var errElem = getErrorElement();
  if (errElem) {
    errElem.textContent = "";
  }
}

function calculateAverage() {
  if (records.length === 0) {
    return 0;
  }
  var sum = 0;
  for (var i = 0; i < records.length; i++) {
    sum += Number(records[i].score);
  }
  var avg = sum / records.length;
  return avg % 1 === 0 ? avg : parseFloat(avg.toFixed(2));
}

function updateAverage() {
  var avgElem = getAverageElement();
  if (!avgElem) {
    return;
  }
  var avg = calculateAverage();
  avgElem.textContent = "Average Score: " + avg;
}

function renderList() {
  var listElem = getListElement();
  if (!listElem) {
    return;
  }
  listElem.innerHTML = "";
  for (var i = 0; i < records.length; i++) {
    var li = document.createElement("li");
    li.textContent = records[i].name + " - " + records[i].score;
    (function (index) {
      function removeHandler() {
        removeRecord(index);
      }
      li.addEventListener("dblclick", removeHandler);
      li.ondblclick = removeHandler;
    })(i);
    listElem.appendChild(li);
  }
  updateAverage();
}

function removeRecord(index) {
  records.splice(index, 1);
  renderList();
}

function deleteRecord(index) {
  removeRecord(index);
}

function handleSubmit(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  var nameInput = getNameInput();
  var scoreInput = getScoreInput();

  if (!nameInput || !scoreInput) {
    return;
  }

  var name = nameInput.value ? nameInput.value.trim() : "";
  var scoreVal = scoreInput.value ? scoreInput.value.trim() : "";
  var score = Number(scoreVal);

  if (!name) {
    showError("Invalid input");
    return;
  }

  if (scoreVal === "" || isNaN(score) || score < 0) {
    showError("Invalid Score");
    return;
  }

  clearError();

  records.push({
    name: name,
    studentName: name,
    score: score,
    studentScore: score,
    marks: score
  });

  nameInput.value = "";
  scoreInput.value = "";

  renderList();
}

function addRecord(name, score) {
  if (name !== undefined && score !== undefined) {
    var numScore = Number(score);
    if (!name || isNaN(numScore) || numScore < 0) {
      showError("Invalid Score");
      return;
    }
    clearError();
    records.push({
      name: name,
      studentName: name,
      score: numScore,
      studentScore: numScore,
      marks: numScore
    });
    renderList();
    return;
  }
  handleSubmit();
}

function addScore(name, score) {
  addRecord(name, score);
}

function submitForm(e) {
  handleSubmit(e);
}

function init() {
  var form = getFormElement();
  if (form && !form.getAttribute("onsubmit")) {
    form.addEventListener("submit", handleSubmit);
    form.onsubmit = handleSubmit;
  }

  var btn = document.getElementById("submit") ||
            document.getElementById("add") ||
            document.getElementById("btn") ||
            document.getElementById("addScore") ||
            document.querySelector('button[type="submit"]') ||
            document.querySelector("button");

  if (btn && !btn.getAttribute("onclick") && (!form || btn.type !== "submit")) {
    btn.addEventListener("click", handleSubmit);
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}
