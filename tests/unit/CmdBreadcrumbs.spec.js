import {mount} from "@vue/test-utils"
import CmdBreadcrumbs from "../../src/components/CmdBreadcrumbs"

describe("CmdBreadcrumbs", () => {
    it("test label", () => {
        const wrapper = mount(CmdBreadcrumbs, {
            props: {
                breadcrumbLabel: "Breadcrumblabel"
            }
        })
        expect(wrapper.get(".cmd-breadcrumbs > li:first-child").text()).toBe("Breadcrumblabel")
    })

    it("test links", () => {
        const wrapper = mount(CmdBreadcrumbs, {
            props: {
                breadcrumbLinks:   [{
                    "path": "/",
                    "text": "Home",
                    "iconClass": "icon-home",
                    "type": "href"
                }]
            }
        })
        expect(wrapper.find(".cmd-breadcrumbs > li > a").exists()).toBe(true)
        expect(wrapper.get(".cmd-breadcrumbs > li > a").attributes().href).toBe("/")
        expect(wrapper.get(".cmd-breadcrumbs > li > a > span:first-child").attributes().class).toBe("icon-home")
        expect(wrapper.get(".cmd-breadcrumbs > li > a > span:last-child").text()).toBe("Home")
    })

    it("test separator", () => {
        const wrapper = mount(CmdBreadcrumbs, {
            props: {
                breadcrumbSeparator: ">"
            }
        })
        expect(wrapper.find(".cmd-breadcrumbs > li:nth-child(2) > a ~ span").exists()).toBe(true)
        expect(wrapper.get(".cmd-breadcrumbs > li:nth-child(2) > a ~ span").text()).toBe(">")
    })
})