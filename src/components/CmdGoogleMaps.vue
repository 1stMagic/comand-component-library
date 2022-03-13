<template>
    <div class="cmd-google-maps responsive-wrapper">
        <iframe :src="locateAddress"></iframe>
    </div>
</template>

<script>
export default {
    name: "CmdGoogleMaps",
    props: {
        /**
         * address to show on Google Maps&trade;
         */
        address: {
            type: Object,
            required: true
        }
    },
    computed: {
        locateAddress() {
            if(this.address) {
                const url = new URL("https://maps.google.de/maps?ie=UTF8&t=&z=17&iwloc=B&output=embed")
                url.searchParams.set("hl", "de")
                url.searchParams.set("q", [this.address.streetNo, this.address.zip, this.address.city, this.address.latitude, this.address.longitude, this.location].join(" ").trim())
                return url.href
            }
            return "https://maps.google.de/maps?ie=UTF8&t=&z=17&iwloc=B&output=embed"
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-google-maps ---------------------------------------------------------------------------------------- */
.cmd-google-maps {
    border: var(--default-border);
}

/* end cmd-google-maps ------------------------------------------------------------------------------------------ */
</style>