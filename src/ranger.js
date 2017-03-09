import rangy from 'rangy';
import rangyTextRange from 'rangy/lib/rangy-textrange';
import rangyHighlighter from 'rangy/lib/rangy-highlighter';
import rangySerializer from 'rangy/lib/rangy-serializer';
import rangyClassApplier from 'rangy/lib/rangy-classapplier';
import rangySaveRestore from 'rangy/lib/rangy-selectionsaverestore';

export default class Ranger {

    constructor() {
      rangy.init();
      var highlighter;
      highlighter = rangy.createHighlighter();
      highlighter.addClassApplier(rangy.createClassApplier("highlight", {
          ignoreWhiteSpace: true,
          tagNames: ["span", "a"]
      }));
      highlighter.addClassApplier(rangy.createClassApplier("note", {
          ignoreWhiteSpace: true,
          elementTagName: "a",
          elementProperties: {
              href: "#",
              onclick: function() {
                  var highlight = highlighter.getHighlightForElement(this);
                  if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                      highlighter.removeHighlights( [highlight] );
                  }
                  return false;
              }
          }
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
}
