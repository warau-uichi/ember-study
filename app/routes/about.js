import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return ['around', 'bars', 'code', 'delicious', 'enough'];
    }
});
