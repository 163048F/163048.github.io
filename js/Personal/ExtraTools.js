$(function() {
   checkElement();
});

let elementsArray = [
   "page1TopDivTitle",
   "page1TopDivButtonDiv",
   "page1BottomDivTitle",
   "page1BottomDivSubtitle"
];

let runningAnimate = [];
let pageAnimationRunning = !1;

function checkElement() {
   for(i = 0; i < elementsArray.length; i++) {
      let element = document.getElementById(elementsArray[i]);
      if($(element).css("opacity") == 1 || runningAnimate.includes(elementsArray[i])) {
         continue;
      }
      if(window.pageYOffset >= ($(element).position().top - $(window).height() * 0.9)) {
         runningAnimate.push(elementsArray[i]);
         animateElement(element);
      }
   }
}

function animateElement(theElement) {
   let id = setInterval(frame, 5);
   theElement.style.position = "relative";
   let pos = -50;
   let posOri = pos;
   let opa = 0;
   function frame() {
      if (pos >= 0) {
         theElement.style.position = "unset";
         clearInterval(id);
      } else {
         if(pos <= (posOri * 0.9)) {
            // First 10%
            pos += 0.25;
            opa += 0.01;
         } else if (pos >= (posOri * 0.1)) {
            // Last 10%
            pos += 0.25;
            opa += 0.01;
         } else {
            pos += 0.5;
            opa += 0.02;
         }

         theElement.style.top = pos + 'px';
         theElement.style.opacity = opa;
       }
   }
}

function animatePage1Out() {
   if(pageAnimationRunning) {
      return !1;
   }
   // 120 secs
   // 1200 milisecs
   // 240 "frames"
   // Width / frames = itselfPos

   // Show page2
   let page2 = $("#page2");
   page2.css("display", "flex");
   page2.css("position", "absolute");
   page2.css("top", "0");
   page2.css("left", "0");

   // Hide page1
   // Duration
   let secs = 120;
   let theElement = $("#page1")[0];
   let id = setInterval(frame, 5);
   // Set animation is running
   pageAnimationRunning = !0;
   theElement.style.position = "relative";
   let pos = 0;
   // Gradient
   let itselfPos = 0.1;
   let itselfPosEnd = $(window).width() / ((secs * 10) / 5);
   let posOri = $(window).width();
   function frame() {
      if (pos >= posOri) {
         theElement.style.position = "unset";
         theElement.style.display = "none";
         theElement.style.right = "";
         page2.css("position", "unset");
         page2[0].style.top = "";
         page2[0].style.left = "";

         // Set opacity to 0 Again
         for(i = 0; i < elementsArray.length; i++) {
            let element = document.getElementById(elementsArray[i]);
            if($(element).css("opacity") == 0 || !runningAnimate.includes(elementsArray[i])) {
               continue;
            }
            element.style.opacity = "0";
         }
         runningAnimate = [];
         clearInterval(id);
         pageAnimationRunning = !1;
      } else {
         if(pos <= (posOri * 0.1)) {
            // First 10%
            pos += itselfPos;
            if(itselfPos < itselfPosEnd) {
               itselfPos *= 1.1;
            }
         } else if (pos >= (posOri * 0.9)) {
            // Last 10%
            pos++;
         } else {
            itselfPos = itselfPosEnd;
            pos += itselfPosEnd;
         }

         theElement.style.right = pos + 'px';
       }
   }
}

function animatePage1In() {
   if(pageAnimationRunning) {
      return !1;
   }
   // 120 secs
   // 1200 milisecs
   // 240 "frames"
   // Width / frames = itselfPos

   // Show page1
   let page1 = $("#page1");
   page1.css("display", "flex");
   page1.css("position", "absolute");
   page1.css("top", "0");
   page1.css("left", "0");
   page1.css("z-index", "0");
   checkElement();

   // Hide page1
   // Duration
   let secs = 120;
   let theElement = $("#page2")[0];
   let id = setInterval(frame, 5);
   pageAnimationRunning = !0;
   theElement.style.position = "relative";
   let pos = 0;
   // Gradient
   let itselfPos = 0.1;
   let itselfPosEnd = $(window).width() / ((secs * 10) / 5);
   let posOri = $(window).width();
   function frame() {
      if (pos >= posOri) {
         theElement.style.position = "unset";
         theElement.style.display = "none";
         theElement.style.left = "";
         page1.css("position", "unset");
         page1[0].style.top = "";
         page1[0].style.left = "";
         page1[0].style.zIndex = "3";
         clearInterval(id);
         pageAnimationRunning = !1;
      } else {
         if(pos <= (posOri * 0.1)) {
            // First 10%
            pos += itselfPos;
            if(itselfPos < itselfPosEnd) {
               itselfPos *= 1.1;
            }
         } else if (pos >= (posOri * 0.9)) {
            // Last 10%
            pos++;
         } else {
            itselfPos = itselfPosEnd;
            pos += itselfPosEnd;
         }

         theElement.style.left = pos + 'px';
       }
   }
}

function animatePage2Out() {
   if(pageAnimationRunning) {
      return !1;
   }

   // Show page3
   let page3 = $("#page3");
   page3.css("display", "flex");
   page3.css("position", "absolute");
   page3.css("top", "0");
   page3.css("left", "0");

   // Hide page2
   let theElement = $("#page2")[0];
   let id = setInterval(frame, 5);
   pageAnimationRunning = !0;
   theElement.style.position = "relative";
   let pos = 0;
   let itselfPos = 0.1;
   let posOri = $(window).height();
   function frame() {
      if (pos >= posOri) {
         theElement.style.position = "unset";
         theElement.style.display = "none";
         theElement.style.top = "";
         page3.css("position", "unset");
         page3[0].style.top = "";
         page3[0].style.left = "";
         clearInterval(id);
         pageAnimationRunning = !1;
      } else {
         if(pos <= (posOri * 0.1)) {
            // First 10%
            pos += itselfPos;
            if(itselfPos < 4) {
               itselfPos *= 1.1;
            }
         } else if (pos >= (posOri * 0.9)) {
            // Last 10%
            pos++;
         } else {
            itselfPos = 4;
            pos += 4;
         }

         theElement.style.top = pos + 'px';
       }
   }
}

function animatePage3Out() {
   if(pageAnimationRunning) {
      return !1;
   }

   // Show page1
   let page1 = $("#page1");
   page1.css("display", "flex");
   page1.css("position", "absolute");
   page1.css("top", "0");
   page1.css("left", "0");
   page1.css("z-index", "0");
   checkElement();

   // Hide page3
   let theElement = $("#page3")[0];
   let id = setInterval(frame, 1);
   pageAnimationRunning = !0;
   theElement.style.position = "relative";
   let pos = 0;
   let itselfPos = 0.1;
   let posOri = $(window).width();
   function frame() {
      if (pos >= posOri) {
         theElement.style.position = "unset";
         theElement.style.display = "none";
         theElement.style.left = "";
         page1.css("position", "unset");
         page1[0].style.top = "";
         page1[0].style.left = "";
         page1[0].style.zIndex = "3";
         clearInterval(id);
         pageAnimationRunning = !1;
      } else {
         if(pos <= (posOri * 0.1)) {
            // First 10%
            pos += itselfPos;
            if(itselfPos < 4) {
               itselfPos *= 1.1;
            }
         } else if (pos >= (posOri * 0.9)) {
            // Last 10%
            pos++;
         } else {
            itselfPos = 4;
            pos += 4;
         }

         theElement.style.left = pos + 'px';
       }
   }
}

function loadAccordionPreset() {
   animatePage1Out();
}

function loadCardPreset() {
   animatePage1Out();
}
