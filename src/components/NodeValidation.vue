<template>
    <div id="validationNode">
        <div class="header">
            Регистрация ноды
        </div>
        <p>Шаг 4 из 4: Настройки ноды</p>
        <ul class="steps">
            <li class="selected"><img src="../assets/images/icon-load.png" alt=""></li>
            <li class="selected"><img src="../assets/images/icon-pm.png" alt=""></li>
            <li class="selected"><img src="../assets/images/icon-config.png" alt=""></li>
            <li class="selected"><img src="../assets/images/icon-done.png" alt=""></li>
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