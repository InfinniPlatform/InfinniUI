(function () {
    var template = InfinniUI.Template["controls/loaderIndicator/template.tpl.html"];

    if (!InfinniUI.config.useLoaderIndicator) {
        return;
    }

    jQuery(function () {
        var $indicator = $(template());
        $('body').append($indicator);
        $.blockUI.defaults.css = {};
        $(document).ajaxStart(function () {
                $.blockUI({
                    message: $indicator,
                    ignoreIfBlocked: true,
                    baseZ: 99999
                });
            })
            .ajaxStop(function () {
                $.unblockUI();
            })
            .ajaxError(function () {
                $.unblockUI();
            });
    });

})();