// For every element you want to have animation, insert id here and set opacity to 0 in the CSS
let elementsArray = [
   "page1TopDivTitle",
   "page1TopDivButtonDiv",
   "page1BottomDivTitle",
   "page1BottomDivSubtitle",
   "page1BottomAccordionTitle",
   "page1BottomAccordionDetails",
   "page1BottomAccordionDetailsExample",
   "page1BottomCardTitle",
   "page1BottomCardDetails",
   "page1BottomCardDetailsExample",
   "page1BottomDivWhyTitle",
   "page1BottomWhyTitle",
   "page1BottomWhyDetails"
];
let excludeInHidden = [
   "#cardIndicatorDiv"
];

let cm;
let isAccordion = !1;
// To track card current slide
let cardCurrent;
let cardCurrentIndex;
let selectedAccordionForDeletion;
// Track double click
let latestTap;

$(function () {
   sjcl.random.startCollectors();
   checkElement();

   require([
      "js/codemirror-5.42.2/lib/codemirror", "js/codemirror-5.42.2/mode/htmlmixed/htmlmixed", "js/codemirror-5.42.2/addon/selection/active-line"
   ], function (CodeMirror) {
      cm = CodeMirror.fromTextArea(document.getElementById("rawTextarea"), {
         styleActiveLine: true,
         matchBrackets: true,
         theme: "shadowfox",
         mode: "htmlmixed"
      });
   });

   $('[data-toggle="popover"]').popover({
      trigger: 'focus'
   });

   $(document).on("click", function (e) {
      let i = 0;
      let nodeYouWant = e.target;
      while (nodeYouWant && i < 3) {
         if (nodeYouWant.className === "accordionDiv") {
            selectedAccordionForDeletion = nodeYouWant;
            break;
         } else if (nodeYouWant.className === "cardFlipDiv") {
            selectedFlashCardForDeletion = nodeYouWant;
            break;
         } else {
            nodeYouWant = nodeYouWant.parentNode;
            i++;
         }
      }
   });

   $(document).on("keydown", "[contentEditable]", setHiddenHTML);
   $(document).on("keyup", "[contentEditable]", setHiddenHTML);
});

function checkElement() {
   for (i = 0; i < elementsArray.length; i++) {
      let element = document.getElementById(elementsArray[i]);
      if ($(element).css("opacity") == 1) {
         continue;
      }
      if (window.pageYOffset >= ($(element).position().top - $(window).height() * 0.8)) {
         animateElement(element);
      }
   }
}

function animateElement(theElement) {
   theElement.style.position = "relative";
   theElement.style.top = "-50px";
   $(theElement).animate({
      opacity: 1,
      top: "0"
   }, 1500);
}

function animatePage1Out() {
   // Show page2
   let page2 = $("#page2");
   page2.css("display", "flex");
   page2.css("position", "absolute");
   page2.css("top", "0");
   page2.css("left", "0");

   // Hide page1
   let page1 = $("#page1");
   page1.hide("fold", 1200, function () {
      page1.css("display", "none");

      page2.css("position", "");
      page2.css("top", "");
      page2.css("left", "");

      // Set opacity to 0 Again
      for (i = 0; i < elementsArray.length; i++) {
         let element = document.getElementById(elementsArray[i]);
         if ($(element).css("opacity") == 0) {
            continue;
         }
         element.style.opacity = "0";
      }
   });
}

function animatePage1In() {
   cardCurrent = null;
   cardCurrentIndex = 0;
   let page2 = $("#page2");
   page2.css("position", "absolute");
   page2.css("top", "0");
   page2.css("left", "0");

   let page1 = $("#page1");
   page1.show("fold", 1200, function () {
      page2.css("display", "none");
      page2.css("position", "");
      page2.css("top", "");
      page2.css("left", "");
      checkElement();
   });
}

function animatePage2Out() {
   // Show page3
   let page3 = $("#page3");
   page3.css("display", "flex");
   page3.css("position", "absolute");
   page3.css("top", "0");
   page3.css("left", "0");

   // Hide page2
   let page2 = $("#page2");
   page2.hide("drop", {
      direction: "down"
   }, 1200, function () {
      page2.css("display", "none");

      page3.css("position", "");
      page3.css("top", "");
      page3.css("left", "");
   });
}

function animatePage2In() {
   // Show page3
   let page3 = $("#page3");
   page3.css("position", "absolute");
   page3.css("top", "0");
   page3.css("left", "0");

   // Hide page2
   let page2 = $("#page2");
   page2.show("drop", {
      direction: "down"
   }, 1200, function () {
      page3.css("display", "none");
      page3.css("position", "");
      page3.css("top", "");
      page3.css("left", "");
   });
}

function animatePage3Out() {
   let page3 = $("#page3");
   page3.css("position", "absolute");
   page3.css("top", "0");
   page3.css("left", "0");

   let page1 = $("#page1");
   page1.show("fold", 1200, function () {
      page3.css("display", "none");
      page3.css("position", "");
      page3.css("top", "");
      page3.css("left", "");
      checkElement();
   });
}

function createNewButton() {
   // Replace the hidden area with template
   $("#componentsDiv").empty();
   animatePage1Out();

   let page2BottomLeftDivLeftDiv = document.getElementById("page2BottomLeftDivLeftDiv");
   document.getElementById("hiddenCodeTextarea").style.display = "none";
   document.getElementById("templateMainDiv").style.display = "flex";
   page2BottomLeftDivLeftDiv.className = "expand";
}

function importPresetShowModal() {
   $("#importTextarea").val("");
   $('#importDiv').modal('show');
}

function hideImportModal() {
   $('#importDiv').modal('hide');
}

function checkImportTextarea() {
   let importedText = $("#importTextarea").val();
   if (importedText) {
      let tempDiv = $('<div>').append($(importedText).clone());
      if (tempDiv.find(".accordion").html()) {
         loadImportedAccordion(tempDiv);
         return !0;
      } else if (tempDiv.find(".cardAnimationDiv").html()) {
         loadImportedCard(tempDiv);
         return !0;
      }
   }
   alert("None detected");
}

function loadImportedAccordion(tempDiv) {
   $("#componentsDiv").empty();

   tempDiv.find(".accordion").each(function () {
      let accordionDivDiv = document.createElement("div");
      accordionDivDiv.className = "accordionDiv";
      // Draggable
      let accordionDraggableDiv = document.createElement("div");
      accordionDraggableDiv.className = "accordionDraggableDiv progress-bar-striped bg-success";

      // Accordion
      let accordionTitle = $(this).children().eq(0)[0];
      accordionTitle.contentEditable = "true";
      accordionTitle.setAttribute("onclick", "doubletap(this)");

      let accordionContent = $(this).find(".accordionContent")[0];
      accordionContent.className = "accordionContent contenteditableBr";
      accordionContent.contentEditable = "true";

      accordionDivDiv.appendChild(accordionDraggableDiv);
      accordionDivDiv.appendChild(this);

      $("#componentsDiv").append(accordionDivDiv);
   });

   isAccordion = !0;
   $("#page2TopBarDivTitle > p").text("Accordion");
   makeSortable();
   hideImportModal();
   animatePage1Out();
}

function loadImportedCard(tempDiv) {
   $("#componentsDiv").empty();

   let cardAnimationDiv = document.createElement("div");
   cardAnimationDiv.className = "cardAnimationDiv";
   tempDiv.find(".cardSwipeDiv").each(function () {
      this.removeAttribute("onmousedown");
      this.removeAttribute("onmouseup");
      this.removeAttribute("ontouchstart");
      this.removeAttribute("ontouchend");
      this.setAttribute("ondblclick", "ifDblClicked(this)");

      let cardAnimationDivTitle = $(this).children().eq(0)[0];
      cardAnimationDivTitle.className = "contenteditableBr";
      cardAnimationDivTitle.contentEditable = "true";

      let cardSwipeContent = $(this).find(".cardSwipeContent");
      cardSwipeContent.className = "cardSwipeContent contenteditableBr";
      cardSwipeContent.contentEditable = "true";

      cardAnimationDiv.appendChild(this);
   });
   $("#componentsDiv").append(cardAnimationDiv);

   // Div to contain the buttons
   let cardIndicatorDiv = document.createElement("div");
   cardIndicatorDiv.id = "cardIndicatorDiv";
   // Adding buttons for navigation
   let backBtn = document.createElement("button");
   backBtn.className = "btn btn-info";
   backBtn.setAttribute("onclick", "goLeft(null)");
   backBtn.appendChild(document.createTextNode("View Previous Slide"));
   let forwardBtn = document.createElement("button");
   forwardBtn.className = "btn btn-info";
   forwardBtn.setAttribute("onclick", "ifDblClicked(null)");
   forwardBtn.appendChild(document.createTextNode("View Next Slide"));

   let totalCardChild = $(".cardAnimationDiv").children().length;
   let cardIndexIndicator = document.createElement("p");
   cardIndexIndicator.id = "cardIndexIndicator";
   cardIndexIndicator.className = "text-success";

   cardIndicatorDiv.appendChild(backBtn);
   cardIndicatorDiv.appendChild(cardIndexIndicator);
   cardIndicatorDiv.appendChild(forwardBtn);
   $("#componentsDiv").append(cardIndicatorDiv);

   cardCurrentIndex = 0;
   if (!cardCurrent) {
      cardCurrent = $(cardAnimationDiv).find(".cardSwipeDiv").eq(0)[0];
   }

   $("#page2TopBarDivTitle > p").text("Card");
   startupCard();
   setCardIndicator();
   hideImportModal();
   animatePage1Out();
}

function showTemplates() {
   let page2BottomLeftDivLeftDiv = document.getElementById("page2BottomLeftDivLeftDiv");
   if ($(page2BottomLeftDivLeftDiv).hasClass("expand")) {
      if (document.getElementById("templateMainDiv").style.display === "none") {
         document.getElementById("hiddenCodeTextarea").style.display = "none";
         document.getElementById("templateMainDiv").style.display = "flex";
      } else {
         page2BottomLeftDivLeftDiv.className = "";
      }
   } else {
      document.getElementById("hiddenCodeTextarea").style.display = "none";
      document.getElementById("templateMainDiv").style.display = "flex";
      page2BottomLeftDivLeftDiv.className = "expand";
   }
}

// Components Presets
function loadAccordionPreset() {
   showTemplates();
   isAccordion = 0;
   $("#page2TopBarDivTitle > p").text("Accordion");
   let componentsDiv = document.getElementById("componentsDiv");
   let accordionDiv = addNewAccordion();
   $(componentsDiv).empty();
   componentsDiv.appendChild(accordionDiv);
   makeSortable();
}

function loadAccordionAltPreset() {
   showTemplates();
   isAccordion = 1;
   $("#page2TopBarDivTitle > p").text("Accordion Alternate");
   let componentsDiv = document.getElementById("componentsDiv");
   let accordionDiv = addNewAltAccordion();
   $(componentsDiv).empty();
   componentsDiv.appendChild(accordionDiv);
   makeSortable();
}

function loadCardPreset() {
   showTemplates();
   isAccordion = 2;
   cardCurrentIndex = 0;

   $("#page2TopBarDivTitle > p").text("Card");
   // Adding the card
   let cardAnimationDiv = document.createElement("div");
   cardAnimationDiv.className = "cardAnimationDiv";
   // CardSwipeDivDiv is for Alt but left in for original also
   let cardSwipeDivDiv = document.createElement("div");
   cardSwipeDivDiv.className = "cardSwipeDivDiv";
   cardSwipeDivDiv.appendChild(addNewCard());
   let componentsDiv = document.getElementById("componentsDiv");
   $(componentsDiv).empty();
   cardAnimationDiv.appendChild(cardSwipeDivDiv);
   componentsDiv.appendChild(cardAnimationDiv);
   // Code that also be needed to be added at output
   // for(let oriPos,z=0;z!=document.getElementsByClassName("cardAnimationDiv").length;){for(let nodeArray=document.getElementsByClassName("cardAnimationDiv")[z].children,i=0,j=nodeArray.length-1;i!=nodeArray.length;)nodeArray[i].style.zIndex=j,1!=i&&0!=i&&(nodeArray[i].style.display="none"),i++,j--;z++};

   // Div to contain the buttons
   let cardIndicatorDiv = document.createElement("div");
   cardIndicatorDiv.id = "cardIndicatorDiv";
   // Adding buttons for navigation
   let backBtn = document.createElement("button");
   backBtn.className = "btn btn-info";
   backBtn.id = "cardBackButton";
   backBtn.setAttribute("onclick", "goLeft(this.parentElement.previousElementSibling.children[0])");
   backBtn.appendChild(document.createTextNode("View Previous Slide"));
   let forwardBtn = document.createElement("button");
   forwardBtn.className = "btn btn-info";
   forwardBtn.id = "cardNextButton";
   forwardBtn.setAttribute("onclick", "ifDblClicked(this.parentElement.previousElementSibling.children[0])");
   forwardBtn.appendChild(document.createTextNode("View Next Slide"));

   let totalCardChild = $(".cardAnimationDiv").children().length;
   let cardIndexIndicator = document.createElement("p");
   cardIndexIndicator.id = "cardIndexIndicator";
   cardIndexIndicator.className = "text-success";

   cardIndicatorDiv.appendChild(backBtn);
   cardIndicatorDiv.appendChild(cardIndexIndicator);
   cardIndicatorDiv.appendChild(forwardBtn);
   componentsDiv.appendChild(cardIndicatorDiv);

   setCardIndicator();
}

// TODO
function loadCardAltPreset() {

}

function loadFlashCardPreset() {
   showTemplates();
   isAccordion = 4;
   $("#page2TopBarDivTitle > p").text("Flash Card");
   let componentsDiv = document.getElementById("componentsDiv");
   let cardFlipMasterDiv = document.createElement("div");
   cardFlipMasterDiv.className = "cardFlipMasterDiv";
   let cardFlipDiv = addNewFlashCard();
   $(componentsDiv).empty();
   cardFlipMasterDiv.appendChild(cardFlipDiv);
   componentsDiv.appendChild(cardFlipMasterDiv);
}

function loadChecklistPreset() {
   showTemplates();
   isAccordion = 5;
   $("#page2TopBarDivTitle > p").text("Checklist");
   let componentsDiv = document.getElementById("componentsDiv");
   let checkBoxPageDiv = document.createElement("div");
   checkBoxPageDiv.className = "checkBoxPageDiv";
   let checkBoxPageDivP = document.createElement("p");
   checkBoxPageDivP.appendChild(document.createTextNode("Type Here"));
   checkBoxPageDivP.contentEditable = "true";

   checkBoxPageDiv.appendChild(checkBoxPageDivP);
   checkBoxPageDiv.appendChild(addNewChecklist());
   $(componentsDiv).empty();
   componentsDiv.appendChild(checkBoxPageDiv);
   startupChecklist();
}

// Adding and Removing
function addNewSection() {
   switch (isAccordion) {
   case 0:
      document.getElementById("componentsDiv").appendChild(addNewAccordion());
      makeSortable();
      break;
   case 1:
      document.getElementById("componentsDiv").appendChild(addNewAltAccordion());
      makeSortable();
      break;
   case 2:
      let newCard = addNewCard();
      document.getElementsByClassName("cardSwipeDivDiv")[0].appendChild(newCard);
      startupCard();
      setCardIndicator();
      break;
   case 4:
      document.getElementsByClassName("cardFlipMasterDiv")[0].appendChild(addNewFlashCard());
      break;
   case 5:
      $(".checkBoxPageDiv").append(addNewChecklist());
      startupChecklist();
      break;
   }
   setHiddenHTML();
}

function removeSection() {
   switch (isAccordion) {
   case 0:
   case 1:
      if (selectedAccordionForDeletion) {
         $(selectedAccordionForDeletion).remove();
      }
      break;
   case 2:
   case 3:
      let cardSwipeDivDivChildren = cardCurrent.parentElement.children;
      for (i = 0; i < cardSwipeDivDivChildren.length; i++) {
         // Not first
         if (cardSwipeDivDivChildren[i].style.display === "flex" && i >= 1) {
            document.getElementById("cardBackButton").disabled = true;
            document.getElementById("cardNextButton").disabled = true;
            goLeft(document.getElementsByClassName("cardSwipeDivDiv")[0]);
            setTimeout(function () {
               cardCurrent.parentElement.removeChild(cardSwipeDivDivChildren[i]);
               // Enable the Prev Slide Button
               document.getElementById("cardBackButton").disabled = false;
               document.getElementById("cardNextButton").disabled = false;
               setCardIndicator();
            }, 510);
            cardCurrent = cardSwipeDivDivChildren[i - 1];
            break;
         } else if (cardSwipeDivDivChildren[i].style.display === "flex" && i === 0) {
            document.getElementById("cardBackButton").disabled = true;
            document.getElementById("cardNextButton").disabled = true;
            cardCurrentIndex--;
            ifDblClicked(document.getElementsByClassName("cardSwipeDivDiv")[0]);
            setTimeout(function () {
               cardCurrent.parentElement.removeChild(cardSwipeDivDivChildren[i]);
               // Enable the Prev Slide Button
               document.getElementById("cardBackButton").disabled = false;
               document.getElementById("cardNextButton").disabled = false;
               setCardIndicator();
            }, 500);
            cardCurrent = cardSwipeDivDivChildren[i + 1];
            break;
         }
      }
      break;
   case 4:
      if (selectedFlashCardForDeletion) {
         $(selectedFlashCardForDeletion).remove();
      }
      break;
   }
   setHiddenHTML();
}

// Adding Section
function addNewAccordion() {
   let accordionDivDiv = document.createElement("div");
   accordionDivDiv.className = "accordionDiv";
   // Draggable
   let accordionDraggableDiv = document.createElement("div");
   accordionDraggableDiv.className = "accordionDraggableDiv progress-bar-striped bg-success";
   // Accordion
   let accordionDiv = document.createElement("div");
   accordionDiv.className = "accordion";
   let accordionTitleDiv = document.createElement("div");
   // Double click for editing... remember to change on output
   accordionTitleDiv.setAttribute("onclick", "accordionDoubletap(this)");;
   accordionTitleDiv.contentEditable = "true";
   let accordionTitle = document.createElement("p");
   accordionTitle.appendChild(document.createTextNode("Enter Title Here"));
   let accordionContent = document.createElement("div");
   // Contenteditable for editing... remember to change on output
   accordionContent.className = "accordionContent";
   accordionContent.contentEditable = "true";
   accordionContent.innerHTML = "<p>Enter Content Here</p>";

   contentEditableBr();

   accordionTitleDiv.appendChild(accordionTitle);
   accordionDiv.appendChild(accordionTitleDiv);
   accordionDiv.appendChild(accordionContent);

   accordionDivDiv.appendChild(accordionDraggableDiv);
   accordionDivDiv.appendChild(accordionDiv);

   return accordionDivDiv;
}

function addNewAltAccordion() {
   let accordionDivDiv = document.createElement("div");
   accordionDivDiv.className = "accordionDiv";
   // Draggable
   let accordionDraggableDiv = document.createElement("div");
   accordionDraggableDiv.className = "accordionDraggableDiv progress-bar-striped bg-success";
   // Accordion
   let accordionDiv = document.createElement("div");
   accordionDiv.className = "accordionAlternate";
   let accordionTitleDiv = document.createElement("div");
   // Double click for editing... remember to change on output
   accordionTitleDiv.setAttribute("onclick", "accordionAltDoubletap(this)");;
   accordionTitleDiv.contentEditable = "true";
   let accordionTitle = document.createElement("p");
   accordionTitle.appendChild(document.createTextNode("Enter Title Here"));
   contentEditableBr();

   let accordionContent = document.createElement("div");
   // Contenteditable for editing... remember to change on output
   accordionContent.className = "accordionAlternateContent";
   accordionContent.contentEditable = "true";
   accordionContent.innerHTML = "<p>Enter Content Here</p>";

   contentEditableBr();

   accordionTitleDiv.appendChild(accordionTitle);
   accordionDiv.appendChild(accordionTitleDiv);
   accordionDiv.appendChild(accordionContent);

   accordionDivDiv.appendChild(accordionDraggableDiv);
   accordionDivDiv.appendChild(accordionDiv);

   return accordionDivDiv;
}

function addNewCard() {
   let cardSwipeDiv = document.createElement("div");
   cardSwipeDiv.className = "cardSwipeDiv";
   cardSwipeDiv.setAttribute("ondblclick", "ifDblClicked(this)");
   let cardAnimationDivTitle = document.createElement("p");
   cardAnimationDivTitle.contentEditable = "true";
   cardAnimationDivTitle.appendChild(document.createTextNode("Type here"));
   let cardSwipeContent = document.createElement("div");
   cardSwipeContent.className = "cardSwipeContent";
   cardSwipeContent.contentEditable = "true";
   let cardSwipeContentP = document.createElement("p");
   cardSwipeContentP.appendChild(document.createTextNode("Type here"));

   cardSwipeContent.appendChild(cardSwipeContentP);
   cardSwipeDiv.appendChild(cardAnimationDivTitle);
   cardSwipeDiv.appendChild(cardSwipeContent);

   contentEditableBr();

   if (!cardCurrent) {
      cardCurrent = cardSwipeDiv;
   }

   return cardSwipeDiv;
}

function setCardIndicator() {
   $("#cardIndexIndicator").html((cardCurrentIndex + 1) + " <span style='color:#6c757d'>-</span> <span style='color:#dc3545'>" + $(".cardSwipeDivDiv").children().length + "</span>");
}

function addNewFlashCard() {
   let cardFlipDiv = document.createElement("div");
   cardFlipDiv.className = "cardFlipDiv";
   let cardFlipDivDiv = document.createElement("div");
   cardFlipDivDiv.className = "cardFlipDivDiv";
   let cardFlipFront = document.createElement("div");
   cardFlipFront.className = "cardFlipFront contenteditableBr";
   cardFlipFront.setAttribute("ondblclick", "this.style.display='none'");
   cardFlipFront.contentEditable = "true";
   let cardFlipFrontP = document.createElement("p");
   cardFlipFrontP.appendChild(document.createTextNode("Type Here"));
   let cardFlipBack = document.createElement("div");
   cardFlipBack.className = "cardFlipBack contenteditableBr";
   cardFlipBack.setAttribute("ondblclick", "this.previousElementSibling.style.display='flex'");
   let cardFlipBackP = document.createElement("p");
   cardFlipBackP.appendChild(document.createTextNode("Type Here"));
   cardFlipBack.contentEditable = "true";

   cardFlipFront.appendChild(cardFlipFrontP);
   cardFlipBack.appendChild(cardFlipBackP);
   cardFlipDivDiv.appendChild(cardFlipFront);
   cardFlipDivDiv.appendChild(cardFlipBack);
   cardFlipDiv.appendChild(cardFlipDivDiv);

   contentEditableBr();
   return cardFlipDiv;
}

function addNewChecklist() {
   let randomGenerated = getRandomWords();
   let checkboxContainer = document.createElement("div");
   checkboxContainer.className = "checkboxContainer";
   let checkboxContainerCheckbox = document.createElement("input");
   checkboxContainerCheckbox.setAttribute("onchange", "localStorage.setItem(this.id, this.checked)");
   checkboxContainerCheckbox.type = "checkbox";
   checkboxContainerCheckbox.id = randomGenerated;
   let checkboxContainerCheckboxLabel = document.createElement("label");
   checkboxContainerCheckboxLabel.className = "checkboxContainerCheckmark";
   checkboxContainerCheckboxLabel.appendChild(document.createTextNode("Type Here"));
   checkboxContainerCheckboxLabel.contentEditable = "true";

   checkboxContainer.appendChild(checkboxContainerCheckbox);
   checkboxContainer.appendChild(checkboxContainerCheckboxLabel);

   return checkboxContainer;
}

// Hidden HTML
function toggleHiddenCodes() {
   let page2BottomLeftDivLeftDiv = document.getElementById("page2BottomLeftDivLeftDiv");
   if ($(page2BottomLeftDivLeftDiv).hasClass("expand")) {
      if (document.getElementById("hiddenCodeTextarea").style.display === "none") {
         document.getElementById("templateMainDiv").style.display = "none";
         document.getElementById("hiddenCodeTextarea").style.display = "flex";
      } else {
         page2BottomLeftDivLeftDiv.className = "";
      }
   } else {
      document.getElementById("templateMainDiv").style.display = "none";
      document.getElementById("hiddenCodeTextarea").style.display = "flex";
      page2BottomLeftDivLeftDiv.className = "expand";
   }
   setHiddenHTML();
}

function updateComponentsDiv() {
   let output = document.createElement("div");
   output.innerHTML = cm.getValue();
   let componentsDiv = $("#componentsDiv").clone().children();
   for (i = 0; i < componentsDiv.length; i++) {
      for (j = 0; j < excludeInHidden.length; j++) {
         if ("#" + componentsDiv[i].id === excludeInHidden[j]) {
            output.insertBefore(componentsDiv[i], output.childNodes[i]);
         }
      }
   }
   $("#componentsDiv").html(output.innerHTML);
}

function setHiddenHTML() {
   let componentsDiv = $("#componentsDiv").clone();
   for (i = 0; i < excludeInHidden.length; i++) {
      if (componentsDiv.find(excludeInHidden[i])) {
         componentsDiv.find(excludeInHidden[i]).remove();
      }
   }
   cm.setValue(html_beautify(componentsDiv.html(), {
      indent_size: 2
   }));
}

// Output page2
function page2Output() {
   $("#tempTextarea").val("");
   $("#tempDiv").empty();
   let componentsDiv = $("#componentsDiv").clone();
   switch (isAccordion) {
   case 0: // Accordion
      componentsDiv.find(".accordion").each(function () {
         let accordion = $(this);
         let accordionTitle = accordion.children().eq(0)[0];
         let accordionContent = accordion.children().eq(1)[0];

         // Remove contentEditable
         accordion[0].className = "accordion";
         accordionTitle.removeAttribute("contenteditable");
         accordionContent.removeAttribute("contenteditable");

         // Changing dblclick to click
         accordionTitle.setAttribute("onclick", "this.parentElement.className='accordion'===this.parentElement.className?'accordion expand':'accordion';");
         $("#tempTextarea")[0].value += accordion[0].outerHTML;
         $("#tempDiv")[0].innerHTML += accordion[0].outerHTML;
      });
      break;
   case 1: // Accordion Alternate
      componentsDiv.find(".accordionAlternate").each(function () {
         let accordion = $(this);
         let accordionTitle = accordion.children().eq(0)[0];
         let accordionContent = accordion.children().eq(1)[0];

         // Remove contentEditable
         accordion[0].className = "accordionAlternate";
         accordionTitle.removeAttribute("contenteditable");
         accordionContent.removeAttribute("contenteditable");

         // Changing dblclick to click
         accordionTitle.setAttribute("onclick", "this.parentElement.className='accordionAlternate'===this.parentElement.className?'accordionAlternate expand':'accordionAlternate';");
         $("#tempTextarea")[0].value += accordion[0].outerHTML;
         $("#tempDiv")[0].innerHTML += accordion[0].outerHTML;
      });
      break;
   case 2: // Card
      $("#tempTextarea")[0].value = "<div class='cardAnimationDiv'>";
      componentsDiv.find(".cardAnimationDiv > .cardSwipeDivDiv > .cardSwipeDiv").each(function () {
         let card = $(this);
         let cardTitle = card.children().eq(0)[0];
         let cardContent = card.children().eq(1)[0];

         // Remove contentEditable
         cardTitle.removeAttribute("contenteditable");
         cardContent.removeAttribute("contenteditable");
         cardTitle.removeAttribute("class");
         cardContent.className = "cardSwipeContent";
         this.removeAttribute("style");
         this.setAttribute("onmousedown",
            cardMouseDown
         );
         this.setAttribute("onmouseup",
            cardMouseUp
         );
         this.setAttribute("ontouchstart",
            cardMouseDown
         );
         this.setAttribute("ontouchend",
            cardMouseUp
         );
         this.setAttribute("ondblclick",
            cardDblClick
         );
         $("#tempTextarea")[0].value += this.outerHTML;
      });
      $("#tempTextarea")[0].value += "</div><script>" + cardStartup + "</script>";
      break;
   case 3: // Card Alternate
   case 4: // Flash Card
   case 5: // Checklist
      let checkBoxTitle = componentsDiv.find(".checkBoxPageDiv > :first-child")[0];
      checkBoxTitle.removeAttribute("contenteditable");
      componentsDiv.find(".checkboxContainer").each(function () {
         let checkboxContainer = $(this);
         let checkboxInput = checkboxContainer.children().eq(0)[0];
         let checkboxLabel = checkboxContainer.children().eq(1)[0];

         checkboxLabel.htmlFor = checkboxInput.id;
         // Remove contentEditable
         checkboxLabel.removeAttribute("contentEditable");
      });
      $("#tempTextarea")[0].value = componentsDiv.html();
      break;
   case 6: // Tabs
   case 7: // Lists
   }

   animatePage2Out();
}

function flashCardCheckEnterKey(e) {
   if (e.keyCode === 13) {
      // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
      document.execCommand("insertHTML", false, "<br><h2>&nbsp;</h2>");
      // prevent the default behaviour of return key pressed
      return false;
   }
}

function checkEnterKey(e) {
   // trap the return key being pressed
   /*
   if (e.keyCode === 13) {
      // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
      document.execCommand("insertHTML", false, "<br><br>");
      // prevent the default behaviour of return key pressed
      return false;
   }
   */
   if (e.keyCode === 8) {
      if ($(this).html() === "<p><br></p>" || $(this).html() === "<h2><br></h2>") {
         // prevent the default behaviour of return key pressed
         return false;
      }
   }
}

function contentEditableBr() {
   // Make sure there is only one event attached
   $(document).off("keydown", "[contenteditable]", checkEnterKey);

   // Prevent creating div on enter
   $(document).on("keydown", "[contenteditable]", checkEnterKey);
}

// Check double click
function accordionDoubletap(element) {
   let now = new Date().getTime();
   let timesince = now - latestTap;
   if ((timesince < 400) && (timesince > 0)) {
      element.parentElement.className = 'accordion' === element.parentElement.className ? 'accordion expand' : 'accordion';
      latestTap = 0;
      return !1;
   }

   latestTap = new Date().getTime();
}

function accordionAltDoubletap(element) {
   let now = new Date().getTime();
   let timesince = now - latestTap;
   if ((timesince < 400) && (timesince > 0)) {
      element.parentElement.className = 'accordionAlternate' === element.parentElement.className ? 'accordionAlternate expand' : 'accordionAlternate';
      latestTap = 0;
      return !1;
   }

   latestTap = new Date().getTime();
}

// Sortable
function makeSortable() {
   // Making contentDivDiv sortable
   $("#componentsDiv").sortable({
      items: ".accordionDiv",
      handle: ".accordionDraggableDiv",
      axis: "y",
      cursor: "move",
      opacity: 0.5
   });
}

// Random word / number for Checklist
function getRandomWords() {
   let wordCount = 1;
   let randomWords;

   if (window.crypto && window.crypto.getRandomValues) {
      randomWords = new Int32Array(wordCount);
      window.crypto.getRandomValues(randomWords);
   } else if (window.msCrypto && window.msCrypto.getRandomValues) {
      randomWords = new Int32Array(wordCount);
      window.msCrypto.getRandomValues(randomWords);
   } else if (sjcl.random.isReady()) {
      randomWords = sjcl.random.randomWords(wordCount);
   } else {
      randomWords = [];
      for (let i = 0; i < wordCount; i++) {
         randomWords.push(isaac.rand());
      }
   }

   return randomWords;
};

// Card functions

function startupCard() {
   let cardSwipeDivDiv = document.getElementsByClassName("cardSwipeDivDiv");
   let oriPos;
   let latestTap = 0;

   for (i = 0; i != cardSwipeDivDiv.length; i++) {
      let cardSwipeDiv = cardSwipeDivDiv[i].getElementsByClassName("cardSwipeDiv");
      for (j = 0, k = cardSwipeDiv.length; j != cardSwipeDiv.length; j++, k--) {
         cardSwipeDiv[j].style.zIndex = k;
         if (cardSwipeDiv[j].style.display !== "none") {
            cardSwipeDiv[j].style.display = "flex";
            cardSwipeDiv[j].style.opacity = 1;
         }
      }
   }
}

function goLeft(clickedParent) {
   while (clickedParent && clickedParent.className !== "cardSwipeDivDiv") {
      clickedParent = clickedParent.parentElement;
   }
   let cardSwipeDivDivChildren = clickedParent.children;

   // Loop (i = 1 to prevent first)
   if (cardSwipeDivDivChildren[0].style.display === "none") {
      for (i = 1; i < cardSwipeDivDivChildren.length; i++) {
         if (cardSwipeDivDivChildren[i].style.display === "flex") {
            document.getElementById("cardBackButton").disabled = true;
            document.getElementById("cardNextButton").disabled = true;
            cardSwipeDivDivChildren[i].style.pointerEvents = "none";
            cardSwipeDivDivChildren[i - 1].style.pointerEvents = "none";
            cardSwipeDivDivChildren[i - 1].style.display = "flex";
            setTimeout(function () {
               cardSwipeDivDivChildren[i - 1].style.left = 0;
               cardSwipeDivDivChildren[i - 1].style.opacity = 1;
            }, 10);
            setTimeout(function () {
               cardSwipeDivDivChildren[i].style.pointerEvents = "auto";
               cardSwipeDivDivChildren[i - 1].style.pointerEvents = "auto";
               // Enable the Prev Slide Button
               document.getElementById("cardBackButton").disabled = false;
               document.getElementById("cardNextButton").disabled = false;
            }, 510);

            cardCurrent = cardSwipeDivDivChildren[i - 1];
            cardCurrentIndex--;
            break;
         }
      }
   }
   setCardIndicator();
}

function ifDblClicked(clickedParent) {
   while (clickedParent && clickedParent.className !== "cardSwipeDivDiv") {
      clickedParent = clickedParent.parentElement;
   }
   let cardSwipeDivDivChildren = clickedParent.children;

   // Loop (-1 to prevent last)
   for (i = 0; i < cardSwipeDivDivChildren.length - 1; i++) {
      if (cardSwipeDivDivChildren[i].style.display === "flex") {
         document.getElementById("cardBackButton").disabled = true;
         document.getElementById("cardNextButton").disabled = true;
         cardSwipeDivDivChildren[i].style.pointerEvents = "none";
         cardSwipeDivDivChildren[i + 1].style.pointerEvents = "none";
         cardSwipeDivDivChildren[i].style.left = "-50px";
         cardSwipeDivDivChildren[i].style.opacity = 0;
         setTimeout(function () {
            cardSwipeDivDivChildren[i].style.pointerEvents = "auto";
            cardSwipeDivDivChildren[i + 1].style.pointerEvents = "auto";
            cardSwipeDivDivChildren[i].style.display = "none";
            document.getElementById("cardBackButton").disabled = false;
            document.getElementById("cardNextButton").disabled = false;
         }, 500);
         cardCurrent = cardSwipeDivDivChildren[i + 1];
         cardCurrentIndex++;
         break;
      }
   }
   setCardIndicator();
}

// Checklist functions
function startupChecklist() {
   document.querySelectorAll(".checkboxContainer input").forEach(function(a){"true"===localStorage.getItem(a.id)&&(a.checked=!0)});
}

// Messy stuff
// CardStartup script
let cardStartup = "let cardSwipeDivDiv=document.getElementsByClassName('cardSwipeDivDiv'),oriPos,latestTap=0;for(i=0;i!=cardSwipeDivDiv.length;i++){let cardSwipeDiv=cardSwipeDivDiv[i].getElementsByClassName('cardSwipeDiv');j=0;for(k=cardSwipeDiv.length;j!=cardSwipeDiv.length;j++,k--)cardSwipeDiv[j].style.zIndex=k,cardSwipeDiv[j].style.display='flex',cardSwipeDiv[j].style.opacity=1}";

// Mousedown / Touchstart
let cardMouseDown = "oriPos=event.clientX;void 0==oriPos&&(oriPos=event.changedTouches[0].clientX);";

// Mouseup
let cardMouseUp = "let nowCursor=event.clientX;void 0==nowCursor&&(nowCursor=event.changedTouches[0].clientX);for(let clickedParent=this;'cardSwipeDivDiv'!==clickedParent.className;)clickedParent=clickedParent.parentElement;if(nowCursor<oriPos-.16*clickedParent.clientWidth){let cardSwipeDivDivChildren=clickedParent.children;for(i=0;i<cardSwipeDivDivChildren.length-1;i++)if('flex'===cardSwipeDivDivChildren[i].style.display){cardSwipeDivDivChildren[i].style.pointerEvents='none';cardSwipeDivDivChildren[i+1].style.pointerEvents='none';cardSwipeDivDivChildren[i].style.left='-50px';cardSwipeDivDivChildren[i].style.opacity=0;setTimeout(function(){cardSwipeDivDivChildren[i].style.pointerEvents='auto';cardSwipeDivDivChildren[i+1].style.pointerEvents='auto';cardSwipeDivDivChildren[i].style.display='none'},500);break}}else if(nowCursor>oriPos+.16*clickedParent.clientWidth&&(cardSwipeDivDivChildren=clickedParent.children,'none'===cardSwipeDivDivChildren[0].style.display))for(i=1;i<cardSwipeDivDivChildren.length;i++)if('flex'===cardSwipeDivDivChildren[i].style.display){cardSwipeDivDivChildren[i].style.pointerEvents='none';cardSwipeDivDivChildren[i-1].style.pointerEvents='none';cardSwipeDivDivChildren[i-1].style.display='flex';setTimeout(function(){cardSwipeDivDivChildren[i-1].style.left=0;cardSwipeDivDivChildren[i-1].style.opacity=1},10);setTimeout(function(){cardSwipeDivDivChildren[i].style.pointerEvents='auto';cardSwipeDivDivChildren[i-1].style.pointerEvents='auto'},510);break};";

// DblClick
let cardDblClick = "let now=(new Date).getTime(),timesince=now-latestTap;latestTap=(new Date).getTime();if(400>timesince&&0<timesince){for(let clickedParent=event.target;'cardSwipeDivDiv'!==clickedParent.className;)clickedParent=clickedParent.parentElement;let cardSwipeDivDivChildren=clickedParent.children;for(i=0;i<cardSwipeDivDivChildren.length-1;i++)if('flex'===cardSwipeDivDivChildren[i].style.display){cardSwipeDivDivChildren[i].style.pointerEvents='none';cardSwipeDivDivChildren[i+1].style.pointerEvents='none';cardSwipeDivDivChildren[i].style.left='-50px';cardSwipeDivDivChildren[i].style.opacity=0;setTimeout(function(){cardSwipeDivDivChildren[i].style.pointerEvents='auto';cardSwipeDivDivChildren[i+1].style.pointerEvents='auto';cardSwipeDivDivChildren[i].style.display='none'},500);break}latestTap=0};";
