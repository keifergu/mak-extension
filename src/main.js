// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex'
import MuseUI from 'muse-ui';

import 'muse-ui/dist/muse-ui.css';

// 显示组件
import Comment from './components/Comment'
import SelectOption from './components/SelectOption'
import App from './App'

import Store from './store'
import * as types from './store/mutation-types'

// 托选操作类
import Ranger from './ranger'
import storage from './api'

Vue.use(Vuex);
Vue.use(MuseUI);
Vue.config.productionTip = false;

const ranger = new Ranger();
const store = new Vuex.Store(Store);
localStorage.setItem('debug', 'false');

// 初始化并挂载显示组件
var optionView = new Vue({
    store,
    render: h => h(SelectOption)
}).$mount()

var commentView = new Vue({
    store,
    render: h => h(Comment)
}).$mount();

document.body.appendChild(optionView.$el);
document.body.appendChild(commentView.$el);

function showOption(event) {
  if (event.target === document.body){
    return ;
  }
  // 如果没有选中文本，则不显示optionView
  if (ranger.text() == "") {
    return ;
  } else {
    let position = ranger.position();
    store.commit({
      type: types.SELECT_TEXT,
      visibility: true,
      position,
      text: ranger.text()
    })
  }
}

document.addEventListener("dblclick", showOption, true);
document.addEventListener("mouseup", showOption, true);

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})

document.onload = function() {
  ranger.showAllMark();
  storage.user.register();
  storage.user.login();
}()
