Vue.component('plugin.colorchanger-settings', {
    template: `
        <div class="content-inner">
            <h1> Color Changer Settings </h1>
            <p class="lead" style="font-size: 14px">Made by UnbreakCode</p>
            <div class="md-option-container">
                <div class="md-option-line">
                    <div class="md-option-segment">
                        Enable Color Changer
                    </div>
                    <div class="md-option-segment md-option-segment_auto">
                        <input type="checkbox" v-model="theme.colorEnable" v-on:change="toggleEnable" switch/>
                    </div>
                </div>
                <div class="settings-option-body">
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Progress Bar Color
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <label>
                            <input type="color" id="selectedColor" v-model="theme.progressbar_color" v-on:change="getColor">
                            </label>
                        </div>
                    </div>
                </div>
                    <div style="opacity: 0.5; pointer-events: none;">
                        <div class="md-option-header"> Coming soon...</div>
                                <div class="md-option-line">
                                    <div class="md-option-segment">
                                        Progress Bar Icon-Color
                                    </div>
                                    <div class="md-option-segment md-option-segment_auto">
                                        <label>
                                        <input type="color" id="selectedIconColor" v-model="theme.progressbar_icon_color">
                                        </label>
                                    </div>
                                </div>
                        </div>
                </div>
        </div>
    `,
    data: function () {
        app: this.$root
        return {
            theme: {
                colorEnable: false,
                progressbar_color: '#fc3c44'
            }
        }
    },
    async mounted() {
        this.theme = await CiderCache.getCache("color-settings")
        if (!this.theme) {
            this.theme = {
                colorEnable: false,
                progressbar_color: '#fc3c44',
            }
            CiderCache.putCache("color-settings", this.theme)
        }
    },
    methods: {
        toggleEnable: function() {
            if (this.theme.colorEnable) {
                this.theme.colorEnable = true;
            } else if (!this.theme.colorEnable) {
                this.theme.colorEnable = false;
            }
            CiderCache.putCache("color-settings", this.theme)
        },
        getColor: function() {
            if (this.theme.colorEnable) {
                var color = document.getElementById("selectedColor").value;
                var r = document.querySelector('#app');
                r.style.setProperty('--songProgressColor', color);
                CiderCache.putCache("color-settings", this.theme)
            }
        },
    }
})