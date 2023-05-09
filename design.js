const labelData = document.querySelector(".label__data");
const thumbnail = document.querySelector("#thumbnail");
const titleHeader = document.querySelector("#title");
const desc = document.querySelector("#desc");
const style = document.querySelector("style");
const completed = document.querySelector(".completed");

// fetch data
const gettingProgrammingHeroData = async function () {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/course/curriculum"
  );
  const datas = await res.json();

  return datas.data;
};

const displayData = function () {
  labelData.innerHTML = "";

  gettingProgrammingHeroData().then((res) =>
    res.forEach((data) => {
      const { description, _id, modules, name, images } = data;

      const htmlText = ` <div class="label__data mobin${_id}" id = "${_id}">
      <label for="${_id}">
        <div id = "${_id}" class="header" onclick = "selectedElement(this)" >
          <input type="checkbox" name="${_id}" id="${_id}" />
          <p>${name}</p>
        </div>

        <div class="panel">
          <ul>
            ${modules
              .map((module) => {
                return `<li>${module.name}</li>`;
              })
              .join("")}
          </ul>
        </div>

        <i class="fa-solid fa-angle-down angle__down"></i>
      </label>
    </div>`;

      labelData.insertAdjacentHTML("beforebegin", htmlText);
    })
  );
};
displayData();

function selectedElement(labelData) {
  const currPanel = labelData.nextElementSibling;
  const panelHeight = currPanel.scrollHeight;
  const activeAngles = document.querySelector(".angle__down-active");
  const activePanel = document.querySelector(".panel__active");

  if (activeAngles) {
    activeAngles.classList.remove("angle__down-active");
  }

  if (!currPanel.classList.contains("panel__active") && activePanel) {
    activePanel.classList.remove("panel__active");
    activePanel.style.height = 0;
    currPanel.nextElementSibling.classList.remove("angle__down-active");
  }

  // i dont know  how to toggle this button . cz here is currPanel property from scrollHeight
  currPanel.classList.add("panel__active");
  currPanel.style.height = `${panelHeight}px`;
  currPanel.nextElementSibling.classList.add("angle__down-active");

  // change the picture and description and title
  gettingProgrammingHeroData().then((res) => {
    res.forEach(({ _id, image, name, description }) => {
      if (labelData.id === _id) {
        thumbnail.src = image;
        desc.textContent = description;
        titleHeader.textContent = name;
      }
    });
  });

  // change the title from modules video title
  const moduleTitle = labelData.nextElementSibling.querySelectorAll("ul li");
  moduleTitle.forEach((title) => {
    title.addEventListener("click", (eve) => {
      const text = eve.target.textContent;
      titleHeader.textContent = text;
    });
  });

  // course complete
  const checkBoxs = document.querySelectorAll("input[type='checkbox']");
  const pending = document.querySelector(".pending");

  checkBoxs.forEach((checkbox) => {
    checkbox.addEventListener("change", (eve) => {
      if (eve.target.checked) {
        eve.target.parentElement.parentElement.remove();
        completed.appendChild(eve.target.parentElement.parentElement);
      } else {
        pending
          .querySelector(`.mobin${eve.target.id}`)
          .appendChild(eve.target.parentElement.parentElement);
      }
      completed.style.opacity = 1;
    });
  });
}
