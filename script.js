
function removeRow(row) {
    row.parentNode.parentNode.remove(); // Remove the entire row when the remove button is clicked
    calculateGWA(); // Recalculate GWA after removing a row
}

function calculateGWA() {
    let totalGrades = 0;
    let rowCount = 0;

    // Select the table body
    let tableBody = document.querySelector(".subject-table tbody");

    // Check if there are rows in the table body
    if (tableBody.rows.length > 0) {
        // Loop through each row in the table body
        tableBody.querySelectorAll("tr").forEach(function(row) {
            let grade = parseInt(row.querySelector("#gradeAdded").innerText);
            totalGrades += grade;
            rowCount++;
        });

        // Calculate the GWA
        let gwa = (totalGrades / rowCount).toFixed(2);

        // Update the GWA display
        document.querySelector(".subject-table input").value = "GWA: " + (gwa || 0); // Display GWA, if it's NaN, display 0
    } else {
        // If there are no rows, set GWA to empty
        document.querySelector(".subject-table input").value = "GWA: ";
    }
}


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get subject and grade values from the form
        let subject = document.getElementById("subject").value;
        let grade = parseInt(document.getElementById("grade").value);

        // Check if the grade is a valid number
        if (!isNaN(grade) && grade >= 0 && grade <= 100) {
            // Add a new row to the table
            let tableBody = document.querySelector(".subject-table tbody");
            let newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td id="subjectAdded">${subject}</td>
                <td id="gradeAdded">${grade}</td>
                <td><button class="btn btn-sm btn-danger" onclick="removeRow(this)">X</button></td>
            `;
            tableBody.appendChild(newRow);

            // Clear the form fields
            document.getElementById("subject").value = "";
            document.getElementById("grade").value = "";

            calculateGWA(); // Recalculate GWA after adding a new row
        } else {
            alert("Please enter a valid grade (0-100).");
        }
    });
});