function $(v) {
    if (typeof v==="function"){
        return window.onload=v;
    } else if(typeof v==="string"){
        return document.getElementById(v);
    }else if (typeof v==="object"){
        return v;
    }
}

function getStyle(obj,attr) {
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

function doMove(obj,attr,dir,target,endFn) {
    clearInterval(obj.timer);
    dir=parseInt(getComputedStyle(obj)[attr])>target?-dir:dir;
    obj.timer=setInterval(function () {
        var speed=parseInt(getComputedStyle(obj)[attr])+dir;
        if(speed<target&&dir<0||speed>target&&dir>0){
            speed=target;
        }
        obj.style[attr]=speed+'px';
        if(speed==target){
            clearInterval(obj.timer);
            endFn&&endFn();
        }
    },30);
}

function doShake(obj, attr, endFn) {
    if(obj.onOff==false){
        return;
    }
    obj.onOff=false;
    clearInterval(obj.shake);
    var num = 0;
    var pos = parseInt(getStyle(obj, attr));
    var arr = [];
    for (var i = 20; i > 0; i -= 2) {
        arr.push(i, -i);
    }
    arr.push(0);
    obj.shake = setInterval(function () {
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if (num === arr.length) {
            clearInterval(obj.shake);
            obj.onOff=true;
            endFn && endFn();
        }
    }, 80);
}