/**
 * Набор утилит для работы с BlobData объектами
 **/


window.InfinniUI.BlobUtils = (function () {

    return  {
        createFromFile: function(file) {
            var blobData = {
                Info:{
                    Name:   file.name,
                    Type:   file.type,
                    Size:   file.size,
                    Time:   file.lastModifiedDate
                }
            };

            return blobData;
        }
    }

})();




