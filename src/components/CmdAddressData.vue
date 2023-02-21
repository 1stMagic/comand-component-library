<template>
    <div class="cmd-address-data vcard">
        <!-- begin CmdHeadline -->
        <CmdHeadline v-if="cmdHeadline" v-bind="cmdHeadline" />
        <!-- end CmdHeadline -->

        <!-- begin address-data in vCard microformat -->
        <address class="adr">
            <!-- begin list with labels -->
            <dl v-if="showLabels">
                <!-- begin company (name) -->
                <dt v-if="addressData.company?.text">
                    <!-- begin CmdIcon -->
                    <CmdIcon
                        v-if="addressData.company.iconClass && showLabelIcons"
                        :iconClass="addressData.company.iconClass"
                        :type="addressData.company.iconType"
                        :tooltip="getMessage('cmdaddressdata.labeltext.company')"
                    />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.company')}}</span>
                </dt>
                <dd v-if="addressData.company?.text" class="org">{{ addressData.company.text }}</dd>
                <!-- end company (name) -->

                <!-- begin address -->
                <template v-if="addressData.address && addressData.address !== undefined">
                    <dt class="address">
                        <!-- begin CmdIcon -->
                        <CmdIcon
                            v-if="addressData.address.iconClass && showLabelIcons"
                            :iconClass="addressData.address.iconClass"
                            :type="addressData.address.iconType"
                            :tooltip="getMessage('cmdaddressdata.labeltext.address')"
                        />
                        <!-- end CmdIcon -->

                        <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.address')}}</span>
                    </dt>
                    <dd v-if="addressData.address">
                        <!-- begin linked address -->
                        <a v-if="linkGoogleMaps" :href="locateAddress" target="google-maps" :title="getMessage('cmdaddressdata.title.open_address_on_google_maps')">
                            <!-- begin street/number -->
                            <template v-if="addressData.address.streetNo">
                                <span class="street-address">{{ addressData.address.streetNo }}</span><br/>
                            </template>
                            <!-- end street/number -->

                            <!-- begin zip/city -->
                            <span v-if="addressData.address.zip" class="postal-code">{{ addressData.address.zip }}</span>
                            <template v-if="addressData.address.city">
                                <span class="locality">{{ addressData.address.city }}</span><br/>
                            </template>
                            <!-- end zip/city -->

                            <!-- begin miscInfo -->
                            <template v-if="addressData.address.miscInfo">
                                <span>{{ addressData.address.miscInfo }}</span><br/>
                            </template>
                            <!-- end miscInfo -->

                            <!-- begin country -->
                            <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
                            <!-- end country -->
                        </a>
                        <!-- end linked address -->

                        <!-- begin unlinked address -->
                        <template v-else>
                            <!-- begin street/number -->
                            <template v-if="addressData.address.streetNo">
                                <span class="street-address">{{addressData.address.streetNo }}</span><br/>
                            </template>
                            <!-- end street/number -->

                            <!-- begin zip/city -->
                            <span v-if="addressData.address.zip" class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                            <template v-if="addressData.address.city">
                                <span class="locality">{{ addressData.address.city }}</span><br/>
                            </template>
                            <!-- end zip/city -->

                            <!-- begin miscInfo -->
                            <template v-if="addressData.address.miscInfo">
                                <span>{{ addressData.address.miscInfo }}</span><br/>
                            </template>
                            <!-- end miscInfo -->

                            <!-- begin country -->
                            <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
                            <!-- end country -->
                        </template>
                        <!-- end unlinked address -->
                    </dd>
                </template>
                <!-- end address -->

                <!-- begin telephone -->
                <dt v-if="addressData.telephone?.text">
                    <!-- begin CmdIcon -->
                    <CmdIcon
                        v-if="addressData.telephone.iconClass && showLabelIcons"
                        :iconClass="addressData.telephone.iconClass"
                        :type="addressData.telephone.iconType"
                        :tooltip="getMessage('cmdaddressdata.labeltext.telephone')"
                    />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.telephone')}}</span>
                </dt>
                <dd v-if="addressData.telephone?.text">
                    <a :href="'tel:' + addressData.telephone" title="Call number" class="tel" v-telephone="addressData.telephone.text">{{ addressData.telephone.text }}</a>
                </dd>
                <!-- end telephone -->

                <!-- begin mobile phone -->
                <dt v-if="addressData.mobilephone?.text">
                    <!-- begin CmdIcon -->
                    <CmdIcon
                        v-if="addressData.mobilephone.iconClass && showLabelIcons"
                        :iconClass="addressData.mobilephone.iconClass"
                        :type="addressData.mobilephone.iconType"
                        :tooltip="getMessage('cmdaddressdata.labeltext.mobile_phone')"
                    />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.mobile_phone')}}</span>
                </dt>
                <dd v-if="addressData.mobilephone?.text">
                    <a :href="'tel:' + addressData.mobilephone" title="Call number" class="tel" v-telephone="addressData.mobilephone.text">{{ addressData.mobilephone.text  }}</a>
                </dd>
                <!-- end mobile phone -->

                <!-- begin fax -->
                <dt v-if="addressData.fax?.text">
                    <!-- begin CmdIcon -->
                    <CmdIcon
                        v-if="addressData.fax.iconClass && showLabelIcons"
                        :iconClass="addressData.fax.iconClass"
                        :type="addressData.fax.iconType"
                        :tooltip="getMessage('cmdaddressdata.labeltext.fax')"
                    />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.fax')}}</span>
                </dt>
                <dd v-if="addressData.fax?.text" class="fax">{{ addressData.fax.text }}</dd>
                <!-- end fax -->

                <!-- begin email -->
                <dt v-if="addressData.email?.text">
                    <!-- begin CmdIcon -->
                    <CmdIcon
                        v-if="addressData.email.iconClass && showLabelIcons"
                        :iconClass="addressData.email.iconClass"
                        :type="addressData.email.iconType"
                        :tooltip="getMessage('cmdaddressdata.labeltext.email')"
                    />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.email')}}</span>
                </dt>
                <dd v-if="addressData.email?.text" class="email" >
                    <a :href="'mailto:' + addressData.email?.text" class="email">{{ addressData.email.text }}</a>
                </dd>
                <!-- end email -->

                <!-- begin web site -->
                <dt v-if="addressData.website?.text">
                <!-- begin CmdIcon -->
                    <CmdIcon
                        v-if="addressData.website.iconClass && showLabelIcons"
                        :iconClass="addressData.website.iconClass"
                        :type="addressData.website.iconType"
                    />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.website')}}</span>
                </dt>
                <dd v-if="addressData.website?.text" >
                    <a :href="addressData.website.text" target="_blank" :title="getMessage('cmdaddressdata.title.visit_website')">{{ websiteUrlText }}</a>
                </dd>
                <!-- end web site -->

                <!-- begin custom data -->
                <dt v-if="addressData.custom?.text">
                    <!-- begin CmdIcon -->
                    <CmdIcon
                        v-if="addressData.custom.iconClass && showLabelIcons"
                        :iconClass="addressData.custom.iconClass"
                        :type="addressData.custom.iconType"
                    />
                    <!-- end CmdIcon -->

                    <span v-if="showLabelTexts">{{ getMessage('cmdaddressdata.labeltext.custom')}}</span>
                </dt>
                <dd v-if="addressData.custom?.text" >
                    {{ addressData.custom.text }}
                </dd>
                <!-- end custom data -->
            </dl>
            <!-- end list with labels -->

            <!-- begin list without labels -->
            <ul v-else class="flex-container">
                <!-- begin company (name) -->
                <li v-if="addressData.company">
                    <span class="org">{{ addressData.company.text }}</span>
                </li>
                <!-- end company (name) -->
                <li>
                    <!-- begin linked address -->
                    <a v-if="linkGoogleMaps" :href="locateAddress" target="google-maps" :title="getMessage('cmdaddressdata.title.open_address_on_google_maps')">
                        <!-- begin street/number -->
                        <template v-if="addressData.address.streetNo">
                            <span  class="street-address">{{ addressData.address.streetNo }}</span><br/>
                        </template>
                        <!-- end street/number -->

                        <!-- begin zip/city -->
                        <template v-if="addressData.address.zip || addressData.address.city">
                            <span class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                            <span class="locality">{{ addressData.address.city }}</span><br/>
                        </template>
                        <!-- end zip/city -->

                        <!-- begin miscInfo -->
                        <template v-if="addressData.address.miscInfo">
                            <span>{{ addressData.address.miscInfo }}</span><br/>
                        </template>
                        <!-- end miscInfo -->

                        <!-- begin country -->
                        <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
                        <!-- end country -->
                    </a>
                    <!-- end linked address -->

                    <!-- begin unlinked address -->
                    <template v-else>
                        <!-- begin street/number -->
                        <template v-if="addressData.address.streetNo">
                            <span class="street-address">{{ addressData.address.streetNo }}</span><br/>
                        </template>
                        <!-- end street/number -->

                        <!-- begin zip/city -->
                        <template v-if="addressData.address.zip || addressData.address.city">
                            <span class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                            <span class="locality">{{ addressData.address.city }}</span><br/>
                        </template>
                        <!-- end zip/city -->

                        <!-- begin miscInfo -->
                        <template v-if="addressData.address.miscInfo">
                            <span>{{ addressData.address.miscInfo }}</span><br/>
                        </template>
                        <!-- end miscInfo -->

                        <!-- begin country -->
                        <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
                        <!-- end country -->
                    </template>
                    <!-- end unlinked address -->
                </li>
                <li v-if="addressData.telephone?.text">
                    <a :href="'tel:' + addressData.telephone.text" :title="getMessage('cmdaddressdata.title.call_number')" class="tel">{{ addressData.telephone.text }}</a>
                </li>
                <li v-if="addressData.fax?.text">
                    <span class="fax">{{ addressData.fax.text }}</span>
                </li>
                <li v-if="addressData.email?.text" :title="getMessage('cmdaddressdata.title.send_email')">
                    <a :href="'mailto:' + addressData.email.text" class="email">{{ addressData.email.text }}</a>
                </li>
                <li v-if="addressData.website?.text" :title="getMessage('cmdaddressdata.title.visit_website')">
                    <a :href="addressData.website.text" target="_blank">{{ websiteUrlText }}</a>
                </li>
                <li v-if="addressData.custom?.text">
                    {{ addressData.custom.text }}
                </li>
            </ul>
            <!-- end list without labels -->
            <ul v-if="showIconsOnly">
                <template v-if="addressData.company || addressData.address">
                    <!-- begin company (name) -->
                    <li v-if="addressData.company">
                        <span class="org">{{ addressData.company.text }}</span>
                    </li>
                    <!-- end company (name) -->
                    <li v-if="addressData.address">
                        <!-- begin linked address -->
                        <a v-if="linkGoogleMaps" :href="locateAddress" target="google-maps" :title="getMessage('cmdaddressdata.title.open_address_on_google_maps')">
                            <!-- begin street/number -->
                            <template v-if="addressData.address.streetNo">
                                <span  class="street-address">{{ addressData.address.streetNo }}</span><br/>
                            </template>
                            <!-- end street/number -->

                            <!-- begin zip/city -->
                            <template v-if="addressData.address.zip || addressData.address.city">
                                <span class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                                <span class="locality">{{ addressData.address.city }}</span><br/>
                            </template>
                            <!-- end zip/city -->

                            <!-- begin miscInfo -->
                            <template v-if="addressData.address.miscInfo">
                                <span>{{ addressData.address.miscInfo }}</span><br/>
                            </template>
                            <!-- end miscInfo -->

                            <!-- begin country -->
                            <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
                            <!-- end country -->
                        </a>
                        <!-- end linked address -->

                        <!-- begin unlinked address -->
                        <template v-else>
                            <!-- begin street/number -->
                            <template v-if="addressData.address.streetNo">
                                <span class="street-address">{{ addressData.address.streetNo }}</span><br/>
                            </template>
                            <!-- end street/number -->

                            <!-- begin zip/city -->
                            <template v-if="addressData.address.zip || addressData.address.city">
                                <span class="postal-code">{{ addressData.address.zip }}&nbsp;</span>
                                <span class="locality">{{ addressData.address.city }}</span><br/>
                            </template>
                            <!-- end zip/city -->

                            <!-- begin miscInfo -->
                            <template v-if="addressData.address.miscInfo">
                                <span>{{ addressData.address.miscInfo }}</span><br/>
                            </template>
                            <!-- end miscInfo -->

                            <!-- begin country -->
                            <span v-if="addressData.address.country" class="country-name">{{ addressData.address.country }}</span>
                            <!-- end country -->
                        </template>
                        <!-- end unlinked address -->
                    </li>
                </template>
                <template>
                   <!-- <CmdListOfLinks :links="modifiedAddressData" />-->
                </template>
            </ul>
        </address>
        <!-- end address-data in vCard microformat -->
    </div>
</template>

<script>
// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdAddressData/DefaultMessageProperties"

export default {
    name: "CmdAddressData",
    mixins: [I18n, DefaultMessageProperties],
    props: {
        showIconsOnly: {
            type: Boolean,
            default: false
        },
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
        },
        websiteUrlText() {
            return this.addressData.website?.text.replace("https://", "")
        }
        // modifiedAddressData() {
        //     const contactDataWithoutAddress = this.addressData.map(item => () {
        //
        //     })
        // }
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
                align-self: flex-start;
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