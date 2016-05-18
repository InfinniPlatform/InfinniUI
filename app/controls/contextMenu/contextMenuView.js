var ContextMenuView = ContainerView.extend({

	contextMenuTemplate: InfinniUI.Template["controls/contextMenu/template/contextMenu.tpl.html"],

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
		var exchange = window.InfinniUI.global.messageBus,
				that = this;

		this.prerenderingActions();

		this.removeChildElements();

		this.$el = this.renderDropdown();

		this.bindUIElements();

		this.updateProperties();

		this.trigger('render');

		this.postrenderingActions();

		exchange.subscribe(messageTypes.onOpenContextMenu.name, function (context, args) {
			that.open(args.value);
		});

		return this;
	},

	renderDropdown: function(){
		var template = this.contextMenuTemplate;
		var items = this.model.get('items').toArray();
		var $result = $(template({items: items}));

		this.appendItemsContent($result, items);
		$result.on('click', function () {
			this.close();
		}.bind(this));
		$result.on('contextmenu', function (event) {
			event.preventDefault();
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

	open: function(rightclickCoords){
		var that = this;
		var $parent = this.$el.parent();

		$('body').append(this.$el);

		this.$el.addClass('open');
		$parent.addClass('open');

		this.alignDropdown(rightclickCoords);

		var $ignoredElements = this.$el;
		new ActionOnLoseFocus($ignoredElements, function(){
			that.close();
		});
	},

	close: function(){
		this.$el.removeClass('open');
		this.$el.parent().removeClass('open');
		this.$el.detach();
	},

	alignDropdown: function(rightclickCoords){
		var horizontalAlignment = this.model.get('horizontalAlignment'),
				$parent = this.$el.parent(),
				parentDimentions = {width: $parent.width(), height: $parent.height()},
				elDimentions = {width: this.$el[0].children[0].clientWidth, height: this.$el[0].children[0].clientHeight};

		if(rightclickCoords.x + elDimentions.width > parentDimentions.width){
			rightclickCoords.x -= elDimentions.width;
		}
		if(rightclickCoords.y + elDimentions.height > parentDimentions.height){
			rightclickCoords.y -= elDimentions.height;
		}

		this.$el.offset({
			top: rightclickCoords.y,
			left: rightclickCoords.x
		});
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
