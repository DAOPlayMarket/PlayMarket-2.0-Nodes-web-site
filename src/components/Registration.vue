<template>
    <div id="registration">
        <div class="gradient-block"></div>
        <wallet-unlock v-if="$route.params.step == 1"></wallet-unlock>
        <node-settings v-if="$route.params.step == 2"></node-settings>
        <pmt-sending v-if="$route.params.step == 3"></pmt-sending>
        <node-validation v-if="$route.params.step == 4"></node-validation>
    </div>
</template>

<script>
    import WalletUnlock from '@/components/WalletUnlock.vue'
    import PmtSending from '@/components/PmtSending.vue'
    import NodeSettings from '@/components/NodeSettings.vue'
    import NodeValidation from '@/components/NodeValidation.vue'
    export default {
        name: "registration",
        // data () {
        //
        // },
        methods: {

        },
        components: {
            NodeSettings,
            WalletUnlock,
            PmtSending,
            NodeValidation
        }
    }
</script>

<style scoped lang="sass">
#registration
    width: 100vw
    min-height: 100vh
    position: absolute
    top: 0
    left: 0
    z-index: 49
    display: flex
    align-items: center
    justify-content: center
    overflow: hidden
    background-image: linear-gradient(105deg, #dddcdd, #ffffff)
    .gradient-block
        position: absolute
        width: 100vw
        height: 100vh
        right: -45%
        bottom: -28%
        transform: rotate(-45deg)
        background-image: linear-gradient(240deg, #d7d7d7, #ffffff)
</style>