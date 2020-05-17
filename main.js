Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>
        <div class="product-info">
            <div class="cart">
              <p>Cart({{ cart }})</p>
            </div>
            <h1>{{title}}</h1>
            <p v-if=" inventory > 10">In Stock</p>
            <p v-else-if="inventory<= 10 && inventory >=1">Stock about to finish</p>
            <ul>
                <li v-for="detail in details">
                {{ detail }}
                </li>
            </ul>
            <div class="color-box"
                v-for="(variant,index) in variants"
                :style = "{backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>
            <button v-on:click="addToCart"
                :disabled ="!inStock"
                :class="{ disabledButton: !inStock}"
                >Add to cart</button>
        </div>
    </div>
  `,
  data() {
    return {
      premium: false,
      brand: "GAP",
      product: "T-shirt",
      selectedVariant: 0,
      inventory: 8,
      details: ["80% cotton", "20% polyster", "Gender-Male"],
      variants: [
        {
          variantId: 2234,
          variantColor: "Black",
          variantImage: "./assets/GAP-black.jpg",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "Red",
          variantImage: "./assets/gap-red.jpg",
          variantQuantity: 0
        }
      ],
      cart: 0
    };
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premium == true) {
        return "Free";
      } else {
        return 299;
      }
    }
  }
});
var app = new Vue({
  el: "#app",
  data: {
    premium: true
  }
});
