var ActiveBarModel = Backbone.Model.extend({
	
	defaults: {
		tabs: null,
		title: '',
		appId: '',
		appName: '',
		viewId: ''
	},

	initialize: function () {
		var appId = this.get('appId');
		var tabs = new ActiveBarTabCollection();
		this.set('tabs', tabs);

		messageBus.getExchange(appId)
			.subscribe(messageTypes.onViewOpened, this.onViewOpenedHandler.bind(this));

		messageBus.getExchange(appId)
			.subscribe(messageTypes.onViewClosed, this.onViewClosedHandler.bind(this));
	},

	/**
	 * @description Обработчик события открытия представления приложения
	 */
	onViewOpenedHandler: function (message) {
		var tabs = this.get('tabs');
		tabs.add({
			title: message.view.getText(),
			view: message.view,
			viewId: message.viewId,
			appId: this.get('appId')
		});
	},

	/**
	 * @description Обработчик события закрытия представления приложения
	 */
	onViewClosedHandler: function (message) {
		var tabs = this.get('tabs');
		var viewId = message.viewId;
		var deleted = tabs.where({viewId: viewId});
		_.forEach(deleted, function (tab) {
			tabs.remove(tab);
		});

	}
});

var ActiveBarView = Backbone.View.extend({

	className: 'pl-active-bar',

	template: InfinniUI.Template['controls/application/activeBar/template/template.tpl.html'],
	
	UI: {
		navbar: '.navbar-nav',
		list: '.navigation-list',
		popup: '.navbar-list-container'
	},

	events: {
		'click .navigation-list': 'onTogglePopupHandler'
	},

	initialize: function () {
		var tabs = this.model.get('tabs');

		this.listenTo(tabs, 'add', this.onAddTabHandler.bind(this));
		this.listenTo(tabs, 'view:close', this.onCloseView);
		this.listenTo(tabs, 'view:active', this.onActiveView);

		this.once('render', function (){
			tabs.add({
				home: true,
                view: this.model.get('view'),
				appId: this.model.get('appId'),
				viewId: this.model.get('viewId'),
				appName: this.model.get('appName')
			});
		});
	},

	/**
	 * @description Обработчик добавления вкладки в коллекцию
	 * @param model
	 * @param collection
	 */
	onAddTabHandler: function (model, collection) {
		var tabView = new ActiveBarTabView({
			model: model
		});
        var view = model.get('view');
        view.onTextChange(function () {
            collection.trigger('onTextChange');
        });
		this.renderTab(tabView);
		model.set('active', true);
	},

	onCloseView: function(viewModel){
		//Отправить в шину сообщение на закрытие представления
		var appId = viewModel.get('appId');
		var exchange = messageBus.getExchange(appId);
		exchange.send(messageTypes.onViewClosing, {
			viewId: viewModel.get('viewId'),
			appId: appId
		});
	},

	onActiveView: function(viewModel){
		var collection = viewModel.collection;
		var viewId = viewModel.get('viewId');
		if (!viewModel.get('active') === true) {
			// Сброс атрибута активности у других вкладок
			collection.forEach(function (tab) {
				tab.set('active', tab === viewModel);
			});

			messageBus.getExchange(viewModel.get('appId')).send(messageTypes.onShowView, {viewId: viewId});
		}
	},

	render: function () {
		var data = this.model.toJSON();
		this.$el.html(this.template(data));
		this.bindUIElements();

		var list = new ActiveBarPopup({collection: this.model.get('tabs')});
		this.ui.popup.append(list.render().$el);

		this.trigger('render');
		return this;
	},

	renderTab: function (tabView) {
		this.ui.navbar.append(tabView.render().$el);
	},

	requestClose: function (callback) {
		var exchange;
		var tabs = this.model.get('tabs');
		var messages = tabs.map(function (tab) {
			return {
				viewId: tab.get('viewId'),
				appId: tab.get('appId')
			};
		});
		messages.shift();//Пропускаем home

		if (messages.length === 0) {
			//Нечего закрывать
			callback();
		} else {

			this.listenTo(tabs, 'remove', function () {
				if (tabs.length === 1) {
					callback()
				}
			});

			_.forEach(messages, function (message) {
				exchange = messageBus.getExchange(message.appId);
				exchange.send(messageTypes.onViewClosing, message);
			});
		}
	},

	onTogglePopupHandler: function (event) {
		event.preventDefault();
		this.toggleList();
	},

	toggleList: function () {
		var tabs = this.model.get('tabs');
		var messages = tabs.map();
		messages.shift();//Пропускаем home

		if (messages.length != 0) {
			if (this.ui.popup.hasClass('hidden')) {
				this.ui.popup.toggleClass('hidden', false);
			} else {
				this.ui.popup.toggleClass('hidden', true);
			}
		}
	}

});

_.extend(ActiveBarView.prototype, bindUIElementsMixin);
