<template>
    <div id="settings">
        <div class="header">
            Node registration
        </div>
        <p>Step 2 of 4: Node registration</p>
        <node-stage :currStage="2"></node-stage>
        <div v-if="tx != ''" class="transaction">
            <p>Transaction successfully sent. Transaction hash:</p>
            <a class="txHash" :href="$store.state.etherscan + '/tx/' + tx" target="_blank">
                {{ tx }}
            </a>
        </div>
        <div v-if="!regStatus" class="info">
            <p>
                Configuring the node includes sending ETH(deposit), IPFS hash, hashType, IP and coordinates of the node.
            </p>
            <div class="form-input">
                IP
                <input type="text" v-model="ip">
            </div>
            <div class="form-input">
                hash
                <input type="text" v-model="hash">
            </div>
            <div class="form-input">
                hashType
                <div class="select-box">
                    <div class="selected-item" :class="{'selected-item--open' : hashSelectShow}" @click="hashSelectShow = !hashSelectShow">
                        {{hashType + ' - ' + hashTag}}
                    </div>
                    <ul v-show="hashSelectShow">
                        <li @click="setHashType('IPFS',1)">1 - IPFS</li>
                    </ul>
                </div>
            </div>
            <div class="form-input">
                Node coordinates
                <input type="text" v-model="coordinates">
            </div>
            <div class="settings-btn-wrapper" @click="addNode()">
            <button class="btn">
                <img src="../assets/images/icon-config.png" alt="">
                Add node
            </button>
        </div>
            <router-link to="/registration/1" class="btn-back">
                Return to the previous step
            </router-link >
        </div>
        <div v-if="regStatus" class="info">
            <p>
                Here You can update your Playmarket 2.0 Node info.
            </p>
            <div class="form-input">
                IP
                <input type="text" v-model="ip">
            </div>
            <div class="form-input">
                hash
                <input type="text" v-model="hash" :placeholder="hashPl">
            </div>
            <div class="form-input">
                HashType
                <div class="select-box">
                    <div class="selected-item" :class="{'selected-item--open' : hashSelectShow}" @click="hashSelectShow = !hashSelectShow">
                        {{hashType + ' - ' + hashTag}}
                    </div>
                    <ul v-show="hashSelectShow">
                        <li @click="setHashType('IPFS',1)">1 - IPFS</li>
                    </ul>
                </div>
            </div>

            <div class="form-input">
                Node coordinates
                <input type="text" v-model="coordinates">
            </div>
            <div class="settings-btn-wrapper" @click="changeInfoNode()">
                <button class="btn">
                    <img src="../assets/images/icon-config.png" alt="">
                    Change info
                </button>
            </div>
            <div class="settings-btn-wrapper" @click="$router.push({ path: `/registration/3` })">
                <button class="btn">
                    <img src="../assets/images/icon-config.png" alt="">
                    Next step
                </button>
            </div>
            <router-link to="/registration/1" class="btn-back">
                Return to the previous step
            </router-link >

        </div>
    </div>

</template>

<script>
    import NodeStage from '@/components/NodeStage.vue'
    import Web3 from 'web3'
    import ethTx from 'ethereumjs-tx'
    import axios from 'axios'
    import TransportU2F from "@ledgerhq/hw-transport-u2f"
    import AppEth from "@ledgerhq/hw-app-eth"

    function getPosition() {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    }

    export default {
        name: "node-settings",
        data() {
            return {
                tx: '',
                regStatus: false,
                nodeConfirmation: false,
                hashType: 1,
                hashTag: 'IPFS',
                hash: '',
                hashPl: 'QmVtYjNij3KeyGmcgg7yVXWskLaBtov3UYL9pgcGK3MCWu',
                ip: '192.168.1.1',
                coordinates: '109.194:37.82',
                hashSelectShow: false,
            }
        },
        methods: {
            async addNode() {
                this.$store.commit('SHOW_SPINNER');

                let param = [
                    this.$store.state.contracts.contractAddress,
                    this.$store.state.user.address,
                    this.$store.state.contracts.ABI,
                    'addNode',
                    [
                        this.hashType, this.hash, this.ip, this.coordinates
                    ]
                ];
                let result = this.sendTransaction(...param);
                if (result.hash) {
                    this.tx = result.hash;
                } else {
                    console.log(result.error)
                }

                this.$store.commit('HIDE_SPINNER');
            },
            async changeInfoNode() {
                this.$store.commit('SHOW_SPINNER');
                let param = [
                    this.$store.state.contracts.contractAddress,
                    this.$store.state.user.address,
                    this.$store.state.contracts.ABI,
                    'changeInfoNode',
                    [
                        this.hash, this.hashType, this.ip, this.coordinates
                    ]
                ];
                let result = await this.sendTransaction(...param);
                if (result.hash) {
                    this.tx = result.hash;
                } else {
                    console.log(result.error)
                }
                this.$store.commit('HIDE_SPINNER');
            },
            async getInfoNode() {
                try {
                    let param = [
                        this.$store.state.contracts.contractAddress,
                        'getInfoNode',
                        this.$store.state.contracts.ABI,
                        [this.$store.state.user.address]
                    ];

                    let result = await this.callContractFunction(...param);
                    this.regStatus = typeof result != 'undefined';
                    if (this.regStatus) {
                        this.hashType = result[0];
                        if (this.hashType == 1) {
                            this.hashTag = 'IPFS';
                        }
                        this.hash = result[3];
                        this.ip = result[4];
                        this.coordinates = result[5];
                        this.getConfirmationNode();
                    }
                    return result;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            },
            async getConfirmationNode() {
                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;
                let localweb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));
                if (typeof localweb3 != 'undefined') {
                    let nodeContract = new localweb3.eth.Contract(abi, contractAdr);
                    try {
                        let result = await  nodeContract.methods.getInfoNode(address).call();
                        this.regStatus = typeof result != 'undefined';
                        if (this.regStatus) {
                            this.hashType = result[0];
                            if (this.hashType == 1) {
                                this.hashTag = 'IPFS';
                            }
                            this.hash = result[3];
                            this.ip = result[4];
                            this.coordinates = result[5];
                            this.getConfirmationNode();
                        }
                        return result;
                    } catch (e) {
                        return false;
                    }
                }
            },
            async getUserCoordinates() {
                let position = '';
                try {
                    position = await getPosition();
                } catch(e) {
                    console.log(e)
                }
                return typeof position.coords !== 'undefined' ? position.coords.latitude + ':' + position.coords.longitude : '';
            },
            setHashType(tag,type) {
                this.hashTag = tag;
                this.hashType = type;
                this.hashSelectShow = false;
            },
            getWeb3provider(unlockType) {
                if (unlockType == 'keystore' || unlockType == 'ledger') {
                    return new Web3.providers.WebsocketProvider(this.$store.state.contracts.web3provider);
                } else if (unlockType == 'metamask') {
                    if (window.ethereum) {
                        return ethereum;
                    } else if (typeof web3 !== 'undefined') {
                        return window.web3.currentProvider;
                    } else {
                        console.log('MetaMask is not installed')
                        return false;
                    }
                }
            },
            async getInfo() {
                this.$store.commit('SHOW_SPINNER');
                let nodeInfo = await this.getInfoNode();
                this.coordinates = await this.getUserCoordinates();
                this.$store.commit('HIDE_SPINNER');
            },
            async sendTransaction(contract, owner, abi, functionName, param) {
                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contract);
                let txData = nodeContract.methods[functionName](...param).encodeABI();
                let nonce = await localWeb3.eth.getTransactionCount(owner, "pending");
                let gasPrice = await localWeb3.utils.toHex(await localWeb3.eth.getGasPrice());
                let gasLimit = await localWeb3.utils.toHex(await localWeb3.eth.estimateGas({
                    from: owner,
                    to: contract,
                    data: txData,
                    value: localWeb3.utils.toHex(0)
                }) + 100000);

                let txParams = {
                    from: owner,
                    nonce: localWeb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    value: '0x00',
                    to: contract,
                    data: txData,
                    chainId: this.$store.state.chainId
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();
                    let raw = "0x" + serializedTx.toString("hex");
                    let transaction = await localWeb3.eth.sendSignedTransaction(raw, (err, transactionHash) => {});
                    return {hash : transaction.transactionHash, error: transaction.error};
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    let transaction = await localWeb3.eth.sendTransaction(txParams, (err, transactionHash) => {});
                    console.log(transaction)
                    return {hash : transaction.transactionHash, error: transaction.error};
                } else if (this.$store.state.user.unlockType == 'ledger') {
                    txParams['v'] = "0x0" + this.$store.state.chainId;
                    let tx = new ethTx(txParams);
                    let serialized = tx.serialize().toString('hex');
                    const transportU2F = await TransportU2F.create();
                    const eth = new AppEth(transportU2F);
                    //Подписываем транзакцию LEDGER
                    let svr = await eth.signTransaction("44'/60'/0'/0/0", serialized);
                    txParams['r'] = '0x' + svr.r;
                    txParams['s'] = '0x' + svr.s;
                    txParams['v'] = '0x' + svr.v;
                    let txSigned = new ethTx(txParams);
                    serialized = txSigned.serialize();
                    let raw = "0x" + serialized.toString("hex");
                    let txInfo = await localWeb3.eth.sendSignedTransaction(raw, () => {});
                    return {hash : txInfo.transactionHash, error: txInfo.error};
                }
            },
            async callContractFunction(contractAdr, functionName, abi, param) {
                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));
                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);
                return await nodeContract.methods[functionName](...param).call();
            },
            getWeb3provider(unlockType) {
                if (unlockType == 'keystore' || unlockType == 'ledger') {
                    return new Web3.providers.WebsocketProvider(this.$store.state.contracts.web3provider);
                } else if (unlockType == 'metamask') {
                    if (window.ethereum) {
                        return ethereum;
                    } else if (typeof web3 !== 'undefined') {
                        return window.web3.currentProvider;
                    } else {
                        console.log('MetaMask is not installed')
                        return false;
                    }
                }
            }
        },
        mounted: async function () {
            if (!this.$store.state.user.isUserAuthenticated) {
                this.$router.push({ path: `/registration/1` })
            }
            await this.getInfo();
            let self = this;
            let updater = setTimeout(async function tick() {
                await self.getInfo();
                updater = setTimeout(tick, 300*1000);
            }, 300*1000);
        },
        components: {
            NodeStage
        }
    }
</script>

<style scoped lang="sass">
#settings
    max-width: 500px
    padding-right: 420px
    display: flex
    flex-direction: column
    z-index: 48
    font-family: Roboto
    font-size: 14px
    line-height: normal
    letter-spacing: 0.1px
    text-align: left
    color: #67777b
    .header
        padding-bottom: 22px
        font-family: Archive
        font-size: 24px
        line-height: normal
        letter-spacing: 0.2px
        text-align: left
        color: #67777b
    .transaction
        padding-top: 10px
        padding-bottom: 10px
        p
            font-weight: 600

    .info
        p
            padding-bottom: 20px
        .values
            font-size: 18px
            line-height: 1
            letter-spacing: 0.5px
            font-weight: 500
        .form-input
            display: flex
            flex-direction: column
            align-items: flex-start
            padding-bottom: 15px
            input
                width: auto
                height: 24px
                padding: 5px 10px
                border: none
    .settings-btn-wrapper
        margin: 40px 0 40px 0
        position: relative
        overflow: hidden
        display: inline-block
        cursor: pointer
        padding: 0 4px 7px 0
        .btn
            display: flex
            justify-content: center
            align-items: center
            font-family: Archive
            background-color: #00e7d5
            border: 2px solid #00e7d5
            box-shadow: 0px 4px 5px 0 rgba(0, 231, 213, 0.3)
            color: #fff
            padding: 8px 20px
            border-radius: 22.5px
            font-size: 20px
            cursor: pointer
            text-transform: uppercase
            img
                margin-right: 10px
    .btn-back
        display: block
        font-family: Roboto
        font-size: 14px
        line-height: normal
        letter-spacing: 0.1px
        text-align: left
        color: #006f9e
        text-decoration: underline
    .select-box
        position: relative
        cursor: pointer
        .selected-item
            border-radius: 25px
            position: relative
            height: 24px
            width: 149px
            padding: 5px 20px
            background: #fff
            display: flex
            align-items: center
            &:after
                content: ''
                position: absolute
                top: 14px
                right: 13px
                width: 0
                height: 0
                border-style: solid
                border-width: 8px 5px 0 5px
                border-color: #00e7d5 transparent transparent transparent
        .selected-item--open
            &:after
                border-color: transparent transparent #00e7d5 transparent
                border-width: 0 5px 8px 5px

        ul
            position: absolute
            top: 34px
            left: 15px
            border-top: 1px rgba(191, 191, 191, 0.1) solid
            box-shadow: 0 5px 5px 0 rgba(191, 191, 191, 0.3)
            li
                height: 24px
                width: 139px
                padding: 5px 10px
                background: #fff
</style>