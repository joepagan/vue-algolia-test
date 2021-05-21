import Vue from "vue/dist/vue.js";
import algoliasearch from 'algoliasearch/lite';
import InstantSearch from 'vue-instantsearch';

const searchResults = document.querySelector('.js-search-results');
const { app, key } = searchResults.dataset;
const searchClient = algoliasearch(app, key);

Vue.use(InstantSearch);
(() => new Vue({
  el: '.js-search-results',
  components: {},
  delimiters: ['${', '}'],
  data() {
    return {
      searchClient,
    };
  },
  beforeCreate() {
    console.log('beforecreate');
  },
  created() {
    console.log('created');
    this.$destroy();
  },
  beforeMount() {
    console.log('beforemounted');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeupdate');
  },
  updated() {
    console.log('updated');
  },
  methods: {
    truncateString: (string, maxLength = 50) => {
      if (!string) return null;
      if (string.length <= maxLength) return string;
      return `${string.substring(0, maxLength)}...`;
    },
    getFirstVisibleResultIndex: (page, hitsPerPage) => ((page + 1)
      * hitsPerPage) - hitsPerPage + 1,
    getLastVisibleResultIndex: (page, hitsPerPage, nbHits) => {
      const lastIndex = (page + 1) * hitsPerPage;
      if (lastIndex > nbHits) {
        return nbHits;
      }
      return lastIndex;
    },
    onPageChange() {
      this.$nextTick(() => {
        console.log(this.$el);
        window.scrollTo({
          top: this.$el.offsetTop - 20,
          behavior: 'smooth',
        });
      });
    },
  },
}))();
