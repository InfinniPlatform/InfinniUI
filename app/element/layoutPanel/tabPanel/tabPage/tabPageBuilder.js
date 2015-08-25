function TabPageBuilder() {

    this.build = function (context, args) {
        var view = args.view,
            metadata = args.metadata;
        var tabPage = new TabPage(view);

        tabPage.setImage(metadata.Image);
        tabPage.setCanClose(metadata.CanClose);

        //Установка унаследованных атрибутов
        var tabName = _.isEmpty(metadata.Name)? guid() : metadata.Name;
        tabPage.setName(tabName);
        tabPage.setText(metadata.Text);
        tabPage.setEnabled(metadata.Enabled);
        tabPage.setVisible(metadata.Visible);
        tabPage.setHorizontalAlignment(metadata.HorizontalAlignment);

        if (typeof metadata.LayoutPanel !== 'undefined') {
            tabPage.setLayoutPanel(args.builder.build(view, metadata.LayoutPanel));
        }

        if (view && metadata.OnClosing){
            tabPage.onClosing(function() {
                new ScriptExecutor(view).executeScript(metadata.OnClosing.Name);
            });
        }

        if (view && metadata.OnClosed){
            tabPage.onClosed(function() {
                new ScriptExecutor(view).executeScript(metadata.OnClosed.Name);
            });
        }

        return tabPage;
    };
}
