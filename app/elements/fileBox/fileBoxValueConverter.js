function FileBoxValueConverter( element ) {
    this._element = element;
}

InfinniUI.FileBoxValueConverter = FileBoxValueConverter;

FileBoxValueConverter.prototype.toElement = function( context, args ) {
    var value = args.value;
    var binding = args.binding;
    var ds = binding.getSource();
    var fileProvider = ds.getFileProvider();
    var url = null;
    //Формируем ссылку для получения файла

    if( value ) {
        if( fileProvider && InfinniUI.BlobUtils.isFileInfo( value ) ) {
            url = fileProvider.getFileUrl( null, null, InfinniUI.BlobUtils.getContentId( value ) );
            this._element
                .setFileName( InfinniUI.BlobUtils.getName( value ) )
                .setFileSize( InfinniUI.BlobUtils.getSize( value ) )
                .setFileTime( InfinniUI.BlobUtils.getTime( value ) )
                .setFileType( InfinniUI.BlobUtils.getType( value ) );

        } else if( typeof value === 'string' ) {
            //@TODO Добавить проверку на валидность URI
            url = value;
        } else {
            //Native File instance from FileAPI
            url = value;
        }
    }

    return url;
};
