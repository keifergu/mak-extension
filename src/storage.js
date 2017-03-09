import AV from 'leancloud-storage';

const appId = '2y7v8BdJxedXm5a5sNBji5Aj-gzGzoHsz';
const appKey = 'heXMkHNlopCuUXWzYPpnjcRw';

AV.init({ appId, appKey });

let Comment = AV.Object.extend('Comments');
let Mark = AV.Object.extend('Marks');

export default {
  comment: {
    get(text, url) {
      let queryUrl = new AV.Query('Comments');
      let queryText = new AV.Query('Comments');
      queryUrl.equalTo('url', url);
      queryText.equalTo('text', text);
      let query = AV.Query.and(queryUrl, queryText);
      return query.find()
    },

    add(text, url, comment) {
      // 构建数据储存对象
      let data = new Comment();
      data.set('url', url);
      data.set('text', text);
      data.set('comment', comment);
      // 保存数据
      return data.save()
    }
  },

  mark: {
    add(serialize, text, url) {
      let data = new Mark();
      data.set('url', url);
      data.set('text', text);
      data.set('serialize', serialize);
      // 保存数据
      return data.save()
    }
  }
}
