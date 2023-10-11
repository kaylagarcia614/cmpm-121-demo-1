import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let elements_to_add: HTMLElement[] = [];
elements_to_add = [];

const gameName = "My very cool game";
const buttonName = "🐟";

document.title = gameName;

//header
create_new_element("header1", "", gameName);

//counter
let total_fishies: number = 0;
const counter_element = create_new_element(
  "div",
  "35px",
  total_fishies + "fishies captured",
);

//button
const button = create_new_element("button", "50px", buttonName);

// click
const num_to_increase: number = 1;
button.addEventListener("click", () => {
  update_counter(
    counter_element,
    total_fishies,
    num_to_increase,
    " fishies captured",
  );
});

//Auto Click
const per_second_counter: number = 1;
const updates_per_second: number = 1;

create_new_element("div", "30px", per_second_counter + " fishies");

//Interval
setInterval(() => {
  update_counter(
    counter_element,
    total_fishies,
    per_second_counter / updates_per_second,
  );
}, updates_per_second * 1000);

//Add all elements in order
elements_to_add.forEach((elem) => {
  app.append(elem);
});

//Update counter function
function update_counter(
  count_element: HTMLDivElement | HTMLElement,
  counter: number,
  count: number,
  text: string = " fishies captured",
) {
  total_fishies = counter + count;
  count_element.innerHTML = total_fishies + text;
}

// Create a new HTML element function
function create_new_element(type: string, font_size: string, text: string) {
  const new_element = document.createElement(type);
  new_element.style.fontSize = font_size;
  new_element.innerHTML = text;
  elements_to_add.push(new_element);

  return new_element;
}
