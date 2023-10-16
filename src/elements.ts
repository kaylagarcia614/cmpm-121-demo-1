// Define a class to represent the state of the world
export class world_state {
  per_click_increase: number; // Amount of fishies added per click
  fishies_per_second: number; // Fishies generated per second
  total_fishies: number; // Total count of fishies
  elements_to_add: HTMLElement[] = []; // Array to hold HTML elements
  total_fishies_count_element: HTMLDivElement; // Element to display total fishies count
  upgrade_buttons: upgrade[] = []; // Array to hold upgrade buttons
  fishies_per_second_count_element: HTMLDivElement | null = null; // Element to display fishies per second

  constructor(total_fishies_counter_element: HTMLDivElement) {
    this.elements_to_add = [];
    this.upgrade_buttons = [];

    this.per_click_increase = 1; // Default click increase value
    this.fishies_per_second = 0; // Default fishies per second value
    this.total_fishies = 0; // Default total fishies count
    this.total_fishies_count_element = total_fishies_counter_element; // Element to display total fishies count
  }

  // Method to update the total fishies count and update the displayed text
  update_counter(count: number, text: string = " fishies captured") {
    this.total_fishies = count + this.total_fishies;
    this.total_fishies_count_element.innerHTML = this.total_fishies + text;
    this.check_buttons();
  }

  // Method to check and enable/disable upgrade buttons based on total fishies count
  check_buttons() {
    this.upgrade_buttons.forEach((btn) => {
      if (this.total_fishies >= btn.cost) {
        btn.button_element.disabled = false;
      } else {
        btn.button_element.disabled = true;
      }
    });
  }
}

// Define a class to represent an upgrade button
export class upgrade {
  button_element: HTMLButtonElement; // The HTML button element
  cost: number; // Cost of the upgrade
  per_second_increase: number; // Increase in fishies per second
  price_scaling: number; // Scaling factor for the upgrade cost
  emoji_name: string; // Name or emoji associated with the upgrade
  world_state: world_state; // Reference to the world state

  constructor(
    emoji: string,
    cost: number,
    psi: number,
    p_scaling: number,
    world: world_state,
  ) {
    this.emoji_name = emoji;
    this.button_element = document.createElement("button");
    this.button_element.style.fontSize = "40pt";
    this.cost = cost;
    this.per_second_increase = psi;
    this.price_scaling = p_scaling;
    this.world_state = world;

    // Set the text and disable the button by default
    this.button_element.innerHTML =
      this.emoji_name +
      " Cost: " +
      cost +
      " | " +
      this.per_second_increase.toFixed(1) +
      " fps";
    this.button_element.disabled = true;

    // Add the button element to the world's elements_to_add array
    world.elements_to_add.push(this.button_element);

    // Add a click event listener to the button
    this.button_element.addEventListener("click", () => {
      world.update_counter(cost * -1, undefined); // Update total fishies count
      this.cost = this.cost * this.price_scaling; // Increase the cost for the next upgrade
      this.update_fishies_per_second(); // Update fishies per second count
    });

    // Add the upgrade button to the world's upgrade_buttons array
    this.world_state.upgrade_buttons.push(this);
  }

  // Method to update the fishies per second count
  update_fishies_per_second() {
    this.world_state.fishies_per_second =
      this.world_state.fishies_per_second + this.per_second_increase;

    // If there's a fishies per second count element, update its text
    if (this.world_state.fishies_per_second_count_element != null) {
      this.world_state.fishies_per_second_count_element.innerHTML =
        this.world_state.fishies_per_second.toFixed(1) + " fps";
    }
  }
}
