/**
 * @class
 * @augments ControlView
 */
var ContainerView = ControlView.extend(
    /** @lends ContainerView.prototype */
    {

        initialize: function (options) {
            ControlView.prototype.initialize.call(this, options);

            var that = this;
            this.model.get('items').onChange(function(){
                that.rerender();
            });
        }
    }
);
