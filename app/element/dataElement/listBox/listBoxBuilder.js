function ListBoxBuilder() {

    var getAddAction = function(metadata) {

        for(var i = 0; i < metadata.Items.length; i++){

            var result = InfinniUI.ObjectUtils.getPropertyValue(metadata.Items[i],'ToolBarButton.Action.AddItemAction');
            if(result){
                return result;
            }
        }
        return null;
    };

    var getEditAction = function(metadata) {

        for(var i = 0; i < metadata.Items.length; i++){

            var result = InfinniUI.ObjectUtils.getPropertyValue(metadata.Items[i],'ToolBarButton.Action.EditItemAction');
            if(result){
                return result;
            }
        }
        return null;
    };

    this.build = function (context, args) {

        var builder = args.builder,
            view = args.view,
            metadata = args.metadata;

        if(metadata.ToolBar) {

            var addItemActionMetadata = getAddAction(metadata.ToolBar);

            var editItemActionMetadata = getEditAction(metadata.ToolBar);
        }

        var editItemAction = null;
        if(editItemActionMetadata){
           editItemAction = new EditItemActionBuilder(editItemActionMetadata).build(context, args);
        }

        var addItemAction = null;
        if(addItemActionMetadata) {
           addItemAction = new AddItemActionBuilder(addItemActionMetadata).build(context, args);
        }

        var dataBinding = builder.build(view, metadata.Items, args.collectionProperty); //!!!

        var listBoxItemConstructor = function(baseIndex) {
            return builder.build(view, metadata.ItemTemplate, new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', baseIndex, args.collectionProperty));
        };

        var listBox = new ListBox(addItemAction,editItemAction,dataBinding, listBoxItemConstructor, metadata);
		listBox.setName(metadata.Name);
        listBox.setMultiSelect(metadata.MultiSelect);

        listBox.onSetSelectedValue(function(dataItem){
            var ds = metadata.Items.PropertyBinding || {};

            // if MultiSelect
            if(_.isArray(dataItem) === false){
                view.getExchange().send(messageTypes.onSetSelectedItem,{
                    value : dataItem,
                    dataSource: ds.DataSource,
                    property: ds.Property
                });
            }


            if(metadata.OnValueChanged){
                new ScriptExecutor(view).executeScript(metadata.OnValueChanged.Name, dataItem);
            }
        });

        listBox.setStyle(metadata.Style);

		view.registerElement(listBox);

        /** @TODO Дублирование @see {@link DataGridBuilder.build} **/
        //if (addItemAction) {
            var popupMenu = new DataGridPopupMenuView();
            var items = ["Добавить"];
            var handlers = [listBox.runAddItemAction];

            popupMenu.setItems(items);

            popupMenu.on('clickItem', function (data) {
                var index = data.index;

                if (typeof index === 'undefined' || index === null) {
                    return;
                }

                var handler = handlers[index];
                if (typeof handler !== 'undefined' && handler !== null) {
                    handler();
                }
            });
            listBox.setPopUpMenu(popupMenu);
        //}

        this.initScriptsHandlers(metadata, view, listBox);
        return listBox;
    },

    this.initScriptsHandlers = function(metadata, parent, element){

        if (parent && metadata.OnDoubleClick){
            element.onDoubleClick(function() {
                new ScriptExecutor(parent).executeScript(metadata.OnDoubleClick.Name);
            });
        }
    }
}