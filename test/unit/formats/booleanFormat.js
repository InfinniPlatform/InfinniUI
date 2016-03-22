describe('BooleanFormat', function () {
    describe('format', function () {

        it('successful build', function () {
            //Given
            var metadata = {TrueText: "+", FalseText: "-"};
            var builder = new BooleanFormatBuilder();
            //When
            var format = builder.build(null, {metadata: metadata} );
            //Then
            assert.isFunction(format.format);
            assert.isFunction(format.getTrueText);
            assert.isFunction(format.getFalseText);
            assert.isFunction(format.setFalseText);
            assert.isFunction(format.setTrueText);
            assert.equal(format.format(true), '+');
            assert.equal(format.format(false), '-');
        });

        it('should have default value', function () {
            //Given
            var format = new BooleanFormat();
            //When
            var value = true;
            //Then
            assert.equal(format.getFalseText(), 'False');
            assert.equal(format.getTrueText(), 'True');
            assert.equal(format.format(value), 'True');
        });

        it('should format boolean', function () {
            //Given
            var format = new BooleanFormat();
            //When
            var value_1 = false;
            var value_2 = true;
            format.setFalseText('Нет');
            format.setTrueText('Да');
            //Then
            assert.equal(format.format(value_1), 'Нет');
            assert.equal(format.format(value_2), 'Да');
        });

        it('should format collection', function () {
            //Given
            var format = new BooleanFormat();
            //When
            var value = [true, true, false, true];
            format.setFalseText('Нет');
            format.setTrueText('Да');
            //Then
            assert.equal(format.format(value), 'Да, Да, Нет, Да');
        });

    });


});