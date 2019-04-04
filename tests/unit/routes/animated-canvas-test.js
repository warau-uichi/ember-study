import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | animated-canvas', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:animated-canvas');
    assert.ok(route);
  });
});
