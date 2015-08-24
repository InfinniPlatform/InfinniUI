/**
 * @description Построитель DataGridColumn
 * @class DataGridColumnBuilder
 */
var DataGridColumnBuilder = function () {

    /**
     * @description Создает экземпляр {@link DataGridColumn}
     * @memberOf DataGridColumnBuilder
     * @param {Object} context
     * @param {Object} args
     * @returns {DataGridColumn}
     */
    this.build = function (context, args) {
        var column;

        var metadata = args.metadata;

        if (typeof metadata !== 'undefined' && metadata !== null) {

            column = new DataGridColumn();

            column.setName(metadata.Name);
            column.setText(metadata.Text);
            column.setImage(metadata.Image);
            column.setResizable(metadata.Resizable);
            column.setVisible(metadata.Visible);
            column.setDisplayProperty(metadata.DisplayProperty);

            var itemTemplate = metadata.ItemTemplate;
            if (typeof itemTemplate !== 'undefined' && itemTemplate !== null && itemTemplate !== '') {
                column.setItemTemplate(this.getItemTemplateConstructor(args.builder, args.parent, metadata, args.collectionProperty));
            }

            if (metadata.ItemFormat) {
                var format = args.builder.build(args.parent, metadata.ItemFormat);
                column.setFormat(format);
            }

        }
        return column;
    };

    /**
     * @private
     * @param builder
     * @param parent
     * @param metadata
     * @param collectionProperty
     * @memberOf DataGridColumnBuilder
     * @returns {*}
     */
    this.getItemTemplateConstructor = function (builder, parent, metadata, collectionProperty) {

        var itemTemplateConstructor = null;

        if (typeof metadata.ItemTemplate !== 'undefined' && metadata.ItemTemplate !== null && metadata.ItemTemplate !== '') {
            itemTemplateConstructor = function(baseIndex) {
                return builder.build(parent, metadata.ItemTemplate, new ListBoxItemCollectionProperty('', baseIndex, collectionProperty));
            };
        }

        return itemTemplateConstructor;
    };


};

