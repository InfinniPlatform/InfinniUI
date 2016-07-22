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

        setAutocomplete: function (value) {
            if (typeof value === 'undefined' || value === null) {
                return;
            }
            this.control.set('autocomplete', !!value);
        },

        getAutocomplete: function () {
            return this.control.get('autocomplete');
        },

        createControl: function () {
            return new PasswordBoxControl();
        },

        getRawValue: function () {
            return this.control.get('rawValue');
        }

    },
    editorBaseMixin,
    labelTextElementMixin
);
