var selectedText = "";
var focusedInput;
var startIndex;
var shouldGoBackHide = 0;

function goPage2() {
   $("#carousel").carousel('next');
   $("#carousel").carousel('pause');
   $(".carousel-control-prev").css("display", "flex");
   shouldGoBackHide++;
}

function goPage3(lessonPlanTemplateDiv) {
   $("#carousel").carousel('next');
   $("#carousel").carousel('pause');
   $(".carousel-control-prev").css("display", "flex");
   shouldGoBackHide++;

   $("#importPage3Preview").empty();
   $("#importPage3Preview").append(lessonPlanTemplateDiv);
}

function goBack() {
   // Set progress bar to 0%
   $(".progress-bar").css("width", "0%");

   // Hiding alerts
   closeAlert();

   // Previous slide
   $("#carousel").carousel('prev');
   $("#carousel").carousel('pause');

   // Hide back arrow when on first page
   shouldGoBackHide--;
   if (shouldGoBackHide <= 0) {
      $(".carousel-control-prev").css("display", "none");
   }
}

function createNew() {
   $("#startupDiv").fadeOut();

   $("#masterDiv").css("overflow", "auto");
   $("#masterDiv").css("height", "unset");
   recreatePage1();
}

function closeAlert() {
   // Hiding alerts
   $('.alert').alert('close');
}

function checkTextIsCorrect() {
   closeAlert()
   // Creating alert
   var alertBox = document.createElement("div");
   alertBox.className = "alert alert-danger fade show";
   alertBox.id = "page2Error";
   alertBox.setAttribute("role", "alert");
   var alertBoxP = document.createElement("p");
   var alertBoxButtonDiv = document.createElement("div");
   var alertBoxButtonDivButton = document.createElement("button");
   alertBoxButtonDivButton.className = "close";
   alertBoxButtonDivButton.setAttribute("type", "button");
   alertBoxButtonDivButton.setAttribute("data-dismiss", "alert");
   alertBoxButtonDivButton.setAttribute("aria-label", "Close");
   var alertBoxButtonDivButtonSpan = document.createElement("span");
   alertBoxButtonDivButton.setAttribute("aria-hidden", "true");
   alertBoxButtonDivButton.innerHTML = "&times;";
   // Appending alert
   alertBoxButtonDivButton.appendChild(alertBoxButtonDivButtonSpan);
   alertBoxButtonDiv.appendChild(alertBoxButtonDivButton);
   alertBox.appendChild(alertBoxP);
   alertBox.appendChild(alertBoxButtonDiv);

   // Checking if textarea is empty
   var textareaValue = $("#importTextarea").val().trim();
   if (textareaValue) {
      // Checking if text include #lessonPlanTemplate
      var tempDiv = $(document.createElement("div"));
      tempDiv.html(textareaValue);
      var checkText = tempDiv.find("#lessonPlanTemplate").html();
      if (checkText) {
         checkText = checkText.trim();
         if (checkText.length > 0) {
            // Creating #lessonPlanTemplate
            var lessonPlanTemplateDiv = document.createElement("div");
            lessonPlanTemplateDiv.id = "lessonPlanTemplate";
            $(lessonPlanTemplateDiv).html(checkText);

            // Go to page3
            goPage3(lessonPlanTemplateDiv);
         } else {
            alertBoxP.appendChild(document.createTextNode("'id=#lessonPlanTemplate' div is empty. Make sure you entered/uploaded correctly"));
            $("#startupDivPage2 > div").prepend(alertBox);

            $("#page2Error").slideDown(function() {
               alertBox.style.display = "flex";
            });
         }
      } else {
         alertBoxP.appendChild(document.createTextNode("'id=#lessonPlanTemplate' div missing. Make sure you entered/uploaded correctly"));
         $("#startupDivPage2 > div").prepend(alertBox);

         $("#page2Error").slideDown(function() {
            alertBox.style.display = "flex";
         });
      }
   } else {
      alertBoxP.appendChild(document.createTextNode("Make sure you entered/uploaded something"));
      $("#startupDivPage2 > div").prepend(alertBox);

      $("#page2Error").slideDown(function() {
         alertBox.style.display = "flex";
      });
   }
}

// Basically checkTextIsCorrect() without appending to preview
function fileMatchesLayout(readerResult) {
   closeAlert()
   // Creating alert
   var alertBox = document.createElement("div");
   alertBox.className = "alert alert-danger fade show";
   alertBox.id = "page2Error";
   alertBox.setAttribute("role", "alert");
   var alertBoxP = document.createElement("p");
   var alertBoxButtonDiv = document.createElement("div");
   var alertBoxButtonDivButton = document.createElement("button");
   alertBoxButtonDivButton.className = "close";
   alertBoxButtonDivButton.setAttribute("type", "button");
   alertBoxButtonDivButton.setAttribute("data-dismiss", "alert");
   alertBoxButtonDivButton.setAttribute("aria-label", "Close");
   var alertBoxButtonDivButtonSpan = document.createElement("span");
   alertBoxButtonDivButton.setAttribute("aria-hidden", "true");
   alertBoxButtonDivButton.innerHTML = "&times;";
   // Appending alert
   alertBoxButtonDivButton.appendChild(alertBoxButtonDivButtonSpan);
   alertBoxButtonDiv.appendChild(alertBoxButtonDivButton);
   alertBox.appendChild(alertBoxP);
   alertBox.appendChild(alertBoxButtonDiv);

   // Checking if file is empty
   var textareaValue = readerResult.trim();
   if (textareaValue) {
      // Checking if text include #lessonPlanTemplate
      var tempDiv = $(document.createElement("div"));
      tempDiv.html(textareaValue);
      var checkText = tempDiv.find("#lessonPlanTemplate").html();
      if (checkText) {
         checkText = checkText.trim();
         if (checkText.length > 0) {
            return true;
         } else {
            alertBoxP.appendChild(document.createTextNode("'id=#lessonPlanTemplate' div is empty. Make sure you entered/uploaded correctly"));
            $("#startupDivPage2 > div").prepend(alertBox);

            $("#page2Error").slideDown(function() {
               alertBox.style.display = "flex";
            });
         }
      } else {
         alertBoxP.appendChild(document.createTextNode("'id=#lessonPlanTemplate' div missing. Make sure you entered/uploaded correctly"));
         $("#startupDivPage2 > div").prepend(alertBox);

         $("#page2Error").slideDown(function() {
            alertBox.style.display = "flex";
         });
      }
   } else {
      alertBoxP.appendChild(document.createTextNode("Make sure you entered/uploaded something"));
      $("#startupDivPage2 > div").prepend(alertBox);

      $("#page2Error").slideDown(function() {
         alertBox.style.display = "flex";
      });
   }
   return false;
}

function hideStartupDiv() {
   // Appending Preview to Page2
   $("#page2").empty();
   $("#page2").html($("#importPage3Preview").html());

   // Remove preview to prevent conflict
   $("#importPage3Preview").empty();

   // Close the startup div
   createNew();
}

function allowDrop(ev) {
   if (window.File && window.FileReader && window.FileList && window.Blob) {
      $("#importTextarea").css("border", "5px dashed grey");
      $("#importTextarea").css("border-radius", "20px");
      ev.preventDefault();
   } else {
      // Sorry not supported
      alert("Browser doesn't support drag and drop");
   }
}

// Remove the border on mouse exit
function removeDragCSS() {
   $("#importTextarea").css("border", "");
   $("#importTextarea").css("border-radius", "");
}

function drop(ev) {
   ev.preventDefault();
   // Remove drag css border
   removeDragCSS();
   $(".progress-bar").css("width", "0%");
   $(".progress-bar")[0].classList.add("progress-bar-animated");
   // Get the files
   var draggedFiles = ev.dataTransfer.files;
   // Get the first file
   var file = ev.dataTransfer.files[0];
   var fileReader = new FileReader();
   // Make sure only .html and .txt is accepted
   if (file.type.match('text/plain') || file.type.match('text/html')) {
      fileReader.onload = function() {
         var readerResult = fileReader.result;
         if (fileMatchesLayout(readerResult)) {
            $("#importTextarea").val(readerResult);
         }
      };
      fileReader.onprogress = function(data) {
         if (data.lengthComputable) {
            var progress = parseInt(((data.loaded / data.total) * 100), 10);
            $(".progress-bar").css("width", progress + "%");
            console.log(progress);
         }
      }
      fileReader.onloadend = function() {
         $(".progress-bar")[0].classList.remove("progress-bar-animated");
      }
   } else {
      alert("Only .html & .txt accepted format");
   }

   fileReader.readAsText(file);
}

function clearImportTextarea() {
   $("#importTextarea").val("");
   $(".progress-bar").css("width", "0%");
}

function makeSortable() {
   // Making contentDivDiv sortable
   $(".mainSection").sortable({
      connectWith: ".mainSection",
      items: ".contentDivDiv",
      handle: ".contentDivDivDraggableDiv",
      cancel: ".inputDiv, textarea, input, button",
      update: function() {
         setActualValue()
      },
      cursor: "move",
      opacity: 0.5
   });

   // Making mainSection sortable
   $("#page1").sortable({
      items: ".mainSection",
      cancel: ":not('.draggableDiv')"
   });
}

function removeLessonContent(closeImg) {
   $(closeImg).parent().remove();

   // Rebuilt Page2
   recreatePage2();
}

function addLessonContent(addLessonDiv) {
   var contentDivDiv = document.createElement("div");

   // Creating contentDivDivDraggableDiv
   var contentDivDivDraggableDiv = document.createElement("div");
   contentDivDivDraggableDiv.className = "contentDivDivDraggableDiv progress-bar-striped bg-success";
   contentDivDivDraggableDiv.style.opacity = "0";

   // Creating contentDivDivRight
   var contentDivDivRight = document.createElement("div");
   contentDivDivRight.className = "contentDivDivRight";

   var leftDiv = document.createElement("div");
   var leftDivP = document.createElement("p");
   var leftDivTextInput = document.createElement("select");
   var leftDivColorInput = document.createElement("input");

   var rightDiv = document.createElement("div");
   var page1Content = document.createElement("div");
   var page1ContentTitle = document.createElement("p");
   var page1ContentTitleTextInputDiv = document.createElement("div");
   var page1ContentTitleTextInput = document.createElement("input");
   var page1ContentList = document.createElement("p");
   var page1ContentListTextareaDiv = document.createElement("div");
   var page1ContentListTextarea = document.createElement("textarea");

   var closeImg = document.createElement("button");
   var closeImgImage = document.createElement("span");

   contentDivDiv.className = "section contentDivDiv";
   leftDiv.className = "leftDiv";
   leftDivTextInput.className = "form-control";
   leftDivColorInput.className = "form-control";
   rightDiv.className = "flex rightDiv";
   page1Content.className = "page1Content";

   closeImg.className = "closeImg close";
   closeImg.setAttribute("onclick", "removeLessonContent(this)");
   closeImg.setAttribute("type", "button");
   closeImg.setAttribute("aria-label", "Close");
   closeImgImage.setAttribute("aria-hidden", "true");
   closeImgImage.innerHTML = "&times;";

   leftDivColorInput.setAttribute("type", "color");
   page1ContentTitleTextInput.setAttribute("type", "text");

   leftDivTextInput.setAttribute("onchange", "setActualValue()");
   leftDivColorInput.setAttribute("onchange", "setActualValue()");
   page1ContentTitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
   page1ContentTitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
   page1ContentListTextarea.setAttribute("onkeyup", "inputToDiv(this)");
   page1ContentListTextarea.setAttribute("onkeydown", "inputToDiv(this)");

   //leftDivTextInputDiv.contentEditable = "true";
   //leftDivTextInputDiv.className = "inputDiv contenteditableBr";
   //leftDivTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
   //leftDivTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
   page1ContentTitleTextInputDiv.contentEditable = "true";
   page1ContentTitleTextInputDiv.className = "inputDiv contenteditableBr form-control";
   page1ContentTitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
   page1ContentTitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
   page1ContentListTextareaDiv.contentEditable = "true";
   page1ContentListTextareaDiv.className = "inputDiv form-control";
   page1ContentListTextareaDiv.setAttribute("onkeyup", "divToInput(this)");
   page1ContentListTextareaDiv.setAttribute("onkeydown", "divToInput(this)");

   $(page1ContentListTextareaDiv).html("<li><br></li>");
   // Prevent backspace
   $(page1ContentListTextareaDiv).keydown(function(e) {
      // trap the return key being pressed
      if (e.keyCode === 8) {
         if ($(this).html() === "<li><br></li>") {
            // prevent the default behaviour of return key pressed
            return false;
         }
      }
   });

   $(page1ContentTitleTextInput).css("display", "none"); // Hiding real input
   $(page1ContentListTextarea).css("display", "none"); // Hiding real input

   $(page1ContentListTextarea).html("<li></li>");
   $(page1ContentListTextarea).text("<li></li>");

   // Creating options for select (Dropdown)
   var lectureL = document.createElement("option");
   lectureL.appendChild(document.createTextNode("Lecture"));
   lectureL.setAttribute("value", "L");
   var practicalP = document.createElement("option");
   practicalP.appendChild(document.createTextNode("Practical"));
   practicalP.setAttribute("value", "P");
   var tutorialT = document.createElement("option");
   tutorialT.appendChild(document.createTextNode("Tutorial"));
   tutorialT.setAttribute("value", "T");
   var inCourseAssICA = document.createElement("option");
   inCourseAssICA.appendChild(document.createTextNode("In Course Assessment"));
   inCourseAssICA.setAttribute("value", "ICA");
   leftDivTextInput.appendChild(lectureL);
   leftDivTextInput.appendChild(practicalP);
   leftDivTextInput.appendChild(tutorialT);
   leftDivTextInput.appendChild(inCourseAssICA);

   leftDivP.appendChild(document.createTextNode("Lecture/Practical/something"));
   leftDiv.appendChild(leftDivP);
   //leftDiv.appendChild(leftDivTextInputDiv);
   leftDiv.appendChild(leftDivTextInput);
   leftDiv.appendChild(leftDivColorInput);

   page1ContentTitle.appendChild(document.createTextNode("Content Title"));
   page1ContentList.appendChild(document.createTextNode("Content List"));
   page1Content.appendChild(page1ContentTitle);
   page1Content.appendChild(page1ContentTitleTextInputDiv);
   page1Content.appendChild(page1ContentTitleTextInput);
   page1Content.appendChild(page1ContentList);
   page1Content.appendChild(page1ContentListTextareaDiv);
   page1Content.appendChild(page1ContentListTextarea);
   rightDiv.appendChild(page1Content);

   closeImg.appendChild(closeImgImage);

   contentDivDivRight.appendChild(leftDiv);
   contentDivDivRight.appendChild(rightDiv);
   contentDivDiv.appendChild(contentDivDivDraggableDiv);
   contentDivDiv.appendChild(contentDivDivRight);
   contentDivDiv.appendChild(closeImg);

   $(addLessonDiv).before(contentDivDiv);

   // Showing all input and Textarea if notClicked
   if (!notClicked) {
      $(".inputDiv").next().css("display", "block");
      $("textarea").css("display", "block");
   }

   // Prevent creating div on enter
   contentEditableBr();

   // Rebuilt Page2
   recreatePage2();

   // Making items sortable
   makeSortable();
}

function addLessonSection(addSectionDiv) {
   var mainSection = document.createElement("div");
   var lessonSection = document.createElement("div");
   var lessonTitleP = document.createElement("p");
   var lessonTitleTextInputDiv = document.createElement("div");
   var lessonTitleTextInput = document.createElement("input");
   var lessonSubtitleP = document.createElement("p");
   var lessonSubtitleTextInputDiv = document.createElement("div");
   var lessonSubtitleTextInput = document.createElement("input");

   var contentDivDiv = document.createElement("div");

   // Creating contentDivDivDraggableDiv
   var contentDivDivDraggableDiv = document.createElement("div");
   contentDivDivDraggableDiv.className = "contentDivDivDraggableDiv progress-bar-striped bg-success";
   contentDivDivDraggableDiv.style.opacity = "0";

   // Creating contentDivDivRight
   var contentDivDivRight = document.createElement("div");
   contentDivDivRight.className = "contentDivDivRight";

   var leftDiv = document.createElement("div");
   var leftDivP = document.createElement("p");
   var leftDivTextInput = document.createElement("select");
   var leftDivColorInput = document.createElement("input");

   var rightDiv = document.createElement("div");
   var page1Content = document.createElement("div");
   var page1ContentTitle = document.createElement("p");
   var page1ContentTitleTextInputDiv = document.createElement("div");
   var page1ContentTitleTextInput = document.createElement("input");
   var page1ContentList = document.createElement("p");
   var page1ContentListTextareaDiv = document.createElement("div");
   var page1ContentListTextarea = document.createElement("textarea");

   var closeImg = document.createElement("button");
   var closeImgImage = document.createElement("span");

   var addLessonContent = document.createElement("div");
   var addLessonContentP = document.createElement("p");

   var closeImg2 = document.createElement("button");
   var closeImgImage2 = document.createElement("span");

   mainSection.className = "mainSection section";
   lessonSection.className = "lessonTitle";

   contentDivDiv.className = "section contentDivDiv";
   leftDiv.className = "leftDiv";
   leftDivTextInput.className = "form-control";
   leftDivColorInput.className = "form-control";
   rightDiv.className = "flex rightDiv";
   page1Content.className = "page1Content";
   page1ContentTitleTextInputDiv.className = "contenteditableBr form-control";
   closeImg.className = "closeImg close";
   closeImg.setAttribute("onclick", "removeLessonContent(this)");
   closeImg.setAttribute("type", "button");
   closeImg.setAttribute("aria-label", "Close");
   closeImgImage.setAttribute("aria-hidden", "true");
   closeImgImage.innerHTML = "&times;";

   addLessonContent.className = "addLessonContent";
   addLessonContent.setAttribute("onclick", "addLessonContent(this)");

   closeImg2.className = "closeImg close";
   closeImg2.setAttribute("onclick", "removeLessonContent(this)");
   closeImg2.setAttribute("type", "button");
   closeImg2.setAttribute("aria-label", "Close");
   closeImgImage2.setAttribute("aria-hidden", "true");
   closeImgImage2.innerHTML = "&times;";

   lessonTitleTextInput.setAttribute("type", "text");
   lessonTitleTextInput.className = "lessonTitleInput form-control";
   lessonSubtitleTextInput.setAttribute("type", "text");
   lessonSubtitleTextInput.className = "lessonSubtitleInput form-control";
   leftDivColorInput.setAttribute("type", "color");
   page1ContentTitleTextInput.setAttribute("type", "text");

   lessonTitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
   lessonTitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
   lessonSubtitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
   lessonSubtitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
   leftDivTextInput.setAttribute("onchange", "setActualValue()");
   leftDivColorInput.setAttribute("onchange", "setActualValue()");
   page1ContentTitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
   page1ContentTitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
   page1ContentListTextarea.setAttribute("onkeyup", "inputToDiv(this)");
   page1ContentListTextarea.setAttribute("onkeydown", "inputToDiv(this)");

   lessonTitleTextInputDiv.contentEditable = "true";
   lessonTitleTextInputDiv.className = "inputDiv contenteditableBr form-control";
   lessonTitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
   lessonTitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
   lessonSubtitleTextInputDiv.contentEditable = "true";
   lessonSubtitleTextInputDiv.className = "inputDiv contenteditableBr form-control";
   lessonSubtitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
   lessonSubtitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
   page1ContentTitleTextInputDiv.contentEditable = "true";
   page1ContentTitleTextInputDiv.className = "inputDiv contenteditableBr form-control";
   page1ContentTitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
   page1ContentTitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
   page1ContentListTextareaDiv.contentEditable = "true";
   page1ContentListTextareaDiv.className = "inputDiv form-control";
   page1ContentListTextareaDiv.setAttribute("onkeyup", "divToInput(this)");
   page1ContentListTextareaDiv.setAttribute("onkeydown", "divToInput(this)");

   $(page1ContentListTextareaDiv).html("<li><br></li>");
   // Prevent backspace
   $(page1ContentListTextareaDiv).keydown(function(e) {
      // trap the return key being pressed
      if (e.keyCode === 8) {
         if ($(this).html() === "<li><br></li>") {
            // prevent the default behaviour of return key pressed
            return false;
         }
      }
   });

   $(lessonTitleTextInput).css("display", "none"); // Hiding real input
   $(lessonSubtitleTextInput).css("display", "none"); // Hiding real input
   $(page1ContentTitleTextInput).css("display", "none"); // Hiding real input
   $(page1ContentListTextarea).css("display", "none"); // Hiding real input

   lessonTitleP.appendChild(document.createTextNode("Lesson Title"));
   lessonSubtitleP.appendChild(document.createTextNode("Subtitle Title"));
   lessonSection.appendChild(lessonTitleP);
   lessonSection.appendChild(lessonTitleTextInputDiv);
   lessonSection.appendChild(lessonTitleTextInput);
   lessonSection.appendChild(lessonSubtitleP);
   lessonSection.appendChild(lessonSubtitleTextInputDiv);
   lessonSection.appendChild(lessonSubtitleTextInput);

   // Creating options for select (Dropdown)
   var lectureL = document.createElement("option");
   lectureL.appendChild(document.createTextNode("Lecture"));
   lectureL.setAttribute("value", "L");
   var practicalP = document.createElement("option");
   practicalP.appendChild(document.createTextNode("Practical"));
   practicalP.setAttribute("value", "P");
   var tutorialT = document.createElement("option");
   tutorialT.appendChild(document.createTextNode("Tutorial"));
   tutorialT.setAttribute("value", "T");
   var inCourseAssICA = document.createElement("option");
   inCourseAssICA.appendChild(document.createTextNode("In Course Assessment"));
   inCourseAssICA.setAttribute("value", "ICA");
   leftDivTextInput.appendChild(lectureL);
   leftDivTextInput.appendChild(practicalP);
   leftDivTextInput.appendChild(tutorialT);
   leftDivTextInput.appendChild(inCourseAssICA);

   leftDivP.appendChild(document.createTextNode("Lecture/Practical/something"));
   leftDiv.appendChild(leftDivP);
   leftDiv.appendChild(leftDivTextInput);
   leftDiv.appendChild(leftDivColorInput);

   page1ContentTitle.appendChild(document.createTextNode("Content Title"));
   page1ContentList.appendChild(document.createTextNode("Content List"));
   page1Content.appendChild(page1ContentTitle);
   page1Content.appendChild(page1ContentTitleTextInputDiv);
   page1Content.appendChild(page1ContentTitleTextInput);
   page1Content.appendChild(page1ContentList);
   page1Content.appendChild(page1ContentListTextareaDiv);
   page1Content.appendChild(page1ContentListTextarea);
   rightDiv.appendChild(page1Content);

   closeImg.appendChild(closeImgImage);

   contentDivDivRight.appendChild(leftDiv);
   contentDivDivRight.appendChild(rightDiv);
   contentDivDiv.appendChild(contentDivDivDraggableDiv);
   contentDivDiv.appendChild(contentDivDivRight);
   contentDivDiv.appendChild(closeImg);

   addLessonContentP.appendChild(document.createTextNode("Add new lesson content"));
   addLessonContent.appendChild(addLessonContentP);
   closeImg2.appendChild(closeImgImage2);

   mainSection.appendChild(lessonSection);
   mainSection.appendChild(contentDivDiv);
   mainSection.appendChild(addLessonContent);
   mainSection.appendChild(closeImg2);

   $(addSectionDiv).before(mainSection);

   // Showing all input and Textarea if notClicked
   if (!notClicked) {
      $(".inputDiv").next().css("display", "block");
      $("textarea").css("display", "block");
   }

   // Prevent creating div on enter
   contentEditableBr();

   // Rebuilt Page2
   recreatePage2();

   // Making items sortable
   makeSortable();
}

function recreatePage1() {
   // Clear page 1
   $("#page1").empty();

   // Page 1 Section
   var page1Section = document.createElement("div");
   // Title
   var page1TitleP = document.createElement("p");
   page1TitleP.appendChild(document.createTextNode("Instructors Details"));
   page1TitleP.className = "bold underline";

   // Paragraph
   //var page1ParagraphP = document.createElement("p");
   //page1ParagraphP.appendChild(document.createTextNode("Paragraph"));

   var page1ParagraphTextareaDiv = document.createElement("div");
   page1ParagraphTextareaDiv.contentEditable = "true";
   page1ParagraphTextareaDiv.className = "inputDiv form-control";
   page1ParagraphTextareaDiv.setAttribute("onkeyup", "divToInput(this)");
   page1ParagraphTextareaDiv.setAttribute("onkeydown", "divToInput(this)");
   var page1ParagraphTextarea = document.createElement("textarea");
   page1ParagraphTextarea.id = "paragraphTextarea";
   page1ParagraphTextarea.setAttribute("onkeyup", "inputToDiv(this)");
   page1ParagraphTextarea.setAttribute("onkeydown", "inputToDiv(this)");
   $(page1ParagraphTextarea).css("display", "none"); // Hiding real input

   // -- Paragraph --
   // Div
   var paragraphInput = $("#page2 > #lessonPlanTemplate > #instructorsDetails").html().trim().replace(/\t/g, '');
   $(page1ParagraphTextareaDiv).html(paragraphInput);

   // Prevent backspace
   $(page1ParagraphTextareaDiv).keydown(function(e) {
      // trap the return key being pressed
      if (e.keyCode === 8) {
         if ($(this).html() === "<p><br></p>") {
            // prevent the default behaviour of return key pressed
            return false;
         }
      }
   });

   $(page1ParagraphTextarea).val(paragraphInput);

   // Appending Title and paragraph
   page1Section.appendChild(page1TitleP);
   //page1Section.appendChild(page1ParagraphP);
   page1Section.appendChild(page1ParagraphTextareaDiv);
   page1Section.appendChild(page1ParagraphTextarea);

   // Page1 append section
   $("#page1").append(page1Section);

   // Main Section
   $(".lesson").each(function() {
      // Creating mainSection
      var mainSection = document.createElement("div");
      mainSection.className = "mainSection section";

      // Creating lessonTitle section
      var lessonSection = document.createElement("div");
      lessonSection.className = "lessonTitle";

      // Creating Lesson Title
      var lessonTitleP = document.createElement("p");
      lessonTitleP.appendChild(document.createTextNode("Lesson Title"));
      var lessonTitleTextInputDiv = document.createElement("div");
      lessonTitleTextInputDiv.contentEditable = "true";
      lessonTitleTextInputDiv.className = "inputDiv contenteditableBr form-control";
      lessonTitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
      lessonTitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
      var lessonTitleTextInput = document.createElement("input");
      lessonTitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
      lessonTitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
      lessonTitleTextInput.className = "lessonTitleInput form-control";
      $(lessonTitleTextInputDiv).html($(this).find(".lessonHeader").children().eq(0).html());
      $(lessonTitleTextInput).val($(this).find(".lessonHeader").children().eq(0).html());
      $(lessonTitleTextInput).css("display", "none"); // Hiding real input

      // Creating Lesson Subtitle
      var lessonSubtitleP = document.createElement("p");
      lessonSubtitleP.appendChild(document.createTextNode("Lesson Subtitle"));
      var lessonSubtitleTextInputDiv = document.createElement("div");
      lessonSubtitleTextInputDiv.contentEditable = "true";
      lessonSubtitleTextInputDiv.className = "inputDiv contenteditableBr form-control";
      lessonSubtitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
      lessonSubtitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
      var lessonSubtitleTextInput = document.createElement("input");
      lessonSubtitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
      lessonSubtitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
      lessonSubtitleTextInput.className = "lessonSubtitleInput form-control";
      $(lessonSubtitleTextInputDiv).html($(this).find(".lessonHeader").children().eq(1).html());
      $(lessonSubtitleTextInput).val($(this).find(".lessonHeader").children().eq(1).text());
      $(lessonSubtitleTextInput).css("display", "none"); // Hiding real input

      // Appending lessonTitle
      lessonSection.appendChild(lessonTitleP);
      lessonSection.appendChild(lessonTitleTextInputDiv);
      lessonSection.appendChild(lessonTitleTextInput);
      lessonSection.appendChild(lessonSubtitleP);
      lessonSection.appendChild(lessonSubtitleTextInputDiv);
      lessonSection.appendChild(lessonSubtitleTextInput);

      mainSection.appendChild(lessonSection);

      // ContentDivDiv
      $(this).find(".lecPracHeader").each(function() {
         // Creating contentDivDiv
         var contentDivDiv = document.createElement("div");
         contentDivDiv.className = "section contentDivDiv";

         // Creating contentDivDivDraggableDiv
         var contentDivDivDraggableDiv = document.createElement("div");
         contentDivDivDraggableDiv.className = "contentDivDivDraggableDiv progress-bar-striped bg-success";
         contentDivDivDraggableDiv.style.opacity = "0";

         // Creating contentDivDivRight
         var contentDivDivRight = document.createElement("div");
         contentDivDivRight.className = "contentDivDivRight";

         // Creating leftDiv
         var leftDiv = document.createElement("div");
         leftDiv.className = "leftDiv";

         // Creating Lecture/Practical/something
         var leftDivP = document.createElement("p");
         leftDivP.appendChild(document.createTextNode("Lecture/Practical/something"));
         // Lecture/Practical/something
         var leftDivTextInput = document.createElement("select");
         leftDivTextInput.setAttribute("onchange", "setActualValue()");
         leftDivTextInput.className = "form-control";
         // Lecture select options
         var lectureL = document.createElement("option");
         lectureL.appendChild(document.createTextNode("Lecture"));
         lectureL.setAttribute("value", "L");
         var practicalP = document.createElement("option");
         practicalP.appendChild(document.createTextNode("Practical"));
         practicalP.setAttribute("value", "P");
         var tutorialT = document.createElement("option");
         tutorialT.appendChild(document.createTextNode("Tutorial"));
         tutorialT.setAttribute("value", "T");
         var inCourseAssICA = document.createElement("option");
         inCourseAssICA.appendChild(document.createTextNode("In Course Assessment"));
         inCourseAssICA.setAttribute("value", "ICA");
         leftDivTextInput.appendChild(lectureL);
         leftDivTextInput.appendChild(practicalP);
         leftDivTextInput.appendChild(tutorialT);
         leftDivTextInput.appendChild(inCourseAssICA);
         $(leftDivTextInput).val($(this).find(".lecPracDiv :first-child").text());
         // Lecture Color
         var leftDivColorInput = document.createElement("input");
         leftDivColorInput.setAttribute("onchange", "setActualValue()");
         leftDivColorInput.setAttribute("type", "color");
         leftDivColorInput.className = "form-control";
         var lecPracDivColor = $(this).find(".lecPracDiv").css("background-color");
         $(leftDivColorInput).val(rgb2hex(lecPracDivColor));

         // Appending leftDiv
         leftDiv.appendChild(leftDivP);
         leftDiv.appendChild(leftDivTextInput);
         leftDiv.appendChild(leftDivColorInput);

         // Creating rightDiv
         var rightDiv = document.createElement("div");
         rightDiv.className = "flex rightDiv";

         // Creating page1Content
         var page1Content = document.createElement("div");
         page1Content.className = "page1Content";

         // page1Content Content Title
         var page1ContentTitle = document.createElement("p");
         page1ContentTitle.appendChild(document.createTextNode("Content Title"));
         // page1Input
         var page1ContentTitleTextInputDiv = document.createElement("div");
         page1ContentTitleTextInputDiv.contentEditable = "true";
         page1ContentTitleTextInputDiv.className = "inputDiv contenteditableBr form-control";
         page1ContentTitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
         page1ContentTitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
         var page1ContentTitleTextInput = document.createElement("input");
         page1ContentTitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
         page1ContentTitleTextInput.setAttribute("onkeydown", "inputToDiv(this))");
         page1ContentTitleTextInput.setAttribute("type", "text");
         $(page1ContentTitleTextInputDiv).html($(this).find(".lessonPlanContent .lessonPlanContentP").html());
         $(page1ContentTitleTextInput).val($(this).find(".lessonPlanContent .lessonPlanContentP").html());
         $(page1ContentTitleTextInput).css("display", "none"); // Hiding real input

         // page1Content Content List
         var page1ContentList = document.createElement("p");
         page1ContentList.appendChild(document.createTextNode("Content List"));
         // page1Content Textarea
         var page1ContentListTextareaDiv = document.createElement("div");
         page1ContentListTextareaDiv.contentEditable = "true";
         page1ContentListTextareaDiv.className = "inputDiv form-control";
         page1ContentListTextareaDiv.setAttribute("onkeyup", "divToInput(this)");
         page1ContentListTextareaDiv.setAttribute("onkeydown", "divToInput(this)");
         var page1ContentListTextarea = document.createElement("textarea");
         page1ContentListTextarea.setAttribute("onkeyup", "inputToDiv(this)");
         page1ContentListTextarea.setAttribute("onkeydown", "inputToDiv(this)");
         $(page1ContentListTextarea).css("display", "none"); // Hiding real input
         // Content List
         var lessonContentText = $(this).find(".lessonPlanContent ul").html().trim().replace(/\t/g, '');
         $(page1ContentListTextareaDiv).html(lessonContentText);
         $(page1ContentListTextarea).val(lessonContentText);

         // Prevent backspace
         $(page1ContentListTextareaDiv).keydown(function(e) {
            // trap the return key being pressed
            if (e.keyCode === 8) {
               if ($(this).html() === "<li><br></li>") {
                  // prevent the default behaviour of return key pressed
                  return false;
               }
            }
         });

         // Appending rightDiv
         page1Content.appendChild(page1ContentTitle);
         page1Content.appendChild(page1ContentTitleTextInputDiv);
         page1Content.appendChild(page1ContentTitleTextInput);
         page1Content.appendChild(page1ContentList);
         page1Content.appendChild(page1ContentListTextareaDiv);
         page1Content.appendChild(page1ContentListTextarea);
         rightDiv.appendChild(page1Content);

         // Creating closeImg
         var closeImg = document.createElement("button");
         closeImg.className = "closeImg close";
         closeImg.setAttribute("onclick", "removeLessonContent(this)");
         closeImg.setAttribute("type", "button");
         closeImg.setAttribute("aria-label", "Close");
         var closeImgImage = document.createElement("span");
         closeImgImage.setAttribute("aria-hidden", "true");
         closeImgImage.innerHTML = "&times;";

         // Appending closeImg
         closeImg.appendChild(closeImgImage);

         // Appending everything
         contentDivDivRight.appendChild(leftDiv);
         contentDivDivRight.appendChild(rightDiv);
         contentDivDiv.appendChild(contentDivDivDraggableDiv);
         contentDivDiv.appendChild(contentDivDivRight);
         contentDivDiv.appendChild(closeImg);

         // Appending contentDivDiv
         mainSection.appendChild(contentDivDiv);
      });

      // Creating closeImg for entire section / "lesson"
      var addLessonContent = document.createElement("div");
      addLessonContent.className = "addLessonContent";
      var addLessonContentCloseImgImage = document.createElement("img");

      var closeImg2 = document.createElement("button");
      closeImg2.className = "closeImg close";
      var closeImgImage2 = document.createElement("span");

      // Setting attributes
      addLessonContent.setAttribute("onclick", "addLessonContent(this)");
      addLessonContentCloseImgImage.setAttribute("src", "grass 2.jpg");
      addLessonContentCloseImgImage.setAttribute("width", "30");
      addLessonContentCloseImgImage.setAttribute("height", "30");

      closeImg2.setAttribute("onclick", "removeLessonContent(this)");
      closeImg2.setAttribute("type", "button");
      closeImg2.setAttribute("aria-label", "Close");
      closeImgImage2.setAttribute("aria-hidden", "true");
      closeImgImage2.innerHTML = "&times;";

      closeImg2.appendChild(closeImgImage2);
      addLessonContent.appendChild(addLessonContentCloseImgImage);

      // Appending Section close and add
      mainSection.appendChild(addLessonContent);
      mainSection.appendChild(closeImg2);

      // Page1 append mainSection
      $("#page1").append(mainSection);
   });

   // Add lesson Section
   var addLessonSection = document.createElement("div");
   var addLessonSectionImg = document.createElement("img");
   addLessonSection.id = "addLessonSection";
   addLessonSection.className = "addLessonContent";
   addLessonSection.setAttribute("onclick", "addLessonSection(this)");
   addLessonSectionImg.setAttribute("src", "grass 2.jpg");
   addLessonSectionImg.setAttribute("width", "30");
   addLessonSectionImg.setAttribute("height", "30");

   // Appending Add Lesson
   addLessonSection.appendChild(addLessonSectionImg);

   // Footer Section
   var footerSection = document.createElement("div");
   var footerP = document.createElement("p");
   footerP.appendChild(document.createTextNode("Footer"));
   var footerTextInputDiv = document.createElement("div");
   footerTextInputDiv.contentEditable = "true";
   footerTextInputDiv.className = "inputDiv contenteditableBr form-control";
   footerTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
   footerTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
   var footerTextInput = document.createElement("input");
   footerTextInput.setAttribute("type", "text");
   footerTextInput.setAttribute("onkeyup", "inputToDiv(this)");
   footerTextInput.setAttribute("onkeydown", "inputToDiv(this)");
   footerTextInput.id = "lessonPlanFooter";
   $(footerTextInputDiv).html($("#lessonPlanTemplate .sub").html());
   $(footerTextInput).val($("#lessonPlanTemplate .sub").html());
   $(footerTextInput).css("display", "none"); // Hiding real input

   // Appending Footer
   footerSection.appendChild(footerP);
   footerSection.appendChild(footerTextInputDiv);
   footerSection.appendChild(footerTextInput);

   // Adding br
   var buttonBr = document.createElement("br");

   // Generate Button
   var generateHTMLButton = document.createElement("button");
   generateHTMLButton.appendChild(document.createTextNode("Generate HTML"));
   generateHTMLButton.setAttribute("onclick", "generateHTML()");
   generateHTMLButton.className = "btn btn-primary";

   // Show all input
   var showAllButton = document.createElement("button");
   showAllButton.appendChild(document.createTextNode("Show All"));
   showAllButton.setAttribute("onclick", "showAllInput(this)");
   showAllButton.className = "btn";

   // Appending Everything
   $("#page1").append(addLessonSection);
   $("#page1").append(footerSection);
   $("#page1").append(buttonBr);
   $("#page1").append(generateHTMLButton);
   $("#page1").append(showAllButton);

   // Prevent creating div on enter
   contentEditableBr();

   // Making items sortable
   makeSortable();
}

function recreatePage2() {
   // Clear #Page2
   $("#page2").empty();

   // LessonPlanTemplate
   var lessonPlanTemplate = document.createElement("div");
   lessonPlanTemplate.id = "lessonPlanTemplate";

   // Instructors
   var instructors = document.createElement("p");
   instructors.appendChild(document.createTextNode("Instructors Details"));
   // Instructors Details
   var instructorsDetails = document.createElement("div");
   // Loop details to add
   var instructorDetailsValue = $("#paragraphTextarea").val();
   $(instructorsDetails).html(instructorDetailsValue);

   // Adding all classes
   instructors.className = "bold underline";
   instructorsDetails.id = "instructorsDetails";

   // Appending Everything
   lessonPlanTemplate.append(instructors);
   lessonPlanTemplate.append(instructorsDetails);

   // Loop MainSection
   $(".mainSection").each(function() {
      // Create Lesson
      var lesson = document.createElement("div");
      var lessonHeader = document.createElement("div");
      // Lesson Title
      var lessonTitle = document.createElement("p");
      $(lessonTitle).html($(this).find(".lessonTitleInput").val());
      // Lesson Subtitle
      var lessonSubtitle = document.createElement("p");
      $(lessonSubtitle).html($(this).find(".lessonSubtitleInput").val());

      // Adding all classes
      lesson.className = "lesson";
      lessonHeader.className = "lessonHeader";
      lessonTitle.className = "bold";
      lessonSubtitle.className = "em";

      // Appending Lesson header before loop
      lessonHeader.appendChild(lessonTitle);
      lessonHeader.appendChild(lessonSubtitle);
      lesson.appendChild(lessonHeader);

      // Loop All LecPracheader
      $(this).find(".contentDivDiv").each(function() {
         // lesPracHeader
         var lecPracHeader = document.createElement("div");
         // LecPracDiv
         var lecPracDiv = document.createElement("div");
         var lecPracDivP = document.createElement("p");
         $(lecPracDiv).css("background-color", $(this).find(".leftDiv input:nth-child(3)").val());
         $(lecPracDivP).html($(this).find(".leftDiv :nth-child(2)").val());
         lecPracDiv.appendChild(lecPracDivP);
         // Lesson Plan Content
         var lessonPlanContent = document.createElement("div");
         // Lesson Plan Content Title
         var lessonPlanContentTitleP = document.createElement("p");
         $(lessonPlanContentTitleP).html($(this).find(".rightDiv .page1Content :nth-child(2)").html());
         // Lesson Plan Content List
         var lessonPlanContentListUl = document.createElement("ul");
         var lines = $(this).find(".rightDiv .page1Content :nth-child(5)").html();
         $(lessonPlanContentListUl).html(lines);

         // Adding all classes
         lecPracHeader.className = "lecPracHeader";
         lecPracDiv.className = "lecPracDiv";
         lecPracDivP.className = "bold";
         lessonPlanContent.className = "lessonPlanContent";
         lessonPlanContentTitleP.className = "lessonPlanContentP";

         // Appending Everything
         lessonPlanContent.appendChild(lessonPlanContentTitleP);
         lessonPlanContent.appendChild(lessonPlanContentListUl);
         lecPracHeader.appendChild(lecPracDiv);
         lecPracHeader.appendChild(lessonPlanContent);

         // Appending to lesson
         lesson.appendChild(lecPracHeader);
      });

      // Appending lesson to Page2
      lessonPlanTemplate.append(lesson);
   });

   // Footer
   var lessonPlanFooter = document.createElement("p");
   $(lessonPlanFooter).html($("#lessonPlanFooter").val());

   // Adding all classes
   lessonPlanFooter.className = "sub";

   // Appending Footer
   lessonPlanTemplate.append(lessonPlanFooter);

   // Appending lessonPlanTemplate to Page2
   $("#page2").append(lessonPlanTemplate);
}

function setInputValue() {
   recreatePage1();
}

function setActualValue() {
   recreatePage2();
}

function generateHTML() {
   $("#popupDiv").modal("show");
   $("#popup .modal-body textarea").val($("#page2").html());
}

function closePopup() {
   $("#popupDiv").modal("hide");
   $("#popup .generateHTMLRedText").css("display", "none"); // Hide after showing
}

function copyToClipboard() {
   $("#popup .modal-body textarea")[0].select();
   document.execCommand("copy");
   $("#popup .generateHTMLRedText").css("display", "block"); // Show after clicked
}

function copyCommand() {
   var tempText = document.createElement("textarea");
   $(tempText).text(selectedText);
   $("#masterDiv").append(tempText);
   $(tempText)[0].select();
   document.execCommand("copy");
   $(tempText).remove();
}

function promptLink() {
   if (selectedText.length > 0) {
      $("#linkInput").val("");
      $("#linkBoxDiv").modal("show");
   }
}

function hideLinkBox() {
   $("#linkBoxDiv").modal("hide");

   // Make sure Webpage is still default
   changeInputBoxSelection(1);
}

function changeInputBoxSelection(number) {
   // Remove active class
   $(".dropdown-menu > .active.dropdown-item")[0].classList.remove("active");

   var dropdownDiv = $("#linkBoxOptions");
   var linkInput = $("#linkInput");
   switch (number) {
      case 1:
         dropdownDiv.text("Webpage");
         linkInput[0].setAttribute("placeholder", "https://");
         linkInput.val("");
         $(".dropdown-menu > a:first-child")[0].classList.add("active");
         break;
      case 2:
         dropdownDiv.text("Email");
         linkInput[0].setAttribute("placeholder", "example@nyp.edu.sg");
         var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         if (emailRegex.test(selectedText)) {
            linkInput.val(htmlEncode(selectedText));
         }
         $(".dropdown-menu > a:nth-child(2)")[0].classList.add("active");
         break;
      case 3:
         dropdownDiv.text("Javascript");
         linkInput[0].setAttribute("placeholder", "alert('Hello')");
         linkInput.val("");
         $(".dropdown-menu > a:nth-child(4)")[0].classList.add("active");
         break;
   }
}

function checkAndDisplayAlert() {
	// Creating alert
   var alertBox = document.createElement("div");
   alertBox.className = "alert alert-warning fade show";
   alertBox.id = "linkBoxAlertError";
   alertBox.setAttribute("role", "alert");
   var alertBoxP = document.createElement("p");
   var alertBoxButtonDiv = document.createElement("div");
   var alertBoxButtonDivButton = document.createElement("button");
   alertBoxButtonDivButton.className = "close";
   alertBoxButtonDivButton.setAttribute("type", "button");
   alertBoxButtonDivButton.setAttribute("data-dismiss", "alert");
   alertBoxButtonDivButton.setAttribute("aria-label", "Close");
   var alertBoxButtonDivButtonSpan = document.createElement("span");
   alertBoxButtonDivButton.setAttribute("aria-hidden", "true");
   alertBoxButtonDivButton.innerHTML = "&times;";
   // Appending alert
   alertBoxButtonDivButton.appendChild(alertBoxButtonDivButtonSpan);
   alertBoxButtonDiv.appendChild(alertBoxButtonDivButton);
   alertBox.appendChild(alertBoxP);
   alertBox.appendChild(alertBoxButtonDiv);

	// Checking value
	var inputValue = $("#linkInput").val();
	var dropdownDivText = $("#linkBoxOptions").text();
   if (dropdownDivText === "Webpage") {
		var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

		// If entered text doesnt match url regex, ask for confirmation
		if (!urlRegex.test(inputValue)) {
			closeAlert();
			alertBoxP.appendChild(document.createTextNode("The URL entered does not match the format."));
			$("#linkBox > .modal-content > .modal-body").prepend(alertBox);
		}else {
			closeAlert();
		}
   } else if (dropdownDivText === "Email") {
		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if (!emailRegex.test(inputValue)) {
			closeAlert();
			alertBoxP.appendChild(document.createTextNode("The email entered does not match the format."));
			$("#linkBox > .modal-content > .modal-body").prepend(alertBox);
		}else {
			closeAlert();
		}
   }

}

function whichLinkSelection() {
   var dropdownDivText = $("#linkBoxOptions").text();
   if (dropdownDivText === "Webpage") {
      return "";
   } else if (dropdownDivText === "Email") {
      return "mailto:";
   } else if (dropdownDivText === "Javascript") {
      return "javascript:";
   } else {
      alert("Unexpected error");
      return null;
   }
}

function convertToLink() {
	closeAlert();
   // Creating alert
   var alertBox = document.createElement("div");
   alertBox.className = "alert alert-danger fade show";
   alertBox.id = "linkBoxAlertError";
   alertBox.setAttribute("role", "alert");
   var alertBoxP = document.createElement("p");
   var alertBoxButtonDiv = document.createElement("div");
   var alertBoxButtonDivButton = document.createElement("button");
   alertBoxButtonDivButton.className = "close";
   alertBoxButtonDivButton.setAttribute("type", "button");
   alertBoxButtonDivButton.setAttribute("data-dismiss", "alert");
   alertBoxButtonDivButton.setAttribute("aria-label", "Close");
   var alertBoxButtonDivButtonSpan = document.createElement("span");
   alertBoxButtonDivButton.setAttribute("aria-hidden", "true");
   alertBoxButtonDivButton.innerHTML = "&times;";
   // Appending alert
   alertBoxButtonDivButton.appendChild(alertBoxButtonDivButtonSpan);
   alertBoxButtonDiv.appendChild(alertBoxButtonDivButton);
   alertBox.appendChild(alertBoxP);
   alertBox.appendChild(alertBoxButtonDiv);

   var linkEntered = $("#linkInput").val();
   // Checking input is not empty
   if (linkEntered) {
      // Checking if text matches url regex
      if (whichLinkSelection() === "") {
         var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

         // If entered text doesnt match url regex, ask for confirmation
         if (!urlRegex.test(linkEntered) && !confirm("The URL entered does not match the format. Do you want to continue?")) {
				alertBoxP.appendChild(document.createTextNode("The URL entered does not match the format."));
				alertBox.className = "alert alert-warning fade show";
				$("#linkBox > .modal-content > .modal-body").prepend(alertBox);
				// Break if "Doesnt Match" and "Cancel"
            return false;
         }
      }else if(whichLinkSelection() === "mailto:") {
			var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

			if (!emailRegex.test(selectedText) && !confirm("The email entered does not match the format. Do you want to continue?")) {
				alertBoxP.appendChild(document.createTextNode("The email entered does not match the format."));
				alertBox.className = "alert alert-warning fade show";
				$("#linkBox > .modal-content > .modal-body").prepend(alertBox);
				// Break if "Doesnt Match" and "Cancel"
            return false;
         }
		}
      var selectedTextBackup = htmlEncode(selectedText);
      var inputElement = focusedInput;
      var inputValue = inputElement.html();
      if (whichLinkSelection()) {
         var linkA = "<a href='" + whichLinkSelection() + $("#linkInput").val() + "' target='_blank'>" + selectedTextBackup + "</a>";
      } else {
         var linkA = "<a href='" + $("#linkInput").val() + "' target='_blank'>" + selectedTextBackup + "</a>";
      }

      // Overriding previous startIndex. It doesnt work with multi-line div
      startIndex = inputElement.next().val().indexOf(selectedTextBackup);

      // Make sure the text is not already a link
      var regexSearch1 = escape('<a href=');
      var regexSearch2 = escape('</a>');
      var regExp = new RegExp('(' + regexSearch1 + ').*(' + escape(selectedTextBackup) + ').*(' + regexSearch2 + ')');
      if (!regExp.test(escape(inputElement.next().val()))) {
         if (startIndex !== -1) {
            // Replacing the html in input
            var beforeLink = inputValue.substring(0, startIndex);
            var afterLink = inputValue.substring(startIndex + selectedTextBackup.length);
            var finalLink = beforeLink + linkA + afterLink;
            focusedInput.next().val(finalLink);

            // Refresh div
            focusedInput.html(focusedInput.next().val());

            setActualValue();
         } else {
				alertBoxP.appendChild(document.createTextNode("Error! Make sure the text selected is not overlapping with another link."));
				$("#linkBox > .modal-content > .modal-body").prepend(alertBox);
			}
      } else {
			alertBoxP.appendChild(document.createTextNode("Error! You already made this a link."));
			$("#linkBox > .modal-content > .modal-body").prepend(alertBox);
      }

      hideLinkBox();
   } else {
		alertBoxP.appendChild(document.createTextNode("Please enter a link."));
		$("#linkBox > .modal-content > .modal-body").prepend(alertBox);
   }
}

function divToInput(div) {
   $(div).next().val(div.innerHTML);
   setActualValue();
}

function inputToDiv(div) {
   $(div).prev().html(div.value);
   setActualValue();
}

var notClicked = true;

function showAllInput(button) {
   if (notClicked) {
      $(".inputDiv").next().css("display", "block");
      $("textarea").css("display", "block");
      button.innerHTML = "Hide All";
      notClicked = false;
   } else {
      $(".inputDiv").next().css("display", "none");
      $("textarea:not(#popup > textarea)").css("display", "none");
      button.innerHTML = "Show All";
      notClicked = true;
   }
}

function checkEnterKey(e) {
   // trap the return key being pressed
   if (e.keyCode === 13) {
      // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
      document.execCommand('insertHTML', false, '<br /><br />');
      // prevent the default behaviour of return key pressed
      return false;
   }
}

function contentEditableBr() {
   // Make sure there is only one event attached
   $(document).off("keydown", ".contenteditableBr", checkEnterKey);

   // Prevent creating div on enter
   $(document).on("keydown", ".contenteditableBr", checkEnterKey);
}

function selectAll(popupTextarea) {
   popupTextarea.setSelectionRange(0, popupTextarea.value.length)
}
$(function() {
   // Hiding back arrow
   $(".carousel-control-prev").css("display", "none");

   // Clear the textarea in importTextarea (For some reason it having spaces onload)
   clearImportTextarea();

   // Overriding right click menu
   if ($(".inputDiv").addEventListener) { // IE >= 9; other browsers
      $(".inputDiv").addEventListener('contextmenu', function(e) {
         // Get focused Input
         focusedInput = $(":focus");

         // Getting selection offset
         if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
               startIndex = sel.focusOffset;
            }
         } else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
               startIndex = sel.focusOffset
            }
         }

         // Get selected text
         if (window.getSelection) {
            selectedText = window.getSelection().toString();
         } else if (document.selection && document.selection.type != "Control") {
            selectedText = document.selection.createRange().text;
         }

         // Show Menu
         $("#rightClickMenu").css("display", "block");
         $("#rightClickMenu").css("top", mouseY(event) + 'px');
         $("#rightClickMenu").css("left", mouseX(event) + 'px');

         e.preventDefault();
      }, false);
   } else { // IE < 9
      $('body').on('contextmenu', '.inputDiv', function(e) {
         // Get focused Input
         focusedInput = $(":focus");

         // Getting selection offset
         if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
               startIndex = sel.focusOffset;
            }
         } else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
               startIndex = sel.focusOffset
            }
         }

         // Get selected text
         if (window.getSelection) {
            selectedText = window.getSelection().toString();
         } else if (document.selection && document.selection.type != "Control") {
            selectedText = document.selection.createRange().text;
         }

         // Show Menu
         $("#rightClickMenu").css("display", "block");
         $("#rightClickMenu").offset({
            left: e.pageX,
            top: e.pageY
         });

         window.event.returnValue = false;
      });
   }

   $(document).bind("click", function(event) {
      $("#rightClickMenu").css("display", "none");
   });

   $(document).on("mouseover", ".contentDivDivDraggableDiv", function() {
      // Force stop
      $(this).stop(true, true);
      $(this).animate({
         opacity: 1,
         queue: false
      }, 300);
   });

   $(document).on("mouseout", ".contentDivDivDraggableDiv", function() {
      $(this).animate({
         opacity: 0
      }, 300);
   });

   // Prevent creating div on enter
   contentEditableBr();
});

// Function to convert rgb to hex so can set type=color
var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

// Function to convert rgb color to hex format
function rgb2hex(rgb) {
   rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
   if (!rgb) {
      return "#000000";
   } else {
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
   }
}

function hex(x) {
   return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

// Encode html
function htmlEncode(value) {
   // Create a in-memory div, set its inner text (which jQuery automatically encodes)
   // Then grab the encoded contents back out. The div never exists on the page.
   return $('<div/>').text(value).html();
}

// Decode html
function htmlDecode(str) {
   return str.replace(/&#(\d+);?/g, function() {
      return String.fromCharCode(arguments[1])
   });
}
