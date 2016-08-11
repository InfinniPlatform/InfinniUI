describe('ScriptExecutor', function () {

    var builder = new ApplicationBuilder();

    window.InfinniUI.providerRegister.register('MetadataDataSource', function (metadataValue) {
        return {
            "getMetadata": function () {
                return metadata;
            }
        };
    });

    var metadata = {
        "Scripts" :[
            {
                "Name" : "OpenViewScript",
                "Body" : "context.Controls['TextBox1'].setText('Hello world from script!');"
            },
            {
                "Name" : "TestRunScript",
                "Body" : "context.TestValue = args['test'];"
            }
        ],
        "DataSources": [

            {
                "DocumentDataSource": {
                    "Name": 'PatientDataSource',
                    "ConfigId": 'ReceivingRoom',
                    "DocumentId": 'HospitalizationRefusal'
                }
            },
            {
                "DocumentDataSource" : {
                    "Name" : 'ClassifierDataSource',
                    "ConfigId" : 'ClassifierStorage',
                    "DocumentId" : 'SomeClassifier'
                }
            }
        ],
        "OpenMode": "Application",
        "ViewType": 'ListView',
        //"Parameters": [
        //    {
        //        "Name" : 'Param1'
        //    }
        //],
        "LayoutPanel" : {
            "StackPanel": {
                "Name": "MainViewPanel",
                "Items": [
                    {
                        "TextBox": {
                            "Name": "TextBox1",
                            "Multiline": true
                        }
                    },
                    {
                        "TextBox": {
                            "Name": "TextBox2"
                        }
                    },
                    {
                        "ComboBox": {
                            "Name": "ComboBox1",
                            "DisplayProperty": "",
                            "ValueProperty": "",
                            "MultiSelect": true,
                            "ShowClear": true,
                            "Value" : {
                                "DataSource" : "PatientDataSource",
                                "Property" : "LastName"
                            }
                        }
                    }
                ]
            }
        }
    };

//    it('should create script context for opened view', function (done) {
//
//        var linkView = new LinkView(null, function (resultCallback) {
//            var builder = new ApplicationBuilder();
//            var view = builder.buildType(fakeView(), 'View', metadata);
//            resultCallback(view);
//        });
//        linkView.setOpenMode('Application');
//
//        linkView.createView(function(view){
//
//            assert.isNotNull(view.getContext());
//            assert.isNotNull(view.getContext().DataSources['PatientDataSource']);
//            assert.isNotNull(view.getContext().DataSources['ClassifierDataSource']);
//            //assert.isNotNull(view.getContext().Parameters['Param1']);
//            //assert.equal(view.getContext().Parameters['Param1'].getValue(),'1');
//            assert.isNotNull(view.getContext().Controls['TextBox1']);
//            assert.isNotNull(view.getContext().Controls['TextBox2']);
//            assert.isNotNull(view.getContext().Controls['ComboBox1']);
//
//            var textBox1 = view.getContext().Controls['TextBox1'];
//
//            textBox1.setText('Hello world!');
//            assert.equal(textBox1.getText(),'Hello world!');
//
//            var dataSource = view.getContext().DataSources["PatientDataSource"];
//            assert.equal(dataSource.getName(),"PatientDataSource");
//
//            done();
//        });
//    });
//
//    it('should invoke script from ScriptExecutor', function(done){
//
//        var linkView = new LinkView(null, function (resultCallback) {
//            var builder = new ApplicationBuilder();
//            var view = builder.buildType(fakeView(), 'View', metadata);
//            resultCallback(view);
//        });
//        linkView.setOpenMode('Application');
//
//        linkView.createView(function(view){
//
//            var scriptExecutor = new ScriptExecutor(view);
//            scriptExecutor.executeScript('OpenViewScript');
//
//            var textBox1 = view.getContext().Controls["TextBox1"];
//            assert.equal(textBox1.getText(),'Hello world from script!');
//
//            var args = {
//                "test" : 1
//            };
//
//            var context = view.getContext();
//            context.Scripts["TestRunScript"].Run(context,args);
//
//            assert.equal(context.TestValue,1);
//
//            done();
//
//        });
//
//    });


});