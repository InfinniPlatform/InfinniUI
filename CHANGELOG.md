Changelog
=========

## 3.0
* InfinniUI.historyApi, InfinniUI.routes, InfinniUI.routerService renamed to InfinniUI.HistoryApi, InfinniUI.Routes, InfinniUI.RouterService
* added InfinniUI.extensionPanels service, which help to register ExtensionPanels
* renamed platform.js to infinni-ui.js (now templates.js is includeed to infinni-ui.js), main.css to infinni-ui.css
* removed vendor.js and vendor.css, for correct work you need to set peerDependences
* fixed: 'Background' for 'PopupButton' really change background
* added styles for error text(http://infinniui-en.readthedocs.io/en/latest/Elements/EditorBase/EditorBase.setErrorText.html)
* fixed 'DatePicker' for mobile version.
* added InfinniUI.config.cacheMetadata property, which can force requested pages not to be cached by the browser
* added 'CanExecute' property to Actions metadata (для задачи UI-2648 этого описания достаточно?)
* 'ComboBox' wait for source result before show values
* added 'offErrorValidator', 'offPropertyChanged' methods to DataSources (что ещё было выполнено в рамках UI-2587? эти методы документированы?)
* added 'LocalStorageDataSource'
* now 'Script' property can be only string, syntax with object not supported
* added InfinniUI.ValidationResult
* added 'CreateItemAction'
* added 'Filter' and 'FilterParams' properties to 'ObjectDataSource' metadata
* 'Action' can be set instead of 'Script'
* added (ability to work with?) 'Localizations'
* changed display format syntax, use '${format}' instead of '{format}'
* added ability to use expressions (http://infinniui-en.readthedocs.io/en/latest/Core/JSExpression/index.html)
* added 'OnCheckAllChanged' property to 'DataGrid' metadata
* added 'AcceptMessage', 'AcceptMessageType' properties to 'DeleteAction' metadata

## 2.2
* 'ImageBox' rotate portrait images from mobile phones in right position
* 'ImageBox' fit images in frame by smaller side automatically
* added 'OnExpand' and 'OnCollapse' events to 'TreeView'
* now converter of 'DataBinding' get correct context in case of 'ObjectDataSource Parameter' binding
* added 'VerticalAlignment' property to 'DataGrid' metadata
* added 'SuspendUpdate' property to DataSources metadata
* fixed tooltip: if you remove element, connected tooltip will be removed too
* fixed: 'ObjectDataSource' methods return correct 'ValidationResult' ('IsValid' instead of 'isValid', 'Items' instead of 'items')
* fixed: now you can use 'Routing' and 'DataNavigation' together
* added 'expand', 'collapse', 'toggle' methods to 'TreeView'
* fixed: 'TreeView' doesn't add checker to nodes without childs
* DataSources methods 'saveItem' and 'deleteItem' pass to callback standart params with such properties as 'item', 'validationResult' and 'originalResponse'
* added 'Size' property to 'Icon' metadata
* fixed: 'SaveAction' update 'DestinationValue' even when property 'CanClose': false
* fixed: When click on any 'TextBox' point, cursor doesn't jump to the begin of the input field
* added 'Replace' property to 'RouteToAction' metadata
* fixed: 'ListBox' correctly work when 'Enabled' property is set
* 'ObjectDataSource', 'MetadataDataSource', 'DocumentDataSource', 'RestDataSource', 'ServerActionProvider' have default providers, you can override them with InfinniUI.providerRegister
* 'AddAction' can work without 'DestinationValue' property ('DestinationValue' is not required now)
* 'PopupButton' default color is changed
* added 'Enabled' property to 'TabPage' metadata
* added 'CollapseChanger' property to 'Panel' metadata
* removed 'CollapsibleArea' property from 'Panel' metadata
* 'Parameter' can be DataBinding's source for 'ListEditorBase'
* added 'AdditionalResult' property to 'DocumentDataSource'
* added 'OnProviderError' property to DataSources metadata
* added 'onProviderError' method to DataSources
* fixed 'setFocused' method of 'TextBox'
* 'ServerAction' can work without 'Origin' property('Origin' is not required now)
* added 'setContext', 'setParams', 'addParams' methods to InfinniUI.routerService
* renamed 'LinkElement' to 'Link' (only for API, it was always called 'Link' in metadata)

