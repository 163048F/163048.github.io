$(function() {
   $(document).on("change", "#fileInput", onChangeExcel);
});

let file;
function onChangeExcel(e) {
   let files = e.target.files;
   if (files && files.length >= 1) {
      file = files[0];
      // Ask the user(Show column title)
      showColumn(file);
   }
}

function showColumn(file) {
   let fileReader = new FileReader();
   fileReader.onload = function(e) {
      let filename = file.name;
      // pre-process data
      let binary = "";
      let bytes = new Uint8Array(e.target.result);
      let length = bytes.byteLength;
      for (let i = 0; i < length; i++) {
         binary += String.fromCharCode(bytes[i]);
      }
      // call 'xlsx' to read the file
      let workbook = XLSX.read(binary, {
         type: 'binary',
         cellDates: true,
         cellStyles: true
      });

      // Clearing selectOptions
      $("#selectOptions").empty();
      // Adding placeholder
      let placeholderOption = $("<option value='' disabled selected>Select an option</option>");
      $("#selectOptions").append(placeholderOption);
      // Getting the first sheet
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      let range = XLSX.utils.decode_range(sheet['!ref']);
      // Looping all columns on first row
      for(let columns = range.s.c; columns <= range.e.c; columns++) {
         let cellRef = XLSX.utils.encode_cell({c:columns, r:0});
         if(!sheet[cellRef]) {
            continue;
         }
         let cell = sheet[cellRef];
         let x = String(cell.v);

         // Adding to selectOptions
         let option = document.createElement("option");
         option.appendChild(document.createTextNode(x));
         option.value = columns;
         $("#selectOptions").append(option);
      }
   };
   fileReader.readAsArrayBuffer(file);
}

function startProcessing(selectInput) {
   // LessonPlanTemplate
   var lessonPlanTemplate = document.createElement("div");
   lessonPlanTemplate.id = "lessonPlanTemplate";
   // Instructors
   var instructors = document.createElement("p");
   instructors.appendChild(document.createTextNode("Instructors Details"));
   // Instructors Details
   var instructorsDetails = document.createElement("div");
   // Adding all classes
   instructors.className = "bold underline";
   instructorsDetails.id = "instructorsDetails";
   // Appending Everything
   lessonPlanTemplate.append(instructors);
   lessonPlanTemplate.append(instructorsDetails);


   // Getting the primary column number
   let selectedValue = selectInput.value;
   if(selectedValue) {
      console.log("Went in");
      let workbookSheet;

      let fileReader = new FileReader();
      fileReader.onload = function(e) {
         let filename = file.name;
         // pre-process data
         let binary = "";
         let bytes = new Uint8Array(e.target.result);
         let length = bytes.byteLength;
         for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
         }
         // call 'xlsx' to read the file
         let workbook = XLSX.read(binary, {
            type: 'binary',
            cellDates: true,
            cellStyles: true
         });

         // Getting the first sheet
         let sheet = workbook.Sheets[workbook.SheetNames[0]];
         let range = XLSX.utils.decode_range(sheet['!ref']);

         workbookSheet = {
            "sheet": sheet,
            "range": range
         };

         // Check if loadSheet is empty
         if(workbookSheet) {
            console.log("loadSheet not empty");
            // Map the columns first
            let range = workbookSheet.range;
            var columnMapping = {lecture: -1, practical: -1, tutorial: -1, remark: -1};
            for(var columns = range.s.c; columns <= range.e.c; columns++) {
               var cellRef = XLSX.utils.encode_cell({c:columns, r:0});
               if(!sheet[cellRef]) {
                  continue;
               }
               var cell = sheet[cellRef];
               var x = String(cell.v);

               if(x.indexOf("Lecture") !== -1) {
                  columnMapping.lecture = columns;
               }else if(x.indexOf("Practical") !== -1) {
                  columnMapping.practical = columns;
               }else if(x.indexOf("Tutorial") !== -1) {
                  columnMapping.tutorial = columns;
               }else if(x.indexOf("Remark") !== -1) {
                  columnMapping.remark = columns;
               }
            }
            console.log("Mapping done");

            // Get the primary first
            // +1 to not read header/title of table
            for(let rows = (range.s.r + 1); rows <= range.e.r; rows++) {
               let cellRef = XLSX.utils.encode_cell({c:selectedValue, r:rows});
               if(!sheet[cellRef]) {
                  continue;
               }
               console.log("");
               console.log("--- LESSON CONTAINER ---");
               let cell = sheet[cellRef];
               let x = String(cell.v);

               // Create Lesson
               var lesson = document.createElement("div");
               var lessonHeader = document.createElement("div");
               // Lesson Title
               var lessonTitle = document.createElement("p");
               // Lesson Subtitle
               var lessonSubtitle = document.createElement("p");

               // Adding all classes
               lesson.className = "lesson";
               lessonHeader.className = "lessonHeader";
               lessonTitle.className = "bold";
               lessonSubtitle.className = "em";

               // Checking whether is link
               if(cell.l) {
                  if(typeof cell.v == "number") {
                     $(lessonTitle).html("<a href='" + cell.l.target + "' target='_blank'>Week " + cell.v + "</a>");
                  }else {
                     $(lessonTitle).html("<a href='" + cell.l.target + "' target='_blank'>" + cell.v + "</a>");
                  }
               }else {
                  $(lessonTitle).html(x);
               }

               // Appending Lesson header before loop
               lessonHeader.appendChild(lessonTitle);
               lessonHeader.appendChild(lessonSubtitle);
               lesson.appendChild(lessonHeader);

               let mergeObject = checkIfMerged(sheet, selectedValue, rows);
               console.log("MERGE DIRECTION: " + mergeObject.direction);
               if(mergeObject.direction === "row") {
                  let rowsRemaining = mergeObject.eR - mergeObject.sR;

                  for(let columns = range.s.c; columns <= range.e.c; columns++) {
                     // Skip the selected Value
                     if(columns == selectedValue) {
                        continue;
                     }
                     for(let y = rows; y <= (rows + rowsRemaining); y++) {
                        // If not first and the cell is merged in rows with the primary, skip
                        if(y > rows && checkIfMerged(sheet, columns, rows).direction === "row") {
                           continue;
                        }

                        let cellRef2;
                        // Check if it is Merged
                        let divsss = checkIfMerged(sheet, columns, y);
                        if(divsss.direction === "column" || divsss.direction === "both") {
                           // If merged get first value
                           cellRef2 = XLSX.utils.encode_cell({c:divsss.sC, r:divsss.sR});
                        }else {
                           cellRef2 = XLSX.utils.encode_cell({c:columns, r:y});
                        }

                        if(!sheet[cellRef2]) {
                           continue;
                        }
                        // Create header
                        let divss = getHeader(columnMapping, columns);
                        let lecPracHeader = divss.header;
                        let lecPracDiv = divss.lecPrac;
                        // Lesson Plan Content
                        var lessonPlanContent = document.createElement("div");
                        // Lesson Plan Content Title
                        var lessonPlanContentTitleP = document.createElement("p");
                        // Lesson Plan Content List
                        var lessonPlanContentListUl = document.createElement("ul");
                        // Adding all classes
                        lessonPlanContent.className = "lessonPlanContent";
                        lessonPlanContentTitleP.className = "lessonPlanContentP";

                        // Create ContentList
                        let cell2 = sheet[cellRef2];
                        let x2 = String(cell2.v);
                        var xArray = x2.trim().split("\n");
                        // Checking whether is link
                        if(cell2.l) {
                           xArray = cell2.v.trim().split("\n");
                           var lines = "";
                           for(var i = 0; i < xArray.length; i++) {
                              lines += "<li><a href='" + cell2.l.target + "'>" + xArray[i] + "</a></li>";
                           }
                        }else {
                           var lines = "";
                           for(var i = 0; i < xArray.length; i++) {
                              lines += "<li>" + xArray[i] + "</li>";
                           }
                        }

                        $(lessonPlanContentListUl).html(lines);

                        // Appending Everything
                        lessonPlanContent.appendChild(lessonPlanContentTitleP);
                        lessonPlanContent.appendChild(lessonPlanContentListUl);
                        lecPracHeader.appendChild(lecPracDiv);
                        lecPracHeader.appendChild(lessonPlanContent);

                        // Appending to lesson
                        lesson.appendChild(lecPracHeader);
                     }
                     // Appending lesson to Page2
                     lessonPlanTemplate.appendChild(lesson);
                  }
               }else {
                  for(let columns = range.s.c; columns <= range.e.c; columns++) {
                     // Skip the selected Value
                     if(columns == selectedValue) {
                        continue;
                     }
                     let cellRef2;
                     // Check if it is Merged
                     let divsss = checkIfMerged(sheet, columns, rows);
                     if(divsss.direction === "column" || divsss.direction === "both") {
                        // If merged get first value
                        cellRef2 = XLSX.utils.encode_cell({c:divsss.sC, r:divsss.sR});
                     }else {
                        cellRef2 = XLSX.utils.encode_cell({c:columns, r:rows});
                     }

                     if(!sheet[cellRef2]) {
                        continue;
                     }
                     // Create header
                     let divss = getHeader(columnMapping, columns);
                     let lecPracHeader = divss.header;
                     let lecPracDiv = divss.lecPrac;
                     // Lesson Plan Content
                     var lessonPlanContent = document.createElement("div");
                     // Lesson Plan Content Title
                     var lessonPlanContentTitleP = document.createElement("p");
                     // Lesson Plan Content List
                     var lessonPlanContentListUl = document.createElement("ul");
                     // Adding all classes
                     lessonPlanContent.className = "lessonPlanContent";
                     lessonPlanContentTitleP.className = "lessonPlanContentP";

                     // Create ContentList
                     let cell2 = sheet[cellRef2];
                     let x2 = String(cell2.v);
                     var xArray = x2.trim().split("\n");
                     // Checking whether is link
                     if(cell2.l) {
                        xArray = cell2.v.trim().split("\n");
                        var lines = "";
                        for(var i = 0; i < xArray.length; i++) {
                           lines += "<li><a href='" + cell2.l.target + "' target='_blank'>" + xArray[i] + "</a></li>";
                        }
                     }else {
                        var lines = "";
                        for(var i = 0; i < xArray.length; i++) {
                           lines += "<li>" + xArray[i] + "</li>";
                        }
                     }

                     $(lessonPlanContentListUl).html(lines);

                     // Appending Everything
                     lessonPlanContent.appendChild(lessonPlanContentTitleP);
                     lessonPlanContent.appendChild(lessonPlanContentListUl);
                     lecPracHeader.appendChild(lecPracDiv);
                     lecPracHeader.appendChild(lessonPlanContent);

                     // Appending to lesson
                     lesson.appendChild(lecPracHeader);
                  }
                  // Appending lesson to Page2
                  lessonPlanTemplate.appendChild(lesson);
               }
               console.log("<--- END LESSON CONTAINER --->");
               console.log("");
            }
            $("#outputTextarea").val(lessonPlanTemplate.outerHTML);
            $("#page2").html(lessonPlanTemplate.outerHTML);
         }
      };
      fileReader.readAsArrayBuffer(file);
   }
}

function getHeader(columnMapping, column) {
   // lecPracHeader
   var lecPracHeader = document.createElement("div");
   // LecPracDiv
   var lecPracDiv = document.createElement("div");
   var lecPracDivP = document.createElement("p");
   lecPracDiv.appendChild(lecPracDivP);

   // Adding all classes
   lecPracHeader.className = "lecPracHeader";
   lecPracDiv.className = "lecPracDiv";
   lecPracDivP.className = "bold";

   for(let keyValue in columnMapping) {
      if(columnMapping.hasOwnProperty(keyValue)) {
         if(columnMapping[keyValue] === column) {
            // See is which
            if(keyValue === "practical") {
               // Create input with practical selected
               $(lecPracDivP).html("Practical");
               return {
                  header: lecPracHeader,
                  lecPrac: lecPracDiv
               };
            }else if(keyValue === "tutorial") {
               // Create input with tutorial selected
               $(lecPracDivP).html("Tutorial");
               return {
                  header: lecPracHeader,
                  lecPrac: lecPracDiv
               };
            }else if(keyValue === "remark") {
               // Create input with remark selected
               $(lecPracDivP).html("Remark");
               return {
                  header: lecPracHeader,
                  lecPrac: lecPracDiv
               };
            }
         }
      }
   }
   // (Default)
   // Create input with lecture selected
   $(lecPracDivP).html("Lecture");
   return {
      header: lecPracHeader,
      lecPrac: lecPracDiv
   };
}

function checkIfMerged(sheet, column, row) {
   let json = sheet["!merges"];
   let valueArray = Object.values(json);

   for(let i = 0; i < valueArray.length; i++) {
      let sC = valueArray[i].s.c;
      let eC = valueArray[i].e.c;
      let sR = valueArray[i].s.r;
      let eR = valueArray[i].e.r;
      // If it is merged
      if(column >= sC && column <= eC && row >= sR && row <= eR) {
         // If column is merged
         if(eC > sC) {
            // If row is merged
            if(eR > sR) {
               // Direction both
               return {
                  found: true,
                  sC: sC,
                  eC: eC,
                  sR: sR,
                  eR: eR,
                  direction: "both"
               }
            }else {
               // Direction column
               return {
                  found: true,
                  sC: sC,
                  eC: eC,
                  sR: sR,
                  eR: eR,
                  direction: "column"
               }
            }
         }else {
            if(eR > sR) {
               // Direction Row
               return {
                  found: true,
                  sC: sC,
                  eC: eC,
                  sR: sR,
                  eR: eR,
                  direction: "row"
               }
            }
         }
      }
   }

   // Direction none
   return {
      found: false,
      sC: null,
      eC: null,
      sR: null,
      eR: null,
      direction: "none"
   }
}
