var FilterPanelView = ControlView.extend({
    className: 'pl-filter-panel',

    template: {
        panel: InfinniUI.Template["controls/filterPanel/template/template.tpl.html"],
        item: InfinniUI.Template["controls/filterPanel/template/item.tpl.html"]
    },


    controlsPerLine: 6,

    events: {
        'click .btn_reset': 'onButtonResetClickHandler',
        'submit form': 'submitFormHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.listenTo(this.model, 'change:enabled', this.updateEnabled);
        this.on('applyFilter', this.onApplyFilterHandler);
    },

    render: function () {
        this.prerenderingActions();
        var filters = this.model.get('filters');
        var $item;

        this.$el.html(this.template.panel({
            text: this.model.get('text')
        }));
        var $controls = this.$('.pl-filter-controls');

        for (var i = 0; i < filters.length; i = i + 1) {
            $item = $(this.template.item());
            $('.pl-filter-panel-label', $item).append(filters[i].text.render());
            for (var j = 0; j < filters[i].operators.length; j++) {
                $('.pl-filter-panel-control', $item).append(filters[i].operators[j].el.render());
            }

            $controls.append($item);
        }

        this.updateEnabled();

        this.postrenderingActions();
        return this;
    },

    onApplyFilterHandler: function () {
        this.$el.find('.pl-text-box').trigger('synchValue');
        this.onButtonSearchClickHandler();
    },

    submitFormHandler: function(event){
        event.preventDefault();
        this.trigger('applyFilter');
    },

    onButtonSearchClickHandler: function () {
        var query = this.collectFormQuery();

        if(this.model.get('value') !== undefined && JSON.stringify(this.model.get('value')) == JSON.stringify(query)) {
            return;
        }

        this.model.set('value', query);
        this.trigger('onValueChanged', this.model.get('value'));
    },

    filter:function(){
        this.onButtonSearchClickHandler();
    },

    onButtonResetClickHandler: function () {
        var filters = this.model.get('filters');
        var value = [];

        for (var i = 0; i < filters.length; i++) {
            for (var j = 0; j < filters[i].operators.length; j++) {
                filters[i].operators[j].el.control.set('value', null);
            }
        }

        this.model.set('value', value);
        this.trigger('onValueChanged', this.model.get('value'));
    },

    collectFormQuery: function(){
        var query = [];
        var filters = this.model.get('filters');

        for (var i = 0; i < filters.length; i++) {
            for (var j = 0; j < filters[i].operators.length; j++) {
                var val = filters[i].operators[j].el.getValue();
                if(val) {
                    var obj = {};
                    obj.Property = filters[i].property;
                    if(obj.Property) {
                        obj.CriteriaType = toEnum(filters[i].operators[j].operator);

                        if (typeof val == 'object' && !(val instanceof Date)) {
                            obj.Value = val.Id;
                        } else {
                            obj.Value = val;
                        }
                        query.push(obj);
                    }
                }
            }
        }
        query.push.apply(query, this.model.get('query'));
        //console.log(query);
        return query;
    },

    updateEnabled: function(){
        this.$el.find('input, button').prop('disabled', !this.model.get('enabled'));
    }
});