/**
 * @constructor
 * @augments ContainerBuilder
 */
function ViewBuilder() {
    _.superClass(ViewBuilder, this);
}

_.inherit(ViewBuilder, ContainerBuilder);

_.extend(ViewBuilder.prototype, {
    createElement: function (params) {
        return new View(params.parent);
    },

    applyMetadata: function (params) {

        var parentView = params.parentView;

        // новые params, где parentView будет уже текущая вьюха
        params = _.extend({}, params);
        params.parentView = params.element;

        var
            metadata = params.metadata,
            element = params.element,
            builder = params.builder;

        var scripts = element.getScripts();
        var parameters = element.getParameters();

        element.setIcon(metadata.Icon);

        if (metadata.Scripts) {
            for (var i = 0, len = metadata.Scripts.length; i < len; ++i) {
                var scriptMetadata = metadata.Scripts[i];

                var script = {
                    name: scriptMetadata.Name,
                    func: builder.buildType('Script', scriptMetadata, {parentView: element})
                };

                scripts.add(script);
            }
        }

        if (metadata.Parameters) {
            var passedParams = params.params || {};
            var parameterName;
            var param;

            for (var i = 0, len = metadata.Parameters.length; i < len; ++i) {
                parameterName = metadata.Parameters[i]['Name'];
                param = passedParams[parameterName];

                if(!param){
                    param = new Parameter({view: element, name: parameterName});
                }

                parameters.add(param);
                if(metadata.Parameters[i]['OnPropertyChanged']){
                    param.onPropertyChanged(function(){
                        new ScriptExecutor(element).executeScript(metadata.Parameters[i]['OnPropertyChanged']);
                    });
                }
            }
        }

        if (metadata.DataSources) {
            var dataSources = builder.buildMany(metadata.DataSources, {parentView: element});

            element.getDataSources()
                .set(dataSources);

            for(var i = 0, ii = dataSources.length; i < ii; i++){
                if(!dataSources[i].isLazy()){
                    dataSources[i].tryInitData();
                }
            }
        }else{
            element.noDataSourceOnView();
        }

        element.setHeaderTemplate(this.buildHeaderTemplate(element, params));
        element.setCloseButton(metadata.CloseButton);

        if(metadata.OnOpening){
            element.onOpening(function() {
                new ScriptExecutor(element).executeScript(metadata.OnOpening.Name || metadata.OnOpening);
            });
        }

        if(metadata.OnOpened){
            element.onOpened(function() {
                new ScriptExecutor(element).executeScript(metadata.OnOpened.Name || metadata.OnOpened);
            });
        }

        if(metadata.OnClosing){
            element.onClosing(function() {
                return new ScriptExecutor(element).executeScript(metadata.OnClosing.Name || metadata.OnClosing);
            });
        }

        if(metadata.OnClosed){
            element.onClosed(function() {
                new ScriptExecutor(element).executeScript(metadata.OnClosed.Name || metadata.OnClosed);
            });
        }

        ContainerBuilder.prototype.applyMetadata.call(this, params);
    }
},
    viewBuilderHeaderTemplateMixin
);