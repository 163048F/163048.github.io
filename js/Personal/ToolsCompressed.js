var selectedText="",focusedInput,startIndex,shouldGoBackHide=0,notClicked=!0,file,colourTemplate='{\n   "Lecture": "rgb(0,0,0)",\n   "Practical": "rgb(0,0,0)",\n   "Tutorial": "rgb(0,0,0)",\n   "Remark": "rgb(0,0,0)",\n   "E-Learning": "rgb(0,0,0)",\n   "In Course Assessment": "rgb(0,0,0)"\n}',selectOptions='{"Lecture","Practical","Tutorial","Remark","E-Learning","In Course Assessment"}';
$(function(){$(".carousel-control-prev").css("display","none");clearImportTextarea();$(window.document).on("focusout","#linkInput",checkAndDisplayAlert);if($(".inputDiv").addEventListener)$(".inputDiv").addEventListener("contextmenu",function(a){focusedInput=$(":focus");if("undefined"!=typeof window.getSelection){var d=window.getSelection();d.rangeCount&&(startIndex=d.focusOffset)}else"undefined"!=typeof document.selection&&"Text"==window.document.selection.type&&(startIndex=sel.focusOffset);window.getSelection?
selectedText=window.getSelection().toString():window.document.selection&&"Control"!=window.document.selection.type&&(selectedText=window.document.selection.createRange().text);selectedText&&($("#rightClickMenu").css("display","block"),$("#rightClickMenu").offset({left:a.pageX,top:a.pageY}),a.preventDefault())},!1);else $("body").on("contextmenu",".inputDiv",function(a){focusedInput=$(":focus");if("undefined"!=typeof window.getSelection){var d=window.getSelection();d.rangeCount&&(startIndex=d.focusOffset)}else"undefined"!=
typeof document.selection&&"Text"==document.selection.type&&(startIndex=sel.focusOffset);window.getSelection?selectedText=window.getSelection().toString():document.selection&&"Control"!=document.selection.type&&(selectedText=document.selection.createRange().text);selectedText&&($("#rightClickMenu").css("display","block"),$("#rightClickMenu").offset({left:a.pageX,top:a.pageY}),window.event.returnValue=!1)});$(document).bind("click",function(a){$("#rightClickMenu").css("display","none")});$(document).on("mouseover",
".contentDivDivDraggableDiv",function(){$(this).stop(!0,!0);$(this).animate({opacity:1,queue:!1},300)});$(document).on("mouseout",".contentDivDivDraggableDiv",function(){$(this).animate({opacity:0},300)});contentEditableBr();document.body.style.cursor="auto"});function goPage2(){$("#carousel").carousel("next");$("#carousel").carousel("pause");$(".carousel-control-prev").css("display","flex");shouldGoBackHide++}
function goPage3(a){$("#carousel").carousel("next");$("#carousel").carousel("pause");$(".carousel-control-prev").css("display","flex");shouldGoBackHide++;$("#importPage3Preview").empty();$("#importPage3Preview").append(a)}function goBack(){closeAlert();$("#carousel").carousel("prev");$("#carousel").carousel("pause");shouldGoBackHide--;0>=shouldGoBackHide&&$(".carousel-control-prev").css("display","none")}
function createNew(){$("#startupDiv").fadeOut();$("#masterDiv").css("overflow","auto");$("#masterDiv").css("height","unset");$("#page1").empty();recreatePage1()}function closeAlert(){$(".alert").alert("close")}
function checkTextIsCorrect(){closeAlert();var a=document.createElement("div");a.className="alert alert-danger fade show";a.id="page2Error";a.setAttribute("role","alert");var d=document.createElement("p"),b=document.createElement("div"),c=document.createElement("button");c.className="close";c.setAttribute("type","button");c.setAttribute("data-dismiss","alert");c.setAttribute("aria-label","Close");var e=document.createElement("span");c.setAttribute("aria-hidden","true");c.innerHTML="&times;";c.appendChild(e);
b.appendChild(c);a.appendChild(d);a.appendChild(b);(b=$("#importTextarea").val().trim())?(c=$(document.createElement("div")),c.html(b),(b=c.find("#lessonPlanTemplate").html())?(b=b.trim(),0<b.length?(d=document.createElement("div"),d.id="lessonPlanTemplate",$(d).html(b),goPage3(d)):(d.appendChild(document.createTextNode("'id=#lessonPlanTemplate' div is empty. Make sure you entered/uploaded correctly")),$("#startupDivPage2 > div").prepend(a),$("#page2Error").slideDown(function(){a.style.display="flex"}))):
(d.appendChild(document.createTextNode("'id=#lessonPlanTemplate' div missing. Make sure you entered/uploaded correctly")),$("#startupDivPage2 > div").prepend(a),$("#page2Error").slideDown(function(){a.style.display="flex"}))):(d.appendChild(document.createTextNode("Make sure you entered/uploaded something")),$("#startupDivPage2 > div").prepend(a),$("#page2Error").slideDown(function(){a.style.display="flex"}))}
function fileMatchesLayout(a){closeAlert();var d=document.createElement("div");d.className="alert alert-danger fade show";d.id="page2Error";d.setAttribute("role","alert");var b=document.createElement("p"),c=document.createElement("div"),e=document.createElement("button");e.className="close";e.setAttribute("type","button");e.setAttribute("data-dismiss","alert");e.setAttribute("aria-label","Close");var g=document.createElement("span");e.setAttribute("aria-hidden","true");e.innerHTML="&times;";e.appendChild(g);
c.appendChild(e);d.appendChild(b);d.appendChild(c);if(a=a.trim())if(c=$(document.createElement("div")),c.html(a),a=c.find("#lessonPlanTemplate").html()){a=a.trim();if(0<a.length)return!0;b.appendChild(document.createTextNode("'id=#lessonPlanTemplate' div is empty. Make sure you entered/uploaded correctly"))}else b.appendChild(document.createTextNode("'id=#lessonPlanTemplate' div missing. Make sure you entered/uploaded correctly"));else b.appendChild(document.createTextNode("Make sure you entered/uploaded something"));
$("#startupDivPage2 > div").prepend(d);$("#page2Error").slideDown(function(){d.style.display="flex"});return!1}function hideStartupDiv(){$("#page2").empty();$("#page2").html($("#importPage3Preview").html());$("#importPage3Preview").empty();createNew()}
function allowDrop(a){window.File&&window.FileReader&&window.FileList&&window.Blob?($("#importTextarea").css("border","5px dashed grey"),$("#importTextarea").css("border-radius","20px"),a.preventDefault()):alert("Browser doesn't support drag and drop")}function removeDragCSS(){$("#importTextarea").css("border","");$("#importTextarea").css("border-radius","")}
function drop(a){a.preventDefault();removeDragCSS();$(".progress-bar").css("width","0%");$(".progress-bar")[0].classList.add("progress-bar-animated");file=(a.dataTransfer?a.dataTransfer.files:a.target.files)[0];var d=new FileReader;file.type.match("text/plain")||file.type.match("text/html")?(d.onload=function(){var a=d.result;fileMatchesLayout(a)&&($("#uploadedFileName").html(file.name),$("#importTextarea").val(a))},d.onprogress=function(a){a.lengthComputable&&(a=parseInt(a.loaded/a.total*100,10),
$(".progress-bar").css("width",a+"%"),console.log(a))},d.onloadend=function(){$(".progress-bar")[0].classList.remove("progress-bar-animated")}):file.type.match("application/vnd.ms-excel")||file.type.match("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")?(showColumn(file),$("#excelBoxDiv").modal("show")):alert("Only .html, .txt & .xls(x) is the accepted file format");d.readAsText(file)}
function showColumn(a){var d=new FileReader;d.onload=function(a){var c="";a=new Uint8Array(a.target.result);for(var d=a.byteLength,b=0;b<d;b++)c+=String.fromCharCode(a[b]);c=XLSX.read(c,{type:"binary",cellDates:!0,cellStyles:!0});$("#excelSelectInput").empty();$("#excelSelectInput2").empty();a=$("<option disabled selected>Select an option</option>");$("#excelSelectInput").append(a);a=$("<option disabled selected>Select an option</option>");$("#excelSelectInput2").append(a);c=c.Sheets[c.SheetNames[0]];
a=XLSX.utils.decode_range(c["!ref"]);for(d=a.s.c;d<=a.e.c;d++)if(b=XLSX.utils.encode_cell({c:d,r:0}),c[b]){b=String(c[b].v);var k=document.createElement("option");k.appendChild(document.createTextNode(b));k.value=d;var n=document.createElement("option");n.appendChild(document.createTextNode(b));n.value=d;$("#excelSelectInput").append(k);$("#excelSelectInput2").append(n)}};d.readAsArrayBuffer(a)}
function startProcessingExcel(){var a;if($("#excelSelectInput").val()&&0<=$("#excelSelectInput").val()){var d=document.createElement("div");d.id="lessonPlanTemplate";var b=document.createElement("p");b.appendChild(document.createTextNode("Instructors Details"));var c=document.createElement("div");b.className="bold underline";c.id="instructorsDetails";d.append(b);d.append(c);var e=$("#excelSelectInput").val(),g=$("#excelSelectInput2").val();0<=e&&($("#uploadedFileName").html(file.name),b=new FileReader,
b.onload=function(c){var b="";c=new Uint8Array(c.target.result);for(var k=c.byteLength,h=0;h<k;h++)b+=String.fromCharCode(c[h]);b=XLSX.read(b,{type:"binary",cellDates:!0,cellStyles:!0});b=b.Sheets[b.SheetNames[0]];c=a=XLSX.utils.decode_range(b["!ref"]);k={lecture:-1,practical:-1,tutorial:-1,remark:-1};for(h=c.s.c;h<=c.e.c;h++){var p=XLSX.utils.encode_cell({c:h,r:0});b[p]&&(p=String(b[p].v),-1!==p.indexOf("Lecture")?k.lecture=h:-1!==p.indexOf("Practical")?k.practical=h:-1!==p.indexOf("Tutorial")?k.tutorial=
h:-1!==p.indexOf("Remark")&&(k.remark=h))}for(h=c.s.r+1;h<=c.e.r;h++)if(p=XLSX.utils.encode_cell({c:e,r:h}),b[p]){var f=b[p],q=String(f.v);p=document.createElement("div");var l=document.createElement("div"),m=document.createElement("p"),r=document.createElement("p");p.className="lesson";l.className="lessonHeader";m.className="bold";r.className="em";f.l?"number"==typeof f.v?$(m).html("<a href='"+f.l.Target+"' target='_blank'>Week "+f.v+"</a>"):$(m).html("<a href='"+f.l.Target+"' target='_blank'>"+
f.v+"</a>"):$(m).html(q);g&&0<=g&&(f=checkIfMerged(b,g,h),f=f.found?XLSX.utils.encode_cell({c:f.sC,r:f.sR}):XLSX.utils.encode_cell({c:g,r:h}),b[f]&&(f=b[f],q=String(f.v),f.l?"number"==typeof f.v?$(r).html("<a href='"+f.l.Target+"' target='_blank'>Week "+f.v+"</a>"):$(r).html("<a href='"+f.l.Target+"' target='_blank'>"+f.v+"</a>"):$(r).html(q)));l.appendChild(m);l.appendChild(r);p.appendChild(l);l=checkIfMerged(b,e,h);if("row"===l.direction)for(l=l.eR-l.sR,m=c.s.c;m<=c.e.c;m++){if(m!=e&&m!=g){for(r=
h;r<=h+l;r++)if(!(r>h&&"row"===checkIfMerged(b,m,h).direction)){f=checkIfMerged(b,m,r);var t="column"===f.direction||"both"===f.direction?XLSX.utils.encode_cell({c:f.sC,r:f.sR}):XLSX.utils.encode_cell({c:m,r:r});if(b[t]){q=getHeader(k,m);f=q.header;q=q.lecPrac;var u=document.createElement("div"),v=document.createElement("p"),y=document.createElement("ul");u.className="lessonPlanContent";v.className="lessonPlanContentP";var w=b[t];t=String(w.v).trim().split("\n");var A="";if(w.l){t=w.v.trim().split("\n");
for(var z=0;z<t.length;z++)A+="<li><a href='"+w.l.Target+"' target='_blank'>"+t[z]+"</a></li>"}else for(w=0;w<t.length;w++)A+="<li>"+t[w]+"</li>";$(y).html(A);u.appendChild(v);u.appendChild(y);f.appendChild(q);f.appendChild(u);p.appendChild(f)}}d.appendChild(p)}}else{for(l=c.s.c;l<=c.e.c;l++)if(l!=e&&l!=g&&(m=checkIfMerged(b,l,h),v="column"===m.direction||"both"===m.direction?XLSX.utils.encode_cell({c:m.sC,r:m.sR}):XLSX.utils.encode_cell({c:l,r:h}),b[v])){r=getHeader(k,l);m=r.header;r=r.lecPrac;f=
document.createElement("div");q=document.createElement("p");u=document.createElement("ul");f.className="lessonPlanContent";q.className="lessonPlanContentP";t=b[v];v=String(t.v).trim().split("\n");y="";if(t.l)for(v=t.v.trim().split("\n"),A=0;A<v.length;A++)y+="<li><a href='"+t.l.Target+"' target='_blank'>"+v[A]+"</a></li>";else for(t=0;t<v.length;t++)y+="<li>"+v[t]+"</li>";$(u).html(y);f.appendChild(q);f.appendChild(u);m.appendChild(r);m.appendChild(f);p.appendChild(m)}d.appendChild(p)}}$("#importTextarea").val(d.outerHTML);
$("#excelBoxDiv").modal("hide");$("#excelSelectInput")[0].style.boxShadow=""},b.onprogress=function(a){a.lengthComputable&&(a=parseInt(a.loaded/a.total*100,10),$(".progress-bar").css("width",a+"%"))},b.onloadend=function(){$(".progress-bar")[0].classList.remove("progress-bar-animated")},b.readAsArrayBuffer(file))}else $("#excelSelectInput")[0].style.boxShadow="0 0 0 .2rem rgba(255,0,0,.25)"}
function getHeader(a,d){var b=document.createElement("div"),c=document.createElement("div"),e=document.createElement("p");c.appendChild(e);b.className="lecPracHeader";c.className="lecPracDiv";e.className="bold";for(var g in a)if(a.hasOwnProperty(g)&&a[g]===d){if("practical"===g)return $(e).html("Practical"),{header:b,lecPrac:c};if("tutorial"===g)return $(e).html("Tutorial"),{header:b,lecPrac:c};if("remark"===g)return $(e).html("Remark"),{header:b,lecPrac:c}}$(e).html("Lecture");return{header:b,lecPrac:c}}
function checkIfMerged(a,d,b){a=Object.values(a["!merges"]);for(var c=0;c<a.length;c++){var e=a[c].s.c,g=a[c].e.c,k=a[c].s.r,n=a[c].e.r;if(d>=e&&d<=g&&b>=k&&b<=n){if(g>e)return n>k?{found:!0,sC:e,eC:g,sR:k,eR:n,direction:"both"}:{found:!0,sC:e,eC:g,sR:k,eR:n,direction:"column"};if(n>k)return{found:!0,sC:e,eC:g,sR:k,eR:n,direction:"row"}}}return{found:!1,sC:null,eC:null,sR:null,eR:null,direction:"none"}}
function clearImportTextarea(){$("#inputGroupFile01").val(null);$("#uploadedFileName").html("Choose file");$("#importTextarea").val("");$(".progress-bar").css("width","0%")}
function makeSortable(){$(".mainSection").sortable({connectWith:".mainSection",items:".contentDivDiv",handle:".contentDivDivDraggableDiv",cancel:".inputDiv, textarea, input, button",update:function(){setActualValue()},axis:"y",cursor:"move",opacity:.5});$("#page1").sortable({items:".mainSection",cancel:":not('.draggableDiv')"})}function removeLessonContent(a){$(a).parent().remove();recreatePage2()}
function addLessonContent(a){var d=document.createElement("div"),b=document.createElement("div");b.className="contentDivDivDraggableDiv progress-bar-striped bg-success";b.style.opacity="0";var c=document.createElement("div");c.className="contentDivDivRight";var e=document.createElement("div"),g=document.createElement("p"),k=document.createElement("select"),n=document.createElement("input"),x=document.createElement("div"),h=document.createElement("div"),p=document.createElement("p"),f=document.createElement("div"),
q=document.createElement("input"),l=document.createElement("p"),m=document.createElement("div"),r=document.createElement("textarea"),t=document.createElement("button"),u=document.createElement("span");d.className="section contentDivDiv";e.className="leftDiv";k.className="inputDiv form-control";n.className="form-control";x.className="flex rightDiv";h.className="page1Content";t.className="closeImg close";t.setAttribute("onclick","removeLessonContent(this)");t.setAttribute("type","button");t.setAttribute("aria-label",
"Close");u.setAttribute("aria-hidden","true");u.innerHTML="&times;";n.setAttribute("type","color");q.setAttribute("type","text");k.setAttribute("onchange","setActualValue()");n.setAttribute("onchange","setActualValue()");q.setAttribute("onkeyup","inputToDiv(this)");q.setAttribute("onkeydown","inputToDiv(this)");r.setAttribute("onkeyup","inputToDiv(this)");r.setAttribute("onkeydown","inputToDiv(this)");f.contentEditable="true";f.className="inputDiv contenteditableBr form-control";f.setAttribute("onkeyup",
"divToInput(this)");f.setAttribute("onkeydown","divToInput(this)");m.contentEditable="true";m.className="inputDiv form-control";m.setAttribute("onkeyup","divToInput(this)");m.setAttribute("onkeydown","divToInput(this)");$(m).html("<ul><li><br></li></ul>");$(m).keydown(function(a){if(8===a.keyCode&&"<ul><li><br></li></ul>"===$(this).html())return!1});$(n).css("display","none");$(q).css("display","none");$(r).css("display","none");$(r).text("<ul><li>>br></li></ul>");var v=document.createElement("option");
v.appendChild(document.createTextNode("Lecture"));v.setAttribute("value","Lecture");var y=document.createElement("option");y.appendChild(document.createTextNode("Practical"));y.setAttribute("value","Practical");var w=document.createElement("option");w.appendChild(document.createTextNode("Tutorial"));w.setAttribute("value","Tutorial");var A=document.createElement("option");A.appendChild(document.createTextNode("Remark"));A.setAttribute("value","Remark");var z=document.createElement("option");z.appendChild(document.createTextNode("E-Learning"));
z.setAttribute("value","E-Learning");var B=document.createElement("option");B.appendChild(document.createTextNode("In Course Assessment"));B.setAttribute("value","In Course Assessment");k.appendChild(v);k.appendChild(y);k.appendChild(w);k.appendChild(A);k.appendChild(z);k.appendChild(B);g.appendChild(document.createTextNode("Lecture/Practical/something"));e.appendChild(g);e.appendChild(k);e.appendChild(n);p.appendChild(document.createTextNode("Content Title"));l.appendChild(document.createTextNode("Content List"));
h.appendChild(p);h.appendChild(f);h.appendChild(q);h.appendChild(l);h.appendChild(m);h.appendChild(r);x.appendChild(h);t.appendChild(u);c.appendChild(e);c.appendChild(x);d.appendChild(b);d.appendChild(c);d.appendChild(t);$(a).before(d);notClicked||($(".inputDiv").next().css("display","block"),$("textarea").css("display","block"));contentEditableBr();recreatePage2();makeSortable()}
function addLessonSection(a){var d=document.createElement("div"),b=document.createElement("div"),c=document.createElement("p"),e=document.createElement("div"),g=document.createElement("input"),k=document.createElement("p"),n=document.createElement("div"),x=document.createElement("input"),h=document.createElement("div"),p=document.createElement("div");p.className="contentDivDivDraggableDiv progress-bar-striped bg-success";p.style.opacity="0";var f=document.createElement("div");f.className="contentDivDivRight";
var q=document.createElement("div"),l=document.createElement("p"),m=document.createElement("select"),r=document.createElement("input"),t=document.createElement("div"),u=document.createElement("div"),v=document.createElement("p"),y=document.createElement("div"),w=document.createElement("input"),A=document.createElement("p"),z=document.createElement("div");document.createElement("ul");var B=document.createElement("textarea"),C=document.createElement("button"),F=document.createElement("span"),E=document.createElement("div"),
H=document.createElement("i"),D=document.createElement("button"),G=document.createElement("span");d.className="mainSection section";b.className="lessonTitle";h.className="section contentDivDiv";q.className="leftDiv";m.className="inputDiv form-control";r.className="form-control";t.className="flex rightDiv";u.className="page1Content";y.className="contenteditableBr form-control";C.className="closeImg close";C.setAttribute("onclick","removeLessonContent(this)");C.setAttribute("type","button");C.setAttribute("aria-label",
"Close");F.setAttribute("aria-hidden","true");F.innerHTML="&times;";H.className="fas fa-plus-circle";E.className="addLessonContent";E.setAttribute("onclick","addLessonContent(this)");D.className="closeImg close";D.setAttribute("onclick","removeLessonContent(this)");D.setAttribute("type","button");D.setAttribute("aria-label","Close");G.setAttribute("aria-hidden","true");G.innerHTML="&times;";g.setAttribute("type","text");g.className="lessonTitleInput form-control";x.setAttribute("type","text");x.className=
"lessonSubtitleInput form-control";r.setAttribute("type","color");w.setAttribute("type","text");g.setAttribute("onkeyup","inputToDiv(this)");g.setAttribute("onkeydown","inputToDiv(this)");x.setAttribute("onkeyup","inputToDiv(this)");x.setAttribute("onkeydown","inputToDiv(this)");m.setAttribute("onchange","setActualValue()");r.setAttribute("onchange","setActualValue()");w.setAttribute("onkeyup","inputToDiv(this)");w.setAttribute("onkeydown","inputToDiv(this)");B.setAttribute("onkeyup","inputToDiv(this)");
B.setAttribute("onkeydown","inputToDiv(this)");e.contentEditable="true";e.className="inputDiv contenteditableBr form-control";e.setAttribute("onkeyup","divToInput(this)");e.setAttribute("onkeydown","divToInput(this)");n.contentEditable="true";n.className="inputDiv contenteditableBr form-control";n.setAttribute("onkeyup","divToInput(this)");n.setAttribute("onkeydown","divToInput(this)");y.contentEditable="true";y.className="inputDiv contenteditableBr form-control";y.setAttribute("onkeyup","divToInput(this)");
y.setAttribute("onkeydown","divToInput(this)");z.contentEditable="true";z.className="inputDiv form-control";z.setAttribute("onkeyup","divToInput(this)");z.setAttribute("onkeydown","divToInput(this)");$(z).html("<ul><li><br></li></ul>");$(z).keydown(function(a){if(8===a.keyCode&&"<ul><li><br></li></ul>"===$(this).html())return!1});$(g).css("display","none");$(x).css("display","none");$(r).css("display","none");$(w).css("display","none");$(B).css("display","none");c.appendChild(document.createTextNode("Lesson Title"));
k.appendChild(document.createTextNode("Subtitle Title"));b.appendChild(c);b.appendChild(e);b.appendChild(g);b.appendChild(k);b.appendChild(n);b.appendChild(x);c=document.createElement("option");c.appendChild(document.createTextNode("Lecture"));c.setAttribute("value","Lecture");e=document.createElement("option");e.appendChild(document.createTextNode("Practical"));e.setAttribute("value","Practical");g=document.createElement("option");g.appendChild(document.createTextNode("Tutorial"));g.setAttribute("value",
"Tutorial");k=document.createElement("option");k.appendChild(document.createTextNode("Remark"));k.setAttribute("value","Remark");n=document.createElement("option");n.appendChild(document.createTextNode("E-Learning"));n.setAttribute("value","E-Learning");x=document.createElement("option");x.appendChild(document.createTextNode("In Course Assessment"));x.setAttribute("value","In Course Assessment");m.appendChild(c);m.appendChild(e);m.appendChild(g);m.appendChild(k);m.appendChild(n);m.appendChild(x);
l.appendChild(document.createTextNode("Lecture/Practical/something"));q.appendChild(l);q.appendChild(m);q.appendChild(r);v.appendChild(document.createTextNode("Content Title"));A.appendChild(document.createTextNode("Content List"));u.appendChild(v);u.appendChild(y);u.appendChild(w);u.appendChild(A);u.appendChild(z);u.appendChild(B);t.appendChild(u);C.appendChild(F);f.appendChild(q);f.appendChild(t);h.appendChild(p);h.appendChild(f);h.appendChild(C);E.appendChild(H);D.appendChild(G);d.appendChild(b);
d.appendChild(h);d.appendChild(E);d.appendChild(D);$(a).before(d);notClicked||($(".inputDiv").next().css("display","block"),$("textarea").css("display","block"));contentEditableBr();recreatePage2();makeSortable()}
function recreatePage1(){$("#page1").empty();var a=document.createElement("div"),d=document.createElement("p");d.appendChild(document.createTextNode("Instructors Details"));d.className="bold underline";var b=document.createElement("div");b.contentEditable="true";b.className="inputDiv form-control";b.setAttribute("onkeyup","divToInput(this)");b.setAttribute("onkeydown","divToInput(this)");var c=document.createElement("textarea");c.id="paragraphTextarea";c.setAttribute("onkeyup","inputToDiv(this)");
c.setAttribute("onkeydown","inputToDiv(this)");$(c).css("display","none");var e=$("#page2 > #lessonPlanTemplate > #instructorsDetails").html().trim().replace(/\t/g,"");$(b).html(e);$(b).keydown(function(a){if(8===a.keyCode&&"<p><br></p>"===$(this).html())return!1});$(c).val(e);a.appendChild(d);a.appendChild(b);a.appendChild(c);$("#page1").append(a);$(".lesson").each(function(){var a=document.createElement("div");a.className="mainSection section";var b=document.createElement("div");b.className="lessonTitle";
var c=document.createElement("p");c.appendChild(document.createTextNode("Lesson Title"));var d=document.createElement("div");d.contentEditable="true";d.className="inputDiv contenteditableBr form-control";d.setAttribute("onkeyup","divToInput(this)");d.setAttribute("onkeydown","divToInput(this)");var e=document.createElement("input");e.setAttribute("onkeyup","inputToDiv(this)");e.setAttribute("onkeydown","inputToDiv(this)");e.className="lessonTitleInput form-control";$(d).html($(this).find(".lessonHeader").children().eq(0).html());
$(e).val($(this).find(".lessonHeader").children().eq(0).html());$(e).css("display","none");var f=document.createElement("p");f.appendChild(document.createTextNode("Lesson Subtitle"));var g=document.createElement("div");g.contentEditable="true";g.className="inputDiv contenteditableBr form-control";g.setAttribute("onkeyup","divToInput(this)");g.setAttribute("onkeydown","divToInput(this)");var l=document.createElement("input");l.setAttribute("onkeyup","inputToDiv(this)");l.setAttribute("onkeydown","inputToDiv(this)");
l.className="lessonSubtitleInput form-control";$(g).html($(this).find(".lessonHeader").children().eq(1).html());$(l).val($(this).find(".lessonHeader").children().eq(1).text());$(l).css("display","none");b.appendChild(c);b.appendChild(d);b.appendChild(e);b.appendChild(f);b.appendChild(g);b.appendChild(l);a.appendChild(b);$(this).find(".lecPracHeader").each(function(){var b=document.createElement("div");b.className="section contentDivDiv";var c=document.createElement("div");c.className="contentDivDivDraggableDiv progress-bar-striped bg-success";
c.style.opacity="0";var d=document.createElement("div");d.className="contentDivDivRight";var e=document.createElement("div");e.className="leftDiv";var g=document.createElement("p");g.appendChild(document.createTextNode("Lecture/Practical/something"));var f=document.createElement("select");f.setAttribute("onchange","setActualColour(this)");f.className="inputDiv form-control";var h=document.createElement("option");h.appendChild(document.createTextNode("Lecture"));h.setAttribute("value","Lecture");var k=
document.createElement("option");k.appendChild(document.createTextNode("Practical"));k.setAttribute("value","Practical");var l=document.createElement("option");l.appendChild(document.createTextNode("Tutorial"));l.setAttribute("value","Tutorial");var n=document.createElement("option");n.appendChild(document.createTextNode("Remark"));n.setAttribute("value","Remark");var p=document.createElement("option");p.appendChild(document.createTextNode("E-Learning"));p.setAttribute("value","E-Learning");var q=
document.createElement("option");q.appendChild(document.createTextNode("In Course Assessment"));q.setAttribute("value","In Course Assessment");f.appendChild(h);f.appendChild(k);f.appendChild(l);f.appendChild(n);f.appendChild(p);f.appendChild(q);$(f).val($(this).find(".lecPracDiv :first-child").text());h=document.createElement("input");h.setAttribute("onchange","setActualValue()");h.setAttribute("type","color");h.className="form-control";$(h).css("display","none");k=$(this).find(".lecPracDiv").css("background-color");
$(h).val(rgb2hex(k));e.appendChild(g);e.appendChild(f);e.appendChild(h);g=document.createElement("div");g.className="flex rightDiv";f=document.createElement("div");f.className="page1Content";h=document.createElement("p");h.appendChild(document.createTextNode("Content Title"));k=document.createElement("div");k.contentEditable="true";k.className="inputDiv contenteditableBr form-control";k.setAttribute("onkeyup","divToInput(this)");k.setAttribute("onkeydown","divToInput(this)");l=document.createElement("input");
l.setAttribute("onkeyup","inputToDiv(this)");l.setAttribute("onkeydown","inputToDiv(this))");l.setAttribute("type","text");$(k).html($(this).find(".lessonPlanContent .lessonPlanContentP").html());$(l).val($(this).find(".lessonPlanContent .lessonPlanContentP").html());$(l).css("display","none");n=document.createElement("p");n.appendChild(document.createTextNode("Content List"));p=document.createElement("div");p.contentEditable="true";p.className="inputDiv form-control";p.setAttribute("onkeyup","divToInput(this)");
p.setAttribute("onkeydown","divToInput(this)");q=document.createElement("textarea");q.setAttribute("onkeyup","inputToDiv(this)");q.setAttribute("onkeydown","inputToDiv(this)");$(q).css("display","none");var x=$(this).find(".lessonPlanContent ul")[0].outerHTML.trim().replace(/\t/g,"");$(p).html(x);$(q).val(x);$(p).keydown(function(a){if(8===a.keyCode&&"<ul><li><br></li></ul>"===$(this).html())return!1});f.appendChild(h);f.appendChild(k);f.appendChild(l);f.appendChild(n);f.appendChild(p);f.appendChild(q);
g.appendChild(f);f=document.createElement("button");f.className="closeImg close";f.setAttribute("onclick","removeLessonContent(this)");f.setAttribute("type","button");f.setAttribute("aria-label","Close");h=document.createElement("span");h.setAttribute("aria-hidden","true");h.innerHTML="&times;";f.appendChild(h);d.appendChild(e);d.appendChild(g);b.appendChild(c);b.appendChild(d);b.appendChild(f);a.appendChild(b)});b=document.createElement("div");b.className="addLessonContent";c=document.createElement("i");
d=document.createElement("button");d.className="closeImg close";e=document.createElement("span");b.setAttribute("onclick","addLessonContent(this)");c.className="fas fa-plus-circle";d.setAttribute("onclick","removeLessonContent(this)");d.setAttribute("type","button");d.setAttribute("aria-label","Close");e.setAttribute("aria-hidden","true");e.innerHTML="&times;";d.appendChild(e);b.appendChild(c);a.appendChild(b);a.appendChild(d);$("#page1").append(a)});a=document.createElement("div");d=document.createElement("p");
a.id="addLessonSection";a.className="addLessonContent";a.setAttribute("onclick","addLessonSection(this)");a.style.color="white";d.appendChild(document.createTextNode("Add New Lesson Section"));a.appendChild(d);d=document.createElement("div");b=document.createElement("p");b.appendChild(document.createTextNode("Footer"));c=document.createElement("div");c.contentEditable="true";c.className="inputDiv contenteditableBr form-control";c.setAttribute("onkeyup","divToInput(this)");c.setAttribute("onkeydown",
"divToInput(this)");e=document.createElement("input");e.setAttribute("type","text");e.setAttribute("onkeyup","inputToDiv(this)");e.setAttribute("onkeydown","inputToDiv(this)");e.id="lessonPlanFooter";$(c).html($("#lessonPlanTemplate .sub").html());$(e).val($("#lessonPlanTemplate .sub").html());$(e).css("display","none");d.appendChild(b);d.appendChild(c);d.appendChild(e);b=document.createElement("br");c=document.createElement("button");c.appendChild(document.createTextNode("Generate HTML"));c.setAttribute("onclick",
"generateHTML()");c.className="btn btn-primary";e=document.createElement("button");e.appendChild(document.createTextNode("Show All Hidden HTML"));e.setAttribute("onclick","showAllInput(this)");e.className="btn btn-secondary";var g=document.getElementById("page1");g.appendChild(a);g.appendChild(d);g.appendChild(b);g.appendChild(c);g.appendChild(e);contentEditableBr();makeSortable()}
function recreatePage2(){$("#page2").empty();var a=document.createElement("div");a.id="lessonPlanTemplate";var d=document.createElement("p");d.appendChild(document.createTextNode("Instructors Details"));var b=document.createElement("div"),c=$("#paragraphTextarea").val();$(b).html(c);d.className="bold underline";b.id="instructorsDetails";a.append(d);a.append(b);$(".mainSection").each(function(){var b=document.createElement("div"),c=document.createElement("div"),d=document.createElement("p");$(d).html($(this).find(".lessonTitleInput").val());
var n=document.createElement("p");$(n).html($(this).find(".lessonSubtitleInput").val());b.className="lesson";c.className="lessonHeader";d.className="bold";n.className="em";c.appendChild(d);c.appendChild(n);b.appendChild(c);$(this).find(".contentDivDiv").each(function(){var a=document.createElement("div"),c=document.createElement("div"),d=document.createElement("p");$(c).css("background-color",$(this).find(".leftDiv input:nth-child(3)").val());$(d).html($(this).find(".leftDiv :nth-child(2)").val());
c.appendChild(d);var e=document.createElement("div"),g=document.createElement("p");$(g).html($(this).find(".rightDiv .page1Content :nth-child(2)").html());var k=$(this).find(".rightDiv .page1Content :nth-child(5)").html();$(e).html(k);a.className="lecPracHeader";c.className="lecPracDiv";d.className="bold";e.className="lessonPlanContent";g.className="lessonPlanContentP";$(e).prepend(g);a.appendChild(c);a.appendChild(e);b.appendChild(a)});a.append(b)});d=document.createElement("p");$(d).html($("#lessonPlanFooter").val());
d.className="sub";a.append(d);$("#page2").append(a)}function setInputValue(){recreatePage1()}function setActualValue(){recreatePage2()}function setActualColour(a){var d=a.value,b=JSON.parse(colourTemplate);b[d]&&$(a).next().val(b[d]);recreatePage2()}function generateHTML(){$("#popupDiv").modal("show");$("#popup .modal-body textarea").val($("#page2").html().trim())}function closePopup(){$("#popupDiv").modal("hide");$("#popup .generateHTMLRedText").css("display","none")}
function copyToClipboard(){$("#popup .modal-body textarea")[0].select();document.execCommand("copy");$("#popup .generateHTMLRedText").css("display","block")}function copyCommand(){var a=document.createElement("textarea");$(a).text(selectedText);$("#masterDiv").append(a);$(a)[0].select();document.execCommand("copy");$(a).remove()}
function checkOverlapLink(a){a=htmlEncode(a);var d=focusedInput;startIndex=d.next().val().indexOf(a);var b=escape("<a href="),c=escape("</a>");if((new RegExp("("+b+").*("+escape(a)+").*("+c+")")).test(escape(d.next().val())))return alert("Error! You already made this a link."),!1;if(-1!==startIndex)return!0;alert("Error! Make sure the text selected is not overlapping with another link.");return!1}
function promptLink(){0<selectedText.length&&checkOverlapLink(selectedText)&&($("#linkInput").val(""),$("#linkBoxDiv").modal("show"))}function hideLinkBox(){$("#linkBoxDiv").modal("hide");changeInputBoxSelection(1)}function hideExcelBox(){$("#excelSelectInput")[0].style.boxShadow="";$("#inputGroupFile01").val(null);$("#uploadedFileName").html("Choose file");$("#excelBoxDiv").modal("hide")}
function changeInputBoxSelection(a){$(".dropdown-menu > .active.dropdown-item")[0].classList.remove("active");var d=$("#linkBoxOptions"),b=$("#linkInput");switch(a){case 1:d.text("Webpage");b[0].setAttribute("placeholder","https://");b.val("");$(".dropdown-menu > a:first-child")[0].classList.add("active");break;case 2:d.text("Email");b[0].setAttribute("placeholder","example@nyp.edu.sg");/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(selectedText)&&
b.val(htmlEncode(selectedText));$(".dropdown-menu > a:nth-child(2)")[0].classList.add("active");break;case 3:d.text("Javascript"),b[0].setAttribute("placeholder","alert('Hello')"),b.val(""),$(".dropdown-menu > a:nth-child(4)")[0].classList.add("active")}}
function checkAndDisplayAlert(){var a=document.createElement("div");a.className="alert alert-warning fade show";a.id="linkBoxAlertError";a.setAttribute("role","alert");var d=document.createElement("p"),b=document.createElement("div"),c=document.createElement("button");c.className="close";c.setAttribute("type","button");c.setAttribute("data-dismiss","alert");c.setAttribute("aria-label","Close");var e=document.createElement("span");c.setAttribute("aria-hidden","true");c.innerHTML="&times;";c.appendChild(e);
b.appendChild(c);a.appendChild(d);a.appendChild(b);b=$("#linkInput").val();c=$("#linkBoxOptions").text();"Webpage"===c?/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(b)?closeAlert():(closeAlert(),d.appendChild(document.createTextNode("The URL entered does not match the format.")),$("#linkBox > .modal-content > .modal-body").prepend(a)):"Email"===c&&(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(b)?
closeAlert():(closeAlert(),d.appendChild(document.createTextNode("The email entered does not match the format.")),$("#linkBox > .modal-content > .modal-body").prepend(a)))}function whichLinkSelection(){var a=$("#linkBoxOptions").text();if("Webpage"===a)return"";if("Email"===a)return"mailto:";if("Javascript"===a)return"javascript:";alert("Unexpected error");return null}
function convertToLink(){closeAlert();var a=document.createElement("div");a.className="alert alert-danger fade show";a.id="linkBoxAlertError";a.setAttribute("role","alert");var d=document.createElement("p"),b=document.createElement("div"),c=document.createElement("button");c.className="close";c.setAttribute("type","button");c.setAttribute("data-dismiss","alert");c.setAttribute("aria-label","Close");var e=document.createElement("span");c.setAttribute("aria-hidden","true");c.innerHTML="&times;";c.appendChild(e);
b.appendChild(c);a.appendChild(d);a.appendChild(b);if(b=$("#linkInput").val()){if(""===whichLinkSelection()){if(!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(b)&&!confirm("The URL entered does not match the format. Do you want to continue?"))return d.appendChild(document.createTextNode("The URL entered does not match the format.")),a.className="alert alert-warning fade show",$("#linkBox > .modal-content > .modal-body").prepend(a),!1}else if("mailto:"===
whichLinkSelection()&&!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(selectedText)&&!confirm("The email entered does not match the format. Do you want to continue?"))return d.appendChild(document.createTextNode("The email entered does not match the format.")),a.className="alert alert-warning fade show",$("#linkBox > .modal-content > .modal-body").prepend(a),!1;c=htmlEncode(selectedText);
var g=focusedInput;e=g.html();b=whichLinkSelection()?"<a href='"+whichLinkSelection()+$("#linkInput").val()+"' target='_blank'>"+c+"</a>":"<a href='"+$("#linkInput").val()+"' target='_blank'>"+c+"</a>";startIndex=g.next().val().indexOf(c);var k=escape("<a href="),n=escape("</a>");(new RegExp("("+k+").*("+escape(c)+").*("+n+")")).test(escape(g.next().val()))?(d.appendChild(document.createTextNode("Error! You already made this a link.")),$("#linkBox > .modal-content > .modal-body").prepend(a)):-1!==
startIndex?(a=e.substring(0,startIndex),d=e.substring(startIndex+c.length),a=a+b+d,focusedInput.next().val(a),focusedInput.html(focusedInput.next().val()),setActualValue()):(d.appendChild(document.createTextNode("Error! Make sure the text selected is not overlapping with another link.")),$("#linkBox > .modal-content > .modal-body").prepend(a));hideLinkBox()}else d.appendChild(document.createTextNode("Please enter a link.")),$("#linkBox > .modal-content > .modal-body").prepend(a)}
function divToInput(a){$(a).next().val(a.innerHTML);setActualValue()}function inputToDiv(a){$(a).prev().html(a.value);setActualValue()}function showAllInput(a){notClicked?($(".inputDiv").next().css("display","block"),$("textarea:not(#popup textarea)").css("display","block"),a.innerHTML="Hide All",notClicked=!1):($(".inputDiv").next().css("display","none"),$("textarea:not(#popup textarea)").css("display","none"),a.innerHTML="Show All",notClicked=!0)}
function checkEnterKey(a){if(13===a.keyCode)return document.execCommand("insertHTML",!1,"<br /><br />"),!1}function contentEditableBr(){$(document).off("keydown",".contenteditableBr",checkEnterKey);$(document).on("keydown",".contenteditableBr",checkEnterKey)}function selectAll(a){a.setSelectionRange(0,a.value.length)}var hexDigits="0123456789abcdef".split("");function rgb2hex(a){return(a=a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))?"#"+hex(a[1])+hex(a[2])+hex(a[3]):"#000000"}
function hex(a){return isNaN(a)?"00":hexDigits[(a-a%16)/16]+hexDigits[a%16]}function htmlEncode(a){return $("<div/>").text(a).html()}function htmlDecode(a){return a.replace(/&#(\d+);?/g,function(a,b){return String.fromCharCode(b)})};