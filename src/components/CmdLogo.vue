<template>
    <div class="cmd-logo">
        <a href="./" :title="tooltip">
            <img :src="pathLogo" :alt="altText" />
        </a>
    </div>
</template>

<script>
export default {
    name: "CmdLogo",
    props: {
        tooltip: {
            type: String,
            required: false
        },
        pathLogo: {
            type: String,
            required: true
        },
        altText: {
            type: String,
            required: true /* w3c requirements */
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-logo --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-logo {
    > a {
        display: block;

        img {
            max-height: 15rem;
        }

        @media only screen and (max-width: 1023px) {
            img {
                max-width: 100%;
                max-height: none;
            }
        }
    }
}
/* end cmd-logo --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>