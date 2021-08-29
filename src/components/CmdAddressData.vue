<template>
    <div class="cmd-address-data vcard">
        <h4 v-if="headline">{{ headline }}</h4>
        <address class="adr">
            <dl v-if="showLabels">
                <dt v-if="addressData.company">Company:</dt>
                <dd class="org">{{ addressData.company }}</dd>
                <dt v-if="addressData.address">Address:</dt>
                <dd v-if="addressData.address">
                    <a :href="locateAddress" target="_blank" v-if="linkGoogleMaps"
                       title="Open address on GoogleMaps™ in new tab">
            <span class="street-address" v-if="addressData.address.streetNo">{{
                    addressData.address.streetNo
                }}</span><br/>
                        <span class="postal-code" v-if="addressData.address.zip">{{ addressData.address.zip }}</span>&nbsp;<span
                        class="locality" v-if="addressData.address.city">{{ addressData.address.city }}</span>
                        <span class="country-name" v-if="addressData.country">{{ addressData.country }}</span>
                    </a>
                    <template v-else>
            <span class="street-address" v-if="addressData.address.streetNo">{{
                    addressData.address.streetNo
                }}</span><br/>
                        <span class="postal-code" v-if="addressData.address.zip">{{ addressData.address.zip }}</span>&nbsp;<span
                        class="locality" v-if="addressData.address.city">{{ addressData.address.city }}</span>
                        <span class="country-name" v-if="addressData.country">{{ addressData.country }}</span>
                    </template>
                </dd>
                <dt v-if="addressData.telephone">Telephone:</dt>
                <dd v-if="addressData.telephone"><a :href="'tel:' + addressData.telephone" title="Call number"
                                                    class="tel">{{ addressData.telephone }}</a></dd>
                <dt v-if="addressData.fax">Fax:</dt>
                <dd v-if="addressData.fax" class="fax">{{ addressData.fax }}</dd>
                <dt v-if="addressData.email">E-Mail:</dt>
                <dd class="email" v-if="addressData.email"><a :href="'mailto:' + addressData.email"
                                                              class="email">{{ addressData.email }}</a></dd>
            </dl>
            <ul v-else class="flex-container">
                <li v-if="addressData.company">
                    <span> class="org">{{ addressData.company }}</span>
                </li>
                <li>
                    <a :href="locateAddress" target="_blank" v-if="linkGoogleMaps"
                       title="Open address on GoogleMaps™ in new tab">
            <span class="street-address" v-if="addressData.address.streetNo">{{
                    addressData.address.streetNo
                }}</span><br/>
                        <span class="postal-code" v-if="addressData.address.zip">{{ addressData.address.zip }}</span>&nbsp;<span
                        class="locality" v-if="addressData.address.city">{{ addressData.address.city }}</span>
                        <span class="country-name" v-if="addressData.country">{{ addressData.country }}</span>
                    </a>
                    <template v-else>
            <span class="street-address" v-if="addressData.address.streetNo">{{
                    addressData.address.streetNo
                }}</span><br/>
                        <span class="postal-code" v-if="addressData.address.zip">{{ addressData.address.zip }}</span>&nbsp;<span
                        class="locality" v-if="addressData.address.city">{{ addressData.address.city }}</span>
                        <span class="country-name" v-if="addressData.country">{{ addressData.country }}</span>
                    </template>
                </li>
                <li v-if="addressData.telephone">
                    <a :href="'tel:' + addressData.telephone" title="Call number" class="tel">{{
                            addressData.telephone
                        }}</a>
                </li>
                <li v-if="addressData.fax"><span class="fax">{{ addressData.fax }}</span></li>
                <li v-if="addressData.email"><a :href="'mailto:' + addressData.email" class="email">{{
                        addressData.email
                    }}</a>
                </li>
            </ul>
        </address>
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
        showLabels: {
            type: Boolean,
            default: true
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
/* begin cmd-address-data ---------------------------------------------------------------------------------------- */
.cmd-address-data {
    dd {
        margin-bottom: var(--default-margin);
    }

    ul {
        flex-direction: column;
        gap: calc(var(--default-gap) / 2);

        li {
            margin-left: 0;
            list-style: none;
        }
    }
}

/* end cmd-address-data ------------------------------------------------------------------------------------------ */
</style>