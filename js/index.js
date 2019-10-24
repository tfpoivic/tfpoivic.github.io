var email_re = /^\w+((-\w+)|(.\w+))*@[A-Za-z0-9]+((\.|\-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
var input_email = $("input[name=email]");
var input_time = $("div[name=time]");
var checked_time = "[name=connect_time]:checked";
var input_notes = $("textarea[name=notes]");

$(input_email).on("blur", function(){
  checked(this, $(this).val() == ""? "*必填" : "*Email格式錯誤", !email_test());
});

input_time.change(function(){
  checked($(input_time), "", false);
});

$(input_notes).on("blur", function(){
  checked(this, "*必填", $(this).val() == "");
});

$("button.send").on("click", function(){
  checked($(input_email), $(this).val() == ""? "*必填" : "*Email格式錯誤", !email_test());
  checked($(input_time), "*必填", $(checked_time).val() == null);
  checked($(input_notes), "*必填", $(input_notes).val() == "");
  var send = $(checked_time).val() != null &&
             email_test() &&
             $(input_email).val() != "" &&
             $(input_notes).val() != "";
  if(send){
    var tx_email = $(input_email).val();
    var tx_connect_time = $(checked_time).val();
    var tx_notes = $(input_notes).val();
    var connect_msg = {
      Email: tx_email,
      Connect_time: tx_connect_time,
      Notes: tx_notes
    }
    //ajax試做
    /*
    $.ajax({
      url: '#',
      type: 'post',
      data: JSON.stringify(connect_msg),
      dataType: 'JSON',
      success: function(){
        alert("已送出聯絡資訊！");
      },
      statusCode: {
        500: function(){
          alert("500 伺服器端錯誤");
        }
      }
    });
    */
    alert("資料送出！\n");
    console.log(JSON.stringify(connect_msg))
  }else{
    alert("資料不完整或格式有誤\n");
  }
});

function checked(input, msg, show){
  var div = $(input).parent();
  div.children("p").text(show? msg : " ");
  if(show){
    $(input).addClass("uninput");
    div.children("[class = connect_text]").addClass("uninput");
  }else{
    $(input).removeClass("uninput");
  }
}

function email_test(){
  return email_re.test($(input_email).val());
}
