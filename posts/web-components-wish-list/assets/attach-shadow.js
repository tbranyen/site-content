class CustomElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'closed',
      style: 'cascade',
    });
  }
}
