<template>
  <div class="account-wrapper latest">
    <h4 class="card-wrap-title volume">Latest Activities</h4>
    <ul role="list" class="latest-list">
      <li
        v-for="transaction in transactions"
        :key="transaction._id"
        class="list-item"
        :class="{
          grean: transaction.transactionType == 'Transfer',
          pink: transaction.transactionType == 'Loan',
          red: transaction.transactionType == 'Deposit',
        }"
      >
        <div class="latest-flex">
          <div class="latest-icon-holder">
            <img
              v-if="transaction.transactionType == 'Transfer'"
              src="https://uploads-ssl.webflow.com/64132ac80aba346e0aa48252/641413102f7f81ab89a821c6_exchange.svg"
              loading="lazy"
              alt=""
              class="volume-icon big"
            />
            <img
              v-else
              src="https://uploads-ssl.webflow.com/64132ac80aba346e0aa48252/641400500eac7c2351f1d064_withdraw.svg"
              loading="lazy"
              alt=""
              class="volume-icon"
            />
          </div>
          <h4 class="latest-title">{{ transaction.transactionType }}</h4>
        </div>
        <div class="latest-body">
          <div class="latest-time">
            {{ getTime(transaction.dateCreated) }},
            {{ formatDate(transaction.dateCreated) }}
          </div>
          <h4 class="latest-value">${{ transaction.amount }}</h4>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: [],
      user: "",
    };
  },
  methods: {
    formatDate(data) {
      const date = new Date(data).getTime(); // Note that month is zero-indexed in JavaScript
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        suffix: (day) => {
          if (day === 1 || day === 21 || day === 31) {
            return "st";
          } else if (day === 2 || day === 22) {
            return "nd";
          } else if (day === 3 || day === 23) {
            return "rd";
          } else {
            return "th";
          }
        },
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    getTime(data) {
      const currentDate = new Date(data);
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let amOrPm = hours >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      // Add leading zeros to minutes
      minutes = minutes < 10 ? "0" + minutes : minutes;

      // Output the formatted time
      return hours + ":" + minutes + " " + amOrPm;
    },
    async getTransactions() {
      try {
        const result = await this.$axios.get(
          `/transactions/?limit=4&username=${this.user.username}&sort=-dateCreated`
        );
        this.transactions = result.data.data;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getUser() {
      try {
        const result = await this.$axios.get(`/users/get-user`);
        this.user = result.data.user;
        this.getTransactions();
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    this.getUser();
  },
};
</script>

<style>
.list-item.pink {
  background: #f8e9f5;
}

.list-item.red {
  background: #fff6f5;
}
</style>
