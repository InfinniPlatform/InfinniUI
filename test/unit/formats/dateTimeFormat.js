describe('DateTimeFormat', function () {

    describe('format', function () {
        it('successful build', function () {
            //Given
            var builder = new DateTimeFormatBuilder();
            //When
            var format = builder.build(null, {metadata: {}});
            //Then
            assert.isFunction(format.format);
            assert.equal(format.getFormat(), 'G');
        });

        it('should format year', function () {
            //Given
            var formattingFull = new DateTimeFormat('yyyy');
            var formattingShort = new DateTimeFormat('yy');
            var formattingTooShort = new DateTimeFormat('%y');

            //When
            var date = new Date("21 May 1908 10:12");

            //Then
            assert.equal(formattingFull.format(date), '1908');
            assert.equal(formattingShort.format(date), '08');
            assert.equal(formattingTooShort.format(date), '8');
        });

        it('should format month', function () {
            //Given
            var formattingFull = new DateTimeFormat('MMMM'),
                formattingAbbr = new DateTimeFormat('MMM'),
                formattingIndex = new DateTimeFormat('MM'),
                formattingShortIndex = new DateTimeFormat('%M'),
                enCulture = new Culture('en-US');

            //When
            var date = new Date("21 January 1908 10:12");

            //Then
            assert.equal(formattingFull.format(date), 'Январь');
            assert.equal(formattingAbbr.format(date), 'янв');
            assert.equal(formattingIndex.format(date), '01');
            assert.equal(formattingShortIndex.format(date), '1');

            assert.equal(formattingFull.format(date, enCulture), 'January');
        });

        it('should format day', function () {
            //Given
            var formattingFull = new DateTimeFormat('dddd'),
                formattingAbbr = new DateTimeFormat('ddd'),
                formattingIndex = new DateTimeFormat('dd'),
                formattingShortIndex = new DateTimeFormat('%d'),
                enCulture = new Culture('en-US');

            //When
            var date = new Date("2 January 1908 10:12");

            //Then
            assert.equal(formattingFull.format(date), 'среда');
            assert.equal(formattingAbbr.format(date), 'Ср');
            assert.equal(formattingIndex.format(date), '02');
            assert.equal(formattingShortIndex.format(date), '2');

            assert.equal(formattingFull.format(date, enCulture), 'Wednesday');
        });

        it('should format day', function () {
            //Given
            var formattingFull = new DateTimeFormat('HH'),
                formattingAbbr = new DateTimeFormat('%H'),
                formattingIndex = new DateTimeFormat('hh'),
                formattingShortIndex = new DateTimeFormat('%h');

            //When
            var date = new Date("2 January 1908 13:12");

            //Then
            assert.equal(formattingFull.format(date), '13');
            assert.equal(formattingAbbr.format(date), '13');
            assert.equal(formattingIndex.format(date), '01');
            assert.equal(formattingShortIndex.format(date), '1');
        });

        it('should format minutes', function () {
            //Given
            var formatting = new DateTimeFormat('mm'),
                formattingShort = new DateTimeFormat('%m');

            //When
            var date = new Date("2 January 1908 13:02");

            //Then
            assert.equal(formatting.format(date), '02');
            assert.equal(formattingShort.format(date), '2');
        });

        it('should format seconds', function () {
            //Given
            var formatting = new DateTimeFormat('ss'),
                formattingShort = new DateTimeFormat('%s');

            //When
            var date = new Date("2 January 1908 13:02:02");

            //Then
            assert.equal(formatting.format(date), '02');
            assert.equal(formattingShort.format(date), '2');
        });

        it('should format pm/am designator', function () {
            //Given
            var formatting = new DateTimeFormat('tt'),
                formattingShort = new DateTimeFormat('%t'),
                enCulture = new Culture('en-US');

            //When
            var datePM = new Date("2 January 1908 13:02");
            var dateAM = new Date("2 January 1908 11:02");

            //Then
            assert.equal(formatting.format(datePM, enCulture), 'PM');
            assert.equal(formatting.format(dateAM, enCulture), 'AM');
            assert.equal(formattingShort.format(dateAM, enCulture), 'A');
            assert.equal(formattingShort.format(dateAM), '');
        });

        it('should format pm/am designator', function () {
            //Given
            var formatting = new DateTimeFormat('zzz');

            //When
            var date = new Date("2 January 1908 13:02:00");

            //Then
            assert.equal(formatting.format(date), extractTimezoneOffset(date));
        });

        it('should format date and time separators', function () {
            //Given
            var formattingTime = new DateTimeFormat('12:23'),
                formattingDate = new DateTimeFormat('12/23'),
                enCulture = new Culture('en-US');

            //When
            var date = new Date("2 January 1908 13:02:00");

            //Then
            assert.equal(formattingTime.format(date), '12:23');
            assert.equal(formattingDate.format(date), '12.23');
            assert.equal(formattingDate.format(date, enCulture), '12/23');
        });

        it('escaping strings', function () {
            //Given
            var formatting1 = new DateTimeFormat('"HH"'),
                formatting2 = new DateTimeFormat("'HH'"),
                formatting3 = new DateTimeFormat('HH "HH"');

            //When
            var date = new Date("2 January 1908 13:12");

            //Then
            assert.equal(formatting1.format(date), 'HH');
            assert.equal(formatting2.format(date), 'HH');
            assert.equal(formatting3.format(date), '13 HH');
        });


        it('format by pattern f', function () {
            //Given
            var formatting = new DateTimeFormat('f'),
                enCulture = new Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12");

            //Then
            assert.equal(formatting.format(date), '04 Январь 1908 г. 13:12');
            assert.equal(formatting.format(date, enCulture), 'Friday, January 04, 1908 1:12 PM');
        });

        it('format by pattern g', function () {
            //Given
            var formatting = new DateTimeFormat('g'),
                enCulture = new Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12");

            //Then
            assert.equal(formatting.format(date), '04.01.1908 13:12');
            assert.equal(formatting.format(date, enCulture), '1/4/1908 1:12 PM');
        });

        it('format by pattern s', function () {
            //Given
            var formatting = new DateTimeFormat('s');

            //When
            var date = new Date("4 January 1908 13:12:01");

            //Then
            assert.equal(formatting.format(date), '1908-01-04T13:12:01');
        });

        it('format by pattern T', function () {
            //Given
            var formatting = new DateTimeFormat('T');

            //When
            var date = new Date("4 January 1908 13:12:01");

            //Then
            assert.equal(formatting.format(date), '13:12:1');
        });

        it('format by pattern H', function () {
            //Given
            var formatting = new DateTimeFormat('H');

            //When
            var date = new Date("4 January 1908 13:12:01");

            //Then
            assert.equal(formatting.format(date), '13');
        });

        it('format collection', function () {
            //Given
            var formatting = new DateTimeFormat('s');

            //When
            var date = [new Date("4 January 1908 13:12:1"), new Date("5 January 1908 13:12:1"), new Date("6 January 1908 13:12:1")];

            //Then
            assert.equal(formatting.format(date), '1908-01-04T13:12:01, 1908-01-05T13:12:01, 1908-01-06T13:12:01');
        });

        it('format collection t', function () {
            //Given
            var formatting = new DateTimeFormat('t');

            //When
            var date = [new Date("4 January 1908 13:12:1"), new Date("5 January 1908 13:02:1"), new Date("6 January 1908 13:12:1")];

            //Then
            assert.equal(formatting.format(date), '13:12, 13:02, 13:12');
        });

        function extractTimezoneOffset(date){
            var offset;
            date.toString().replace(/GMT([\s\S]{5})/, function(s, inner){
                offset = inner;
                return '';
            });
            offset = offset.split('');
            offset.splice(3, 0, ':');
            offset = offset.join('');
            return offset;
        }
    });
});