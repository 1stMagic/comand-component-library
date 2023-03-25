<template>
    <div class="cmd-address-data vcard">
        <!-- begin CmdHeadline -->
        <CmdHeadline v-if="cmdHeadline" v-bind="cmdHeadline"/>
        <!-- end CmdHeadline -->

        <!-- begin address-data in vCard microformat -->
        <address class="adr">
            <!-- begin list with labels -->
            <dl v-if="showLabels && !showIconsOnly">
                <template v-for="(entry, index) in addressData" :key="index">
                    <!-- begin labels -->
                    <dt :class="{'address': entry.name === 'address'}">
                        <!-- begin CmdIcon -->
                        <CmdIcon
                            v-if="entry.iconClass && showLabelIcons"
                            :iconClass="entry.iconClass"
                            :type="entry.iconType"
                            :tooltip="entry.labelText"
                        />
                        <!-- end CmdIcon -->
                        <span v-if="showLabelTexts">{{ entry.labelText }}</span>
                    </dt>
                    <!-- end labels -->

                    <!-- begin data (except for address) -->
                    <dd v-if="entry.name !== 'address' && entry.data" :class="vCardClass(entry)">
                        <a v-if="entry.href"
                           :href="getHref(entry)"
                           :target="entry.name === 'website' ? '_blank' : null"
                           :title="entry.tooltip"
                           v-telephone="entry.href">
                            {{ entry.href }}
                        </a>
                        <span v-else v-html="entry.data"></span>
                    </dd>
                    <!-- end data (except for address) -->

                    <!-- begin data for address -->
                    <dd v-else>
                        <!-- begin linked address -->
                        <a v-if="linkGoogleMaps"
                           :href="locateAddress(entry)"
                           target="google-maps"
                           :title="getMessage('cmdaddressdata.title.open_address_on_google_maps')">
                            <!-- begin street/number -->
                            <template v-if="entry.streetNo">
                                <span class="street-address">{{ entry.streetNo }}</span><br/>
                            </template>
                            <!-- end street/number -->

                            <!-- begin zip/city -->
                            <span v-if="entry.zip" class="postal-code">{{ entry.zip }}</span>
                            <template v-if="entry.city">
                                <span class="locality">{{ entry.city }}</span><br/>
                            </template>
                            <!-- end zip/city -->

                            <!-- begin miscInfo -->
                            <template v-if="entry.miscInfo">
                                <span>{{ entry.miscInfo }}</span><br/>
                            </template>
                            <!-- end miscInfo -->

                            <!-- begin country -->
                            <span v-if="entry.country" class="country-name">{{ entry.country }}</span>
                            <!-- end country -->
                        </a>
                        <!-- end linked address -->

                        <!-- begin unlinked address -->
                        <template v-else>
                            <!-- begin street/number -->
                            <template v-if="entry.streetNo">
                                <span class="street-address">{{ entry.streetNo }}</span><br/>
                            </template>
                            <!-- end street/number -->

                            <!-- begin zip/city -->
                            <span v-if="entry.zip" class="postal-code">{{ entry.zip }}&nbsp;</span>
                            <template v-if="entry.city">
                                <span class="locality">{{ entry.city }}</span><br/>
                            </template>
                            <!-- end zip/city -->

                            <!-- begin miscInfo -->
                            <template v-if="entry.miscInfo">
                                <span>{{ entry.miscInfo }}</span><br/>
                            </template>
                            <!-- end miscInfo -->

                            <!-- begin country -->
                            <span v-if="entry.country" class="country-name">{{ entry.country }}</span>
                            <!-- end country -->
                        </template>
                        <!-- end unlinked address -->
                    </dd>
                    <!-- end data for address -->
                </template><!-- end v-for -->
                <!-- end data -->
            </dl>
            <!-- end list with labels -->

            <!-- begin list without labels -->
            <ul v-else :class="['flex-container', {'vertical': !showIconsOnly}]">
                <template v-for="(entry, index) in addressData" :key="index">
                    <template v-if="entry.href || entry.name === 'address' || !showIconsOnly">
                        <li :class="{'no-flex' : showIconsOnly}">
                            <!-- begin all entries except address (which has no href) -->
                            <a v-if="entry.href" :href="getHref(entry)"
                               :target="{'_blank' : entry.name === 'website'}"
                               :title="entry.tooltip">
                                <template v-if="showIconsOnly">
                                    <!-- begin CmdIcon -->
                                    <CmdIcon
                                        v-if="entry.iconClass"
                                        :iconClass="entry.iconClass"
                                        :type="entry.iconType"
                                    />
                                    <!-- end CmdIcon -->
                                </template>
                                <template v-else>{{ entry.href }}</template>
                            </a>
                            <span v-else-if="!showIconsOnly" v-html="entry.data"></span>
                            <!-- end all entries except address -->

                            <!-- begin address -->
                            <template v-if="entry.name === 'address'">
                                <!-- begin linked address -->
                                <a v-if="linkGoogleMaps" :href="locateAddress(entry)" target="google-maps" :title="entry.tooltip">
                                    <template v-if="showIconsOnly">
                                        <!-- begin CmdIcon -->
                                        <CmdIcon
                                            v-if="entry.iconClass"
                                            :iconClass="entry.iconClass"
                                            :type="entry.iconType"
                                        />
                                        <!-- end CmdIcon -->
                                    </template>
                                    <template v-else>
                                        <!-- begin street/number -->
                                        <template v-if="entry.streetNo">
                                            <span class="street-address">{{ entry.streetNo }}</span><br/>
                                        </template>
                                        <!-- end street/number -->

                                        <!-- begin zip/city -->
                                        <template v-if="entry.zip || entry.city">
                                            <span class="postal-code">{{ entry.zip }}&nbsp;</span>
                                            <span class="locality">{{ entry.city }}</span><br/>
                                        </template>
                                        <!-- end zip/city -->

                                        <!-- begin miscInfo -->
                                        <template v-if="entry.miscInfo">
                                            <span>{{ entry.miscInfo }}</span><br/>
                                        </template>
                                        <!-- end miscInfo -->

                                        <!-- begin country -->
                                        <span v-if="entry.country" class="country-name">{{ entry.country }}</span>
                                        <!-- end country -->
                                    </template>
                                </a>
                                <!-- end linked address -->

                                <!-- begin unlinked address -->
                                <template v-if="!linkGoogleMaps && !showIconsOnly">
                                    <!-- begin street/number -->
                                    <template v-if="entry.streetNo">
                                        <span class="street-address">{{ entry.streetNo }}</span><br/>
                                    </template>
                                    <!-- end street/number -->

                                    <!-- begin zip/city -->
                                    <template v-if="entry.zip || entry.city">
                                        <span class="postal-code">{{ entry.zip }}&nbsp;</span>
                                        <span class="locality">{{ entry.city }}</span><br/>
                                    </template>
                                    <!-- end zip/city -->

                                    <!-- begin miscInfo -->
                                    <template v-if="entry.miscInfo">
                                        <span>{{ entry.miscInfo }}</span><br/>
                                    </template>
                                    <!-- end miscInfo -->

                                    <!-- begin country -->
                                    <span v-if="entry.country" class="country-name">{{ entry.country }}</span>
                                    <!-- end country -->
                                </template>
                                <!-- end unlinked address -->
                            </template>
                            <!-- end address -->
                        </li>
                    </template>
                    <!-- end all entries except address -->
                </template>
                <!-- end v-for -->
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

export default {
    name: "CmdAddressData",
    mixins: [I18n, DefaultMessageProperties],
    props: {
        /**
         * activate if only icons (without any text) should be displayed
         */
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
        websiteUrlText() {
            return this.addressData.website?.text.replace("https://", "")
        }
    },
    methods: {
        locateAddress(entry) {
            return "https://www.google.com/maps/place/" + entry.streetNo + ", " + entry.zip + " " + entry.city
        },
        vCardClass(entry) {
            if (entry.name === 'company') {
                return "org"
            }
            if (entry.name === "address") {
                if (entry.streetNo) {
                    return "street-address"
                }
                if (entry.zip) {
                    return "postal-code"
                }
                if (entry.city) {
                    return "locality"
                }
                if (entry.country) {
                    return "country-name"
                }
            }
            return null
        },
        getHref(entry) {
            if (entry.name === "telephone" || entry.name === "mobilephone") {
                return "tel:" + entry.href
            }
            if (entry.name === "email") {
                return "mailto:" + entry.href
            }
            if (entry.name === "website") {
                return entry.href
            }
            return null
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
                align-self: flex-start;

                [class*="icon"]:only-child {
                    line-height: var(--line-height);
                }
            }
        }
    }

    ul {
        gap: calc(var(--default-gap) / 2);

        li {
            margin-left: 0;
            list-style: none;
        }
    }
}

/* end cmd-address-data ------------------------------------------------------------------------------------------ */
</style>