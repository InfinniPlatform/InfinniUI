describe('NumberFormatting', function () {
    describe('format', function () {
        it('successful build', function () {
            //Given
            var builder = new InfinniUI.NumberFormatBuilder();
            //When
            var format = builder.build(null, { metadata: {} });
            //Then
            assert.isFunction(format.format);
            assert.equal(format.getFormat(), 'n');
        });

        it('should format percent', function () {
            //Given
            var formatting_p = new InfinniUI.NumberFormat('p');
            var formatting_p0 = new InfinniUI.NumberFormat('p0');
            var formatting_p1 = new InfinniUI.NumberFormat('p1');
            var enCulture = InfinniUI.localizations['en-US'];

            //When
            var val = 123.4567;

            //Then
            assert.equal(formatting_p.format(val), '12 345,67%');
            assert.equal(formatting_p0.format(val), '12 346%');
            assert.equal(formatting_p1.format(val), '12 345,7%');

            assert.equal(formatting_p1.format(val, enCulture), '12,345.7 %');
        });

        it('should format number', function () {
            //Given
            var formatting_n = new InfinniUI.NumberFormat('n');
            var formatting_n0 = new InfinniUI.NumberFormat('n0');
            var formatting_n1 = new InfinniUI.NumberFormat('n1');
            var enCulture = InfinniUI.localizations['en-US'];

            //When
            var val = 1234.5678;

            //Then
            assert.equal(formatting_n.format(val), '1 234,57');
            assert.equal(formatting_n0.format(val), '1 235');
            assert.equal(formatting_n1.format(val), '1 234,6');

            assert.equal(formatting_n1.format(val, enCulture), '1,234.6');
        });

        it('should format currency', function () {
            //Given
            var formatting_c = new InfinniUI.NumberFormat('c');
            var formatting_c0 = new InfinniUI.NumberFormat('c0');
            var formatting_c1 = new InfinniUI.NumberFormat('c1');
            var enCulture = InfinniUI.localizations['en-US'];

            //When
            var val = 1234.5678;

            //Then
            assert.equal(formatting_c.format(val), '1 234,57р.');
            assert.equal(formatting_c0.format(val), '1 235р.');
            assert.equal(formatting_c1.format(val), '1 234,6р.');

            assert.equal(formatting_c1.format(val, enCulture), '$1,234.6');
        });

        it('should format collections', function () {
            //Given
            var formatting_c = new InfinniUI.NumberFormat('c');
            var formatting_c0 = new InfinniUI.NumberFormat('c0');
            var formatting_c1 = new InfinniUI.NumberFormat('c1');
            var enCulture = InfinniUI.localizations['en-US'];

            //When
            var val = [1234.5678, 2901.2345, 2678.9012];

            //Then
            assert.equal(formatting_c.format(val), '1 234,57р., 2 901,23р., 2 678,90р.');
            assert.equal(formatting_c0.format(val), '1 235р., 2 901р., 2 679р.');
            assert.equal(formatting_c1.format(val), '1 234,6р., 2 901,2р., 2 678,9р.');

            assert.equal(formatting_c1.format(val, enCulture), '$1,234.6, $2,901.2, $2,678.9');
        });

    });

});
