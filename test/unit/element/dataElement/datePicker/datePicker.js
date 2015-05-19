describe('DatePicker', function () {
    describe('render', function () {
        it('correct convert from string to date and from date to string', function () {
            // Given
            var datePicker = new DatePicker();

            datePicker.render();

            // When
            datePicker.setMinDate('2014-01-01');
            datePicker.setMaxDate('2014-12-31');
            datePicker.setValue('2014-07-29');

            // Then
            assert.equal(InfinniUI.DateUtils.toISO8601(datePicker.getMinDate()).substr(0, 10), '2014-01-01');
            assert.equal(InfinniUI.DateUtils.toISO8601(datePicker.getMaxDate()).substr(0, 10), '2014-12-31');
            assert.equal(datePicker.getValue().substr(0, 10), '2014-07-29');
        });

        it('event OnValueChanged', function () {
            // Given
            var datePicker = new DatePicker(),
                onValueChangedFlag = 0;

            datePicker.render();

            datePicker.onValueChanged(function(){
                onValueChangedFlag++;
            });

            assert.equal(onValueChangedFlag, 0);

            // When
            datePicker.setValue('2014-07-29');
            datePicker.setValue('2014-07-30');

            // Then
            assert.equal(onValueChangedFlag, 2);
        });
    });
});

