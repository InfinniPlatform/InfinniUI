function PrintReportActionBuilder() {
    this.build = function (builder, parent, metadata) {
        var action = new BaseAction(parent);

        this.template = function(data){
            return '<form id="form" enctype="application/x-www-form-urlencoded" target="frame" action="http://ic:9900/SystemConfig/UrlEncodedData/Reporting/GetReport" method="post">' +
                '<input type="text" style="display:none" name="Form" value='+data+'>'+
                '</form>'
        };
        this.modalTemplate = function(){
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

        var data = {};
        var params = [];

        action.setParameters = function (parameters) {
            params.push(parameters);
        };

        action.getParameters = function(){
            return params;
        };

        $.each(metadata.Parameters, function(index, el){
            action.setParameters(el);
        });

        data.Configuration = metadata.Configuration;
        data.Template = metadata.Template;
        data.Parameters = action.getParameters();
        data.FileFormat = 0; //metadata.FileFormat;

        var formData = (JSON.stringify(data)).replace(/"/g, '\'');
        $('body').append(this.template(formData));

        var self = this;
        action.setAction(function (callback) {
            if (!self.$modal) {
                self.$modal = $(self.modalTemplate());
                self.$modal.appendTo('body');
            }

            if (callback) {
                self.$modal.one('shown.bs.modal', function () {
                    callback();
                });
            }

            $('#form').on('submit', function(e) {
                self.$modal.modal('show');
            }).submit();
        });

        return action;
    }
}