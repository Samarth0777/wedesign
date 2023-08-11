function shut(){
    document.getElementById("slide").style.display="none";
}
function show(){
    document.getElementById("slide").style.display='block';
}
function m(){
    var x=document.getElementById("mission");
    x.style.backgroundColor="#2A2D34";
    document.getElementById("para").innerHTML="Duis ac leo nisi. Mauris nec ex id lorem commodo rutrum rutrum a est. Cras facilisis sit amet lectus non posuere. Nullam non magna non enim blandit elementum.";
    document.getElementById("vision").style.backgroundColor="#646872";
    document.getElementById("values").style.backgroundColor="#646872";
}
function v(){
    var x=document.getElementById("vision");
    x.style.backgroundColor="#2A2D34";
    x.style.transition="400ms"
    document.getElementById("para").innerHTML="Vivamus cursus augue risus. Nunc lorem est, finibus et justo quis, pharetra rutrum ex. Nulla faucibus porta leo, sit amet mollis purus. Sed maximus posuere diam, sed luctus mauris imperdiet at.";
    document.getElementById("mission").style.backgroundColor="#646872";
    document.getElementById("mission").style.transition="400ms";
    document.getElementById("values").style.backgroundColor="#646872";
    document.getElementById("values").style.transition="400ms";
}
function vau(){
    var x=document.getElementById("values");
    x.style.backgroundColor="#2A2D34";
    document.getElementById("para").innerHTML="Proin nec ligula id arcu consequat congue. Risus sem fermentum libero, ac elementum est dui quis nibh. Nullam sit amet maximus nisl. Proin posuere, eros non eleifend ultrices, est ex tristique dolor, vitae tempor ipsum velit vel velit.";
    document.getElementById("mission").style.backgroundColor="#646872";
    document.getElementById("vision").style.backgroundColor="#646872";
}
function left(){
    document.getElementById("dis").innerHTML="Aliquam nisi quam, pulvinar sit amet dolor ac. Pellentesque in aliquam nibh, non ullamcorper massa. Aenean semper nibh ut leo mattis, viverra auctor libero semper. Cras porttitor vehicula arcu eget finibus. Duis tempus sollicitudin mauris, vulputate molestie est cursus ut. Donec gravida lobortis venenatis.";
}
function right(){
    document.getElementById("dis").innerHTML="Web design. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus tincidunt sem non sodales. Nunc et quam in magna vehicula sollicitudin. Aliquam erat volutpat. Maecenas dolor mi, aliquet ac quam aliquet, condimentum dictum nisi.";
}