<template>
    <div v-if="!$store.state.showSpinner" id="about">
        <div class="info_page">
            <h2>What is a DAO PlayMarket 2.0 node?</h2>
            <p>
                The node provides an API (application programming interface) for running mobile apps and/or platform sites.
            </p>
            <p>
                Each node has a full node of Ethereum blockchain. When the node is running, the information from smart contracts is constantly synchronized with a NoSQL DBMS (MongoDB).
            </p>
            <p>
                This is necessary to speed up the performance of the node whose API is implemented on Node.js. Node.js allows you to create cross-platform, high-end services.
            </p>
            <p>
                The task of the node at the initial stage is to get information about frequently used apps from the file storage and cache them.
            </p>
            <p>
                Upon request, it transfers them to the mobile app, loads and caches information about new applications.
            </p>

            <!--<div class="info-box">-->
                <!--<div class="info-stat">-->
                    <!--<div class="info-stat__header">Активных нод</div>-->
                    <!--<div class="info-stat__info">9 323</div>-->
                <!--</div>-->
                <!--<div class="info-stat">-->
                    <!--<div class="info-stat__header">Оборот ETH</div>-->
                    <!--<div class="info-stat__info">100k</div>-->
                <!--</div>-->
                <!--<div class="info-stat">-->
                    <!--<div class="info-stat__header">Доступно приложений</div>-->
                    <!--<div class="info-stat__info">98k</div>-->
                <!--</div>-->
            <!--</div>-->
            <router-link to="/registration/1" class="btn btn-reg">
                Registrate node
            </router-link >
            <!--<div @click="$store.commit('SHOW_STATISTIC')" class="btn btn-stat">-->
                <!--Посмотреть подробную статистику-->
            <!--</div>-->
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
            /*min-height: 70vh*/
            min-height: 50vh
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