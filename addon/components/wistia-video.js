import Ember from 'ember';
import layout from '../templates/components/wistia-video';

const {
  Component,
  Logger: { warn },
  computed,
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  layout,
  matcher: null,
  email: null,
  wistia: service(),
  classNames: ['video-wrapper'],
  classNameBindings: ['isPlaying'],

  isPlaying: computed('matcher', function() {
    const wistia = get(this, 'wistia');
    return wistia.getCurrentlyPlaying() === get(this, 'matcher');
  }),

  init() {
    this._super(...arguments);
    const wistia = get(this, 'wistia');
    const email = get(this, 'email');
    const matcher = get(this, 'matcher');
    wistia.addVideo(matcher, email);
  },

  didReceiveAttrs() {
    if (!get(this, 'matcher')) {
      warn('You have not passed in a Wistia matcher');
    }
    this._super(...arguments);
  }
});
