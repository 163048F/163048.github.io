var selectedText = "";
var focusedInput;
var startIndex;
var shouldGoBackHide = 0;

$(".carousel-control-prev").css("display", "none");

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
	$("#carousel").carousel('prev');
	$("#carousel").carousel('pause');
	shouldGoBackHide--;
	if(shouldGoBackHide <= 0){
		$(".carousel-control-prev").css("display", "none");
	}
}

function createNew() {
	$("#startupDiv").css("display", "none");

	$("#masterDiv").css("overflow", "auto");
	$("#masterDiv").css("height", "unset");
	recreatePage1();
}

function checkTextIsCorrect() {
	// Checking if textarea is empty
	var textareaValue = $("#importTextarea").val().trim();
	if(textareaValue) {
		// Checking if text include #lessonPlanTemplate
		var tempDiv = $(document.createElement("div"));
		tempDiv.html(textareaValue);
		var checkText = tempDiv.find("#lessonPlanTemplate").html().trim();
		if(checkText && checkText.length > 0) {
			// Creating #lessonPlanTemplate
			var lessonPlanTemplateDiv = document.createElement("div");
			lessonPlanTemplateDiv.id = "lessonPlanTemplate";
			$(lessonPlanTemplateDiv).html(checkText);

			// Go to page3
			goPage3(lessonPlanTemplateDiv);
		}else {
			alert("'id=#lessonPlanTemplate' div missing. Make sure you entered/uploaded correctly");
		}
	}else {
		alert("Make sure you entered/uploaded something")
	}
}

function hideStartupDiv() {
	// Appending Preview to Page2
	$("#page2").empty();
	$("#page2").html($("#importPage3Preview").html());

	// Close the startup div
	createNew();
}

function allowDrop(ev) {
	if(window.File && window.FileReader && window.FileList && window.Blob) {
		$("#importTextarea").css("border", "5px dashed grey");
		$("#importTextarea").css("border-radius", "20px");
		ev.preventDefault();
	}else {
		// Sorry not supported
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

	// Get the first file
  var file = ev.dataTransfer.files[0];
	var fileReader = new FileReader();

	// Make sure only .html and .txt is accepted
	if(file.type.match('text/plain') || file.type.match('text/html')) {
		fileReader.onload = function() {
			$("#importTextarea").val(fileReader.result);
		};
	}else {
		alert("Only .html & .txt accepted format");
	}

	fileReader.readAsText(file);
}

function clearImportTextarea() {
	$("#importTextarea").val("");
}

function removeLessonContent(closeImg) {
	$(closeImg).parent().remove();

	// Rebuilt Page2
	recreatePage2();
}

function addLessonContent(addLessonDiv) {
	var contentDivDiv = document.createElement("div");

	var leftDiv = document.createElement("div");
	var leftDivP = document.createElement("p");
	var leftDivTextInputDiv = document.createElement("div");
	var leftDivTextInput = document.createElement("input");
	var leftDivColorInput = document.createElement("input");

	var rightDiv = document.createElement("div");
	var page1Content = document.createElement("div");
	var page1ContentTitle = document.createElement("p");
	var page1ContentTitleTextInputDiv = document.createElement("div");
	var page1ContentTitleTextInput = document.createElement("input");
	var page1ContentList = document.createElement("p");
	var page1ContentListTextareaDiv = document.createElement("div");
	var page1ContentListTextarea = document.createElement("textarea");

	var closeImg = document.createElement("div");
	var closeImgImage = document.createElement("img");

	contentDivDiv.className = "section contentDivDiv";
	leftDiv.className = "leftDiv";
	rightDiv.className = "flex rightDiv";
	page1Content.className = "page1Content";
	closeImg.className = "closeImg";
	closeImg.setAttribute("onclick", "removeLessonContent(this)");
	closeImgImage.setAttribute("src", "grass 2.jpg");
	closeImgImage.setAttribute("width", "30");
	closeImgImage.setAttribute("height", "30");

	leftDivTextInput.setAttribute("type", "text");
	leftDivColorInput.setAttribute("type", "color");
	page1ContentTitleTextInput.setAttribute("type", "text");

	leftDivTextInput.setAttribute("onkeyup", "inputToDiv(this)");
	leftDivTextInput.setAttribute("onkeydown", "inputToDiv(this)");
	leftDivColorInput.setAttribute("onchange", "setActualValue()");
	page1ContentTitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
	page1ContentTitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
	page1ContentListTextarea.setAttribute("onkeyup", "inputToDiv(this)");
	page1ContentListTextarea.setAttribute("onkeydown", "inputToDiv(this)");

	leftDivTextInputDiv.contentEditable = "true";
	leftDivTextInputDiv.className = "inputDiv contenteditableBr";
	leftDivTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
	leftDivTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
	page1ContentTitleTextInputDiv.contentEditable = "true";
	page1ContentTitleTextInputDiv.className = "inputDiv contenteditableBr";
	page1ContentTitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
	page1ContentTitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
	page1ContentListTextareaDiv.contentEditable = "true";
	page1ContentListTextareaDiv.className = "inputDiv";
	page1ContentListTextareaDiv.setAttribute("onkeyup", "divToInput(this)");
	page1ContentListTextareaDiv.setAttribute("onkeydown", "divToInput(this)");

	$(page1ContentListTextareaDiv).html("<li><br></li>");
	// Prevent backspace
	$(page1ContentListTextareaDiv).keydown(function(e) {
		// trap the return key being pressed
		if (e.keyCode === 8) {
			if($(this).html() === "<li><br></li>") {
				// prevent the default behaviour of return key pressed
				return false;
			}
		}
	});

	$(leftDivTextInput).css("display", "none"); // Hiding real input
	$(page1ContentTitleTextInput).css("display", "none"); // Hiding real input
	$(page1ContentListTextarea).css("display", "none"); // Hiding real input

	$(page1ContentListTextarea).html("<li></li>");
	$(page1ContentListTextarea).text("<li></li>");

	leftDivP.appendChild(document.createTextNode("Lecture/Practical/something"));
	leftDiv.appendChild(leftDivP);
	leftDiv.appendChild(leftDivTextInputDiv);
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

	contentDivDiv.appendChild(leftDiv);
	contentDivDiv.appendChild(rightDiv);
	contentDivDiv.appendChild(closeImg);

	$(addLessonDiv).before(contentDivDiv);

	// Showing all input and Textarea if notClicked
	if(!notClicked) {
		$(".inputDiv").next().css("display", "block");
		$("textarea").css("display", "block");
	}

	// Prevent creating div on enter
	contentEditableBr();

	// Rebuilt Page2
	recreatePage2();
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

	var leftDiv = document.createElement("div");
	var leftDivP = document.createElement("p");
	var leftDivTextInputDiv = document.createElement("div");
	var leftDivTextInput = document.createElement("input");
	var leftDivColorInput = document.createElement("input");

	var rightDiv = document.createElement("div");
	var page1Content = document.createElement("div");
	var page1ContentTitle = document.createElement("p");
	var page1ContentTitleTextInputDiv = document.createElement("div");
	var page1ContentTitleTextInput = document.createElement("input");
	var page1ContentList = document.createElement("p");
	var page1ContentListTextareaDiv = document.createElement("div");
	var page1ContentListTextarea = document.createElement("textarea");

	var closeImg = document.createElement("div");
	var closeImgImage = document.createElement("img");

	var addLessonContent = document.createElement("div");
	var addLessonContentCloseImgImage = document.createElement("img");

	var closeImg2 = document.createElement("div");
	var closeImgImage2 = document.createElement("img");

	mainSection.className = "mainSection section";
	lessonSection.className = "section";

	contentDivDiv.className = "section contentDivDiv";
	leftDiv.className = "leftDiv";
	rightDiv.className = "flex rightDiv";
	page1Content.className = "page1Content";
	page1ContentTitleTextInputDiv.className = "contenteditableBr";
	closeImg.className = "closeImg";
	closeImg2.setAttribute("onclick", "removeLessonContent(this)");
	closeImgImage.setAttribute("src", "grass 2.jpg");
	closeImgImage.setAttribute("width", "30");
	closeImgImage.setAttribute("height", "30");

	addLessonContent.className = "addLessonContent";
	addLessonContent.setAttribute("onclick", "addLessonContent(this)");
	addLessonContentCloseImgImage.setAttribute("src", "grass 2.jpg");
	addLessonContentCloseImgImage.setAttribute("width", "30");
	addLessonContentCloseImgImage.setAttribute("height", "30");

	closeImg2.className = "closeImg";
	closeImg2.setAttribute("onclick", "removeLessonContent(this)");
	closeImgImage2.setAttribute("src", "grass 2.jpg");
	closeImgImage2.setAttribute("width", "30");
	closeImgImage2.setAttribute("height", "30");

	lessonTitleTextInput.setAttribute("type", "text");
	lessonTitleTextInput.className = "lessonTitleInput";
	lessonSubtitleTextInput.setAttribute("type", "text");
	lessonSubtitleTextInput.className = "lessonSubtitleInput";
	leftDivTextInput.setAttribute("type", "text");
	leftDivColorInput.setAttribute("type", "color");
	page1ContentTitleTextInput.setAttribute("type", "text");

	lessonTitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
	lessonTitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
	lessonSubtitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
	lessonSubtitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
	leftDivTextInput.setAttribute("onkeyup", "inputToDiv(this)");
	leftDivTextInput.setAttribute("onkeydown", "inputToDiv(this)");
	leftDivColorInput.setAttribute("onchange", "setActualValue()");
	page1ContentTitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
	page1ContentTitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
	page1ContentListTextarea.setAttribute("onkeyup", "inputToDiv(this)");
	page1ContentListTextarea.setAttribute("onkeydown", "inputToDiv(this)");

	lessonTitleTextInputDiv.contentEditable = "true";
	lessonTitleTextInputDiv.className = "inputDiv contenteditableBr";
	lessonTitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
	lessonTitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
	lessonSubtitleTextInputDiv.contentEditable = "true";
	lessonSubtitleTextInputDiv.className = "inputDiv contenteditableBr";
	lessonSubtitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
	lessonSubtitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
	leftDivTextInputDiv.contentEditable = "true";
	leftDivTextInputDiv.className = "inputDiv contenteditableBr";
	leftDivTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
	leftDivTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
	page1ContentTitleTextInputDiv.contentEditable = "true";
	page1ContentTitleTextInputDiv.className = "inputDiv contenteditableBr";
	page1ContentTitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
	page1ContentTitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
	page1ContentListTextareaDiv.contentEditable = "true";
	page1ContentListTextareaDiv.className = "inputDiv";
	page1ContentListTextareaDiv.setAttribute("onkeyup", "divToInput(this)");
	page1ContentListTextareaDiv.setAttribute("onkeydown", "divToInput(this)");

	$(page1ContentListTextareaDiv).html("<li><br></li>");
	// Prevent backspace
	$(page1ContentListTextareaDiv).keydown(function(e) {
		// trap the return key being pressed
		if (e.keyCode === 8) {
			if($(this).html() === "<li><br></li>") {
				// prevent the default behaviour of return key pressed
				return false;
			}
		}
	});

	$(lessonTitleTextInput).css("display", "none"); // Hiding real input
	$(lessonSubtitleTextInput).css("display", "none"); // Hiding real input
	$(leftDivTextInput).css("display", "none"); // Hiding real input
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

	leftDivP.appendChild(document.createTextNode("Lecture/Practical/something"));
	leftDiv.appendChild(leftDivP);
	leftDiv.appendChild(leftDivTextInputDiv);
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

	contentDivDiv.appendChild(leftDiv);
	contentDivDiv.appendChild(rightDiv);
	contentDivDiv.appendChild(closeImg);

	addLessonContent.appendChild(addLessonContentCloseImgImage);
	closeImg2.appendChild(closeImgImage2);

	mainSection.appendChild(lessonSection);
	mainSection.appendChild(contentDivDiv);
	mainSection.appendChild(addLessonContent);
	mainSection.appendChild(closeImg2);

	$(addSectionDiv).before(mainSection);

	// Showing all input and Textarea if notClicked
	if(!notClicked) {
		$(".inputDiv").next().css("display", "block");
		$("textarea").css("display", "block");
	}

	// Prevent creating div on enter
	contentEditableBr();

	// Rebuilt Page2
	recreatePage2();
}

function recreatePage1(){
	// Clear page 1
	$("#page1").empty();

	// Page 1 Section
	var page1Section = document.createElement("div");
	page1Section.className = "section";
	// Title
	var page1TitleP = document.createElement("p");
	page1TitleP.appendChild(document.createTextNode("Instructors Details"));
	page1TitleP.className = "bold underline";

	// Paragraph
	//var page1ParagraphP = document.createElement("p");
	//page1ParagraphP.appendChild(document.createTextNode("Paragraph"));

	var page1ParagraphTextareaDiv = document.createElement("div");
	page1ParagraphTextareaDiv.contentEditable = "true";
	page1ParagraphTextareaDiv.className = "inputDiv";
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
			if($(this).html() === "<p><br></p>") {
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
		lessonSection.className = "lessonTitle section";

		// Creating Lesson Title
		var lessonTitleP = document.createElement("p");
		lessonTitleP.appendChild(document.createTextNode("Lesson Title"));
		var lessonTitleTextInputDiv = document.createElement("div");
		lessonTitleTextInputDiv.contentEditable = "true";
		lessonTitleTextInputDiv.className = "inputDiv contenteditableBr";
		lessonTitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
		lessonTitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
		var lessonTitleTextInput = document.createElement("input");
		lessonTitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
		lessonTitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
		lessonTitleTextInput.className = "lessonTitleInput";
		$(lessonTitleTextInputDiv).html($(this).find(".lessonHeader").children().eq(0).html());
		$(lessonTitleTextInput).val($(this).find(".lessonHeader").children().eq(0).html());
		$(lessonTitleTextInput).css("display", "none"); // Hiding real input

		// Creating Lesson Subtitle
		var lessonSubtitleP = document.createElement("p");
		lessonSubtitleP.appendChild(document.createTextNode("Lesson Subtitle"));
		var lessonSubtitleTextInputDiv = document.createElement("div");
		lessonSubtitleTextInputDiv.contentEditable = "true";
		lessonSubtitleTextInputDiv.className = "inputDiv contenteditableBr";
		lessonSubtitleTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
		lessonSubtitleTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
		var lessonSubtitleTextInput = document.createElement("input");
		lessonSubtitleTextInput.setAttribute("onkeyup", "inputToDiv(this)");
		lessonSubtitleTextInput.setAttribute("onkeydown", "inputToDiv(this)");
		lessonSubtitleTextInput.className = "lessonSubtitleInput";
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

			// Creating leftDiv
			var leftDiv = document.createElement("div");
			leftDiv.className = "leftDiv";

			// Creating Lecture/Practical/something
			var leftDivP = document.createElement("p");
			leftDivP.appendChild(document.createTextNode("Lecture/Practical/something"));
			// Lecture/Practical/something
			var leftDivTextInputDiv = document.createElement("div");
			leftDivTextInputDiv.contentEditable = "true";
			leftDivTextInputDiv.className = "inputDiv contenteditableBr";
			leftDivTextInputDiv.setAttribute("onkeyup", "divToInput(this)");
			leftDivTextInputDiv.setAttribute("onkeydown", "divToInput(this)");
			var leftDivTextInput = document.createElement("input");
			leftDivTextInput.setAttribute("onkeyup", "inputToDiv(this)");
			leftDivTextInput.setAttribute("onkeydown", "inputToDiv(this)");
			leftDivTextInput.setAttribute("type", "text");
			$(leftDivTextInputDiv).html($(this).find(".lecPracDiv :first-child").html());
			$(leftDivTextInput).val($(this).find(".lecPracDiv :first-child").text());
			$(leftDivTextInput).css("display", "none"); // Hiding real input
			// Lecture Color
			var leftDivColorInput = document.createElement("input");
			leftDivColorInput.setAttribute("onchange", "setActualValue()");
			leftDivColorInput.setAttribute("type", "color");
			var lecPracDivColor = $(this).find(".lecPracDiv").css("background-color");
			$(leftDivColorInput).val(rgb2hex(lecPracDivColor));

			// Appending leftDiv
			leftDiv.appendChild(leftDivP);
			leftDiv.appendChild(leftDivTextInputDiv);
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
			page1ContentTitleTextInputDiv.className = "inputDiv contenteditableBr";
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
			page1ContentListTextareaDiv.className = "inputDiv";
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
					if($(this).html() === "<li><br></li>") {
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
			var closeImg = document.createElement("div");
			closeImg.className = "closeImg";
			closeImg.setAttribute("onclick", "removeLessonContent(this)");
			var closeImgImage = document.createElement("img");
			closeImgImage.setAttribute("src", "grass 2.jpg");
			closeImgImage.setAttribute("width", "30");
			closeImgImage.setAttribute("height", "30");

			// Appending closeImg
			closeImg.appendChild(closeImgImage);

			// Appending everything
			contentDivDiv.appendChild(leftDiv);
			contentDivDiv.appendChild(rightDiv);
			contentDivDiv.appendChild(closeImg);

			// Appending contentDivDiv
			mainSection.appendChild(contentDivDiv);
		});
		// Creating closeImg for entire section / "lesson"
		var addLessonContent = document.createElement("div");
		addLessonContent.className = "addLessonContent";
		var addLessonContentCloseImgImage = document.createElement("img");

		var closeImg2 = document.createElement("div");
		closeImg2.className = "closeImg";
		var closeImgImage2 = document.createElement("img");

		// Setting attributes
		addLessonContent.setAttribute("onclick", "addLessonContent(this)");
		addLessonContentCloseImgImage.setAttribute("src", "grass 2.jpg");
		addLessonContentCloseImgImage.setAttribute("width", "30");
		addLessonContentCloseImgImage.setAttribute("height", "30");
		closeImg2.setAttribute("onclick", "removeLessonContent(this)");
		closeImgImage2.setAttribute("src", "grass 2.jpg");
		closeImgImage2.setAttribute("width", "30");
		closeImgImage2.setAttribute("height", "30");

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
	footerSection.className = "section";
	var footerP = document.createElement("p");
	footerP.appendChild(document.createTextNode("Footer"));
	var footerTextInputDiv = document.createElement("div");
	footerTextInputDiv.contentEditable = "true";
	footerTextInputDiv.className = "inputDiv contenteditableBr";
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
	generateHTMLButton.className = "btn";

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
			$(lecPracDivP).html($(this).find(".leftDiv :nth-child(2)").html());
			$(lecPracDiv).css("background-color", $(this).find(".leftDiv :nth-child(4)").val());
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
	$("#popupDiv").css("display", "block");
	$("#popup > textarea").val($("#page2").html().trim());
}

function closePopup() {
	$("#popupDiv").css("display", "none");
}

function copyToClipboard() {
	$("#popup > textarea")[0].select();
	document.execCommand("copy");
	$("#popup :last-child").css("display", "block"); // Hide after showing
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
	if(selectedText.length > 0) {
		$("#linkInput").val("");
		$("#linkBoxDiv").css("display", "block");
		$("#linkBox").css("left", ($("#linkBoxDiv").width() / 2) - ($("#linkBox").width() / 2));
		$("#linkBox").css("top", ($("#linkBoxDiv").height() / 2) - ($("#linkBox").height() / 2));
	}
}

function hideLinkBox() {
	$("#linkBoxDiv").css("display", "none");
}

function convertToLink() {
	var linkEntered = $("#linkInput").val();
	// Checking input is not empty
	if(linkEntered) {
		var selectedTextBackup = htmlEncode(selectedText);
		var inputElement = focusedInput;
		var inputValue = inputElement.html();
		var linkA = "<a href='" + $("#linkInput").val() + "' target='_blank'>" + selectedTextBackup + "</a>";

		// Overriding previous startIndex. It doesnt work with multi-line div
		startIndex = inputElement.next().val().indexOf(selectedTextBackup);

		// Make sure the text is not already a link
		var regexSearch1 = escape('<a href=');
		var regexSearch2 = escape('</a>');
		var regExp = new RegExp('(' + regexSearch1 + ').*(' + escape(selectedTextBackup) + ').*(' + regexSearch2 + ')');
		console.log("Search: " + '(' + regexSearch1 + ').*(' + escape(selectedTextBackup) + ').*(' + regexSearch2 + ')');
		console.log("Text: " + escape(inputElement.next().val()));
		console.log("Condition: " + !regExp.test(escape(inputElement.next().val())));
		if(!regExp.test(escape(inputElement.next().val()))) {
			if(startIndex !== -1) {
				// Replacing the html in input
				var beforeLink = inputValue.substring(0, startIndex);
				var afterLink = inputValue.substring(startIndex + selectedTextBackup.length);
				var finalLink = beforeLink + linkA + afterLink;
				focusedInput.next().val(finalLink);

				// Refresh div
				focusedInput.html(focusedInput.next().val());

				setActualValue();
			}else {
				alert("Error! Make sure the text selected is not overlapping with another link.");
			}
		}else {
			alert("Error! You already made this a link.");
		}

		hideLinkBox();
	}else{
		alert("Please enter a link.");
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
	if(notClicked) {
		$(".inputDiv").next().css("display", "block");
		$("textarea").css("display", "block");
		button.innerHTML = "Hide All";
		notClicked = false;
	}else {
		$(".inputDiv").next().css("display", "none");
		$("textarea").css("display", "none");
		button.innerHTML = "Show All";
		notClicked = true;
	}
}

function checkEnterKey(e) {
	// trap the return key being pressed
	if (e.keyCode === 13) {
		// insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
		document.execCommand('insertHTML', false, '<br><br>');
		// prevent the default behaviour of return key pressed
		return false;
	}
}

function contentEditableBr() {
	// Make sure there is only one event attached
	$(document).off( "keydown", ".contenteditableBr", checkEnterKey);

	// Prevent creating div on enter
	$(document).on( "keydown", ".contenteditableBr", checkEnterKey);
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
			}else if (typeof document.selection != "undefined") {
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
	}else { // IE < 9
		$('body').on('contextmenu', '.inputDiv', function(e) {
			 // Get focused Input
			focusedInput = $(":focus");

			// Getting selection offset
			if (typeof window.getSelection != "undefined") {
				var sel = window.getSelection();
				if (sel.rangeCount) {
					startIndex = sel.focusOffset;
				}
			}else if (typeof document.selection != "undefined") {
				if (document.selection.type == "Text") {
					startIndex = sel.focusOffset
				}
			}

			console.log("Starting: " + startIndex);

			// Get selected text
			 if (window.getSelection) {
				selectedText = window.getSelection().toString();
			} else if (document.selection && document.selection.type != "Control") {
				selectedText = document.selection.createRange().text;
			}

			// Show Menu
			$("#rightClickMenu").css("display", "block");
      $("#rightClickMenu").offset({left:e.pageX, top:e.pageY});

			window.event.returnValue = false;
		});
	}

 	$(document).bind("click", function(event) {
  	$("#rightClickMenu").css("display", "none");
  });

	// Prevent creating div on enter
	contentEditableBr();
});

// Function to convert rgb to hex so can set type=color
var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");

// Function to convert rgb color to hex format
function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	if(!rgb) {
		return "#000000";
	}else {
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
}

function hex(x) {
	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

// Encode html
function htmlEncode(value){
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
