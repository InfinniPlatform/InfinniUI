var ActiveBarTabModel = Backbone.Model.extend({
	defaults: {
		title: '',
		view: null,
		viewId: null,
		appId: null,
		home: false,
		active: false
	},

	initialize: function () {
		this.on('change:active', this.onChangeActiveHandler);
	},

	onChangeActiveHandler: function (model, value) {
		var collection = this.collection;
		var viewId = this.get('viewId');
		if (value === true) {
			// Сброс атрибута активности у других вкладок
			collection.forEach(function (tab) {
				tab.set('active', tab === model);
			});

			messageBus.getExchange(this.get('appId')).send(messageTypes.onShowView, {viewId: viewId});
		}
	},

	requestClose: function () {
		//Отправить в шину сообщение на закрытие представления
		var appId = this.get('appId');
		var exchange = messageBus.getExchange(appId);
		exchange.send(messageTypes.onViewClosing, {
			viewId: this.get('viewId'), 
			appId: appId
		});
	}
});

var ActiveBarTabCollection = Backbone.Collection.extend({
	model: ActiveBarTabModel,

	initialize: function () {
		this.on('remove', this.onRemoveHandler);
	},

	onRemoveHandler: function (model, collection) {
		var model = collection.findWhere({active: true});
		if (typeof model !== 'undefined') {
			return;
		}

		//Активные вкладки были закрыты
		model = collection.at(0);
		if (typeof model !== 'undefined') {
			model.set('active', true);
		}

	}
});

var ActiveBarTabView = Backbone.View.extend({

	tagName: 'li',

	template: {
		normal: InfinniUI.Template['controls/application/activeBar/template/button/normal.tpl.html'],
		home: InfinniUI.Template['controls/application/activeBar/template/button/home.tpl.html']
	},

	UI: {
		close: '.close'
	},

	events: {
		'click .close-inset': 'onClickCloseHandler',
		'click': 'onClickHandler'
	},

	initialize: function () {
		this.listenTo(this.model, 'change', this.onChangeHandler);
		this.listenTo(this.model, 'remove', this.onRemoveHandler);
        var view = this.model.get('view');
        view.onTextChange(this.render.bind(this));
	},

	/** @description Обработчик удаления модели из коллекции. Удаляем Представление модели **/
	onRemoveHandler: function () {
		this.remove();
	},

	onChangeHandler: function (model) {
		var viewId = this.model.get('viewId');
		var $app = this.$el.parents('.app-area');

		$app.children('[data-view-id]').hide();

		if (model.get('active') === true) {
			var $el = $app.children('[data-view-id="' + viewId + '"]').show();
		}
		this.render();// @TODO Возможно лучше произвести изменения в DOM, чем перерендеривать представление
	},

	render: function () {
		var data = this.model.toJSON();
		this.$el.toggleClass('active', data.active);
		this.$el.toggleClass('home', this.model.get('home'));

		var template = (this.model.get('home')) ? this.template['home'] : this.template['normal'];

        var view = this.model.get('view');
		this.$el.html(template({
            viewId: this.model.get('viewId'),
            appName: view.getText(),
            title: view.getText()
        }));
		this.bindUIElements();
		return this;
	},

	/** @description Обработчик нажатия на кнопку закрытия вкладки **/	
	onClickCloseHandler: function (event) {
		this.model.requestClose();
		event.preventDefault();
		event.stopPropagation();
	},

	/** @description Обработчик нажатия на вкладку, для переключения ее активизации **/
	onClickHandler: function (event) {
		event.preventDefault();
		this.model.set('active', true);
	}

});

_.extend(ActiveBarTabView.prototype, bindUIElementsMixin);
