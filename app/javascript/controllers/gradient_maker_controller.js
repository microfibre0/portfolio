import { Controller } from "@hotwired/stimulus"
// Connects to data-controller="gradient-maker"
export default class extends Controller {
  colorCount = 0;

  static targets = [
    "background",
    "singular_color",
    "color_wheel_container",
    "color_wheel_label",
    "color_button",
    "color_code",
    "color_css",
    "color_input",
    "colors",
    "range_input",
    "deg_display"
  ];

  connect() {
    console.log("CONNECTED")
  };

  add_color() {
    this.colorCount += 1;
    this.colorsTarget.innerHTML += `        <div class=" col-3 d-flex flex-column align-items-center" data-gradient-maker-target="singular_color" data-index="${this.colorCount}" data-hex="#ffffff">
          <button class="border rounded-pill pxh-40" data-gradient-maker-target="color_button" data-action="click->gradient-maker#choose_colorX">color ${this.colorCount}</button>
          <p class="text-white "data-gradient-maker-target="color_code">#ffffff</p>
        </div>`;

    this.display_gradient();
  };

  remove_color() { //remove color being targeted
    let target = this.color_wheel_containerTarget.dataset.targeting;
    let deleted = false;
    this.singular_colorTargets.forEach((element) => {
      if (deleted) {
        element.dataset.index = String(Number(element.dataset.index) - 1);
        element.firstElementChild.innerHTML = `color ${element.dataset.index}`;
      } else if (element.dataset.index == target) {
        element.remove()
        deleted = true;
        this.color_wheel_containerTarget.classList.add("d-none");
        this.colorCount -= 1;
      };
    });
    this.display_gradient();
  };

  choose_colorX(event) { //open color wheel and target color to be edited
    let index = event.target.parentElement.dataset.index; //get color index
    let color = event.target.parentElement.dataset.hex; //get color hexadecimal

    this.color_wheel_containerTarget.dataset.targeting = index; //set index to color being targeted for edit
    this.color_wheel_labelTarget.innerHTML = `color ${index}`; // display color being targeted
    this.color_inputTarget.value = color;

    this.color_wheel_containerTarget.classList.remove("d-none");
  };

  Pick_color_val() { //
    let colorValue = this.color_inputTarget.value
    let target = this.color_wheel_containerTarget.dataset.targeting;

    this.singular_colorTargets.forEach((element) => {
      if (element.dataset.index == target) {
        element.dataset.hex = colorValue;
        element.lastElementChild.innerHTML = colorValue;
        element.firstElementChild.style.backgroundColor = colorValue;
      };
    });

  };

  display_gradient() {
    if (this.colorCount >= 0) {
      this.backgroundTarget.style.background = `#ffffff`;
      this.color_cssTarget.innerHTML = ``;
    }

    this.backgroundTarget.style.background = this.generate_gradient();
    this.color_cssTarget.innerHTML = `background: ${this.generate_gradient()}`;
  }

  generate_gradient() {
    let gradient_css = `linear-gradient(${this.range_inputTarget.value}deg`;
    console.log(this.range_inputTarget.value)
    this.singular_colorTargets.forEach((element) => {
      gradient_css += `, ${element.dataset.hex}`;
    });
    gradient_css += ")";

    return gradient_css
  }

  displayDeg() {
    console.log("KEYUP");
    this.deg_displayTarget.innerHTML = `${this.range_inputTarget.value}deg`;
    this.display_gradient();
  }

};
