<template>
    <div class="cmd-address-data vcard">
        <!-- begin CmdHeadline -->
        <CmdHeadline v-if="cmdHeadline" v-bind="cmdHeadline" />
        <!-- end CmdHeadline -->

        <!-- begin address-data in vCard microformat -->
        <address class="adr">
            <!-- begin list with labels -->
            <dl v-if="showLabels">
                <!-- begin company -->
                <dt v-if="addressData.company?.value">
                    <!-- begin CmdIcon -->
                    <CmdIcon v-if="addressData.company.iconClass && showLabelIcons" :iconClass="addressData.company.iconClass" :tooltip="getMessage('cmdaddressdata.labeltext.company')" />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.company')}}</span>
                </dt>
                <dd  v-if="addressData.company?.value" class="org">{{ addressData.company.value }}</dd>
                <!-- end company -->

                <!-- begin address -->
                <template v-if="addressData.address && addressData.address !== undefined">
                    <dt class="address">
                        <!-- begin CmdIcon -->
                        <CmdIcon v-if="addressData.address.iconClass && showLabelIcons" :iconClass="addressData.address.iconClass" :tooltip="getMessage('cmdaddressdata.labeltext.address')" />
                        <!-- end CmdIcon -->

                        <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.address')}}</span>
                    </dt>
                    <dd v-if="addressData.address">
                        <a v-if="linkGoogleMaps" :href="locateAddress" target="google-maps" :title="getMessage('cmdaddressdata.title.open_address_on_google_maps')">
                            <span v-if="addressData.address.streetNo" class="street-address">{{ addressData.address.streetNo }}</span><br/>
                            <span v-if="addressData.address.zip" class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                            <span v-if="addressData.address.city" class="locality">{{ addressData.address.city }}</span><br/>
                            <span v-if="addressData.address.miscInfo">{{ addressData.address.miscInfo }}</span><br/>
                            <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
                        </a>
                        <template v-else>
                            <span v-if="addressData.address.streetNo" class="street-address">{{addressData.address.streetNo }}</span><br/>
                            <span v-if="addressData.address.zip" class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                            <span v-if="addressData.address.city" class="locality">{{ addressData.address.city }}</span><br/>
                            <span v-if="addressData.address.miscInfo">{{ addressData.address.miscInfo }}</span><br/>
                            <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
                        </template>
                    </dd>
                </template>
                <!-- end address -->

                <!-- begin telephone -->
                <dt v-if="addressData.telephone?.value">
                    <!-- begin CmdIcon -->
                    <CmdIcon v-if="addressData.telephone.iconClass && showLabelIcons" :iconClass="addressData.telephone.iconClass" :tooltip="getMessage('cmdaddressdata.labeltext.telephone')" />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.telephone')}}</span>
                </dt>
                <dd v-if="addressData.telephone?.value">
                    <a :href="'tel:' + addressData.telephone" title="Call number" class="tel" v-telephone="addressData.telephone.value">{{ addressData.telephone.value }}</a>
                </dd>
                <!-- end telephone -->

                <!-- begin mobile phone -->
                <dt v-if="addressData.mobilephone?.value">
                    <!-- begin CmdIcon -->
                    <CmdIcon v-if="addressData.mobilephone.iconClass && showLabelIcons" :iconClass="addressData.mobilephone.iconClass" :tooltip="getMessage('cmdaddressdata.labeltext.mobile_phone')" />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.mobile_phone')}}</span>
                </dt>
                <dd v-if="addressData.mobilephone?.value">
                    <a :href="'tel:' + addressData.mobilephone" title="Call number" class="tel" v-telephone="addressData.mobilephone.value">{{ addressData.mobilephone.value  }}</a>
                </dd>
                <!-- end mobile phone -->

                <!-- begin fax -->
                <dt v-if="addressData.fax?.value">
                    <!-- begin CmdIcon -->
                    <CmdIcon v-if="addressData.fax.iconClass && showLabelIcons" :iconClass="addressData.fax.iconClass" :tooltip="getMessage('cmdaddressdata.labeltext.fax')" />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.fax')}}</span>
                </dt>
                <dd v-if="addressData.fax?.value" class="fax">{{ addressData.fax.value  }}</dd>
                <!-- end fax -->

                <!-- begin email -->
                <dt v-if="addressData.email?.value">
                    <!-- begin CmdIcon -->
                    <CmdIcon v-if="addressData.email.iconClass && showLabelIcons" :iconClass="addressData.email.iconClass" :tooltip="getMessage('cmdaddressdata.labeltext.email')" />
                    <!-- end CmdIcon -->

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
                    <a v-if="linkGoogleMaps" :href="locateAddress" target="google-maps" :title="getMessage('cmdaddressdata.title.open_address_on_google_maps')">
                        <span v-if="addressData.address.streetNo" class="street-address">{{ addressData.address.streetNo }}</span><br/>
                        <span v-if="addressData.address.zip" class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                        <span v-if="addressData.address.city" class="locality">{{ addressData.address.city }}</span><br/>
                        <span v-if="addressData.address.miscInfo">{{ addressData.address.miscInfo }}</span><br/>
                        <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
                    </a>
                    <template v-else>
                        <span  v-if="addressData.address.streetNo" class="street-address">{{ addressData.address.streetNo }}</span><br/>
                        <span v-if="addressData.address.zip" class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                        <span v-if="addressData.address.city" class="locality">{{ addressData.address.city }}</span><br/>
                        <span v-if="addressData.address.miscInfo">{{ addressData.address.miscInfo }}</span><br/>
                        <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
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
// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdAddressData/DefaultMessageProperties"

// import components
import CmdHeadline from "./CmdHeadline"
import CmdIcon from "./CmdIcon"

export default {
    name: "CmdAddressData",
    mixins: [I18n, DefaultMessageProperties],
    components: {
        CmdHeadline,
        CmdIcon
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
         * show a label-text for each entry
         */
        showLabelTexts: {
            type: Boolean,
            default: true
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
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
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

        dt {
            display: flex;
            align-items: center;

            &.address {
                align-items: flex-start;
            }
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