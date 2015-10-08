describe('QueryConstructorStandard', function () {

    it('Default values', function () {

        // given
        // when
        var instance = new QueryConstructorStandard('http://localhost', {});

        // then
        assert.equal(instance.getCreateAction(), 'CreateDocument');
        assert.equal(instance.getReadAction(), 'GetDocument');
        assert.equal(instance.getUpdateAction(), 'SetDocument');
        assert.equal(instance.getDeleteAction(), 'DeleteDocument');
    });

    describe('Construct request url and params', function () {

        it('constructCreateDocumentRequest', function () {

            // given
            // when
            var instance = new QueryConstructorStandard('http://localhost', {
                ConfigId: 'myConfig',
                DocumentId: 'myDocument'
            });

            // then
            var data = instance.constructCreateDocumentRequest();
            assert.equal(data.requestUrl, 'http://localhost/myConfig/StandardApi/myDocument/CreateDocument');
            assert.deepEqual(data.args, {
                id: null,
                changesObject: {
                    Configuration: 'myConfig',
                    Metadata: 'myDocument'
                },
                replace: false
            });
        });

        it('constructReadDocumentRequest', function () {

            // given
            // when
            var instance = new QueryConstructorStandard('http://localhost', {
                ConfigId: 'myConfig',
                DocumentId: 'myDocument'
            });

            // then
            var data = instance.constructReadDocumentRequest([], 1, 10, 'ASC');
            assert.equal(data.requestUrl, 'http://localhost/myConfig/StandardApi/myDocument/GetDocument');
            assert.deepEqual(data.args, {
                id: null,
                changesObject: {
                    Configuration: 'myConfig',
                    Metadata: 'myDocument',
                    Filter: [],
                    PageNumber: 1,
                    PageSize: 10,
                    Sorting: 'ASC'
                },
                replace: false
            });
        });

        it('constructUpdateDocumentRequest', function () {

            // given
            // when
            var instance = new QueryConstructorStandard('http://localhost', {
                ConfigId: 'myConfig',
                DocumentId: 'myDocument'
            });

            // then
            var data = instance.constructUpdateDocumentRequest({title: "My title"}, false);
            assert.equal(data.requestUrl, 'http://localhost/myConfig/StandardApi/myDocument/SetDocument');
            assert.deepEqual(data.args, {
                id: null,
                changesObject: {
                    Configuration: 'myConfig',
                    Metadata: 'myDocument',
                    Document: {title: "My title"},
                    IgnoreWarnings: false
                },
                replace: false
            });
        });

        it('constructDeleteDocumentRequest', function () {

            // given
            // when
            var instance = new QueryConstructorStandard('http://localhost', {
                ConfigId: 'myConfig',
                DocumentId: 'myDocument'
            });

            // then
            var data = instance.constructDeleteDocumentRequest('myDocumentId');
            assert.equal(data.requestUrl, 'http://localhost/myConfig/StandardApi/myDocument/DeleteDocument');
            assert.deepEqual(data.args, {
                id: null,
                changesObject: {
                    Configuration: 'myConfig',
                    Metadata: 'myDocument',
                    Id: 'myDocumentId'
                },
                replace: false
            });
        });
    });


});