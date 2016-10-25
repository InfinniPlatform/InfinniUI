describe('DateTimeFormat', function () {

    describe('format', function () {
        it('successful build', function () {
            //Given
            var builder = new InfinniUI.DateTimeFormatBuilder();
            //When
            var format = builder.build(null, {metadata: {}});
            //Then
            assert.isFunction(format.format);
            assert.equal(format.getFormat(), 'G');
        });

        it('should format year', function () {
            //Given
            var formattingFull = new InfinniUI.DateTimeFormat('yyyy');
            var formattingShort = new InfinniUI.DateTimeFormat('yy');
            var formattingTooShort = new InfinniUI.DateTimeFormat('%y');

            //When
            var date = new Date("21 May 1908 10:12");

            //Then
            assert.equal(formattingFull.format(date), '1908');
            assert.equal(formattingShort.format(date), '08');
            assert.equal(formattingTooShort.format(date), '8');
        });

        it('should format month', function () {
            //Given
            var formattingFull = new InfinniUI.DateTimeFormat('MMMM'),
                formattingAbbr = new InfinniUI.DateTimeFormat('MMM'),
                formattingIndex = new InfinniUI.DateTimeFormat('MM'),
                formattingShortIndex = new InfinniUI.DateTimeFormat('%M'),
                enCulture = new InfinniUI.Culture('en-US');

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
            var formattingFull = new InfinniUI.DateTimeFormat('dddd'),
                formattingAbbr = new InfinniUI.DateTimeFormat('ddd'),
                formattingIndex = new InfinniUI.DateTimeFormat('dd'),
                formattingShortIndex = new InfinniUI.DateTimeFormat('%d'),
                enCulture = new InfinniUI.Culture('en-US');

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
            var formattingFull = new InfinniUI.DateTimeFormat('HH'),
                formattingAbbr = new InfinniUI.DateTimeFormat('%H'),
                formattingIndex = new InfinniUI.DateTimeFormat('hh'),
                formattingShortIndex = new InfinniUI.DateTimeFormat('h');

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
            var formatting = new InfinniUI.DateTimeFormat('mm'),
                formattingShort = new InfinniUI.DateTimeFormat('%m');

            //When
            var date = new Date("2 January 1908 13:02");

            //Then
            assert.equal(formatting.format(date), '02');
            assert.equal(formattingShort.format(date), '2');
        });

        it('should format seconds', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('ss'),
                formattingShort = new InfinniUI.DateTimeFormat('%s');

            //When
            var date = new Date("2 January 1908 13:02:02");

            //Then
            assert.equal(formatting.format(date), '02');
            assert.equal(formattingShort.format(date), '2');
        });

        it('should format pm/am designator', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('tt'),
                formattingShort = new InfinniUI.DateTimeFormat('%t'),
                enCulture = new InfinniUI.Culture('en-US');

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
            var formatting = new InfinniUI.DateTimeFormat('zzz');

            //When
            var date = new Date("2 January 1908 13:02:00");

            //Then
            assert.equal(formatting.format(date), extractTimezoneOffset(date));
        });

        it('should format date and time separators', function () {
            //Given
            var formattingTime = new InfinniUI.DateTimeFormat('12:23'),
                formattingDate = new InfinniUI.DateTimeFormat('12/23'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("2 January 1908 13:02:00");

            //Then
            assert.equal(formattingTime.format(date), '12:23');
            assert.equal(formattingDate.format(date), '12.23');
            assert.equal(formattingDate.format(date, enCulture), '12/23');
        });

        it('escaping strings', function () {
            //Given
            var formatting1 = new InfinniUI.DateTimeFormat('"HH"'),
                formatting2 = new InfinniUI.DateTimeFormat("'HH'"),
                formatting3 = new InfinniUI.DateTimeFormat('HH "HH"');

            //When
            var date = new Date("2 January 1908 13:12");

            //Then
            assert.equal(formatting1.format(date), 'HH');
            assert.equal(formatting2.format(date), 'HH');
            assert.equal(formatting3.format(date), '13 HH');
        });


        it('format by pattern f', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('f'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12");

            //Then
            assert.equal(formatting.format(date), '04 Январь 1908 г. 13:12');
            assert.equal(formatting.format(date, enCulture), 'Friday, January 04, 1908 1:12 PM');
        });

        it('format by pattern F', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('F'),
                enCulture = new InfinniUI.Culture('en-US'),
                ruCulture = new InfinniUI.Culture('ru-RU');

            //When
            var date = new Date("4 January 1908 13:12:08");

            //Then
            assert.equal(formatting.format(date, ruCulture), '04 Январь 1908 г. 13:12:08');
            assert.equal(formatting.format(date, enCulture), 'Friday, January 04, 1908 1:12:8 PM');
        });


        it('format by pattern g', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('g'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12");

            //Then
            assert.equal(formatting.format(date), '04.01.1908 13:12');
            assert.equal(formatting.format(date, enCulture), '1/4/1908 1:12 PM');
        });

        it('format by pattern G', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('G'),
                ruCulture = new InfinniUI.Culture('ru-RU'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12:06");

            //Then
            assert.equal(formatting.format(date, ruCulture), '04.01.1908 13:12:06');
            assert.equal(formatting.format(date, enCulture), '1/4/1908 1:12:6 PM');
        });

        it('format by pattern d', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('d'),
                ruCulture = new InfinniUI.Culture('ru-RU'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12:06");

            //Then
            assert.equal(formatting.format(date, ruCulture), '04.01.1908');
            assert.equal(formatting.format(date, enCulture), '1/4/1908');
        });

        it('format by pattern D', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('D'),
                ruCulture = new InfinniUI.Culture('ru-RU'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12:06");

            //Then
            assert.equal(formatting.format(date, ruCulture), '04 Январь 1908 г.');
            assert.equal(formatting.format(date, enCulture), 'Friday, January 04, 1908');
        });

        it('format by pattern t', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('t'),
                ruCulture = new InfinniUI.Culture('ru-RU'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12:06");

            //Then
            assert.equal(formatting.format(date, ruCulture), '13:12');
            assert.equal(formatting.format(date, enCulture), '1:12 PM');
        });

        it('format by pattern T', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('T');

            //When
            var date = new Date("4 January 1908 13:12:01");

            //Then
            assert.equal(formatting.format(date), '13:12:01');
        });

        it('format by pattern Y', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('Y'),
                ruCulture = new InfinniUI.Culture('ru-RU'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12:06");

            //Then
            assert.equal(formatting.format(date, ruCulture), 'Январь 1908');
            assert.equal(formatting.format(date, enCulture), 'January, 1908');
        });

        it('format by pattern M', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('M'),
                ruCulture = new InfinniUI.Culture('ru-RU'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12:06");

            //Then
            assert.equal(formatting.format(date, ruCulture), 'Январь 04');
            assert.equal(formatting.format(date, enCulture), 'January 04');
        });

        it('format by pattern s', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('s'),
                ruCulture = new InfinniUI.Culture('ru-RU'),
                enCulture = new InfinniUI.Culture('en-US');

            //When
            var date = new Date("4 January 1908 13:12:06");

            //Then
            assert.equal(formatting.format(date, ruCulture), '1908-01-04T13:12:06');
            assert.equal(formatting.format(date, enCulture), '1908-01-04T13:12:06');
        });

        it('format by pattern H', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('H');

            //When
            var date = new Date("4 January 1908 13:12:01");

            //Then
            assert.equal(formatting.format(date), '13');
        });

        it('format collection', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('s');

            //When
            var date = [new Date("4 January 1908 13:12:1"), new Date("5 January 1908 13:12:1"), new Date("6 January 1908 13:12:1")];

            //Then
            assert.equal(formatting.format(date), '1908-01-04T13:12:01, 1908-01-05T13:12:01, 1908-01-06T13:12:01');
        });

        it('format collection t', function () {
            //Given
            var formatting = new InfinniUI.DateTimeFormat('t');

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
