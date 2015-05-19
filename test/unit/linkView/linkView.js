describe('LinkView', function () {

    describe('setOpenMode', function () {
        it('should set openMode', function () {
            //Given
            var view = new LinkView();

            //When
            view.setOpenMode('Dialog');

            //Then
            assert.equal(view.getOpenMode(), 'Dialog');
        });

        it('should set openMode Page by default', function () {
            //Given
            var view = new LinkView();

            //Then
            assert.equal(view.getOpenMode(), 'Page');
        });

        it('should set openMode Page if no mode passed', function () {
            //Given
            var view = new LinkView();

            //When
            view.setOpenMode(null);

            //Then
            assert.equal(view.getOpenMode(), 'Page');
        });
    });
});