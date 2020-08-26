const comments = document.querySelector(".comments");
const btnComment = document.querySelector(".btn-comment");
const inputComment = document.querySelector(".comment-input");

function Comment(text) {
  this.text = text;
  this.addComment = function () {
    let item = document.createElement("li");
    item.innerHTML = this.text;
    comments.append(item);
  };
}

btnComment.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputComment.value) {
    const comment = new Comment(inputComment.value);
    inputComment.value = "";
    comment.addComment(); //closure: inner: {item: node}, outer: {text: String}
  } else {
    alert("add your comment");
  }
});

function getDate() {
  const date = new Date();
  const dateStr = `<h2>Today:</h2><p>year: ${date.getFullYear()} : month: ${date.getMonth()} : day: ${date.getDay()}<p/>`;
  return function addDate() {
    document.querySelector(".date").innerHTML = dateStr;
  };
}

const renderDate = getDate(); //closure: inner: {null}, outer: {date: obj}
renderDate();
