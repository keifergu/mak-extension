// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SelectOption from './components/SelectOption'
import Comment from './components/Comment'
import App from './App'
import myselection from './myselection'

Vue.config.productionTip = false
localStorage.setItem('debug', 'leancloud*');

function showOption() {
    let postion = myselection.position();
    optionView.$children[0].$emit("visibility", true, postion);
}

var optionView = new Vue({
    template: '<SelectOption/>',
    components: { SelectOption }
}).$mount()

var commentView = new Vue({
    template: '<Comment/>',
    components: { Comment }
}).$mount();

optionView.$children[0].$on("comment",function(){
  commentView.$children[0].$emit("visibility", true);
  commentView.$children[0].$emit("text", myselection.text());
})


document.body.appendChild(optionView.$el);
document.body.appendChild(commentView.$el);

document.addEventListener("dblclick", showOption, true);

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})