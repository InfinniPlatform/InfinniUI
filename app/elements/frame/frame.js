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

window.InfinniUI.Frame = Frame;

_.inherit(Frame, Element);

_.extend(Frame.prototype, {

        createControl: function () {
            return new FrameControl();
        }

    },
    editorBaseMixin
);
