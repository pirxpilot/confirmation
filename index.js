/**
 * Module dependencies.
 */

const { Dialog } = require('@pirxpilot/dialog');

const html = `
<form method="dialog" class="confirmation-actions">
  <button class="cancel" value="cancel">Cancel</button>
  <button class="ok main" value="ok">Ok</button>
</form>
`;

/**
 * Expose `confirm()`.
 */

exports = module.exports = confirm;

/**
 * Expose `Confirmation`.
 */

/**
 * Initialize a new `Confirmation` dialog.
 *
 * @param {Object} options
 * @api public
 */

class Confirmation extends Dialog {
  constructor(options) {
    super(options);
    this.focus('cancel');
  }

  /**
   * Focus `type`, either "ok" or "cancel".
   *
   * @param {String} type
   * @return {Confirmation}
   * @api public
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
   * @api public
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
   * @api public
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
   * @api public
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
   * @api public
   */

  render(options) {
    super.render(options);

    this.el.classList.add('confirmation');
    this.el.insertAdjacentHTML('beforeend', html);

    this.on('hide', ev => {
      this.emit(ev);
      this.callback(ev === "ok");
    });
  }
}

exports.Confirmation = Confirmation;

/**
 * Return a new `Confirmation` with the given
 * (optional) `title` and `msg`.
 *
 * @param {String} title or msg
 * @param {String} msg
 * @return {Confirmation}
 * @api public
 */

function confirm(title, msg) {
  switch (arguments.length) {
    case 2:
      return new Confirmation({ title, message: msg });
    case 1:
      return new Confirmation({ message: title });
  }
}
