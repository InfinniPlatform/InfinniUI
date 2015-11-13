var PopupButtonView = ContainerView.extend({

    className: 'pl-popup-button',

    template: InfinniUI.Template["new/controls/popupButton/template/popupButton.tpl.html"],
    dropdownTemplate: InfinniUI.Template["new/controls/popupButton/template/popupButton.dropdown.tpl.html"],

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

    /*onClickGripHandler: function (event) {
        var model = this.model;
        var strategy = new PopupButtonViewPlainStrategy(this);


        var dropdown = new PopupButtonDropdown({
            content: strategy.render(),
            x: event.clientX,
            y: event.clientY
        });

        $('body').append(dropdown.render().$el);
        this.listenTo(dropdown, 'close', function () {
            dropdown.remove();
        })
    },

    initialize: function (options) {
        ContainerView.prototype.initialize.call(this, options);
    },

    initOnChangeHandler: function () {
        ContainerView.prototype.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:enabled', this.OnChangeEnabledHandler)
            .listenTo(this.model, 'change:content', this.onChangeContentHandler);
    },

    onChangeContentHandler: function (model, value) {
        this.ui.button.html(this.getRenderedContent());
    },

    getRenderedContent: function () {
        var model = this.model;
        var content = model.get('content');

        if (typeof content === 'function') {
            return content.call(null, null, {}).render();
        }
        return '';
    },

    getData: function () {
        var model = this.model;
        var content = model.get('content');

        return _.extend({},
            ControlView.prototype.getData.call(this),
            {
                content: this.getRenderedContent()
            }
        );
    },

    onClickHandler: function (event) {
        this.trigger('onClick');
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.template);

        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    updateGrouping: function(){}*/

});
