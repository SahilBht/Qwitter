<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name}}</span>
          <q-icon class="q-pa-md lt-md header-icon" name="fas fa-dove" size="sm" color="primary" />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer :width="283" show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-icon class="q-pa-md" name="fas fa-dove" size="lg" color="primary" />

        <q-list>
        <q-item to="/" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <q-item to="/about" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="info" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <div class="right-drawer-content">
        <q-input outlined static rounded placeholder="Search Qwitter" dense class="q-ma-md">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-scroll-area class="scroll-area">
          <q-list separator padding>
            <q-item v-for="article in articles" :key="article.url" class="q-pa-md">
              <q-item-section>
                <q-item-label overline>
                  <a :href="article.url" class="text-grey no-underline">{{ shortenTitle(article.title) }}</a>
                </q-item-label>
                <q-item-label class="text-weight-bold">{{ shortenDate(article.publishedAt) }}</q-item-label>
                <q-item-label caption>{{ article.description }}</q-item-label>
              </q-item-section>
              <!-- ...other content... -->
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
  async fetchNews() {
    try {
      const response = await fetch(
        'https://gnews.io/api/v4/top-headlines?lang=en&max=10&apikey=e1e878a4bfae10a83ec740b7a5e42a8c'
      );
      const data = await response.json();
      this.articles = data.articles;
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  },
    shortenTitle(title) {
      const words = title.split(' ').slice(0, 5);
      const shortenedTitle = words.join(' ');
      return shortenedTitle.length < title.length
        ? `${shortenedTitle} ...`
        : title;
    },
    shortenDate(dateString) {
      try {
        const date = new Date(dateString);
        if (!isNaN(date)) {
          return date.toISOString().slice(0, 10);
        } else {
          // Handle cases where the date string is not in a valid format
          return 'Invalid Date';
        }
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Error';
      }
    },
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style lang="scss">
  .no-underline{
    text-decoration: none;
  }
  .header-icon{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .right-drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  /* Styling for the scroll area */
  .scroll-area {
    flex: 1;
    overflow-y: auto;
  }
</style>