// Import the CSS file to apply styles to the page
import "./style.css";

// Define constants and variables for the game
const per_click_increase: number = 1; // Increase in fishies per click
const fishies_per_second: number = 1; // Fishies per second for auto click
let total_fishies: number = 0; // Total fishies collected

// Get the app container from the HTML document
const app: HTMLDivElement = document.querySelector("#app")!;

// Initialize an array to store HTML elements
const elements_to_add: HTMLElement[] = [];

// Set the game name and title
const gameName = "fishy fish";
const buttonName = "🐟";
document.title = gameName;

// Create a header element with the game name
create_new_element("header1", "", gameName);

// Create a counter element to display the total fishies captured
const total_fishies_counter_element = create_new_element(
  "div",
  "35px",
  total_fishies + " fishies captured",
);

// Create a button element with the fish emoji
const button = create_new_element("button", "70px", buttonName);

// Add a click event listener to the button to increase the fishies count
button.addEventListener("click", () => {
  update_counter(
    total_fishies_counter_element,
    per_click_increase,
    " fishies captured",
  );
});

// Create an element to display auto clicks per second
create_new_element("div", "35px", fishies_per_second + " fps");

// Start auto counter for fishies per second
start_auto_counter(total_fishies_counter_element, fishies_per_second);

// Add all created elements to the app container
elements_to_add.forEach((elem) => {
  app.append(elem);
});

// Function to create a new HTML element
function create_new_element(type: string, font_size: string, text: string) {
  const new_element = document.createElement(type);
  new_element.style.fontSize = font_size;
  new_element.innerHTML = text;
  elements_to_add.push(new_element); // Add the element to the array

  return new_element;
}

// Function to update the fishies counter
function update_counter(
  count_element: HTMLDivElement | HTMLElement,
  count: number,
  text: string = " fishies captured",
) {
  total_fishies = total_fishies + count;
  count_element.innerHTML = total_fishies + text;
}

// Function to automatically update the counter at a specified rate
function start_auto_counter(elem: HTMLElement, pps: number) {
  let past_date = performance.now();
  window.requestAnimationFrame(check_for_counter_update);

  function check_for_counter_update() {
    const milliseconds_per_update = 1000 / pps;

    // Check if it's time to update the counter and update it
    if (performance.now() - past_date > milliseconds_per_update) {
      update_counter(elem, 1);
      past_date = performance.now();
    }
    window.requestAnimationFrame(check_for_counter_update); // Request the next frame
  }
}
