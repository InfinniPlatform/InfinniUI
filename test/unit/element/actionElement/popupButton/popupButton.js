describe('PopupButtonElement', function () {
    var builder = new ApplicationBuilder();

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
        var button;

        beforeEach(function () {
            button =  builder.buildType('PopupButton', {
                Items: []
            });
        });

        it('should create', function () {
            // Given


            // When
            var $el = button.render();

            // Then
            assert.equal($el.find('.pl-popup-button__button').length, 1);
        });

        it('should set text', function () {
            // Given
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
            var button = new PopupButton(),
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

        });

        it('event onClick', function () {
            // Given
            var button = new PopupButton(),
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

        it('should save click handler after set new action', function () {
            // Given
            var button = new PopupButton(),
                onClickFlag = 0;

            button.onClick(function(){
                onClickFlag++;
            });

            assert.equal(onClickFlag, 0);

            // When
            button.render();
            button.click();

            var action = new BaseAction();
            var execActionFlag=0;
            action.execute = function(){
                execActionFlag++;
            };

            button.setAction(action);

            button.click();
            // Then
            assert.equal(execActionFlag, 1);
            assert.equal(onClickFlag, 2);

        });

        it('should add items', function () {
            // Given
            //var button = new PopupButton();

            // When
            var items = button.getItems();
            items.add(builder.buildType('Button', {}));
            items.add(builder.buildType('Button', {}));

            // Then
            assert.equal(2,button.getItems().length);
        });

        it('should remove item', function () {
            // Given
            var button = new PopupButton();
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


//        it('should be true if scriptsHandlers call', function () {
//            //Given
//            var popupButton = new PopupButtonBuilder();
//            var view = new View();
//            var metadata = {
//                OnClick:{
//                    Name: 'OnClick'
//                }
//            };
//            window.Test = {popupButton:1};
//            view.setScripts([{Name:"OnClick", Body:"window.Test.popupButton = 5"}]);
//
//            //When
//            var build = popupButton.build(popupButton, view, metadata);
//            $(build.render()).find('.pl-popup-btn-main').trigger('click');
//
//            // Then
//            assert.equal(window.Test.popupButton, 5);
//        });
    });
});
