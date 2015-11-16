var CommonPopupButtonView = ContainerView.extend({

    className: 'pl-popup-button',

    template: InfinniUI.Template["new/controls/popupButton/commonView/template/popupButton.tpl.html"],
    dropdownTemplate: InfinniUI.Template["new/controls/popupButton/commonView/template/popupButton.dropdown.tpl.html"],

    events: {
        'click .pl-popup-button__grip': 'onClickGripHandler',
        'click .pl-popup-button__button': 'onClickHandler'
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

        $('body').append(this.$dropdown);

        this.$dropdown.addClass('open');
        this.alignDropdown();

        var $ignoredElements = this.$dropdown.add (this.ui.grip);
        new ActionOnLoseFocus($ignoredElements, function(){
            that.close();
        });
    },

    close: function(){
        this.$dropdown.removeClass('open');
        this.$dropdown.detach();
    },

    alignDropdown: function(){
        var offset = this.$el.offset();
        var top = offset.top + this.$el.height();
        var left = offset.left;

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

    updateGrouping: function(){}

});

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'PopupButton.viewModes.common', CommonPopupButtonView);
