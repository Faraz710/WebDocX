function docdrop(){
    if(document.getElementById('drop').style.display=='none'){
        document.getElementById('drop').style.display = "block";
    }
    else{
        document.getElementById('drop').style.display = "none";
    }
  }
  function notdrop(){
    if(document.getElementById('unotification').style.display=='none'){
        document.getElementById('unotification').style.display = "block";
    }
    else{
        document.getElementById('unotification').style.display = "none";
    }
  }

  function searchs(){
    document.getElementById('searchdiv').style.display='block';
    document.getElementById('sv').innerHTML=document.getElementById('search').value;
  }

  function find(){
    var val=document.getElementById('search').value;
    /*var l=location.href;
    var par=l.split('?')[1];
    var par_arr=par.split('&');
    var ck=0;
    var r=new RegExp(/\/[0-9]+\//gm);
    l=l.replace(r,'/1/');*/
    document.getElementById('searchdiv').style.display='block';
    var x=document.getElementsByName('sopt');
    var v;
    for(var i=0;i<x.length;i++){
        if(x[i].checked){
            v=x[i].value;
        }
    }
    switch (v) {
        case "name":
            location.href="/view/doctors/page/1/?name="+val;
            /*location.href=l.split('?')[0]+"?name="+val;*/
          break;
        case "speciality":
            location.href="/view/doctors/page/1/?speciality="+val;
            /*location.href=l.split('?')[0]+"?speciality="+val;*/
          break;
        default:
            document.getElementById('sv').innerHTML="Not a Valid group";
            document.getElementById('sv').style.color="red";
      }
  }

  

  