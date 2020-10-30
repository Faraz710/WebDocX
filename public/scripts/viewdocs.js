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

function slide(){
  if(document.getElementById('arr').className=="fa fa-chevron-left"){
  document.getElementById('option').style.display='block';
  document.getElementById('sl').style.right="50px";
  document.getElementById('arr').className="fa fa-chevron-right";
  }
  else{
    document.getElementById('option').style.display='none';
    document.getElementById('sl').style.right="0px";
    document.getElementById('arr').className="fa fa-chevron-left";
  }
}


function filter(n){
  var min=document.getElementById('mine').value;
  var max=document.getElementById('maxe').value;
  document.getElementById('echk').style.display="block";
  document.getElementById('echk').checked = true;
  document.getElementById('expchk').innerHTML=min+"-"+max;
  var x;
  min=parseInt(min);
  max=parseInt(max);
  for(var i=0;i<n;i++){
    x=document.getElementById(i).children[0].children[1].children[2];
    if(!(x.value>=min && x.value<=max)){
      document.getElementById(i).style.display='none';
    }
    else{
      document.getElementById(i).style.display='block';
    }
  }
}

function removefilter(n){
  document.getElementById('echk').style.display="none";
  document.getElementById('echk').checked = false;
  document.getElementById('expchk').innerHTML="";
  for(var i=0;i<n;i++){
      document.getElementById(i).style.display='block';
  }
}



