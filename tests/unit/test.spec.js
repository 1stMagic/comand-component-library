import {capitalize} from "../../src/utils/string"
import componentsDescription from "../../src/documentation/data/componentsDescription.json"

function resolveComponentName(name) {
    if (name.slice(0, 3) === "cmd" && name.length > 3) {
        const componentName = capitalize(name)
        if (componentsDescription[componentName]) {
            return componentName
        }
        const componentNameParts = componentName.split(/(?<=[a-z])(?=[A-Z])/)
        for (let i = componentNameParts.length - 2; i > 2; i--) {
            const componentNameCandidate = componentNameParts.slice(0, i).join("")
            if (componentsDescription[componentNameCandidate]) {
                return componentNameCandidate
            }
        }
    }
    return null
}

it("test", () => {
    const input = "cmdFormElementSendLogin"
    const output = "CmdFormElement"
    expect(resolveComponentName(input)).toBe(output)
})