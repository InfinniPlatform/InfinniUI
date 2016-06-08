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

//devblockstart
    _getSelectedElementPath: function(metadata) {
        var result;

        if( _.isArray(metadata) ){
            for (var i = 0, ii =  metadata.length; i<ii; i++){
                result = this._getSelectedElementPath(metadata[i]);
                if(result !== false){
                    return '['+ i + ']' + result;
                }
            }
        } else if( _.isObject(metadata) ){
            if('isSelectedElement' in metadata) {
                delete metadata.isSelectedElement;
                return '';
            } else {
                for (var key in metadata){
                    result = this._getSelectedElementPath(metadata[key]);
                    if(result !== false){
                        return '.' + key + result;
                    }
                }
            }
        }

        return false;
    },
//devblockstop

    applyMetadata: function (params) {

        var parentView = params.parentView;

        // новые params, где parentView будет уже текущая вьюха
        params = _.extend({}, params);
        params.parentView = params.element;

        var that = this,
            metadata = params.metadata,
            element = params.element,
            builder = params.builder;

//devblockstart
        element.onSelectedElementChange(function() {
            var path = that._getSelectedElementPath(params.metadata);

            InfinniUI.JsonEditor.setMetadata(params.metadata).always(function () {
                InfinniUI.JsonEditor.setPath(path);
            });
        });
//devblockstop

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

        this.triggerStartCreatingEvent(params);

        if (metadata.Parameters) {
            var passedParams = params.params || {};
            var parameterName;
            var defaultValue;
            var param;

            for (var i = 0, len = metadata.Parameters.length; i < len; ++i) {
                parameterName = metadata.Parameters[i]['Name'];
                param = passedParams[parameterName];

                if(!param){
                    param = new Parameter({view: element});
                    param.setName(parameterName);


                    if('DefaultValue' in metadata.Parameters[i]){
                        defaultValue = metadata.Parameters[i]['DefaultValue'];
                        param.setValue(defaultValue);
                    }
                }

                parameters.add(param);
                if(metadata.Parameters[i]['OnPropertyChanged']){
                    param.onPropertyChanged(function(){
                        new ScriptExecutor(element).executeScript(metadata.Parameters[i]['OnPropertyChanged']);
                    });
                }
            }
        }

        if (metadata.DataSources && metadata.DataSources.length) {
            var dataSources = builder.buildMany(metadata.DataSources, {parentView: element, suspended: params.suspended});

            element.getDataSources()
                .set(dataSources);

            this.changeDataSourcesReadinessByPriority(dataSources);

            for(var i = 0, ii = dataSources.length; i < ii; i++){
                if(!dataSources[i].isLazy()){
                    dataSources[i].tryInitData();
                }
            }
        }else{
            element.noDataSourceOnView();
        }

        element.setHeaderTemplate(this.buildHeaderTemplate(element, params));
        element.setCloseButtonVisibility(metadata.CloseButtonVisibility);

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

        element.setFocusOnControl(metadata.FocusOnControl);
    },

    triggerStartCreatingEvent: function (params) {
        var
            element = params.element,
            metadata = params.metadata,
            onStartCreating = metadata.OnStartCreating;

        if (onStartCreating) {
            new ScriptExecutor(element).executeScript(onStartCreating.Name || onStartCreating, {});
        }
    },

    changeDataSourcesReadinessByPriority: function(dataSources) {
        var dataSourcesByPriority = _.groupBy(dataSources, function(ds) {return ds.getResolvePriority();});

        var updateTopPriorityDataSources = function(priorityGroups){
            if(_.keys(priorityGroups).length){
                var maxPriority = _.chain(priorityGroups).keys().max().value(),
                    topPriorityDataSources = priorityGroups[maxPriority],
                    topPriorityDataSourcesCount = topPriorityDataSources.length,
                    nonPriorityDataSourceGroups = _.omit(priorityGroups, maxPriority),
                    count = 0;

                _.each(topPriorityDataSources, function(ds){
                    ds.onItemsUpdatedOnce(function(context, args){
                        if(++count == topPriorityDataSourcesCount){
                            setTimeout( function() {
                                updateTopPriorityDataSources(nonPriorityDataSourceGroups)
                            }, 0);
                        }
                    });

                    ds.setIsWaiting(false);
                });
            }
        };

        if(_.keys(dataSourcesByPriority).length > 1) {
            _.each(dataSources, function(ds){
                ds.setIsWaiting(true);
            });

            updateTopPriorityDataSources(dataSourcesByPriority);
        }
    }
},
    viewBuilderHeaderTemplateMixin
);