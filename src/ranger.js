import rangy from 'rangy';
import rangyTextRange from 'rangy/lib/rangy-textrange';
import rangyHighlighter from 'rangy/lib/rangy-highlighter';
import rangySerializer from 'rangy/lib/rangy-serializer';
import rangyClassApplier from 'rangy/lib/rangy-classapplier';
import rangySaveRestore from 'rangy/lib/rangy-selectionsaverestore';

import storage from './storage';

export default class Ranger {

    constructor() {
      rangy.init();
      var highlighter;
      highlighter = rangy.createHighlighter();
      highlighter.addClassApplier(rangy.createClassApplier("highlight", {
          ignoreWhiteSpace: true,
          tagNames: ["span"]
      }));
      highlighter.addClassApplier(rangy.createClassApplier("note", {
          ignoreWhiteSpace: true,
          elementTagName: "span"
      }));

      this.highlighter = highlighter;
    }

    text() {
      return rangy.getSelection().toString();
    }

    position() {
        // getSelection 为 Chrome 浏览器的获取方法
        let selection = document.getSelection();

        // oRect 为获得的选中区域的坐标
        // 接口为 {bottom: number, top: number}
        let oRect = selection.getRangeAt(0).getBoundingClientRect();
        return oRect;
    }

    highlight() {
      this.highlighter.highlightSelection("highlight");
    }

    note() {
      this.highlighter.highlightSelection("note");
    }

    serializeHL() {
      return this.highlighter.serialize(rangy.getSelection());
    }

    deserializeHL(serialized) {
      if (serialized instanceof Array) {
        serialized.forEach(value => {
          this.highlighter.deserialize(value);
        })
      } else if (typeof serialized == "string") {
        this.highlighter.deserialize(serialized);
      }
    }

    serializeSelection() {
      return rangy.serializeSelection();
    }

    restoreSelection(value) {
        return rangy.deserializeSelection(value);
    }

    showAllMark() {
      storage.mark.get(window.location.href)
        .then((data) => {
          let hashArray = [];
          data.forEach(value => {
            hashArray.push(value.attributes.serialize);
          })
          return hashArray;
        })
        .then(array => {
          this.deserializeHL(array)
        })
      storage.comment.all(window.location.href)
        .then((data) => {
          let hashArray = [];
          data.forEach(value => {
            hashArray.push(value.attributes.serialize);
          })
          return hashArray;
        })
        .then(array => {
          this.deserializeHL(array)
        })
    }
}
