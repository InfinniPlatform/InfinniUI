var ListBoxRadioItem = Backbone.View.extend({

	template: InfinniUI.Template['element/dataElement/listBox3/controls/template/listBoxRadioItem.tpl.html'],

	UI: {
		content: '.item-content'
	},

    events: {
        'click': 'onClickHandler'
    },

	initialize: function (options) {
		this.options = {
			index: options.index,
			content: options.content
		};
		this.el.addEventListener('mousedown', this.selectItemOnClick.bind(this), true);
		//this.el.addEventListener('mousedown', this.onToggleHandler.bind(this), true);

		this.listenTo(this.model, 'change:valueItemsIndex', this.updateCheckState);
	},

	render: function () {
		this.$el.html(this.template({}));
		this.bindUIElements();
		this.ui.content.append(this.options.content);
        this.updateCheckState();
        this.updateSelectedState();
		return this;
	},

    /**
     * Сдедать текущий элемент выделенным
     */
    selectItemOnClick: function () {
        var model = this.model;

        if (!model.isEnabled()) {
            return;
        }

        var selectedItem = model.getItemByIndex(this.options.index);
        model.set('selectedItem', selectedItem);
    },

    /**
     * Переключить значение ListBox
     */
    onClickHandler: function () {
        var model = this.model;

        if (!model.isEnabled()) {
            return;
        }

        var index = this.options.index;
        var items = model.get('items');
        var valueSelector = model.get('valueSelector');
        var value = valueSelector(model.getItemByIndex(index));
        model.set('value', value);
    },

    updateCheckState: function () {
        var valueItemsIndex = this.model.get('valueItemsIndex');
		this.applyCheckState(valueItemsIndex === this.options.index);
	},

    updateSelectedState: function () {
        //Для простого списка выделенный элемент и значение совпадают!
        this.updateCheckState();
    },

	applyCheckState: function (checked) {
		this.ui.content.toggleClass('selected', checked);
	}
});

_.extend(ListBoxRadioItem.prototype, bindUIElementsMixin);