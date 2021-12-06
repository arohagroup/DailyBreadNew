function menu() {
    var x= document.getElementsByClassName("nav-btn");
    var x2= document.getElementById("part2");
    if(x[0].style.display==="block")
        {
          x[0].style.display="none";
          x2.style.display= "block";
        }
    else{
        x[0].style.display="block";
        if(x2)
        {
          x2.style.display="none";
        }
    }
    
}





function requestAccept (){



  var x= document.getElementById("request-accept");
    var x2= document.getElementById("deny");

    x.style.display="none";
          x2.style.display= "none";
}

function fun()
{
    var x= document.getElementById("part1");
    var x2= document.getElementById("part2");
    
          x.style.display="block";
          x2.style.display= "none";
    
    
}
function fun2()
{
    var x= document.getElementById("part1");
    var x2= document.getElementById("part2");
    if(x2.style.display==="none")
    {
        x2.style.display="block"; 
        x.style.display="none";
    }
    
}
function openForm2() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("myForm2").style.display = "block";
  // document.getElementsByClassName("nav-btn")[0].style.display = "block";
}

function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
}
function openForm(check) {
  !check ? document.getElementById("myForm2").style.display = "none" : null;
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

let image_data_url;

(()=>{
  const profilePage = document.querySelector(`#userProfilePage`);
  if(profilePage){
    document.getElementsByClassName('change-image')[0].addEventListener('click', ()=>{
      openForm("check");
      startCamera();
    });
    
    let video = document.querySelector("#video");
    let click_button = document.querySelector("#click-photo");
    let canvas = document.querySelector("#canvas");
    
    async function startCamera() {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
    };
    
    
    click_button.addEventListener('click', function() {
      
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        image_data_url = canvas.toDataURL('image/jpeg');
        closeForm();
        document.getElementById('camera').setAttribute("src",image_data_url)
    });
  }
})();

function ListingView() {
  let one           = document.querySelector("#one");
  let two           = document.querySelector("#two");
  let three         = document.querySelector("#three");
  let elementsOne   = document.getElementsByClassName("one");
  let elementsTwo   = document.getElementsByClassName("two");
  let elementsThree = document.getElementsByClassName("three");
  if(one.checked){
    for(let i = 0; i < elementsOne.length; i++){
      elementsOne[i].style.display = "block";
    }
  }else{
    for(let i = 0; i < elementsOne.length; i++){
      elementsOne[i].style.display = "none";
    }
  }
  if(two.checked){
    for(let i = 0; i < elementsTwo.length; i++){
      elementsTwo[i].style.display = "block";
    }
  }else{
    for(let i = 0; i < elementsTwo.length; i++){
      elementsTwo[i].style.display = "none";
    }
  }
  if(three.checked){
    for(let i = 0; i < elementsThree.length; i++){
      elementsThree[i].style.display = "block";
    }
  }else{
    for(let i = 0; i < elementsThree.length; i++){
      elementsThree[i].style.display = "none";
    }
  }
}


window.addEventListener('load', function(e) {
  if (!navigator.onLine) {
    alert('We\'re offline...');
  } else {
    alert('We\'re online!');
  }
}, false);

window.addEventListener('online', function(e) {
  alert('And we\'re back :).');
}, false);

window.addEventListener('offline', function(e) {
  alert('Connection is down. Please connect to Internet.');
}, false);
