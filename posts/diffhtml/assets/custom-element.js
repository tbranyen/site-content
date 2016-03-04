class HelloWorld extends HTMLElement {
  // Optionally setting an extends for an existing element.
  static get extends() { return 'span'; }

  // Triggered whenever an element is added to the DOM.
  attachedCallback() {
    this.innerHTML = 'Hello world!';
  }
}

// Registering the custom element is as simple as connecting a new
// tagName to a Custom Element definition.
document.registerElement('hello-world', HelloWorld);
