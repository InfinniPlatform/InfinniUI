function InlineViewBuilder() {
    this.build = function (context, parent, metadata) {
        var that = this;

        var linkView = new LinkView(parent, function (resultCallback) {
            var params = that.buildParameters(parent, metadata.Parameters, context);
            var view = context.buildType(parent, 'View', metadata.View, undefined, params);

            if (['Application', 'Page', 'Dialog'].indexOf(metadata.OpenMode) > -1) {
                InfinniUI.views.appendView(null, metadata.View, view);
            }
            resultCallback(view);
        });
        linkView.setOpenMode(metadata.OpenMode);
        linkView.setContainer(metadata.Container);
        return linkView;
    };

   this.buildParameters = function(parentView, parametersMetadata, builder){
       var result = {},
           param;

       if (typeof parametersMetadata !== 'undefined' && parametersMetadata !== null) {
           for (var i = 0; i < parametersMetadata.length; i++) {
               if (parametersMetadata[i].Value !== undefined) {
                   param = builder.buildType(parentView, 'Parameter', parametersMetadata[i])
                   result[param.getName()] = param;
               }
           }
       }
       return result;
   };
}