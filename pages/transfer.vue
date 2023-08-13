<template>
  <div class="dashboard-wrapper withdraw">
    <dashboard-navigation />
    <div class="dashboard-content">
      <dashboard-header />
      <div class="content-body">
        <div v-if="!confirmWithdrawal" class="dashboard-card-wrap">
          <div class="card-types">
            <div class="card-types-wrapper">
              <div class="card-title">From Your Active Account</div>
              <div v-if="account" class="type-card select">
                <div class="card-type-flex">
                  <h4 class="type-card-title">Type</h4>
                  <!-- <div>{{ account.accountType }}</div> -->
                  <div>Savings</div>
                </div>
                <div class="card-type-flex">
                  <h4 class="type-card-title">Name</h4>
                  <div>
                    {{
                      `${user.firstName} ${user.middleName} ${user.lastName} `
                    }}
                  </div>
                </div>
                <div class="card-type-flex">
                  <h4 class="type-card-title">Account Number</h4>
                  <div>{{ account.accountNumber }}</div>
                </div>
                <div class="card-type-flex">
                  <h4 class="type-card-title">Balance</h4>
                  <div>{{ formatMoney(user.totalBalance) }}</div>
                </div>
              </div>
              <div style="display: none" class="type-card other select">
                <div class="card-type-flex">
                  <h4 class="type-card-title">Currency</h4>
                  <div>{{ account.currency }}</div>
                </div>
                <div class="card-type-flex">
                  <h4 class="type-card-title">Date</h4>
                  <div>124,110,29</div>
                </div>
                <div class="card-type-flex">
                  <h4 class="type-card-title">Available</h4>
                  <div>189,00</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-title second">
            Enter Account Details To Withdraw To
          </div>
          <div class="personal-form payment-input w-form">
            <div class="form-flex">
              <div class="each-form-field">
                <label for="name-7" class="label">Bank Name</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  v-model="receiverBank"
                  placeholder="Enter Bank Name"
                />
              </div>
              <div class="each-form-field">
                <label for="name-7" class="label">Account Type (optional)</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  v-model="receiverAccountType"
                  placeholder="Account Type (Eg Savings)"
                />
              </div>
              <div class="each-form-field">
                <label for="name-7" class="label">Account Name</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  v-model="receiverName"
                  placeholder="Enter Account Name"
                />
              </div>
              <div class="each-form-field">
                <label for="name-7" class="label">Account Number</label
                ><input
                  type="number"
                  class="profile-input w-input"
                  v-model="receiverAddress"
                  placeholder="Enter Account Number"
                />
              </div>
              <div class="each-form-field">
                <label for="name-7" class="label">Routing Number</label
                ><input
                  type="number"
                  class="profile-input w-input"
                  placeholder="Enter Routing Number"
                />
              </div>
              <div class="each-form-field">
                <label for="name-7" class="label">Amount ($)</label
                ><input
                  type="number"
                  class="profile-input w-input"
                  v-model="amount"
                  placeholder="Enter Amount"
                />
              </div>
              <div v-if="showMsg" class="msg" :class="{ error: !colour }">
                {{ msg }}
              </div>
              <div class="button-holder">
                <span @click="beginWithdrawal" class="btn-custom w-button"
                  >Proceed</span
                ><span class="btn-custom w-button">Cancel</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="dashboard-card-wrap">
          <div class="card-types-wrapper">
            <div class="card-title">Confirm &amp; Send to..</div>
            <div class="type-card select account">
              <div class="card-type-flex">
                <h4 class="type-card-title">Type</h4>
                <div v-if="receiverAccountType">{{ receiverAccountType }}</div>
                <div v-else>Not Available</div>
              </div>
              <div class="card-type-flex">
                <h4 class="type-card-title">Name</h4>
                <div>{{ receiverName }}</div>
              </div>
              <div class="card-type-flex">
                <h4 class="type-card-title">Account Number</h4>
                <div>{{ receiverAddress }}</div>
              </div>
              <div class="card-type-flex">
                <h4 class="type-card-title">Bank</h4>
                <div>{{ receiverBank }}</div>
              </div>
              <div class="card-type-flex">
                <h4 class="type-card-title">Amount</h4>
                <div>{{ amount }}</div>
              </div>
            </div>
          </div>
          <div v-if="!user.pin" class="card-title" style="margin-bottom: 10px">
            You don't have Transaction Pin, create below to proceed
          </div>

          <div v-if="!user.pin" class="each-form-field">
            <label for="name-7" class="label"
              >Enter 6 Digits Transaction Pin</label
            ><input
              type="password"
              maxlength="6"
              class="profile-input w-input"
              v-model="newPin"
              placeholder="Enter Pin"
            />
          </div>
          <div v-if="!user.pin" class="each-form-field">
            <label for="name-7" class="label">Confirm Pin</label
            ><input
              type="password"
              class="profile-input w-input"
              maxlength="6"
              v-model="confirmPin"
              placeholder="Confirm Pin"
            />
          </div>
          <div v-else class="each-form-field">
            <label for="name-7" class="label">Enter Transaction Pin</label
            ><input
              type="password"
              class="profile-input w-input"
              v-model="pin"
              maxlength="6"
              placeholder="Enter Pin"
            />
          </div>

          <div v-if="showMsg" class="msg" :class="{ error: !colour }">
            {{ msg }}
          </div>
          <div class="button-holder">
            <span @click="checkPin" class="btn-custom w-button">Save</span
            ><a href="#" @click="cancelWithdrawal" class="btn-custom w-button"
              >Back</a
            >
          </div>
        </div>
        <dashboard-balance />
        <dashboard-transactions />
        <dashboard-activities />
      </div>
      <dashboard-footer />
    </div>
  </div>
</template>

<script>
import DashboardFooter from "../components/DashboardFooter.vue";
import DashboardTransactions from "../components/DashboardTransactions.vue";
export default {
  data() {
    return {
      receiverBank: "",
      receiverAccountType: "",
      receiverAddress: "",
      receiverName: "",
      amount: 0,
      user: "",
      account: "",
      company: "",

      pin: "",
      newPin: "",
      confirmPin: "",
      routingNumber: "",
      setPin: false,

      confirmWithdrawal: false,

      msg: "",
      colour: false,
      showMsg: false,
    };
  },

  methods: {
    showMessage(msg) {
      this.msg = msg;
      this.showMsg = true;
      setTimeout(() => {
        this.msg = "";
        this.showMsg = false;
      }, 6000);
    },

    formatMoney(amount) {
      if (amount == "" || amount == null || amount == undefined) {
        return "0.00";
      } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },

    beginWithdrawal() {
      if (this.amount < 5) {
        this.showMessage(`You can't transact below 5 ${this.account.currency}`);
        return;
      }
      if (
        this.receiverBank == "" ||
        this.receiverAddress == "" ||
        this.receiverName == ""
      ) {
        this.showMessage("Please fill in the necessary fields above");
        return;
      }
      if (this.amount > this.user.totalBalance) {
        this.showMessage(
          "Sorry you have insufficient fund for this transaction"
        );
      } else {
        this.confirmWithdrawal = true;
      }
    },

    cancelWithdrawal() {
      this.confirmWithdrawal = false;
    },

    checkPin() {
      if (!this.user.pin) {
        if (this.newPin != this.confirmPin) {
          this.showMessage("Sorry your pin do not match!");
          return;
        } else {
          this.setPin = true;
          this.processWithdrawal();
        }
      } else if (this.pin != this.user.pin) {
        this.showMessage("Incorrect pin, please try again");
        return;
      } else if (this.pin == this.user.pin) {
        this.setPin = false;
        this.processWithdrawal();
      }
    },

    async processWithdrawal() {
      const form = {
        amount: this.amount,
        receiverAccountType: this.receiverAccountType,
        receiverAddress: this.receiverAddress,
        receiverBank: this.receiverBank,
        receiverName: this.receiverName,
        newPin: this.newPin,
        confrimPin: this.confirmPin,
        pin: this.pin,
        setPin: this.setPin,
        account: this.account,
        transactionType: "withdrawal",
        username: this.user.username,
        user: this.user,
        date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        dateCreated: new Date().getTime(),
      };

      try {
        await this.$axios.post("/transactions", form);
        this.colour = true;
        this.showMessage("Your transaction was successful.");
        this.$router.push("/transfer");
      } catch (err) {
        this.showMessage(err.response.data.message);
      }
    },

    async getUser() {
      try {
        const result = await this.$axios.get(`/users/get-user`);
        this.user = result.data.user;
        this.getAccount(this.user.username);
      } catch (err) {
        console.log(err);
      }
    },

    async getAccount(username) {
      try {
        const result = await this.$axios.get(`/account/${username}`);
        this.account = result.data.data;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getCompany() {
      try {
        const result = await this.$axios.get("/company");
        this.company = result.data.data[0];
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },

  mounted() {
    this.getUser();
    this.getCompany();
  },

  components: { DashboardFooter, DashboardTransactions },
};
</script>

<style>
.msg {
  width: 100%;
  text-align: left;
}
</style>
