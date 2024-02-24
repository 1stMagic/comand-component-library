<template>
    <dt :class="['cmd-address-data-item', {'address': addressEntry.type === 'address'}]">
        <!-- begin CmdIcon -->
        <CmdIcon
                v-if="addressEntry.iconClass && showLabelIcons"
                :iconClass="addressEntry.iconClass"
                :type="addressEntry.iconType"
                :tooltip="addressEntry.labelText"
        />
        <!-- end CmdIcon -->
        <span v-if="showLabelTexts">{{ addressEntry.labelText }}</span>
    </dt>
    <!-- end labels -->

    <!-- begin data (except for address) -->
    <dd v-if="addressEntry.type !== 'address' && (addressEntry.data || addressEntry.href)" :class="vCardClass(addressEntry)">
        <template v-if="!editing">
            <a v-if="addressEntry.href"
               :href="getHref(addressEntry)"
               :target="addressEntry.type === 'url' ? '_blank' : null"
               :title="addressEntry.tooltip"
               :data-type="addressEntry.type"
               v-telephone="addressEntry.href">
                {{ addressEntry.data || addressEntry.href }}
            </a>
            <span v-else v-html="addressEntry.data"></span>
        </template>

        <!-- begin edit-mode -->
        <CmdFormElement
                v-else
                element="input"
                :type="inputType(addressEntry)"
                class="edit-mode"
                :show-label="false"
                :labelText="addressEntry.labelText"
                :placeholder="addressEntry.labelText"
                v-model="editableAddressEntry"
        />
        <!-- end edit-mode -->
    </dd>

    <!-- begin data for address -->
    <dd v-else-if="addressEntry.type === 'address'">
        <!-- begin linked address -->
        <a v-if="linkGoogleMaps && !editing"
           :href="locateAddress(addressEntry)"
           target="google-maps"
           :title="addressEntry.tooltip">
            <!-- begin street/number -->
            <template v-if="addressEntry.streetNo">
                <span class="street-address">{{ addressEntry.streetNo }}</span><br/>
            </template>
            <!-- end street/number -->

            <!-- begin zip/city -->
            <span v-if="addressEntry.zip" class="postal-code">{{ addressEntry.zip }}</span>
            <template v-if="addressEntry.city">
                <span class="locality">{{ addressEntry.city }}</span><br/>
            </template>
            <!-- end zip/city -->

            <!-- begin miscInfo -->
            <template v-if="addressEntry.miscInfo">
                <span>{{ addressEntry.miscInfo }}</span><br v-if="addressEntry.country" />
            </template>
            <!-- end miscInfo -->

            <!-- begin country -->
            <span v-if="addressEntry.country" class="country-name">{{ addressEntry.country }}</span>
            <!-- end country -->
        </a>
        <!-- end linked address -->

        <!-- begin unlinked address -->
        <template v-else>
            <template v-if="!editing">
                <!-- begin street/number -->
                <template v-if="addressEntry.streetNo">
                    <span class="street-address">{{ addressEntry.streetNo }}</span><br/>
                </template>
                <!-- end street/number -->

                <!-- begin zip/city -->
                <span v-if="addressEntry.zip" class="postal-code">{{ addressEntry.zip }}&nbsp;</span>
                <template v-if="addressEntry.city">
                    <span class="locality">{{ addressEntry.city }}</span><br/>
                </template>
                <!-- end zip/city -->

                <!-- begin miscInfo -->
                <template v-if="addressEntry.miscInfo">
                    <span>{{ addressEntry.miscInfo }}</span><br/>
                </template>
                <!-- end miscInfo -->

                <!-- begin country -->
                <span v-if="addressEntry.country" class="country-name">{{ addressEntry.country }}</span>
                <!-- end country -->
            </template>

            <!-- begin edit-mode for address -->
            <template v-else>
                <!-- begin street/number -->
                <CmdFormElement
                        element="input"
                        type="text"
                        class="edit-mode"
                        :show-label="false"
                        :labelText="addressEntry.labelText"
                        :placeholder="addressEntry.labelText"
                        v-model="editableAddressEntry.streetNo"
                />
                <!-- end street/number -->

                <!-- begin zip/city -->
                <div class="input-wrapper">
                    <CmdFormElement
                            element="input"
                            type="text"
                            class="edit-mode"
                            :show-label="false"
                            :labelText="addressEntry.labelText"
                            :placeholder="addressEntry.labelText"
                            v-model="editableAddressEntry.zip"
                    />
                    <CmdFormElement
                            element="input"
                            type="text"
                            class="edit-mode"
                            :show-label="false"
                            :labelText="addressEntry.labelText"
                            :placeholder="addressEntry.labelText"
                            v-model="editableAddressEntry.city"
                    />
                </div>
                <!-- end zip/city -->

                <!-- begin miscInfo -->
                <CmdFormElement
                        element="input"
                        type="text"
                        class="edit-mode"
                        :show-label="false"
                        :labelText="addressEntry.labelText"
                        :placeholder="addressEntry.labelText"
                        v-model="editableAddressEntry.miscInfo"
                />
                <!-- end miscInfo -->

                <!-- begin country -->
                <CmdFormElement
                        element="select"
                        class="edit-mode"
                        :show-label="false"
                        :labelText="addressEntry.labelText"
                        :selectOptions="[{text: 'Germany', value: 'de'}, {text: 'United Kingdom', value: 'uk'}]"
                        v-model="editableAddressEntry.country"
                />
                <!-- end country -->
            </template>
            <!-- end edit-mode for address -->
        </template>
        <!-- end unlinked address -->
    </dd>
    <!-- end data for address -->

</template>
<!-- end data (except for address) -->
<script>
import EditMode from "../mixins/EditMode.vue"
import {updateHandlerProvider} from "../utils/editmode.js";

export default {
    name: "CmdAddressDataItem",
    mixins: [EditMode],
    data() {
        return {
            editableAddressEntry: null
        }
    },
    props: {
        addressEntry: {
            type: Object,
            default: {}
        },
        /**
         * show an icon (if exists) in front of label-text
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
            default: false
        },
        linkGoogleMaps: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        vCardClass(entry) {
            if (entry.type === 'company') {
                return "org"
            }
            if (entry.type === "address") {
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
        inputType(entry) {
            if (entry.type === "phone") {
                return "tel"
            } else if (entry.type === "email") {
                return "email"
            } else if (entry.type === "url") {
                return "url"
            }
            return "text"
        },
        locateAddress(entry) {
            return "https://www.google.com/maps/place/" + entry.streetNo + ", " + entry.zip + " " + entry.city
        },
        getHref(entry) {
            if (entry.type === "phone") {
                return "tel:" + entry.href
            }
            if (entry.type === "email") {
                return "mailto:" + entry.href
            }
            if (entry.type === "url") {
                return entry.href
            }
            return null
        },
        addHandlerProvider() {
            const itemStructure = {
                "type": "default",
                "iconClass": "icon-mail",
                "data": "Your data",
                "labelText": "Labeltext",
                "tooltip": "Tooltip",
                "href": "#"
            }
            return updateHandlerProvider(this, {
                item() {
                    return itemStructure
                }
            })
        },
        updateHandlerProvider() {
            const addressData = this.editableAddressEntry
            return updateHandlerProvider(this, {
                update(props) {
                    if (typeof addressData === "object") {
                        Object.entries(addressData).forEach(([name, value]) => props[name] = value)
                    } else {
                        if (props.href == null) {
                            props.data = addressData
                        } else {
                            props.href = addressData
                        }
                    }
                }
            })
        }
    },
    watch: {
        addressEntry: {
            handler() {
                // check if entry 'address' to create object
                if (this.addressEntry.type === "address") {
                    this.editableAddressEntry = {
                        streetNo: this.addressEntry.streetNo,
                        zip: this.addressEntry.zip,
                        city: this.addressEntry.city,
                        miscInfo: this.addressEntry.miscInfo,
                        country: this.addressEntry.country
                    }
                    // for each other entry assign data or href
                } else {
                    this.editableAddressEntry = (this.addressEntry.href == null ? this.addressEntry.data : this.addressEntry.href) || ""
                }
            },
            immediate: true,
            deep: true
        }
    }
}
</script>