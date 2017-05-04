'use babel';

import EdgeView from './edge-view';
import { CompositeDisposable } from 'atom';

export default {

  edgeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.edgeView = new EdgeView(state.edgeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.edgeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'edge:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.edgeView.destroy();
  },

  serialize() {
    return {
      edgeViewState: this.edgeView.serialize()
    };
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
