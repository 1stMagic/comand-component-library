import {mount} from "@vue/test-utils"
import CmdHeadline from "../../src/components/CmdHeadline"

describe("CmdHeadline", () => {
    it("test headline", () => {
        const wrapper = mount(CmdHeadline, {
            props: {
                headline: {
                    text: "TestHeadline",
                    level: 2
                }
            }
        })
        expect(wrapper.find(".cmd-custom-headline > h2").exists()).toBe(true)
        expect(wrapper.get(".cmd-custom-headline > h2").text()).toBe("TestHeadline")
    })

    it("test pre-headline", () => {
        const wrapper = mount(CmdHeadline, {
            props: {
                preHeadline: "PreHeadline"
            }
        })
        expect(wrapper.get(".cmd-custom-headline > div > p").text()).toBe("PreHeadline")
    })

    it("test icon", () => {
        const wrapper = mount(CmdHeadline, {
            props: {
                iconClass: "icon-home"
            }
        })
        expect(wrapper.get(".cmd-custom-headline > span").attributes().class).toBe("icon-home")
    })

    it("test slot", () => {
        const wrapper = mount(CmdHeadline, {
            slots: {
                default: "Slot Content"
            }
        })
        expect(wrapper.get(".cmd-custom-headline > h2").text()).toBe("Slot Content")
    })
})

// https://next.vue-test-utils.vuejs.org/guide/
// https://jestjs.io/docs/getting-started