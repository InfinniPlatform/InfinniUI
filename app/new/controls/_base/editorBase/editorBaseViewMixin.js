var editorBaseViewMixin = {
    UI: {
        hintText: '.pl-control-hint-text',
        warningText: '.pl-control-warning-text',
        errorText: '.pl-control-error-text'
    },

    getData: function () {
        var model = this.model;

        return {
            guid: model.get('guid')
        }
    },

    initHandlersForProperties: function(){
        this.listenTo(this.model, 'change:value', this.updateValue);
        this.listenTo(this.model, 'change:hintText', this.updateHintText);
        this.listenTo(this.model, 'change:errorText', this.updateErrorText);
        this.listenTo(this.model, 'change:warningText', this.updateWarningText);
    },

    updateProperties: function(){
        this.updateValue();
        this.updateHintText();
        this.updateErrorText();
        this.updateWarningText();
    },


    updateValue: function(){
        throw 'editorBaseViewMixin.updateValue В потомке editorBaseViewMixin не реализовано обновление данных.';
    },

    updateHintText: function(){
        var hintText = this.model.get('hintText');
        if(hintText){
            this.ui.hintText
                .text(hintText)
                .removeClass('hidden');
        }else{
            this.ui.hintText
                .text('')
                .addClass('hidden');
        }

    },

    updateErrorText: function(){
        var errorText = this.model.get('errorText');
        if(errorText){
            this.ui.errorText
                .text(errorText)
                .removeClass('hidden');
        }else{
            this.ui.errorText
                .text('')
                .addClass('hidden');
        }

    },

    updateWarningText: function(){
        var warningText = this.model.get('warningText');
        if(warningText){
            this.ui.warningText
                .text(warningText)
                .removeClass('hidden');
        }else{
            this.ui.warningText
                .text('')
                .addClass('hidden');
        }

    },

    updateEnabled: function () {
        ControlView.prototype.updateEnabled.call(this);

        if(this.ui.control){
            var isEnabled = this.model.get('enabled');
            this.ui.control.prop('disabled', !isEnabled);
        }

    },

    onInvalidHandler: function (model, error) {
        // что ита???
        //@TODO Можно ли использовать поля из API или реализовывать вывод ошибок отдельно?
        //this.model.set('errorText', error);
    }
};
