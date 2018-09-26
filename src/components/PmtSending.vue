<template>
    <div id="pmtSend">
        <div class="header">
            Регистрация ноды
        </div>
        <p>Шаг 2 из 4: Регистрация ноды</p>
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
            <li>
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
            <span>
                From:
                <p class="values">
                    {{ $store.state.user.address }}
                </p>
            </span>
            <span>
                To:
                <p class="values">
                    0xb9641870af8bc16c745706df75ee7f4a4433f2b1
                </p>
            </span>
            <span>
                Value:
                <p class="values">
                    2000 PMT
                </p>
            </span>
        </div>
            <div class="pmt-btn-wrapper">
            <button class="btn" @click="sendPmt()">
                <img src="../assets/images/icon-pm.png" alt="">
                Перевести PMT
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
    export default {
        name: "pmt-sending",
        data() {
            return {
                nodeList: {}
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
                var tokenAddress = this.$store.state.user.contractAddress;
                var tokenContract = web3.eth.contract(this.$store.state.abi).at(tokenAddress);
                var tokenBalance = tokenContract.balanceOf(ethereumAddress).toNumber();
                return tokenBalance;
            },
            async TokenApprove() {
                let address = this.$store.state.user.address;
                const ABI = this.$store.state.contracts.ABI;
                const tokenAddress = this.$store.state.contracts.tokenAddress;
                const nodeAddress = this.$store.state.contracts.nodeAddress;
                const toAddress = this.$store.state.contracts.nodeAddress;

                //check token balance
                let tokenBalance = await getTokenBalance(address);

                if (tokenBalance < 0) {
                    //if token balance not enough
                    return false;
                }

                //approve token for transaction
                let decimals = web3.toBigNumber(18);
                let amount = web3.toBigNumber(100);
                let token = web3.eth.contract(ABI).at(tokenAddress);
                let value = amount.times(web3.toBigNumber(10).pow(decimals));
                let getData = token.approve.getData(nodeAddress, amount, { from: address });
                let transaction = new Tx(getData);

                if (this.$store.state.user.unlockType == 'keystore') {
                    transaction.sign(this.$store.state.user.wallet.privateKey)
                    //send signed transaction to PM service
                    // .....some code
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    web3.eth.sendTransaction(transaction, (error, result) => {

                    })
                } else if (this.$store.state.user.unlockType == 'metamask') {

                }


            },
            async sendPmt() {
                if (true) {
                    // if token transfer approve
                    this.$router.push({ path: `/registration/3` })
                }
            }
        },
        mounted: async function () {
            console.log(this.$store.state.user.wallet);
            this.nodeList = await this.getNodeList();
            let balance = await this.getBalance(this.$store.state.user.address);
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