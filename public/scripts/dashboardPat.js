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

function docdrop(){
    if(document.getElementById('drop').style.display=='none'){
        document.getElementById('drop').style.display = "block";
    }
    else{
        document.getElementById('drop').style.display = "none";
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
function error(){
    var e=0;
    var l=new Array("problems","description");
    for(var x=0;x<2;x++)
    {
        if(document.getElementById(l[x]).value==""){
            document.getElementById(l[x]).style.backgroundColor="#f0a6a1";
            e++;
        }
        else
        document.getElementById(l[x]).style.backgroundColor="#ddd";
    }
    if(e!=0){
    document.getElementById("sub").style.backgroundColor="grey";
    document.getElementById("sub").type="button";
    }
    else{
    document.getElementById("sub").style.backgroundColor="green";
    document.getElementById("sub").type="submit";
    }
}

function dpopen(){
  document.getElementById("dp").style.display="block";
  document.getElementById("op").style.display="none";
  document.getElementById("cl").style.display="block";
  
}
function dpclose(x){
  document.getElementById("dp").style.display="none";
  document.getElementById("op").style.display="block";
  document.getElementById("cl").style.display="none";
  document.getElementById("upprof").src=x;
  document.getElementById('profilepic').value =null;
  document.getElementById("pic").style.color="black";
}
function chk(event){
  if(document.getElementById("profilepic").files.length!=0){
      document.getElementById("pic").style.color="greenyellow";
      document.getElementById("upprof").src= URL.createObjectURL(event.target.files[0]);
  document.getElementById("upprof").onload = function() {
  URL.revokeObjectURL(document.getElementById("upprof").src) // free memory
  }
  }
}

function sb(n){
  if(n=="m"){
    document.getElementById('msg').style.display="block";
    document.getElementById('pres').style.display="none";
    document.getElementById('mi').style.backgroundColor="rgb(219, 212, 212)";
    document.getElementById('pi').style.backgroundColor="transparent";
  }
  else if(n=="p"){
    document.getElementById('msg').style.display="none";
    document.getElementById('pres').style.display="block";
    document.getElementById('pi').style.backgroundColor="rgb(219, 212, 212)";
    document.getElementById('mi').style.backgroundColor="transparent";
  }
}
