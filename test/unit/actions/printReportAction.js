/*describe('PrintReportAction', function () {
    it('should be render', function () {
        var view = new View();
        var metadata = {
            Button: {
                Action: {
                    PrintReportAction: {
                        Configuration: "EmergencyRoom",
                        Template: "MedicalHistoryReport",
                        Parameters: [
                            {
                                Name: "HospitalizationId",
                                Value: "4427715e-1f73-4077-a58b-9be70c502287"
                            }
                        ],
                        FileFormat: 0
                    }
                }
            }
        };
        var printBuilder = new ApplicationBuilder();
        var el = printBuilder.build(view, metadata);
        var action = el.getAction();

        assert.isNotNull(el);
        assert.isNotNull(el.execute);
        assert.equal('BaseAction', action.constructor.name);
    });
});*/