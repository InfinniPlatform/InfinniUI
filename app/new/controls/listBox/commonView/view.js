var CommonListBoxView = BaseListBoxView.extend({
    className: 'pl-listbox pl-listbox-common-mode'
});

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Listbox.viewModes.common', CommonListBoxView);