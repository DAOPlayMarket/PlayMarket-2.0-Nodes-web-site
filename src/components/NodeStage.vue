<template>
    <ul class="steps">
        <li v-bind:class="{ selected: currStage >= 1 }">
            <span>
                <img src="../assets/images/icon-load.png" alt="">
            </span>
            <p>Wallet unlock</p>
        </li>
        <li v-bind:class="{ selected: currStage >= 2 }">
            <span>
                <img src="../assets/images/icon-config.png" alt="">
            </span>
            <p>Node Settings</p>
        </li>
        <li v-bind:class="{ selected: currStage >= 3 }">
            <span>
                <img src="../assets/images/icon-pm.png" alt="">
            </span>
            <p>Making deposit</p>
        </li>
        <li v-bind:class="{ selected: currStage >= 4 }">
            <span>
                <img src="../assets/images/icon-done.png" alt="">
            </span>
            <p>Node validation</p>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "node-stage",
        props: ['currStage'],
        data () {
            return {
                stageImgs: [
                    '../assets/images/icon-load.png',
                    '../assets/images/icon-pm.png',
                    '../assets/images/icon-config.png',
                    '../assets/images/icon-done.png'
                ],
                stageNames: [
                    'Wallet unlock',
                    'Node settings',
                    'ETH/PMT operation',
                    'Node validation'
                ]
            }
        },
    }
</script>

<style scoped lang="sass">
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

</style>