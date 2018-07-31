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