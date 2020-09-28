function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  // consultation form

  function openForm(name) {
    document.getElementById("consult").style.display = "block";
    document.getElementById("name").innerHTML = "DR."+name;
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