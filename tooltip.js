class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "some dummy text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
      div {
        background-color:black;
        color:white;
        position:absolute;
        top:1.5rem;
        left:0.75rem;
        z-index:10;
        padding:0.15rem;
        border-radius:3px;
        box-shadow:1px 1px 6px rgba(0, 0, 0, 0.26)
      } 
      :host(.important){
        background-color:grey;
        padding:0.15rem
      }
      :host-context(p){
        color:orange;
      }
    </style>
    <slot>some default</slot>
    <span> (?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    const tooltipIcon = this.shadowRoot.querySelector("span");
    // tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    // this._tooltipContainer.style.backgroundColor = "black";
    // this._tooltipContainer.style.color = "white";
    // this._tooltipContainer.style.position = "absolute";
    // this._tooltipContainer.style.zIndex = "10";
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("uc-tooltip", Tooltip);
