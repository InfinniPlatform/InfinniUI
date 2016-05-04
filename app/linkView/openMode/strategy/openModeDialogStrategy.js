var OpenModeDialogStrategy = function () {
    this.dialogWidth = 'default';
};

_.extend(OpenModeDialogStrategy.prototype, {
    template: InfinniUI.Template["linkView/template/dialog.tpl.html"],

    setView: function(view){
        this.view = view;
    },

    setDialogWidth: function(dialogWidth){
        this.dialogWidth = dialogWidth;
    },

    open: function(){
        // чтобы пользователь случайно не обратился к элементу в фокусе,
        // пока диалоговое окно создается и ещё не перехватило фокус,
        // необходимо старую фокусировку снять
        $(document.activeElement).blur();

        var modalParams = {dialogWidth: this.dialogWidth};
        var $template = $(this.template(modalParams));
        var $closeButton = $('button', $template);
        var $header =  $('h4', $template);
        var view = this.view;

        var $modal = $template.appendTo($('body'));

        this.$modal = $modal;

        $modal.on('shown.bs.modal', function (e) {
            $(e.target).find('.first-focus-element-in-modal').focus();
        });

        $modal.on('hidden.bs.modal', this.cleanup.bind(this));

        var $modalBody = $modal.find('.modal-body');

        $modalBody.append(this.view.render());

        $modal.modal({
            show: true,
            backdrop: 'static',
            modalOverflow: true,
            focus: this
        });

        this._initBehaviorFocusingInModal($modal, $modalBody);



        var
            headerTemplate = view.getHeaderTemplate();
        $closeButton.toggleClass('hidden', !view.getCloseButtonVisibility());
        $header.append(headerTemplate().render());

        $modal.find('.pl-close-modal').on('click', function(){
            view.close();
        });

        InfinniUI.ModalWindowService.modalWasOpened({
            modal: this.$modal,
            background: $('.modal-backdrop').last()
        });
    },

    _initBehaviorFocusingInModal: function($modal, $modalBody){
        $modalBody.append('<div class="lastfocuselementinmodal" tabindex="0">');
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
    },

    close: function () {
        if (this.$modal) {
            this.$modal.modal('hide');
        }
    },

    cleanup: function () {
        this.view.remove();
        this.$modal.remove();
        InfinniUI.ModalWindowService.modalWasClosed(this.$modal);
    }
});