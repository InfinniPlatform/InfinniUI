InfinniUI.JsonEditor = (function () {
    var childWindow;
    var metadataForOpen;
    var pathForOpen;

    //$form.find('#btn-save-metadata').click(function () {
    //    $.ajax({
    //        url: 'http://localhost:5500/api/metadata/saveMetadata',
    //        type: 'POST',
    //        data: editor.get(),
    //        success: function () {
    //            toastr.success('Metadata saved');
    //        },
    //        error: function (error) {
    //            alert(JSON.stringify(error));
    //        }
    //    });
    //});

    function updateContentOfChildWindow(){
        if(metadataForOpen){
            childWindow.setMetadata(JSON.stringify(metadataForOpen));
            metadataForOpen = undefined;
        }

        if (pathForOpen) {
            childWindow.setPath(pathForOpen);
            pathForOpen = undefined;
        }
    }

    return {
        setMetadata: function (metadata) {
            metadataForOpen = metadata;

            if (!childWindow) {

                var tempChildWindow = window.open('jsonEditor/index.html', 'JSON_Editor', {menubar: 'yes'});

                tempChildWindow.onload = function () {
                    childWindow = tempChildWindow;
                    updateContentOfChildWindow();
                };

                tempChildWindow.addEventListener('unload', function() {
                    childWindow = undefined;
                });
            } else {
                updateContentOfChildWindow();
            }
        },
        setPath: function (path) {
            pathForOpen = path;

            if(childWindow){
                updateContentOfChildWindow();
            }
        }
    };
})();
