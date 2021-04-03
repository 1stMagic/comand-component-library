<template>
    <a class="box product" href="#" @click.prevent="">
        <div>
            <img v-if="product.img" :src="product.img.src" :alt="product.img.alt" />
            <div class="ribbon-new" v-if="product.new">
                <span>New</span>
            </div>
            <div class="ribbon-discount" v-if="product.discount">
                <span>{{ product.discount }}</span>
            </div>
        </div>
        <div class="box-body">
            <h3>{{ product.name }}</h3>
            <p v-if="product.articleNumber">Article No.: {{ product.articleNumber }}</p>
            <p v-if="product.price" class="price">{{ product.price }}</p>
            <p v-if="product.description">{{ product.description }}</p>
        </div>
    </a>
</template>

<script>
export default {
    name: "CmdBoxProduct",
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
/* begin .box.product --------------------------------------------------------------------------------------------------------------------------------------------------- */
.box.product {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    text-decoration: none;
    overflow: hidden;

    [class*="ribbon"] {
        position: absolute;
        z-index: 10;
        overflow: hidden;
        width: 10rem;
        height: 10rem;
        top: 0;
        left: 0;

        span {
            position: absolute;
            display: block;
            transform: rotate(-45deg);
            width: 100%;
            top: 15%;
            left: -25%;
        }
    }

    .ribbon-discount {
        left: auto;
        right: 0;

        span {
            transform: rotate(45deg);
            right: -20%;
            left: auto;
        }
    }

    > div:first-child {

        > img, > div {
            display: table;
            margin: 0 auto;
        }
    }

    .box-body {
        padding: var(--default-padding);
    }

    footer {
        ul {
            display: flex;
            flex-direction: row;
            margin: 0;

            li {
                flex: 1;
                margin: 0;
                list-style-type: none;

                a {
                    display: block;
                    padding: var(--default-padding);
                }
            }
        }
    }
}
/* end .box.product --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>