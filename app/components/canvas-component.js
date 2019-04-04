import Component from '@ember/component';

export default Component.extend({
    init() {
        this._super(...arguments);
        this.set('dots', []);
    },
    actions: {
        putDot(event){
            let e = event;
            this.dots.addObject(
                {x: e.clientX, y: e.clientY});
        }
    }
});
