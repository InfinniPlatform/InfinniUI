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

            this.listenTo(this.model, 'change:groupValueSelector', this.updateGrouping);
            this.updateGrouping();
        },

        updateGrouping: function(){
            throw 'ContainerView.updateGrouping � ������� ContainerView �� ����������� ���������� �����������.';
        },

        initHandlersForProperties: function(){
            ControlView.prototype.initHandlersForProperties.call(this);

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
        },

        addChildElement: function(child){
            this.childElements.push(child);
        }
    }
);