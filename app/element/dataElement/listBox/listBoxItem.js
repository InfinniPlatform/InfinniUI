function ListBoxItem(innerControl, editItemHandler, removeItemHandler, multiSelect) {

    var template = InfinniUI.Template["element/dataElement/listBox/template/listBoxItem.tpl.html"];

    var $template = $(template({}));
    var $content = $template.find('.item-content');

    var renderedItem = null;

    var instance = null;

    //если inline-редактирование, то удаляем кнопку редактирования
    if (!editItemHandler) {
        $template.find('.btn-edit').remove();
    }


    this.getHeight = function () {
        return 30;
    };

    $template.on('click', '.btn-delete', function () {

        if (removeItemHandler) {
            removeItemHandler(instance);
        }
    });

    $template.on('click', '.btn-edit', function () {
        if (editItemHandler) {
            editItemHandler(instance);
        }
    });


    $template.find('.pl-listbox-item-toolbar').toggleClass('hidden', true/*_.isEmpty(editItemHandler) && _.isEmpty(removeItemHandler)*/);

    this.render = function () {

        if (renderedItem) {
            renderedItem.remove();
        }

        renderedItem = innerControl.render();

        var onClickRowHandler = function (event) {
            $content.click();
        };

        (function f($el) {;
            _.each($el, function (el) {;
                var $el = $(el);
                $el.on('click', onClickRowHandler);
                var handlers = $._data(el, 'events').click;
                if (handlers !== null && typeof handlers !== 'undefined') {
                    var handler = handlers.pop();
                    handlers.splice(0,0, handler);
                }
                f($(el).children());
            });
        })(renderedItem);

        if(multiSelect) {
            $content.append('<input class="check-listbox-item" style="position: absolute;" type="checkbox"/>');
            renderedItem.css('margin-left', '20px');
        }

        $content.append(renderedItem);

        return $template;
    };

    this.getControl = function () {
        return $template;
    };

    instance = this;

    this.render();

    return instance;
}