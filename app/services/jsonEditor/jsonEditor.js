InfinniUI.JsonEditor = (function () {
    var childWindow;
    var metadataForOpen;
    var pathForOpen;

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

                var tempChildWindow = window.open('jsonEditor/index.html', 'JSON_Editor', 'menubar=yes');

                tempChildWindow.onload = function () {
                    childWindow = tempChildWindow;

                    childWindow.onSaveMetadata(function (metadata) {
                        /* Данное поле появлятся в платформе, в метаданных оно не нужно */
                        delete metadata.DocumentId;

                        $.ajax({
                            url: 'http://localhost:5500/api/metadata/saveMetadata',
                            type: 'POST',
                            data: {
                                Id: metadata.Id,
                                Json: JSON.stringify(metadata)
                            },
                            success: function () {
                                toastr.success('Metadata saved');
                            },
                            error: function (error) {
                                alert(JSON.stringify(error));
                            }
                        });
                    });

                    updateContentOfChildWindow();
                };

                tempChildWindow.addEventListener('unload', function() {
                    childWindow = undefined;
                });
            } else {
                updateContentOfChildWindow();
                childWindow.focus();
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
