/**
 *
 * @constructor
 */
var ElementBuilder = function () {
};

_.extend(ElementBuilder.prototype, /** @lends ElementBuilder.prototype */ {

	build: function (context, args) {
		args = args || {};
		var element = this.createElement(args),
				params = _.extend(args, { element: element });

		this.applyMetadata(params);

		if (args.parentView && args.parentView.registerElement) {
			args.parentView.registerElement(element);
		}

		if (args.parent && args.parent.addChild) {
			args.parent.addChild(element);
		}

//devblockstart
		element.onMouseDown( function(eventData) {
			if( eventData.ctrlKey ){
				args.metadata.isSelectedElement = true;
				args.parentView.showSelectedElementMetadata();
				eventData.nativeEventData.stopPropagation();
			}
		});
//devblockstop

		return element;
	},

	/**
	 *
	 * @param {Object} params
	 * @param {Builder} params.builder
	 * @param {View} params.parent
	 * @param {Object} params.metadata
	 * @param {ListBoxItemCollectionProperty} params.collectionProperty
	 */
	createElement: function (params) {
		throw ('Не перегружен абстрактный метод ElementBuilder.createElement()');
	},

	/**
	 *
	 * @param {Object} params
	 * @param {Builder} params.builder
	 * @param {View} params.parent
	 * @param {Object} params.metadata
	 * @param {ListBoxItemCollectionProperty} params.collectionProperty
	 * @param {Element} params.element
	 */
	applyMetadata: function (params) {
		var metadata = params.metadata,
				element = params.element;

		this.initBindingToProperty(params, 'Text');
		this.initBindingToProperty(params, 'Visible', true);
		this.initBindingToProperty(params, 'Enabled', true);
		this.initBindingToProperty(params, 'HorizontalAlignment');
		this.initBindingToProperty(params, 'TextHorizontalAlignment');
		this.initBindingToProperty(params, 'VerticalAlignment');
		this.initBindingToProperty(params, 'TextStyle');
		this.initBindingToProperty(params, 'Foreground');
		this.initBindingToProperty(params, 'Background');
		this.initBindingToProperty(params, 'Style');
		this.initBindingToProperty(params, 'Tag');
		this.initBindingToProperty(params, 'Focusable', true);

		if( metadata.ToolTip ) {
			this.initToolTip(params);
		}
		if( metadata.ContextMenu ) {
			this.initContextMenu(params);
		}

		if ('Name' in metadata) {
			element.setName(metadata.Name);
		}


		if (metadata.OnLoaded) {
			element.onLoaded(function () {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnLoaded.Name || metadata.OnLoaded, { source: element });
			});
		}

		if (metadata.OnGotFocus) {
			element.onGotFocus(function () {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnGotFocus.Name || metadata.OnGotFocus, { source: element });
			});
		}

		if (metadata.OnLostFocus) {
			element.onLostFocus(function () {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnLostFocus.Name || metadata.OnLostFocus, { source: element });
			});
		}

		if (metadata.OnDoubleClick) {
			element.onDoubleClick(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnDoubleClick.Name || metadata.OnDoubleClick, args);
			});
		}

		if (metadata.OnClick) {
			element.onClick(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnClick.Name || metadata.OnClick, args);
			});
		}

		if (metadata.OnMouseEnter) {
			element.onMouseEnter(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnMouseEnter.Name || metadata.OnMouseEnter, args);
			});
		}

		if (metadata.OnMouseLeave) {
			element.onMouseLeave(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnMouseLeave.Name || metadata.OnMouseLeave, args);
			});
		}

		if (metadata.OnMouseMove) {
			element.onMouseMove(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnMouseMove.Name || metadata.OnMouseMove, args);
			});
		}

		if (metadata.OnKeyDown) {
			element.onKeyDown(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnKeyDown.Name || metadata.OnKeyDown, args);
			});
		}

		if (metadata.OnKeyUp) {
			element.onKeyUp(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnKeyUp.Name || metadata.OnKeyUp, args);
			});
		}

		if (metadata.OnMouseDown) {
			element.onMouseDown(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnMouseDown.Name || metadata.OnMouseDown, args);
			});
		}

		if (metadata.OnMouseUp) {
			element.onMouseUp(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnMouseUp.Name || metadata.OnMouseUp, args);
			});
		}

		if (metadata.OnMouseWheel) {
			element.onMouseWheel(function (args) {
				new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnMouseWheel.Name || metadata.OnMouseWheel, args);
			});
		}
	},

	initBindingToProperty: function (params, propertyName, isBooleanBinding) {
		var metadata = params.metadata,
				propertyMetadata = metadata[propertyName],
				element = params.element,
				lowerCasePropertyName = this.lowerFirstSymbol(propertyName),
				converter;

		if (!propertyMetadata || typeof propertyMetadata != 'object') {
			if (propertyMetadata !== undefined) {
				params.element['set' + propertyName](propertyMetadata);
			}
			return null;

		} else {
			var args = {
				parent: params.parent,
				parentView: params.parentView,
				basePathOfProperty: params.basePathOfProperty
			};

			var dataBinding = params.builder.buildBinding(metadata[propertyName], args);
			var oldConverter;

			if (isBooleanBinding) {
				dataBinding.setMode(InfinniUI.BindingModes.toElement);

				converter = dataBinding.getConverter();
				if (!converter) {
					converter = {};
				}

				if(!converter.toElement){
					converter.toElement = function (context, args) {
						return !!args.value;
					};
				}else{
					oldConverter = converter.toElement;

					converter.toElement = function (context, args) {
						var tmp = oldConverter(context, args);
						return !!tmp;
					};
				}


				dataBinding.setConverter(converter);
			}

			dataBinding.bindElement(element, lowerCasePropertyName);

			return dataBinding;
		}
	},

	initToolTip: function (params) {
		var exchange = window.InfinniUI.global.messageBus,
				builder = params.builder,
				element = params.element,
				metadata = params.metadata,
				tooltip;

		var argumentForBuilder = {
			parent: element,
			parentView: params.parentView,
			basePathOfProperty: params.basePathOfProperty
		};

		if (typeof metadata.ToolTip === 'string') {
			tooltip = builder.buildType("Label", {
				"Text": metadata.ToolTip
			}, argumentForBuilder);
		} else {
			tooltip = builder.build(metadata.ToolTip, argumentForBuilder);
		}

		element.setToolTip(tooltip);
		exchange.send(messageTypes.onToolTip.name, { source: element, content: tooltip.render() });
	},

	initContextMenu: function(params) {
		var exchange = window.InfinniUI.global.messageBus,
				builder = params.builder,
				element = params.element,
				metadata = params.metadata,
				contextMenu;

		var argumentForBuilder = {
			parent: element,
			parentView: params.parentView,
			basePathOfProperty: params.basePathOfProperty
		};

		contextMenu = builder.buildType('ContextMenu', {
			"Items": metadata.ContextMenu.Items
		}, argumentForBuilder);

		element.setContextMenu(contextMenu);
		exchange.send(messageTypes.onContextMenu.name, { source: element, content: contextMenu.render() });
	},

	lowerFirstSymbol: function(s){
		return s[0].toLowerCase() + s.substr(1);
	}

});

InfinniUI.ElementBuilder = ElementBuilder;