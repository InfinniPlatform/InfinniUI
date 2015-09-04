function TabPageBuilder() {

    this.build = function (builder, parent, metadata, params) {
        var tabPage = new TabPage(parent);

        //@TODO Должен быть унаследован от ElementBuilder!!!!
        //@TODO Удалить работу с parentElement после исправления наследования
        var parentElement = params && params.parentElement;
        if (parentElement) {
            parentElement.children.add(tabPage);
        }


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
            tabPage.setLayoutPanel(builder.build(parent, metadata.LayoutPanel));
        }

        if (parent && metadata.OnClosing){
            tabPage.onClosing(function() {
                new ScriptExecutor(parent).executeScript(metadata.OnClosing.Name);
            });
        }

        if (parent && metadata.OnClosed){
            tabPage.onClosed(function() {
                new ScriptExecutor(parent).executeScript(metadata.OnClosed.Name);
            });
        }

        return tabPage;
    };
}
