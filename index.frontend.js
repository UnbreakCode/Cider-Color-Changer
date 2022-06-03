class ColorChangerPlugin {
    constructor() {
        const menuEntry = new CiderFrontAPI.Objects.MenuEntry()
        this.menuEntryId = uuidv4()
        menuEntry.Id = this.menuEntryId
        menuEntry.name = "Color Changer Settings"
        menuEntry.onClick = ()=>{
            app.appRoute("plugin/colorchanger-settings")
        }
        CiderFrontAPI.AddMenuEntry(menuEntry)
        this.LoadSettings()
    }
    
    async LoadSettings() {
        this.theme = await CiderCache.getCache("color-settings")
        if (this.theme.colorEnable) {
            var r = document.querySelector('#app');
            r.style.setProperty('--songProgressColor', this.theme.progressbar_color);
        }
    }
}

new ColorChangerPlugin()
