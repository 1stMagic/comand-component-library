export default [
`<CmdSystemMessage
    validationStatus="error"
    :fullWidth="true"
    systemMessage="This is an error message!">
</CmdSystemMessage>`,
`<CmdSystemMessage
    validationStatus="warning"
    :fullWidth="true"
    systemMessage="This is a warning message!">
    <!-- begin slot-content -->
    <p>This is additional text!</p>
    <!-- end slot-content -->
</CmdSystemMessage>`,
`<CmdSystemMessage
    validationStatus="success"
    :fullWidth="true"
    systemMessage="This is a success message!">
    <!-- begin slot-content -->
    <ul>
        <li>Additional information #1</li>
        <li>Additional information #2</li>
        <li>Additional information #3</li>
    </ul>
    <!-- end slot-content -->
</CmdSystemMessage>`,
`<CmdSystemMessage
    validationStatus="info"
    :fullWidth="true"
    systemMessage="This is an info message!">
</CmdSystemMessage>`
]