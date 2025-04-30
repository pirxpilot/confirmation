import { Dialog } from '@pirxpilot/dialog';

const html = `
<form method="dialog" class="confirmation-actions">
  <button class="cancel" value="cancel">Cancel</button>
  <button class="ok main" value="ok">Ok</button>
</form>
`;

/**
 * Initialize a new `Confirmation` dialog.
 *
 * @param {Object} options
 */

export class Confirmation extends Dialog {
  constructor(options) {
    super(options);
    this.focus('cancel');
  }

  /**
   * Focus `type`, either "ok" or "cancel".
   *
   * @param {String} type
   * @return {Confirmation}
   */

  focus(type) {
    this._focus = type;
    return this;
  }

  /**
   * Change "cancel" button `text`.
   *
   * @param {String} text
   * @return {Confirmation}
   */

  cancel(text) {
    this.el.querySelector('.confirmation-actions .cancel').innerHTML = text;
    return this;
  }

  /**
   * Change "ok" button `text`.
   *
   * @param {String} text
   * @return {Confirmation}
   */

  ok(text) {
    this.el.querySelector('.confirmation-actions .ok').innerHTML = text;
    return this;
  }

  /**
   * Show the confirmation dialog and invoke `fn(ok)`.
   *
   * @param {Function} fn
   * @return {Confirmation} for chaining
   */

  show(fn = () => {}) {
    super.show();
    this.el.querySelector(`.${this._focus}`).focus();
    this.callback = fn;
    return this;
  }

  /**
   * Render with the given `options`.
   *
   * Emits "cancel" event.
   * Emits "ok" event.
   *
   * @param {Object} options
   */

  render(options) {
    super.render(options);

    this.el.classList.add('confirmation');
    this.el.insertAdjacentHTML('beforeend', html);

    this.on('hide', ev => {
      this.emit(ev);
      this.callback(ev === 'ok');
    });
  }
}

confirm.Confirmation = Confirmation;

/**
 * Return a new `Confirmation` with the given
 * (optional) `title` and `msg`.
 *
 * @param {String} title or msg
 * @param {String} msg
 * @return {Confirmation}
 */

export default function confirm(title, msg) {
  // biome-ignore lint/style/noArguments: <explanation>
  switch (arguments.length) {
    case 2:
      return new Confirmation({ title, message: msg });
    case 1:
      return new Confirmation({ message: title });
  }
}
