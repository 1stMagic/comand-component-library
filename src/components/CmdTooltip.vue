<template>
    <span :class="['cmd-tooltip', status]" ref="tooltip" aria-role="tooltip">
        <slot>
            {{ tooltipText }}
        </slot>
    </span>
</template>

<script>
export default {
    name: "CmdTooltip",
    data() {
        return {
            tooltipVisibility: false,
            pointerX: 0,
            pointerY: 0
        }
    },
    props: {
        /**
         * text for tooltip
         */
        tooltipText: {
            type: String,
            required: false
        },
        relatedId: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: false
        },
        toggleVisibilityByClick: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if(this.relatedId) {
            document.getElementById(this.relatedId).addEventListener("mouseenter", this.showTooltip)
            document.addEventListener("scroll", this.hideTooltip)

            if(this.toggleVisibilityByClick) {
                document.getElementById(this.relatedId).addEventListener("click", this.toggleTooltipVisibility)
            } else {
                document.getElementById(this.relatedId).addEventListener("mouseleave", this.hideTooltip)
            }
        }
    },
    methods: {
        toggleTooltipVisibility(event) {
            this.getPointerPosition(event)
            this.tooltipVisibility = !this.tooltipVisibility
        },
        showTooltip(event) {
            if(!this.toggleVisibilityByClick) {
                this.tooltipVisibility = true
            }
            this.getPointerPosition(event)
        },
        hideTooltip() {
            this.tooltipVisibility = false
        },
        getPointerPosition(event) {
            this.pointerX = event.clientX
            this.pointerY = event.clientY
        }
    },
    unmounted() {
        if(this.relatedId) {
            document.getElementById(this.relatedId).removeEventListener("mouseenter", this.showTooltip)
            document.removeEventListener("scroll", this.hideTooltip)

            if(this.toggleVisibilityByClick) {
                document.getElementById(this.relatedId).removeEventListener("click", this.toggleTooltipVisibility)
            } else {
                document.getElementById(this.relatedId).removeEventListener("mouseleave", this.showTooltip)
            }
        }
    },
    watch: {
        tooltipVisibility() {
            if(this.tooltipVisibility) {
                this.$nextTick( () => {
                    const verticalOffset = 25
                    this.$refs.tooltip.style.left = this.pointerX + "px"
                    this.$refs.tooltip.style.top = this.pointerY + verticalOffset + "px"
                })
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-tooltip ------------------------------------------------------------------------------------------ */
.cmd-tooltip {
    padding: .6rem .7rem .4rem .7rem;
    line-height: 100%;
    font-size: 1.1rem;
    position: fixed;
    background: var(--pure-white);
    z-index: 100;
    border: var(--default-border);
    border-color: hsl(220, 2%, 25%);
    border-right-color: hsl(240, 1%, 81%);
    border-bottom-color: hsl(240, 1%, 81%);
}

@-moz-document url-prefix() {
    .cmd-tooltip {
        font-size: 1.3rem;
        border-color: hsl(0, 0%, 46%);
    }
}

/* end cmd-tooltip ------------------------------------------------------------------------------------------ */
</style>