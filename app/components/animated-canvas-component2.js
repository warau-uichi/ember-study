import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    tagName: 'canvas',
    attributeBindings: ['width', 'height'],
    width: 400,
    height: 400,
    classNameBindings: ['isEditable:editable'],
    isEditable: false,
    acs: service('animated-canvas-service'),

    init() {
        this._super(...arguments);
        this.set('t', 1);
        this.set('img', null);
        this.set('cur_step', 0);
        this.set('begin', 0);
        this.set('end', 0);
        this.set('waypoints', []);
        this.set('has_icon', false);
    },

    didInsertElement() {
        this.set('ctx', this.get('element').getContext('2d'));
    },

    didReceiveAttrs() {
        if (this.get('icon_src') && !this.has_icon) {
            this._applyIcon(this.get('icon_src'));
            this.has_icon = true;
        }
        if (this.cur_step != this.get('next_step')) {
            if (this.cur_step < this.get(
                'next_step') && this.get('forward_audio_file')) {
                    this._playAudio(this.get('forward_audio_file'));
            } else if (this.cur_step > this.get(
                'next_step') && this.get('backward_audio_file')) {
                    this._playAudio(this.get('backward_audio_file'));
            }
            this._moveIcon(this.cur_step, this.get('next_step'));
            if (this.get('next_step')-1 > -1) {
                this.cur_step = this.get('next_step')-1;
            } else {
                this.cur_step = this.get('next_step');
            }
        }
    },

    _applyIcon(icon_src) {
        this.icon = new Image();
        this.icon.src = icon_src;
        this.icon.onload = function() {
            this.icon.width = this.icon.width/8;
            this.icon.height = this.icon.height/8;
            this.ctx.drawImage(
                this.icon,
                this.acs.points[0].x - this.icon.width/2,
                this.acs.points[0].y - this.icon.height/2,
                this.icon.width,
                this.icon.height);
        }.bind(this);
    },

    _moveIcon(start_step, end_step) {
        if (this.acs.points.length > 0) {
            this.t = 1;
            if (start_step < end_step) {
                this.waypoints = this.acs.waypoints.slice(
                    start_step, end_step);
            } else {
                this.waypoints = this.acs.waypoints.slice(
                    end_step, start_step).reverse();
            }
            this._animateIcon();
        }
    },

    _animateIcon() {
        this.ctx.clearRect(
            this.waypoints[this.t-1].x - this.icon.width/2,
            this.waypoints[this.t-1].y - this.icon.height/2,
            this.icon.width + 10,
            this.icon.height + 10);
        this.ctx.drawImage(
            this.icon,
            this.waypoints[this.t].x - this.icon.width/2,
            this.waypoints[this.t].y - this.icon.height/2,
            this.icon.width,
            this.icon.height);
        this.t++;
        if (this.t < this.waypoints.length) {
            requestAnimationFrame(
                this._animateIcon.bind(this));
        }
    },

    _playAudio(aud_file) {
        let reader = new FileReader();
        reader.onload = function(event){
            let aud_ctx = new AudioContext();
            aud_ctx.decodeAudioData(event.target.result).then(
                function(buffer) {
                    let src = aud_ctx.createBufferSource();
                    src.buffer = buffer;
                    src.loop = false;
                    src.connect(aud_ctx.destination);
                    src.start(0);
                })
        }
        reader.readAsArrayBuffer(aud_file);
    }
});
