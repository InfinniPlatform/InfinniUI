/**
 *
 * @constructor
 */
var ElementBuilder = function () {
};

_.extend(ElementBuilder.prototype, /** @lends ElementBuilder.prototype */ {

    build: function (context, args){
        args = args || {};
        var element = this.createElement(args);
        var params = _.extend(args, {element: element});

        this.applyMetadata(params);

        if (args.parentView && args.parentView.registerElement) {
            args.parentView.registerElement(element);
        }

        if (args.parent && args.parent.addChild) {
            args.parent.addChild(element);
        }

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
        this.initBindingToProperty(params, 'Texture');
        this.initBindingToProperty(params, 'Style');
        this.initToolTip(params);

        if('Name' in metadata){
            element.setName(metadata.Name);
        }


        if (metadata.OnLoaded) {
            element.onLoaded(function () {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (metadata.OnGotFocus){
            element.onGotFocus(function() {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnGotFocus.Name, {source: element});
            });
        }

        if (metadata.OnLostFocus){
            element.onLostFocus(function() {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnLostFocus.Name, {source: element});
            });
        }

        if (metadata.OnMouseDoubleClick){
            element.onMouseDoubleClick(function() {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnMouseDoubleClick.Name, {source: element});
            });
        }
    },

    initBindingToProperty: function(params, propertyName, isBooleanBinding){
        var metadata = params.metadata;
        var propertyMetadata = metadata[propertyName];
        var element = params.element;
        var lowerCasePropertyName = propertyName.toLowerCase();
        var converter;

        if(!propertyMetadata || typeof propertyMetadata != 'object'){
            if(propertyMetadata !== undefined){
                params.element['set' + propertyName](propertyMetadata);
            }
            return null;

        }else{
            var args = {
                parent: params.parent,
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            };

            var dataBinding = params.builder.buildBinding(metadata[propertyName], args);

            if(isBooleanBinding){
                dataBinding.setMode(BindingModes.toElement);

                converter = dataBinding.getConverter();
                if(!converter || _.size(converter) == 0){
                    dataBinding.setConverter({
                        toElement: function (context, args) {
                            return !!args.value;
                        }
                    });
                }
            }

            dataBinding.bindElement(element, lowerCasePropertyName);

            return dataBinding;
        }
    },

    initToolTip: function (params) {
        var
            exchange = window.InfinniUI.global.messageBus,
            builder = params.builder,
            element = params.element,
            metadata = params.metadata,
            tooltip;

        if (metadata.ToolTip) {
            var argumentForBuilder = {
                parent: element,
                parentView: params.parentView
            };
            tooltip = builder.build(metadata.ToolTip, argumentForBuilder);
            element.setToolTip(tooltip);
            exchange.send(messageTypes.onToolTip.name, {source: element, content: tooltip.render()});
        }

        element.onShowToolTip(function () {
            if (tooltip) {
                exchange.send(messageTypes.onToolTipShow.name, {source: element, content: tooltip.render()});
            }
        });

        element.onHideToolTip(function () {
            exchange.send(messageTypes.onToolTipHide.name, {source: element});
        });

    }

});