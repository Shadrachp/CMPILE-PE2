document.addEventListener("DOMContentLoaded", function(event) {
});

var flag = true;
var op_flag = false;
var eq_flag = false;

function get_value(b) {
  b = b ||  window.event;
  b = b.target || b.srcElement;
  console.log(b)

  if(b.classList[0] === "btn"){
    let n = b.innerHTML.trim();

    if(flag){
      var num = b.className === "btn uc" ? 0 : ''
        set_value('in', num);
        set_value('res', '0');
      flag = !flag;
    }

    if(b.className === "btn num"){
      append_value('in', n );
    } else if(b.innerHTML.trim() === 'C') {
      set_value('in', 0);
      set_value('res', 0);
      flag = !flag;
    } else if (b.className === "btn uc") {
      let v1 = get_el_value('in');
      if(v1.length == 1)
        flag = !flag;
      set_value('in', v1.length == 1 ? 0 : v1.slice(0,-1));
    } else if (b.className.includes("btn-operand")) {
      if(b.innerHTML.trim() !== '=')
        append_value('in', n.trim());
      else {

      }
    }
  }
}

const ParseS = () =>{
    ParseS.st = null;
    ParseS.curr=null;
    ParseS.count = 0;
};
ParseS.next = () => {
  ParseS.curr = charAt(ParseS.count);
}
ParseS();




function scroll_move(el) {
  var o = document.getElementById(el);
  o.scrollLeft = o.scrollWidth;
}

function append_value(el, val) {
  document.getElementById(el).innerHTML += val;
  scroll_move(el);
}

function set_value(el, val) {
  document.getElementById(el).innerHTML = val;
  scroll_move(el);
}

function get_el_value(el) {
  return document.getElementById(el).innerHTML;
}
