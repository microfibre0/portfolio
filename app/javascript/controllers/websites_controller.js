import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="websites"
export default class extends Controller {
  static targets = ["iframe"];
  connect() {
  }

  show_website(event) {
    let iframe = this.iframeTarget;
    let link = event.currentTarget;
    iframe.src = link.dataset.url;

  }
}
