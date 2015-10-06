/**
 *
 * @param parent
 * @augments Element
 * @mixes editorBaseMixin
 * @constructor
 */
function ImageBox(parent) {
    _.superClass(ImageBox, this, parent);

    this.initialize_editorBase();
}

_.inherit(ImageBox, Element);

_.extend(ImageBox.prototype, {
    getFile: function () {
        return this.control.get('file');
    },

    createControl: function () {
        return new ImageBoxControl();
    },

    onChangeFile: function (handler) {
        this.control.onChangeFile(handler);
    }

}, editorBaseMixin);