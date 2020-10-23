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
function ls(){
    if(document.getElementById('lic').style.display=='none'){
        document.getElementById('lic').style.display = "block";
        document.getElementById('vbtn').innerHTML = "(Close)";
    }
    else{
        document.getElementById('lic').style.display = "none";
        document.getElementById('vbtn').innerHTML = "(View)";
    }
}


function personal1(){
    document.getElementById("personal").style.display = "block";
    document.getElementById("medical").style.display = "none";
    document.getElementById("address").style.display = "none";
    document.getElementById("p").style.color = "black";
    document.getElementById("m").style.color = "grey";
    document.getElementById("a").style.color = "grey";
}
function medical1(){
    document.getElementById("personal").style.display = "none";
    document.getElementById("medical").style.display = "block";
    document.getElementById("address").style.display = "none";
    document.getElementById("m").style.color = "black";
    document.getElementById("p").style.color = "grey";
    document.getElementById("a").style.color = "grey";
}
function address1(){
    document.getElementById("personal").style.display = "none";
    document.getElementById("medical").style.display = "none";
    document.getElementById("address").style.display = "block";
    document.getElementById("a").style.color = "black";
    document.getElementById("m").style.color = "grey";
    document.getElementById("p").style.color = "grey";
}
function cnf()
{
    document.getElementById("personal").style.display = "block";
    document.getElementById("medical").style.display = "block";
    document.getElementById("address").style.display = "block";
    document.getElementById("submit").style.display = "block";
    document.getElementById("confirm").style.display = "none";
    document.getElementById("back").style.display="block";
    document.getElementById("p").style.color = "grey";
    document.getElementById("m").style.color = "grey";
    document.getElementById("a").style.color = "grey";

    var x = document.getElementsByTagName("input");
    for(var i=2;i<=12;i++){
    x[i].style.display="none";
    }
    var j;

    for(i=1;i<=11;i++){
        j=i;
    i=i.toString();
    document.getElementById(i).style.display="block";
    document.getElementById(i).innerHTML =x[j+1].value;
    }
}
function bck()
{
    document.getElementById("personal").style.display = "block";
    document.getElementById("medical").style.display = "none";
    document.getElementById("address").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.getElementById("confirm").style.display = "block";
    document.getElementById("back").style.display="none";
    document.getElementById("p").style.color = "black";
    document.getElementById("m").style.color = "grey";
    document.getElementById("a").style.color = "grey";

    var x = document.getElementsByTagName("input");
    for(var i=2;i<=12;i++){
    x[i].style.display="block";
    }
    for(i=1;i<=11;i++){
        i=i.toString();
        document.getElementById(i).style.display="none";
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