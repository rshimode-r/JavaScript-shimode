customElements.define(
  "inline-circle",
  class InlineCircle extends HTMLElement {
    static get observedAttributes() {
      return ["diameter", "color", "border-color"];
    }

    connectedCallback() {
      this.style.display = "inline-block";
      this.style.borderRadius = "50%";
      this.style.border = "1px solid black";
      this.style.verticalAlign = "middle";

      const diameter = this.getAttribute("diameter") || "0.8em";
      this.style.width = diameter;
      this.style.height = diameter;

      const color = this.getAttribute("color");
      if (color) this.style.backgroundColor = color;

      const borderColor = this.getAttribute("border-color");
      if (borderColor) this.style.border = `1px solid ${borderColor}`;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "diameter":
          this.style.width = newValue;
          this.style.height = newValue;
          break;
        case "color":
          this.style.backgroundColor = newValue;
          break;
        case "border-color":
          this.style.border = `1px solid ${newValue}`;
          break;
      }
    }

    get diameter() {
      return this.getAttribute("diameter");
    }
    set diameter(value) {
      this.setAttribute("diameter", value);
    }

    get color() {
      return this.getAttribute("color");
    }
    set color(value) {
      this.setAttribute("color", value);
    }

    get borderColor() {
      return this.getAttribute("border-color");
    }
    set borderColor(value) {
      this.setAttribute("border-color", value);
    }
  }
);
