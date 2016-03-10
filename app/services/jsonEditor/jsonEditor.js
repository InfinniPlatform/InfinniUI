InfinniUI.JsonEditor = (function () {
    var template = InfinniUI.Template["services/jsonEditor/template/jsonEditor.tpl.html"];
    var $form = $(template());
    var editor = new JSONEditor($form.find('#jsonEditor')[0]);

    $form.find('#btn-set-json').click(function () {
        var id = $form.find('input').val();

        $.ajax({
            url: 'http://localhost:5500/api/metadata/getMetadata?id=' + id,
            type: 'GET',
            success: function (data) {
                editor.set(data);
            },
            error: function () {
                alert(JSON.stringify(error));
            }
        });
    });

    $form.find('#btn-save-metadata').click(function () {
        $.ajax({
            url: 'http://localhost:5500/api/metadata/saveMetadata',
            type: 'POST',
            data: editor.get(),
            success: function () {
                toastr.success('Metadata saved');
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    });

    editor.searchByPath = function(path){
        var selectedNode = editor.node && editor.node.findNode(path);

        if(selectedNode != null){
            selectedNode.scrollTo();
            setTimeout(function(){
                selectedNode.focus();
            }, 300);
        }
    };

    return function(viewMetadata){

        $('body').append($form);
        editor.set(viewMetadata);

        return editor;
    }
})();
