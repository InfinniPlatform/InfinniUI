function PrintViewActionBuilder() {
    this.build = function (context, args) {
        window.pdfDocs = window.pdfDocs || [];

        var action = new PrintViewAction(args.parentView);

        var dataSource = args.parentView.getContext().dataSources[args.metadata.DataSource];
        var printViewBaseFormData = {
            PrintViewId : args.metadata.PrintViewId,
            PrintViewType : args.metadata.PrintViewType
        };

        action.setProperty('xmlhttp', this.getXmlHttp());
        action.setProperty('dataSource', dataSource);
        action.setProperty('printViewBaseFormData', printViewBaseFormData);

        return action;
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
    };
}