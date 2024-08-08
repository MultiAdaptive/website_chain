export class BotObserve {
    observe: IntersectionObserver;
    getIn?: () => void;
    getOut?: () => void;
    constructor({node, getIn, getOut}: { node: HTMLElement | null, getIn?: () => void, getOut?: () => void}){
        this.getIn = getIn;
        this.getOut = getOut
        this.observe = this.init();
        if(node){
            this.observeNode(node);
        }
    }

    init() {
        return new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 元素进入视口
                    this.getIn && this.getIn();
                } else {
                    // 元素离开视口
                    this.getOut && this.getOut();
                }
            })
        })
    }

    observeNode(node: HTMLElement) {
        this.observe.observe(node);
    }

    disconnect() {
        this.observe.disconnect();
    }
}