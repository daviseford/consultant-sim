const CONTROL_NAMES = ['left', 'right', 'up', 'down'];

export default class TouchControls {
  constructor(element) {
    this.element = element;
    this.controls = {};
    this.activePointers = {};

    CONTROL_NAMES.forEach((control) => {
      this.controls[control] = false;
      this.activePointers[control] = [];
    });

    if (!this.element) return;

    Array.from(this.element.querySelectorAll('[data-control]')).forEach((button) => {
      const control = button.getAttribute('data-control');

      button.addEventListener('pointerdown', (event) => this.activate(control, button, event));
      button.addEventListener('pointerup', (event) => this.deactivate(control, button, event));
      button.addEventListener('pointercancel', (event) => this.deactivate(control, button, event));
      button.addEventListener('lostpointercapture', (event) => this.deactivate(control, button, event));
      button.addEventListener('contextmenu', (event) => event.preventDefault());
    });

    window.addEventListener('blur', () => this.reset());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.reset();
    });
  }

  activate(control, button, event) {
    event.preventDefault();

    if (button.setPointerCapture) {
      button.setPointerCapture(event.pointerId);
    }

    if (this.activePointers[control].indexOf(event.pointerId) === -1) {
      this.activePointers[control].push(event.pointerId);
    }

    this.controls[control] = true;
    button.classList.add('is-active');
  }

  deactivate(control, button, event) {
    event.preventDefault();
    this.activePointers[control] = this.activePointers[control].filter((id) => id !== event.pointerId);
    this.controls[control] = this.activePointers[control].length > 0;

    if (!this.controls[control]) {
      button.classList.remove('is-active');
    }
  }

  isDown(control) {
    return this.controls[control] === true;
  }

  setVisible(visible) {
    if (!this.element) return;

    this.reset();
    this.element.classList.toggle('is-hidden', !visible);
  }

  reset() {
    CONTROL_NAMES.forEach((control) => {
      this.controls[control] = false;
      this.activePointers[control] = [];
    });

    if (this.element) {
      Array.from(this.element.querySelectorAll('.is-active')).forEach((button) => {
        button.classList.remove('is-active');
      });
    }
  }
}
