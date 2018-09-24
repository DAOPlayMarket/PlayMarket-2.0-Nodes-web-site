<template>
    <div id="pmtSend">
        <div class="header">
            Регистрация ноды
        </div>
        <p>Шаг 2 из 4: Регистрация ноды</p>
        <ul class="steps">
            <li class="selected"><img src="../assets/images/icon-load.png" alt=""></li>
            <li class="selected"><img src="../assets/images/icon-pm.png" alt=""></li>
            <li><img src="../assets/images/icon-config.png" alt=""></li>
            <li><img src="../assets/images/icon-done.png" alt=""></li>
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
            <button class="btn">
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
            async getTokenBalance(address) {
                // var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/QLdzys0ezvUkTnMfUYpV"));
                if (this.$store.state.unlockType == 'metamask') {

                }
                var tokenAddress = this.$store.state.contractAddress;
                var tokenContract = web3.eth.contract(this.$store.state.abi).at(tokenAddress);
                var tokenBalance = tokenContract.balanceOf(ethereumAddress).toNumber();
                return tokenBalance;
            }
        },
        mounted: async function () {
            this.nodeList = await this.getNodeList();
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
            &:before
                content: ''
                height: 1px
                width: 100%
                background: #00e7d5
                position: absolute
                top: 50%
                left: 0
                z-index: 43
            li
                height: 48px
                width: 48px
                margin-right: 69px
                border-radius: 100%
                position: relative
                z-index: 45
                display: flex
                align-items: center
                justify-content: center
                background-color: #c6c6c6
                img
            li:nth-child(4)
                margin-right: 0
            .selected
                background-color: #00e7d5
                position: relative
                /*&:before*/
                    /*content: ''*/
                    /*height: 1px*/
                    /*width: 100%*/
                    /*position: absolute*/
                    /*top: 50%*/
                    /*left: 0*/
                    /*z-index: 44*/
                    /*background: #c6c6c6*/
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