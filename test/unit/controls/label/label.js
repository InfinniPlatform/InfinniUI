describe('Label', function () {
    var label;

    beforeEach(function () {
        label = new Label();
    });

    describe('Render', function () {

        describe('Setting the properties', function () {

            it('Setting property: name', function () {
                //Given
                var $el = label.render();
                assert.isUndefined($el.attr('pl-data-pl-name'));

                //When
                label.setName('NewLabel');

                //Then
                assert.equal($el.attr('data-pl-name'), 'NewLabel');
            });

            it('Setting property: visible', function () {
                //Given
                var $el = label.render();
                assert.isFalse($el.hasClass('hidden'));

                //When
                label.setVisible(false);

                //Then
                assert.isTrue($el.hasClass('hidden'));
            });

            it('Setting property: horizontalAlignment', function () {
                //Given
                var $el = label.render();
                assert.isTrue($el.hasClass('pl-text-horizontal-Left'));
                assert.isFalse($el.hasClass('pl-text-horizontal-Right'));
                assert.isFalse($el.hasClass('pl-text-horizontal-Center'));
                assert.isFalse($el.hasClass('pl-text-horizontal-Justify'));

                //When
                label.setTextHorizontalAlignment('Right');

                //Then
                assert.isTrue($el.hasClass('pl-text-horizontal-Right'));
                assert.isFalse($el.hasClass('pl-text-horizontal-Left'));
                assert.isFalse($el.hasClass('pl-text-horizontal-Center'));
                assert.isFalse($el.hasClass('pl-text-horizontal-Justify'));
            });

            it('Setting property: text', function () {
                //Given
                label.setText('Default Label');

                var $label = label.render();

                assert.equal($label.html(), 'Default Label');

                //When
                label.setText('New Label');

                //Then
                assert.equal($label.html(), 'New Label');
            });

            it('Setting property: textWrapping', function () {
                //Given
                var $label = label.render();

                assert.isTrue($label.hasClass('pl-text-wrapping'), 'default value must be true');

                //When
                label.setTextWrapping(false);

                //Then
                assert.isFalse($label.hasClass('pl-text-wrapping'), 'should not wrap if value false');
            });

            it('Setting property: textTrimming', function () {
                //Given
                var $label = label.render();

                assert.isTrue($label.hasClass('pl-text-trimming'), 'default value must be true');

                //When
                label.setTextTrimming(false);

                //Then
                assert.isFalse($label.hasClass('pl-text-trimming'), 'should not trim if value false');
            });
        });

    });
});
