export default [
`<CmdFakeSelect
    labelText="Labeltext for default selectbox:"
    :status="formElementStatus"
    :selectData="fakeSelectOptions"
    v-model="fakeSelectDefault"
    required
    defaultOptionName="Select an option:"
/>`,
`<CmdFakeSelect
    labelText="Selectbox with icons:"
    :status="formElementStatus"
    :selectData="fakeSelectOptionsWithIcons"
    v-model="fakeSelectDefaultWithIcons"
    defaultOptionName="Select an option:"
/>`,
`<CmdFakeSelect
    labelText="Selectbox with checkboxes:"
    :status="formElementStatus"
    :selectData="fakeSelectOptions"
    v-model="fakeSelectCheckbox"
    defaultOptionName="Options:"
    :required="true"
    id="selectbox-with-checkboxes"
    type="checkboxOptions"
    :useCustomTooltip="true"
/>`,
`<CmdFakeSelect
    labelText="Selectbox with slot-content:"
    :status="formElementStatus"
    type="content"
    defaultOptionName="HTML-Content:"
>
    <ul class="custom-fake-select-content">
        <li>
            <div>
                <h3>Headline</h3>
                <p>Some content inside a paragraph</p>
            </div>
            <img src="media/images/thumbnail-scroller/thumbnail/logo-cmd-blue-landscape.jpg" alt="image"/>
        </li>
    </ul>
</CmdFakeSelect>`,
`<CmdFakeSelect
    labelText="Selectbox with country flags:"
    :status="formElementStatus"
    :selectData="fakeSelectCountries"
    v-model="fakeSelectCountry"
    defaultOptionName="Select country:"
    type="country"
/>`,
`<CmdFakeSelect
    labelText="Selectbox with colors:"
    :status="formElementStatus"
    :selectData="fakeSelectColors"
    v-model="fakeSelectColor"
    required="required"
    type="color"
/>`
]