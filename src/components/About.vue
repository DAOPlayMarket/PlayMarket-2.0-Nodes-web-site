<template>
    <div v-if="!$store.state.showSpinner" id="about">
        <div class="info_page">
            <h2>Что такое ноды, мастерноды и как на этом заработать</h2>
            <p>Что такое Ноды и Мастер Ноды?
                Когда вы устанавливаете себе на компьютер кошелек, сначала он синхронизируется со всей сетью блокчейн (вся информация с большого количества блоков начинает подгружаться к вам на кошелек). Пока синхронизация не дошла до конца, все предыдущие блоки не погрузились, ваш кошелек считается обычной нодой.
                Ноды – кошелек который не полностью синхронизирован (более 100 Гб) с блокчейн сетью.
            </p>
            <p>
                Полные Ноды (они же полные узлы сети) – полностью синхронизированные с блокчейн кошельки, которые подключены к сети 24/7. Их функция хранить всю информацию об сети и проверять соответствуют ли правилам сети новые транзакции, подтверждая или отвергая их при попытке включить транзакцию в новый блок майнерами.
            </p>
            <div class="info-box">
                <div class="info-stat">
                    <div class="info-stat__header">Активных нод</div>
                    <div class="info-stat__info">9 323</div>
                </div>
                <div class="info-stat">
                    <div class="info-stat__header">Оборот ETH</div>
                    <div class="info-stat__info">100k</div>
                </div>
                <div class="info-stat">
                    <div class="info-stat__header">Доступно приложений</div>
                    <div class="info-stat__info">98k</div>
                </div>
            </div>
            <router-link to="/registration/1" class="btn btn-reg">
                Я все понял, хочу создать ноду
            </router-link >
            <div @click="$store.commit('SHOW_STATISTIC')" class="btn btn-stat">
                Посмотреть подробную статистику
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "about",
        data() {
            return {
            }
        }
    }
</script>

<style scoped lang="sass">
    #about
        width: 100%
        height: 100%
        position: absolute
        top: 0
        left: 0
        z-index: 49
        display: flex
        align-items: center
        justify-content: center
        .info_page
            max-width: 560px
            height: auto
            min-height: 70vh
            margin-top: 70px
            display: flex
            flex-direction: column
            align-items: center
            padding: 45px 25px 30px
            background-color: #fff
            border-radius: 8px
            h2
                padding-bottom: 25px
                font-family: Archive
                font-size: 30px
                line-height: normal
                letter-spacing: 0.3px
                text-align: center
                color: #67777b
            p
                font-family: Roboto
                font-size: 14px
                line-height: 1.29
                letter-spacing: normal
                text-align: center
                color: #67777b
            .info-box
                width: 100%
                padding-top: 25px
                display: flex
                .info-stat
                    width: 33%
                    font-family: Roboto
                    letter-spacing: normal
                    text-align: center
                    color: #67777b
                    .info-stat__header
                        padding-bottom: 10px
                        font-size: 14px
                    .info-stat__info
                        font-weight: 700
                        font-size: 48px
            .btn
                cursor: pointer
            .btn-reg
                height: 44px
                padding: 0 20px
                margin: 40px 0 32px 0
                font-family: Archive,sans-serif
                font-weight: 400
                font-size: 16px
                color: #fff
                width: auto
                display: flex
                align-items: center
                justify-content: center
                border-radius: 22px
                background-color: #00e7d5
                box-shadow: 0 4px 5px 0 rgba(0,231,213,.6)
                &:hover
                    box-shadow: initial
            .btn-stat
                font-family: Roboto
                font-size: 14px
                line-height: normal
                letter-spacing: 0.1px
                text-align: center
                text-decoration: underline
                color: #006f9e
                &:hover
                    text-decoration: none

</style>