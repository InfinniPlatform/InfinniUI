function InlineViewBuilder() {
    this.build = function (context, args){
        var that = this,
            metadata = args.metadata;

        var linkView = new LinkView(args.parent, function (resultCallback) {
            var params = that.buildParameters(args.parent, metadata.Parameters, args.builder);
            var view = args.builder.buildType(args.parent, 'View', metadata.View, undefined, params);

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