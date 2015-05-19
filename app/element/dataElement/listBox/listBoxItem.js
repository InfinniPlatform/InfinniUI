function ListBoxItem(innerControl, editItemHandler, removeItemHandler) {

    var template = '' +
        '<div style="padding-top: 10px"><div>' +
        '   <a href="javascript:;" class="btn-delete pull-right"><i class="fa fa-times"></i></a>' +
        '   <a href="javascript:;" class="btn-edit pull-right"><i class="fa fa-pencil"></i></a>' +
        '   </div><div class="item-content"></div>' +
        '</div>';

    var $template = $(template);

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

    this.render = function () {

        if (renderedItem) {
            renderedItem.remove();
        }

        renderedItem = innerControl.render();
        $template.find('.item-content').append(innerControl.render());

        return $template;
    };

    this.getControl = function () {
        return $template;
    };

    instance = this;

    this.render();

    return instance;
}