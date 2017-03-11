// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Comment from './components/Comment'
import SelectOption from './components/SelectOption'
import App from './App'
import Ranger from './ranger'

let ranger = new Ranger();

Vue.config.productionTip = false
localStorage.setItem('debug', 'leancloud*');

var optionView = new Vue({
    template: '<SelectOption/>',
    components: { SelectOption }
}).$mount()

var commentView = new Vue({
    template: '<Comment/>',
    components: { Comment }
}).$mount();

optionView.$children[0].$on("comment",function(){
  // 显示评论框并传递selection的文本
  commentView.$children[0].$emit("visibility", true);
  commentView.$children[0].$emit("text", ranger.text());
  // 隐藏optionView
  optionView.$children[0].$emit("visibility", false);
  // 高亮选中的文本
  ranger.highlight();
  console.log(ranger.serializeSelection());
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
    let postion = ranger.position();
    optionView.$children[0].$emit("visibility", true, postion);
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
