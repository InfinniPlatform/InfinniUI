﻿/**
 *
 * @constructor
 */
function ApplicationBuilder() {
    if( !this.builder ) {
        this.builder = new Builder();
        this.registerElementBuilders();
    }

    InfinniUI.global.factory = this;
}

_.extend( ApplicationBuilder.prototype, {

    builder: null,

    /**
     * Registration for all builders
     */
    registerElementBuilders: function() {
        var builder = this.builder;

        builder.register( 'View', new ViewBuilder() );
        builder.register( 'InlineView', new InlineViewBuilder() );
        builder.register( 'AutoView', new MetadataViewBuilder() );

        builder.register( 'StackPanel', new StackPanelBuilder() );
        builder.register( 'GridPanel', new GridPanelBuilder() );
        builder.register( 'ScrollPanel', new ScrollPanelBuilder() );
        builder.register( 'Panel', new PanelBuilder() );
        builder.register( 'ScrollPanel', new ScrollPanelBuilder() );
        builder.register( 'ViewPanel', new ViewPanelBuilder() );
        builder.register( 'TabPanel', new TabPanelBuilder() );
        builder.register( 'TabPage', new TabPageBuilder() );

        builder.register( 'TablePanel', new TablePanelBuilder() );
        builder.register( 'Cell', new CellBuilder() );
        builder.register( 'Row', new RowBuilder() );

        builder.register( 'MenuBar', new MenuBarBuilder() );

        builder.register( 'DataGrid', new DataGridBuilder() );
        // служебный элемент, в документировании не нуждается
        builder.register( 'DataGridRow', new DataGridRowBuilder() );

        builder.register( 'DataGridColumn', new DataGridColumnBuilder() );
        builder.register( 'ListBox', new ListBoxBuilder() );

        builder.register( 'TextBox', new TextBoxBuilder() );
        builder.register( 'PasswordBox', new PasswordBoxBuilder() );
        builder.register( 'CheckBox', new CheckBoxBuilder() );
        builder.register( 'IndeterminateCheckBox', new IndeterminateCheckBoxBuilder() );
        builder.register( 'ImageBox', new ImageBoxBuilder() );
        builder.register( 'FileBox', new FileBoxBuilder() );
        builder.register( 'Label', new LabelBuilder() );
        builder.register( 'Link', new LinkBuilder() );
        builder.register( 'Form', new FormBuilder() );
        builder.register( 'Icon', new IconBuilder() );
        builder.register( 'DateTimePicker', new DateTimePickerBuilder() );
        builder.register( 'DatePicker', new DatePickerBuilder() );
        builder.register( 'TimePicker', new TimePickerBuilder() );
        builder.register( 'ToggleButton', new ToggleButtonBuilder() );
        builder.register( 'NumericBox', new NumericBoxBuilder() );
        builder.register( 'Button', new ButtonBuilder() );
        builder.register( 'ToolBar', new ToolBarBuilder() );
        builder.register( 'ToolBarButton', new ButtonBuilder() );
        builder.register( 'ComboBox', new ComboBoxBuilder() );
        builder.register( 'RadioGroup', new RadioGroupBuilder() );
        builder.register( 'ExtensionPanel', new ExtensionPanelBuilder() );
        builder.register( 'PopupButton', new PopupButtonBuilder() );
        builder.register( 'DataNavigation', new DataNavigationBuilder() );
        builder.register( 'TreeView', new TreeViewBuilder() );
        builder.register( 'Frame', new FrameBuilder() );
        builder.register( 'ButtonEdit', new ButtonEditBuilder() );

        builder.register( 'RestDataSource', new RestDataSourceBuilder() );
        builder.register( 'DocumentDataSource', new DocumentDataSourceBuilder() );
        builder.register( 'PropertyBinding', new DataBindingBuilder() );
        builder.register( 'ObjectDataSource', new ObjectDataSourceBuilder() );
        builder.register( 'Parameter', new ParameterBuilder() );

        builder.register( 'AcceptAction', new AcceptActionBuilder() );
        builder.register( 'AddAction', new AddActionBuilder() );
        builder.register( 'CreateItemAction', new CreateItemActionBuilder() );
        builder.register( 'CancelAction', new CancelActionBuilder() );
        builder.register( 'DeleteAction', new DeleteActionBuilder() );
        builder.register( 'EditAction', new EditActionBuilder() );
        builder.register( 'OpenAction', new OpenActionBuilder() );
        builder.register( 'SaveAction', new SaveActionBuilder() );
        builder.register( 'SelectAction', new SelectActionBuilder() );
        builder.register( 'UpdateAction', new UpdateActionBuilder() );
        builder.register( 'ServerAction', new ServerActionBuilder() );

        builder.register( 'RouteToAction', new RouteToActionBuilder() );

        builder.register( 'BooleanFormat', new BooleanFormatBuilder() );
        builder.register( 'DateTimeFormat', new DateTimeFormatBuilder() );
        builder.register( 'NumberFormat', new NumberFormatBuilder() );
        builder.register( 'ObjectFormat', new ObjectFormatBuilder() );

        builder.register( 'Script', new ScriptBuilder() );

        builder.register( 'Divider', new DividerBuilder() );
        builder.register( 'ContextMenu', new ContextMenuBuilder() );

        // служебный элемент, в документировании не нуждается
        builder.register( 'ToolTip', new InfinniUI.TooltipBuilder() );

        var registerQueue = ApplicationBuilder.registerQueue;

        for( var i = 0, ii = registerQueue.length; i < ii; i++ ) {
            builder.register( registerQueue[ i ].name, registerQueue[ i ].builder );
        }
    },

    /**
     *
     * @param metadataValue
     * @param args
     * @returns {*}
     */
    build: function( metadataValue, args ) {
        return this.builder.build( metadataValue, args );
    },

    /**
     *
     * @param metadataType
     * @param metadataValue
     * @param args
     * @returns {*}
     */
    buildType: function( metadataType, metadataValue, args ) {
        return this.builder.buildType( metadataType, metadataValue, args );
    },

    /**
     *
     * @param metadataValue
     * @param args
     * @returns {*}
     */
    buildMany: function( metadataValue, args ) {
        return this.builder.buildMany( metadataValue, args );
    }
} );

ApplicationBuilder.registerQueue = [];

/**
 *
 * @param name
 * @param builder
 */
ApplicationBuilder.addToRegisterQueue = function( name, builder ) {
    ApplicationBuilder.registerQueue.push( {
        name: name,
        builder: builder
    } );
};

InfinniUI.ApplicationBuilder = ApplicationBuilder;
