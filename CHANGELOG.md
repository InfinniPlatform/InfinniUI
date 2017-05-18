Changelog
=========

## 2.2
* 'ImageBox' rotate portrait images from mobile phones in right position
* 'ImageBox' fit images in frame by smaller side automatically
* added events 'OnExpand' and 'OnCollapse' to 'TreeView'
* now converter of 'DataBinding' get correct context in case of 'ObjectDataSource Parameter' binding
* added 'VerticalAlignment' property to 'DataGrid' metadata
* added 'SuspendUpdate' property to 'DataSources' metadata
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
* Parameter can be DataBinding's source for 'ListEditorBase'
* added 'AdditionalResult' property to 'DocumentDataSource'
* added 'OnProviderError' property to 'DataSources' metadata
* added 'onProviderError' method to 'DataSources'
* fixed 'setFocused' method of 'TextBox'
* 'ServerAction' can work without 'Origin' property('Origin' is not required now)
* added 'setContext', 'setParams', 'addParams' methods to InfinniUI.routerService
* renamed 'LinkElement' to 'Link' (only for API, it was always called 'Link' in metadata)

