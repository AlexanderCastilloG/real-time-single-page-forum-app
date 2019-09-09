<template>
    <v-card
    color="grey lighten-4"
    flat
    height="70px"
    tile
  >
    <v-toolbar dense color="transparent">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title>Bitfumes</v-toolbar-title>

      <div class="flex-grow-1"></div>

       <div>
         <span 
            v-for="item in items"
            :key="item.title"
            >
              <router-link v-if="item.show" :to="item.to">
                <v-btn text>{{ item.title }}</v-btn>
              </router-link>
         </span>
      </div>

    </v-toolbar>
  </v-card>
</template>

<script>
export default {
    data() {
      return {
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