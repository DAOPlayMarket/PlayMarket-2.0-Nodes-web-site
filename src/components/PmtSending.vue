<template>
    <div id="pmtSend">
        <div class="header">
            Node registration
        </div>
        <p>Step 3 of 4: Node registration</p>
        <ul class="steps">
            <li class="selected">
                <span>
                    <img src="../assets/images/icon-load.png" alt="">
                </span>
                <p>Wallet unlock</p>
            </li>
            <li class="selected">
                <span>
                    <img src="../assets/images/icon-pm.png" alt="">
                </span>
                <p>Node settings</p>
            </li>
            <li class="selected">
                <span>
                    <img src="../assets/images/icon-config.png" alt="">
                </span>
                <p>ETH/PMT operation</p>
            </li>
            <li>
                <span>
                    <img src="../assets/images/icon-done.png" alt="">
                </span>
                <p>Node validation</p>
            </li>
        </ul>
        <div v-if="tx != ''" class="transaction">
            <p>Transaction successfully sent. Transaction hash:</p>
            <a class="txHash" :href="$store.state.etherscan + '/tx/' + tx" target="_blank">
                {{ tx }}
            </a>
        </div>
        <div>
            <div class="action-header">
                <ul>
                    <li :class="{blocked: nodeConfirmation, active: depositCollapsed}" @click="selectAction('deposit')">Deposit</li>
                    <li :class="{blocked: pmtDeposit == 0 || ethDeposit == 0, active: refundCollapsed}" @click="selectAction('refund')">Refund</li>
                    <li :class="{blocked: this.collectBalance == 0, active: collectCollapsed}" @click="selectAction('collect')">Collect</li>
                </ul>
            </div>
            <div v-if="!nodeConfirmation && depositCollapsed" class="action-box deposit">
                <div class="info">
                    <p>
                        The cost of registering nodes {{ pmtMin }} PMT, in addition, you must make a deposit of {{ ethMin }} ETH for its needs. To continue, make sure that your wallet ETH has enough PMT tokens to register the node.
                    </p>

                    <div v-if="depositStep == 1" class="info">
                        <p>
                            Deposite making
                        </p>
                        <div class="form-input">
                            Value of PMT to Approve
                            <input type="text" v-model="pmtVal">
                        </div>
                        <div class="pmt-btn-wrapper" style="margin: 20px 0 20px 0;">
                            <button class="btn" @click="TokenApprove()">
                                <img src="../assets/images/icon-pm.png" alt="">
                                Approve PMT
                            </button>
                        </div>
                    </div>

                    <div v-if="depositStep == 2" class="info">
                        <p>
                            Deposit making
                        </p>
                        <div class="form-input">
                            Value of ETH for deposit
                            <input type="text" v-model="ethVal">
                        </div>
                        <div class="pmt-btn-wrapper">
                            <button class="btn" @click="sendPmt()">
                                <img src="../assets/images/icon-pm.png" alt="">
                                Make deposit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="(pmtDeposit != 0 || ethDeposit != 0) && refundCollapsed" class="action-box refund">
                <h2>
                <!--<h2 @click="refundCollapsed = !refundCollapsed">-->
                    Request refund
                </h2>
                <div  class="info">
                <!--<div v-show="!refundCollapsed" class="info">-->
                    <div v-if="!refundStatus" class="form-input">
                        Value of ETH for refund
                        <input type="text" v-model="ethRefund">
                    </div>
                    <div v-if="!refundStatus" class="form-input">
                        Value of PMT for refund
                        <input type="text" v-model="pmtRefund">
                    </div>
                    <div>
                        You can collect your refund after {{ refundTimer }}
                    </div>
                    <div class="pmt-btn-wrapper">
                        <button v-if="!refundStatus" class="btn" @click="requestRefund()">
                            <img src="../assets/images/icon-pm.png" alt="">
                            Request refund
                        </button>
                        <button v-if="refundStatus" class="btn" @click="refund()">
                            <img src="../assets/images/icon-pm.png" alt="">
                            Refund
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="this.collectBalance != 0 && collectCollapsed" class="action-box collect">
                <p>
                    Collect your amount
                </p>
                <div v-if="!collectStatus">
                    <div class="pmt-btn-wrapper">
                        <button class="btn" @click="requestCollectNode()">
                            <img src="../assets/images/icon-pm.png" alt="">
                            Request collect
                        </button>
                    </div>
                </div>
                <div v-if="collectStatus">
                    You can collect your amount after {{ collectTimer }}
                    <div class="pmt-btn-wrapper">
                        <button class="btn" @click="collectNode()">
                            <img src="../assets/images/icon-pm.png" alt="">
                            Collect
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <router-link to="/registration/2" class="btn-back">
            Return to the previous step
        </router-link >
    </div>
</template>

<script>
    import Web3 from 'web3'
    import ethTx from 'ethereumjs-tx'

    export default {
        name: "pmt-sending",
        data() {
            return {
                nodeAddress: '',
                depositStep: 1,
                nodeConfirmation: false,
                refundStatus: false,
                refundTimestamp: 0,
                collectStatus: false,
                collectTimestamp: 0,
                collectBalance: 0,
                refundTimer: '',
                collectTimer: '',
                ethVal: 1,
                ethMin: 1,
                pmtVal: 5000,
                pmtMin: 5000,
                pmtApprove: 0,
                pmtDeposit: 0,
                pmtRefund: 0,
                ethDeposit: 0,
                ethRefund: 0,
                refundCollapsed: false,
                depositCollapsed: true,
                collectCollapsed: false,
                tx: '',
            }
        },
        methods: {
            async TokenApprove() {
                this.$store.commit('SHOW_SPINNER');

                const contractAdr = this.$store.state.contracts.contractPMT;
                const address = this.$store.state.user.address;
                const nodeStorage = this.$store.state.contracts.contractStorage;
                // PMT ABI
                const abi = [
                   {
                       "constant": false,
                       "inputs": [
                           { "name": "_spender", "type": "address" },
                           { "name": "_value", "type": "uint256" }
                       ],
                       "name": "approve",
                       "outputs": [
                           { "name": "success", "type": "bool" }
                       ],
                       "payable": false,
                       "stateMutability": "nonpayable",
                       "type": "function"
                   },
                   {
                       "constant": true,
                       "inputs": [
                           { "name": "_owner", "type": "address" },
                           { "name": "_spender", "type": "address" }
                       ],
                       "name": "allowance",
                       "outputs": [
                           { "name": "", "type": "uint256", "value": "0" }
                       ],
                       "payable": false,
                       "stateMutability": "view",
                       "type": "function"
                   },
                ];
                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);
                let txData = nodeContract.methods.approve(nodeStorage, this.pmtVal * 10000).encodeABI();
                let nonce = await localWeb3.eth.getTransactionCount(address, "pending");
                let gasPrice = await localWeb3.utils.toHex(await localWeb3.eth.getGasPrice());
                let gasLimit = await localWeb3.utils.toHex(await localWeb3.eth.estimateGas({
                    from: address,
                    to: contractAdr,
                    data: txData,
                    value: localWeb3.utils.toHex(0)
                }) + 100000);

                let txParams = {
                    from: address,
                    nonce: localWeb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    value: '0x00',
                    to: contractAdr,
                    data: txData,
                    chainId: this.$store.state.chainId
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();
                    let raw = "0x" + serializedTx.toString("hex");
                    let transaction = await localWeb3.eth.sendSignedTransaction(raw, (err, transactionHash) => {});
                    this.tx = transaction.transactionHash;
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    let transaction = await localWeb3.eth.sendTransaction(txParams, (err, transactionHash) => {});
                    this.tx = transaction.transactionHash;
                } else if (this.$store.state.user.unlockType == 'ledger') {
                    txParams['v'] = "0x0" + this.$store.state.chainId;
                    let tx = new ethTx(txParams);
                    let serialized = tx.serialize().toString('hex');
                    const transportU2F = await TransportU2F.create();
                    const eth = new AppEth(transportU2F);
                    //Подписываем транзакцию LEDGER
                    let svr = await eth.signTransaction("44'/60'/0'/0/0", serialized);
                    txParams['r'] = '0x' + svr.r;
                    txParams['s'] = '0x' + svr.s;
                    txParams['v'] = '0x' + svr.v;
                    let txSigned = new ethTx(txParams);
                    serialized = txSigned.serialize();
                    let raw = "0x" + serialized.toString("hex");
                    let txInfo = await localWeb3.eth.sendSignedTransaction(raw, () => {});
                    this.tx = txInfo.transactionHash;
                }
                this.$store.commit('HIDE_SPINNER');
            },
            async tokenAllowance() {
                const contractAdr = this.$store.state.contracts.contractPMT;
                const nodeStorage = this.$store.state.contracts.contractStorage;
                const address = this.$store.state.user.address;
                // PMT ABI
                const abi = [
                   {
                       "constant": false,
                       "inputs": [
                           { "name": "_spender", "type": "address" },
                           { "name": "_value", "type": "uint256" }
                       ],
                       "name": "approve",
                       "outputs": [
                           { "name": "success", "type": "bool" }
                       ],
                       "payable": false,
                       "stateMutability": "nonpayable",
                       "type": "function"
                   },
                   {
                       "constant": true,
                       "inputs": [
                           { "name": "_owner", "type": "address" },
                           { "name": "_spender", "type": "address" }
                       ],
                       "name": "allowance",
                       "outputs": [
                           { "name": "", "type": "uint256", "value": "0" }
                       ],
                       "payable": false,
                       "stateMutability": "view",
                       "type": "function"
                   },
                ];

                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);
                return nodeContract.methods.allowance(address, nodeStorage).call((err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
            },
            async sendPmt() {
                this.$store.commit('SHOW_SPINNER');

                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;
                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);
                let txData = nodeContract.methods.makeDeposit(address, this.pmtApprove).encodeABI();
                let nonce = await localWeb3.eth.getTransactionCount(address, "pending");
                let gasPrice = await localWeb3.utils.toHex(await localWeb3.eth.getGasPrice());
                let gasLimit = await localWeb3.utils.toHex(await localWeb3.eth.estimateGas({
                    from: address,
                    to: contractAdr,
                    data: txData,
                    value: localWeb3.utils.toHex(localWeb3.utils.toWei(String(this.ethVal)))
                }) + 100000);

                let txParams = {
                    from: address,
                    nonce: localWeb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    value: localWeb3.utils.toHex(localWeb3.utils.toWei(String(this.ethVal))),
                    to: contractAdr,
                    data: txData,
                    chainId: this.$store.state.chainId
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();

                    let raw = "0x" + serializedTx.toString("hex");
                    try {
                        let transaction = await localWeb3.eth.sendSignedTransaction(raw, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    try {
                        let transaction = await localWeb3.eth.sendTransaction(txParams, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'ledger') {
                    txParams['v'] = "0x0" + this.$store.state.chainId;
                    let tx = new ethTx(txParams);
                    let serialized = tx.serialize().toString('hex');
                    const transportU2F = await TransportU2F.create();
                    const eth = new AppEth(transportU2F);
                    let svr = await eth.signTransaction("44'/60'/0'/0/0", serialized);
                    txParams['r'] = '0x' + svr.r;
                    txParams['s'] = '0x' + svr.s;
                    txParams['v'] = '0x' + svr.v;
                    let txSigned = new ethTx(txParams);
                    serialized = txSigned.serialize();
                    let raw = "0x" + serialized.toString("hex");
                    let txInfo = await localWeb3.eth.sendSignedTransaction(raw, () => {});
                    this.tx = txInfo.transactionHash;
                }
                this.$store.commit('HIDE_SPINNER');
            },
            async sendETH() {
                this.$store.commit('SHOW_SPINNER');

                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;

                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);
                let txData = nodeContract.methods.makeDepositETH(address).encodeABI();
                let nonce = await localWeb3.eth.getTransactionCount(address, "pending");
                let gasPrice = await localWeb3.utils.toHex(await localWeb3.eth.getGasPrice());
                let gasLimit = await localWeb3.utils.toHex(await localWeb3.eth.estimateGas({
                    from: address,
                    to: contractAdr,
                    data: txData,
                    value: localWeb3.utils.toHex(String(localWeb3.utils.toWei(String(9))))
                }) + 100000);

                let txParams = {
                    from: address,
                    nonce: localWeb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    value: localWeb3.utils.toHex(String(localWeb3.utils.toWei(String(9)))),
                    to: contractAdr,
                    data: txData,
                    chainId: this.$store.state.chainId
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();

                    let raw = "0x" + serializedTx.toString("hex");
                    try {
                        let transaction = await localWeb3.eth.sendSignedTransaction(raw, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    try {
                        let transaction = await localWeb3.eth.sendTransaction(txParams, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'ledger') {
                    txParams['v'] = "0x0" + this.$store.state.chainId;
                    let tx = new ethTx(txParams);
                    let serialized = tx.serialize().toString('hex');
                    const transportU2F = await TransportU2F.create();
                    const eth = new AppEth(transportU2F);
                    let svr = await eth.signTransaction("44'/60'/0'/0/0", serialized);
                    txParams['r'] = '0x' + svr.r;
                    txParams['s'] = '0x' + svr.s;
                    txParams['v'] = '0x' + svr.v;
                    let txSigned = new ethTx(txParams);
                    serialized = txSigned.serialize();
                    let raw = "0x" + serialized.toString("hex");
                    let txInfo = await localWeb3.eth.sendSignedTransaction(raw, () => {});
                    this.tx = txInfo.transactionHash;
                }
                this.$store.commit('HIDE_SPINNER');
            },
            async getDepositNode() {
                const abi = this.$store.state.contracts.ABI;
                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;

                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);

                try {
                    let result = await nodeContract.methods.getDepositNode(address).call();
                    this.ethDeposit = localWeb3.utils.fromWei(result['ETH'], 'ether');
                    this.pmtDeposit = result['PMT'] / 10000;
                    this.ethMin = localWeb3.utils.fromWei(result['minETH'], 'ether');
                    this.pmtMin = result['minPMT'] / 10000;
                    this.refundStatus = result['refundState'];
                    this.refundTimestamp = result['refundTime'];
                    return true;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            },
            async getRevenueNode() {
                const abi = this.$store.state.contracts.ABI;
                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;

                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);

                try {
                    let amount = await nodeContract.methods.getRevenueNode(address).call();
                    return amount;
                } catch (e) {
                    return 0;
                }
            },
            async requestRefund() {
                this.$store.commit('SHOW_SPINNER');

                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;

                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);
                let txData = nodeContract.methods.requestRefund(localWeb3.utils.toWei(String(this.ethRefund)), String(this.pmtRefund*10000)).encodeABI();
                let gasPrice = await localWeb3.utils.toHex((await localWeb3.eth.getGasPrice()));
                let gasLimit = await localWeb3.utils.toHex(await localWeb3.eth.estimateGas({
                    from: address,
                    to: contractAdr,
                    value: '0x00',
                    data: txData,
                }));

                let nonce = await localWeb3.eth.getTransactionCount(address, "pending");
                let txParams = {
                    from: address,
                    nonce: localWeb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    value: '0x00',
                    to: contractAdr,
                    data: txData,
                    chainId: this.$store.state.chainId
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();
                    let raw = "0x" + serializedTx.toString("hex");
                    try {
                        let transaction = await localWeb3.eth.sendSignedTransaction(raw, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    try {
                        let transaction = await localWeb3.eth.sendTransaction(txParams, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'ledger') {
                    txParams['v'] = "0x0" + this.$store.state.chainId;
                    let tx = new ethTx(txParams);
                    let serialized = tx.serialize().toString('hex');
                    const transportU2F = await TransportU2F.create();
                    const eth = new AppEth(transportU2F);
                    //Подписываем транзакцию LEDGER
                    let svr = await eth.signTransaction("44'/60'/0'/0/0", serialized);
                    txParams['r'] = '0x' + svr.r;
                    txParams['s'] = '0x' + svr.s;
                    txParams['v'] = '0x' + svr.v;
                    let txSigned = new ethTx(txParams);
                    serialized = txSigned.serialize();
                    let raw = "0x" + serialized.toString("hex");
                    let txInfo = await localWeb3.eth.sendSignedTransaction(raw, () => {});
                    this.tx = txInfo.transactionHash;
                }
                this.$store.commit('HIDE_SPINNER');
            },
            async refund() {
                this.$store.commit('SHOW_SPINNER');

                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;

                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);

                let txData = nodeContract.methods.refund().encodeABI();
                let gasPrice = await localWeb3.utils.toHex((await localWeb3.eth.getGasPrice()));
                let gasLimit = await localWeb3.utils.toHex(await localWeb3.eth.estimateGas({
                    from: address,
                    to: contractAdr,
                    data: txData,
                    value: '0x00'
                }));
                let nonce = await localWeb3.eth.getTransactionCount(address, "pending");
                let txParams = {
                    from: address,
                    nonce: localWeb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    value: '0x00',
                    to: contractAdr,
                    data: txData,
                    chainId: this.$store.state.chainId
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();

                    let raw = "0x" + serializedTx.toString("hex");
                    try {
                        let transaction = await localWeb3.eth.sendSignedTransaction(raw, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    try {
                        let transaction = await localWeb3.eth.sendTransaction(txParams, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'ledger') {
                    txParams['v'] = "0x0" + this.$store.state.chainId;
                    let tx = new ethTx(txParams);
                    let serialized = tx.serialize().toString('hex');
                    const transportU2F = await TransportU2F.create();
                    const eth = new AppEth(transportU2F);
                    //Подписываем транзакцию LEDGER
                    let svr = await eth.signTransaction("44'/60'/0'/0/0", serialized);
                    txParams['r'] = '0x' + svr.r;
                    txParams['s'] = '0x' + svr.s;
                    txParams['v'] = '0x' + svr.v;
                    let txSigned = new ethTx(txParams);
                    serialized = txSigned.serialize();
                    let raw = "0x" + serialized.toString("hex");
                    let txInfo = await localWeb3.eth.sendSignedTransaction(raw, () => {});
                    this.tx = txInfo.transactionHash;
                }
                this.$store.commit('HIDE_SPINNER');
            },
            async requestCollectNode() {
                this.$store.commit('SHOW_SPINNER');

                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;

                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);
                let txData = nodeContract.methods.requestCollectNode().encodeABI();
                let gasPrice = await localWeb3.utils.toHex((await localWeb3.eth.getGasPrice()));
                let gasLimit = await localWeb3.utils.toHex(await localWeb3.eth.estimateGas({
                    from: address,
                    to: contractAdr,
                    data: txData,
                }));

                let nonce = await localWeb3.eth.getTransactionCount(address, "pending");
                let txParams = {
                    from: address,
                    nonce: localWeb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    value: '0x00',
                    to: contractAdr,
                    data: txData,
                    chainId: this.$store.state.chainId
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();

                    let raw = "0x" + serializedTx.toString("hex");
                    try {
                        let transaction = await localWeb3.eth.sendSignedTransaction(raw, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    try {
                        let transaction = await localWeb3.eth.sendTransaction(txParams, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'ledger') {
                    txParams['v'] = "0x0" + this.$store.state.chainId;
                    let tx = new ethTx(txParams);
                    let serialized = tx.serialize().toString('hex');
                    const transportU2F = await TransportU2F.create();
                    const eth = new AppEth(transportU2F);
                    //Подписываем транзакцию LEDGER
                    let svr = await eth.signTransaction("44'/60'/0'/0/0", serialized);
                    txParams['r'] = '0x' + svr.r;
                    txParams['s'] = '0x' + svr.s;
                    txParams['v'] = '0x' + svr.v;
                    let txSigned = new ethTx(txParams);
                    serialized = txSigned.serialize();
                    let raw = "0x" + serialized.toString("hex");
                    let txInfo = await localWeb3.eth.sendSignedTransaction(raw, () => {});
                    this.tx = txInfo.transactionHash;
                }
                this.$store.commit('HIDE_SPINNER');
            },
            async collectNode() {
                this.$store.commit('SHOW_SPINNER');

                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;
                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                const nodeContract = new localWeb3.eth.Contract(abi, contractAdr);
                let txData = nodeContract.methods.collectNode().encodeABI();
                let gasPrice = await localWeb3.utils.toHex((await localWeb3.eth.getGasPrice()));

                let gasLimit = await localWeb3.utils.toHex(await localWeb3.eth.estimateGas({
                    from: address,
                    to: contractAdr,
                    data: txData,
                }));

                let nonce = await localWeb3.eth.getTransactionCount(address, "pending");
                let txParams = {
                    from: address,
                    nonce: localWeb3.utils.toHex(nonce),
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    to: contractAdr,
                    data: txData,
                    chainId: this.$store.state.chainId
                };

                if (this.$store.state.user.unlockType == 'keystore') {
                    let tx = new ethTx(txParams);
                    tx.sign(this.$store.state.user.wallet._privKey);
                    let serializedTx = tx.serialize();

                    let raw = "0x" + serializedTx.toString("hex");
                    try {
                        let transaction = await localWeb3.eth.sendSignedTransaction(raw, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'metamask') {
                    try {
                        let transaction = await localWeb3.eth.sendTransaction(txParams, (err, transactionHash) => {});
                        this.tx = transaction.transactionHash;
                    } catch (e) {
                        console.log(e);
                    }
                } else if (this.$store.state.user.unlockType == 'ledger') {
                    txParams['v'] = "0x0" + this.$store.state.chainId;
                    let tx = new ethTx(txParams);
                    let serialized = tx.serialize().toString('hex');
                    const transportU2F = await TransportU2F.create();
                    const eth = new AppEth(transportU2F);
                    //Подписываем транзакцию LEDGER
                    let svr = await eth.signTransaction("44'/60'/0'/0/0", serialized);
                    txParams['r'] = '0x' + svr.r;
                    txParams['s'] = '0x' + svr.s;
                    txParams['v'] = '0x' + svr.v;
                    let txSigned = new ethTx(txParams);
                    serialized = txSigned.serialize();
                    let raw = "0x" + serialized.toString("hex");
                    let txInfo = await localWeb3.eth.sendSignedTransaction(raw, () => {});
                    this.tx = txInfo.transactionHash;
                }
                this.$store.commit('HIDE_SPINNER');
            },
            async getNodeStorage() {
                const abi = this.$store.state.contracts.ABI;
                const contractAdr = this.$store.state.contracts.contractAddress;
                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);

                try {
                   let storge = await nodeContract.methods.NodeStorage().call();
                   this.$store.commit('SET_NODE_STORAGE',
                        {
                            storage: storge,
                        }
                    );
                   return true;
                } catch (e) {
                   return false;
                }
            },
            async getInfoNode() {
                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                const abi = this.$store.state.contracts.ABI;
                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);

                return nodeContract.methods.getInfoNode(address).call((err, result) => {});
            },
            async getConfirmationNode() {
                const abi = this.$store.state.contracts.ABI;
                const contractAdr = this.$store.state.contracts.contractAddress;
                const address = this.$store.state.user.address;
                let localWeb3 = new Web3(this.getWeb3provider(this.$store.state.user.unlockType));

                let nodeContract = new localWeb3.eth.Contract(abi, contractAdr);
                return nodeContract.methods.getConfirmationNode(address).call((err, result) => {
                    if (typeof result != 'undefined') {
                        this.nodeConfirmation = result;
                    }
                });
            },
            selectAction(action) {
                switch (action) {
                    case 'deposit':
                        if (!this.nodeConfirmation) {
                            this.depositCollapsed = true;
                            this.refundCollapsed = false;
                            this.collectCollapsed = false;
                        }
                        break;
                    case 'refund':
                        if (this.pmtDeposit != 0 || this.ethDeposit != 0) {
                            this.depositCollapsed = false;
                            this.refundCollapsed = true;
                            this.collectCollapsed = true;
                        }
                        break;
                    case 'collect':
                        if (this.collectBalance != 0) {
                            this.depositCollapsed = false;
                            this.refundCollapsed = false;
                            this.collectCollapsed = true;
                        }
                        break;
                }
            },
            async getInfo() {
                this.$store.commit('SHOW_SPINNER');
                await this.getNodeStorage();
                let nodeInfo = await this.getInfoNode();
                this.collectStatus = nodeInfo[1];
                this.collectTimestamp = nodeInfo[0];
                this.pmtApprove = await this.tokenAllowance();
                this.nodeConfirmation = await this.getConfirmationNode();
                let depo = await this.getDepositNode();
                this.collectBalance = await this.getRevenueNode();

                if (this.pmtApprove < this.pmtMin && this.pmtDeposit < this.pmtMin && this.pmtDeposit + this.pmtApprove < this.pmtMin) {
                    this.depositStep = 1;
                } else {
                    this.depositStep = 2;
                }

                this.$store.commit('HIDE_SPINNER');
            },
            getWeb3provider(unlockType) {
                if (unlockType == 'keystore' || unlockType == 'ledger') {
                    return new Web3.providers.WebsocketProvider(this.$store.state.contracts.web3provider);
                } else if (unlockType == 'metamask') {
                    if (window.ethereum) {
                        return ethereum;
                    } else if (typeof web3 !== 'undefined') {
                        return window.web3.currentProvider;
                    } else {
                        console.log('MetaMask is not installed')
                        return false;
                    }
                }
            },
        },
        watch: {
            refundTimestamp: function() {
                const date = new Date(this.refundTimestamp*1000);
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                let seconds = "0" + date.getSeconds();
                let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                this.refundTimer = formattedTime;
                return formattedTime
            },
            collectTimestamp: function() {
                const date = new Date(this.collectTimestamp*1000);
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                let seconds = "0" + date.getSeconds();
                let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                this.collectTimer = formattedTime;
            },
        },
        mounted: async function () {
            if (!this.$store.state.user.isUserAuthenticated) {
                this.$router.push({ path: `/registration/1` })
            }
            await this.getInfo();
            let self = this;
            let updater = setTimeout(async function tick() {
                await self.getInfo();
                updater = setTimeout(tick, 300*1000);
            }, 300*1000);
        },
    }
</script>

<style scoped lang="sass">
    #pmtSend
        max-width: 500px
        margin-top: 100px
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
        .transaction
            padding-top: 10px
            padding-bottom: 10px
            p
                font-weight: 600
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

        .action-header
            ul
                display: flex
                text-transform: uppercase
                li
                    padding: 10px
                    margin-right: 15px
                    display: flex
                    justify-content: center
                    background-color: #00e7d5
                    border-radius: 22.5px
                    font-size: 16px
                    font-weight: bold
                    color: #fff
                    cursor: pointer
                    opacity: .3
                    &.active
                        opacity: 1
                    &.blocked
                        opacity: .4
                        cursor: not-allowed
                        background-color: #c6c6c6
        .action-box
            width: 500px
            padding-top: 25px
        .refund
            h2
                font-size: 24px
                padding: 10px 10px 10px 0
        .info
            p
                padding-bottom: 20px
            .values
                font-size: 18px
                line-height: 1
                letter-spacing: 0.5px
                font-weight: 500
            .form-input
                display: flex
                flex-direction: column
                align-items: flex-start
                padding-bottom: 15px
                input
                    width: auto
                    height: 24px
                    padding: 5px 10px
                    border: none
        .pmt-btn-wrapper
            margin: 40px 0 40px 0
            position: relative
            overflow: hidden
            display: inline-block
            cursor: pointer
            padding: 0 4px 7px 0
            .btn
                display: flex
                justify-content: center
                align-items: center
                font-family: Archive
                background-color: #00e7d5
                border: 2px solid #00e7d5
                box-shadow: 0px 4px 5px 0 rgba(0, 231, 213, 0.3)
                color: #fff
                padding: 8px 20px
                border-radius: 22.5px
                font-size: 20px
                cursor: pointer
                text-transform: uppercase
                img
                    margin-right: 10px
        .node-operation
            .node-item
                width: 100%
                height: 109px
                padding: 16px 14px 14px 23px
                background-color: #ffffff
                .header
                    display: flex
                    justify-content: space-between
                    .caption
                        font-family: Archive
                        font-size: 18px
                        line-height: 1
                        text-align: left
                        color: #67777b
                    .status
                        font-family: Roboto
                        font-size: 14px
                        line-height: 1.29
                        letter-spacing: normal
                        color: #00e7d5
                .content
                    display: flex
                    justify-content: space-between
                .info-item
                    display: flex
                    flex-direction: column
                    align-items: flex-end
                    color: #67777b
                    .text
                        font-family: Roboto-Regular
                        size: 14px
                    .information
                        font-family: Roboto-Bold
                        font-size: 24px
                .values
                    display: flex

        .btn-back
            font-family: Roboto
            font-size: 14px
            line-height: normal
            letter-spacing: 0.1px
            text-align: left
            color: #006f9e
            text-decoration: underline
</style>