const criteria = [
"Khả năng truyền đạt",
"Thái độ giảng viên",
"Sự tương tác với sinh viên",
"Kiến thức chuyên môn",
"Tổ chức bài giảng",
"Khả năng giải đáp thắc mắc",
"Sự nhiệt tình",
"Thời gian giảng dạy phù hợp",
"Thái độ đối với câu hỏi sinh viên",
"Ứng dụng công nghệ trong giảng dạy",
"Khả năng khuyến khích tư duy sáng tạo"
];
function createTable() {

const table = document.getElementById("criteriaTable");

criteria.forEach((c, index) => {

let row = "<tr>";

row += "<td>" + c + "</td>";

for(let i=1;i<=5;i++){
row += `<td><input type="radio" name="c${index}" value="${i}" onchange="calculateAverage()"></td>`;
}

row += "</tr>";

table.innerHTML += row;

});

}
function getCurrentDateTime(){

const now = new Date();

const date = now.toLocaleDateString();
const time = now.toLocaleTimeString();

document.getElementById("submitTime").innerText = date + " " + time;

}
function calculateAverage(){

let sum = 0;
let count = 0;

for(let i=0;i<criteria.length;i++){

let radios = document.getElementsByName("c"+i);

for(let r of radios){

if(r.checked){

sum += parseInt(r.value);
count++;

}

}

}

if(count != criteria.length){

document.getElementById("avg").innerText =
"Trung bình điểm của giảng viên: Chưa hoàn thành đánh giá";

return;

}

let avg = (sum / criteria.length).toFixed(2);

document.getElementById("avg").innerText =
"Trung bình điểm của giảng viên: " + avg;

}
function submitSurvey(){

let courseName = document.getElementById("courseName").value;
let teacherName = document.getElementById("teacherName").value;
let studentName = document.getElementById("studentName").value;
let submitTime = document.getElementById("submitTime").innerText;

let criteriaData = {};

let sum = 0;
let count = 0;

for(let i=0;i<criteria.length;i++){

let radios = document.getElementsByName("c"+i);

for(let r of radios){

if(r.checked){

criteriaData["Tiêu chí "+(i+1)] = r.value;

sum += parseInt(r.value);
count++;

}

}

}

let averageScore = "Chưa hoàn thành";

if(count == criteria.length){
averageScore = (sum/criteria.length).toFixed(2);
}

const result = {

courseName,
teacherName,
studentName,
submitTime,
criteria: criteriaData,
averageScore

};

document.getElementById("jsonOutput").innerText =
JSON.stringify(result,null,4);

}
window.onload = function(){

getCurrentDateTime();

createTable();

}