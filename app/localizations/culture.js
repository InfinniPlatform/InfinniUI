function Culture(name){
    this.name = name;
    this.caption = InfinniUI.localizations[name].caption;
    this.dateTimeFormatInfo = InfinniUI.localizations[name].dateTimeFormatInfo;
    this.numberFormatInfo = InfinniUI.localizations[name].numberFormatInfo;
}

window.InfinniUI.global.culture = new Culture(InfinniUI.config.lang);
window.InfinniUI.Culture = Culture;
