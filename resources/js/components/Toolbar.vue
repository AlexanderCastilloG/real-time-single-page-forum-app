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
        <router-link to="/forum">
           <v-btn text>Forum</v-btn>
        </router-link>

        <v-btn text>Ask Question</v-btn>
        <v-btn text>Category</v-btn>

        <router-link to="/login">
        <v-btn text>Login</v-btn>
        </router-link>
      </div>

    </v-toolbar>
  </v-card>
</template>

<script>
export default {
    
}
</script>