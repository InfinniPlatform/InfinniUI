function ApplicationBuilder() {
    if(!this.builder){
        this.builder = new Builder();
        this.registerElementBuilders();
    }

    window.InfinniUI.global.factory = this;
}

_.extend(ApplicationBuilder.prototype, {
    builder: null,

    registerElementBuilders: function(){
        var builder = this.builder;

        builder.register('View', new ViewBuilder());
        builder.register('InlineView', new InlineViewBuilder());
        builder.register('ChildView', new ChildViewBuilder());
        builder.register('AutoView', new MetadataViewBuilder());
        builder.register('ExistsView', new MetadataViewBuilder());

        builder.register('StackPanel', new StackPanelBuilder());
        builder.register('GridPanel', new GridPanelBuilder());
        builder.register('ScrollPanel', new ScrollPanelBuilder());
        builder.register('Panel', new PanelBuilder());
        builder.register('ScrollPanel', new ScrollPanelBuilder());
        builder.register('ViewPanel', new ViewPanelBuilder());
        builder.register('TabPanel', new TabPanelBuilder());
        builder.register('TabPage', new TabPageBuilder());

        builder.register('TablePanel', new TablePanelBuilder());
        builder.register('Cell', new CellBuilder());
        builder.register('Row', new RowBuilder());

        builder.register('MenuBar', new MenuBarBuilder());
        
        builder.register('DataGrid', new DataGridBuilder());
        builder.register('DataGridColumn', new DataGridColumnBuilder());
        builder.register('ListBox', new ListBoxBuilder());

        builder.register('TextBox', new TextBoxBuilder());
        builder.register('PasswordBox', new PasswordBoxBuilder());
        builder.register('CheckBox', new CheckBoxBuilder());
        builder.register('ImageBox', new ImageBoxBuilder());
        builder.register('FileBox', new FileBoxBuilder());
        builder.register('Label', new LabelBuilder());
        builder.register('Icon', new IconBuilder());
        builder.register('LinkLabel', new LinkLabelBuilder());
        builder.register('DatePicker', new DatePickerBuilder());
        builder.register('ToggleButton', new ToggleButtonBuilder());
        builder.register('NumericBox', new NumericBoxBuilder());
        builder.register('Button', new ButtonBuilder());
        builder.register('ToolBar', new ToolBarBuilder());
        builder.register('ToolBarButton', new ButtonBuilder());
        //builder.register('ToolBarSeparator', new ToolBarSeparatorBuilder());
        builder.register('ComboBox', new ComboBoxBuilder());
        builder.register('RadioGroup', new RadioGroupBuilder());
        builder.register('SearchPanel', new SearchPanelBuilder());
        builder.register('ExtensionPanel', new ExtensionPanelBuilder());
        builder.register('FilterPanel', new FilterPanelBuilder());
        builder.register('PopupButton', new PopupButtonBuilder());
        builder.register('DataNavigation', new DataNavigationBuilder());
        builder.register('DocumentViewer', new DocumentViewerBuilder());
        builder.register('TreeView', new TreeViewBuilder());

        builder.register('DocumentDataSource', new DocumentDataSourceBuilder());
        builder.register('DataBinding', new DataBindingBuilder());
        builder.register('PropertyBinding', new DataBindingBuilder());
        builder.register('ObjectDataSource', new ObjectDataSourceBuilder());
        builder.register('Parameter', new ParameterBuilder());
        builder.register('Validation', new ValidationBuilder());
        builder.register('Criteria', new CriteriaBuilder());


        builder.register('AcceptAction', new AcceptActionBuilder());
        builder.register('AddAction', new AddActionBuilder());
        builder.register('CancelAction', new CancelActionBuilder());
        builder.register('DeleteAction', new DeleteActionBuilder());
        builder.register('EditAction', new EditActionBuilder());
        builder.register('OpenAction', new OpenActionBuilder());
        builder.register('PrintReportAction', new PrintReportActionBuilder());
        builder.register('PrintViewAction', new PrintViewActionBuilder());
        builder.register('SaveAction', new SaveActionBuilder());
        builder.register('SelectAction', new SelectActionBuilder());
        builder.register('UpdateAction', new UpdateActionBuilder());


        builder.register('BooleanFormat', new BooleanFormatBuilder());
        builder.register('DateTimeFormat', new DateTimeFormatBuilder());
        builder.register('NumberFormat', new NumberFormatBuilder());
        builder.register('ObjectFormat', new ObjectFormatBuilder());

        builder.register('DateTimeEditMask', new DateTimeEditMaskBuilder());
        builder.register('NumberEditMask', new NumberEditMaskBuilder());
        builder.register('TemplateEditMask', new TemplateEditMaskBuilder());
        builder.register('RegexEditMask', new RegexEditMaskBuilder());

        builder.register('Comparator', new ComparatorBuilder());
        builder.register('GlobalNavigationBar', new GlobalNavigationBarBuilder());
        builder.register('ActionBar', new ActionBarBuilder());

        builder.register('Script', new ScriptBuilder());
    },

    build: function(metadataValue, args){
        return this.builder.build(metadataValue, args);
    },

    buildType: function(metadataType, metadataValue, args){
        return this.builder.buildType(metadataType, metadataValue, args);
    },

    buildMany: function(metadataValue, args){
        return this.builder.buildMany(metadataValue, args);
    }
});