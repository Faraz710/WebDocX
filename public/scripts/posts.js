
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

function tag(y){
  var i=parseInt(document.getElementById("ctag"+y).value);
  var i=i+1;
  var i=i.toString();
  document.getElementById("ctag"+y).value=i;
  document.getElementById("tag"+y+i).style.display="block";
  if(i==5)
  {
    document.getElementById("tagadd"+y).style.display = "none";
  }
}
function sym(y){
  var i=parseInt(document.getElementById("csym"+y).value);
  var i=i+1;
  var i=i.toString();
  document.getElementById("csym"+y).value=i;
  document.getElementById("sym"+y+i).style.display="block";
  if(i==5)
    {
      document.getElementById("symadd"+y).style.display = "none";
    }
}


function error(i){
  var e=0;
  var l=new Array("problems","description");
  for(var x=0;x<2;x++)
  {
      if(document.getElementById(l[x]+i).value==""){
          document.getElementById(l[x]+i).style.backgroundColor="#f0a6a1";
          e++;
      }
      else
      document.getElementById(l[x]+i).style.backgroundColor="#ddd";
  }
  if(e!=0){
  document.getElementById("cnf"+i).style.backgroundColor="grey";
  document.getElementById("cnf"+i).type="button";
  }
  else{
  document.getElementById("cnf"+i).style.backgroundColor="green";
  document.getElementById("cnf"+i).type="submit";
  }
}

function editpost(i)
{
  document.getElementById("epost"+i).style.display="block";
  document.getElementById("update"+i).style.display='none';
}
function ceditpost(i)
{
  document.getElementById("epost"+i).style.display="none";
  document.getElementById("update"+i).style.display='block';
}