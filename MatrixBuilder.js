var matrix1XRef;
var matrix1YRef;
var matrix2XRef; 
var matrix2YRef;
var matrix1;
var matrix2;
var formElement;
var matrixCell;
var matrixDisplayArea1;
var matrixDisplayArea2;
var mismatchWarning;
function buildInitialMatrices() {
	matrix1 = document.createElement("TABLE");
	matrix2 = document.createElement("TABLE");
	if(matrix1XRef.value != matrix2YRef.value)
	{
		mismatchWarning.style.color = "#DF0000";
	} else {
		mismatchWarning.style.color = "#FFFFFF";
	}
	matrix1.id = "leftMatrixDisplay";
	matrix2.id = "rightMatrixDisplay";
	var matrix1Row = document.createElement("tr");
	var matrix2Row = document.createElement("tr");
	matrixDisplayArea1.style.minWidth = 125 + matrix1XRef.value * 25 + "px";
	matrixDisplayArea2.style.minWidth = 125 + matrix2XRef.value * 25 + "px";
	for(var i = 0;i < matrix1XRef.value;i++)
	{
		var copy = matrixCell.cloneNode(true);
		matrix1Row.appendChild(copy);
	}
	for(var i = 0;i < matrix1YRef.value;i++)
	{
		var copy = matrix1Row.cloneNode(true);
		matrix1.appendChild(copy);
	}
	for(var i = 0;i < matrix2XRef.value;i++)
	{
		var copy = matrixCell.cloneNode(true);
		matrix2Row.appendChild(copy);
	}
	for(var i = 0;i < matrix2YRef.value;i++)
	{
		var copy  = matrix2Row.cloneNode(true);
		matrix2.appendChild(copy);
	}
	for(var y = 0;y < matrix1YRef.value;y++)
	{
		for(var x = 0;x < matrix1XRef.value;x++)
		{
			var clone = formElement.cloneNode(true);
			matrix1.rows[y].cells[x].appendChild(clone);
		}
	}
	for(var y = 0;y < matrix2YRef.value;y++)
	{
		for(var x = 0;x < matrix2XRef.value;x++)
		{
			var clone = formElement.cloneNode(true);
			matrix2.rows[y].cells[x].appendChild(clone);
		}
	}
	if(document.getElementById("leftMatrixDisplay") == null)
	{
		matrixDisplayArea1.appendChild(matrix1);
		matrixDisplayArea2.appendChild(matrix2);
	} else {
		matrixDisplayArea1.replaceChild(matrix1,document.getElementById("leftMatrixDisplay"));
		matrixDisplayArea2.replaceChild(matrix2,document.getElementById("rightMatrixDisplay"));
	}
}
function gatherMatrixElements() {
	matrix1XRef = document.forms["matrixSizeForm1"]["matrix1X"];
	matrix1YRef = document.forms["matrixSizeForm1"]["matrix1Y"];
	matrix2XRef = document.forms["matrixSizeForm2"]["matrix2X"];
	matrix2YRef = document.forms["matrixSizeForm2"]["matrix2Y"];
	matrixDisplayArea1 = document.getElementById("matrixDisplayArea1");
	matrixDisplayArea2 = document.getElementById("matrixDisplayArea2");
	mismatchWarning = document.getElementById("mismatchWarning");
	matrixCell = document.createElement("td");
	formElement = document.createElement("input");
	formElement.type = "number";
	formElement.value = 0;
	formElement.className = "matrixFormInput";
}
gatherMatrixElements();
buildInitialMatrices();