export default [`<CmdAccordion :accordionData="2" toggleMode="multiple">
    <template v-slot:accordionHeadline0>
        <h4>Accordion 1</h4>
    </template>
    <template v-slot:accordionContent0>
        <p>
            Content for accordion 1
        </p>
    </template>
    <template v-slot:accordionHeadline1>
        <h4>Accordion 2</h4>
    </template>
    <template v-slot:accordionContent1>
        <p>
            Content for accordion 2
        </p>
    </template>
</CmdAccordion>`,
`<CmdAccordion 
  :accordionData="accordion.accordionData1" 
/>`
]