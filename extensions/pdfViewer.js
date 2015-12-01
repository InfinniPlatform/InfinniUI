function oldPdfViewer() {
    this.render = function (target, parameters, context) {
        var href = null;
        var documentViewer = context.ParentView.getContext().Controls['DocumentViewer'];
        var $originalDiv = $('<div>').hide();
        var inittext = 'Показать оригинал документа';

        var button = new Button();
        button.setText(inittext);
        button.setVisible(false);
        button.onClick(function () {
            if (href != null) {
                if (documentViewer.getVisible()) {
                    button.setText('Показать заголовок');
                    documentViewer.setVisible(false);
                    $originalDiv.show().append(
                        $('<iframe>')
                            .attr('src', href)
                            .attr('width', '100%')
                            .css('border', 'none')
                            .attr('height', window.innerHeight - 50)
                    );
                } else {
                    button.setText(inittext);
                    documentViewer.setVisible(true);
                    $originalDiv.hide();
                }
            }
        });

        target.append(button.render());
        target.append($originalDiv);

        context.DataSources['MainDataSource'].onSelectedItemChanged(function (c, data) {
            var header = data.value;

            documentViewer.setVisible(true);
            $originalDiv.empty().hide();
            button.setText(inittext);

            if (header != null && header.hasOwnProperty('PrintView') && _.isEmpty(header.PrintView) == false) {
                href = header.PrintView;
                button.setVisible(true);
            } else {
                documentViewer.setVisible(false);
                href = null;
                button.setVisible(false);
            }
        });
    }
}