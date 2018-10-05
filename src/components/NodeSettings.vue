<template>
    <div id="settings">
        <div class="header">
            Регистрация ноды
        </div>
        <p>Step 2 of 4: Node registration</p>
        <ul class="steps">
            <li class="selected">
                <span>
                    <img src="../assets/images/icon-load.png" alt="">
                </span>
                <p>Wallet unlock</p>
            </li>
            <li class="selected">
                <span>
                    <img src="../assets/images/icon-config.png" alt="">
                </span>
                <p>Node Settings</p>
            </li>
            <li>
                <span>
                    <img src="../assets/images/icon-pm.png" alt="">
                </span>
                <p>Making deposit</p>
            </li>
            <li>
                <span>
                    <img src="../assets/images/icon-done.png" alt="">
                </span>
                <p>Node validation</p>
            </li>
        </ul>
        <div v-if="tx != ''" class="transaction">
            Transaction successfully sent. Transaction hash:
            <a class="txHash" :href="$store.state.etherscan + '/tx/' + tx" target="_blank">
                {{ tx }}
            </a>
        </div>
        <div v-if="!regStatus" class="info">
            <p>
                Настройка ноды включает в себя отправку эфира(deposit), hash, hashTag, IP, и координат ноды.
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
                hashTag
                <input type="text" v-model="this.hashTag" disabled>
            </div>
            <!--<span>-->
                <!--From:-->
                <!--<p class="values">-->
                    <!--{{ $store.state.user.address }}-->
                <!--</p>-->
            <!--</span>-->
            <!--<span>-->
                <!--To:-->
                <!--<p class="values">-->
                    <!--{{ $store.state.contracts.contractAddress }}-->
                <!--</p>-->
            <!--</span>-->
            <div class="form-input">
                Node coordinates
                <input type="text" v-model="coordinates">
            </div>
            <!--<span>-->
                <!--Value:-->
                <!--<p class="values">-->
                    <!--10 ETH-->
                <!--</p>-->
            <!--</span>-->
            <div class="settings-btn-wrapper" @click="addNode()">
            <button class="btn">
                <img src="../assets/images/icon-config.png" alt="">
                Add node
            </button>
        </div>
            <router-link to="/registration/1" class="btn-back">
                Вернуться на предыдущий шаг
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
                <input type="text" v-model="hash">
            </div>
            <div class="form-input">
                hashTag
                <input type="text" v-model="this.hashTag" disabled>
            </div>

            <div class="form-input">
                Координаты ноды
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
                Вернуться на предыдущий шаг
            </router-link >

        </div>
    </div>

</template>

<script>
    import Web3 from 'web3'
    import ethTx from 'ethereumjs-tx'

    export default {
        name: "node-settings",
        data() {
            return {
                tx: '',
                regStatus: false,
                nodeConfirmation: false,
                hashType: 1,
                hashTag: 'IPFS',
                hash: '0x5cd5d2ed1f79e1c9bc055bb29663060b1c4007bf',
                ip: '192.168.1.1',
                coordinates: '109.194.37.82'
            }
        },
        methods: {
            async addNode() {
                //validate data
                //send transaction
                let localweb3 = {};
                if (this.$store.state.user.unlockType == 'keystore') {
                    localweb3 = new Web3(new Web3.providers.WebsocketProvider(this.$store.state.contracts.web3provider));
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    localweb3 = new Web3(window.web3.currentProvider);
                } else if (this.$store.state.user.unlockType == 'ledger') {

                }

                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;

                let nonce = await localweb3.eth.getTransactionCount(address, "pending");
                let nodeContract = new localweb3.eth.Contract(abi, contractAdr);
                let txData = nodeContract.methods.addNode(this.hashType, this.hash, this.ip, this.coordinates).encodeABI();
                let gasPrice = await localweb3.utils.toHex(await localweb3.eth.getGasPrice());
                let gasLimit = await localweb3.utils.toHex(await localweb3.eth.estimateGas({
                    from: address,
                    to: contractAdr,
                    data: txData,
                    value: localweb3.utils.toHex(0)
                }) + 100000);

                let txParams = {
                    nonce: localweb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    value: '0x00',
                    to: contractAdr,
                    from: address,
                    data: txData,
                    chainId: 4
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();

                    let raw = "0x" + serializedTx.toString("hex");

                    localweb3.eth.sendSignedTransaction(raw, function (err, transactionHash) {
                      console.log('error:');
                      console.log(err);
                      console.log('TX:');
                      console.log(transactionHash);
                    });
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    localweb3.eth.sendTransaction(txParams, function (err, transactionHash) {
                      console.log('error:');
                      console.log(err);
                      console.log('TX:');
                      console.log(transactionHash);
                    });
                } else if (this.$store.state.user.unlockType == 'ledger') {

                }
                // this.$router.push({ path: `/registration/3` })
            },
            async changeInfoNode() {
                this.$store.commit('SHOW_SPINNER');
                let localweb3 = {};
                if (this.$store.state.user.unlockType == 'keystore') {
                    localweb3 = new Web3(new Web3.providers.WebsocketProvider(this.$store.state.contracts.web3provider));
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    localweb3 = new Web3(window.web3.currentProvider);
                } else if (this.$store.state.user.unlockType == 'ledger') {

                }

                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;

                let nonce = await localweb3.eth.getTransactionCount(address, "pending");
                let nodeContract = new localweb3.eth.Contract(abi, contractAdr);
                let txData = nodeContract.methods.changeInfoNode(this.hash, this.hashType, this.ip, this.coordinates).encodeABI();
                let gasPrice = await localweb3.utils.toHex(await localweb3.eth.getGasPrice());

                let gasLimit = await localweb3.utils.toHex(await localweb3.eth.estimateGas({
                    from: address,
                    to: contractAdr,
                    data: txData,
                    value: localweb3.utils.toHex(0)
                }) + 100000);

                let txParams = {
                    nonce: localweb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    value: '0x00',
                    to: contractAdr,
                    from: address,
                    data: txData,
                    chainId: 4
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();

                    let raw = "0x" + serializedTx.toString("hex");

                    localweb3.eth.sendSignedTransaction(raw, (err, transactionHash) => {
                      // console.log('error:');
                      // console.log(err);
                      // console.log('TX:');
                      // console.log(transactionHash);
                        if (transactionHash) {
                            this.tx = transactionHash;
                        }
                        this.$store.commit('HIDE_SPINNER');
                    });
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    localweb3.eth.sendTransaction(txParams, function (err, transactionHash) {
                      console.log('error:');
                      console.log(err);
                      console.log('TX:');
                      console.log(transactionHash);
                    });
                } else if (this.$store.state.user.unlockType == 'ledger') {

                }
            },
            async getInfoNode() {
                if (this.$store.state.user.unlockType == 'keystore') {
                    const localweb3 = new Web3(new Web3.providers.WebsocketProvider(this.$store.state.contracts.web3provider));
                    const contractAdr = this.$store.state.contracts.contractAddress;
                    const address = this.$store.state.user.address;
                    const abi = this.$store.state.contracts.ABI;
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
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    if (typeof web3 !== 'undefined') {
                       //check that metaMask is installed

                        const localWeb3 = new Web3(window.web3.currentProvider);

                        localWeb3.eth.getAccounts().then(account => {
                           let address = account[0];
                           const abi = this.$store.state.contracts.ABI;
                           const contractAdr = this.$store.state.contracts.contractAddress;

                           let nodeContract = new localWeb3.eth.Contract(abi, contractAdr, {from: address});

                           nodeContract.methods.getInfoNode(address).call(function (err, result) {
                              console.log('error:');
                              console.log(err);
                              console.log('res:');
                              console.log(result);
                            });
                        });

                    } else{
                       console.log('MetaMask is not installed')
                    }
                }
            },
            async getConfirmationNode() {
                const abi = this.$store.state.contracts.ABI;

                if (this.$store.state.user.unlockType == 'keystore') {
                    const localweb3 = new Web3(new Web3.providers.WebsocketProvider(this.$store.state.contracts.web3provider));
                    const contractAdr = this.$store.state.contracts.contractAddress;
                    const address = this.$store.state.user.address;

                    let nodeContract = new localweb3.eth.Contract(abi, contractAdr);

                    nodeContract.methods.getConfirmationNode(address).call((err, result) => {
                      if (typeof result != 'undefined') {
                          this.nodeConfirmation = result;
                      }

                    });
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    if (typeof web3 !== 'undefined') {
                       //check that metaMask is installed

                        const localWeb3 = new Web3(window.web3.currentProvider);

                        localWeb3.eth.getAccounts().then(account => {
                           let address = account[0];
                           const abi = this.$store.state.contracts.ABI;
                           const contractAdr = this.$store.state.contracts.contractAddress;

                           let nodeContract = new localWeb3.eth.Contract(abi, contractAdr, {from: address});

                           nodeContract.methods.getInfoNode(address).call(function (err, result) {
                              console.log('error:');
                              console.log(err);
                              console.log('res:');
                              console.log(result);
                            });
                        });

                    } else{
                       console.log('MetaMask is not installed')
                    }
                }
            }
        },
        mounted: async function () {
            this.$store.commit('SHOW_SPINNER');
            let nodeInfo = await this.getInfoNode();
            this.$store.commit('HIDE_SPINNER');
        },
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
    .steps
        position: relative
        display: flex
        width: 400px
        padding: 35px 15px
        z-index: 45
        text-align: center
        &:before
            content: ''
            height: 1px
            width: 100%
            /*background: #00e7d5*/
            background: #c6c6c6
            position: absolute
            top: 59px
            left: 0
            z-index: 43
        li
            margin-right: 69px
            position: relative
            z-index: 45
            display: flex
            align-items: center
            justify-content: center
            flex-direction: column
            p
                padding-top: 13px
            img
            span
                display: flex
                height: 48px
                width: 48px
                align-items: center
                justify-content: center
                background-color: #c6c6c6
                border-radius: 100%
        li:nth-child(4)
            margin-right: 0
        .selected
            position: relative
            z-index: 48
            color: #00e7d5
            span
                background-color: #00e7d5
                &:before
                    content: ''
                    height: 1px
                    width: 90px
                    position: absolute
                    top: 24px
                    left: -75px
                    z-index: 44
                    background: #00e7d5
                img
                    z-index: 45
        .selected:nth-child(1) > span:before
                width: 100%
                left: -15px
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
            background-color: #00e7d5
            border: 2px solid #00e7d5
            box-shadow: 0px 4px 5px 0 rgba(0, 231, 213, 0.6)
            color: #fff
            padding: 8px 20px
            border-radius: 22.5px
            font-size: 20px
            font-weight: bold
            cursor: pointer
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
</style>