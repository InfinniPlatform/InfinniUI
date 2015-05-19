describe('DatePickerControl', function () {
    describe('render', function () {
        it('should update date when change value', function () {
            //Given
            var datePicker = new DatePickerControl();
            var oldDate = new Date(2012, 10, 2);
            var newDate = new Date(2014, 7, 28);
            var $el = datePicker.render().find('.date .datePicker');

            datePicker.set('value', oldDate);

            //When
            datePicker.set('value', newDate);

            //Then
            assert.equal($el.val(), '28.08.2014');
        });

        it('should update value when change date', function () {
            //Given
            var datePicker = new DatePickerControl();
            var oldDate = new Date(2012, 10, 2);
            var newDate = '28.08.2014';

            datePicker.set('value', oldDate);

            var $el = datePicker.render().find('.date .datePicker');

            //When
            $el
                .val(newDate)
            .parent().data('datepicker')
                .update();

            //Then
            assert.equal(datePicker.get('value').substr(0, 10), '2014-08-28');
        });

        it('should clear date when value is null', function () {
            //Given
            var datePicker = new DatePickerControl();
            var value = new Date(2012, 10, 2);

            datePicker.set('value', value);
            assert.equal( datePicker.get('value').substr(0, 10), '2012-11-02');

            var $el = datePicker.render().find('.date');

            //When
            datePicker.set('value', null);

            //Then
            assert.isNull( datePicker.get('value') );
        });

        it('should set minDate and maxDate', function () {
            //Given
            var datePicker = new DatePickerControl();
            var minDate = new Date(2010, 0, 1);
            var maxDate = new Date(2014, 11, 31);

            datePicker.set('minDate', minDate);
            datePicker.set('maxDate', maxDate);

            //When
            var $el = datePicker.render().find('.date');
            var pluginObject = $el.data('datepicker');

            //Then
            var startDate = pluginObject._utc_to_local( pluginObject.o.startDate );
            var endDate = pluginObject._utc_to_local( pluginObject.o.endDate);

            assert.ok( startDate.getTime() ==  minDate.getTime(), "MinDate: установленное значение (" + startDate + ") не равно ожидаемому (" + minDate + ")");
            assert.ok( endDate.getTime() == maxDate.getTime(), "MaxDate: установленное значение (" + endDate + ") не равно ожидаемому (" + maxDate + ")");
        });

        it('do not change value if it is not between minDate and maxDate', function () {
            //Given
            var datePicker = new DatePickerControl();
            var minDate = new Date(2010, 0, 1);
            var maxDate = new Date(2014, 11, 31);

            var correctDate = new Date(2012, 10, 2);

            var lessThanMinDate = new Date(minDate);
            lessThanMinDate.setDate(minDate.getDate() - 1);

            var moreThanMaxDate = new Date(maxDate);
            moreThanMaxDate.setDate(maxDate.getDate() + 1);

            datePicker.set('minDate', minDate);
            datePicker.set('maxDate', maxDate);
            var $el = datePicker.render().find('.date');

            //When
            datePicker.set('value', correctDate);
            //поскольку lessThanMinDate и moreThanMaxDate не входят в допустимый диапазон, ожидается, что дата не измениться
            datePicker.set('value', lessThanMinDate);
            datePicker.set('value', moreThanMaxDate);

            //Then
            var dateInPicker = InfinniUI.DateUtils.toISO8601( $el.datepicker('getDate')).substr(0, 10),
                settedDate = '2012-11-02';
            assert.ok(dateInPicker == settedDate, "Установленное значение (" + settedDate + ") не равно ожидаемому (" + dateInPicker + ")");
        });

        it('should set readOnly', function () {
            //Given
            var datePicker = new DatePickerControl();
            datePicker.set('readonly', false);

            var $el = datePicker.render().find('.date');

            $.each($el.children('.form-control, button'), function(index, child){
                assert.isFalse(child.hasAttribute('disabled'));
            });

            //When
            datePicker.set('readonly', true);

            //Then
            $.each($el.children('.form-control, button'), function(index, child){
                assert.isTrue(child.hasAttribute('disabled'));
            });
        });

        it('should set Time mode', function () {
            //Given
            var datePicker = new DatePickerControl();
            datePicker.set('mode', 'Time');

            var $control = datePicker.render().find('.timepicker-control');

            //When
            datePicker.set('value', new Date("21 May 1958 10:12"));

            //Then
            assert.equal($control.val(), '10:12');
        });

        it('should set Time mode 2', function () {
            //Given
            var datePicker = new DatePickerControl(),
                value;

            datePicker.set('mode', 'Time');


            var $control = datePicker.render().find('.timepicker-control');

            //When
            $control.timepicker('setTime', '12:45');

            //Then
            value = new Date(datePicker.get('value'));
            assert.equal(value.getHours() + ':' + value.getMinutes(), '12:45');
        });

        it('should set DateTime mode', function () {
            //Given
            var datePicker = new DatePickerControl(),
                date = new Date(0);
            datePicker.set('mode', 'DateTime');

            var $control = datePicker.render().find('.form-control');

            //When
            datePicker.set('value', date);

            //Then
            assert.equal($control.val().substr(0, 10), '01.01.1970');
        });

        it('should set DateTime mode 2', function () {
            //Given
            var datePicker = new DatePickerControl(),
                value,
                date = new Date(0);

            datePicker.set('mode', 'DateTime');

            var $r = datePicker.render(),
                $control = $r.find('.form_datetime');

            //When
            $control.data('datetimepicker')._setDate(date);

            //Then
            assert.equal(datePicker.get('value').substr(0, 10), InfinniUI.DateUtils.toISO8601(date).substr(0, 10));
        });
    });
});