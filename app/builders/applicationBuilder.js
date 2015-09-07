function ApplicationBuilder() {
    if(!this.builder){
        this.builder = new Builder();
        this.registerElementBuilders();
    }
}

_.extend(ApplicationBuilder.prototype, {
    builder: null,

    registerElementBuilders: function(){
        var builder = this.builder;
        builder.register('BaseMessage', new BaseMessageBuilder());
        builder.register('DataSourceMessage', new DataSourceMessageBuilder());

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

        builder.register('MenuBar', new MenuBarBuilder());
        
        builder.register('DataGrid', new DataGridBuilder());
        builder.register('DataGridColumn', new DataGridColumnBuilder());
        builder.register('ListBox', new ListBoxBuilder());

        builder.register('TextBox', new TextBoxBuilder());
        builder.register('CheckBox', new CheckBoxBuilder());
        builder.register('ImageBox', new ImageBoxBuilder());
        builder.register('UploadFileBox', new UploadFileBoxBuilder());
        builder.register('Label', new LabelBuilder());
        builder.register('LinkLabel', new LinkLabelBuilder());
        builder.register('DatePicker', new DatePickerBuilder());
        builder.register('ToggleButton', new ToggleButtonBuilder());
        builder.register('NumericBox', new NumericBoxBuilder());
        builder.register('Button', new ButtonBuilder());
        builder.register('ToolBar', new ToolBarBuilder());
        builder.register('ToolBarButton', new ButtonBuilder());
        builder.register('ToolBarSeparator', new ToolBarSeparatorBuilder());
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
        builder.register('PropertyBinding', new PropertyBindingBuilder());
        builder.register('ParameterBinding', new ParameterBindingBuilder());
        builder.register('FileBinding', new FileBindingBuilder());
        builder.register('ObjectBinding', new ObjectBindingBuilder());
        builder.register('ObjectDataSource', new ObjectDataSourceBuilder());
        builder.register('Parameter', new ParameterBuilder());
        builder.register('Validation', new ValidationBuilder());
        builder.register('Criteria', new CriteriaBuilder());

        builder.register('OpenViewAction', new OpenViewActionBuilder());
        builder.register('AddAction', new AddActionBuilder());
        builder.register('EditAction', new EditActionBuilder());
        builder.register('SaveAction', new SaveActionBuilder());
        builder.register('DeleteAction', new DeleteActionBuilder());
        builder.register('CancelAction', new CancelActionBuilder());
        builder.register('AddItemAction', new AddItemActionBuilder());
        builder.register('SaveItemAction', new SaveItemActionBuilder());
        builder.register('EditItemAction', new EditItemActionBuilder());
        builder.register('DeleteItemAction', new DeleteItemActionBuilder());
        builder.register('SelectAction', new SelectActionBuilder());
        builder.register('AcceptAction', new AcceptActionBuilder());
        builder.register('PrintReportAction', new PrintReportActionBuilder());
        builder.register('PrintViewAction', new PrintViewActionBuilder());

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

    },

    build: function(){
        var args = _.toArray(arguments);

        return this.builder.build.apply(this.builder, args);
    },

    buildType: function(){
        var args = _.toArray(arguments);
        return this.builder.buildType.apply(this.builder, args);
    },

    buildMany: function(){
        var args = _.toArray(arguments);
        return this.builder.buildMany.apply(this.builder, args);
    }
});