describe('DatePickerBuilder', function () {
    describe('build', function () {
        it('successful build Date', function () {
            // Given

            var datePickerMetadata = {
                Visible: false,
                HorizontalAlignment: 'Right',

                Mode: 'Date',
                MinDate: '2014-01-01',
                MaxDate: '2014-12-31',
                ReadOnly: true
                //Format: 'ShortDate'
            };

            // When
            var builder = new DatePickerBuilder();
            var datePicker = builder.build(new ApplicationBuilder(), new View(), datePickerMetadata);

            // Then
            assert.isNotNull(datePicker);

            assert.isFalse(datePicker.getVisible(), 'Неверное значение для свойства Visible');
            assert.equal(datePicker.getHorizontalAlignment(), 'Right');

            assert.equal(datePicker.getMode(), 'Date');

            assert.equal(datePicker.getMinDate(), '01/01/2014');
            assert.equal(datePicker.getMaxDate(), '12/31/2014');

            assert.isTrue(datePicker.getReadOnly(), 'Неверное значение для свойства ReadOnly');
            //assert.equal(datePicker.getFormat(), 'ShortDate');
        });

        it('set default value when not fill property', function () {
            // Given
            var datePickerMetadata = {
                Mode: 'Date'//,
                //Format: 'ShortDate'
            };

            // When
            var builder = new DatePickerBuilder();
            var datePicker = builder.build(new ApplicationBuilder(), new View(), datePickerMetadata);

            // Then
            assert.isNotNull(datePicker);

            assert.isNull(datePicker.getMinDate(), 'Неверное значение для свойства MinDate');
            assert.isNull(datePicker.getMaxDate(), 'Неверное значение для свойства MaxDate');
            assert.isNull(datePicker.getValue(), 'Неверное значение для свойства Value');

            assert.isFalse(datePicker.getReadOnly(), 'Неверное значение для свойства ReadOnly');
        });

        it('should be true if scriptsHandlers call', function () {
            //Given
            var datePicker = new DatePickerBuilder();
            var view = new View();
            var metadata = {
                OnValueChanged:{
                    Name: 'OnValueChanged'
                },
                OnLoaded:{
                    Name: 'OnLoaded'
                }
            };
            window.Test = {datePicker:1, datePickerLoaded: false};
            view.setScripts([{Name:"OnValueChanged", Body:"window.Test.datePicker = 5"}, {Name:"OnLoaded", Body:"window.Test.datePickerLoaded = true"}]);

            //When
            var build = datePicker.build(new ApplicationBuilder(), view, metadata);
            build.setValue(true);
            $(build.render());

            // Then
            assert.equal(window.Test.datePicker, 5);
            assert.isTrue(window.Test.datePickerLoaded);
        });
    });
});
