import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    tagName: 'canvas',
    attributeBindings: ['width','height'],
    width: 400,
    height: 400,
    classNameBindings: ['isEditable:editable'],
    isEditable: true,
    acs: service('animated-canvas-service'),

    init() {
        this._super(...arguments);
        this.set('t', 1);
    },

    didInsertElement() {
        this.set('ctx', this.get('element').getContext('2d'));
    },

    didUpdateAttrs() {
        if (this.isEditable != this.get('is_editable')) {
            this.set('isEditable', this.get('is_editable'));
        }
    },

    click(event) {
        let e = event;
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        this.acs.addPoints(x, y);
        this._drawPoint(x, y, 10);
        if (this.acs.points.length > 1) {
            // calculate incremental points along the path
            this.acs.addWaypoints(this.acs.points);
            // extend the line from start to finish with animation
            this._animate();
        }
    },

    _drawPoint(x, y, width) {
        this.ctx.fillStyle = 'pink';
        this.ctx.arc(x, y, width, 0, 2 * Math.PI);
        this.ctx.fill();
    },

    _animate() {
        this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.strokeStyle = 'purple';
        this.ctx.lineWidth = 5;
        // draw a line segment from the last waypoint
        // to the current waypoint
        this.ctx.beginPath();
        this.ctx.moveTo(
            this.acs.waypoints[this.t-1].x,
            this.acs.waypoints[this.t-1].y);
        this.ctx.lineTo(
            this.acs.waypoints[this.t].x,
            this.acs.waypoints[this.t].y);
        this.ctx.closePath();
        this.ctx.stroke();
        // increment "t" to get the next waypoint
        this.t++;
        if (this.t < this.acs.waypoints.length - 1) {
            requestAnimationFrame(this._animate.bind(this));
        }
    }
});
