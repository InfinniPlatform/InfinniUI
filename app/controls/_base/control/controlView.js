var ControlView = Backbone.View.extend({

    initialize: function () {
        this.wasRendered = false;

        this.initVisible();
        this.initHorizontalAlignment();
        this.initEnabled();
        this.initName();
        this.initText();
        this.initValidationState();
    },

    initVisible: function () {
        this.listenTo(this.model, 'change:visible', this.updateVisible);
        this.updateVisible();
    },

    initHorizontalAlignment: function () {
        this.listenTo(this.model, 'change:horizontalAlignment', this.updateHorizontalAlignment);
        this.updateHorizontalAlignment();
    },

    initEnabled: function () {
        this.listenTo(this.model, 'change:enabled', this.updateEnabled);
        this.updateEnabled();
    },

    initName: function () {
        this.listenTo(this.model, 'change:name', this.updateName);
        this.updateName();
    },

    initText: function () {
        this.listenTo(this.model, 'change:text', this.updateText);
        this.updateText();
    },

    initValidationState: function(){
        this.listenTo(this.model, 'change:validationState', this.updateValidationState);
        this.updateValidationState();
    },

    updateVisible: function () {
        var isVisible = this.model.get('visible');
        this.$el
            .toggleClass('hidden', !isVisible);
    },

    updateEnabled: function () {
        var isEnabled = this.model.get('enabled');
        this.$el
            .toggleClass('pl-disabled', !isEnabled);
    },

    updateHorizontalAlignment: function () {
        var horizontalAlignment = this.model.get('horizontalAlignment');
        switch (horizontalAlignment) {
            case 'Left':
            {
                this.$el
                    .removeClass('center-block pull-right')
                    .addClass('pull-left');
                break;
            }
            case 'Right':
            {
                this.$el
                    .removeClass('pull-left center-block')
                    .addClass('pull-right');
                break;
            }
            case 'Center':
            {
                this.$el
                    .removeClass('pull-left pull-right')
                    .addClass('center-block');
                break;
            }
            case 'Stretch':
            {
                this.$el
                    .removeClass('pull-left pull-right center-block')
                    .addClass('full-width');
                break;
            }
        }
    },

    updateName: function () {
        var newName = this.model.get('name'),
            currentName = this.$el.attr('data-pl-name');
        if (newName != currentName && typeof newName == 'string') {
            this.$el.attr('data-pl-name', newName);
        }
    },

    updateText: function () {

    },

    updateValidationState: function () {
        var newState = this.model.get('validationState'),
            message = this.model.get('validationMessage');
        switch(newState){

            case 'success': {
                this.$el
                    .removeClass('has-warning has-error');
                this.hideErrorMessage();
            }break;

            case 'warning': {
                this.$el
                    .removeClass('has-error')
                    .addClass('has-warning');
                this.showErrorMessage(message);
            }break;

            case 'error': {
                this.$el
                    .removeClass('has-warning')
                    .addClass('has-error');
                this.showErrorMessage(message);
            }break;

        }

    },

    showErrorMessage: function(message){
        var $errorIcn = $('<i class="error-icn fa fa-warning" data-placement="left" title="' + message + '"></i>');

        this.hideErrorMessage();
        this.$el.find('.form-control')
            .before($errorIcn);

        $errorIcn.tooltip({'container': 'body'});
    },

    hideErrorMessage: function(){
        this.$el.find('.error-icn')
            .remove();
    },

    rerender: function () {
        if (this.wasRendered) {
            this.render();
        }
    },

    prerenderingActions: function () {
        this.wasRendered = true;
    },

    postrenderingActions: function () {
        this.trigger('onLoaded');
    }

});

_.extend(ControlView.prototype, bindUIElementsMixin, eventHandlerMixin);