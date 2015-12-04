/**
 * @class ButtonView
 * @augments ControlView
 */
var LinkButtonView = CommonButtonView.extend({

    tagName: 'a',

    className: 'pl-button',

    attributes: {
        href: 'javascript:;'
    },

    events: {
        'click': 'onClickHandler'
    },

    template: function(){return '';},

    UI: {
    },

    getButtonElement: function(){
        return this.$el;
    },

    updateHorizontalAlignment: function(){
        var horizontalAlignment = this.model.get('horizontalAlignment');
        var that = this;
        var $el;

        this.whenReady(
            function(){
                $el = that.$el.parent().parent();
                return $el.length > 0;
            },

            function(){
                if(horizontalAlignment == 'Right'){
                    $el
                        .addClass('pull-right');
                }else{
                    $el
                        .removeClass('pull-right');
                }
            }
        );

    },

    whenReady: function(conditionFunction, onConditionFunction, n){
        var that = this;

        if(n === undefined){
            n = 100;
        }

        if(!conditionFunction()){
            if(n>0){
                setTimeout( function(){
                    that.whenReady(conditionFunction, onConditionFunction, n-1);
                }, 10);
            }
        }else{
            onConditionFunction();
        }
    }

});

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Button.viewModes.link', LinkButtonView);