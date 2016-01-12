var viewBuilderHeaderTemplateMixin = {

    /**
     * @protected
     * @param params
     */
    buildHeaderTemplate: function (view, params) {
        var
            builder = params.builder,
            metadata = params.metadata,
            headerTemplate;

        if (metadata.HeaderTemplate) {
            //@TODO Build header template by metadata
            headerTemplate = function (context, args) {
                var
                    paramsForBuilder = {
                        parent: view,
                        parentView: view,
                        basePathOfProperty: params.basePathOfProperty
                    };

                return builder.build(metadata.HeaderTemplate, paramsForBuilder);
            }
        } else {
            //@TODO Build header template by default
            headerTemplate = function (context, args) {
                var
                    label = new Label();

                label.setValue(view.getText());
                view.onPropertyChanged("text", function (context, args) {
                    label.setValue(args.newValue);
                });

                return label;
            }
        }
        return headerTemplate;
    }

};
