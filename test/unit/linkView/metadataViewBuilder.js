describe('MetadataViewBuilder', function () {

    var builder = new ApplicationBuilder();

    window.providerRegister.register('MetadataDataSource', function (metadataValue) {
        return {
            "getViewMetadata": function () {
                return metadata;
            }
        };
    });

    var metadata = {
            "DataSources": [

                {
                    "DocumentDataSource": {
                        "Name": 'PatientDataSource',
                        "ConfigId": 'ReceivingRoom',
                        "DocumentId": 'HospitalizationRefusal'
                    }
                }
            ],
            "OpenMode": "Application",
            "ConfigId": 'ReceivingRoom',
            "DocumentId": 'HospitalizationRefusal',
            "ViewType": 'ListView',
            "MetadataName": 'HospitalizationRefusalListView',
            //"Parameters": [
            //    {
            //        "Name" : 'Param1',
            //        "Value" : {
            //            "PropertyBinding": {
            //                "DataSource": 'PatientDataSource',
            //                "Property": 'LastName'
            //            }
            //        }
            //    }
            //],
            "LayoutPanel" : {

            }
    };

    it('should build exists view', function () {

        var applicationBuilder = new ApplicationBuilder();
        var builder = new MetadataViewBuilder();
        var view = builder.build(null, {builder: applicationBuilder, view: {}, metadata: metadata});

        applicationBuilder.appView = view;
        applicationBuilder.appView.createView(function(view){
            //assert.isNotNull(view.getParameter('Param1'));
            assert.isNotNull(view.getDataSource('PatientDataSource'));
        });
    });
});

