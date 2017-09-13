var date = new Date();
function getGUIDTime() {
    return addZero(date.getHours()) + addZero(date.getMinutes()) + addZero(date.getSeconds()) + addZero( parseInt(date.getMilliseconds() / 10 ));
}
function formatGUID(guidStr) {
    var str1 = guidStr.slice(0, 8) + '-',
        str2 = guidStr.slice(8, 12) + '-',
        str3 = guidStr.slice(12, 16) + '-',
        str4 = guidStr.slice(16, 20) + '-',
        str5 = guidStr.slice(20);
    return str1 + str2 + str3 + str4 + str5;
}
function hexadecimal(num, x, y) {
    if (y != undefined) {
        return parseInt(num.toString(), y).toString(x);
    } else {
        return parseInt(num.toString()).toString(x);
    }
}
function getGUIDDate() {
    return date.getFullYear() + addZero(date.getMonth() + 1) + addZero(date.getDay());
}
function addZero(num) {
    if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
        return '0' + Math.floor(num);
    } else {
        return num.toString();
    }
}

exports.newGUID = function() {
    date = new Date();
    var guidStr = '';
    var sexadecimalDate = hexadecimal(getGUIDDate(), 16);
    var sexadecimalTime = hexadecimal(getGUIDTime(), 16);
    for (var i = 0; i < 9; i++) {
        guidStr += Math.floor(Math.random()*16).toString(16);
    }
    guidStr += sexadecimalDate;
    guidStr += sexadecimalTime;
    while(guidStr.length < 32) {
        guidStr += Math.floor(Math.random()*16).toString(16);
    }
    return formatGUID(guidStr);
}
