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
    for(var i=1;i<16;i++){
    x[i].style.display="none";
    }

    document.getElementById("specadd").style.display = "none";
    var j;

    for(i=1;i<=10;i++){
        j=i+5;
    i=i.toString();
    document.getElementById(i).style.display="block";
    if(i<7)
    document.getElementById(i).innerHTML =x[i].value;
    else if(i==7)
        document.getElementById(i).innerHTML =x[8].value+" "+x[9].value+" "+x[10].value+" "+x[11].value+" "+x[12].value;
    else
    document.getElementById(i).innerHTML =x[j].value;
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
    for(var i=1;i<=8;i++){
    x[i].style.display="block";
    }
    for(i=9;i<=12;i++){
        if(x[i].value!="")
        x[i].style.display="block";
        else
        {
        x[7].value=i-8;
        break;
        }
    }
    for(var i=13;i<16;i++){
        x[i].style.display="block";
        }
    for(i=1;i<=10;i++){
        i=i.toString();
        document.getElementById(i).style.display="none";
        }
    document.getElementById("specadd").style.display = "block";

}