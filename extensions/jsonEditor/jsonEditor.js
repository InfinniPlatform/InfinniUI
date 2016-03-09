function JsonEditor(context, args) {
    this.template = InfinniUI.Template["extensions/jsonEditor/template/jsonEditor.tpl.html"];
    this.target = args.$el;

    this.editor;

    this.render = function () {
        var $form = $(this.template());
        var that = this;

        this.editor = new JSONEditor($form.get(4));
        this.target.append($form);

        this.target.find('#btn-set-json').click(function () {
            var id = that.target.find('input').val();

            $.ajax({
                url: 'http://localhost:5500/api/metadata/getMetadata?id=' + id,
                type: 'GET',
                success: function (data) {
                    that.editor.set(data);
                },
                error: function () {
                    alert(JSON.stringify(error));
                }
            });
        });

        this.target.find('#btn-save-metadata').click(function () {
            $.ajax({
                url: 'http://localhost:5500/api/metadata/saveMetadata',
                type: 'POST',
                data: that.editor.get(),
                success: function () {
                    toastr.success('Metadata saved');
                },
                error: function (error) {
                    alert(JSON.stringify(error));
                }
            });
        });
    };
}
