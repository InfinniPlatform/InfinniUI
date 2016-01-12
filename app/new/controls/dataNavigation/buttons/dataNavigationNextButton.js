var DataNavigationNextButton = DataNavigationBaseButton.extend({

    template: InfinniUI.Template["new/controls/dataNavigation/buttons/template/next.tpl.html"],

    events: {
        "click": "onClickHandler"
    },

    onClickHandler: function (event) {
        this.trigger('command', "next");
    }

});
