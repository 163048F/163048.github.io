$(function() {
   $(document).on("change", "#fileInput", onChangeExcel);
});

function onChangeExcel(e) {
   var files = e.target.files;
   if (files && files.length >= 1) {
      var file = files[0];

      var fileReader = new FileReader();
      fileReader.onload = function(e) {
         console.log("Reading");
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

         workbook.SheetNames.forEach(function(sheetName) {
            var isTitle = false;
            var titleValue = "";
            var subtitleValue = "";
            var first = true;

            var sheet = workbook.Sheets[sheetName];
            var range = XLSX.utils.decode_range(sheet['!ref']);
            for(var rows = range.s.r; rows <= range.e.r; rows++) {
               for(var columns = range.s.r; columns <= range.e.c; columns++) {
                  var rowsAt = -1;

                  console.log("Row: " + rows);
                  console.log("Column: " + columns);
                  var cellRef = XLSX.utils.encode_cell({c:columns, r:rows});
                  if(!sheet[cellRef]) {
                     continue;
                  }
                  var cell = sheet[cellRef];
                  var x = String(cell.v);

                  // Processing
                  if(x.indexOf("Week") !== -1) {
                     console.log(x + " is Week");
                     rowsAt = rows;
                  }else if(x.indexOf("Lecture") !== -1) {
                     console.log(x + " is Lecture");
                     rowsAt = rows;
                  }else if(x.indexOf("Practical") !== -1) {
                     console.log(x + " is Practical");
                     rowsAt = rows;
                  }else if(x.indexOf("Tutorial") !== -1) {
                     console.log(x + " is Tutorial");
                     rowsAt = rows;
                  }else if(x.indexOf("Remark") !== -1) {
                     console.log(x + " is Remark");
                     rowsAt = rows;
                  }else {
                     console.log(x + " is (probably) Remark");
                  }

                  // If hit something
                  if(rowsAt >= 0) {
                     // Call function to get all things
                     alert("Going into function");
                     getAllExcelValues(sheet, range, rows);
                     // Breaking loop
                     rows = range.e.r;
                     break;
                  }else {
                     if(!isTitle && x) {
                        titleValue = x;
                     }else if(isTitle && x) {
                        if(first) {
                           subTitle += x;
                        }else {
                           subTitle += "\n" + x;
                        }
                     }

                  }
                  console.log(x);
               }
            }
         });
      };
      fileReader.readAsArrayBuffer(file);
   }
}

function getAllExcelValues(sheet, range, row){
   // Map the columns first
   var columnMapping = {"week": -1, "lecture": -1, "practical": -1, "tutorial": -1, "remark": -1};
   for(var columns = range.s.r; columns <= range.e.c; columns++) {
      console.log(columns);
      var cellRef = XLSX.utils.encode_cell({c:columns, r:row});
      if(!sheet[cellRef]) {
         continue;
      }
      var cell = sheet[cellRef];
      var x = String(cell.v);

      if(x.indexOf("Week") !== -1) {
         columnMapping.week = columns;
         console.log("Week: " + columns);
      }else if(x.indexOf("Lecture") !== -1) {
         columnMapping.lecture = columns;
         console.log("Lecture: " + columns);
      }else if(x.indexOf("Practical") !== -1) {
         columnMapping.practical = columns;
         console.log("Practical: " + columns);
      }else if(x.indexOf("Tutorial") !== -1) {
         columnMapping.tutorial = columns;
         console.log("Tutorial: " + columns);
      }
   }

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
            $(lessonTitle).html("Week " + x);
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
               $(lecPracDivP).html("L");
            }else if(columns === columnMapping.practical) {
               // LecPracDiv = P
               $(lecPracDivP).html("P");
            }else if(columns === columnMapping.tutorial) {
               // LecPracDiv = T
               $(lecPracDivP).html("T");
            }else {
               // LecPracDiv = R
               $(lecPracDivP).html("R");
            }

            // ContentList = value
            var lines = "";
            var xArray = x.trim().split("\n");
            for(var i = 0; i < xArray.length; i++) {
               lines += "<li>" + xArray[i] + "</li>";
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
         $("#page2").append(lesson);
      }
   }
}
