import Vue from 'vue';
import Vuex from 'vuex';
import {UserSession} from "@/store/module/UserSession";
import {AppModule} from "@/store/module/AppModule";
import {config} from 'vuex-module-decorators'

config.rawError = true

Vue.use(Vuex);

export interface RootState {
    app: AppModule;
    user: UserSession;
}

export default new Vuex.Store<RootState>({});
