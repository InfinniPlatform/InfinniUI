var CheckingListBoxView = BaseListBoxView.extend({
    className: 'pl-listbox',

    template: {
        plain: InfinniUI.Template["controls/listBox/checkingView/template/listBox.tpl.html"],
        grouped: InfinniUI.Template["controls/listBox/checkingView/template/listBoxGrouped.tpl.html"]
    },

    events: _.extend( {

    }, BaseListBoxView.prototype.events),

    initialize: function (options) {
        BaseListBoxView.prototype.initialize.call(this, options);
        this.initDomHandlers();
    },

    updateEnabled: function () {
        ListEditorBaseView.prototype.updateEnabled.call(this);

        var enabled = this.model.get('enabled');

        this.ui.checkingInputs.attr('disabled', !enabled);
    },

    initDomHandlers: function(){
        var $listBox = this.$el,
            that = this;

        $listBox.get(0).addEventListener('click', function(e){
            e = $.event.fix(e);
            var $el = $(e.target),
                $currentListItem, item, isDisabledItem;

            if (!that.model.get('enabled')) {
                return;
            }

            while($el.get(0) != $listBox.get(0)){
                if($el.hasClass('pl-listbox-i')){
                    $currentListItem = $el;
                }

                $el = $el.parent();
            }

            if($currentListItem && $currentListItem.length > 0){
                item = $currentListItem.data('pl-data-item');
                isDisabledItem = that.model.isDisabledItem(item);

                if(!isDisabledItem) {
                    that.model.toggleValue(item);
                }

                that.model.set('selectedItem', item);
            }

        }, true);
    }
});

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Listbox.viewModes.checking', CheckingListBoxView);