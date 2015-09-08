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

    this.build = function (builder, parent, metadata, collectionProperty) {

        if(metadata.ToolBar) {

            var addItemActionMetadata = getAddAction(metadata.ToolBar);

            var editItemActionMetadata = getEditAction(metadata.ToolBar);
        }

        var editItemAction = null;
        if(editItemActionMetadata){
           editItemAction = new EditItemActionBuilder(editItemActionMetadata).build(builder, parent, metadata);
        }

        var addItemAction = null;
        if(addItemActionMetadata) {
           addItemAction = new AddItemActionBuilder(addItemActionMetadata).build(builder, parent, metadata);
        }

        var dataBinding = builder.build(parent, metadata.Items, collectionProperty);

        var listBoxItemConstructor = function(baseIndex) {
            return builder.build(parent, metadata.ItemTemplate, new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', baseIndex, collectionProperty));
        };

        var listBox = new ListBox(addItemAction,editItemAction,dataBinding, listBoxItemConstructor, metadata);
		listBox.setName(metadata.Name);
        listBox.setMultiSelect(metadata.MultiSelect);

        listBox.onSetSelectedValue(function(dataItem){
            var ds = metadata.Items.PropertyBinding || {};

            // if MultiSelect
            if(_.isArray(dataItem) === false){
                parent.getExchange().send(messageTypes.onSetSelectedItem,{
                    value : dataItem,
                    dataSource: ds.DataSource,
                    property: ds.Property
                });
            }

            // @TODO Проверить данное поведение!!
            //if(metadata.OnValueChanged){
            //    new ScriptExecutor(parent).executeScript(metadata.OnValueChanged.Name, dataItem);
            //}
        });

        (function () {
            if (!metadata.Value) {
                return;
            }

            var
                dataBinding = builder.build(parent, metadata.Value, collectionProperty);

            if (!dataBinding) {
                return;
            }

            listBox.onSetSelectedValue(function (data) {
                dataBinding.setPropertyValue(data);
            });

            dataBinding.onPropertyValueChanged(function () {
                var value = dataBinding.getPropertyValue();
                listBox.setValue(value);
            });
        })();


        listBox.setStyle(metadata.Style);

		parent.registerElement(listBox);

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

        this.initScriptsHandlers(metadata, parent, listBox);
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