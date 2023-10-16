import "./style.css";
import { world_state, upgrade, upgrade_data } from "./elements"; // Import the world_state and upgrade classes from the 'elements' module

const app: HTMLDivElement = document.querySelector("#app")!; // Select the HTML element with id "app"

const available_upgrades: upgrade_data[] = [
  { name: "⛵️paddle boat", cost: 10, rate: 0.1 },
  { name: "🚤speed boat", cost: 100, rate: 2 },
  { name: "🚢yacht", cost: 1000, rate: 50 },
];

// Create a counter element to display the total fishies captured
const total_fishies_counter_element = document.createElement("div");
total_fishies_counter_element.style.fontSize = "40pt";
total_fishies_counter_element.innerHTML = 0 + " fishies captured";

// Create a player instance with the world_state and attach the total fishies counter
const player: world_state = new world_state(total_fishies_counter_element);
player.elements_to_add.push(total_fishies_counter_element); // Add the counter element to the list of elements to add

// Set game title and create header element
const gameName = "fishy fish";
const buttonName = "🐟";
document.title = gameName;
create_new_element("header", "", gameName, true); // Create a header element and add it to the player's elements_to_add

// Create a button element
const button = create_new_element("button", "50px", buttonName);

// Add a click event listener to the button to increase fishies count when clicked
button.addEventListener("click", () => {
  player.update_counter(player.per_click_increase);
});

// Create an element to display the fishies per second count
const autoclick_element = create_new_element(
  "div",
  "30px",
  player.fishies_per_second.toFixed(1) + " fps",
);
player.fishies_per_second_count_element = autoclick_element as HTMLDivElement; // Set the fishies per second count element in the world_state
start_auto_counter(player); // Start automatic fishies per second counter

// Create an upgrade button
//Create Upgrade buttons
available_upgrades.forEach((data) => {
  new upgrade(data.name, data.cost, data.rate, 1.15, player);
});

// Add all elements to the app in the order they were created
player.elements_to_add.forEach((elem) => {
  app.append(elem);
});

// Function to create a new HTML element and add it to the player's elements_to_add
function create_new_element(
  type: string,
  font_size: string,
  text: string,
  unshift: boolean = false,
): HTMLElement | HTMLButtonElement | HTMLDivElement {
  const new_element = document.createElement(type);
  new_element.style.fontSize = font_size;
  new_element.innerHTML = text;

  if (unshift) {
    player.elements_to_add.unshift(new_element); // Add to the beginning of the list
  } else {
    player.elements_to_add.push(new_element); // Add to the end of the list
  }

  return new_element;
}

// Function to automatically update the counter based on fishies per second
function start_auto_counter(player_world_state: world_state) {
  let past_date = performance.now();
  window.requestAnimationFrame(check_for_counter_update);

  function check_for_counter_update() {
    const milliseconds_per_update =
      1000 / player_world_state.fishies_per_second;

    if (performance.now() - past_date > milliseconds_per_update) {
      player.update_counter(1); // Update the counter by 1 fishie
      past_date = performance.now();
    }
    window.requestAnimationFrame(check_for_counter_update); // Continue checking for updates
  }
}
