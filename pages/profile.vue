<template>
  <div class="dashboard-wrapper profile">
    <div class="alert-body" :class="{ hide: !alertBoxStatus }">
      <div class="alert-box">
        <img
          src="/images/Colored-Logo.png"
          loading="lazy"
          alt=""
          class="alert-logo"
        />
        <div class="notice-msg">
          {{ alertBoxMsg }}
        </div>
        <div class="button-holder">
          <span @click="confirmLogout" class="btn-custom w-button">Yes</span>
        </div>
      </div>
    </div>
    <dashboard-navigation />
    <div class="dashboard-content">
      <dashboard-header />
      <div class="content-body">
        <div class="dashboard-card-wrap">
          <div class="personal-form w-form">
            <div class="profile-picture">
              <div
                class="image"
                :style="{
                  backgroundImage: `url(${FILE_URL}/${user.profilePicture})`,
                }"
              ></div>
            </div>
            <div class="form-flex">
              <div class="each-form-field">
                <label for="name" class="label">Username</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  :placeholder="user.username"
                  disabled
                />
              </div>
              <div class="each-form-field">
                <label for="name-2" class="label">First Name</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  :placeholder="user.firstName"
                  disabled
                />
              </div>
              <div class="each-form-field">
                <label for="name-3" class="label">Middle Name</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  :placeholder="user.middleName"
                  disabled
                />
              </div>
              <div class="each-form-field">
                <label for="name-3" class="label">Last Name</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  :placeholder="user.lastName"
                  disabled
                />
              </div>
              <div class="each-form-field">
                <label for="name-2" class="label">Date of Birth</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  disabled
                  :placeholder="`${new Date(user.dob).getDate()}/${new Date(
                    user.dob
                  ).getMonth()}/${new Date(user.dob).getFullYear()}`"
                />
              </div>
              <div class="each-form-field">
                <label for="name-2" class="label">Income Source</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  :placeholder="user.income"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div class="account-wrapper accout">
          <div class="account-header">
            <div>Your Active Account Details</div>
            <img
              src="https://uploads-ssl.webflow.com/64132ac80aba346e0aa48252/6414381497f1d10e44d293ec_switch.svg"
              loading="lazy"
              alt=""
              class="switch"
            />
          </div>
          <div v-if="account" class="personal-form w-form">
            <div class="form-flex">
              <div class="each-form-field full">
                <label for="name-3" class="label">Account Number</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  :placeholder="account.accountNumber"
                />
              </div>
              <div class="each-form-field">
                <label for="name-2" class="label">Account Name</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  :placeholder="account.fullName"
                />
              </div>
              <div class="each-form-field">
                <label for="name-2" class="label">Account Balance</label
                ><input
                  type="text"
                  class="profile-input w-input"
                  maxlength="256"
                  name="name-2"
                  data-name="Name 2"
                  :placeholder="formatMoney(account.balance)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-card-wrap">
          <div class="personal-form w-form">
            <form class="form-flex">
              <div class="each-form-field">
                <label for="name-4" class="label">Email</label
                ><input
                  type="email"
                  class="w-input"
                  :placeholder="user.email"
                />
              </div>
              <div class="each-form-field">
                <label for="name-2" class="label">Password</label
                ><input
                  type="password"
                  class="profile-input w-input"
                  placeholder="Enter Old Password"
                  v-model="oldPassword"
                />
              </div>
              <div class="each-form-field">
                <label for="name-2" class="label">New Password</label
                ><input
                  type="password"
                  class="profile-input w-input"
                  v-model="password"
                  placeholder="Enter New Password"
                />
              </div>
              <div class="each-form-field">
                <label for="name-4" class="label">Confirm Password</label
                ><input
                  type="password"
                  class="profile-input w-input"
                  v-model="cPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <div v-if="showMsg" class="msg" :class="{ error: !colour }">
                {{ msg }}
              </div>
              <div class="button-holder">
                <span @click="processPassword" class="btn-custom w-button"
                  >Change Password</span
                >
              </div>
            </form>
          </div>
        </div>

        <div class="account-wrapper review">
          <h4 class="card-wrap-title volume">Write your review</h4>
          <div class="personal-form w-form">
            <div class="form-flex">
              <div class="each-form-field flex">
                <label for="name-4" class="label">Rating</label
                ><input
                  type="number"
                  class="rating w-input"
                  v-model="rating"
                  placeholder="3.5"
                />
              </div>
              <textarea
                placeholder="Write About Us"
                v-model="review"
                class="text-body w-input"
              ></textarea>
              <div v-if="showMsg" class="msg" :class="{ error: !colour }">
                {{ msg }}
              </div>
              <div class="button-holder">
                <a @click="processReview()" href="#" class="btn-custom w-button"
                  >Save</a
                >
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-card-wrap">
          <div class="personal-form w-form">
            <form class="form-flex">
              <div class="each-form-field">
                <label for="name-2" class="label">New Code</label
                ><input
                  type="number"
                  class="profile-input w-input"
                  v-model="code"
                  placeholder="Enter New Code"
                  maxlength="6"
                />
              </div>

              <div class="each-form-field">
                <label for="name-4" class="label">Confirm Code</label
                ><input
                  type="number"
                  class="profile-input w-input"
                  v-model="cCode"
                  placeholder="Confirm Code"
                  maxlength="6"
                />
              </div>

              <div v-if="showMsg" class="msg" :class="{ error: !colour }">
                {{ msg }}
              </div>
              <div class="button-holder">
                <span @click="processCode" class="btn-custom w-button"
                  >Create Code</span
                >
              </div>
            </form>
          </div>
        </div>
      </div>
      <dashboard-footer />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountIndex: 0,
      oldPassword: "",
      password: "",
      cPassword: "",
      user: "",
      account: "",

      code: "",
      cCode: "",

      rating: "",
      review: "",

      msg: "",
      colour: false,
      showMsg: false,
      alertBoxStatus: false,
      alertBoxMsg: "",
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

    setReview() {
      this.rating = this.user.rating;
      this.review = this.user.review;
    },

    async logout() {
      await this.$auth.logout(); // this method will logout the user and make token to false on the local storage of the user browser
    },

    async processReview() {
      // const form = {
      //   review: this.user.review,
      //   rating: this.user.rating,
      //   reviewStatus: true,
      // };

      const form = new FormData();
      form.append("review", this.review);
      form.append("rating", this.rating);
      form.append("reviewStatus", true);

      try {
        await this.$axios.patch(`/users/${this.user._id}`, form);
        this.colour = true;
        this.showMessage("Your Review was posted successfully!");
      } catch (err) {
        this.showMessage(err.response.data.message);
      }
    },

    showAlertBox() {
      this.alertBoxStatus = true;
    },

    confirmLogout() {
      this.alertBoxStatus = false;
      this.alertBoxMsg = "";
      this.logout();
    },

    async processCode() {
      if (this.code.trim() == "" || this.code.trim().length < 6) {
        this.showMessage("Pin should be at least 6 digits long");
        return;
      }
      if (this.code != this.cCode) {
        this.showMessage("Sorry! Pins do not match, try again");
        return;
      }

      const form = {
        username: this.user.username,
        code: this.code,
        cCode: this.cCode,
      };

      try {
        await this.$axios.patch(`/users/${this.user._id}`, form);
        this.color = false;
        this.showMessage("Your code wass changed successfully");
      } catch (err) {
        this.showMessage(err.response.data.message);
      }
    },

    async processPassword() {
      if (
        this.password == "" ||
        this.oldPassword == "" ||
        this.cPassword == ""
      ) {
        this.showMessage("Please fill in the password fields");
      } else {
        if (this.password != this.cPassword) {
          this.showMessage("Sorry! Passwords do not match, try again");
        } else {
          const form = {
            oldPassword: this.oldPassword,
            password: this.password,
            cPassword: this.cPassword,
          };
          try {
            await this.$axios.patch(`/users/update-password`, form);
            this.color = true;
            this.alertBoxMsg =
              "Your password was changed successfully, please log out to login again.";
            this.showAlertBox();
          } catch (err) {
            this.showMessage(err.response.data.message);
          }
        }
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
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },

  mounted() {
    this.setReview();
    this.getUser();
  },

  head() {
    return {
      link: [
        { rel: "stylesheet", type: "text/css", href: "/css/dashboard.css" },
      ],
    };
  },
};
</script>

<style></style>
