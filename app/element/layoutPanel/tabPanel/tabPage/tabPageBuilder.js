function TabPageBuilder() {

    this.build = function (builder, parent, metadata) {
        var tabPage = new TabPage(parent);

        tabPage.setImage(metadata.Image);
        tabPage.setCanClose(metadata.CanClose);

        //Установка унаследованных атрибутов
        tabPage.setName(metadata.Name);
        tabPage.setText(metadata.Text);
        tabPage.setEnabled(metadata.Enabled);
        tabPage.setVisible(metadata.Visible);
        tabPage.setHorizontalAlignment(metadata.HorizontalAlignment);

        if (typeof metadata.LayoutPanel !== 'undefined') {
            tabPage.setLayoutPanel(builder.build(parent, metadata.LayoutPanel));
        }

        return tabPage;
    };
}
