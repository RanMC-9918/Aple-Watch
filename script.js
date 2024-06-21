const container = document.getElementsByClassName("apps-container");
const inp = document.getElementById("overlay");
const but = document.getElementById("overlay2");

let imageLinks = ["https://www.youtube.com/@BB23-", "https://www.instagram.com/ranmc9918/", "https://www.tiktok.com/@ranmc9918", "https://www.facebook.com/profile.php?id=100083059085989", "https://www.youtube.com/channel/UCEC9bd4ZELRY8-fgElrRo_A", "https://open.spotify.com/user/31biblaehr72x7fyqcb3bwuatvou", "https://web.snapchat.com/", "https://web.whatsapp.com/", "https://www.netflix.com/", "https://www.messenger.com/"]

let num;
let lines = inp.value;

but.addEventListener("click", render)

render();
function render(){
    lines = inp.value;
    while(container[0].firstChild){
        container[0].removeChild(container[0].lastChild);
    }
    for (let i = 0; i < lines; i++) {
        let appNew = document.createElement("div");
        appNew.className = "appLine";
        container[0].appendChild(appNew);
        if(i % 2 == 0){
            num = 3;
        }
        else{
            num = 4;
        }
    
        for(let j = 0; j < num; j++) {
            app = document.createElement("div");
            app.id = i * 3 + j;
            app.className = "apps";
            let randNum = Math.floor(Math.random() * 10)
            if(randNum == 0){
                app.style.backgroundImage = "url(images/appIcons/" + 0 + ".gif"
                app.style.backgroundPosition = "center";

            }
            else{
                app.style.backgroundImage = "url(images/appIcons/" + randNum + ".png"
                app.style.backgroundPosition = "center";
            }
            app.onclick = function() {
                window.location.href = imageLinks[randNum];
            };
             
            appNew.appendChild(app);
        }
        
    }
    resizeApps();
}

let mouse = false;
let x = NaN;
let y = NaN;
document.addEventListener("mousedown", (event) => {mouse = true; x = NaN; y = NaN; console.log("down")})
document.addEventListener("touchdown", (event) => {mouse = true; x = NaN; y = NaN; console.log("down")})
document.addEventListener("mousemove", move)
document.addEventListener("touchmove", move)
document.addEventListener("mouseup", () => {mouse = false; x = NaN; y = NaN; console.log("up"); moveBackX()})

document.addEventListener("touchend", (event) => {mouse = true; x = NaN; y = NaN; console.log("down"); moveBackX()})

let boxL = 0;
let boxT = 0;

function move(event) {
    
    if(mouse){
        if(isMobile()){
            let Touch = event.touches[0] || event.changedTouches[0]
            realX = Touch.clientX
            realY = Touch.pageY
            //console.log(realX,realY)
        }else{
            realX = event.clientX
            realY = event.clientY
        }
        if(isNaN(x)){
            //console.log("eeee")
            x = realX
            y = realY
        }
        container[0].style.transform = "translate(" + (realX - x + boxL) + "px, " + (realY - y + boxT) + "px)";
        //console.log(boxL)
        boxL = realX - x + boxL;
        boxT = realY - y + boxT;
        x = realX
        y = realY
        if(boxL > 0.2 * window.innerWidth ){
            boxL = 0.2 * window.innerWidth
        }
        else if(boxL < -0.2 * window.innerWidth){
            boxL = -0.2 * window.innerWidth;
        }

        resizeApps();

    }

}
let al = true
function isMobile() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        if(al){
            alert("Get on your computer, it will look like crap on your phone.")
            al = false
        }
        return true;
    }
    else {
        return false;
    }
}


function moveBackX() {
    if(!mouse){
        intervalID = setInterval(() => {
            
            boxL -= boxL / 10
                
            if(-1 < boxL && boxL < 1){
                clearInterval(intervalID);
            }
            resizeApps();
            container[0].style.transform = "translate(" + boxL + "px, " + boxT + "px)";
        }, 10)
    
    }
}



function resizeApps(){
    appElements = document.getElementsByClassName("apps")
        for(let i = 0; i < appElements.length; i++)
        {
            let pos = appElements[i].getBoundingClientRect();
            let dist = Math.sqrt(Math.pow((pos.x + 20) - (window.innerWidth/2), 2)* 1.1 + Math.pow((pos.y + 25) - (window.innerHeight/2), 2))
            let full = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2))
            let xer = 2 * dist/full;
            let factor = -60 * Math.pow(xer, 4) + 1.8 * Math.pow(xer, 3) + 2.8 * Math.pow(xer, 2) + -0.1 * xer + 0.9
            //let factor = -30 * Math.pow(dist / full, 2) + 1
            if(factor > 0.3){
                appElements[i].style.transform = "scale(" + factor + ")";
            }
            else{
                appElements[i].style.transform = "scale(0.3)";
            }
            
        
        }
}
