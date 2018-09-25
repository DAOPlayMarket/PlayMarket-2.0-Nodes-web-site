<template>
    <div id="validationNode">
        <div class="header">
            Регистрация ноды
        </div>
        <p>Шаг 4 из 4: Настройки ноды</p>
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
            <li class="selected">
                <span>
                    <img src="../assets/images/icon-done.png" alt="">
                </span>
                <p>Валидация ноды</p>
            </li>
        </ul>
        <p>
            Все этапы пройдены успешно, пожалуйста дождитесь валидации ноды.
        </p>
        <div class="info">
            <span>
                Статус ноды:
                <p class="values">
                    Ожидает валидацию.
                </p>
            </span>
        </div>
        <div class="settings-btn-wrapper">
            <button class="btn" @click="sendTransaction()">
                <img src="../assets/images/icon-done.png" alt="">
                Завершить создание ноды
            </button>
        </div>
        <router-link to="/registration/3" class="btn-back">
            Вернуться на предыдущий шаг
        </router-link >
    </div>
</template>

<script>


    export default {
        name: "node-validation",
        mounted: async function () {
            if (!this.$store.state.user.isUserAuthenticated) {
                this.$router.push({ path: `/registration/1` })
            }
            // web3.eth.getBalance(web3.eth.accounts[0], (err, balance) => {
            //   console.log(web3.fromWei(balance, "ether") + " ETH");
            // });
        },
        methods: {
            async sendTransaction() {
              console.log('start');
              const fromAccount = '0x4319825eefea536693aba06469e6de0b5e7693fe';
              const toAccount = '0x3094940bbb0f4010104f9cc1f7d2aec827eee14f';
              const amount = '0.0001';

              // Use for example 2
              const gas = "35000";
              const gasPrice = "21000000000";

            // Use for example 2
              if (fromAccount != null && fromAccount.length > 0 &&
                  toAccount != null && toAccount.length > 0 &&
                  amount != null && amount.length > 0 &&
                  gas != null && gas.length > 0 &&
                  gasPrice != null && gasPrice.length > 0
              ) {
                // Example 1: Using the default MetaMask gas and gasPrice
                let message = {from: fromAccount, to:toAccount, value: web3.toWei(amount, 'ether')};
                // console.log(message);
                // Example 2: Setting gas and gasPrice
                // var message = {from: fromAccount, to:toAccount, value: web3.toWei(amount, 'ether'), gas: gas, gasPrice: gasPrice};

                // Example 3: Using the default account
                //web3.eth.defaultAccount = fromAccount;
                //var message = {to:toAccount, value: web3.toWei(amount, 'ether')};
                var result = web3.eth.sign('0x5ee74d1def74ba3316fb217d62d4689d870ce0bf', '0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49',function(error, result){
                    if(!error)
                       console.log(JSON.stringify(result));
                   else
                       console.error(error);
                });
                console.log(result);

                web3.eth.sendTransaction(message, (err, res) => {
                  let output = "";
                  if (!err) {
                    output += res;
                  } else {
                    output = "Error";
                  }
                  console.log(output);
                })
              }
            }
        }
    }
</script>

<style scoped lang="sass">
#validationNode
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
            img
                margin-right: 10px
    .btn-back
        font-family: Roboto
        font-size: 14px
        line-height: normal
        letter-spacing: 0.1px
        text-align: left
        color: #006f9e
        text-decoration: underline
</style>