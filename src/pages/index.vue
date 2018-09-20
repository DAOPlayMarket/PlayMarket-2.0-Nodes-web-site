<template>
    <div id="index">
        <YMap></YMap>
        <About></About>
        <NodeStat></NodeStat>
    </div>
</template>

<script>
    import axios from 'axios'
    import YMap from '@/components/yMap.vue'
    import About from '@/components/About.vue'
    import NodeStat from '@/components/NodeStatistic.vue'

    export default {
        name: 'index',
        metaInfo () {
            return {
            }
        },
        data () {
            return {
                server: this.$store.state.server,
                options: {

                },
            }
        },
        computed: {

        },
        mounted: async function () {

        },
        methods: {

        },
        components: {
            YMap,
            About,
            NodeStat
        }
    }
</script>

<style scoped lang="sass">
    .bounce-enter-active
      animation: bounce-in .5s
    .bounce-leave-active
      animation: bounce-in .5s reverse
    @keyframes bounce-in
      0%
        transform: scale(0)
      50%
        transform: scale(1.5)
      100%
        transform: scale(1)


</style>