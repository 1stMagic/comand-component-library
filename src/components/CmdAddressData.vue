<template>
    <div class="cmd-address-data vcard">
        <!-- begin cmdCustomHeadline -->
        <CmdCustomHeadline v-if="cmdCustomHeadline" :headline="cmdCustomHeadline" />
        <!-- end cmdCustomHeadline -->

        <!-- begin address-data in vCard microformat -->
        <address class="adr">
            <!-- begin list with labels -->
            <dl v-if="showLabels">
                <!-- begin company -->
                <dt v-if="addressData.company?.value">
                    <span v-if="addressData.company.iconClass && showLabelIcons" :class="addressData.company.iconClass" :title="getMessage('cmdaddressdata.labeltext.company')"></span>
                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.company')}}</span>
                </dt>
                <dd  v-if="addressData.company?.value" class="org">{{ addressData.company.value }}</dd>
                <!-- end company -->

                <!-- begin address -->
                <dt v-if="addressData.address && addressData.address.length">
                    <span v-if="addressData.address.iconClass && showLabelIcons" :class="addressData.address.iconClass" :title="getMessage('cmdaddressdata.labeltext.address')"></span>
                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.address')}}</span>
                </dt>
                <dd v-if="addressData.address">
                    <a  v-if="linkGoogleMaps" :href="locateAddress" target="google-maps"
                       :title="getMessage('cmdaddressdata.title.open_address_on_google_maps')">
                        <span v-if="addressData.address.streetNo" class="street-address">{{ addressData.address.streetNo }}</span><br/>
                        <span v-if="addressData.address.zip" class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                        <span v-if="addressData.address.city" class="locality">{{ addressData.address.city }}</span>
                        <span  v-if="addressData.country" class="country-name">{{ addressData.country }}</span>
                    </a>
                    <template v-else>
                        <span v-if="addressData.address.streetNo" class="street-address">{{addressData.address.streetNo }}</span><br/>
                        <span v-if="addressData.address.zip" class="postal-code">{{ addressData.address.zip }}</span>
                        <span v-if="addressData.address.city" class="locality">{{ addressData.address.city }}</span>
                        <span  v-if="addressData.country" class="country-name">{{ addressData.country }}</span>
                    </template>
                </dd>
                <!-- end address -->

                <!-- begin telephone -->
                <dt v-if="addressData.telephone?.value">
                    <span v-if="addressData.telephone.iconClass && showLabelIcons" :class="addressData.telephone.iconClass" :title="getMessage('cmdaddressdata.labeltext.telephone')"></span>
                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.telephone')}}</span>
                </dt>
                <dd v-if="addressData.telephone?.value">
                    <a :href="'tel:' + addressData.telephone" title="Call number" class="tel" v-telephone="addressData.telephone.value">{{ addressData.telephone.value }}</a>
                </dd>
                <!-- end telephone -->

                <!-- begin mobilephone -->
                <dt v-if="addressData.mobilephone?.value">
                    <span v-if="addressData.mobilephone.iconClass && showLabelIcons" :class="addressData.mobilephone.iconClass" :title="getMessage('cmdaddressdata.labeltext.mobile_phone')"></span>
                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.mobile_phone')}}</span>
                </dt>
                <dd v-if="addressData.mobilephone?.value">
                    <a :href="'tel:' + addressData.mobilephone" title="Call number" class="tel" v-telephone="addressData.mobilephone.value">{{ addressData.mobilephone.value  }}</a>
                </dd>
                <!-- end mobilephone -->

                <!-- begin fax -->
                <dt v-if="addressData.fax?.value">
                    <span v-if="addressData.fax.iconClass && showLabelIcons" :class="addressData.fax.iconClass" :title="getMessage('cmdaddressdata.labeltext.fax')"></span>
                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.fax')}}</span>
                </dt>
                <dd v-if="addressData.fax?.value" class="fax">{{ addressData.fax.value  }}</dd>
                <!-- end fax -->

                <!-- begin email -->
                <dt v-if="addressData.email?.value">
                    <span v-if="addressData.email.iconClass && showLabelIcons" :class="addressData.email.iconClass" :title="getMessage('cmdaddressdata.labeltext.email')"></span>
                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.email')}}</span>
                </dt>
                <dd class="email" v-if="addressData.email?.value">
                    <a :href="'mailto:' + addressData.email?.value" class="email">{{ addressData.email.value  }}</a>
                </dd>
                <!-- end email -->
            </dl>
            <!-- end list with labels -->

            <!-- begin list without labels -->
            <ul v-else class="flex-container">
                <li v-if="addressData.company">
                    <span class="org">{{ addressData.company.value }}</span>
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
                <li v-if="addressData.telephone?.value">
                    <a :href="'tel:' + addressData.telephone.value" :title="getMessage('cmdaddressdata.title.call_number')" class="tel">{{ addressData.telephone.value }}</a>
                </li>
                <li v-if="addressData.fax?.value">
                    <span class="fax">{{ addressData.fax.value }}</span>
                </li>
                <li v-if="addressData.email?.value" :title="getMessage('cmdaddressdata.title.send_email')">
                    <a :href="'mailto:' + addressData.email.value" class="email">{{ addressData.email.value }}</a>
                </li>
            </ul>
            <!-- end list without labels -->
        </address>
        <!-- end address-data in vCard microformat -->
    </div>
</template>

<script>
// import files for translations
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdAddressData/DefaultMessageProperties"

// import components
import CmdCustomHeadline from "./CmdCustomHeadline"

export default {
    name: "CmdAddressData",
    mixins: [I18n, DefaultMessageProperties],
    components: {
        CmdCustomHeadline
    },
    props: {
        /**
         * show a label-icon (if exists)
         */
        showLabelIcons: {
            type: Boolean,
            default: true
        },
        /**
         * show a label-text
         */
        showLabelTexts: {
            type: Boolean,
            default: true
        },
        /**
         * properties for CmdCustomHeadline-component
         */
        cmdCustomHeadline: {
            type: Object,
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
         * all address-data (incl. labels) that will be shown
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
    dl {
        grid-row-gap: calc(var(--default-gap) / 2);

        dt, dd {
            display: flex;
            align-items: center;
        }
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