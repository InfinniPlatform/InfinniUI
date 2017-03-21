'use strict';
var sourceForFiles = {
	platformOutputFolder: "./out/",
	stylesFiles: ['app/styles/main.less'],
	stylesFilesForWatch: ["./app/styles/**/*.less"],
	jsFiles: [
		'app/utils/strict.js',
		'app/utils/namespace.js',
		'app/elements/_common/enums/*.js',
		'app/elements/**/enums/*.js',
		'app/config.js',
		'app/localizations/**/*.js',
		'app/messaging/**/*.js',
        'app/controls/_base/_mixins/ajaxRequestMixin.js',
        'app/utils/**/*.js',
		'app/executor/**/*.js',

		'app/controls/_base/_mixins/*.js',
		'app/controls/_base/control/*.js',
		'app/controls/_base/button/*.js',
		'app/controls/_base/container/*.js',
		'app/controls/_base/editor/*.js',
		'app/controls/_base/editorBase/*.js',
		'app/controls/_base/listEditorBase/*.js',
		'app/controls/_base/textEditorBase/*.js',
		'app/controls/_base/**/*.js',

		'app/controls/textBox/**/*.js',


		'app/controls/dateTimePicker/_modes/*.js',
		'app/controls/dateTimePicker/components/*/*.js',
		'app/controls/dateTimePicker/components/*.js',
		'app/controls/dateTimePicker/**/*.js',
		'app/controls/datePicker/**/*.js',
		'app/controls/timePicker/**/*.js',
		'app/controls/application/**/*.js',
		'app/controls/button/commonView/*.js',
		'app/controls/button/linkView/*.js',
		'app/controls/button/**/*.js',
		'app/controls/buttonEdit/**/*.js',
		'app/controls/comboBox/dropdown/**/*.js',
		'app/controls/comboBox/values/**/*.js',
		'app/controls/dataGrid/**/*.js',
		'app/controls/dataNavigation/buttons/*.js',
		'app/controls/dataNavigation/**/*.js',
		'app/controls/label/commonView/*.js',
		'app/controls/label/**/*.js',
		'app/controls/listBox/baseView/*.js',
		'app/controls/listBox/**/*.js',
		'app/controls/popupButton/commonView/*.js',
		'app/controls/popupButton/**/*.js',
		'app/controls/stackPanel/**/*.js',
		'app/controls/tablePanel/**/*.js',
		'app/controls/tabPanel/**/*.js',
		'app/controls/treeView/**/*.js',
		'app/controls/stackPanel/**/*.js',
		'app/controls/**/*.js',

		'app/data/dataSource/_mixins/*.js',
		'app/data/dataSource/baseDataSource.js',
		'app/data/dataSource/restDataSource.js',
		'app/data/dataSource/documentDataSource.js',
		'app/data/dataSource/baseDataSourceBuilder.js',
		'app/data/dataSource/restDataSourceBuilder.js',
		'app/data/dataSource/documentDataSourceBuilder.js',

		'app/elements/_base/element/*.js',
		'app/elements/_base/_mixins/*.js',
		'app/elements/_base/container/*.js',
		'app/elements/_base/editorBase/*.js',
		'app/elements/_base/listEditorBase/*.js',
		'app/elements/_base/textEditorBase/*.js',
		'app/elements/_base/**/*.js',
		'app/elements/listBox/**/*.js',
		'app/elements/textBox/**/*.js',
		'app/elements/dateTimePicker/**/*.js',
		'app/elements/datePicker/**/*.js',
		'app/elements/timePicker/**/*.js',
		'app/elements/dataElement/**/*.js',
		'app/elements/stackPanel/**/*.js',
		'app/elements/**/*.js',

		'app/actions/_base/**/*.js',
		'app/actions/**/*.js',

		'app/builders/**/*.js',

		'app/data/dataBinding/*.js',
		'app/data/dataProviders/REST/*.js',
		'app/data/dataProviders/dataProviderRegister.js',
		'app/data/dataProviders/file/**/*.js',
		'app/data/dataProviders/**/*.js',
		'app/data/**/*.js',

		'app/formats/displayFormat/_common/*.js',
		'app/formats/displayFormat/**/*.js',
		'app/formats/editMask/_common/*.js',
		'app/formats/editMask/dateTime/_base/*.js',
		'app/formats/editMask/dateTime/**/*.js',
		'app/formats/editMask/template/_base/*.js',
		'app/formats/editMask/template/**/*.js',
		'app/formats/editMask/**/*.js',

		'app/linkView/openMode/strategy/_mixins/*.js',
		'app/linkView/linkViewBuilderBase.js',
		'app/linkView/**/*.js',

		'app/launching/autoHeightService.js',
		'app/launching/specialApplicationView.js',
		'app/launching/*.js',

		'app/**/*.js'
	],
	vendorStylesFiles: [
		'node_modules/font-awesome/css/font-awesome.min.css',
		'node_modules/toastr/build/toastr.min.css'
	],
	vendorJsFiles: [
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/underscore/underscore-min.js',
		'node_modules/backbone/backbone.js',
		'node_modules/moment/min/moment.min.js',
		'node_modules/block-ui/jquery.blockUI.js',
		'node_modules/toastr/build/toastr.min.js',
		'bootstrap-framework/js/tooltip.js',
		'node_modules/jquery.cookie/jquery.cookie.js',
		'bootstrap-framework/js/*.js',
		'node_modules/signalr/jquery.signalR.min.js'
	],
	templateFiles: [
		"app/**/*.tpl.html",
		"extensions/**/*.tpl.html"
	],
	unitTestFiles: [
		'app/utils/strict.js',
		'test/unit/fakeRestDataProvider.js',
		'test/unit/**/*.js'
	],
	fontsFiles: [
		'node_modules/font-awesome/fonts/**/*.*'
	]
};

module.exports = sourceForFiles;
