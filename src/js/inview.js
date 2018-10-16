class Inview {
    constructor(options = {}) {
        if(typeof options !== 'object' || Array.isArray(options)) {
            throw Error('Argument 1 is not an object');
        }
        
        this.options = this.mergeOptions(options);
        this.container = this.options.container;
        this.observerOptions = {
            root: typeof this.container === 'string' ? document.querySelector(this.container) : this.container,
            rootMargin: this.options.containerMargin,
            threshold: this.options.threshold,
        }
        this.items = this.toArray(this.options.items);
        this.observer = new IntersectionObserver(this.intersectionCallback.bind(this), this.observerOptions);
        
        this.init();
    }
    
    mergeOptions(options) {
        const defaultOptions = {
            container: null,
            items: '.item',
            threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            containerMargin: '0px',
            ratio: 0.2,
        };
        
        for(const attr in options) {
            defaultOptions[attr] = options[attr];
        }

        return defaultOptions;
    }
    
    init() {
        if(this.items.length > 0) {
            this.items.forEach((item) => {
                this.observer.observe(item);
            });
        }
    }
    
    toArray(items) {
        if(typeof items === 'string') {
            items =  [...document.querySelectorAll(items)];
        } else {
            if(items instanceof NodeList) {
                items = [...items];
            } else {
                items = [items];
            }
        }
        
        return items;
    }
    
    intersectionCallback(entries, observer) {
        entries.forEach((entry) => {
            const item = entry.target;
            
            if(entry.intersectionRatio > this.options.ratio && !item.classList.contains('is-visible')) {
                item.classList.add('is-visible');
                this.observer.unobserve(item);
            }
        });
    }
    
    destroy() {
        this.observer.disconnect();
    }
}

export default Inview;