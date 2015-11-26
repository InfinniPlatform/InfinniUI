/**
 *
 * @constructor
 * @augments Element
 * @mixes editorBaseMixin
 */
function Frame() {
    _.superClass(Frame, this);
    this.initialize_editorBase();
}

_.inherit(Frame, Element);

_.extend(Frame.prototype, {

        createControl: function () {
            return new FrameControl();
        }

    },
    editorBaseMixin
);