function PrintViewActionBuilder() {
    this.build = function (builder, parent, metadata) {
        var action = new BaseAction(parent);

        this.template = function(data){
            var url = InfinniUI.config.serverUrl+"/SystemConfig/UrlEncodedData/Reporting/GetPrintView";

            return '<form id="form" enctype="application/x-www-form-urlencoded" target="frame" action="'+url+'" method="post">' +
                '<input type="text" maxlength="'+InfinniUI.config.maxLengthUrl+'" style="display:none" name="Form" value="'+data+'">'+
                '</form>';
        };
        this.modalTemplate = function(frameId){
            return '<div class="custom-modal modal container fade" id="full-width" tabindex="-1">'+
                '<div class="modal-header">'+
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
                //'<h3>Отчет</h3>'+
                '</div>'+
                '<div class="modal-body">'+
                '<iframe name="frame' + frameId + '" src="/app/utils/pdf/viewer.html#' + frameId + '" id="print-report" style="width: 100%; height: 600px"></iframe>'+
                '</div>'+
                '<button type="button" class="btn btn-default btn-close' + frameId + '" style="float: right; margin: 0 10px 10px 0; border: none">Закрыть</button>'+
                '<button type="button" class="btn btn-default btn-print' + frameId + '" style="float: right; margin: 0 10px 10px 0; border: none">Печать</button>'+
                '</div>'
        };

        var self = this;
        action.setAction(function (callback) {
            var dataSource = parent.getDataSource(metadata.DataSource);
            var data = {
                PrintViewId : metadata.PrintViewId,
                PrintViewType : metadata.PrintViewType,
                ConfigId : dataSource.getConfigId(),
                DocumentId : dataSource.getDocumentId(),
                PageNumber : dataSource.getPageNumber(),
                PageSize : dataSource.getPageSize(),
                ActionId: dataSource.getUpdateAction(),
                Item: dataSource.getSelectedItem(),
                Query : dataSource.getQueryFilter().items
            };
            var url = InfinniUI.config.serverUrl+"/SystemConfig/UrlEncodedData/Reporting/GetPrintView";

            window.pdfDocs = window.pdfDocs || [];
            var frameId = window.pdfDocs.length;
            window.pdfDocs.push(null);

            self.sendRequest(data, function(message){
                window.pdfDocs[frameId] = message;
                var _$modal = $(self.modalTemplate(frameId));
                _$modal.appendTo('body');

                if (callback) {
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
        });

        return action;
    };

    this.getFrame = function(fName)
    {
        for(var i=0; i<frames.length; i++){
            try{
                if(window.frames[i].name == fName)
                return frames[i];
            }catch(e) {}

        }

    };

    this.sendRequest = function(params, handler){
        var url = InfinniUI.config.serverUrl+"/SystemConfig/UrlEncodedData/Reporting/GetPrintView";
        var xmlhttp = this.getXmlHttp();

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
    };

    this.getXmlHttp = function(){
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e1) {
                xmlhttp = false;
            }
        }

        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }

        return xmlhttp;
    }
}
