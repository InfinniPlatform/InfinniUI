function ListBox(addItemAction, editItemAction, dataBinding, listBoxItemConstructor) {

    var listBox;

    var template = '' +
        '<div class="row" style="margin-left: 0">' +
        '<div class="col-md-12">' +
        '   <div class="portlet box blue-hoki">' +
        '        <div class="portlet-title">' +
        '           <div class="caption">' +
        '               <i class="fa fa-list"></i>' +
        '           </div>' +
        '           <div class="actions">' +
        '              <p class="btn btn-default btn-sm btn-add"><i class="fa fa-plus"></i></p>' +
        '           </div>' +
        '        </div>' +
        '        <div class="portlet-body">' +
        '        </div>' +
        '   </div>' +
        '</div>';

    /*
     Список данных ListBox. Можно было бы обойтись без данного списка,
     используя только listBoxItems, однако он необходим для обеспечения
     лучшей инкапсуляции класса
     */
    var items = [];

    var popupMenu;

    /*
     Внутренний список для хранения соответствий между элементом ListBox, элементом данных, которые
     данный элемент отображает и нативным DOM-элементом, представляющим элемент данных
     */
    var listBoxItems = [];

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

        if(!foundItem) {
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


        var listBoxItem = new ListBoxItem(element, getEditHandler(), onRemoveListBoxItem);

        listBoxItems.push({
            element: element,
            listBoxItem: listBoxItem,
            dataItem: dataItem
        });


        /** Создание меню для элемента ***/
        (function(){
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

        $template.find('.portlet-body').append(collectionItem.getControl());
    };

    /*
     Удалить ListItem из DOM элемента ListBox
     */
    var removeListItem = function (collectionItem) {
        collectionItem.getControl().remove();
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

    };

    /*
     Рендеринг контрола
     */
    this.render = function () {
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

    //формируем DOM
    var $template = $(template);

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


    this.runAddItemAction = function () {
        addItemAction ? onDialogAdd() : createItem();
    };
    /*
     Выбор режима добавления элементов
     Если при создании указан AddItemAction на добавление
     элементов, биндим обработчик на исполнение данного AddItemAction
     */
    if (addItemAction) {
        $template.on('click', '.btn-add', onDialogAdd);
    }
    else {
        $template.on('click', '.btn-add', createItem);
    }

    listBox = this;

    return listBox;
}