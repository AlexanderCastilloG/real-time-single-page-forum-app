<template>
    <v-card
    color="grey lighten-4"
    flat
    height="48px"
    tile
  >
    <v-toolbar dense color="indigo" dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title>
        <router-link to="/" class="white--text sinUnderline">
          Bitfumes
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <app-notification v-if="loggedIn"></app-notification>

       <div>
         <span 
            v-for="item in items"
            :key="item.title"
            >
              <router-link v-if="item.show" :to="item.to" class="sinUnderline">
                <v-btn text>{{ item.title }}</v-btn>
              </router-link>
         </span>
      </div>

    </v-toolbar>
  </v-card>
</template>

<script>
import AppNotification from './AppNotification';

export default {
  components: {
    AppNotification
  },
    data() {
      return {
        loggedIn: User.loggedIn(),
        items: [
          { title: 'Forum', to: '/forum', show: true},
          { title: 'Ask Question', to: '/ask', show: User.loggedIn()},
          { title: 'Category', to: '/category', show: User.admin()},
          { title: 'Login', to: '/login', show: !User.loggedIn()},
          { title: 'Logout', to: '/logout', show: User.loggedIn()}
        ]
      }
    },

    created() {
      EventBus.$on('logout', () => {
        User.logout();
      });
    }
}
</script>

<style>
.sinUnderline {
  text-decoration: none;
}
</style>