<template>
  <div class="news">
    <home-header />
    <div class="news-hero wf-section">
      <div class="contain">
        <div class="blog-hero-holder">
          <div class="div-block-53">
            <h1 class="headings change">Blog</h1>
          </div>
          <div>
            <div class="sub-hero-texts change-color">
              <a href="#" class="link change-color">Home </a>/ Blog
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="news-content wf-section">
      <div class="contain">
        <div class="blog-content-holder">
          <div class="first-blog-content-holder">
            <div v-for="blog in blogs" :key="blog._id" class="blog-holder">
              <div class="blog-link-background-holder">
                <nuxt-link
                  :to="`/news-details/${blog._id}`"
                  class="blog-link-background w-inline-block"
                  :style="{
                    backgroundImage: `url(${FILE_URL}/${blog.banner})`,
                  }"
                ></nuxt-link>
              </div>
              <div class="blog-bottom-text-holder">
                <div class="blog-bottom-link-holder">
                  <div class="div-block-101">
                    <a href="#" class="news-text-link">Adivce,</a>
                  </div>
                  <a href="#" class="news-text-link">AS Finance</a>
                </div>
                <div class="blog-icon-holder">
                  <a href="#" class="comment-amount-holder w-inline-block"
                    ><img
                      src="https://uploads-ssl.webflow.com/6405430dbac1369b9494f2e3/64062db80c1ec3bec200ef36_send-message-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="image-29"
                    />
                    <div class="link-amount">0</div></a
                  ><a
                    href="#"
                    class="comment-amount-holder change w-inline-block"
                    ><img
                      src="https://uploads-ssl.webflow.com/6405430dbac1369b9494f2e3/64085c037186c673b80086a6_Group.svg"
                      loading="lazy"
                      alt=""
                      class="image-30"
                    />
                    <div class="div-block-104">
                      <div class="div-block-107">
                        <div class="link-amount">2</div>
                        <div class="link-amount">2</div>
                      </div>
                    </div></a
                  >
                </div>
              </div>
              <div class="news-head-link-holder">
                <nuxt-link
                  :to="`/news-details/${blog._id}`"
                  class="news-head-link"
                  >{{ blog.title }}</nuxt-link
                >
              </div>
              <div class="blog-content-text-holder">
                <div class="blog-content-text">
                  {{ blog.content.slice(0, 100) }}...
                </div>
              </div>
              <div class="news-text-link-holder">
                <nuxt-link
                  :to="`/news-details/${blog._id}`"
                  class="news-text-link"
                  >Read More</nuxt-link
                >
              </div>
              <div class="last-news-text-holder">
                <div class="hold-last-news-text">
                  <div class="last-news-text">
                    {{ formatDate(blog.date) }} -
                  </div>
                </div>
                <a href="#" class="last-news-texts-link">cmsmasters</a>
              </div>
            </div>
          </div>
          <aside-news />
        </div>
      </div>
    </div>
    <home-footer />
  </div>
</template>

<script>
import AsideNews from "../components/AsideNews.vue";
import HomeFooter from "../components/home/HomeFooter.vue";
export default {
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    loadScript() {
      if (!process.server) {
        let el = document.getElementById("script");

        if (el != undefined) {
          document.body.removeChild(el);
        }

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "/scripts/home.js";
        script.async = true;
        script.id = "script";
        const app = document.querySelector("#footer");
        if (app) {
          app.appendChild(script);
        } else {
          console.error("Could not find app node to append script element");
        }
      }
    },

    async getBlogs() {
      try {
        const result = await this.$axios.get("/blog");
        this.blogs = result.data.data;
      } catch (err) {
        console.log(err.response);
      }
    },
    formatDate(data) {
      if (data == null || data == undefined) {
        return "N/A";
      }
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
  },
  mounted() {
    this.loadScript();
    this.getBlogs();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
  components: { HomeFooter, AsideNews },
};
</script>

<style></style>
