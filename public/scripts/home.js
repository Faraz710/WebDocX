function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
//This is for functioning of switch buttons in login forms
function docl()
  {
    document.getElementById('id02').style.display='none';
    document.getElementById('id01').style.display='block';
  }
  function patl()
  {
    document.getElementById('id01').style.display='none';
    document.getElementById('id02').style.display='block';
  }

//removing the form from behind
function m1()
  {
    document.getElementById('id03').style.display='none';
    document.getElementById('id04').style.display='block';
  }
function m2()
  {
    document.getElementById('id03').style.display='none';
    document.getElementById('id05').style.display='block';
  }

//This is for functioning of switch buttons in signup forms
function docs()
  {
    document.getElementById('id05').style.display='none';
    document.getElementById('id04').style.display='block';
  }
  function pats()
  {
    document.getElementById('id04').style.display='none';
    document.getElementById('id05').style.display='block';
  }
    // Get the modal
  var modal1 = document.getElementById('id01');
  var modal2 = document.getElementById('id02');
  var modal3 = document.getElementById('id03');
  var modal4 = document.getElementById('id04');
  var modal5 = document.getElementById('id05');
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal1) {
          modal1.style.display = "none";
      }
      else if(event.target == modal2){
          modal2.style.display = "none";
      }
      else if(event.target == modal3){
          modal3.style.display = "none";
      }
      else if(event.target == modal4){
          modal4.style.display = "none";
      }
      else if(event.target == modal5){
          modal5.style.display = "none";
      }
  }

  // When the user scrolls down 50px move the logo in center
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("logobar").style.opacity= 0;
    document.getElementById("clogobar").style.opacity= 1;
    document.getElementById("myBtn").style.visibility= "visible";
  } else {
    document.getElementById("logobar").style.opacity= 1;
    document.getElementById("clogobar").style.opacity= 0;
    document.getElementById("myBtn").style.visibility= "hidden";
  }
}