/**
 * @class
 * @augments ControlView
 */
var GridPanelView = ContainerView.extend(
    /** @lends GridPanelView.prototype */
    {
        className: 'pl-grid-panel pl-clearfix',

        columnCount: 12,

        template: {
            row: InfinniUI.Template["controls/gridPanel/template/row.tpl.html"]
        },

        initialize: function (options) {
            ContainerView.prototype.initialize.call(this, options);
        },

        render: function () {
            this.prerenderingActions();

            this.removeChildElements();

            this.renderItemsContents();
            this.updateProperties();
            this.trigger('render');

            this.postrenderingActions();
            return this;
        },

        renderItemsContents: function(){
            var items = this.model.get('items'),
                itemTemplate = this.model.get('itemTemplate'),
                view = this,
                row = [],
                rowSize = 0,
                element, item;

            items.forEach(function(item, i){
                element = itemTemplate(undefined, {item: item, index: i});
                var span = element.getColumnSpan();
                if (rowSize + span > view.columnCount) {
                    view.renderRow(row);
                    row.length = 0;
                    rowSize = 0;
                }

                row.push(element);
                rowSize += span;
            });

            if (row.length) {
                view.renderRow(row);
            }
        },

        renderRow: function (row) {
            var view = this;
            var $row = $(this.template.row());
            $row.append(row.map(function(element) {
                view.addChildElement(element);
                return element.render();
            }));
            this.$el.append($row);
        },

        updateGrouping: function(){}
    }
);
