var ForMenuPopupButtonView = CommonPopupButtonView.extend({

    tagName: 'a',
    className: 'pl-popup-button',
    attributes: {
        href: 'javascript:;'
    },

    template: InfinniUI.Template["controls/popupButton/forMenuView/template/popupButton.tpl.html"],
    dropdownTemplate: InfinniUI.Template["controls/popupButton/commonView/template/popupButton.dropdown.tpl.html"],

    events: {
        'click': 'onClickGripHandler'
        //'click .pl-popup-button__button': 'onClickHandler'
    },

    UI: {
        button: '.pl-popup-button__button',
        grip: '.pl-popup-button__grip'
    },

    updateProperties: function(){
        ContainerView.prototype.updateProperties.call(this);

        this.updateContent();
    },

    updateContent: CommonButtonView.prototype.updateContent,
    updateText: CommonButtonView.prototype.updateText,

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

    getButtonElement: function(){
        return this.ui.button;
    },

    render: function () {
        this.prerenderingActions();

        var items = this.model.get('items').toArray();
        var template = this.template;

        this.removeChildElements();

        this.$el.html(template({items: items}));
        this.bindUIElements();

        this.$dropdown = this.renderDropdown();

        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();

        return this;
    },

    renderDropdown: function(){
        var template = this.dropdownTemplate;
        var items = this.model.get('items').toArray();
        var $result = $(template({items: items}));

        this.appendItemsContent($result, items);
        $result.on('click', function () {
            this.close();
        }.bind(this));
        return $result;
    },

    appendItemsContent: function($dropdown, items){
        var that = this,
            itemTemplate = this.model.get('itemTemplate'),
            itemEl, $el;

        $dropdown.find('.pl-popup-button__item').each(function(i, el){
            $el = $(el);
            itemEl = itemTemplate(undefined, {index: i, item: items[i]});
            that.addChildElement(itemEl);
            $el.append(itemEl.render());
        });
    },

    open: function(){
        var that = this;
        var $parent = this.$el.parent();

        $('body').append(this.$dropdown);

        this.$dropdown.addClass('open');
        $parent.addClass('open');

        this.alignDropdown();

        var $ignoredElements = this.$dropdown.add (this.$el);
        new ActionOnLoseFocus($ignoredElements, function(){
            that.close();
        });
    },

    close: function(){
        this.$dropdown.removeClass('open');
        this.$el.parent().removeClass('open');
        this.$dropdown.detach();
    },

    alignDropdown: function(){
        var horizontalAlignment = this.model.get('horizontalAlignment');
        var $el = this.$el.parent();
        var offset = $el.offset();
        var top = offset.top + $el.height()- 2;
        var $dropdownMenu = this.$dropdown.find('.dropdown-menu');
        var left;

        if(horizontalAlignment == "Right"){
            left = offset.left - ($dropdownMenu.width() - $el.width());
        }else{
            left = offset.left;
        }

        this.$dropdown.offset({
            top: top,
            left: left
        });
    },

    onClickGripHandler: function(){
        if(!this.$dropdown.hasClass('open')){
            this.open();
        }else{
            this.close();
        }
    },

    updateGrouping: function(){},

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

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'PopupButton.viewModes.forMenu', ForMenuPopupButtonView);
