describe('TemplateEditMask', function () {
    describe('format', function () {

        it('successful build mask', function () {
            //Given
            var editMask = new TemplateEditMask();

            //When

            //Then
            assert.isDefined(editMask);
        });

        it('successful build template', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '+\\9(999)000-00-00';

            //When
            var template = editMask.buildTemplate();
            //Then
            assert.lengthOf(template, 16);
            assert.equal(template[0], '+');
            assert.equal(template[1], '9');
            assert.equal(template[2], '(');
            assert.isObject(template[3]);
            assert.isObject(template[4]);
            assert.isObject(template[5]);
            assert.equal(template[6], ')');
            assert.isObject(template[7]);
            assert.isObject(template[8]);
            assert.isObject(template[9]);
            assert.equal(template[10], '-');
            assert.isObject(template[11]);
            assert.isObject(template[12]);
            assert.equal(template[13], '-');
            assert.isObject(template[14]);
            assert.isObject(template[15]);
            assert.equal(editMask.getText(), '+9(___)___-__-__');
            assert.equal(editMask.getValue(), '+9()--')
        });

        it('successful move at start', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '+7(999)000-00-00';

            //When
            editMask.reset();
            //Then
            var position = editMask.moveToPrevChar(0);
            assert.equal(position, 3);
        });

        it('successful to last', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '+7(999)000-00-00';

            //When
            editMask.reset();
            //Then
            var position = editMask.moveToNextChar(editMask.mask.length);
            assert.equal(position, 16);
        });

        it('successful to set char', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '+7 (999)000-00-00';

            //When
            editMask.reset();
            var position = editMask.moveToPrevChar(0);
            position = editMask.setCharAt('1', position);
            position = editMask.setCharAt('2', position);
            position = editMask.setCharAt('3', position);

            position = editMask.setCharAt('4', position);
            position = editMask.setCharAt('5', position);
            position = editMask.setCharAt('6', position);

            position = editMask.setCharAt('7', position);
            position = editMask.setCharAt('8', position);

            position = editMask.setCharAt('9', position);
            position = editMask.setCharAt('0', position);

            //Then
            assert.equal(position, 17);
            assert.equal(editMask.getValue(), '+7 (123)456-78-90');
        });

        it('successful to set char without MaskSaveLiteral', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '+7 (999)000-00-00';
            editMask.maskSaveLiteral = false;

            //When
            editMask.reset();
            var position = editMask.moveToPrevChar(0);
            position = editMask.setCharAt('1', position);
            position = editMask.setCharAt('2', position);
            position = editMask.setCharAt('3', position);

            position = editMask.setCharAt('4', position);
            position = editMask.setCharAt('5', position);
            position = editMask.setCharAt('6', position);

            position = editMask.setCharAt('7', position);
            position = editMask.setCharAt('8', position);

            position = editMask.setCharAt('9', position);
            position = editMask.setCharAt('0', position);

            //Then
            assert.equal(position, 17);
            assert.equal(editMask.getValue(), '1234567890');
        });

        it('successful getRegExpForMask with maskSaveLiteral', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '+7 (999)000-00-00';
            editMask.maskSaveLiteral = true;

            //When
            var regexp = editMask.getRegExpForMask();

            //Then
            assert.isTrue(regexp.test('+7 (123)456-78-91'));
            assert.isTrue(regexp.test('+7 ()456-78-91'));
            assert.isTrue(regexp.test('+7 (1)456-78-91'));
            assert.isFalse(regexp.test('+7 (123)456-78-9'));
        });


        it('successful getRegExpForMask without maskSaveLiteral', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '+7 (999)000-00-00';
            editMask.maskSaveLiteral = false;

            //When
            var regexp = editMask.getRegExpForMask();

            //Then
            assert.isTrue(regexp.test('1234567891'));
            assert.isTrue(regexp.test('1234567'));
            assert.isFalse(regexp.test('123456'));
        });

        it('successful set value without maskSaveLiteral', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '+7 (999)000-00-00';
            editMask.maskSaveLiteral = false;

            //When
            editMask.reset('1234567890');

            //Then
            assert.equal(editMask.getValue(), '1234567890');
            assert.equal(editMask.getText(), '+7 (123)456-78-90');
        });

        it('successful set value with maskSaveLiteral', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '+7 (999)000-00-00';
            editMask.maskSaveLiteral = true;

            //When
            editMask.reset('+7 (123)456-78-90');

            //Then
            assert.equal(editMask.getValue(), '+7 (123)456-78-90');
            assert.equal(editMask.getText(), '+7 (123)456-78-90');
        });

        it('successful format special chars', function () {
            //Given
            var editMask = new TemplateEditMask();
            editMask.mask = '00/00/0000 \\at 99:99 99% (99$)';

            //When
            editMask.reset();

            //Then
            assert.equal(editMask.getText(), '__.__.____ at __:__ __% (__р.)');
        });

    });

    describe('template mask', function () {
        var editMask;
        var chars;
        var char;
        var position;


        beforeEach(function () {
            chars = '@@55ЦЦ+-'.split('');
            editMask = new TemplateEditMask();
            editMask.maskSaveLiteral = false;
            position = 0;
        });

        it('successful input mask "c"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('c');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), '@@55ЦЦ+-');
        });

        it('successful input mask "C"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('C');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), '@@55ЦЦ+-');
        });

        it('successful input mask "l"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('l');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), 'ЦЦ');
        });

        it('successful input mask "L"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('l');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), 'ЦЦ');
        });

        it('successful input mask "a"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('a');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), '55ЦЦ');//@@55ЦЦ+-
        });

        it('successful input mask "A"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('A');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), '55ЦЦ');//@@55ЦЦ+-
        });

        it('successful input mask "#"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('#');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), '+-');//@@55ЦЦ+-
        });

        it('successful input mask "#"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('#');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), '+-');//@@55ЦЦ+-
        });

        it('successful input mask "9"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('9');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), '55');//@@55ЦЦ+-
        });

        it('successful input mask "0"', function () {
            //Given
            editMask.mask = Array(chars.length + 1).join('0');
            editMask.reset();

            //When
            position = editMask.moveToPrevChar(0);
            do {
                char = chars.shift();
                position = editMask.setCharAt(char, position);
            } while (chars.length > 0);

            var position = editMask.moveToPrevChar(0);

            //Then
            assert.equal(editMask.getValue(), '55');//@@55ЦЦ+-
        });
    });



});