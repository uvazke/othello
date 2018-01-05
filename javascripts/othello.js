//TODO add mycolornumber mb change

cv = document.getElementById("othello_board");
resulttxt=document.getElementById("result_message");
turn_messagetxt = document.getElementById("turn_message");
modetxt = document.getElementById("mode_message");
p1ms = document.getElementById("p1mode_select");
p2ms = document.getElementById("p2mode_select");
const div_num = 8;
const block_length_x = cv.width/(1+div_num*2);
const block_length_y = cv.height/(1+div_num*2);
const radius = block_length_x * 0.8;
color_number = 1;
start_flag = false;
cv.addEventListener('click', mainCallback,false);
finish_flag = false;
sb = document.getElementById("start_button");
sb.addEventListener('click', start,false);
var option = document.createElement('option');

var p1modes = new Array('player1','person','CPUlevel1','CPUlevel2','CPUlevel3','CPUlevel4','CPUlevel5');
var p2modes = new Array('player2','person','CPUlevel1','CPUlevel2','CPUlevel3','CPUlevel4','CPUlevel5');
var p1mode = 0;
var p2mode = 0;
var p1mode_msg = p1modes[0];
var p2mode_msg = p2modes[0];
var mode_msg = "";

function initBoard(){
  ctx = cv.getContext("2d");
  ctx.font = "normal 20px Arial";
  var alphabets = new Array("a","b","c","d","e","f","g","h");
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#008000";//green
  ctx.fillRect(block_length_x,block_length_y,cv.width,cv.height);
  for(var i=0; i < div_num;i++){
    ctx.fillStyle = "black";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(alphabets[i],block_length_x * (2 + 2*i),0);//number
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText(i+1,0,block_length_y * (2 + 2*i));

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(block_length_x * (1 + 2*i),block_length_y);
    ctx.lineTo(block_length_x * (1 + 2*i),cv.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(block_length_x,block_length_y * (1 + 2*i));
    ctx.lineTo(cv.width,block_length_y * (1 + 2*i));
    ctx.stroke();
  }
  board = new Array();//board[j+8*i] means [i+1,j+1]
  for(var i=0;i<(div_num+2)**2;i++){
    board[i] = 0;
  }
  putStone(4,4,-1);
  putStone(4,5,1);
  putStone(5,4,1);
  putStone(5,5,-1);
  var canput_obj = canPutNumber(color_number,true);
  showMessage(canput_obj.color_number,canput_obj.black_num,canput_obj.white_num,false);
}

function putStone(row,col,color_number){
  if(color_number == 1){
    board[col + row*(div_num + 2)] = 1;

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(block_length_x * col * 2, block_length_y * row * 2,radius,0,Math.PI*2,true);
    ctx.fill();
  }else if(color_number == -1){
    board[col + row*(div_num  + 2)] = -1;
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(block_length_x * col * 2, block_length_y * row * 2,radius,0,Math.PI*2,true);
    ctx.fill();
  }
}

function put(row,col,color_number){
  
  var arr = new Array();
  var canput_num = 0;
  
  var black_num;
  var white_num;
  var canput_num;
  var canput_obj;
  var enemy_color;
  var my_next_color;
  var my_next_canput_num;
  arr = [row,col];
  cv.title = arr;
  canput_obj = canPutNumber(color_number,true);
  black_num = canput_obj.black_num;
  white_num = canput_obj.white_num;
  canput_num = canput_obj.canput_num;
  if(check(row,col,color_number,true)){
    color_number = -color_number;
    canput_obj = canPutNumber(color_number,true);
    black_num = canput_obj.black_num;
    white_num = canput_obj.white_num;
    canput_num = canput_obj.canput_num;
    if(canput_num == 0){
      color_number = -color_number;
      canput_obj = canPutNumber(color_number,true);
      black_num = canput_obj.black_num;
      white_num = canput_obj.white_num;
      my_next_canput_num = canput_obj.canput_num;
      if(my_next_canput_num == 0){
        finish_flag = true;
      }
    }
  }

  showMessage(color_number,black_num,white_num,finish_flag);

  return color_number
  /*
    console.log(board.slice(0,10))
    console.log(board.slice(10,20))
    console.log(board.slice(20,30))
    console.log(board.slice(30,40))
    console.log(board.slice(40,50))
    console.log(board.slice(50,60))
    console.log(board.slice(60,70))
    console.log(board.slice(70,80))
    console.log(board.slice(80,90))
    console.log(board.slice(90,100))
  */
}

function drawboard(){
  var alphabets = new Array("a","b","c","d","e","f","g","h");
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#008000";//green
  ctx.fillRect(block_length_x,block_length_y,cv.width,cv.height);
  for(var i=0; i < div_num;i++){
    ctx.fillStyle = "black";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(alphabets[i],block_length_x * (2 + 2*i),0);//number
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText(i+1,0,block_length_y * (2 + 2*i));

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(block_length_x * (1 + 2*i),block_length_y);
    ctx.lineTo(block_length_x * (1 + 2*i),cv.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(block_length_x,block_length_y * (1 + 2*i));
    ctx.lineTo(cv.width,block_length_y * (1 + 2*i));
    ctx.stroke();
  }
  for(var row=1;row<=div_num;row++){
    for(var col=1;col<=div_num;col++){
      if(board[col + row*(div_num + 2)] == 1){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(block_length_x * col * 2, block_length_y * row * 2,radius,0,Math.PI*2,true);
        ctx.fill();  
      }else if(board[col + row*(div_num + 2)] == -1){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(block_length_x * col * 2, block_length_y * row * 2,radius,0,Math.PI*2,true);
        ctx.fill();
      }
    }
  }
}

function check(row,col,color_number,put_flag){
  var up_num = 0;
  var down_num = 0;
  var right_num = 0;
  var left_num = 0;
  var rightup_num = 0;
  var rightdown_num = 0;
  var leftup_num = 0;
  var leftdown_num = 0;

  while (board[(col+right_num) + row *(div_num + 2)] != color_number){
    right_num += 1;

    if (board[(col+right_num) + row *(div_num + 2)] == 0){
      right_num = 0;
      break;
    }
  }

  while (board[(col-left_num) + row *(div_num + 2)] != color_number){
    left_num += 1;
    if (board[(col-left_num) + row *(div_num + 2)] == 0){
      left_num = 0;
      break;
    }
  }

  while (board[(col+rightup_num)+ (row - rightup_num) *(div_num + 2)] != color_number){
    rightup_num += 1;
    if (board[(col+rightup_num) + (row - rightup_num)*(div_num + 2)] == 0){
      rightup_num = 0;
      break;
    }
  }

  while (board[(col-leftup_num) + (row-leftup_num )*(div_num + 2)] != color_number){
    leftup_num += 1;
    if (board[(col-leftup_num) + (row-leftup_num )*(div_num + 2)] == 0){
      leftup_num = 0;
      break;
    }
  }

  while (board[(col+rightdown_num) + (row+rightdown_num)*(div_num + 2)] != color_number){
    rightdown_num += 1;
    if (board[(col+rightdown_num) + (row+rightdown_num)*(div_num + 2)] == 0){
      rightdown_num = 0;
      break;
    }
  }

  while (board[(col-leftdown_num) + (row+leftdown_num)*(div_num + 2)] != color_number){
    leftdown_num += 1;
    if (board[(col-leftdown_num) + (row+leftdown_num)*(div_num + 2)] == 0){
      leftdown_num = 0;
      break;
    }
  }

  while (board[col + (row-up_num)*(div_num + 2)] != color_number){
    up_num += 1;
    if (board[col + (row-up_num)*(div_num + 2)] == 0){
      up_num = 0;
      break;
    }
  }

  while (board[col + (row+down_num)*(div_num + 2)] != color_number){
    down_num += 1;
    if (board[col + (row+down_num)*(div_num + 2)] == 0){
      down_num = 0;
      break;
    }
  }

  if (up_num <= 1 && down_num <= 1 && right_num <= 1 && left_num <= 1 && rightup_num <= 1 && rightdown_num <= 1 && leftup_num <= 1 && leftdown_num <= 1 || board[col + row * (div_num + 2)] != 0){
    return false;
  }else if(put_flag){
    if(up_num > 1){
      for(var i=0;i<up_num;i++){
        putStone(row-i,col,color_number);
      }
    }
    if(down_num > 1){
      for(var i=0; i<down_num;i++){
        putStone(row+i,col,color_number);
      }
    }
    if(right_num > 1){
      for(var i=0; i<right_num;i++){
        putStone(row,col+i,color_number);
      }
    }
    if(left_num > 1){
      for(var i=0; i<left_num;i++){
        putStone(row,col-i,color_number);
      }
    }
    if(rightdown_num > 1){
      for(var i=0; i<rightdown_num;i++){
        putStone(row+i,col+i,color_number);
      }
    }
    if(leftdown_num > 1){
      for(var i=0; i<leftdown_num;i++){
        putStone(row+i,col-i,color_number);
      }
    }
    if(rightup_num > 1){
      for(var i=0; i<rightup_num;i++){
        putStone(row-i,col+i,color_number);
      }
    }
    if(leftup_num > 1){
      for(var i=0; i<leftup_num;i++){
        putStone(row-i,col-i,color_number);
      }
    }
    return true;
  }else{
    return true;//not reverse stones
  }
}

function canput(row,col,color_number){
  return check(row,col,color_number,false);
}

function canPutNumber(color_number,draw_flag){
  var black_num = 0;
  var white_num = 0;
  var canput_num = 0;
  var canput_row_vec = new Array();
  var canput_col_vec = new Array();
  var canput_vec = new Array();

  for(var i=1;i<=div_num;i++){
    for(var j=1;j<=div_num;j++){
      if(board[j + i*(div_num + 2)] == 1){
        black_num += 1;
      }else if(board[j + i*(div_num + 2)] == -1){
        white_num += 1;
      }
      if(canput(i,j,color_number)){
        canput_num += 1;
        canput_row_vec.push(i);
        canput_col_vec.push(j);
        if(draw_flag){
          ctx.beginPath();
          ctx.fillStyle = "#64FE2E";
          ctx.arc(block_length_x * j * 2, block_length_y * i * 2,radius,0,Math.PI*2,true);
          ctx.fill();
        }
      }else if(board[j + i*(div_num + 2)] == 0 && draw_flag){
        ctx.beginPath();
        ctx.fillStyle = "#008000";
        ctx.arc(block_length_x * j * 2, block_length_y * i * 2,radius+1,0,Math.PI*2,true);
        ctx.fill();
      }
    }
  }
  canput_vec = [canput_row_vec,canput_col_vec];
  //var numbers = new Array(black_num,white_num,canput_num);
  var obj = new Object();
  obj.black_num = black_num;
  obj.white_num = white_num;
  obj.canput_num = canput_num;
  obj.canput_vec = canput_vec;
  return obj;
}

function showMessage(color_number,black_num,white_num,finish_flag){
  var winner_msg = "";
  var turn_msg = "";
  if(color_number == 1){
    turn_msg = "black turn"
  }else if(color_number == -1){
    turn_msg = "white turn"
  }
  if(finish_flag){
    if(black_num > white_num){
      winner_msg = "black win!";
    }else if(black_num < white_num){
      winner_msg = "white win!";
    }else{
      winner_msg = "even!";
    }
  }
  turn_messagetxt.innerHTML = `${turn_msg}`;
  resulttxt.innerHTML = `${winner_msg} black:white = ${black_num}:${white_num}`;
  modetxt.innerHTML = mode_msg
}

//Ai  
function randomAi(canput_obj,ai_color_number,color_number){
  if(ai_color_number == color_number){
    var i = Math.floor(Math.random()* canput_obj.canput_vec[0].length);
    var row = canput_obj.canput_vec[0][i];
    var col = canput_obj.canput_vec[1][i];
    color_number = put(row,col,color_number);
    
  }
  return color_number;
}
function randomAiVer2(canput_obj,ai_color_number,color_number){
  if(ai_color_number == color_number){
    var i = Math.floor(Math.random()* canput_obj.canput_vec[0].length);
    var row = canput_obj.canput_vec[0][i];
    var col = canput_obj.canput_vec[1][i];
    if(row == 1 || col == 1 ||row == 7 || col == 7){
      var i = Math.floor(Math.random()* canput_obj.canput_vec[0].length);
      row = canput_obj.canput_vec[0][i];
      col = canput_obj.canput_vec[1][i];
    }
    color_number = put(row,col,color_number);
    
  }
  return color_number;
}

function aimCenter(canput_obj,ai_color_number,color_number){
  if(ai_color_number == color_number){
    var cost = new Array();
    for (var i in canput_obj.canput_vec[0]){
      var row = canput_obj.canput_vec[0][i];
      var col = canput_obj.canput_vec[1][i];
      cost[i] = (row - 4.5)*(row - 4.5) + (col - 4.5)*(col - 4.5);
    }
    var ind = Array.from(Array(cost.length).keys())
    ind.sort(function(a,b){
      if(cost[a]<cost[b]) return -1;
      if(cost[a]>cost[b]) return 1;
      return 0; 
    })
    row = canput_obj.canput_vec[0][ind[0]];
    col = canput_obj.canput_vec[1][ind[0]];
    color_number = put(row,col,color_number);
  }
  return color_number;
}

function canPutNumberSmall(canput_obj,ai_color_number,color_number){
  var next_canput_num_arr = new Array(canput_obj.canput_num);
  var color_number_tmp;
  if(ai_color_number == color_number){
    for(var i=0;i<canput_obj.canput_num;i++){
      var board_tmp = board.concat();
      var row = canput_obj.canput_vec[0][i];
      var col = canput_obj.canput_vec[1][i];
      color_number_tmp = put(row,col,color_number)
      var obj= canPutNumber(color_number_tmp,false);
      next_canput_num_arr[i] = obj.canput_num;
      board = board_tmp.concat();
    }
    drawboard();
    var ind = Array.from(Array(canput_obj.canput_num).keys())
    ind.sort(function(a,b){
      if(next_canput_num_arr[a]<next_canput_num_arr[b]) return -1;
      if(next_canput_num_arr[a]>next_canput_num_arr[b]) return 1;
      return 0; 
    })
    row = canput_obj.canput_vec[0][ind[0]];
    col = canput_obj.canput_vec[1][ind[0]];
    color_number = put(row,col,color_number);
  }
  return color_number;
}

function canPutNumberSmallWithCornerGet(canput_obj,ai_color_number,color_number){
  var next_canput_num_arr = new Array(canput_obj.canput_num);
  var color_number_tmp;
  if(ai_color_number == color_number){
    for(var i=0;i<canput_obj.canput_num;i++){
      var board_tmp = board.concat();
      var row = canput_obj.canput_vec[0][i];
      var col = canput_obj.canput_vec[1][i];
      if((row == 1&& col ==1) || (row == 1&& col ==8) || (row == 8&& col ==1) || (row == 8&& col ==8)){
        color_number = put(row,col,color_number);
        return color_number;
      }
      color_number_tmp = put(row,col,color_number)
      var obj= canPutNumber(color_number_tmp,false);
      next_canput_num_arr[i] = obj.canput_num;
      board = board_tmp.concat();
    }
    drawboard();
    var ind = Array.from(Array(canput_obj.canput_num).keys());
    ind.sort(function(a,b){
      var row = canput_obj.canput_vec[0][ind[a]];
      var col = canput_obj.canput_vec[1][ind[a]];
      if(next_canput_num_arr[a]<next_canput_num_arr[b]) return -1;
      if(next_canput_num_arr[a]>next_canput_num_arr[b]) return 1;
      return 0; 
    });
    var i = 0;
    while(((row == 2&& col ==2) || (row == 2&& col ==7) || (row == 7&& col ==2) || (row == 7&& col ==7)
    ||(row == 2&& col ==1) || (row == 1&& col ==2) || (row == 7&& col ==1) || (row == 8&& col ==2)
    ||(row == 1&& col ==7) || (row == 2&& col ==8) || (row == 7&& col ==8) || (row == 8&& col ==7)
    ||(((board[3 + 1*(div_num + 2)] == ai_color_number && row ==3 && col == 1) || (board[1 + 3*(div_num + 2)] == ai_color_number && row ==1 && col == 3)) && board[2 + 2*(div_num + 2)] == -ai_color_number)
    ||(((board[6 + 1*(div_num + 2)] == ai_color_number && row ==3 && col == 8) || (board[8 + 3*(div_num + 2)] == ai_color_number && row ==1 && col == 6)) && board[7 + 2*(div_num + 2)] == -ai_color_number)
    ||(((board[1 + 6*(div_num + 2)] == ai_color_number && row ==8 && col == 3) || (board[3 + 8*(div_num + 2)] == ai_color_number && row ==6 && col == 1)) && board[2 + 7*(div_num + 2)] == -ai_color_number)
    ||(((board[8 + 6*(div_num + 2)] == ai_color_number && row ==8 && col == 6) || (board[6 + 8*(div_num + 2)] == ai_color_number && row ==6 && col == 8)) && board[7 + 7*(div_num + 2)] == -ai_color_number))
    && i < canput_obj.canput_num){
      row = canput_obj.canput_vec[0][ind[i]];
      col = canput_obj.canput_vec[1][ind[i]];
      i++;  
    }
    color_number = put(row,col,color_number);
  }
  return color_number;
}


function wait(sec) {

  var objDef = new $.Deferred;

  setTimeout(function () {
    objDef.resolve(sec);
  }, sec*1000);

  return objDef.promise(); 
};


function mainCallback(event){
  if(start_flag){
    var x = event.clientX-10;
    var y = event.clientY-34;//clientY is shifted somehow 
    var col = Math.floor((Math.floor(x/block_length_x) - 1)/2) + 1;
    var row = Math.floor((Math.floor(y/block_length_y) - 1)/2) + 1;
    console.log(row,col);
    if(row >=1 && row <=8 && col >=1 && col <= 8){
      switch(p1mode){
        case "1":
        color_number = put(row,col,color_number);
        break;

        case "2":
        var canput_obj = canPutNumber(color_number,true);
        //wait(0.7).done(function(){color_number = randomAi(canput_obj,1,color_number);});
        color_number = randomAi(canput_obj,1,color_number);
        break;

        case "3":
        var canput_obj = canPutNumber(color_number,true);
        //wait(0.7).done(function(){color_number = randomAiVer2(canput_obj,1,color_number);});
        color_number = randomAiVer2(canput_obj,1,color_number);
        break;

        case "4":
        var canput_obj = canPutNumber(color_number,true);
        color_number = aimCenter(canput_obj,1,color_number);
        break;

        case "5":
        var canput_obj = canPutNumber(color_number,true);
        color_number = canPutNumberSmall(canput_obj,1,color_number);
        break;

        case "6":
        var canput_obj = canPutNumber(color_number,true);
        color_number = canPutNumberSmallWithCornerGet(canput_obj,1,color_number);
        break;

        default:
        break;
      }
      
      switch(p2mode){
        case "1":
        color_number = put(row,col,color_number);
        break;

        case "2":
        var canput_obj = canPutNumber(color_number,true);
        wait(0.7).done(function(){color_number = randomAi(canput_obj,-1,color_number);});
        break;

        case "3":
        var canput_obj = canPutNumber(color_number,true);
        wait(0.7).done(function(){color_number = randomAiVer2(canput_obj,-1,color_number);});
        break;

        case "4":
        var canput_obj = canPutNumber(color_number,true);
        wait(0.7).done(function(){color_number = aimCenter(canput_obj,-1,color_number);});
        break;

        case "5":
        var canput_obj = canPutNumber(color_number,true);
        wait(0.7).done(function(){color_number = canPutNumberSmall(canput_obj,-1,color_number);});
        break;

        case "6":
        var canput_obj = canPutNumber(color_number,true);
        wait(0.7).done(function(){color_number = canPutNumberSmallWithCornerGet(canput_obj,-1,color_number);});
        break;

        default:
        break;
      }
    }
  };
}

//onclick
function start(){
  if(!start_flag && p1mode != 0 && p2mode != 0){
    var canput_obj = canPutNumber(color_number,true);
    showMessage(canput_obj.color_number,canput_obj.black_num,canput_obj.white_num,false);
    //window.alert("Game Start!!");
    start_flag = true;
    sb.defaultValue = "restart";
    p1ms.disabled = true;
    p2ms.disabled = true;
  }else{
    start_flag = false;
    sb.defaultValue = "start";
    window.alert("Game Stop!!");
    initBoard();
    var canput_obj = canPutNumber(color_number,true);
    showMessage(canput_obj.color_number,canput_obj.black_num,canput_obj.white_num,false);
    p1ms.disabled = false;
    p2ms.disabled = false;
  }
}
p1options = $.map(p1modes,function(m,i){
  $options = $('<option>', { html: m, val:i});
  return $options;
});
p2options = $.map(p2modes,function(m,i){
  $options = $('<option>', { html: m, val:i});
  return $options;
});

$('#p1mode_select').append(p1options);
$('#p2mode_select').append(p2options);
$('#p1mode_select').change(function(){
  p1mode = $(this).val();
  p1mode_msg = p1modes[p1mode];
  if(p1mode_msg != p1modes[0] && p2mode_msg != p2modes[0]){
    mode_msg = `${p1mode_msg} vs ${p2mode_msg}`;
  }
});
$('#p2mode_select').change(function(){
  p2mode = $(this).val();
  p2mode_msg = p2modes[p2mode];
  if(p1mode_msg != p1modes[0] && p2mode_msg != p2modes[0]){
    mode_msg = `${p1mode_msg} vs ${p2mode_msg}`;
  }
})
initBoard();
