# Web Lab7设计文档

段欣然 18307130295



## lab完成过程中的困难与解决方案



#### 问题1：如何在html文档中创建多个相同格式的组成部分？

#### 解决方法

创建一个div模板workItem，将该模板的子节点全部创建好之后，在实际操作时一一加入文档中的flex-container，作为其子节点。克隆时要选择true，即复制子节点。

```javascript
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

...

document.body.addEventListener("dblclick", function() {
    const flexContainer = document.getElementsByClassName("flex-container justify")[0];

    works.forEach(work => {
        //复制模板workItem
        let workNode = workItem.cloneNode(true);
        
        ...
        
        flexContainer.appendChild(workNode);
    });
});
```



#### 问题2：为什么监听器创建好后双击不显示页面元素？

#### 解决方法

对于document.body设置height后即可显示。

```javascript
//设置高度以显示body内容
document.body.style.height = "100vh";
```



#### 问题3：如何得到文档中的目标元素？

#### 解决方法

可以使用getElementsByClassName，但要注意这里取得的是对象集合，需要通过下标进行访问。也可以用quertSelector进行直接访问。

```javascript
const flexContainer = document.getElementsByClassName("flex-container justify")[0];
```



#### 问题4：如何在模板中注入详细信息？

#### 解决方法

由于workNode所提供的getElements的方法只有getElementsByTagName，因此由此前设置的tag可以得到各个子节点，再对它们的innerText进行直接赋值即可。

```javascript
        //在workNode中填写详细信息
        workNode.getElementsByTagName("h4")[0].innerText = "Genre : " + work.tips;
        workNode.getElementsByTagName("h3")[0].innerText = work.author;
        workNode.getElementsByTagName("h5")[0].innerText = "lifetime:" + work.lifetime;
        workNode.getElementsByTagName("h3")[1].innerText = "Popular Photos";
```

