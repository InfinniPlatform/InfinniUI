describe('GridPanelControl', function () {
    describe('render', function () {
        it('should render rows and cells', function () {
            //Given
            var grid = new GridPanelControl(),
                rows = [
                    new GridRow(),
                    new GridRow()
                ],
                cells = [],
                items = [
                    new TextBox()
                ];

            grid.addRow(rows[0]);
            grid.addRow(rows[1]);

            cells.push( rows[0].addCell(12) );
            cells.push( rows[1].addCell(6) );
            cells.push( rows[1].addCell(6) );

            cells[0].addItem(items[0]);

            //When
            var $el = grid.render();

            //Then
            assert.equal($el.find('.pl-grid-row').length, 2);

            assert.equal($el.find('.pl-grid-row:first .pl-grid-cell').length, 1);
            assert.equal($el.find('.pl-grid-row:last .pl-grid-cell').length, 2);

            assert.isTrue($el.find('.pl-grid-row:first .pl-grid-cell:first').hasClass('col-md-12'));
            assert.isTrue($el.find('.pl-grid-row:last .pl-grid-cell:first').hasClass('col-md-6'));

            assert.equal($el.find('.pl-grid-row:first .pl-grid-cell:first input.pl-text-box-input').length, 1);
        });

        it('should have Stretch alignment by default', function () {
            //Given
            var grid = new GridPanelControl();

            //When
            var $el = grid.render();

            //Then
            assert.isFalse($el.hasClass('pull-left'));
            assert.isFalse($el.hasClass('pull-right'));
            assert.isFalse($el.hasClass('center-block'));
        });
    });
});