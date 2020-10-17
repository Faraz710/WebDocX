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
  // consultation form

  function openForm(name,id) {
    document.getElementById("consultform").action = "/consult/"+id;
    document.getElementById("consult").style.display = "block";
    document.getElementById("name").innerHTML = "Dr. "+name;
    document.getElementById("ctag").value=1;
    document.getElementById("stag").value=1;
    for(var i=2;i<=5;i++){
        document.getElementById("tag"+i).style.display="none";
        document.getElementById("sym"+i).style.display="none";
    }
  }
  
  window.onclick = function(event) {
    if (event.target == modal1) {
        document.getElementById("consult").style.display = "none";
    }
  }
  function tag(){
      var i=parseInt(document.getElementById("ctag").value);
      var i=i+1;
      var i=i.toString();
      document.getElementById("ctag").value=i;
      document.getElementById("tag"+i).style.display="block";
      if(i==5)
      {
        document.getElementById("tagadd").style.display = "none";
      }
  }
  function sym(){
    var i=parseInt(document.getElementById("csym").value);
    var i=i+1;
    var i=i.toString();
    document.getElementById("csym").value=i;
    document.getElementById("sym"+i).style.display="block";
    if(i==5)
      {
        document.getElementById("symadd").style.display = "none";
      }
}

function docdrop(){
  if(document.getElementById('drop').style.display=='none'){
      document.getElementById('drop').style.display = "block";
  }
  else{
      document.getElementById('drop').style.display = "none";
  }
}

