var DataNavigationPageButton = DataNavigationBaseButton.extend({
    template: InfinniUI.Template["new/controls/dataNavigation/buttons/template/page.tpl.html"],

    events: {
        "click": "onClickHandler"
    },

    onClickHandler: function (event) {
        this.trigger('command', "page", {page: 1});
    }
});
