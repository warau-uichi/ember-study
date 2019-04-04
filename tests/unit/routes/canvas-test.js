import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | canvas', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:canvas');
    assert.ok(route);
  });
});
