import {ref, watchEffect} from "vue"

export function useEditModeContext(parentContext, props, persistHandler) {
    const editing = ref(!!parentContext?.editing)
    const saveHandlers = []

    function save() {
        const data = []
        saveHandlers.forEach(saveHandler => {
            const result = saveHandler();
            if (result) {
                data.push(result)
            }
        })
        callPersistHandler(data)
    }

    function callPersistHandler(data) {
        let processedData = data
        if (persistHandler) {
            processedData = persistHandler(data)
        }
        if (parentContext && processedData != null) {
            parentContext.callPersistHandler(processedData)
        }
    }

    function addSaveHandler(saveHandler) {
        if (!saveHandlers.includes(saveHandler)) {
            saveHandlers.push(saveHandler)
        }
    }

    if (parentContext) {
        parentContext.addSaveHandler(save)
    }

    watchEffect(() => editing.value = !!parentContext?.editing);

    return {
        editing,
        props: {
            ...(parentContext?.props || {}),
            ...(props || {})
        },
        addSaveHandler,
        save,
        callPersistHandler
    }
}
