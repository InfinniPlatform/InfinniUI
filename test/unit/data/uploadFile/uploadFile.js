describe('FileProvider', function () {

    function delay(min, max) {
        if (typeof min === 'undefined') {
            min = 100;
        }
        if (typeof  max === 'undefined') {
            max = 200;
        }

        return Math.ceil(Math.random() * (max - min) + min);
    }

    describe('DocumentUploadQueryConstructor', function () {
        var urlConstructor = new DocumentUploadQueryConstructor('http://127.0.0.1', {configId: 'config', documentId: 'document'});

        it('construct upload url', function () {
            var url = urlConstructor.getUploadUrl('photo', '11');

            assert.equal(url,
                'http://127.0.0.1/'
                + 'RestfulApi/Upload/configuration/uploadbinarycontent/?linkedData='
                +  '{"Configuration":"config","Metadata":"document","DocumentId":"11","FieldName":"photo"}');
        });

        it('construct download url', function () {
            var url = urlConstructor.getFileUrl('photo', '11');

            assert.equal(url,
                'http://127.0.0.1/'
                + 'RestfulApi/UrlEncodedData/configuration/downloadbinarycontent/?Form='
                +  '{"Configuration":"config","Metadata":"document","DocumentId":"11","FieldName":"photo"}');
        });

    });

    describe('DocumentFileProvider', function () {

        beforeEach(function () {
            //register fake upload provider
            window.providerRegister.register('DocumentFileProvider', function (/*metadata*/) {
                return {
                    uploadFile: function () {
                        var deferred = $.Deferred();
                        setTimeout(function () {
                            deferred.resolve();
                        }, delay());

                        return deferred.promise();
                    },
                    getFileUrl: function () {
                        return 'fake.html';
                    }
                };
            });

            //register fake DocumentDataSource provider
            window.providerRegister.register('DocumentDataSource', function (metadataValue) {
                return {
                    getItems: function (criteriaList, pageNumber, pageSize, sorting, resultCallback) {
                        resultCallback();
                    },
                    createItem: function (resultCallback, idProperty) {
                        var response = {
                            'DisplayName': 'display name'
                        };
                        setTimeout(function () {
                            resultCallback(response);
                        }, delay());
                    },

                    saveItem: function (value, resultCallback, warnings, idProperty) {
                        var response = [{
                            InstanceId: "42"
                        }];

                        setTimeout(function () {
                            resultCallback(response);
                        }, delay());
                    },
                    setOrigin: function(){},
                    setPath: function(){},
                    setData : function(){},
                    setFilter: function(){},
                    setDocumentId: function(){},
                    getDocumentId: function () {},
                    createLocalItem: function (idProperty) {
                        var result = {};

                        result[idProperty] = guid();

                        return result;
                    }
                };

            });
        });


        it('DocumentDataSource.saveItem without files', function (done) {
            var builder = new ApplicationBuilder();
            var view = new View;
            var ds = builder.buildType('DocumentDataSource', {}, {parent: view, parentView: view, builder: builder});

            ds.createItem(function (context, args) {
                var item = args.value;
                ds.setProperty('title', 'some title');
                ds.saveItem(item, function (context, args) {
                    var value = args.value;
                    assert.equal(item, value);
                    done();
                }, function (args) {
                    done('Fail on saveItem');
                });

            });
        });
/*
        it('DocumentDataSource.saveItem with 1 file', function (done) {
            var builder = new ApplicationBuilder();
            var view = new View;
            var ds = builder.buildType('DocumentDataSource', {}, {parent: view, parentView: view, builder: builder});
            var uploadedFiles = [];

            ds.on('onFileUploaded', function (context, args) {
                uploadedFiles.push(args.value);
            });

            ds.createItem(function (context, args) {
                var item = args.value;
                ds.setProperty('title', 'some title');
                var content = '<html><head></head><body>html content</body></html>';
                ds.setFile(content, 'photo');
                ds.saveItem(item, function (context, args) {
                    var value = args.value;
                    assert.equal(item, value);
                    assert.lengthOf(uploadedFiles, 1, 'One file uploaded');
                    assert.equal(uploadedFiles[0], content);
                    done();
                }, function (args) {
                    done('Fail on saveItem');
                });
            });
        });

        it('DocumentDataSource.saveItem with files', function (done) {
            var builder = new ApplicationBuilder();
            var view = new View;
            var ds = builder.buildType('DocumentDataSource', {}, {parent: view, parentView: view, builder: builder});
            var uploadedFiles = [];
            var files = '1234567890'.split('')
                .map(function (num) {
                    return {
                        property: 'protperty_' + num,
                        content: '<html><head></head><body>html content #'+ num + '</body></html>'
                    };
                });


            ds.on('onFileUploaded', function (context, args) {
                uploadedFiles.push(args.value);
            });

            ds.createItem(function (context, args) {
                var item = args.value;
                ds.setProperty('title', 'some title');
                var content = '<html><head></head><body>html content</body></html>';
                files.forEach(function (file) {
                    ds.setFile(file.content, file.property);
                });

                ds.saveItem(item, function (context, args) {
                    var value = args.value;
                    var amount = files.filter(function(file) {
                        return uploadedFiles.indexOf(file.content !== -1);
                    }).length;
                    assert.equal(item, value);
                    assert.lengthOf(uploadedFiles, files.length, 'All files uploaded');
                    assert.equal(amount, files.length, 'specified files uploaded');
                    done();
                }, function (args) {
                    done('Fail on saveItem');
                });
            });
        });
*/
    });

});