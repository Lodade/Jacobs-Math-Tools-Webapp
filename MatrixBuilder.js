var matrix1XRef;
var matrix1YRef;
var matrix2XRef; 
var matrix2YRef;
var matrix1;
var matrix2;
var matrix3;
var matrix1Row;
var matrix2Row;
var matrix3Row
var formElement;
var matrixCell;
var matrixDisplayArea1;
var matrixDisplayArea2;
var resultMatrixDisplayArea;
var mismatchWarning;
var mismatchDisplayArea;
var calculationPos;
function buildInitialMatrices() {
	matrix1 = document.createElement("TABLE");
	matrix2 = document.createElement("TABLE");
	var mismatchCopy = document.getElementById("mismatchWarning");
	if(matrix1XRef.value != matrix2YRef.value && mismatchCopy == null)
	{
		var clone = mismatchWarning.cloneNode(true);
		mismatchDisplayArea.appendChild(clone);
		calculationPos = false;
	} else if(matrix1XRef.value == matrix2YRef.value && mismatchCopy != null){
		calculationPos = true;
		mismatchCopy.remove();
	}
	matrix1.id = "leftMatrixDisplay";
	matrix2.id = "rightMatrixDisplay";
	matrix1Row = document.createElement("tr");
	matrix2Row = document.createElement("tr");
	matrixDisplayArea1.style.minWidth = 125 + matrix1XRef.value * 25 + "px";
	matrixDisplayArea2.style.minWidth = 125 + matrix2XRef.value * 25 + "px";
	matrixDimensionBuilder(matrix1XRef.value, matrix1YRef.value, matrix1Row, matrix1, false);
	matrixDimensionBuilder(matrix2XRef.value, matrix2YRef.value, matrix2Row, matrix2, false);
	matrixFormBuilder(matrix1YRef.value, matrix1XRef.value, matrix1);
	matrixFormBuilder(matrix2YRef.value, matrix2XRef.value, matrix2);
	if(document.getElementById("leftMatrixDisplay") == null)
	{
		matrixDisplayArea1.appendChild(matrix1);
		matrixDisplayArea2.appendChild(matrix2);
	} else {
		matrixDisplayArea1.replaceChild(matrix1,document.getElementById("leftMatrixDisplay"));
		matrixDisplayArea2.replaceChild(matrix2,document.getElementById("rightMatrixDisplay"));
	}
	buildResultMatrix();
}
function gatherMatrixElements() {
	matrix1XRef = document.forms["matrixSizeForm1"]["matrix1X"];
	matrix1YRef = document.forms["matrixSizeForm1"]["matrix1Y"];
	matrix2XRef = document.forms["matrixSizeForm2"]["matrix2X"];
	matrix2YRef = document.forms["matrixSizeForm2"]["matrix2Y"];
	matrixDisplayArea1 = document.getElementById("matrixDisplayArea1");
	matrixDisplayArea2 = document.getElementById("matrixDisplayArea2");
	resultMatrixDisplayArea = document.getElementById("resultMatrixDisplayArea");
	mismatchWarning = document.getElementById("mismatchWarning");
	mismatchDisplayArea = document.getElementById("mismatchDisplayArea");
	matrixCell = document.createElement("td");
	formElement = document.createElement("input");
	formElement.type = "number";
	formElement.value = 0;
	formElement.className = "matrixFormInput";
	formElement.style.borderStyle = "none";
	calculationPos = true;
}
function buildResultMatrix() {
	matrix3 = document.createElement("TABLE");
	matrix3.id = "resultMatrixDisplay";
	matrix3Row = document.createElement("tr");
	matrixDimensionBuilder(matrix2XRef.value, matrix1YRef.value, matrix3Row, matrix3, true);
	if(calculationPos == true)
	{
		for(var y = 0;y < matrix1YRef.value;y++)
		{
			for(var x = 0;x < matrix2XRef.value;x++)
			{
				var sum = 0;
				for(var a = 0;a < matrix1XRef.value;a++)
				{
					sum += matrix1.rows[y].cells[a].firstChild.value * matrix2.rows[a].cells[x].firstChild.value;
				}
				matrix3.rows[y].cells[x].innerHTML = sum;
			}
		}
	}
	resultMatrixDisplayArea.style.minHeight = 75 + matrix1YRef.value * 25 + "px";
	if(document.getElementById("resultMatrixDisplay") == null)
	{
		resultMatrixDisplayArea.appendChild(matrix3);
	} else {
		resultMatrixDisplayArea.replaceChild(matrix3,document.getElementById("resultMatrixDisplay"));
	}
}
function matrixDimensionBuilder(rowWidth, tableHeight, rowObject, currentMatrix, isResult){
	for(let i = 0;i < rowWidth;i++)
	{
		let copy = matrixCell.cloneNode(true);
		if(isResult)
		{
			copy.innerHTML = 0;
		}
		rowObject.appendChild(copy);
	}
	for(var i = 0;i < tableHeight;i++)
	{
		let copy = rowObject.cloneNode(true);
		currentMatrix.appendChild(copy);
	}
}
function matrixFormBuilder(matrixHeight, matrixWidth, matrix){
	for(var y = 0;y < matrixHeight;y++)
	{
		for(var x = 0;x < matrixWidth;x++)
		{
			var clone = formElement.cloneNode(true);
			matrix.rows[y].cells[x].appendChild(clone);
		}
	}
}
gatherMatrixElements();
buildInitialMatrices();
buildResultMatrix();