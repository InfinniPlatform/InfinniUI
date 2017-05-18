Changelog
=========

## 3.0
* historyApi, routes, routerService
* добавлен InfinniUI.extensionPanels
* переименованы файлы platform.js в infinni-ui.js (templates.js ), main.css в infinni-ui.css, зависимости вынесены в peerDependence
* починили Background у PopupButton (UI-2580)
* добавлена стилизация для error text(UI-2683)
* добавлены правила eslint
* fix UI-2531 DatePicker на Android (и других платформах) работает как TextBox.
* UI-2737 Реализовать возможность запрещать кэширование метаданных #fix
* UI-2791 Перенести messageTypes и все миксины в InfinniUI
* нужно ли писать об изменении схемы переопределения стилей?
* UI-2648 При клике по кнопке условно показывать форму или выполнять любой другой экшн (сохранение, удаление и т.п.) #resolved
* UI-2511 ComboBox с autocomplete привязанным к RestDataSource должен дожидаться ответа сервера перед показом результатов #resolved
* UI-2587 Реализовать возможность отписываться от байдинга #resolved
* UI-2670 Реализовать глобальный DS который работает с localStorage #resolved
* UI-2675: Убрать возможность указывать скрипты объектом #resolved
* UI-2753 Рефакторинг функционала вертикального выравнивания #resolved
* UI-2749 Реализовать ValidationResult и написать тесты для него #resolved
* UI-2746 Реализовать и написать тесты для CreateItemAction #resolved
* UI-2644 Реализовать фильтры в ObjectDataSource #fix
* UI-2645: Дублирование логики открытия элемента списка (на редактирование) при двойном нажатии на кнопку#resolve
* UI-2669 Перенести функционал культуры в localized #resolved
* UI-2664 Реализовать возможность задавать не сложные js-выражения в текстовые поля #resolved
* UI-2650: Дополнить функционал “Выбрать всё” в DataGrid#resolve
* UI-2652 Изменение или удаление запроса на подтверждение удаления (DeleteAction) #resolved
* UI-2634: Некорректная работа TreeView c DocumentDataSource#resolve
* UI-2518: Невозможно установить Label в HeaderTemplate элемента Panel #resolved

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

