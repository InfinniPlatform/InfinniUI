function PrintReportActionBuilder() {
    this.build = function (context, args) {
        var action = new PrintReportAction(args.parentView);

        var data = {
            Configuration: args.metadata.Configuration,
            Template: args.metadata.Template,
            Parameters: args.metadata.Parameters,
            FileFormat: 0 //metadata.FileFormat
        };
        var formData = (JSON.stringify(data)).replace(/"/g, '\'');

        var $submitForm = this.createSubmitForm(formData);

        action.setProperty('$submitForm', $submitForm);

        return action;
    };

    this.createSubmitForm = function(formData) {
        var $submitForm = $(this.getSubmitForm(formData));
        var $modal = $(this.getModalTemplate());

        $submitForm.on('submit', function() {
            $modal.modal('show');
        });

        $submitForm.appendTo('body');
        $modal.appendTo('body');

        return $submitForm;
    };

    this.getSubmitForm = function(data){
        return '<form id="form" enctype="application/x-www-form-urlencoded" target="frame" action="http://ic:9900/SystemConfig/UrlEncodedData/Reporting/GetReport" method="post">' +
            '<input type="text" style="display:none" name="Form" value='+data+'>'+
            '</form>'
    };

    this.getModalTemplate = function(){
        return '<div class="custom-modal modal container fade" id="full-width" tabindex="-1">'+
            '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
            '<h3>Отчет</h3>'+
            '</div>'+
            '<div class="modal-body">'+
            '<iframe name="frame" style="width: 100%; height: 600px"></iframe>'+
            '</div>'+
            '</div>'
    };
}