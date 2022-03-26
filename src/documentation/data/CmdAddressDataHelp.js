export default [`<CmdAddressData
    :addressData="addressData"
    :linkGoogleMaps="true"
    :cmdCustomHeadline="{ 
        headlineText: 'Address', 
        headlineLevel: 5
    }"
/>`,
`<CmdAddressData
    :addressData="addressData"
    :linkGoogleMaps="false"
    :cmdCustomHeadline="{ 
        headlineText: 'Address', 
        headlineLevel: 5
    }"
    :showLabels="false"
/>`]