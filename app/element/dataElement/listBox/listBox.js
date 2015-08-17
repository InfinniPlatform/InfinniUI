function ListBox(addItemAction, editItemAction, dataBinding, listBoxItemConstructor) {

    var listBox = this;

    listBox.value = null;

    var template = InfinniUI.Template["element/dataElement/listBox/template/listBox.tpl.html"];

    /*
     Список данных ListBox. Можно было бы обойтись без данного списка,
     используя только listBoxItems, однако он необходим для обеспечения
     лучшей инкапсуляции класса
     */
    var items = [];

    var onSetSelectedValueHandlers = $.Callbacks();
    var onDoubleClickHandlers = $.Callbacks();

    var popupMenu;

    /*
     Внутренний список для хранения соответствий между элементом ListBox, элементом данных, которые
     данный элемент отображает и нативным DOM-элементом, представляющим элемент данных
     */
    var listBoxItems = [];


    //формируем DOM
    var $template = $(template({}));
    var $body = $template.find('.listbox-body');


    /*
     Создание нового элемента, при условии отсутствия установленнго AddItemAction
     */
    var createItem = function () {

        var item = {};
        //добавляем элемент в список
        //var newitems = _.clone(items); newitems.push(item);
        items = _.clone(dataBinding.getPropertyValue());
        items.push(item);
        dataBinding.setPropertyValue(items);
        listBox.addItem(item);
    };


    /*
     Добавление нового ListItem
     */
    this.addItem = function (dataItem) {

        var foundItem = _.find(items, function(item) {
            return item == dataItem;
        });

        if(typeof foundItem === 'undefined') {
            items.push(dataItem);
        }

        var baseIndex = -1;
        //проверяем, создаем ли элемент ListBox для
        //загруженных данных
        for (var i = 0; i < items.length; i++) {
            if (items[i] === dataItem) {
                baseIndex = i;
                break;
            }
        }
        //если не нашли ничего, добавляем индекс последнего элемента коллекции (для осуществления привязки данных по индексу элемента коллекции)
        if (baseIndex === -1) {
            baseIndex = listBoxItems.length;
        }

        var element = listBoxItemConstructor(baseIndex); //builder.build(parent, metadata.ItemTemplate, new ListBoxItemCollectionProperty(metadata.Items.PropertyBinding.Property, baseIndex));

        var listBoxItem = new ListBoxItem(element, getEditHandler(), onRemoveListBoxItem, this.getMultiSelect());

        var setSelectedValue = this.getValue();

        if(this.getMultiSelect() && _.isArray(setSelectedValue)){
            _.each(setSelectedValue, function(item){
                if(item.Id == dataItem.Id){
                    var $el = listBoxItem.render();
                    $el.find('.item-content').addClass('selected');
                    $el.find('.check-listbox-item').prop('checked', true);
                }
            })
        }

        listBoxItems.push({
            element: element,
            listBoxItem: listBoxItem,
            dataItem: dataItem
        });


        /** Создание меню для элемента ***/
        (function(){
            return;
            var popupMenu = new DataGridPopupMenuView();
            var items = ['Добавить'];
            var handlers = [listBox.runAddItemAction];

            //Пункт меню "Изменить"
            var editHandler = getEditHandler();
            if (editHandler !== null) {
                items.push('Изменить');
                handlers.push(editHandler.bind(undefined, listBoxItem));
            }

            //Пункт меню "Удалить"
            items.push('Удалить');
            handlers.push(onRemoveListBoxItem.bind(undefined, listBoxItem));

            popupMenu.setItems(items);

            var $elItem = listBoxItem.getControl();
            $elItem.on('mousedown', function (e) {
                if( e.button == 2 ) {
                    e.preventDefault();
                    e.stopPropagation();
                    popupMenu.show(e.pageX, e.pageY);
                }
            });

            popupMenu.on('clickItem', function (data) {
                var index = data.index;
                console.log(data);
                if (typeof index === 'undefined' || index === null) {
                    return;
                }
                handlers[index].apply(undefined);
            });

        })();


        insertListItem(listBoxItem);

    };

    var getEditHandler = function () {
        if (editItemAction) {
            return onDialogEdit;
        }
        return null;
    };

    /*
     Вставка нового ListItem в DOM элемента ListBox
     */
    var insertListItem = function (collectionItem) {

        $body.append(collectionItem.getControl());
    };

    /*
     Удалить ListItem из DOM элемента ListBox
     */
    var removeListItem = function (collectionItem) {
        collectionItem.getControl().remove();
    };


    var multiSelect = false;

    this.getMultiSelect = function(){
        return multiSelect;
    };

    this.setMultiSelect = function(value){
        multiSelect = value;
    };


    /*
     Удаление элемента ListBox
     */
    this.removeItem = function (dataItem) {

        for (var i = 0; i < listBoxItems.length; i++) {

            if (_.isEqual(listBoxItems[i].dataItem, dataItem)) {

                //удаляем из разметки
                removeListItem(listBoxItems[i].listBoxItem);
            }
        }
    };

    var listItems = [];

    var self = this;

    listBox.setValue = function(val, index){
        if(self.getMultiSelect()){
            var $els = $template.children('.listbox-body').children().children('.item-content');
            var $chkbox = $els.eq(index).children('.check-listbox-item');

            if(index === undefined){
                index = indexOfVal(listBox.value);
            }

            if(index >= 0){
                if(listItems.length && $els.eq(index).hasClass('selected')){
                    $els.eq(index).removeClass('selected');
                    $chkbox.prop('checked', false);
                    for(var j = 0; j < listItems.length; j++){
                        if(listItems[j].Id == val.Id){
                            listItems.splice(j, 1);
                            onSetSelectedValueHandlers.fire(listItems);
                            return;
                        }
                    }
                }else{
                    $els.eq(index).addClass('selected');
                    $chkbox.prop('checked', true);

                    listItems.push(val);
                    onSetSelectedValueHandlers.fire(listItems);
                }
            }else{
                if(val == null){
                    listItems = [];
                    onSetSelectedValueHandlers.fire(listItems);
                }
            }

        }else {
            if (val == listBox.value) {
                return;
            }

            if (val === null) {
                listBox.value = val;
                onSetSelectedValueHandlers.fire(null);
                selectUI_Item(-1);
                return;
            }

            for (var i = 0, ii = listBoxItems.length; i < ii; i++) {
                if (isSubObject(listBoxItems[i].dataItem, val) && listBoxItems[i] != listBox.value) {
                    listBox.value = listBoxItems[i].dataItem;
                    onSetSelectedValueHandlers.fire(listBox.value);
                    selectUI_Item(i);
                    return;
                }
            }
        }
    };

    listBox.getValue = function(){
        if(self.getMultiSelect()){
            return listItems;
        }else{
            return listBox.value;
        }
    };

    /*
     Получить список ДАННЫХ, отображаемых в ListBox
     */
    this.getItems = function () {
        return items;
    };

    /*
     Установить список данных для отображения в ListBox
     */
    this.setItems = function (value) {

        for (var i = 0; i < items.length; i++) {
            this.removeItem(items[i]);
        }
        listBoxItems = [];

        if (_.isArray(value)) {
            items = value;
            dataBinding.setPropertyValue(items);

            for (var i = 0; i < items.length; i++) {
                this.addItem(items[i]);
            }

        } else {
            items = [];
            dataBinding.setPropertyValue(items);
        }

        if(indexOfVal(listBox.value) == -1){
            listBox.setValue(null);
        }
    };

    /*
     Рендеринг контрола
     */
    this.render = function () {

        //TODO: рефакторить listbox
        $template.off();
        $template.on('click', function (event) {
            if(multiSelect){
                if(!$(event.target).hasClass('check-listbox-item')){
                    return;
                }
            }
            var $el = $(event.target).parentsUntil($(this), '.item-content');
            if ($el.length == 0 && $(event.target).hasClass('item-content')) {
                $el = $(event.target);
            }

            if ($el.length > 0) {
                $el = $el.last();

                var index = $el.parent().prevAll().length;

                if (index > -1) {
                    listBox.setValue(listBoxItems[index].dataItem, index);
                }
            }

            //listBoxItems
        });
        $template.on('contextmenu', function (event) {
            event.preventDefault();//Запрещаем стандартное контекстное меню браузера
        });
        $template.on('mousedown', function (event) {
            if( event.button == 2 ) {
                event.preventDefault();
                event.stopPropagation();

                //var grid = this.options.grid;
                //grid.trigger('select', this.getValue());
                ////@TODO Возможны гонки?
                if (popupMenu) {
                    popupMenu.show(event.pageX, event.pageY);
                }
            }
        });
        /*
         Выбор режима добавления элементов
         Если при создании указан AddItemAction на добавление
         элементов, биндим обработчик на исполнение данного AddItemAction
         */
        if (addItemAction) {
            $template.on('click', '.btn-add', onDialogAdd);
        }
        $template.on('dblclick', function(event){
            event.preventDefault();
            onDoubleClickHandlers.fire();
        });
        //else {
        //    $template.on('click', '.btn-add', createItem);
        //}

        return $template;
    };

    var name = null;

    this.getName = function () {
        return name;
    };

    this.setName = function (value) {
        name = value;
    };

    dataBinding.onPropertyValueChanged(function (context, args) {

        var dataItems = dataBinding.getPropertyValue();

        listBox.setItems(dataItems);
    });

    this.setPopUpMenu = function (menu) {
        popupMenu = menu;
    };

    this.onSetSelectedValue = function (handler) {
        onSetSelectedValueHandlers.add(handler);
    };

    this.onDoubleClick = function (handler) {
        onDoubleClickHandlers.add(handler);
    };

    /*
     Удалить элемент данных из списка данных
     */
    var removeDataItem = function (dataItem) {
        items = _.clone(dataBinding.getPropertyValue());
        var index = -1;
        for (var x = 0; x < items.length; x++) {
            if (_.isEqual(items[x], dataItem)) {
                index = x;
                break;
            }
        }

        //удаляем из списка элементов
        items.splice(x, 1);

        dataBinding.setPropertyValue(items.slice());

    };

    /*
     Удалить элемент ListBox
     */
    var onRemoveListBoxItem = function (listBoxItem) {

        _.find(listBoxItems, function (item) {
            if (item.listBoxItem === listBoxItem) {
                listBox.removeItem(item.dataItem);
                removeDataItem(item.dataItem);
                //listBox.setItems(dataBinding.getPropertyValue());
                renderItems();
                return true;
            }
        });

        //listBox.setItems(dataBinding.getPropertyValue());
        //renderItems();

        //_.each(listBoxItems, function (item) {
        //    if (item.listBoxItem === listBoxItem) {
        //        listBox.removeItem(item.dataItem);
        //        removeDataItem(item.dataItem);
        //    }
        //});
    };

    if (editItemAction) {
        editItemAction.onValueChanged(function () {
            addItemAction.setItems(dataBinding.getPropertyValue());
            renderItems();
        });
    }

    //при изменении элементов списка addAction перезагружаем список элементов ListBox
    //TODO: В дальнейшем необходимо отслеживать только события onItemsAdded, onItemsDeleted
    //TODO: и рендерить только добавленные элементы
    if (addItemAction) {
        addItemAction.onValueChanged(function () {
            if(editItemAction) {
                editItemAction.setItems(dataBinding.getPropertyValue());
            }
            renderItems();
        });
    }

    var renderItems = function () {
        var dataItems = dataBinding.getPropertyValue();

        listBox.setItems(dataItems);
    };

    /*
     Обработчик добавления элементов коллекции в диалоге
     (если указан addItemAction)

     */
    var onDialogAdd = function () {

        addItemAction.execute();
    };

    /*
     Обработчик редактирования элементов коллекции в модальном окне
     (если указан editItemAction)

     */
    var onDialogEdit = function (listBoxItem) {

        for (var i = 0; i < listBoxItems.length; i++) {
            if (listBoxItems[i].listBoxItem === listBoxItem) {
                editItemAction.setSelectedItem(listBoxItems[i].dataItem);
                editItemAction.execute();
                break;
            }
        }
    };

    var ds = dataBinding.view.getDataSource(dataBinding.getDataSource());

    ds.onSelectedItemChanged(function(context, val){
        val  = val.value;
        listBox.setValue(val);
    });

    listBox.setStyle = function(newStyle){
        $template.addClass(newStyle);
    };

    function isSubObject(subObj, obj){
        if(!subObj || !obj){
            return false;
        }

        for(var k in subObj){
            if(subObj[k] != obj[k]){
                return false;
            }
        }

        return true;
    }

    function indexOfVal(val){
        for(var i = 0, ii=listBoxItems.length; i < ii; i++){
            if(isSubObject(listBoxItems[i].dataItem, val )){
                return i;
            }
        }
        return -1;
    }

    function selectUI_Item(index){

        if(index === undefined){
            index = indexOfVal(listBox.value);
        }

        var $els = $template.children('.listbox-body').children().children('.item-content');
        $els.removeClass('selected');

        if(index >= 0){
            $els.eq(index).addClass('selected');
        }

    }

    this.runAddItemAction = function () {
        addItemAction ? onDialogAdd() : createItem();
    };

    return listBox;
}