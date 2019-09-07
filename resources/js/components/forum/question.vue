<template>
  <v-card>
    <v-card-title>
        <div>
          <router-link :to="data.path">
            {{ data.title }}
          </router-link>
            <div class="grey--text subtitle-1">
              {{ data.user }} said {{ data.created_at }}
            </div>
        </div>
    </v-card-title>

    <v-card-text>
        {{ data.body }}
    </v-card-text>

  </v-card>
</template>


<script>
export default {
  props: ['data']
    
}
</script>