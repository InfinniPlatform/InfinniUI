describe('PopupButtonElement', function () {
    var builder = new InfinniUI.ApplicationBuilder();

    describe('API', function () {
        var element = builder.buildType('PopupButton', {
            Items: []
        });

        describe('Implementing Element Methods', function () {
            testHelper.checkElementMethods(element);
        });

        describe('Implementing Container Methods', function () {
            testHelper.checkContainerMethods(element);
        });


    });

    describe('Checking methods', function () {
        it('should create', function () {
            // Given
            var button = new InfinniUI.PopupButton();

            // When
            var $el = button.render();

            // Then
            assert.equal($el.find('.pl-popup-button__button').length, 1);
        });

        it('should set text', function () {
            // Given
            var button = new InfinniUI.PopupButton();
            button.setText('button');
            var $el = button.render();

            // When
            button.setText('other button');

            // Then
            assert.equal($el.find('.pl-popup-button__button').text(), 'other button');
            //window.
        });


        it('should execute action on click', function (done) {
            // Given
            var button = new InfinniUI.PopupButton(),
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
                    assert.equal(onLastActionExecute, 0);
                    assert.equal(onNewActionExecute, 1);
                    done();
                };
            });

            assert.equal(onLastActionExecute, 0);
            assert.equal(onNewActionExecute, 0);

            // When
            button.render();
            button.click();

            // Then
            $('body').find('.pl-popup-button__dropdown').detach();
        });

        it('event onClick', function () {
            // Given
            var button = new InfinniUI.PopupButton(),
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
            $('body').find('.pl-popup-button__dropdown').detach();
        });

        it('should save click handler after set new action', function () {
            // Given
            var button = new InfinniUI.PopupButton(),
                onClickFlag = 0;

            button.onClick(function(){
                onClickFlag++;
            });

            assert.equal(onClickFlag, 0);

            // When
            button.render();
            button.click();

            var action = new InfinniUI.BaseAction();
            var execActionFlag=0;
            action.execute = function(){
                execActionFlag++;
            };

            button.setAction(action);

            button.click();
            // Then
            assert.equal(execActionFlag, 1);
            assert.equal(onClickFlag, 2);
            $('body').find('.pl-popup-button__dropdown').detach();

        });

        it('should add items', function () {
            // Given
            var button = new InfinniUI.PopupButton();

            // When
            var items = button.getItems();
            items.add(builder.buildType('Button', {}));
            items.add(builder.buildType('Button', {}));

            // Then
            assert.equal(2,button.getItems().length);
        });

        it('should remove item', function () {
            // Given
            var button = new InfinniUI.PopupButton();
            var b1 = builder.buildType('Button', {});
            var b2 = builder.buildType('Button', {});
            var items = button.getItems();
            items.add(b1);
            items.add(b2);

            // When
            items.remove(b1);

            // Then
            assert.equal(1,button.getItems().length);
        });
    });
});
