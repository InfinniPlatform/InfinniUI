# Пример использования фреймворка InfinniUI
В папке example расположен вариант использования фреймворка InfinniUI в качестве части Вашего веб-приложения.

Если Вы только что скачали InfinniUI, необходимо настроить сборку конфигурации.
Для этого в *./gulpfile.js* проверьте/исправьте значения переменных *infinniUIpath*, *projectRootFolder*, *projectFolderForPlatform*, *projectFolderForExtensions*, *projectFolderForStyles*.

Файл runExample.bat делает полную сборку платформы и конфигурации, а также запуск сервера.
Результат сборки можно посмотреть по адресу http://localhost:4444.

## Переопределение и расширение конфигурационных переменных

Формат конфигурации платформы можно посмотреть в [документации](http://infinniui-en.readthedocs.io/en/latest/Core/Config/).
Чтобы перекрыть требуемые поля, нужно задать их до подключения основного js-файла с платформой.
В примере, это происходит в файле *./launcher/config.js* (обратите внимание, что *config.js* подключается до *platform.js*)


## Переопределение и расширение стилей

В InfinniUI есть возможность изменить стилизацию элементов.
В папке *./styles/platform* Вы можете посмотреть пример переопределения платформенных стилей.

Стили и переменные распределены по файлам следующим образом:
platform-variables - переменные стилей самой платформы.
bootstrap-variables - переменные стилей фреймворка bootstrap.
bootstrap-theme - стили перекрывающие/дополняющие стили фреймворка bootstrap.

Все эти файлы подключаются в *./styles/platform/overridden-platform.less* после подключения стилей платформы.
Важно подключать их именно после платформеных стилей, иначе при сборке будут использованны дефолтные значения.
Итак, скорвертировав *./styles/platform/overridden-platform.less* в css, Вы получите стили платформы с желаемыми значениями переменных и переопределенными стилями.

## Расширение функциональности
Новая функциональность добавляется проще всего, достаточно просто подключить файлы с ее реализацией на страницу.
Желательно сделать это ниже подключения InfinniUI, чтобы был доступ к глобальным переменным платформы.

Кроме того, вы можете задавать новые элементы (см пример  папке *./js/elements/*).
Либо использовать возможности [ExtensionPanel](http://infinniui-en.readthedocs.io/en/latest/Elements/ExtensionPanel/),
пример можно глянуть в папке *./js/extentionPanels/*.
Примеры метаданных, есть в файле *./launcher/views/customElements.json*.

Так же обратите внимание, что многие важные настройки происходят в файле *./launcher/js/main.js*.
Например, в нем Вы можете переопределить провайдеры источников данных.
```js
InfinniUI.providerRegister.register('MetadataDataSource',
    function(metadataValue) {
      var $pageContent = $('body');
      for (var i = 3; i >= 0; i--) {
        window.setTimeout(function() {
          InfinniUI.LayoutManager.init();
        }, 500 + i * 300);
      }
      return new InfinniUI.Providers.MetadataProviderREST(
        new QueryConstructorMetadata(host, metadataValue)
      );

function QueryConstructorMetadata(host, metadata) {
  this.constructMetadataRequest = function() {
    return {
      requestUrl: host + '/views/' + metadata.Path + '.json',
      method: 'GET'
    };
  };
}
```

## Разработка
Если Вы хотите запускать gulp задачи из консоли, то установите gulp-cli глобально.

Если Вы не хотите, чтобы приложение работало как SPA-приложение, то в файле *./gulpfile.js* в задаче *server:example*, уберите поле middleware и
верните хэш-формат адресов: в файле *./launcher/config.js* уберите инициализацию *InfinniUI.config.HistoryAPI* или измените значение *pushState* на *false*(нужно для корректной работы роутинга).
