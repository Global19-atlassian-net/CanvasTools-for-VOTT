import { Rect } from "../../Core/Rect";
import { Element } from "./Element";
import { RectElement } from "./RectElement";

/**
 * The mask element for selectors
 */
export class MaskElement extends Element {
    /**
     * Internal mask composition element.
     */
    private mask: RectElement;

    /**
     * Internal layer for the mask cover.
     */
    private maskIn: RectElement;

    /**
     * External layer for the mask filter.
     */
    private maskOut: { node: Snap.Element };

    /**
     * Creates a new `MaskElement`.
     * @param paper - The `Snap.Paper` object to draw on.
     * @param boundRect - The parent bounding box for selection.
     * @param maskOut - The element to be used as mask filter.
     */
    constructor(paper: Snap.Paper, boundRect: Rect, maskOut: { node: Snap.Element }) {
        super(paper, boundRect);
        this.maskOut = maskOut;
        this.buildUIElements();
        this.resize(boundRect.width, boundRect.height);
        this.hide();
    }

    /**
     * Resize the element to specified `width` and `height`.
     * @param width - The new `width`.
     * @param height - The new `height`.
     */
    public resize(width: number, height: number) {
        super.resize(width, height);
        this.mask.resize(width, height);
        this.maskIn.resize(width, height);
    }

    /**
     * Builds the visual presentation of the element.
     */
    private buildUIElements() {
        this.mask = this.createMask();

        this.maskIn = this.createMaskIn();
        this.maskOut.node.addClass("maskOutStyle");

        const combinedMask = this.paper.g();
        combinedMask.add(this.maskIn.node);
        combinedMask.add(this.maskOut.node);

        this.mask.node.attr({
            mask: combinedMask,
        });

        this.node = this.mask.node;
    }

    private createMask(): RectElement {
        const r: RectElement = new RectElement(this.paper, this.boundRect, this.boundRect);
        r.node.addClass("maskStyle");
        return r;
    }

    private createMaskIn(): RectElement {
        const r: RectElement = new RectElement(this.paper, this.boundRect, this.boundRect);
        r.node.addClass("maskInStyle");
        return r;
    }
}