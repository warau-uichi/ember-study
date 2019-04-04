import Component from '@ember/component';

export default Component.extend({
    tagName: 'canvas',
    attributeBindings: ['width', 'height'],
    width: 400,
    height: 400,
    classNameBindings: ['isEditable:editable'],
    isEditable: false,

    init() {
        this._super(...arguments);
        this.set('has_icon', false);
        this.set('icon_x', 0);
        this.set('icon_y', 0);
        this.set('is_dragging', false);
    },

    didInsertElement() {
        this.set('ctx', this.get('element').getContext('2d'));
    },

    didReceiveAttrs() {
        if (this.get('draggable_icon_src') && !this.has_icon) {
            this._applyIcon(this.get('draggable_icon_src'));
            this.has_icon = true;
        }
    },

    didUpdateAttrs() {
        if (this.isEditable != this.get('is_editable')) {
            this.set('isEditable', this.get('is_editable'));
        }
    },

    mouseDown(event) {
        let e = event;
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        if (this.icon_x < x && (
            this.icon_x + this.icon.width
            ) > x && this.icon_y < y && (
            this.icon_y + this.icon.height) > y) {
                this.is_dragging = true;
        }
    },

    mouseMove(event) {
        let e = event;
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        if (this.is_dragging) {
            this.ctx.clearRect(
                this.icon_x, this.icon_y,
                this.icon.width, this.icon.height);
            this.icon_x = x - this.icon.width/2;
            this.icon_y = y - this.icon.height/2;
            this.ctx.drawImage(
                this.icon,
                this.icon_x,
                this.icon_y,
                this.icon.width,
                this.icon.height);
        }
    },

    mouseUp(event) {
        this.is_dragging = false;
    },

    mouseOut(event) {
        this.mouseUp(event);
    },

    _applyIcon(icon_src) {
        this.icon = new Image();
        this.icon.src = icon_src;
        this.icon.onload = function() {
            this.icon.width = this.icon.width/8;
            this.icon.height = this.icon.height/8;
            this.ctx.drawImage(
                this.icon,
                this.icon_x,
                this.icon_y,
                this.icon.width,
                this.icon.height);
        }.bind(this);
    }
});
