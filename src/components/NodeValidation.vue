<template>
    <div id="validationNode">
        <div class="header">
            Регистрация ноды
        </div>
        <p>Шаг 4 из 4: Настройки ноды</p>
        <node-stage :currStage="4"></node-stage>
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
            <button class="btn" @click="">
                <img src="../assets/images/icon-done.png" alt="">
                Завершить создание ноды
            </button>
        </div>
        <router-link to="/registration/3" class="btn-back">
            Return to the previous step
        </router-link >
    </div>
</template>

<script>
    import NodeStage from '@/components/NodeStage.vue'

    export default {
        name: "node-validation",
        mounted: async function () {
            if (!this.$store.state.user.isUserAuthenticated) {
                this.$router.push({ path: `/registration/1` })
            }
        },
        methods: {
            async sendTransaction() {

            }
        },
        components: {
            NodeStage
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