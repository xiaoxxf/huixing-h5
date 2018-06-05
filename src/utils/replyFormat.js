//reformat reply data
export const replyFormat = (reply) => {
  const comments = new Map();
  let replyHtml = '<div class="comment-list">';
  const commentIdArr = reply.commentIds;
  const commentsArr = reply.comments;
  commentsArr.forEach((item, index) => {
    comments.set(item.id + '', {
      content: item
    })

  })
  console.log(comments)
  // console.log(comments.get(1266).content.content)
  commentIdArr.forEach((item, index) => {
    let itemArr = item.split(',');
    let res = itemArr.reduce(function (accumulator, currentValue, currentIndex, array) {
     // console.log(`当前索引：${currentIndex},当前值：${accumulator},当前value:${currentValue}`);

      let item = comments.get(currentValue).content;

      if (array.length == 1) {
        return `<div class="comment">
                   <p class="content">${ item.content }</p>
                  <span class="reply">回复</span>
                 </div>`
      }
      if (currentIndex < array.length - 1) {
        return `<div class="floor">
                ${accumulator}
                  <span data-firstfloor="false" class="fl-l floor-num">${ currentIndex + 1 }</span>
                  <section class="inner-wrap">
                      <p class="tie-head clearfix">
                          <span class="fl-l author97 author">wblin0907 网易江苏省南京网友：</span>
                      </p>
                      <p class="content">${ item.content }</p>
                  </section>
              </div>`;
      }
      return `<div class="comment">
                <p class="comment-title clearfix">
                <span class="fl-l author61">众泰的人跟我一起冲P城 网易湖南省长沙市网友：</span>
                <span class="fl-r vote">
                  <span class="vote-icon"></span>
                  <span class="vote-num">53</span></span>
              </p>
              ${accumulator}
              <p class="content">${ item.content }</p>
                <span class="reply">回复</span>
            </div>`;
    }, '');
    replyHtml += res;
  })
  replyHtml += '</div>'
  return replyHtml;
  // const commentIds = reply[0].commentIds;
}
