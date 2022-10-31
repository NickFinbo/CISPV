function download_csv_file(array) {
  //CREATE FILLER ARRAY SO THAT THE ORIGINAL DATA IS NOT MODIFIED
  const data = [];
  //PUSH 2 DIMENSIONS INTO THE FILLER ARRAY
  for (let i = 0; i < 2; i++) {
    data.push([]);
  }
  for (let i = 0; i < array.length; i++) {
    //PUSH THE INDEX INTO THE FIRST DIMENSION
    data[0].push(i);
    //PUSH THE ARRAY VALUE INTO THE SECOND DIMENSION
    data[1].push(array[i]);
  }
  //CSV HEADER
  var csv = "Name,Data\n";
  //ADDING THE ARRAY VALUES INTO CSV ROWS
  data.forEach(function (row) {
    csv += row.join(",");
    csv += "\n";
  });
  //ENCODE URI CODE FROM STACK OVERFLOW
  document.write(csv);
  console.log(csv);
  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = "Data.csv";
  hiddenElement.click();
}
