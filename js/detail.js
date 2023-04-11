
window.addEventListener('load', function () {
  var preview_img = document.querySelector('.preview_img');
  var mask = document.querySelector('.mask');
  var big = document.querySelector('.big');
  var big_img = this.document.querySelector('.bigImg');
  //控制选中框和放大框的显示与隐藏,注意事件mouseover 与mousemove的不同，前者可以对子元素也起作用，后者只对绑定响应事件的元素起作用，如果一旦有子元素遮盖，那么就不会起作用
  preview_img.addEventListener('mouseover', function () {
    mask.style.display = 'block';
    big.style.display = 'block';
  })

  preview_img.addEventListener('mouseout', function () {
    mask.style.display = 'none';
    big.style.display = 'none';
  })

  // 让选中框跟随鼠标移动

  preview_img.addEventListener('mousemove', function (e) {
    //计算出鼠标在事件框中的相对位置，这里需要注意的地方就是能否获取到事件框相对body的偏移量，因为鼠标是直接获取到相对body的坐标的。所以就要确定事件框的父类没有定位。

    var X = e.pageX - this.offsetLeft;
    var Y = e.pageY - this.offsetTop;

    var maskX = X - mask.offsetWidth / 2;
    var maskY = Y - mask.offsetHeight / 2;
    var maskMax = this.offsetWidth - mask.offsetWidth;
    if (maskX < 0) { maskX = 0; }
    else if (maskX > maskMax) {
      maskX = maskMax;
    }
    if (maskY < 0) { maskY = 0; }
    else if (maskY > maskMax) {
      maskY = maskMax;
    }
    mask.style.left = maskX + 'px';
    mask.style.top = maskY + 'px';
    //大图片的移动
    // 小图和大图是按比例移动的，那么就先按比例求出大图的移动距离；
    // 这么写是有问题的，因为图片尺寸不规律
    // var proportion = (mask.offsetHeight / big_img.offsetHeight);
    var bigMax = Math.abs(big.offsetHeight - big_img.offsetHeight);
    // 比例是两个不同框移动距离的比例，不是两框的比例
    var proportion = maskMax / bigMax;
    console.log(proportion);

    big_img.style.left = -(maskX / proportion) + "px";
    big_img.style.top = -(maskY / proportion) + 'px';
  })

})