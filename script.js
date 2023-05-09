const title = document.querySelector("#title");
const finished = document.querySelector(".finished");
const pending = document.querySelector(".pending");
const labelData = document.querySelector(".label-data");
const toggleBtn = document.querySelectorAll(".toggle-btn button");
const thumbnail = document.querySelector("#thumbnail");

function gettingProgrammingHeroData() {
  fetch("http://openapi.programming-hero.com/api/course/curriculum")
    .then((jsonRes) => {
      return jsonRes.json();
    })
    .then((PHUserData) => {
      const data = PHUserData.data;
      PHData(data);
    })
    .catch((err) => console.log(err));
}
gettingProgrammingHeroData();
function PHData(data) {
  let text = "";
  data.map((item) => {
    const d = item.modules.map((i) => {
      return "<li>" + i.name + "</li>";
    });
    text += `<div>  <label for="#">
    <input type="checkbox" name="text" />
   <p id = "${item._id}"> ${item.name}</p>
    <div class="panel">
        <ul> 
         ${d}
        </ul>
    </div>
  </label> <i class="fa-solid fa-angle-down"></i></div>`;
  });
  text = text.replace(/,/g, "");
  labelData.innerHTML = text;
  paras(data);
  checkbox();
  listClick();
}

// labels
function paras(imgData) {
  const paras = document.querySelectorAll("p");
  const imgD = imgData.map((img) => img.image);
  finished.style.display = "none";
  const labelsArr = Array.from(paras);
  labelsArr.map((para) => {
    para.addEventListener("click", (eve) => {
      title.innerHTML = eve.target.textContent;
      thumbnail.src = imgD[eve.target.id];

      var panel = para.nextElementSibling.children[0];

      para.classList.toggle("ul-js");

      if (panel.style.height) {
        panel.style.height = null;
        para.parentElement.nextElementSibling.classList.remove(
          "label-data-div-i"
        );
      } else {
        para.parentElement.nextElementSibling.classList.add("label-data-div-i");
        panel.style.height = panel.scrollHeight + "px";
      }
    });
  });
}
// Checkbox;
function checkbox() {
  const checkBox = document.querySelectorAll("input[type = checkbox]");
  const checkBoxArr = Array.from(checkBox);
  checkBoxArr.map((checkBox) => {
    checkBox.addEventListener("click", (eve) => {
      if (checkBox.checked) {
        if (labelData.children.length === 1) {
          pending.style.display = "none";
        }
        const di = eve.target.parentElement.parentElement;
        finishedCourse(di);
      }
    });
  });
}

function finishedCourse(eve) {
  finished.style.display = "block";
  eve.remove();
  finished.classList.add("finished-data");
  finished.appendChild(eve);
  toggleBtn[1].parentElement.classList.remove("btn-none");
}

function listClick() {
  const list = document.querySelectorAll("li");
  Array.from(list).map((l) => {
    l.addEventListener("click", (eve) => {
      title.innerHTML = eve.target.textContent;
    });
  });
}

function fullHight() {
  Array.from(toggleBtn).map((t) => {
    t.addEventListener("click", function () {
      t.classList.toggle("hello");
      var panel = t.parentElement.previousElementSibling;
      console.log();
      if (panel.style.height) {
        panel.style.height = null;
        panel.nextElementSibling.children[0].classList.remove(
          "toggle-btn-90deg"
        );
      } else {
        panel.style.height = panel.scrollHeight + "px";
        panel.nextElementSibling.children[0].classList.add("toggle-btn-90deg");
      }
    });
  });
}
fullHight();
