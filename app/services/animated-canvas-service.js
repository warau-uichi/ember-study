import Service from '@ember/service';

export default Service.extend({
    init() {
        this._super(...arguments);
        this.set('points', []);
        this.set('waypoints', []);
    },

    addPoints(x, y) {
        this.points.addObject(
            {x: x, y: y});
    },

    addWaypoints(points) {
        this.waypoints = this._calcWaypoints(points);
    },

    _calcWaypoints(points) {
        let waypoints = [];
        for (let i = 1; i < points.length; i++) {
            let pt0 = points[i - 1];
            let pt1 = points[i];
            let dx = pt1.x - pt0.x;
            let dy = pt1.y - pt0.y;
            for (let j = 0; j < 100; j++) {
                let x = pt0.x + dx * j / 100;
                let y = pt0.y + dy * j / 100;
                waypoints.push({
                    x: x,
                    y: y
                });
            }
        }
        return waypoints;
    }
});
