function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("textlogo").style.opacity= 0;
    document.getElementById("lg").style.left="50%";
    document.getElementById("myBtn").style.visibility= "visible";
  } else {
    document.getElementById("textlogo").style.opacity= 1;
    document.getElementById("lg").style.left="40%";
    document.getElementById("myBtn").style.visibility= "hidden";
  }
}

function read(i){
  document.getElementById("accept"+i).submit();  
}

function getheads(){
  $.ajax({url:"http://localhost:3000/consultation/dashboard"}).done(function (data){
    var q="";
    var x='c';
    for(var i=0;i<data.length;i++){
      if(data[i].isAccepted && !(data[i].isSolved)){
        q=q+"<div onclick='consul()' style='height:40px;clear:both;padding:10px;border-style:solid;border-width:0px 0px 1px 0px;border-color:grey'><span style='float:left;background-color: transparent;'><img class='avatar' style='width:40px;height:40px;' src='/images/u.png'/></span><span  style='font-weight:normal;font-size: 20px;margin-top:20px;'>"+data[i].patient.name+"</span></div>"
      }
    }
    document.getElementById('msg').innerHTML=q;
  });
document.getElementById('mi').style.backgroundColor="rgb(219, 212, 212)";
document.getElementById('msg').style.display="block";
}

function consul(){
    location.href="/consultation";
}