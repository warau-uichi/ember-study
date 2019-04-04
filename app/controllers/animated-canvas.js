import Controller from '@ember/controller';

export default Controller.extend({
    init() {
        this._super(...arguments);
        this.set('next_step', 0);
    },
    actions: {
        uploadIcon(e) {
            let reader = new FileReader();
            reader.onload = function(event){
                this.set('icon_src', event.target.result);
            }.bind(this);
            reader.readAsDataURL(e.target.files[0]);
        },
        stepForward() {
            this.set('next_step', this.next_step+100);
        },
        stepBackward() {
            this.set('next_step', this.next_step-100);
        },
        uploadForwardAudio(e) {
            this.set('forward_audio_file', e.target.files[0]);
        },
        uploadBackwardAudio(e) {
            this.set('backward_audio_file', e.target.files[0]);
        },
        uploadDraggableIcon(e) {
            let reader = new FileReader();
            reader.onload = function(event){
                this.set(
                    'draggable_icon_src',event.target.result);
            }.bind(this);
            reader.readAsDataURL(
                e.target.files[0]);
        },
        editOnDotLineLayer() {
            this.set('edit_on_dot_line_layer', true);
            this.set('edit_on_draggable_icon_layer', false);
        },
        editOnDraggableIcon() {
            this.set('edit_on_dot_line_layer', false);
            this.set('edit_on_draggable_icon_layer', true);
        }
    }
});
