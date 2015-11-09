describe('SaveAction', function () {
    function createViewWithDataSource(dataSourceName){
        var view = new View();
        var dataSource = new ObjectDataSource({ name: dataSourceName, view: view });

        view.getDataSources().push(dataSource);

        return view;
    }

    it('successful build', function () {
        // Given
        var view = createViewWithDataSource('MainDS');
        var builder = new ApplicationBuilder();
        var metadata = {
            SaveAction: {
                DataSource: 'MainDS'
            }
        };

        // When
        var saveAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( saveAction );
        assert.isNotNull( saveAction.execute, 'action should have execute' );
    });

    it('should not close view when CanClose is false', function () {
        // Given
        var view = createViewWithDataSource('MainDS');
        var builder = new SaveActionBuilder();

        view.onClosed(function(){
            assert.notOk('view was close');
        });

        var metadata = {
            DataSource: 'MainDS',
            CanClose: false
        };

        var saveAction = builder.build(null, {parentView: view, metadata: metadata});

        // When
        saveAction.execute();

        // Then
        assert.equal(view.getDialogResult(), DialogResult.none, 'should not set DialogResult');
    });
});