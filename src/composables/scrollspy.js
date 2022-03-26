import {ref} from "vue"
import {useEventListener} from "./event"
import {getOffsetTop} from "../utils/dom"

function toArray(items) {
    if (items instanceof NodeList) {
        return Array.from(items)
    }
    if (Array.isArray(items)) {
        return items
    }
    return []
}

function buildItemList(itemSupplier, itemList) {
    if (!itemList.length) {
        const items = itemSupplier()
        toArray(items).map((item, index) => {
            const itemData = {
                offsetTop: getOffsetTop(item)
            }
            if (index + 1 < items.length) {
                itemData.height = getOffsetTop(items.item(index + 1)) - itemData.offsetTop
            } else {
                itemData.height = document.documentElement.scrollHeight - itemData.offsetTop
            }
            return itemData
        }).forEach(item => itemList.push(item))
    }
}

export function useScrollspy(itemSupplier, initialActiveItem = 1) {
    const activeItem = ref(initialActiveItem)
    const itemList = []
    useEventListener(window, "scroll", () => {
        const sy = window.scrollY
        buildItemList(itemSupplier, itemList)
        for (let i = 0, c = itemList.length; i < c; i++) {
            if (sy < itemList[i].offsetTop + itemList[i].height / 2) {
                activeItem.value = i + 1
                break
            }
        }
    })

    return activeItem
}
