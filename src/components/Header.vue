<template>
    <header id="header">
        <router-link to="/" id="logo"><span class="logo_text">DAO Playmarket 2.0</span></router-link>
        <div class="links">
            <div class="icon-bell"></div>
            <div id="auth">
                <router-link v-if="!$store.state.user.isUserAuthenticated" :to="'/auth/'">login</router-link>
                <span v-if="$store.state.user.isUserAuthenticated" @click="$store.commit('SET_IS_USER_UNAUTHENTICATED')">
                    <router-link :to="'/'" class="auth-btn">logout</router-link>
                </span>
            </div>
        </div>

    </header>
</template>

<script>
    export default {
        name: 'headerr',
        data() {
            return {
                searchIsOpen: false
            }
        },
        mounted() {

        },
        computed: {

        },
        methods: {
        }
    }
    function isEmpty(str) {
        return (!str || 0 === str.length);
    }
    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    function searchInputFocus() {
        document.getElementById('search__input').focus()
    }
</script>

<style scoped lang="sass">
    #header
        position: fixed
        right: 0
        left: 0
        top: 0
        height: 60px
        z-index: 50
        background-color: #ffffff
        box-shadow: 0 2px 5px 0 #e6e6e6
        display: flex
        align-items: center
        .links
            position: absolute
            display: flex
            align-items: center
            font-family: Roboto
            font-size: 14px
            color: #67777b
            font-weight: 400
            right: 15px
        .icon-bell
            display: inline-block
            width: 18px
            height: 19px
            margin-left: 20px
            background-image: url("../assets/images/icons/icon-bell.svg")
            background-repeat: no-repeat
        .logo_text
            position: absolute
            font-family: Archive
            color: #67777b
            font-size: 14px
            left: 51px
            top: 15px
            white-space: nowrap
            text-transform: uppercase
        #burger-icon
            display: none
            width: 30px
            height: 20px
            position: absolute
            top: 50%
            left: 15px
            transform: translateY(-50%)
            transition: .4s ease-in-out
            cursor: pointer
            @media only screen and (max-width: 991px)
                display: block
            &.opened
                span:nth-child(1), span:nth-child(4)
                    top: 8px
                    width: 0
                    left: 50%
                span:nth-child(2)
                    transform: rotate(45deg)
                span:nth-child(3)
                    transform: rotate(-45deg)
            span
                display: block
                position: absolute
                height: 3px
                width: 100%
                background: #54666b
                border-radius: 5px
                opacity: 1
                left: 0
                transform: rotate(0deg)
                transition: .2s ease-out
                &:nth-child(1)
                    top: 0
                &:nth-child(2), &:nth-child(3)
                    top: 8px
                &:nth-child(4)
                    top: 16px
        #logo
            position: absolute
            top: 50%
            left: 25px
            transform: translateY(-50%)
            display: inline-block
            width: 42px
            height: 42px
            background-position: center
            background-size: contain
            background-repeat: no-repeat
            background-image: url("../assets/images/icons/logo.svg")
            @media only screen and (max-width: 991px)
                left: 50%
                transform: translate3d(-50%, -50%, 0)
        #search
            position: relative
            margin-left: 240px
            height: 35px
            width: 100%
            display: flex
            align-items: center
            max-width: 940px
            border-radius: 17px
            box-sizing: border-box
            border: 0
            padding: 0 20px 0 45px
            box-shadow: 0 3px 5px 0 rgba(239, 234, 212, 0.5)
            @media only screen and (max-width: 1599px)
                max-width: 800px
            @media only screen and (max-width: 1279px)
                max-width: 500px
                margin-left: 200px
            @media only screen and (max-width: 991px)
                display: none
                position: absolute
                top: 0
                left: 0
                bottom: 0
                right: 0
                margin: 0
                max-width: 100%
                height: auto
                padding-right: 70px
                background-color: #fff
                z-index: 15
                border-radius: 0
                box-shadow: none
                &.opened
                    display: flex
            form
                width: 100%
                font-size: 0
            #search__submit
                cursor: pointer
                position: absolute
                z-index: 3
                top: 0
                left: 0
                bottom: 0
                width: 45px
                padding: 0
                border: 0
                border-radius: 17px 0 0 17px
                background-color: transparent
                background-repeat: no-repeat
                background-position: center
                background-image: url("../assets/images/icons/search.png")
            #search__input
                font-weight: 300
                font-size: 14px
                border: 0
                padding: 0
                width: 100%
                background-color: transparent
        #auth
            display: inline-block
            padding: 0 15px
            font-family: Archive
            font-size: 14px
            color: #67777b
            font-weight: 400
            right: 25px

</style>