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
    var l=new Array("problems","speciality","description");
    for(var x=0;x<3;x++)
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
