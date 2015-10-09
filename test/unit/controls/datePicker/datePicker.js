describe('DatePickerControl', function () {
    var builder = new ApplicationBuilder();

    describe('render', function () {
        it('should update date when change value', function () {
            //Given
            var datePicker = builder.buildType('DatePicker', {});
            var oldDate = new Date(2012, 10, 2);
            var newDate = new Date(2014, 7, 28);
            var $el = datePicker.render().find('.pl-datepicker-input');
            datePicker.setValue(InfinniUI.DateUtils.toISO8601(oldDate));

            //When
            datePicker.setValue(InfinniUI.DateUtils.toISO8601(newDate));

            //Then
            assert.equal($el.val(), '28.08.2014');
        });

        it('should clear date when value is null', function () {
            //Given
            var datePicker = new DatePickerControl();
            var value = InfinniUI.DateUtils.toISO8601(new Date(2012, 10, 2));

            datePicker.setValue(value);
            assert.equal( datePicker.getValue(), value);

            //When
            datePicker.setValue(null);

            //Then
            assert.isNull(datePicker.getValue());
        });

        it('should set minDate and maxDate', function () {
            //Given
            var datePicker = builder.buildType('DatePicker', {});
            var minDate = InfinniUI.DateUtils.toISO8601(new Date(2010, 0, 1));
            var maxDate = InfinniUI.DateUtils.toISO8601(new Date(2014, 11, 31));

            //When
            datePicker.setMinValue(minDate);
            datePicker.setMaxValue(maxDate);

            //Then
            assert.equal(datePicker.getMinValue(), minDate);
            assert.equal(datePicker.getMaxValue(), maxDate);
        });

        it('should set Enabled', function () {
            //Given
            var datePicker = builder.buildType('DatePicker', {});
            datePicker.setEnabled(false);

            var $el = datePicker.render().find('.pl-datepicker-input, .pl-datepicker-calendar');
            assert.equal($el.length, 3);
            $el.each(function (i, el) {
                var $el = $(el);
                assert.isTrue($el.prop('disabled'));
            });

            //When
            datePicker.setEnabled(true);

            //Then
            $el.each(function (i, el) {
                var $el = $(el);
                assert.isFalse($el.prop('disabled'));
            });

        });

    });
});