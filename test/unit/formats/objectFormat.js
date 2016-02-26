describe('ObjectFormat', function () {
    describe('format', function () {

        it('successful build', function () {
            //Given
            var metadata = {Format: '{}'};
            var builder = new ObjectFormatBuilder();
            //When
            var format = builder.build(null, { metadata: metadata } );
            //Then
            assert.isFunction(format.format);
            assert.equal(format.getFormat(), '{}');
        });

        it('should format simple data type ', function () {
            //Given
            var formatter_1 = new ObjectFormat("Hello, {}!");
            var formatter_2 = new ObjectFormat("Birth date: {:d}");
            var formatter_3 = new ObjectFormat("Birth time: {:T}");
            var formatter_4 = new ObjectFormat("Weight: {:n2} kg");
            var enCulture = new Culture('en-US');

            //When
            var value_1 = 'Ivan';
            var value_2 = new Date("4 January 1908 12:34:56");
            var value_3 = new Date("4 January 1908 12:34:56");
            var value_4 = 123.456;

            //Then
            assert.equal(formatter_1.format(value_1, enCulture), 'Hello, Ivan!');
            assert.equal(formatter_2.format(value_2, enCulture), 'Birth date: 1/4/1908');
            assert.equal(formatter_3.format(value_3, enCulture), 'Birth time: 12:34:56 PM');
            assert.equal(formatter_4.format(value_4, enCulture), 'Weight: 123.46 kg');
            assert.equal(formatter_4.format(value_4), 'Weight: 123,46 kg');
        });

        it('should format complex data type ', function () {
            //Given
            var formatter_1 = new ObjectFormat("Hello, {FirstName} {MiddleName}!");
            var formatter_2 = new ObjectFormat("Birth date: {BirthDate:d}");
            var formatter_3 = new ObjectFormat("Birth time: {BirthDate:T}");
            var formatter_4 = new ObjectFormat("Weight: {Weight:n2} kg");
            var enCulture = new Culture('en-US');

            //When
            var value_1 = { FirstName: "Ivan", MiddleName: "Ivanovich" };
            var value_2 = { BirthDate: new Date("4 January 1908 12:34:56") };
            var value_3 = { BirthDate: new Date("4 January 1908 12:34:56") };
            var value_4 = { Weight: 123.456 };

            //Then
            assert.equal(formatter_1.format(value_1, enCulture), "Hello, Ivan Ivanovich!");
            assert.equal(formatter_2.format(value_2, enCulture), "Birth date: 1/4/1908");
            assert.equal(formatter_3.format(value_3, enCulture), "Birth time: 12:34:56 PM");
            assert.equal(formatter_4.format(value_4, enCulture), "Weight: 123.46 kg" );
        });

        it('should format collection ', function () {
            //Given
            var formatter_1 = new ObjectFormat("Hello, {FirstName} {MiddleName}!");
            var formatter_2 = new ObjectFormat("Birth date: {BirthDate:d}");
            var formatter_3 = new ObjectFormat("Birth time: {BirthDate:T}");
            var formatter_4 = new ObjectFormat("Weight: {Weight:n2} kg");
            var enCulture = new Culture('en-US');

            //When
            var value_1 = [{ FirstName: "Ivan", MiddleName: "Ivanovich" }, { FirstName: "Petr", MiddleName: "Petrov" }];
            var value_2 = { BirthDate: new Date("4 January 1908 12:34:56") };
            var value_3 = { BirthDate: new Date("4 January 1908 12:34:56") };
            var value_4 = [{ Weight: 123.456 }, { Weight: 789.012 }];

            //Then
            assert.equal(formatter_1.format(value_1, enCulture), "Hello, Ivan Ivanovich!, Hello, Petr Petrov!");
            assert.equal(formatter_2.format(value_2, enCulture), "Birth date: 1/4/1908");
            assert.equal(formatter_3.format(value_3, enCulture), "Birth time: 12:34:56 PM");
            assert.equal(formatter_4.format(value_4, enCulture), "Weight: 123.46 kg, Weight: 789.01 kg" );
        });

        it('should format when value is undefined', function () {
            //Given
            var formatter = new ObjectFormat("Hello, {FirstName} {MiddleName}!");
            //When
            //Then
            assert.equal(formatter.format(), "Hello,  !");
        });

        it('should format when value is null', function () {
            //Given
            var formatter = new ObjectFormat("Hello, {FirstName} {MiddleName}!");
            //When
            //Then
            assert.equal(formatter.format(null), "Hello,  !");
        });
    });

});