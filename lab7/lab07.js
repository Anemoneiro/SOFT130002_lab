const works = [
    { author: "Micheal Jackson",lifetime:"1022-1055",tips: "Human", photos: ["human1.jpg","human2.jpg","human3.jpg"] },
    { author: "Maria JK",lifetime:"1920-2001", tips: "Classical", photos: ["classical1.jpg","classical2.jpg"] },
    { author: "John Herry UY", lifetime:"1894-1928",tips: "Abstract", photos: ["abstract1.jpg","abstract2.jpg","abstract3.jpg","abstract4.jpg","abstract5.jpg"] },
    { author: "Coco",lifetime:"1777-1799", tips: "Beauty",  photos: ["beauty1.jpg","beauty2.jpg"] }
];

/* 注意:①除了Genre后的:左右的空格以及必要的单词间空格，lab7的js里面不会出现设置字体、添加空格什么的代码....
 * 顶多会出现设置display和marginLeft为1em的代码
 * ②与作者名同行的lifetime的字是h5，在css中并没有。
 * ③css中的item p不存在，其实是个干扰项。*/

//workItem
const workItem = document.createElement("div");
workItem.className = "item";

const Genre = document.createElement("h4");
const authorDetailBox = document.createElement("div");
const workPhotosBox = document.createElement("div");
const visitBtn = document.createElement("button");

authorDetailBox.className = "inner-box";
workPhotosBox.className = "inner-box";
visitBtn.innerText = "Visit";

workItem.appendChild(Genre);
workItem.appendChild(authorDetailBox);
workItem.appendChild(workPhotosBox);
workItem.appendChild(visitBtn);

//authorDetailBox
const authorName = document.createElement("h3");
const lifetime = document.createElement("h5");

authorName.style.display = "inline";
lifetime.style.display = "inline";
lifetime.style.marginLeft = "1em";

authorDetailBox.appendChild(authorName);
authorDetailBox.appendChild(lifetime);

//workPhotosBox
const photoTitle = document.createElement("h3");
workPhotosBox.appendChild(photoTitle);

//设置高度以显示body内容
document.body.style.height = "100vh";
//双击显示
document.body.addEventListener("dblclick", function() {
    const flexContainer = document.getElementsByClassName("flex-container justify")[0];

    works.forEach(work => {
        //复制模板workItem
        let workNode = workItem.cloneNode(true);

        //在workNode中填写详细信息
        workNode.getElementsByTagName("h4")[0].innerText = "Genre : " + work.tips;
        workNode.getElementsByTagName("h3")[0].innerText = work.author;
        workNode.getElementsByTagName("h5")[0].innerText = "lifetime:" + work.lifetime;
        workNode.getElementsByTagName("h3")[1].innerText = "Popular Photos";

        //在workNode中Popular photos项写入photo
        let photoTitle = workNode.getElementsByTagName("h3")[1];
        work.photos.forEach(src => {
            let photoImg = document.createElement("img");
            photoImg.className = "photo"
            photoImg.src = src;
            photoTitle.parentNode.appendChild(photoImg);
        });

        flexContainer.appendChild(workNode);
    });
});