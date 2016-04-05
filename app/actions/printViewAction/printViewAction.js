function PrintViewAction(parentView){
    _.superClass(PrintViewAction, this, parentView);
}

_.inherit(PrintViewAction, BaseAction);


_.extend(PrintViewAction.prototype, {
    execute: function(callback){
        var self = this;

        var printViewBaseFormData = this.getProperty('printViewBaseFormData');
        var dataSource = this.getProperty('dataSource');
        var formData = _.extend(printViewBaseFormData,
            {
                ConfigId : dataSource.getConfigId(),
                DocumentId : dataSource.getDocumentId(),
                PageNumber : dataSource.getPageNumber(),
                PageSize : dataSource.getPageSize(),
                ActionId: dataSource.getUpdateAction(),
                Item: dataSource.getSelectedItem(),
                Query : dataSource.getFilter()
            });

        this.sendRequest(formData, function(message){
            var frameId = window.pdfDocs.length;
            window.pdfDocs[frameId] = message;

            var _$modal = $(self.getModalTemplate(frameId));
            _$modal.appendTo('body');

            if (_.isFunction(callback)) {
                _$modal.one('shown.bs.modal', function () {
                    callback();
                });
            }

            _$modal.modal('show');

            $('.btn-close'+ frameId).on('click', function(e){
                _$modal.modal('hide');
            });

            $('.btn-print' + frameId).on('click', function(e){
                var frame = self.getFrame('frame'+frameId);
                var printButtonElement = frame.window.document.getElementById('print');
                printButtonElement.click();
            });
        });
    },

    getModalTemplate: function(frameId){
        return '<div class="custom-modal modal container fade" id="full-width" tabindex="-1">'+
            '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
            //'<h3>Отчет</h3>'+
            '</div>'+
            '<div class="modal-body">'+
            '<iframe name="frame' + frameId + '" src="/app/utils/pdf/web/viewer.html#' + frameId + '" id="print-report" style="width: 100%; height: 600px"></iframe>'+
            '</div>'+
            '<button type="button" class="btn btn-default btn-close' + frameId + '" style="float: right; margin: 0 10px 10px 0; border: none">Закрыть</button>'+
            '<button type="button" class="btn btn-default btn-print' + frameId + '" style="float: right; margin: 0 10px 10px 0; border: none">Печать</button>'+
            '</div>'
    },

    getFrame: function(fName)
    {
        var frames = window.frames;
        for(var i=0; i<frames.length; i++){
            try{
                if(frames[i].name == fName)
                    return frames[i];
            }catch(e) {}
        }

    },

    sendRequest: function(params, handler){
        var url = InfinniUI.config.serverUrl+"/SystemConfig/UrlEncodedData/Reporting/GetPrintView";
        var xmlhttp = this.getProperty('xmlhttp');

        xmlhttp.open('POST', url, true);
        xmlhttp.withCredentials = true;
        xmlhttp.responseType = 'arraybuffer';
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    handler(xmlhttp.response);
                }
            }
        };
        xmlhttp.send($.param({
            Form: (JSON.stringify(params)).replace(/"/g, '\'')
        }));
    }
});