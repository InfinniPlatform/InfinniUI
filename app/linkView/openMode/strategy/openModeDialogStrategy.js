var OpenModeDialogStrategy = function () {
    this.dialogWidth = 'default';
    this.closeButton = true;
};

_.extend(OpenModeDialogStrategy.prototype, {
    template: InfinniUI.Template["linkView/template/dialog.tpl.html"],

    setView: function(view){
        this.view = view;
    },

    setDialogWidth: function(dialogWidth){
        this.dialogWidth = dialogWidth;
    },

    /**
     * @description Устанавливает флаг видимости стандартной кнопки закрытия диалога
     * @param {boolean} closeButton
     */
    setCloseButton: function (closeButton) {
        if (typeof closeButton !== 'undefined' && closeButton !== null) {
            this.closeButton = !!closeButton;
        }
    },

    open: function(){
        var modalParams = {dialogWidth: this.dialogWidth};
        var $template = $(this.template(modalParams));
        var $closeButton = $('button', $template);
        var $header =  $('h4', $template);

        var $modal = $template.appendTo($('body'));
        this.$modal = $modal;

        $modal.on('shown.bs.modal', function (e) {
            $(e.target).find('.first-focus-element-in-modal').focus();
        });
        var $modalBody = $modal.find('.modal-body');

        $modalBody.append(this.view.render());

        $modal.modal({
            show: true,
            backdrop: 'static',
            modalOverflow: true,
            focus: this
        });

        this._initBehaviorFocusingInModal($modal, $modalBody);

        var view = this.view;

        var
            headerTemplate = view.getHeaderTemplate();
        $closeButton.toggleClass('hidden', !this.closeButton);
        $header.append(headerTemplate().render());

        $modal.find('.pl-close-modal').on('click', function(){
            view.close();
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
        this.view.remove();
        if (this.$modal) {
            this.$modal.modal('hide');
            this.$modal.remove();
        }

    }
});