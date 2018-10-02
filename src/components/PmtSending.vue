<template>
    <div id="pmtSend">
        <div class="header">
            Регистрация ноды
        </div>
        <p>Step 3 of 4: Node registration</p>
        <ul class="steps">
            <li class="selected">
                <span>
                    <img src="../assets/images/icon-load.png" alt="">
                </span>
                <p>Загрузка ключа</p>
            </li>
            <li class="selected">
                <span>
                    <img src="../assets/images/icon-pm.png" alt="">
                </span>
                <p>Отправка PMT</p>
            </li>
            <li class="selected">
                <span>
                    <img src="../assets/images/icon-config.png" alt="">
                </span>
                <p>Настройка ноды</p>
            </li>
            <li>
                <span>
                    <img src="../assets/images/icon-done.png" alt="">
                </span>
                <p>Валидация ноды</p>
            </li>
        </ul>
        <div v-if="Object.keys(nodeList).length == 0">
            <div class="info">
            <p>
                Стоимость регистрации ноды 2000 PMT, кроме того необходимо внести депозит в 10 ETH для чегототам.
            </p>
            <p>
                Чтобы продолжить удостоверьтесь, что на вашем кошельке ETH достаточно токенов PMT для регистрации ноды.
            </p>
            <!--<span>-->
                <!--From:-->
                <!--<p class="values">-->
                    <!--{{ $store.state.user.address }}-->
                <!--</p>-->
            <!--</span>-->
            <!--<span>-->
                <!--To:-->
                <!--<p class="values">-->
                    <!--0xb9641870af8bc16c745706df75ee7f4a4433f2b1-->
                <!--</p>-->
            <!--</span>-->
            <div v-if="depositStep == 1" class="info">
                <p>
                    Deposite making
                </p>
                <div class="form-input">
                    Value of PMT to Approve
                    <input type="text" v-model="pmtVal">
                </div>
                <div class="pmt-btn-wrapper">
                    <button class="btn" @click="TokenApprove()">
                        <img src="../assets/images/icon-pm.png" alt="">
                        Перевести PMT
                    </button>
                </div>
            </div>

            <div v-if="depositStep == 2" class="info">
                <p>
                    Deposit making
                </p>
                <div class="form-input">
                    Value of ETH for deposit
                    <input type="text" v-model="ethVal">
                </div>
                <div class="pmt-btn-wrapper">
                    <button class="btn" @click="sendPmt()">
                        <img src="../assets/images/icon-pm.png" alt="">
                        Внести депозит
                    </button>
                </div>
            </div>
        </div>
            <div class="pmt-btn-wrapper">
                <button class="btn" @click="TokenApprove()">
                    <img src="../assets/images/icon-pm.png" alt="">
                    Перевести PMT
                </button>

                <button class="btn" @click="sendPmt()">
                    <img src="../assets/images/icon-pm.png" alt="">
                    Внести депозит
                </button>

                <button class="btn" @click="requestRefund()">
                    <img src="../assets/images/icon-pm.png" alt="">
                    Запросить возврат
                </button>

                <button class="btn" @click="refund()">
                    <img src="../assets/images/icon-pm.png" alt="">
                    Refund
                </button>
            </div>
        </div>
        <div v-if="Object.keys(nodeList).length !== 0" class="node-operation">
            <p>У вас уже есть ноды, вы можете совершить с ними некоторые действия.</p>
            <div class="node-item">
                <div class="header">
                    <div class="caption">
                        Нода #1
                    </div>
                    <div class="status" style="align-self: flex-end">
                        Активная нода (истекает 29.09.2022)
                    </div>
                </div>
                <div class="content">
                    <div class="info-item">
                        <div class="text">
                            Загрузка ноды
                        </div>
                        <div class="information">
                            21%
                        </div>
                    </div>
                    <div class="values">
                        <div class="info-item" style="padding-right: 15px">
                            <div class="text">
                                Оборот ETH
                            </div>
                            <div class="information">
                                22 174
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="text">
                                Скачиваний в месяц
                            </div>
                            <div class="information">
                                55 232 150
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-link to="/registration/1" class="btn-back">
            Вернуться на предыдущий шаг
        </router-link >
    </div>
</template>

<script>
    import Web3 from 'web3'
    import web3Utils from 'web3-utils'
    import ethTx from 'ethereumjs-tx'

    export default {
        name: "pmt-sending",
        data() {
            return {
                depositStep: 1,
                nodeList: {},
                ethVal: 1,
                pmtVal: 5000,
                pmtMin: 5000,
                pmtApprove: 0,
                pmtDeposit: 0,
                ethDeposit: 0,
            }
        },
        methods: {
            async getNodeList() {
                return {}
                // return {test: 1}
            },
            async getBalance(address) {
                let balance = '';
                if (this.$store.state.user.unlockType == 'metamask') {
                    console.log('balance:');
                    web3.eth.getBalance(address, (err, result) => {
                        balance = web3.fromWei(result, "ether");
                        console.log(balance + " ETH");
                    });
                }
                return balance;
            },
            async getTokenBalance(address) {
                // var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/QLdzys0ezvUkTnMfUYpV"));
                if (this.$store.state.user.unlockType == 'metamask') {

                }
                var tokenAddress = this.$store.state.contracts.contractAddress;
                var tokenContract = web3.eth.contract(this.$store.state.abi).at(tokenAddress);
                var tokenBalance = tokenContract.balanceOf(ethereumAddress).toNumber();
                return tokenBalance;
            },
            async TokenApprove() {
                if (this.$store.state.user.unlockType == 'keystore') {
                    // transaction.sign(this.$store.state.user.wallet.privateKey)
                    //send signed transaction to PM service
                    // .....some code
                    const localweb3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/8a509424b9c14ab1a424ee9f6c3e457b'));
                    const contractAdr = this.$store.state.contracts.contractPMT;
                    const address = this.$store.state.user.address;
                    // PMT ABI
                    const abi = [
                       {
                           "constant": false,
                           "inputs": [
                               { "name": "_spender", "type": "address" },
                               { "name": "_value", "type": "uint256" }
                           ],
                           "name": "approve",
                           "outputs": [
                               { "name": "success", "type": "bool" }
                           ],
                           "payable": false,
                           "stateMutability": "nonpayable",
                           "type": "function"
                       },
                       {
                           "constant": true,
                           "inputs": [
                               { "name": "_owner", "type": "address" },
                               { "name": "_spender", "type": "address" }
                           ],
                           "name": "allowance",
                           "outputs": [
                               { "name": "", "type": "uint256", "value": "0" }
                           ],
                           "payable": false,
                           "stateMutability": "view",
                           "type": "function"
                       },
                    ];
                    //add getter/setter
                    let nodeStorage = '0x6dE2D11b31FC9527Cf2B308B6263a011dC55738B';
                    let nodeContract = new localweb3.eth.Contract(abi, contractAdr);
                    let txData = nodeContract.methods.approve(nodeStorage, this.pmtVal * 10000).encodeABI();
                    let nonce = await localweb3.eth.getTransactionCount(address, "pending");
                    let gasPrice = await web3Utils.toHex(await localweb3.eth.getGasPrice());
                    let gasLimit = await web3Utils.toHex(await localweb3.eth.estimateGas({
                        from: address,
                        to: contractAdr,
                        data: txData,
                        value: web3Utils.toHex(0)
                    }) + 100000);

                    let txParams = {
                        nonce: web3Utils.toHex(nonce),
                        gasPrice: gasPrice,
                        gasLimit: gasLimit,
                        value: '0x00',
                        to: contractAdr,
                        data: txData,
                        chainId: 4
                    };

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
                    // web3.eth.sendTransaction(transaction, (error, result) => {
                    //
                    // })
                } else if (this.$store.state.user.unlockType == 'ledger') {

                }

            },
            async tokenAllowance() {
                if (this.$store.state.user.unlockType == 'keystore') {
                    const localweb3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/8a509424b9c14ab1a424ee9f6c3e457b'));
                    const contractAdr = this.$store.state.contracts.contractPMT;
                    const address = this.$store.state.user.address;
                    // PMT ABI
                    const abi = [
                       {
                           "constant": false,
                           "inputs": [
                               { "name": "_spender", "type": "address" },
                               { "name": "_value", "type": "uint256" }
                           ],
                           "name": "approve",
                           "outputs": [
                               { "name": "success", "type": "bool" }
                           ],
                           "payable": false,
                           "stateMutability": "nonpayable",
                           "type": "function"
                       },
                       {
                           "constant": true,
                           "inputs": [
                               { "name": "_owner", "type": "address" },
                               { "name": "_spender", "type": "address" }
                           ],
                           "name": "allowance",
                           "outputs": [
                               { "name": "", "type": "uint256", "value": "0" }
                           ],
                           "payable": false,
                           "stateMutability": "view",
                           "type": "function"
                       },
                    ];

                    let nodeStorage = this.$store.state.contracts.contractStorage;
                    let nodeContract = new localweb3.eth.Contract(abi, contractAdr);
                    nodeContract.methods.allowance(address, nodeStorage).call((err, result) => {
                        this.pmtApprove = result;
                    });
                } else if (this.$store.state.user.unlockType == 'metamask') {

                } else if (this.$store.state.user.unlockType == 'ledger') {

                }
            },
            async sendPmt() {
                if (true) {
                    // if token transfer approve
                    // this.$router.push({ path: `/registration/3` })
                }
                if (this.$store.state.user.unlockType == 'keystore') {
                    const localweb3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/8a509424b9c14ab1a424ee9f6c3e457b'));
                    const contractAdr = this.$store.state.contracts.contractAddress;
                    const address = this.$store.state.user.address;
                    const abi = this.$store.state.contracts.ABI;

                    let nodeContract = new localweb3.eth.Contract(abi, contractAdr);

                    let txData = nodeContract.methods.makeDeposit(address, 50000000).encodeABI();

                    let nonce = await localweb3.eth.getTransactionCount(address, "pending");
                    let txParams = {
                        nonce: web3Utils.toHex(nonce),
                        gasPrice: web3Utils.toHex(100000000),
                        gasLimit: web3Utils.toHex(250000),
                        value: web3Utils.toHex(web3Utils.toWei(String(this.ethVal))),
                        to: contractAdr,
                        data: txData,
                        chainId: 4
                    };
                    console.log(txParams);

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
                    // web3.eth.sendTransaction(transaction, (error, result) => {
                    //
                    // })
                } else if (this.$store.state.user.unlockType == 'ledger') {

                }
            },
            async getDepositNode() {
                const abi = this.$store.state.contracts.ABI;

                const localweb3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/8a509424b9c14ab1a424ee9f6c3e457b'));
                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;

                let nodeContract = new localweb3.eth.Contract(abi, contractAdr);

                nodeContract.methods.getDepositNode(address).call((err, result) => {
                    // console.log('error:');
                    // console.log(err);
                    // console.log('res:');
                    // console.log(result);
                    this.ethDeposit = result[0];
                    this.pmtDeposit = result[1];
                });
            },
            async requestRefund() {
                if (this.$store.state.user.unlockType == 'keystore') {
                    const localweb3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/8a509424b9c14ab1a424ee9f6c3e457b'));
                    const contractAdr = this.$store.state.contracts.contractAddress;
                    const address = this.$store.state.user.address;
                    const abi = this.$store.state.contracts.ABI;

                    let nodeContract = new localweb3.eth.Contract(abi, contractAdr);

                    let txData = nodeContract.methods.requestRefund("1000000000000000000", 50000000).encodeABI();

                    let nonce = await localweb3.eth.getTransactionCount(address, "pending");
                    let txParams = {
                        nonce: web3Utils.toHex(nonce),
                        gasPrice: web3Utils.toHex(100000000),
                        gasLimit: web3Utils.toHex(250000),
                        value: '0x00',
                        to: contractAdr,
                        data: txData,
                        chainId: 4
                    };
                    console.log(txParams);

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
                }
            },
            async refund() {
                if (this.$store.state.user.unlockType == 'keystore') {
                    const localweb3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/8a509424b9c14ab1a424ee9f6c3e457b'));
                    const contractAdr = this.$store.state.contracts.contractAddress;
                    const address = this.$store.state.user.address;
                    const abi = this.$store.state.contracts.ABI;

                    let nodeContract = new localweb3.eth.Contract(abi, contractAdr);

                    let txData = nodeContract.methods.refund().encodeABI();

                    let nonce = await localweb3.eth.getTransactionCount(address, "pending");
                    let txParams = {
                        nonce: web3Utils.toHex(nonce),
                        gasPrice: web3Utils.toHex(100000000),
                        gasLimit: web3Utils.toHex(250000),
                        value: '0x00',
                        to: contractAdr,
                        data: txData,
                        chainId: 4
                    };
                    console.log(txParams);

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
                }
            },
            async getNodeStorage() {
                const abi = this.$store.state.contracts.ABI;

                const localweb3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/8a509424b9c14ab1a424ee9f6c3e457b'));
                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;

                let nodeContract = new localweb3.eth.Contract(abi, contractAdr);

                let txData = nodeContract.methods.NodeStorage().call((err, result) => {
                    console.log('error:');
                    console.log(err);
                    console.log('res:');
                    console.log(result);
                });
            }
        },
        mounted: async function () {
            this.nodeList = await this.getNodeList();
            // let balance = await this.getBalance(this.$store.state.user.address);
            // this.getNodeStorage();
            // this.getDepositNode();
            await this.tokenAllowance();
            await this.getDepositNode();
            if (this.pmtApprove < this.pmtMin && this.pmtDeposit < this.pmtMin) {
                this.depositStep = 2;
            }
        },
    }
</script>

<style scoped lang="sass">
    #pmtSend
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
        .pmt-btn-wrapper
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
        .node-operation
            .node-item
                width: 100%
                height: 109px
                padding: 16px 14px 14px 23px
                background-color: #ffffff
                .header
                    display: flex
                    justify-content: space-between
                    .caption
                        font-family: Archive
                        font-size: 18px
                        line-height: 1
                        text-align: left
                        color: #67777b
                    .status
                        font-family: Roboto
                        font-size: 14px
                        line-height: 1.29
                        letter-spacing: normal
                        color: #00e7d5
                .content
                    display: flex
                    justify-content: space-between
                .info-item
                    display: flex
                    flex-direction: column
                    align-items: flex-end
                    color: #67777b
                    .text
                        font-family: Roboto-Regular
                        size: 14px
                    .information
                        font-family: Roboto-Bold
                        font-size: 24px
                .values
                    display: flex

        .btn-back
            font-family: Roboto
            font-size: 14px
            line-height: normal
            letter-spacing: 0.1px
            text-align: left
            color: #006f9e
            text-decoration: underline
</style>