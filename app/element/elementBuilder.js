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

        if(metadata.Text && typeof metadata.Text == 'object'){
            this.initTextBinding(params, metadata.Text);
        }else{
            element.setText(metadata.Text);
        }

        //element.setVisible(metadata.Visible);
        this.initBindingToProperty(params, metadata.Visible, 'Visible', true);

        element.setHorizontalAlignment(metadata.HorizontalAlignment);
        element.setVerticalAlignment(metadata.VerticalAlignment);
        element.setName(metadata.Name);
        element.setEnabled(metadata.Enabled);

        element.setStyle(metadata.Style);

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

    initTextBinding: function(params, bindingMetadata){
        var metadata = params.metadata;
        var args = {
            parentView: params.parentView,
            basePathOfProperty: params.basePathOfProperty
        };

        var dataBinding = params.builder.build(metadata.Text, args);

        dataBinding.setElement(params.element);

        if (dataBinding != null) {
            dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                params.element.setText(dataBinding.getPropertyValue());
            });

            var data = dataBinding.getPropertyValue();
            if (data) {
                params.element.setText(data);
            }
        }

        //dataBinding.refresh();
        return dataBinding;
    },

    initBindingToProperty: function(params, bindingMetadata, propertyName, isBooleanBinding){
        var metadata = params.metadata;
        var args = {
            parentView: params.parentView,
            basePathOfProperty: params.basePathOfProperty
        };

        if(!metadata[propertyName] || typeof metadata[propertyName] != 'object'){
            params.element['set' + propertyName](metadata[propertyName]);
            return null;
        }else{
            var dataBinding = params.builder.build(metadata[propertyName], args);
            dataBinding.setSetterName('set' + propertyName);
            dataBinding.setElement(params.element);

            if (dataBinding != null) {
                dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                    if(isBooleanBinding){
                        params.element['set' + propertyName](!!dataBinding.getPropertyValue());
                    }else{
                        params.element['set' + propertyName](dataBinding.getPropertyValue());
                    }
                });

                var data = dataBinding.getPropertyValue();
                if(isBooleanBinding){
                    params.element['set' + propertyName](!!data);
                }else{
                    if (data) {
                        params.element['set' + propertyName](data);
                    }
                }

            }

            return dataBinding;
        }
    }

});