document.addEventListener("DOMContentLoaded", function(event) {


});

var flag = true;
var op_flag = false;
var eq_flag = false;

window.onerror = function() {
  //set_value('res', 'SYNTAX ERROR');
  flag =true;
};

const Parser = () =>{
    Parser.input = null;
    Parser.curr=null;
};

function init_parser (str) {
  Parser.input = str;
  Parser.curr = Parser.input[0];
}

Parser.next = () => {
  Parser.input = Parser.input.slice(1);
  Parser.curr = Parser.input[0];
  // Parser.count++;
}
Parser.EXPR = ()=>{
  let result = Parser.TERM();
  let op = '+-';
  while (op.includes(Parser.curr)) {
    if (Parser.curr === '+'){
      Parser.next();
      result += Parser.TERM();
    }if (Parser.curr === '-'){
      Parser.next();
      result -= Parser.TERM();
    }
  }

  return result;
};

Parser.TERM = () => {
  let result = Parser.FACTOR();
  let op = '*/';
  while (op.includes(Parser.curr)) {
    if (Parser.curr === '/'){
      Parser.next();
      result /= Parser.TERM();
    }
    if (Parser.curr === '*'){
      Parser.next();
      result *= Parser.TERM();
    }
  }

  return result;
};

Parser.FACTOR = () => {
  let result = null;
    if (isNum(Parser.curr.charAt(0)) || isNum(Parser.curr.charAt(curr.length - 1))) {
      result = parseFloat(Parser.curr);
      Parser.next();
    }
    if (Parser.curr === '('){
      Parser.next();
      result = Parser.EXPR();
      Parser.next();
    }

  return result;
};

function isNum(str) {
  return !isNaN(str);
}

function get_value(b) {
  b = b ||  window.event;
  b = b.target || b.srcElement;


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
    } else if(b.innerHTML.trim() === 'CE') {
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

        // alert(get_el_value('in'));
        let str = get_el_value('in');

        init_parser(tokenize(str));

        set_value('res', Parser.EXPR());
      }
    }
  }
}

function tokenize (str) {
  let tokens=[];
  let re = new RegExp("×", 'g');
  let re2 = new RegExp("÷", 'g');
  str = str.replace(re2, "/");
  str = str.replace(re, "*");
  for (var i = 0; i < str.length; i++) {
    if(isNum(str.charAt(i))&&isNum(tokens[tokens.length - 1]))
      tokens[tokens.length - 1] += str.charAt(i);
    else tokens.push(str.charAt(i));
  }


  console.log("Tokenizer: " + tokens);
  return tokens;
}

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
