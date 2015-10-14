function EditActionBuildero() {
    this.build = function (context, args) {
        var action = new BaseAction(args.view);

        action.setAction(function (callback) {
            var parentDataSource = args.view.getDataSource(args.metadata.DataSource),
                editItem, idProperty, editItemId;

            if(args.itemId){
                editItemId = args.itemId;
            }else{
                editItem = parentDataSource.getSelectedItem();

                if(!editItem){
                    new MessageBox({
                        type: 'error',
                        text:'Не выбран объект для редактирования.',
                        buttons:[
                            {
                                name:'Закрыть'
                            }
                        ]
                    });
                    return;
                }

                idProperty = parentDataSource.getIdProperty();
                editItemId = InfinniUI.ObjectUtils.getPropertyValue(editItem, idProperty);
            }

            var linkView = args.builder.build(args.view, args.metadata.View);
            linkView.createView(function (editView) {
                var editDataSource = _.find(editView.getDataSources(), function (ds) {
                    return isMainDataSource(ds);
                });

                editDataSource.suspendUpdate();
                editDataSource.setEditMode();
                editDataSource.setIdFilter(editItemId);

                editView.onClosed(function (closeResult) {
                    parentDataSource.updateItems();

                    if (callback && closeResult == dialogResult.accept) {

                        callback(editItemId);
                    }
                });

                editView.open();
            });
        });

        return action;
    };
}

function BaseAction(parentView){
    this.parentView = parentView;
}

_.extend(BaseAction.prototype, {
    execute: function(){

    },

    setProperty: function(name, value){
        this[name] = value;
    },

    getProperty: function(name){
        return this[name];
    }
});

//---------------------------------------

function EditAction(parentView){
    _.superClass(EditAction, this, parentView);
}

_.inherit(EditAction, BaseAction);


_.extend(EditAction.prototype, {
    execute: function(){
        var linkView = this.getProperty('linkView');

        linkView.createView(function(createdView){
            that.handleViewReady(createdView);
        });
    },

    handleViewReady: function(editView){
        var editDataSource = editView.getContext().dataSources['MainDataSource'];
        var editingItemId = this.getProperty('editingItemId');
        var that = this;

        editDataSource.setIdFilter(editingItemId);

        editDataSource.resumeUpdate();
        editDataSource.updateItems();

        editView.onClose(function(){
            that.handleClosingView();
        });
    },

    handleClosingView: function(){
        
    }
});


//---------------------------------------


function EditActionBuilder(){

}


_.extend(EditActionBuilder.prototype, {
    build: function(context, args){
        var action = new EditActionBuilder(args.parentView);

        var metadata = args.metadata;
        var parentView = args.parentView;
        var builder = args.builder;
        var dataSource = parentView.getContext().dataSources[metadata.DataSource];
        var editingItemId;
        var linkView;

        if('itemId' in args){
            editingItemId = args.itemId;
        }else{
            var editItem = dataSource.getSelectedItem();
            editingItemId = dataSource.idOfItem(editItem);
        }

        action.setProperty('editingItemId', editingItemId);
        action.setProperty('parentDataSource', dataSource);

        linkView = builder.build(metadata['LinkView'], {parentView: parentView});
        action.setProperty('linkView', linkView);

        return action;
    },

    executingAction: function(params){
        var metadata = params.metadata;
        var parentView = params.parentView;
        var builder = params.builder;
        var that = this;
        var editingItemId;

        if('itemId' in params){
            editingItemId = params.itemId;
        }else{
            var dataSource = parentView.getContext().dataSources[metadata.DataSource];
            var editItem = dataSource.getSelectedItem();
            editingItemId = dataSource.idOfItem(editItem);
        }


        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        linkView.createView(function(createdView){
            that.handleViewReady(createdView, parentView, editingItemId, dataSource)
        });
    },

    handleViewReady: function(editView, parentView, editingItemId, parentDataSource){
        var editDataSource = editView.getContext().dataSources['MainDataSource'];
        var that = this;

        editDataSource.setIdFilter(editingItemId);

        editDataSource.resumeUpdate();
        editDataSource.updateItems();

        editView.onClose(function(){
            that.handleClosingView();
        });
    }
});