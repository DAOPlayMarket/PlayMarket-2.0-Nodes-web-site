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
            address: '0x123',
            wallet: {},
            unlockType: '',
        },
        nodeList: [],
        abi: '',
        showSpinner: false,
        showStat: false,
        contracts: {
            ABI: [
                     // transfer
                     {
                      "constant": false,
                      "inputs": [
                       {
                        "name": "_to",
                        "type": "address"
                       },
                       {
                        "name": "_value",
                        "type": "uint256"
                       }
                      ],
                      "name": "transfer",
                      "outputs": [
                       {
                        "name": "",
                        "type": "bool"
                       }
                      ],
                      "type": "function"
                     }
            ],
            tokenAddress: '0x123',
            nodeAddress: '0x123',
            contractAddress: '0xdD483256d16DA1F043C2f16ed10a9F8EBcD64C77',

        }
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
            state.user.unlockType = auth.type;
            if (state.user.unlockType == 'keystore') {
                state.user.wallet = auth.wallet;
            }
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