export default
`<CmdFakeSelect
    labelText="Labeltext for selectbox:"
    :status="formElementStatus"
    :selectData="fakeSelectOptionsData"
    v-model:value="fakeSelectDefault"
    required
    defaultOptionName="Select an option:" 
/>`