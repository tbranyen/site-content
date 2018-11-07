class RadButton extends HTMLElement {
  template = `
    <button @onClick={props.onClick}>{innerHTML}</button>
  `

  style = `
    --color: var(--rad-button-color, #000);
    color: var(--color);
  `

  props = {
    onClick: null,
  }

  set onClick(label) {
    this.props.label = label;
    this.render();
  }

  get onClick() {
    return this.props.onClick;
  }

  render() {
    this.template.render(this);
  }
}

customElements.define('rad-button', RadButton);
