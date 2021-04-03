<template>
    <div class="cmd-address-data">
        <h4 v-if="headline">{{ headline }}</h4>
        <dl class="vard">
            <dt v-if="addressData.address">Address:</dt>
            <dd class="street-address" v-if="addressData.address">
                <a :href="locateAddress" target="_blank" v-if="linkGoogleMaps" title="Open address on GoogleMaps™ in new tab">
                    <span>{{ addressData.address.streetNo }}</span><br />
                    <span class="postal-code">{{ addressData.address.zip }}</span>&nbsp;<span class="locality">{{ addressData.address.city }}</span>
                </a>
                <template v-else>
                    <span>{{ addressData.address.streetNo }}</span><br />
                    <span class="postal-code">{{ addressData.address.zip }}</span>&nbsp;<span class="locality">{{ addressData.address.city }}</span>
                </template>
            </dd>
            <dt v-if="addressData.telephone">Telephone:</dt>
            <dd v-if="addressData.telephone"><a :href="'tel:' + addressData.telephone" title="Call number">{{ addressData.telephone }}</a></dd>
            <dt v-if="addressData.fax">Fax:</dt>
            <dd v-if="addressData.fax">{{ addressData.fax }}</dd>
            <dt v-if="addressData.email">E-Mail:</dt>
            <dd class="email" v-if="addressData.email"><a :href="'mailto:' + addressData.email">{{ addressData.email }}</a></dd>
        </dl>
    </div>
</template>

<script>
export default {
    name: "CmdAddressData",
    props: {
        headline: {
            type: String,
            required: false
        },
        addressData: {
            type: Object,
            required: true
        },
        linkGoogleMaps: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        locateAddress() {
            return "https://www.google.com/maps/place/" + this.addressData.address.streetNo + ", " + this.addressData.address.zip + " " + this.addressData.address.city
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-address-data --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-address-data  {
    dd {
        margin-bottom: var(--default-margin);
    }
}
/* end cmd-address-data --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>