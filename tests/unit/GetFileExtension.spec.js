import {getFileExtension} from "../../src/utils/GetFileExtension"

describe("GetFileExtension", () => {
    it("returns the correct file extension", () => {
        const values = [
            [undefined, ""],
            [null, ""],
            ["", ""],
            ["   ", ""],
            ["test.txt", "txt"],
            ["test.txt.js", "js"],
            ["test", ""]
        ]
        values.forEach(([filename, extension]) => expect(getFileExtension(filename)).toBe(extension))
    })
})
