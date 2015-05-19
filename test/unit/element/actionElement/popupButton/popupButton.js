describe('PopupButton', function () {
    describe('api', function () {
        it('should create', function () {
            // Given
            var button = new PopupButton();

            // When
            var $el = button.render();

            // Then
            assert.equal($el.find('.pl-popup-btn-main').length, 1);
        });

        it('should set text', function () {
            // Given
            var button = new PopupButton();
            button.setText('button');
            var $el = button.render();

            // When
            button.setText('other button');

            // Then
            assert.equal($el.find('.pl-popup-btn-main').text(), 'other button');
            //window.
        });


        it('should set and get action', function () {
            // Given
            var button = new PopupButton();

            assert.isNull(button.getAction());

            // When
            button.render();
            button.setAction(new OpenViewActionBuilder().build());

            // Then
            assert.isNotNull(button.getAction());
        });

        it('should execute action on click', function () {
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
            var button = new PopupButton();

            // When
            button.addItem(new Button());
            button.addItem(new Button());

            // Then
            assert.equal(2,button.getItems().length);
        });

        it('should remove item', function () {
            // Given
            var button = new PopupButton();
            var b1 = new Button();
            var b2 = new Button();
            button.addItem(b1);
            button.addItem(b2);

            // When
            button.removeItem(b1);

            // Then
            assert.equal(1,button.getItems().length);
        });

        it('should return item by name', function () {
            // Given
            var button = new PopupButton();
            var b1 = new Button();
            b1.setName("button1");
            var b2 = new Button();
            b2.setName("button2");
            button.addItem(b1);
            button.addItem(b2);

            // Then
            assert.equal(b1, button.getItem("button1"));
        });

        it('should return null item by not existent name', function () {
            // Given
            var button = new PopupButton();

            // Then
            assert.isNull(button.getItem("button1"));
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
