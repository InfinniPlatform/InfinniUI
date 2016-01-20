/**
 *
 * @constructor
 * @augments Element
 * @mixes editorBaseMixin
 */
function PasswordBox(parent) {
    _.superClass(PasswordBox, this, parent);
    this.initialize_editorBase();
}

_.inherit(PasswordBox, Element);

_.extend(PasswordBox.prototype, /* @lends PasswordBox.prototype */ {

        getLabelText: function () {
            return this.control.get('labelText');
        },

        setLabelText: function (value) {
            this.control.set('labelText', value);
        },

        getPasswordChar: function () {
            return this.control.get('passwordChar');
        },

        setPasswordChar: function (value) {
            this.control.set('passwordChar', value);
        },

        createControl: function () {
            return new PasswordBoxControl();
        }

    },
    editorBaseMixin
);
