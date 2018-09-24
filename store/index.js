import Vuex from 'vuex'
import Vue from 'vue'

import config from '@/lib/config'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
    },
    state: {
        server: config.server,
        user: {
            isUserAuthenticated: false,
            address: '0x123'
        },
        nodeList: [],
        unlockType: '',
        contractAddress: '0xc1322d8ae3b0e2e437e0ae36388d0cfd2c02f1c9',
        abi: '',
        showSpinner: false,
        showStat: false
    },
    mutations: {
        UPDATE_SEARCH_KEY(state, searchKey) {
            state.searchKey = searchKey;
        },
        UPDATE_NODE_CONF(state,node_number) {
            state.server = 'https://n' + node_number + '.playmarket.io:3000';
        },
        SET_IS_USER_AUTHENTICATED (state, auth) {
            state.user.isUserAuthenticated = auth.isAuth;
            state.user.address = auth.address;
        },
        SET_IS_USER_UNAUTHENTICATED (state) {
            state.user.isUserAuthenticated = false;
            state.user.address = '';
        },
        SHOW_SPINNER(state) {
            state.showStat = true
        },
        HIDE_SPINNER(state) {
            state.showStat = false
        },
        SHOW_STATISTIC(state) {
            state.showSpinner = true
        },
        HIDE_STATISTIC(state) {
            state.showSpinner = false
        },
    },
    actions: {}
})