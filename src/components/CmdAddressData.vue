<template>
    <div class="cmd-address-data">
        <h4 v-if="headline">{{ headline }}</h4>
        <dl class="vard">
            <dt v-if="addressData.address">Address:</dt>
            <dd class="street-address" v-if="addressData.address" v-html="addressData.address">{{ addressData.address }}</dd>
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
            }
        }
    }
</script>

<style lang="scss">
    .cmd-address-data  {
        dd {
            margin-bottom: var(--default-margin);
        }
    }
</style>