<template>
  <v-card>
    <v-card-media
      height="300px"
      :src="product.url"
    />
    <v-card-actions>
      <v-spacer/>
      <span>
        <v-chip label color="pink" text-color="white">
          <v-icon>label</v-icon>{{product.name}}
        </v-chip>
        <v-chip label color="red" outline>
          {{product.price}}
        </v-chip>
      </span>
      <v-btn icon @click="$emit('addToCart')" v-if="$store.getters.isCustomer">
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
