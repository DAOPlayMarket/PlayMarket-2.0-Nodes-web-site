<template>
    <div id="information">
            <div class="header">
                Node registration
            </div>
            <p>Step 1 of 4: Node registration</p>
            <ul class="steps">
                <li class="selected">
                    <span>
                        <img src="../assets/images/icon-load.png" alt="">
                    </span>
                    <p>Wallet unlock</p>
                </li>
                <li>
                    <span>
                        <img src="../assets/images/icon-pm.png" alt="">
                    </span>
                    <p>Node Settings</p>
                </li>
                <li>
                    <span>
                        <img src="../assets/images/icon-config.png" alt="">
                    </span>
                    <p>Making deposit</p>
                </li>
                <li>
                    <span>
                        <img src="../assets/images/icon-done.png" alt="">
                    </span>
                    <p>Node validation</p>
                </li>
            </ul>

            <ul class="unlock-list">
                <li>
                    <input type="radio" name="unlockType" v-model="unlockType" value="keystore">
                    <span class="text-wrap">
                        <p>Through keystore</p>
                    </span>
                    <span class="checkmark"></span>
                </li>
                <!--<li>-->
                    <!--<input type="radio" name="unlockType" v-model="unlockType" value="metamask">-->
                    <!--<span class="text-wrap">-->
                        <!--<p>Metamask service</p>-->
                    <!--</span>-->
                    <!--<span class="checkmark"></span>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<input type="radio" name="unlockType" v-model="unlockType" value="ledger">-->
                    <!--<span class="text-wrap">-->
                        <!--<p>Ledger keystore</p>-->
                    <!--</span>-->
                    <!--<span class="checkmark"></span>-->
                <!--</li>-->
            </ul>

            <div class="info">
                <p>
                        Entering your private key on a website dangerous. If our website is compromised or you accidentally visit a different website, your funds will be stolen. Please consider:
                </p>
            </div>
            <div v-if="this.unlockType == 'metamask'" class="upload-btn-wrapper">
                <button class="btn" @click="loginMetamask()">
                    <!--<svg xmlns="http://www.w3.org/2000/svg" width="31" height="28" style="padding-right: 18px">-->
                        <!--<path fill="#FBFAFC" fill-rule="evenodd" d="M30.301 2.206c0-.444-.168-.849-.485-1.173a1.597 1.597 0 0 0-1.152-.486H2.356c-.439 0-.838.169-1.153.489-.316.32-.483.724-.483 1.17v21.141c0 .479.163.908.47 1.242.318.348.72.531 1.166.531h7.814c.439 0 .838-.17 1.154-.49.315-.32.483-.724.483-1.17 0-.443-.168-.848-.485-1.172a1.599 1.599 0 0 0-1.152-.486H4.049V8.993h22.923v12.809h-6.009c-.439 0-.838.169-1.154.489-.316.32-.482.724-.482 1.169 0 .447.165.851.48 1.169.316.321.716.491 1.156.491h7.701a1.55 1.55 0 0 0 1.164-.529c.309-.337.473-.767.473-1.244V2.206zM6.341 4.327V5.96H4.049V3.921H6.341v.406zm5.004 0V5.96H9.052V3.921h2.293v.406zm5.002 0V5.96H14.055V3.921H16.347v.406zm10.625 0V5.96H19.058V3.921H26.972v.406zM22.37 19.815a1.545 1.545 0 0 1-1.126.461c-.383 0-.763-.14-1.128-.415l-.063-.055-2.243-2.283-.683-.695v8.778c0 .443-.167.848-.48 1.168a1.604 1.604 0 0 1-2.31.002 1.635 1.635 0 0 1-.483-1.17v-8.783l-.682.691-2.298 2.328c-.374.329-.762.495-1.154.495-.392 0-.78-.167-1.153-.495l-.055-.056c-.658-.767-.656-1.579-.002-2.337l.03-.031 5.821-5.841a1.74 1.74 0 0 1 1.149-.431c.439 0 .829.159 1.126.46l5.734 5.813c.761.773.761 1.624 0 2.396z"/>-->
                    <!--</svg>-->
                    Login with Metamask
                </button>
            </div>
            <div v-if="this.unlockType == 'keystore'">
                <div class="upload-btn-wrapper">
                    <button class="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="28" style="padding-right: 18px">
                            <path fill="#FBFAFC" fill-rule="evenodd" d="M30.301 2.206c0-.444-.168-.849-.485-1.173a1.597 1.597 0 0 0-1.152-.486H2.356c-.439 0-.838.169-1.153.489-.316.32-.483.724-.483 1.17v21.141c0 .479.163.908.47 1.242.318.348.72.531 1.166.531h7.814c.439 0 .838-.17 1.154-.49.315-.32.483-.724.483-1.17 0-.443-.168-.848-.485-1.172a1.599 1.599 0 0 0-1.152-.486H4.049V8.993h22.923v12.809h-6.009c-.439 0-.838.169-1.154.489-.316.32-.482.724-.482 1.169 0 .447.165.851.48 1.169.316.321.716.491 1.156.491h7.701a1.55 1.55 0 0 0 1.164-.529c.309-.337.473-.767.473-1.244V2.206zM6.341 4.327V5.96H4.049V3.921H6.341v.406zm5.004 0V5.96H9.052V3.921h2.293v.406zm5.002 0V5.96H14.055V3.921H16.347v.406zm10.625 0V5.96H19.058V3.921H26.972v.406zM22.37 19.815a1.545 1.545 0 0 1-1.126.461c-.383 0-.763-.14-1.128-.415l-.063-.055-2.243-2.283-.683-.695v8.778c0 .443-.167.848-.48 1.168a1.604 1.604 0 0 1-2.31.002 1.635 1.635 0 0 1-.483-1.17v-8.783l-.682.691-2.298 2.328c-.374.329-.762.495-1.154.495-.392 0-.78-.167-1.153-.495l-.055-.056c-.658-.767-.656-1.579-.002-2.337l.03-.031 5.821-5.841a1.74 1.74 0 0 1 1.149-.431c.439 0 .829.159 1.126.46l5.734 5.813c.761.773.761 1.624 0 2.396z"/>
                        </svg>
                        Select wallet file
                    </button>
                    <input type="file" @change="readKeystore" />
                </div>
                <div class="password-wrapper" v-if="keystore !== null">
                    <input type="password" v-model="password" placeholder="Password">
                    <div class="error-msg" v-if="errorMsg !== null">
                        Wrong passphrase
                    </div>
                </div>
                <button class="btn-unlock" v-if="password !== ''" @click="unlockWallet">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="27" style="padding-right: 18px">
                        <path fill="#FBFAFC" fill-rule="evenodd" d="M-.005 24.439V13.121a.9.9 0 0 1 .29-.682c.194-.183.432-.274.716-.274h13.026V7.876c0-1.218-.406-2.254-1.217-3.107-.803-.815-1.742-1.223-2.818-1.223s-2.015.408-2.818 1.223c-.803.844-1.203 1.879-1.203 3.107v1.097H2.303V7.876c0-1.05.196-2.052.588-3.009a8.043 8.043 0 0 1 1.635-2.53A7.369 7.369 0 0 1 6.983.622 7.456 7.456 0 0 1 9.992.003a7.51 7.51 0 0 1 3.016.619 7.353 7.353 0 0 1 2.463 1.715 7.94 7.94 0 0 1 1.629 2.53c.387.957.581 1.959.581 3.009v4.289h1.316a1 1 0 0 1 .715.274c.194.182.29.41.29.682v11.318c0 .243-.077.426-.233.548-.156.122-.413.257-.772.408-.188.084-.524.201-1.005.351-.481.15-1.121.326-1.919.527-.798.202-1.744.373-2.839.513a25.357 25.357 0 0 1-3.242.211c-2.992 0-5.99-.534-8.991-1.602-.321-.104-.569-.228-.744-.373a.722.722 0 0 1-.262-.583zm5.423-4.914c0 .229.081.424.241.583l2.478 2.405c.16.158.358.239.594.239.255 0 .454-.081.595-.239l5.084-4.936a.814.814 0 0 0 .254-.597.818.818 0 0 0-.254-.598.814.814 0 0 0-.595-.239.814.814 0 0 0-.595.239l-4.489 4.359-1.855-1.8a.831.831 0 0 0-.608-.253.833.833 0 0 0-.609.253.795.795 0 0 0-.241.584z"/>
                    </svg>
                    Unlock
                </button>
            </div>
            <div v-if="this.unlockType == 'ledger'">

            </div>
        </div>
</template>

<script>
    import Web3 from 'web3'
    import ethWallet from 'ethereumjs-wallet'
    import AppEth from "@ledgerhq/hw-app-eth"
    import TransportU2F from "@ledgerhq/hw-transport-u2f"


    const readUploadedFileAsText = (inputFile) => {
        let f = new FileReader();
        return new Promise((resolve, reject) => {
            f.onerror = () => {
                f.abort();
                reject(new DOMException("Problem parsing file."));
            };
            f.onload = () => {
                resolve(f.result);
            };
            f.readAsText(inputFile);
        });
    };

    const getEthAddress = async () => {
      const transport = await TransportU2F.create();
      const eth = new AppEth(transport);
      const result = await eth.getAddress("44'/60'/0'/0/0");
      return result;
    };

    export default {
        name: "wallet-unlock",
        data () {
            return {
                unlockType: 'keystore',
                keystore: null,
                password: '',
                unlocked: false,
                errorMsg: null
            }
        },
        methods: {
            async readKeystore(e) {
                let data = e.target.files[0];
                if (typeof data !== 'undefined') {
                    try {
                        let fileContents = await readUploadedFileAsText(data);
                        this.keystore = fileContents;
                    } catch (e) {
                        this.keystore = null;
                        this.errorMsg = 'Incorrect type of file';
                    }
                }
            },
            async unlockWallet() {
                try {
                    this.$store.commit('SHOW_SPINNER');
                    let myWallet = ethWallet.fromV3(this.keystore, this.password, true);
                    this.$store.commit('HIDE_SPINNER');
                    let address = await myWallet.getAddressString();
                    this.$store.commit('SET_IS_USER_AUTHENTICATED',
                        {
                            isAuth: true,
                            address: address,
                            wallet: myWallet,
                            type: 'keystore'
                        }
                    );
                    this.errorMsg = null;
                    this.$router.push({ path: `/registration/2` })
                } catch(e) {
                    console.log('e.message:', e.message);
                    this.errorMsg = e.message;
                    this.$store.commit('HIDE_SPINNER');
                }
            },
            async loginMetamask() {
                if (typeof web3 !== 'undefined') {
                   //check that metaMask is installed
                    const localWeb3 = new Web3(window.web3.currentProvider);
                    localWeb3.eth.getAccounts().then(account => {
                        let address = account[0];
                        if (typeof address !== 'undefined') {
                            this.$store.commit('SET_IS_USER_AUTHENTICATED',
                                {
                                    isAuth: true,
                                    address: address,
                                    type: 'metamask'
                                }
                            );
                            this.$router.push({ path: `/registration/2` })
                        } else {
                            //user is not auth in metamask
                        }
                    });
                }
            },
            async getContractAddress() {
                const localweb3 = new Web3(new Web3.providers.WebsocketProvider(this.$store.state.contracts.web3provider));
                const contractAdr = this.$store.state.contracts.contractProxy;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.proxyABI;
                let nodeContract = new localweb3.eth.Contract(abi, contractAdr);

                return nodeContract.methods.getLastVersion().call((err, result) => {
                    // console.log(err)
                    // console.log(result.PlayMarket)
                    // console.log(result)
                });
            },
        },
        mounted: async function () {
            // getEthAddress().then(a => console.log(a));
            let versions = await this.getContractAddress();
            if (typeof versions != 'undefined') {
                let contractAddress = versions.PlayMarket;
                this.$store.commit(
                    'SET_MAIN_CONTRACT',
                    {
                        address: contractAddress,
                    }
                );
            }
        },
    }
</script>

<style scoped lang="sass">
#information
    max-width: 500px
    padding-right: 420px
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
                    width: 100%
                    position: absolute
                    top: 24px
                    left: -15px
                    z-index: 44
                    background: #00e7d5
                img
                    z-index: 45
    .unlock-list
        li
            padding: 15px
            position: relative
            z-index: 45
            display: flex
            .checkmark
                position: absolute
                top: 15px
                left: 17px
                height: 15px
                width: 15px
                background-color: inherit
                border: 1px #00e7d5 solid
                border-radius: 2px
                z-index: 40
                &:after
                    content: ""
                    position: absolute
                    display: none
                    top: 0
                    left: 4px
                    width: 5px
                    height: 10px
                    border: white solid
                    border-width: 0 2px 2px 0
                    transform: rotate(45deg)
            input
                height: 100%
                width: 100%
                position: absolute
                opacity: 0
                cursor: pointer
                z-index: 45
            input[type="radio"]:checked ~ .checkmark
                background-color: #00e7d5
            input[type="radio"]:checked ~ .checkmark:after
                display: block
            .text-wrap
                padding-left: 30px
            input[type="radio"]:checked ~ .text-wrap
                &:before
                    content: ''
                    height: 45px
                    width: 100%
                    /*background: #00e7d5*/
                    background: #fff
                    position: absolute
                    top: 0
                    left: 0
                    z-index: 10
                    box-shadow: 0 0 2px 2px rgba(0, 231, 213, 0.1)
                &:after
                    content: ""
                    position: absolute
                    top: 18px
                    right: 17px
                    width: 7px
                    height: 7px
                    border: rgba(103, 119, 123, 0.6) solid
                    border-width: 0 2px 2px 0
                    transform: rotate(-45deg)
                    z-index: 11
                p
                    z-index: 11
                    position: relative
    .info
        padding-top: 35px
    .upload-btn-wrapper
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
            cursor: pointer
        input[type=file]
            font-size: 100px
            position: absolute
            left: 0
            top: 0
            opacity: 0
    .password-wrapper
        display: flex
        /*align-items: center*/
        justify-content: center
        flex-direction: column
        width: 464px
        height: 120px
        padding-left: 32px
        padding-right: 32px
        border-radius: 2px
        background-color: #ffffff
        box-shadow: 0px 4px 5px 0 rgba(103, 119, 123, 0.11)
        input
            width: 359px
            height: 35px
            padding-left: 8px
            border-radius: 2px
            background-color: #e8e8e8
            border: solid 1px #e8e8e8
            /*border: solid 1px #06d6a0*/
            font-size: 24px
            font-weight: bold
            text-align: left
            color: #67777b
            &::placeholder
                font-weight: 300
                opacity: 0.5
        .error-msg
            padding: 16px 0 0 0
            width: 100%
            font-family: Roboto
            font-size: 14px
            text-align: left
            color: #ED1C24
    .btn-unlock
        cursor: pointer
        margin-top: 49px
        display: flex
        align-items: center
        justify-content: center
        width: 153px
        height: 45px
        border: none
        border-radius: 22.5px
        background-color: #00e7d5
        box-shadow: 0 4px 5px 0 rgba(0, 231, 213, 0.6)
        font-size: 17px
        color: #ffffff
        font-weight: bold
</style>