/**
 * @class
 * @augments ControlView
 */
var ContainerView = ControlView.extend(
    /** @lends ContainerView.prototype */
    {

        initialize: function (options) {
            ControlView.prototype.initialize.call(this, options);

            this.childElements = [];

            var that = this;
            this.model.get('items').onChange(function(){
                that.rerender();
            });
        },

        removeChildElements: function(){
            for(var i = 0, ii = this.childElements.length; i < ii; i++){
                this.childElements[i].remove();
            }

            this.childElements = [];
        }
    }
);
