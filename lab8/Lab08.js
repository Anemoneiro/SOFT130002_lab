
/*请在该区域内声明或者获取所要使用的全局变量*/
/********************************************begin************************************/

const leftArrow = document.getElementsByClassName("arrow_left")[0];
const rightArrow = document.getElementsByClassName("arrow_right")[0];
const btns = document.getElementsByTagName("span");
const wrapper = document.getElementsByClassName("wrap")[0];
let timer = null;

/*********************************************end*************************************/



/* 任务一
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击左箭头prev和右箭头next的时候，可以切换到前一张图片和下一张图片。（左右箭头为html中的a标签）
 * ②每切换一张图片，右下角的数字标记对应变化。
 *      如：一开始，第1张图片显示出来，右下角的1-5的数值中，数值1位红色，2-4为绿色，表示当前显示第1张图片。
 *      点击next箭头，图片切换到第2张，同时，右下角红色数值从1切换为2，数值1,3,4,5为绿色。
 * ③当当前图片为第1张时，点击prev箭头，切换到第5张图片，且数值5置为红色。
 * 当当前图片为第5张时，点击next箭头，切换到第1张图片，且数值1置为红色。
 * ④切换图片的过程不要求，可直接切换，也可动画切换，但要求保证一定的切换动画合理性，不能出去明显的衔接不当。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/

function toPrevPic() {
    let onBtn = document.getElementsByClassName("on")[0];
    let picId = onBtn.innerHTML;
    wrapper.style.left = -(picId - 1) * 600 + "px";
    if(picId == 1) picId = 6;
    onBtn.classList.remove("on");
    btns.item(picId - 2).classList.add("on");
}

function toNextPic() {
    let onBtn = document.getElementsByClassName("on")[0];
    let picId = onBtn.innerHTML;
    if(picId == 5) picId = 0;
    if(picId == 4) picId = -1
    //parseInt(a)+parseInt(b)可解决1+1 = 11问题，但为了方便使用减号即可
    wrapper.style.left = (- picId - 1) * 600 + "px";
    onBtn.classList.remove("on");
    if(picId == -1) picId = 4;
    btns.item(picId).classList.add("on");
}

leftArrow.addEventListener("click", toPrevPic);
rightArrow.addEventListener("click", toNextPic);

/*********************************************end*************************************/



/* 任务二
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①轮播可以自动播放，切换图片间隔为2s，每一次切换的效果与点击next箭头的效果一致。
 * ②当鼠标移入轮播区域内时，停止自动播放。
 * ③当鼠标不在轮播区域内时，开始自动播放。
 * ④页面刚加载完成时，如果鼠标不在轮播区域内，自动开始自动播放；否则，等待直到鼠标移出轮播区域，再进行自动播放。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/

function myCarousel() {
    timer = setInterval(function() {
        toNextPic()}, 2000);
}

window.addEventListener("load", function() {
    myCarousel();
});

wrapper.addEventListener("mouseover", function() {
    clearInterval(timer);
});

wrapper.addEventListener("mouseout", function() {
    myCarousel();
});

//左右箭头也在区域内
leftArrow.addEventListener("mouseover", function() {
    clearInterval(timer);
});

rightArrow.addEventListener("mouseover", function() {
    clearInterval(timer);
});

/*********************************************end*************************************/



/* 任务三
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击右下角的任意一个数值，能够切换到对应图片，且相应数值变为红色。
 * ②进行①操作过后，是否自动播放，其规则与上一个任务一致。
 * ③本部分只能使用原生JS。
 */
/********************************************begin************************************/

function btnOnClick() {
    for(let i = 0 ; i < btns.length; i++ ) {
        let nowBtn = btns.item(i);
        nowBtn.addEventListener("click", function () {
            let onBtn = document.getElementsByClassName("on")[0];
            let picId = nowBtn.innerHTML;
            wrapper.style.left = (- picId) * 600 + "px";
            onBtn.classList.remove("on");
            nowBtn.classList.add("on");
        });
        nowBtn.addEventListener("mouseover", function() {
            clearInterval(timer);
        });
    }
}

btnOnClick();

/*********************************************end*************************************/


/*任务四
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击某一非表头的单元格，可以编辑其内容，编辑完毕后点击其他部位，可以在界面上显示修改后的内容。
 * ②点击单元格后，光标自动定位于单元格的首个字符或者汉字前。
 * ③本部分可以使用jQuery，也可以使用原生JS。
 */
/********************************************begin************************************/

$('table td').click(function(){
    if(!$(this).is('.input')){
        //将原来的位置替换为input框
        $(this).addClass('input').html('<input type="text" value="'+ $(this).text() +'" />').find('input').focus().blur(function() {
            //失去对焦之后删除input框，html变为input框中的值
            $(this).parent().removeClass('input').html($(this).val() || 0);
        });
    }
    //光标自动定位于单元格的首个字符或者汉字前
    $(this).textFocus(0);  
});

/*********************************************end*************************************/