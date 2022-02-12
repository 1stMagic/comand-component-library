<template>
    <div class="cmd-address-data vcard">
        <h4 v-if="headline">{{ headline }}</h4>
        <address class="adr">
            <dl v-if="showLabels">
                <dt v-if="addressData.company">{{ getMessage('cmdaddressdata.labeltext.company')}}</dt>
                <dd class="org">{{ addressData.company }}</dd>
                <dt v-if="addressData.address">{{ getMessage('cmdaddressdata.labeltext.address') }}</dt>
                <dd v-if="addressData.address">
                    <a :href="locateAddress" target="google-maps" v-if="linkGoogleMaps"
                       :title="getMessage('cmdaddressdata.title.open_address_on_google_maps')">
                        <span class="street-address" v-if="addressData.address.streetNo">{{ addressData.address.streetNo }}</span><br/>
                        <span class="postal-code" v-if="addressData.address.zip">{{ addressData.address.zip }}</span>
                        <span class="locality" v-if="addressData.address.city">{{ addressData.address.city }}</span>
                        <span class="country-name" v-if="addressData.country">{{ addressData.country }}</span>
                    </a>
                    <template v-else>
                    <span class="street-address" v-if="addressData.address.streetNo">{{addressData.address.streetNo }}</span><br/>
                        <span class="postal-code" v-if="addressData.address.zip">{{ addressData.address.zip }}</span>
                        <span class="locality" v-if="addressData.address.city">{{ addressData.address.city }}</span>
                        <span class="country-name" v-if="addressData.country">{{ addressData.country }}</span>
                    </template>
                </dd>
                <dt v-if="addressData.telephone">{{ getMessage('cmdaddressdata.labeltext.telephone') }}</dt>
                <dd v-if="addressData.telephone">
                    <a :href="'tel:' + addressData.telephone" title="Call number" class="tel" v-telephone="addressData.telephone">{{ addressData.telephone }}</a>
                </dd>
                <dt v-if="addressData.mobilephone">{{ getMessage('cmdaddressdata.labeltext.mobile_phone') }}</dt>
                <dd v-if="addressData.mobilephone">
                    <a :href="'tel:' + addressData.mobilephone" title="Call number" class="tel" v-telephone="addressData.mobilephone">{{ addressData.mobilephone }}</a>
                </dd>
                <dt v-if="addressData.fax">{{ getMessage('cmdaddressdata.labeltext.fax') }}</dt>
                <dd v-if="addressData.fax" class="fax">{{ addressData.fax }}</dd>
                <dt v-if="addressData.email">{{ getMessage('cmdaddressdata.labeltext.email') }}</dt>
                <dd class="email" v-if="addressData.email">
                    <a :href="'mailto:' + addressData.email" class="email">{{ addressData.email }}</a>
                </dd>
            </dl>
            <ul v-else class="flex-container">
                <li v-if="addressData.company">
                    <span> class="org">{{ addressData.company }}</span>
                </li>
                <li>
                    <a :href="locateAddress" target="google-maps" v-if="linkGoogleMaps"
                       :title="getMessage('cmdaddressdata.title.open_address_on_google_maps')">
                        <span class="street-address" v-if="addressData.address.streetNo">{{ addressData.address.streetNo }}</span><br/>
                        <span class="postal-code" v-if="addressData.address.zip">{{ addressData.address.zip }}</span>
                        <span class="locality" v-if="addressData.address.city">{{ addressData.address.city }}</span>
                        <span class="country-name" v-if="addressData.country">{{ addressData.country }}</span>
                    </a>
                    <template v-else>
                        <span class="street-address" v-if="addressData.address.streetNo">{{ addressData.address.streetNo }}</span><br/>
                        <span class="postal-code" v-if="addressData.address.zip">{{ addressData.address.zip }}</span>
                        <span class="locality" v-if="addressData.address.city">{{ addressData.address.city }}</span>
                        <span class="country-name" v-if="addressData.country">{{ addressData.country }}</span>
                    </template>
                </li>
                <li v-if="addressData.telephone">
                    <a :href="'tel:' + addressData.telephone" :title="getMessage('cmdaddressdata.title.call_number')" class="tel">{{ addressData.telephone }}</a>
                </li>
                <li v-if="addressData.fax">
                    <span class="fax">{{ addressData.fax }}</span>
                </li>
                <li v-if="addressData.email" :title="getMessage('cmdaddressdata.title.send_email')">
                    <a :href="'mailto:' + addressData.email" class="email">{{ addressData.email }}</a>
                </li>
            </ul>
        </address>
    </div>
</template>

<script>
// import files for translations
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdAddressData/DefaultMessageProperties"

export default {
    name: "CmdAddressData",
    mixins: [I18n, DefaultMessageProperties],
    props: {
        /**
         * headline shown above address-data
         */
        headline: {
            type: String,
            required: false
        },
        /**
         * option to toggle labels (i.e. telephone, email etc.) in front/left of data
         */
        showLabels: {
            type: Boolean,
            default: true
        },
        /**
         * all address-data (incl. lables) that will be shown
         */
        addressData: {
            type: Object,
            required: true
        },
        /**
         * link physical address (street, no, zip and city) with Google Maps
         */
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