var OpenModeDialogStrategy = function () {

};

_.extend(OpenModeDialogStrategy.prototype, {
    template: InfinniUI.Template["linkView/template/dialog.tpl.html"],

    setView: function(view){
        this.view = view;
    },

    assignDialogTitle: function ($title) {
        var view = this.view;

        this.view.onPropertyChanged("text", function (context, args) {
            setTitle();
        });

        setTitle();

        function setTitle() {
            $title.text(view.getText());
        }
    },

    open: function(){
        var $template = $(this.template());
        this.assignDialogTitle($('h4', $template));

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