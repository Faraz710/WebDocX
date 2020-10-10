function spec(){
    var i=parseInt(document.getElementById("cspec").value);
    var i=i+1;
    var i=i.toString();
    document.getElementById("cspec").value=i;
    document.getElementById("spec"+i).style.display="block";
    if(i==5)
    {
      document.getElementById("specadd").style.display = "none";
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
    for(var i=2;i<=16;i++){
    x[i].style.display="none";
    }

    document.getElementById("specadd").style.display = "none";
    var j;

    for(i=1;i<=10;i++){
        j=i;
    i=i.toString();
    document.getElementById(i).style.display="block";
    if(i<7)
    document.getElementById(i).innerHTML =x[j+1].value;
    else if(i==7)
        document.getElementById(i).innerHTML =x[9].value+" "+x[10].value+" "+x[11].value+" "+x[12].value+" "+x[13].value;
    else
    document.getElementById(i).innerHTML =x[j+6].value;
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
    for(var i=2;i<=9;i++){
    x[i].style.display="block";
    }
    for(i=10;i<=13;i++){
        if(x[i].value!="")
        x[i].style.display="block";
        else
        {
        x[8].value=i-9;
        break;
        }
    }
    for(var i=14;i<=16;i++){
        x[i].style.display="block";
        }
    for(i=1;i<=10;i++){
        i=i.toString();
        document.getElementById(i).style.display="none";
        }
    document.getElementById("specadd").style.display = "block";

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