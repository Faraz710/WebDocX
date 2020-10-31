function loaded()
{
  var x = location.href;
	var par=x.split('?')[1];
  var par_arr=par.split('&');
  for(var i=0;i<par_arr.length;i++)
  {
    var ap=par_arr[i].split('=');
    if(ap[0]=='lte')
    {
      var max=ap[1];
      document.getElementById('echk').style.display="block";
      document.getElementById('echk').checked = true;
    }
    else if(ap[0]=='gte')
    {
      var min=ap[1];
      document.getElementById('expchk').innerHTML=min+"-"+max;
    }
  }
}

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


function filter(){
  var min=document.getElementById('mine').value;
  var max=document.getElementById('maxe').value;
  min=parseInt(min);
  max=parseInt(max);
  var x = location.href;
	var par=x.split('?')[1];
  var par_arr=par.split('&');
  var ck=0;
  for(var i=0;i<par_arr.length;i++)
  {
    var ap=par_arr[i].split('=');
    if(ap[0]=='lte'){
      ck=1;
    }
  }
  var r=new RegExp(/\/[0-9]+\//gm);
  x=x.replace(r,'/1/');
  if(ck==0){
    location.href = x+'&lte='+max+'&gte='+min;
  }
  else{
    var r1=new RegExp(/&lte\=[0-9]+/gm);
    x=x.replace(r1,'&lte='+max);
    var r2=new RegExp(/&gte\=[0-9]+/gm);
    x=x.replace(r2,'&gte='+min);
    location.href=x;
  }
  
}

function removefilter(){
  var x = location.href;
  var r1=new RegExp(/&lte\=[0-9]/gm);
  x=x.replace(r1,'');
  var r2=new RegExp(/&gte\=[0-9]/gm);
  x=x.replace(r2,'');
  var r=new RegExp(/\/[0-9]+\//gm);
  x=x.replace(r,'/1/');
  location.href=x;
}


	function pagination(n){
		var x = location.href;
		var v;
		var r=new RegExp(/\/[0-9]+\//gm);
		v=x.replace(r,'/'+n+'/');
		location.href =v;
	}




