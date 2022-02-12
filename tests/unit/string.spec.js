import {capitalize} from "../../src/utils/string"

describe("String utilities", () => {
    it("capitalize", () => {
        const values = [
            ["cmd", "Cmd"],
            ["Cmd", "Cmd"],
            [null, ""],
            [undefined, ""],
            ["", ""],
            ["   ", "   "],
            ["1", "1"]
        ]
        values.forEach(([defaultString, resultString]) => expect(capitalize(defaultString)).toBe(resultString))
    })
})
