import AV from 'leancloud-storage';

const appId = '2y7v8BdJxedXm5a5sNBji5Aj-gzGzoHsz';
const appKey = 'heXMkHNlopCuUXWzYPpnjcRw';

AV.init({ appId, appKey });

const Comment = AV.Object.extend('Comments');
const Mark = AV.Object.extend('Marks');
const currentUser = AV.User.current();

export default {
  user: {
    login() {
      AV.User.logIn('keifer', '123').then(function (loginedUser) {
        console.log("login info:");
         console.log(loginedUser);
       }, function (error) {
       });
    },
    register() {
    },
    info() {

    }
  },
  comment: {
    get({text, url}) {
      let queryUrl = new AV.Query('Comments');
      let queryText = new AV.Query('Comments');
      queryUrl.equalTo('url', url);
      queryText.equalTo('text', text);
      let query = AV.Query.and(queryUrl, queryText);
      return query.find()
    },

    add({serialize, text, url, comment}) {
      // 构建数据储存对象
      let data = new Comment();
      data.set('user', currentUser.id);
      data.set('serialize', serialize);
      data.set('url', url);
      data.set('text', text);
      data.set('comment', comment);
      // 保存数据
      return data.save()
    },

    all(url) {
      let queryNote = new AV.Query('Comments');
      queryNote.equalTo('url', url);
      return queryNote.find();
    }
  },

  mark: {
    add(serialize, text, url) {
      let data = new Mark();
      data.set('user', currentUser.id);
      data.set('url', url);
      data.set('text', text);
      data.set('serialize', serialize);
      // 保存数据
      return data.save()
    },

    get(url) {
      let queryUrl = new AV.Query('Marks');
      queryUrl.equalTo('url', url);
      return queryUrl.find()
    }
  }
}
