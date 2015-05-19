describe('Button', function () {
    describe('render', function () {
        it('should create', function () {
            // Given
            var button = new Button();

            // When
            var $el = button.render();

            // Then
            assert.equal($el.find('button').length, 1);
        });

        it('should set enabled', function () {
            // Given
            var button = new Button();
            button.setText('button');
            var $el = button.render();

            assert.equal(button.getEnabled(), true);
            // When
            button.setEnabled(false);

            // Then
            assert.equal(button.getEnabled(), false);
        });

        it('should set text', function () {
            // Given
            var button = new Button();
            button.setText('button');
            var $el = button.render();

            // When
            button.setText('other button');

            // Then
            assert.equal($el.find('.btntext').text(), 'other button');
        });


        it('should set and get action', function () {
            // Given
            var button = new Button();

            assert.isNull(button.getAction());

            // When
            button.render();
            button.setAction(new OpenViewActionBuilder().build());

            // Then
            assert.isNotNull(button.getAction());
        });

        it('should execute action on click', function () {
            // Given
            var button = new Button(),
                onLastActionExecute = 0,
                onNewActionExecute = 0;

            button.setAction(new function(){
                this.execute = function () {
                    onLastActionExecute++;
                };
            });

            button.setAction(new function(){
                this.execute = function () {
                    onNewActionExecute++;
                };
            });

            assert.equal(onLastActionExecute, 0);
            assert.equal(onNewActionExecute, 0);

            // When
            button.render();
            button.click();

            // Then
            assert.equal(onLastActionExecute, 0);
            assert.equal(onNewActionExecute, 1);
        });

        it('event onClick', function () {
            // Given
            var button = new Button(),
                onClickFlag = 0;

            button.onClick(function(){
                    onClickFlag++;
            });

            assert.equal(onClickFlag, 0);

            // When
            button.render();
            button.click();

            // Then
            assert.equal(onClickFlag, 1);
        });

        it('should be true if scriptsHandlers call', function () {
            //Given
            var view = new View();
            view.setScripts([{Name:"OnClick", Body:"window.Test.button = 5"}, {Name: 'OnLoaded', Body:"window.Test.buttonLoaded = true"}]);

            var button = new ButtonBuilder();
            var metadata = {
                OnClick:{
                    Name: 'OnClick'
                },
                OnLoaded:{
                    Name: 'OnLoaded'
                }
            };
            window.Test = {button:1, buttonLoaded: false};

            //When
            var build = button.build(button, view, metadata);
            var $button = $(build.render());
            $button.find('button').click();

            // Then
            assert.equal(window.Test.button, 5);
            assert.isTrue(window.Test.buttonLoaded);
        });
    });
});
