var DataNavigationPrevButton = DataNavigationBaseButton.extend({

    template: InfinniUI.Template["new/controls/dataNavigation/buttons/template/prev.tpl.html"],

    events: {
        "click": "onClickHandler"
    },

    onClickHandler: function (event) {
        this.trigger('command', "prev");
    }

});
