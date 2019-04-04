import Component from '@ember/component';


export default Component.extend({
    tagName: 'span',
    attributeBindings: ['style'],
    style: null,
    didReceiveAttrs() {
        this._super(...arguments);
        this.set('style', 'position:relative; left:' + this.x + 'px; top:' + this.y + 'px; padding: 30px; background-color:blue;');
    }
});