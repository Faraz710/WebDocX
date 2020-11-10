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
  /*$.ajax({url:"http://localhost:3000/consultation/dashboard"}).done(function (data){
    alert(data);
  });*/

  $.get("http://localhost:3000/consultation/dashboard", function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
}