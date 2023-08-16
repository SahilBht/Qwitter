<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end">
        <div class="col">
          <q-input 
            autogrow 
            class="new-qweet" 
            bottom-slots 
            v-model="newQweetContent" 
            label="What's Happening?" 
            counter maxlength="280"
          >
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://en.gravatar.com/userimage/238791459/9af16b535f8cc76c9e3a6ade4cf5e83a.jpeg?size=256">
            </q-avatar>
          </template>
        </q-input>
        </div>
        <div class="col col-shrink"></div>
        <q-btn 
          @click="addNewQweet"
          :disable="!newQweetContent" 
          unelevated 
          rounded 
          class="q-mb-lg" 
          color="primary" 
          label="Qweet" 
          no-caps
        />
      </div>
    <q-separator size="10px" />
      <q-list separator>
        <transition-group
            appear
            enter-active-class="animated fadeInDown"
            leave-active-class="animated fadeOutUp"
        >
          <q-item 
            class="qweet q-py-md" 
            v-for="qweet in qweets"
            :key="qweet.date"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
              <img src="https://en.gravatar.com/userimage/238791459/9af16b535f8cc76c9e3a6ade4cf5e83a.jpeg?size=256">
            </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <strong>Junky</strong>
                <span class="tex-grey-7"> @junkyonahigh
                  <br class="lt-md">
                  &bull; {{ qweet.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body1 ">
                {{ qweet.content }}
              </q-item-label>
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn 
                  flat 
                  round 
                  color="grey" 
                  size="sm" 
                  icon="fa-regular fa-comment" 
                />
                <q-btn 
                  flat 
                  round 
                  color="grey" 
                  size="sm" 
                  icon="fa-solid fa-retweet" 
                />
                <q-btn 
                  flat 
                  round 
                  color="grey" 
                  size="sm" 
                  icon="fa-regular fa-heart" 
                />
                <q-btn 
                  @click="deleteQweet(qweet)"
                  flat 
                  round 
                  color="grey" 
                  size="sm" 
                  icon="fa-solid fa-trash" 
                />
              </div>
            </q-item-section>

            <!-- <q-item-section side top>
              {{ relativeDate | qweet.date }}
            </q-item-section> -->
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
// import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'
import { defineComponent } from 'vue'

export default {
  name: 'PageHome',
  data() {
    return {
      newQweetContent: '',
      qweets: [
      {
        content: "Just discovered a hidden gem of a bookstore tucked away in the heart of the city. There's something magical about the smell of old books and the promise of new adventures. 📚✨ #BookstoreAdventures #LostInWords",
        date: 1692200521117
      },
      {
        content: "Just discovered a hidden gem of a coffee shop ☕️🌿 Loving the cozy vibes and the smell of freshly brewed magic in the air! A perfect spot to fuel my creativity. ✨ #CoffeeAdventures #CozyCorner",
        date: 1692200979899
      },
    ]
    }
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now()
      }
      this.qweets.unshift(newQweet)
      this.newQweetContent=''
    },
    deleteQweet(qweet) {
      const index = this.qweets.findIndex(item => item.date === qweet.date);
      if (index !== -1) {
        this.qweets.splice(index, 1);
      }
    }
  },
  
  filters: {
    relativeDate(value){
      return formatDistance(value, undefined)

    }
  },
  // mounted(){
  //   db.collection("qweets").onSnapshot((snapshot) => {
  //       snapshot.docChanges().forEach((change) => {
  //           if (change.type === "added") {
  //               console.log("New qweet: ", change.doc.data())
  //           }
  //           if (change.type === "modified") {
  //               console.log("Modified qweet: ", change.doc.data())
  //           }
  //           if (change.type === "removed") {
  //               console.log("Removed qweet: ", change.doc.data())
  //           }
  //       })
  //   })
  // }
  
}
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 2px
.qweet
  border-top: 1px solid rgba(0,0,0,0.12)
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
</style>
