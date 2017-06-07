/**
 *
 * @param element
 * @constructor
 */
function ImageBoxValueConverter( element ) {
    this._element = element;
}

/**
 *
 * @param context
 * @param args
 * @returns {*}
 */
ImageBoxValueConverter.prototype.toElement = function( context, args ) {
    var value = args.value;
    var binding = args.binding;
    var ds = binding.getSource();
    var fileProvider = ds.getFileProvider();
    var url = null;
    //Формируем URL изображения

    if ( value ) {
        if ( fileProvider && InfinniUI.BlobUtils.isFileInfo( value ) ) {
            url = fileProvider.getFileUrl( null, null, InfinniUI.BlobUtils.getContentId( value ) );
        } else if ( typeof value === 'string' ) {
            //@TODO Добавить проверку на валидность URI
            url = value;
        } else {
            //Native File instance from FileAPI
            url = value;
        }
    }
    return url;
};

InfinniUI.ImageBoxValueConverter = ImageBoxValueConverter;
