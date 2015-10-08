window.InfinniUI = window.InfinniUI || {};
window.InfinniUI.format = window.InfinniUI.format || {};

window.InfinniUI.format.humanFileSize = function (size) {
    /**
     * @see {@link http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable}
     */
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};