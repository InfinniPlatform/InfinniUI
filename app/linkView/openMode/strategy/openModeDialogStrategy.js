var OpenModeDialogStrategy = function (linkView) {

    this.open = function (view, $elView) {
        var $modal = $(linkView.template.Dialog())
            .appendTo($('body'));

        $elView.find('.pl-stack-panel-i').css('height', 'auto');
        $modal.on('shown.bs.modal', function (e) {
            $(e.target).find('.firstfocuselementinmodal').focus();
        });
        var $container = $modal.find('.modal-body');

        $container.append($elView);
        $modal.modal({
            show: true,
            backdrop: 'static',
            modalOverflow: true,
            focus: this
        });

        //FOCUS IN MODAL WITHOUT FALL
            $container.append('<div class="lastfocuselementinmodal" tabindex="0">');
            $modal.find('.lastfocuselementinmodal').on('focusin', function(){
                $modal.find('.firstfocuselementinmodal').focus();
            });
            $modal.keydown(function(e){
                if($(document.activeElement).hasClass('lastfocuselementinmodal') && (e.which || e.keyCode) == 9){
                    e.preventDefault();
                    $modal.find('.firstfocuselementinmodal').focus();
                }

                if($(document.activeElement).hasClass('firstfocuselementinmodal') && (e.which || e.keyCode) == 9 && e.shiftKey){
                    e.preventDefault();
                    $modal.find('.lastfocuselementinmodal').focus();
                }
            });
        //

        var preventClosingViewHandler = function(e){
            /** Плагин DatePicker генерируют события hide в DOM!! **/
            var $target = $(e.target);
            if ($target.hasClass('date') || $target.hasClass('datetime')) {
                return;
            }

            e.preventDefault();
            e.stopImmediatePropagation();

            view.close();
            return false;
        };

        $modal.on('hide.bs.modal', preventClosingViewHandler);

        $modal.on('hidden', function (obj) {
            obj.target.remove();
            $("#select2-drop-mask").click();
        });

        view.onClosed(function () {
            $modal.off('hide.bs.modal', preventClosingViewHandler);
            $modal.modal('hide');
        });

        $modal.find('h3').html(view.getText());
        view.onTextChange(function(){
            $modal.find('h3').html(view.getText());
        });
    }
};
