/**
 * @private
 * @description Представление для рендеринга ячейки строки тела таблицы
 * @class DataGridBodyCell
 * @property {DataGridColumnModel} model
 * @extend Backbone.View
 */
var DataGridBodyCell = Backbone.View.extend({

    tagName: 'td',

    template: InfinniUI.Template['controls/dataGrid/template/cells/bodyCell.tpl.html'],

    initialize: function (options) {
        this.options = options;
        this.row = options.row;
        this.listenTo(this.model, 'change:visible', this.onChangeVisibleHandler);
    },

    UI: {
        expand: '.expand'
    },

    render: function () {
        this.applyVisible();
        var val = InfinniUI.ObjectUtils.getPropertyValue(this.row, this.model.get('displayProperty'));
        var format = this.model.get('itemFormat');
        var options = this.options;

        this.wasRendered = true;

        //this.$el.empty();

        var itemTemplate = this.model.get('itemTemplate');

        if (typeof itemTemplate === 'function') {
            var itemTemplateElement = itemTemplate(options.index);
            var $itemTemplate = itemTemplateElement.render();

            var onClickRowHandler = function (event) {
                options.click();
            };

            (function f($el) {;
                _.each($el, function (el) {;
                    var $el = $(el);
                    $el.on('click', onClickRowHandler);
                    var handlers = $._data(el, 'events').click;
                    if (handlers !== null && typeof handlers !== 'undefined') {
                        var handler = handlers.pop();
                        handlers.splice(0,0, handler);
                    }
                    f($(el).children());
                });
            })($itemTemplate);

            this.$el.html(this.template({
                text: '',
                canExpand: options.canExpand
            }));
            this.bindUIElements();
            this.$el.append($itemTemplate);
        } else {
            if (format){
                val = format.format(val);
            }

            this.$el.html(this.template({
                text: val,
                canExpand: options.canExpand
            }));
            this.bindUIElements();
        }

        var that = this;
        if (this.ui.expand.length) {
            this.ui.expand.on('click', function (event) {
                event.stopPropagation();
                that.trigger('expanded');
            });
        }

        return this;
    },

    applyVisible: function () {
        this.$el.toggleClass('hidden', this.model.get('visible') === false);
    },

    onChangeVisibleHandler: function () {
        if (this.wasRendered === true) {
            this.applyVisible();
        }
    }

});


_.extend(DataGridBodyCell.prototype, bindUIElementsMixin);