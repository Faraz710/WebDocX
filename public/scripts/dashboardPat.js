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
    getMsgHeads();
  }
  else if(n=="p"){
    document.getElementById('msg').style.display="none";
    document.getElementById('pres').style.display="block";
    document.getElementById('pi').style.backgroundColor="rgb(219, 212, 212)";
    document.getElementById('mi').style.backgroundColor="transparent";
    getPrescriptions();
  }
}


function scrollleft() {
  document.getElementById('special').scrollLeft += 600;
}
function scrollright() {
  document.getElementById('special').scrollLeft -= 600;
}

function getMsgHeads(){
  $.ajax({url:"https://web-doc-x.herokuapp.com/consultation/dashboard"}).done(function (data){
    var q="";
    var x='c';
    for(var i=0;i<data.length;i++){
      if(data[i].isAccepted && !(data[i].isSolved)){
        q=q+"<div onclick='consul()' style='height:40px;clear:both;padding:10px;border-style:solid;border-width:0px 0px 1px 0px;border-color:grey'><span style='float:left;background-color: transparent;'><img class='avatar' style='width:40px;height:40px;' src='/images/u.png'/></span><span  style='font-weight:normal;font-size: 20px;margin-top:20px;'>"+data[i].doctor.name+"</span></div>"
      }
    }
    document.getElementById('msg').innerHTML=q;
  });
document.getElementById('mi').style.backgroundColor="rgb(219, 212, 212)";
document.getElementById('msg').style.display="block";
}
function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

function getPrescriptions(){
  document.getElementById('pres').style.display="block";
    var q="";
  $.ajax({url:"https://web-doc-x.herokuapp.com/dashboardPat/prescriptions"}).done(function (data1){
    if(typeof(data1) === "string")
      data = JSON.parse(data1);
    else 
      data = data1;
    if (data.length > 0) {
      data.forEach(prescription => {
        var pdf =  new Uint8Array(prescription.pdf.data.data);
        var date = new Date(prescription.issuingDate);
        var type = prescription.pdf.contentType;
        if (typeof prescription.pdf.data !== 'undefined') {
          q=q+'<div class="card" style="clear:both;margin-bottom: 10px;border-radius: 10px;padding:20px;"><b>Dr. ' + prescription.doctor.name +
              '</b><a href="data:'+ type +';base64,'+encode(pdf)+' "style="float:right;" download><i class="fa fa-arrow-down" aria-hidden="true"></i> </a><br>'+
              '<span style="color:grey;">'+date+'</span></div><br>';
        }
      });
    }
    console.log(q);
     if(data.length==0){
      q=q+'<div class="card" style="margin-bottom: 10px;border-radius: 10px;padding:20px;"><b>No Prescriptions to Show</b></div>';
     }
     document.getElementById('pres').innerHTML=q;
  });
}

function consul(){
    location.href="/consultation";
}