// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import MuseUI from 'muse-ui';

import 'muse-ui/dist/muse-ui.css';

// 显示组件
import Comment from './components/Comment'
import SelectOption from './components/SelectOption'
import App from './App'

import Store from './store/index';

// 托选操作类
import Ranger from './ranger'

Vue.use(Vuex);
Vue.use(MuseUI);
Vue.config.productionTip = false;

let ranger = new Ranger();
const store = new Vuex.Store(Store);
localStorage.setItem('debug', 'leancloud*');

// 初始化并挂载显示组件
var optionView = new Vue({
    store,
    render: h => h(SelectOption)
}).$mount()

var commentView = new Vue({
    store,
    render: h => h(Comment)
}).$mount();

optionView.$children[0].$on("comment",function(status, serialized){
  // 显示评论框并传递selection的文本
  commentView.$children[0].$emit("visibility", true);
  commentView.$children[0].$emit("note", ranger.text(), serialized);
  // 隐藏optionView
  optionView.$children[0].$emit("visibility", false);
  // 高亮选中的文本
  ranger.highlight();
})


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
      type: 'changeVisibility',
      visibility: true,
      position
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

document.onload = ranger.showAllMark();
