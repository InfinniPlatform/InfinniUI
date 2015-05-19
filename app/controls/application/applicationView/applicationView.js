function ApplicationView() {

    var $top;
    var $bottom;
    var $container;

    var template = InfinniUI.Template['controls/application/applicationView/template.tpl.html'];

    this.getContainer = function () {
        return $container;
    };

    this.open = function ($el) {
        $el.prepend(template({}));

        $top = $('#page-top', $el);
        $bottom = $('#page-bottom', $el);
        $container = $('#page-content', $el);

        $('#page-top')
            .empty()
            .append(new StatusBarControl().render());
        $('#page-bottom')
            .empty()
            .append(new GlobalNavigationBarControl().render());
    };

    this.getApplicationView = function () {
        return this;
    }

}
