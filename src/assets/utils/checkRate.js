export default function checkRate(input) {
    let res = /^[0-9]+.?[0-9]*/
    if(!res.test(input)) {
    	alert("请输入数字")
    	return false;
    } else {
    	return true;
    }
}