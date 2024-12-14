let tableData;
let initialIndex = 0;
let finalIndex = 4;
const tableRef = document.getElementById("kickstart");

const addRowInTable = () => {
  for (let key = initialIndex; key <= finalIndex; key++) {
    if (tableData[key]) {
      addRow(tableData[key]);
    }
  }
};

document.getElementById("nextBtn").addEventListener("click", () => {
  for (let index = initialIndex; index <= finalIndex; index++) {
    tableRef.deleteRow(0);
  }

  initialIndex += 5;

  finalIndex += 5;
  if (finalIndex >= 100) {
    document.getElementById("nextBtn").disabled = true;
  }

  if (initialIndex > 0) {
    document.getElementById("prevBtn").disabled = false;
  }

  addRowInTable();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (finalIndex === 104) {
    tableRef.deleteRow(0);
  } else {
    for (let index = initialIndex; index <= finalIndex; index++) {
      tableRef.deleteRow(0);
    }
  }
  if (initialIndex >= 5) {
    initialIndex -= 5;
  } else {
    initialIndex = 0;
  }

  finalIndex -= 5;
  if (finalIndex < 100) {
    document.getElementById("nextBtn").disabled = false;
  }

  if (initialIndex === 0) {
    document.getElementById("prevBtn").disabled = true;
  }

  addRowInTable();
});

const addRow = (data) => {
  let newRow = tableRef.insertRow(-1);
  let firstCell = newRow.insertCell(0);
  let firstCellData = document.createTextNode(data["s.no"]);
  firstCell.appendChild(firstCellData);

  let secondCell = newRow.insertCell(1);
  let secondCellData = document.createTextNode(data["percentage.funded"]);
  secondCell.appendChild(secondCellData);

  let thirdCell = newRow.insertCell(2);
  let thirdCellData = document.createTextNode(data["amt.pledged"]);
  thirdCell.appendChild(thirdCellData);
};

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    tableData = JSON.parse(xhr.responseText);
    if (initialIndex === 0) {
      document.getElementById("prevBtn").disabled = true;
    }
    addRowInTable();
  }
};

xhr.open(
  "GET",
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
);
xhr.send();
