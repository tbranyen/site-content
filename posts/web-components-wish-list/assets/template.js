class RadButton extends HTMLElement {
  template = `
    <button @innerText={label}></button>
  `

  label = null

  set label(label) {
    this.render();
  }

  constructor() {
    super();

    const template = assign(document.createElement('template'), {
      innerHTML: this.template,
    });

    this.render = () => template.render(this, {
      label: this.label,
    });
  }
}

customElements.define('rad-button', RadButton);
