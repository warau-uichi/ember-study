import Controller from '@ember/controller';
import cronstrue from 'cronstrue';

export default Controller.extend({
    actions: {
        sayHello() {
            alert('Hello!');
        },
        toggleShowingSomething() {
            this.toggleProperty('isShowingSomething');
        },
        submitAction() {
            alert('Submitted');
        },
        validateCron() {
            let cron = this.get('cron');
            let res = cronstrue.toString(cron);
            this.set('results', res);
        }
    }
});
