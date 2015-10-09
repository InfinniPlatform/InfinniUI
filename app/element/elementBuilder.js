/**
 *
 * @constructor
 */
var ElementBuilder = function () {
};

//о боги, зачем все это???
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
        this.initBindingToProperty(params, 'HorizontalAignment', true);
        this.initBindingToProperty(params, 'VerticalAlignment', true);
        this.initBindingToProperty(params, 'TextStyle', true);
        this.initBindingToProperty(params, 'Foreground', true);
        this.initBindingToProperty(params, 'Background', true);
        this.initBindingToProperty(params, 'Texture', true);
        this.initBindingToProperty(params, 'Style', true);

        element.setName(metadata.Name);

        if (metadata.OnLoaded) {
            element.onLoaded(function () {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (metadata.OnGotFocus){
            params.element.onGotFocus(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnGotFocus.Name);
            });
        }

        if (metadata.OnLostFocus){
            params.element.onLostFocus(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnLostFocus.Name);
            });
        }
    },

    initBindingToProperty: function(params, propertyName, isBooleanBinding){
        var metadata = params.metadata;
        var propertyMetadata = metadata[propertyName];
        var element = params.element;
        var lowerCasePropertyName = propertyName.toLowerCase();

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

            var dataBinding = params.builder.build(metadata[propertyName], args);

            if(isBooleanBinding){
                dataBinding.setMode(BindingModes.toElement);
                dataBinding.setConverter({
                    toElement: function (context, args) {
                        return !!args.value;
                    }
                });
            }

            dataBinding.bindElement(element, lowerCasePropertyName);

            return dataBinding;
        }
    }

});