import './assets/main.css'

import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import Header from './components/header.vue';
import Main from './components/main.vue';
import GameOver from './components/gameover.vue';
import GameComplete from './components/gamecomplete.vue';
import { createI18n } from 'vue-i18n';
import EN from './locale/en.json';
import TR from './locale/tr.json';

let store = createStore({
    state(){
        return{
            diff: "",
            time: 0,
            username: "",
            isReady: false,
            gameEnd: false
        }
    }
})

let i18n = createI18n({
    locale: "tr",
    messages: {
        en: EN,
        tr: TR
    }
})

let app = createApp(App);
app.use(store);
app.use(i18n);
app.component('header-part', Header);
app.component('main-part', Main);
app.component('game-over', GameOver);
app.component('game-complete', GameComplete);
app.mount('#app');