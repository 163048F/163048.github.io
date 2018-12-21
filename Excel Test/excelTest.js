$(function() {
   $(document).on("change", "#fileInput", onChangeExcel);
});

function onChangeExcel(e) {
   var files = e.target.files;
   if (files && files.length >= 1) {
      var file = files[0];

      var fileReader = new FileReader();
      fileReader.onload = function(e) {
         var filename = file.name;
         // pre-process data
         var binary = "";
         var bytes = new Uint8Array(e.target.result);
         var length = bytes.byteLength;
         for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
         }
         // call 'xlsx' to read the file
         var workbook = XLSX.read(binary, {
            type: 'binary',
            cellDates: true,
            cellStyles: true
         });

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

         workbook.SheetNames.forEach(function(sheetName) {
            var subtitleValue = "";
            var first = true;

            var sheet = workbook.Sheets[sheetName];
            var range = XLSX.utils.decode_range(sheet['!ref']);
            for(var rows = range.s.r; rows <= range.e.r; rows++) {
               for(var columns = range.s.c; columns <= range.e.c; columns++) {
                  var rowsAt = -1;

                  var cellRef = XLSX.utils.encode_cell({c:columns, r:rows});
                  if(!sheet[cellRef]) {
                     continue;
                  }
                  var cell = sheet[cellRef];
                  var x = String(cell.v);

                  // Processing
                  if(x.indexOf("Week") !== -1) {
                     rowsAt = rows;
                  }else if(x.indexOf("Lecture") !== -1) {
                     rowsAt = rows;
                  }else if(x.indexOf("Practical") !== -1) {
                     rowsAt = rows;
                  }else if(x.indexOf("Tutorial") !== -1) {
                     rowsAt = rows;
                  }else if(x.indexOf("Remark") !== -1) {
                     rowsAt = rows;
                  }else {
                     console.log(x + " is (probably) Title/Subtitle");
                  }

                  // If hit something
                  if(rowsAt >= 0) {
                     // Add title and subTitle
                     $(instructorsDetails).html(subtitleValue);
                     // Appending Everything
                     lessonPlanTemplate.append(instructors);
                     lessonPlanTemplate.append(instructorsDetails);
                     // Call function to get all things
                     getAllExcelValues(sheet, range, rows, lessonPlanTemplate);
                     // Breaking loop
                     rows = range.e.r;
                     break;
                  }else {
                     if(x) {
                        if(first) {
                           subtitleValue = "<p>" + x + "</p>";
                           first = false;
                        }else {
                           subtitleValue += "<p>" + x + "</p>";
                        }
                     }
                  }
               }
            }
         });
      };
      fileReader.readAsArrayBuffer(file);
   }
}

function getAllExcelValues(sheet, range, row, lessonPlanTemplate){
   // Map the columns first
   var columnMapping = {"week": -1, "lecture": -1, "practical": -1, "tutorial": -1, "remark": -1};
   for(var columns = range.s.c; columns <= range.e.c; columns++) {
      var cellRef = XLSX.utils.encode_cell({c:columns, r:row});
      if(!sheet[cellRef]) {
         continue;
      }
      var cell = sheet[cellRef];
      var x = String(cell.v);

      if(x.indexOf("Week") !== -1) {
         columnMapping.week = columns;
      }else if(x.indexOf("Lecture") !== -1) {
         columnMapping.lecture = columns;
      }else if(x.indexOf("Practical") !== -1) {
         columnMapping.practical = columns;
      }else if(x.indexOf("Tutorial") !== -1) {
         columnMapping.tutorial = columns;
      }
   }

   let merges = sheet["!merges"];
   if(merges) {
      processMerges(columnMapping, sheet, range, row, lessonPlanTemplate);
   }else {
      var footerSeperation = -1;
      // Use the mapped column and start processing
      for(var rows = (row + 1); rows <= range.e.r; rows++) {
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

         // Appending Lesson header before loop
         lessonHeader.appendChild(lessonTitle);
         lessonHeader.appendChild(lessonSubtitle);
         lesson.appendChild(lessonHeader);

         for(var columns = range.s.c; columns <= range.e.c; columns++) {
            //Mapping column and rows
            var cellRef = XLSX.utils.encode_cell({c:columns, r:rows});
            if(!sheet[cellRef]) {
               continue;
            }
            var cell = sheet[cellRef];
            var x = String(cell.v);

            // Checking title
            if(columns === columnMapping.week) {
               // LessonTitle = week
               // Checking whether is link
               if(cell.l) {
                  if(typeof cell.v == "number") {
                     $(lessonTitle).html("<a href='" + cell.l.target + "' target='_blank'>Week " + cell.v + "</a>");
                  }else {
                     $(lessonTitle).html("<a href='" + cell.l.target + "' target='_blank'>" + cell.v + "</a>");
                  }
               }else {
                  $(lessonTitle).html("Week " + x);
               }
            }else{
               // lecPracHeader
               var lecPracHeader = document.createElement("div");
               // LecPracDiv
               var lecPracDiv = document.createElement("div");
               var lecPracDivP = document.createElement("p");
               lecPracDiv.appendChild(lecPracDivP);
               // Lesson Plan Content
               var lessonPlanContent = document.createElement("div");
               // Lesson Plan Content Title
               var lessonPlanContentTitleP = document.createElement("p");
               // Lesson Plan Content List
               var lessonPlanContentListUl = document.createElement("ul");

               // Adding all classes
               lecPracHeader.className = "lecPracHeader";
               lecPracDiv.className = "lecPracDiv";
               lecPracDivP.className = "bold";
               lessonPlanContent.className = "lessonPlanContent";
               lessonPlanContentTitleP.className = "lessonPlanContentP";

               if(columns === columnMapping.lecture) {
                  // LecPracDiv = L
                  $(lecPracDivP).html("Lecture");
               }else if(columns === columnMapping.practical) {
                  // LecPracDiv = P
                  $(lecPracDivP).html("Practical");
               }else if(columns === columnMapping.tutorial) {
                  // LecPracDiv = T
                  $(lecPracDivP).html("Tutorial");
               }else {
                  // LecPracDiv = R
                  $(lecPracDivP).html("Remark");
               }

               // ContentList = value
               var xArray = x.trim().split("\n");
               // Checking whether is link
               if(cell.l) {
                  xArray = cell.v.trim().split("\n");
                  var lines = "";
                  for(var i = 0; i < xArray.length; i++) {
                     lines += "<li><a href='" + cell.l.target + "'>" + xArray[i] + "</a></li>";
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
      }

      // Get footer
      if(footerSeperation > 0 && footerSeperation <= range.e.r) {
         var first = true;
         // Footer
         var lessonPlanFooter = document.createElement("p");
         var footerValue = "";

         // Adding all classes
         lessonPlanFooter.className = "sub";

         for(var rows = footerSeperation; rows <= range.e.r; rows++) {
            for(var columns = range.s.c; columns <= range.e.c; columns++) {
               var cellRef = XLSX.utils.encode_cell({c:columns, r:rows});
               if(!sheet[cellRef]) {
                  continue;
               }
               var cell = sheet[cellRef];
               var x = String(cell.v);
               if(first) {
                  footerValue = x;
                  first = false;
               }else {
                  footerValue += "<br />" + x;
               }
            }
         }

         // Setting footer value
         $(lessonPlanFooter).html(footerValue);
         // Appending Footer
         lessonPlanTemplate.appendChild(lessonPlanFooter);
      }
   }

   $("#outputTextarea").val(lessonPlanTemplate.outerHTML);
   $("#page2").html(lessonPlanTemplate.outerHTML);
}

function processMerges(columnMapping, sheet, range, row, lessonPlanTemplate) {
   let previousRowName;

   // Use the mapped column and start processing
   for(var rows = (row + 1); rows <= range.e.r; rows++) {
      // Check whether is same name (0 is week)
      var cellRef = XLSX.utils.encode_cell({c:0, r:row});
      if(!sheet[cellRef]) {
         continue;
      }
      var cell = sheet[cellRef];
      var x = String(cell.v);

      if(x === previousRowName) {
         //Append on previous lesson
         for(var columns = range.s.c; columns <= range.e.c; columns++) {
            // Skipping the Groupby label
            if(columns === 0) {
               continue;
            }

            
         }
      }
   }
}

function checkIfMerged(column, row) {
   let json = sheet["!merges"];
   let valueArray = Object.values(json);

   for(let i = 0; i < valueArray.length; i++) {
      let sC = valueArray[i].s.c;
      let eC = valueArray[i].e.c;
      let sR = valueArray[i].s.r;
      let eR = valueArray[i].e.r;
      // If it is merged
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
         }else {
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
      }
   }
}
