var DatePickerMonths = Backbone.View.extend({

    template: InfinniUI.Template["new/controls/datePicker/template/date/months.tpl.html"],

    render: function () {
        var template = this.template();
        this.$el.html(template);
    }

});
