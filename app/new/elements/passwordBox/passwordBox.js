/**
 *
 * @constructor
 * @augments Element
 * @mixes editorBaseMixin
 * @mixes labelTextElementMixin
 */
function PasswordBox(parent) {
    _.superClass(PasswordBox, this, parent);
    this.initialize_editorBase();
}

_.inherit(PasswordBox, Element);

_.extend(PasswordBox.prototype, /* @lends PasswordBox.prototype */ {

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
    editorBaseMixin,
    labelTextElementMixin
);
