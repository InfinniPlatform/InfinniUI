/**
 * @mixin
 */
var displayFormatBuilderMixin = {

    /**
     * Возвращает функцию форматирования значения
     * @see {@link http://docs.infinnity.ru/docs/Specifications/UserInterface/Components/TextEditorBase/TextEditorBase.setDisplayFormat/}
     * @param {String} displayFormat
     * @param {Object} params
     * @param {ApplicationBuilder} params.builder
     * @returns {Function}
     */
    buildDisplayFormat: function (displayFormat, params) {
        var builder = params.builder;
        var formatter, format = defaultFormat;
        if (typeof displayFormat === 'string') {
            formatter = builder.buildType('ObjectFormat', {Format: displayFormat});
            format = function (context, args){
                args = args || {};
                return formatter.format(args.value);
            }
        } else if (displayFormat && typeof displayFormat === 'object') {
            formatter = builder.build(displayFormat);

            format = function (context, args){
                args = args || {};
                return formatter.format(args.value);
            }
        }

        return format;

        function defaultFormat(context, args) {
            args = args || {};
            return args.value;
        }
    }
};
