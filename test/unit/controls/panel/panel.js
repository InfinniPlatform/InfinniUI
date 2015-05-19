describe('PanelControl', function () {
    describe('render', function () {
        it('should render header and content items', function () {
            //Given
            var panel = new PanelControl();
            panel.setText('Test');
            panel.addItem(new TextBox().control);
            panel.addItem(new TextBox().control);

            //When
            var $el = panel.render();

            //Then
            assert.equal($el.find('.portlet-title').length, 1);
            assert.equal($el.find('.portlet-title .caption').html(), 'Test');

            assert.equal($el.find('.portlet-body').length, 1);
            assert.equal($el.find('.portlet-body input.pl-text-box-input').length, 2);
        });
    });
});