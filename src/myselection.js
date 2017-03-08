export default {


    text:() => {
      let text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    },

    position: () => {
        // getSelection 为 Chrome 浏览器的获取方法
        var selectRange = document.getSelection();

        // oRect 为获得的选中区域的坐标
        // 接口为 {bottom: number, top: number}
        var oRect = selectRange.getRangeAt(0).getBoundingClientRect();
        return oRect;
    }
}
