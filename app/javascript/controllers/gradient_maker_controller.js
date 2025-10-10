import { Controller } from "@hotwired/stimulus"
// Connects to data-controller="gradient-maker"
export default class extends Controller {
  static targets = [
    "background",
    "singular_color",
    "color_wheel_container",
    "color_wheel_label",
    "color_button",
    "color_code",
    "color_css",
    "color_input",
    "colors"
  ];


  connect() {
    console.log("CONNECTED")
  };

  add_color() {
    let color_count = this.colorsTarget.dataset.colorcount || "1"; //get or set index of color
    this.colorsTarget.dataset.colorcount = String(Number(color_count) + 1); //increment index befor adding new color

    this.colorsTarget.innerHTML += `        <div class=" col-3 d-flex flex-column align-items-center" data-gradient-maker-target="singular_color" data-index="${color_count}" data-hex="#ffffff">
          <button class="border rounded-pill pxh-50" data-gradient-maker-target="color_button" data-action="click->gradient-maker#choose_colorX">color ${color_count}</button>
          <p class="text-white "data-gradient-maker-target="color_code">#ffffff</p>
        </div>`;
  };

  remove_color() { //remove color being targeted
    let target = this.color_wheel_containerTarget.dataset.targeting;
    let color_count = this.colorsTarget.dataset.colorcount;
    let deleted = false;
    this.singular_colorTargets.forEach((element) => {
      if (deleted) {
        element.dataset.index = String(Number(element.dataset.index) - 1);
        element.firstElementChild.innerHTML = `color ${element.dataset.index}`;
      } else if (element.dataset.index == target) {
        element.remove()
        deleted = true;
        this.color_wheel_containerTarget.classList.add("d-none");
        this.colorsTarget.dataset.colorcount = String(Number(color_count) - 1);
      };
    });

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
    this.backgroundTarget.style.background = this.generate_gradient();
    this.color_cssTarget.innerHTML = `background: ${this.generate_gradient()}`;
  }

  generate_gradient() {
    let gradient_css = "linear-gradient(90deg";
    this.singular_colorTargets.forEach((element) => {
      gradient_css += `, ${element.dataset.hex}`;
    });
    gradient_css += ")";

    return gradient_css
  }

};
