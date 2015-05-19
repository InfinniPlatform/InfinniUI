var GridPanelView = AbstractGridPanelView.extend({
    className: 'pl-grid-panel',

    templates: {
        row: _.template('<div class="pl-grid-row row"></div>'),
        cell: _.template('<div class="pl-grid-cell col-md-<%=colSpan%>"></div>')
    }
});