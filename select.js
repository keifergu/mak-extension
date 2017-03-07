function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function getSelectionPostion() {
    // getSelection 为 Chrome 浏览器的获取方法
    var selectRange = document.getSelection();

    // oRect 为获得的选中区域的坐标
    // 接口为 {bottom: number, top: number}
    var oRect = selectRange.getRangeAt(0).getBoundingClientRect();
    return oRect;
}

function textSelect() {
    var text = getSelectionText();
    var postion = getSelectionPostion();
    showView(text, postion);
}

var optionView = document.createElement("div");
var commentView = document.createElement("div");
optionView.setAttribute("class", "me-view");
optionView.setAttribute("hidden", true);
commentView.setAttribute("class", "comment-view");
commentView.setAttribute("hidden", true);

optionView.innerHTML = `
    <button class="comment-button" onclick="showCommentView()">=</button>
`;
commentView.innerHTML = `
    <div class="comment-title">Comment List</div>
    <div class="comment-list">This is list;</div>
    <div class="comment-new">
        <input type="text" name="newComment" value="">
        <input type="submit">
    </div>
`;

document.body.appendChild(optionView);
document.body.appendChild(commentView);

function showView(data, pos) {
    console.log(data);
    optionView.removeAttribute("hidden")
    optionView.setAttribute("style", `top:${pos.top + 20}px;left:${pos.left + 15}px`);
}

function hiddenView() {
    optionView.setAttribute("hidden", true);
}

function showCommentView() {
    console.log(commentView)
    commentView.removeAttribute("hidden");
}

function init() {
    var selectEventList = ["dblclick"];
    selectEventList.forEach((event) => {
        document.addEventListener(event, textSelect, true);
    });
    var cancelEventList = ["click"];
    cancelEventList.forEach((event) => {
        document.addEventListener(event, hiddenView);
    })
}

var store = {
    save: function(textData) {

        localStorage.setItem("textArray", "data");
    }
}
init();