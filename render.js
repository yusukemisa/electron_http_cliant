document.addEventListener("DOMContentLoaded", ()=> {
  //formのsubmit時の動作を定義
  document.getElementById("comment-form").onsubmit = addComment;
});

function addComment() {
  //コメントを入力するinputを取得する
  const commentInput = document.getElementById("comment-input");
  if (commentInput.value === "") {
    //コメントなし
    return false;
  }
  // 入力されたコメントをもとにリスト要素を作成
  const newComment = document.createElement("li");

  // 作成したリスト要素をDOMに挿入
  newComment.innerText = commentInput.value;
  document.getElementById("comments").appendChild(newComment);

  // コメント入力のinputは空にしておく
  commentInput.value = "";
  return false;
}
