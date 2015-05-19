describe('DateTimeEditMask', function () {
    describe('format', function () {

        it('successful build template', function () {
            //Given
            var editMask = new DateTimeEditMask();
            editMask.mask = "%dd MM yyyy г.";
            //When
            var template = editMask.buildTemplate();
            //Then
            assert.isArray(template);
            assert.lengthOf(template, 6);
        });

        it('successful format value', function () {
            //Given
            var editMask = new DateTimeEditMask();
            editMask.mask = "%dd MM yyyy г.";
            editMask.format = new DateTimeFormat();
            editMask.format.setFormat(editMask.mask);
            //When
            editMask.reset('2014-09-26T15:15');
            var text = editMask.getText();
            //Then
            assert.equal(text, '26 09 2014 г.');
        });

        it('successful input value', function () {
            //Given
            var editMask = new DateTimeEditMask();
            editMask.mask = "dd MM yyyy г.";
            editMask.format = new DateTimeFormat();
            editMask.format.setFormat(editMask.mask);
            //var template = editMask.buildTemplate();
            editMask.reset(null);
            //When
            var position = 0;
            position = editMask.setCharAt('1', position);
            position = editMask.setCharAt('9', position);
            position = editMask.setCharAt('0', position);
            position = editMask.setCharAt('7', position);
            position = editMask.setCharAt('2', position);
            position = editMask.setCharAt('0', position);
            position = editMask.setCharAt('1', position);
            position = editMask.setCharAt('4', position);
            var text = editMask.getText();
            //Then
            assert.equal(text, '19 07 2014 г.');
            assert.equal(position, 10)
        });

        it('successful navigation', function () {
            //Given
            var editMask = new DateTimeEditMask();
            editMask.mask = "dd MM yyyy г.";
            editMask.format = new DateTimeFormat();
            editMask.format.setFormat(editMask.mask);
            var date = new Date();
            editMask.reset(date);
            //When
            var position = 0;
            var start = editMask.moveToPrevChar(position);
            position = editMask.moveToNextChar(99);
            position = editMask.setNextValue(position);
            //Then
            var value = editMask.getValue();
            var text = editMask.getText();
            assert.equal(position, text.length - 3);
            assert.equal(date.getFullYear(), (new Date(value)).getFullYear() - 1);
        });

        it('successful delete char (right)', function () {
            //Given
            var editMask = new DateTimeEditMask();
            editMask.mask = "dd MM yyyy г.";
            editMask.format = new DateTimeFormat();
            editMask.format.setFormat(editMask.mask);

            var date = new Date(2014, 9, 6, 9, 30, 50, 0);  //06-10-2014 09:30:50
            editMask.reset(date);
            //When
            var position = 0;
            var start = editMask.moveToPrevChar(position);

            position = editMask.deleteCharRight(position);//"6_ 10 2014 г."
            position = editMask.deleteCharRight(position);//"__ 10 2014 г."

            //Then
            var text = editMask.getText();
            assert.equal(position, 3);
            assert.equal(text, "__ 10 2014 г.");
        });

        it('successful delete char (left)', function () {
            //Given
            var editMask = new DateTimeEditMask();
            editMask.mask = "dd MM yyyy г.";
            editMask.format = new DateTimeFormat();
            editMask.format.setFormat(editMask.mask);

            var date = new Date(2014, 9, 6, 9, 30, 50, 0);  //06-10-2014 09:30:50
            editMask.reset(date);
            //When
            var position = 8;
            var start = editMask.moveToPrevChar(position);

            position = editMask.deleteCharLeft(position);//"06 10 214_ г."
            position = editMask.deleteCharLeft(position);//"06 10 14__ г."

            //Then
            var text = editMask.getText();
            assert.equal(position, 6);
            assert.equal(text, "06 10 14__ г.");
        });

        it('successful set char', function () {
            //Given
            var editMask = new DateTimeEditMask();
            editMask.mask = "dd MM yyyy г.";
            editMask.format = new DateTimeFormat();
            editMask.format.setFormat(editMask.mask);

            editMask.reset(null);
            //When
            var position = 9;
            var start = editMask.moveToPrevChar(position); //"__ __ ____ г."

            position = editMask.setCharAt('2', position);
            position = editMask.setCharAt('0', position);
            position = editMask.setCharAt('1', position);
            position = editMask.setCharAt('4', position);

            //Then
            var text = editMask.getText();
            assert.equal(start, 8);
            assert.equal(position, 10);
            assert.equal(text, "__ __ 2014 г.");
        });


        it('successful delete value', function () {
            //Given
            var editMask = new DateTimeEditMask();
            editMask.mask = "dd MM yyyy г.";
            editMask.format = new DateTimeFormat();
            editMask.format.setFormat(editMask.mask);
            //var template = editMask.buildTemplate();
            editMask.reset(null);
            //When
            var position = 0;
            position = editMask.setCharAt('1', position);
            position = editMask.setCharAt('9', position);
            position = editMask.setCharAt('0', position);
            position = editMask.setCharAt('7', position);
            position = editMask.setCharAt('2', position);
            position = editMask.setCharAt('0', position);
            position = editMask.setCharAt('1', position);
            position = editMask.setCharAt('4', position);

            position = editMask.deleteCharLeft(position);// 4
            position = editMask.deleteCharLeft(position);// 1
            position = editMask.deleteCharLeft(position);// 0
            position = editMask.deleteCharLeft(position);// 2
            position = editMask.deleteCharLeft(position);// .
            position = editMask.deleteCharLeft(position);// 7
            position = editMask.deleteCharLeft(position);// 0
            position = editMask.deleteCharLeft(position);// .
            position = editMask.deleteCharLeft(position);// 9
            position = editMask.deleteCharLeft(position);// 1
            var text = editMask.getText();
            //Then
            assert.equal(text, '__ __ ____ г.');
            assert.equal(position, 0);
        });

    });


});