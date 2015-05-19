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

        $('#page-top').html(new StatusBarControl().render());
        $('#page-bottom').html(new GlobalNavigationBarControl().render());
    };

    this.getApplicationView = function () {
        return this;
    }

}
