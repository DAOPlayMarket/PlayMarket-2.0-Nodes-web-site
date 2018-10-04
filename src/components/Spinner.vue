<template>
    <div id="spinner__wrapper" :class="{ 'show': showSpinner }">
        <div id="spinner"></div>
    </div>
</template>

<script>
    export default {
        name: 'spinner',
        data() {
            return {

            }
        },
        mounted: async function () {

        },
        computed: {
            showSpinner: {
                get () {
                    return this.$store.state.showSpinner
                }
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="sass">
    #spinner__wrapper
        display: none
        position: fixed
        top: 0
        left: 0
        bottom: 0
        right: 0
        z-index: 999
        background-color: rgba(255,255,255,0.95)
        /*background-color: rgba(0,0,0,0.6)*/
        align-items: center
        justify-content: center
        &.show
            display: flex
        #spinner
            width: 280px
            height: 280px
            background-image: url("../assets/images/spinner.svg")
            background-size: contain
            background-position: center
</style>