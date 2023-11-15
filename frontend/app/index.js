document.addEventListener("DOMContentLoaded", function () {
    // Function to get questions from local storage
    function getQuestionsFromLocalStorage() {
        const storedQuestions = localStorage.getItem("questions");
        return storedQuestions ? JSON.parse(storedQuestions) : [];
    }

    // Function to save questions to local storage
    function saveQuestionsToLocalStorage(questions) {
        localStorage.setItem("questions", JSON.stringify(questions));
    }

    // Function to display questions in the table
    function displayQuestions() {
        const questionTableBody = document.querySelector("table tbody");
        questionTableBody.innerHTML = "";

        const questions = getQuestionsFromLocalStorage();

        questions.forEach((question, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td class="question-id">${index + 1}</td>
            <td class="question-title">${question.title}</td>
            <td>${question.complexity}</td>
            <td>${question.category}</td>
            <td><button class="delete-button" data-index="${index + 1}">Delete</button></td> <!-- Add data-index attribute -->
            `;

            // Add an id to each row for easier manipulation
            // row.setAttribute("id", `question-row-${index}`);

            // Add a click event listener to the row
            row.addEventListener("click", function () {
                displayQuestionDetails(question); // Call function to display details
            });

            // Add a click event listener to the delete button
            row.querySelector(".delete-button").addEventListener("click", function () {
                deleteQuestion(index); // Call function to delete question
            });

            questionTableBody.appendChild(row);
        });
    }


    // Function to delete a question
    function deleteQuestion(index) {
        const questions = getQuestionsFromLocalStorage();

    if (index >= 0 && index < questions.length) {
        const confirmationModal = document.getElementById("confirmationModal");
        const confirmDeleteButton = document.getElementById("confirmDeleteButton");
        const cancelDeleteButton = document.getElementById("cancelDeleteButton");

        // Show the confirmation modal
        confirmationModal.style.display = "block";

        // Handle the "Yes" button click
        confirmDeleteButton.onclick = function () {
            // Remove the question at the specified index
            questions.splice(index, 1);

            // Update the IDs of the remaining questions
            for (let i = index; i < questions.length; i++) {
                questions[i].id = i + 1;
            }

            // Save the updated questions to local storage
            saveQuestionsToLocalStorage(questions);

            // Refresh the question list
            displayQuestions();

            // Close the confirmation modal
            confirmationModal.style.display = "none";
        };

        // Handle the "No" button click
        cancelDeleteButton.onclick = function () {
            // Close the confirmation modal without deleting the question
            confirmationModal.style.display = "none";
        };
    }
    }

    // Function to display question details
    function displayQuestionDetails(question) {
        const detailsContainer = document.querySelector(".question-details");

        // Replace newline characters with <br> tags and preserve indentation
        const descriptionHTML = question.description.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
    
        // Create a template for displaying question details
        const detailsHTML = `
            <h2>${question.id}. ${question.title}</h2>
            <p><strong>Description:</strong><br>${descriptionHTML}</p>
            <p><strong>Complexity:</strong> ${question.complexity}</p>
            <p><strong>Category:</strong> ${question.category}</p>
        `;

        detailsContainer.innerHTML = detailsHTML;
}

    // Function to check if a question with the same title already exists
    function isDuplicateQuestion(title, questions) {
        return questions.some((question) => question.title === title);
    }

    // Handle form submission to add a new question
    const addQuestionForm = document.getElementById("questionForm");
    addQuestionForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Retrieve form values
        // const id = document.getElementById("question").value;
        const title = document.getElementById("questionTitle").value;
        const description = document.getElementById("questionDescription").value;
        const category = document.getElementById("questionCategory").value;
        const complexity = document.querySelector("select[name='questionComplexity']").value;

        // Check if the title is empty or contains only whitespace
        if (title.trim() === "") {
            alert("Title cannot be empty.");
            return; // Exit the function without adding the question
        }

        // Get the existing questions from local storage
        const questions = getQuestionsFromLocalStorage();

        // Check if a question with the same title already exists
        if (isDuplicateQuestion(title, questions)) {
            alert("A question with the same title already exists. Please enter a unique title.");
            return; // Exit the function without adding the question
        }

        // Create a new question object
        const newQuestion = {
            id: questions.length + 1, // Assign the next available ID
            title,
            description,
            category,
            complexity,
        };

        // Add the new question to the existing questions
        questions.push(newQuestion);

        // Save the updated questions to local storage
        saveQuestionsToLocalStorage(questions);

        // Clear form fields
        addQuestionForm.reset();

        // Refresh the question list
        displayQuestions();
    });

    // Clear all questions from local storage
    const clearAllButton = document.getElementById("clearAllButton");
    clearAllButton.addEventListener("click", function () {
        localStorage.removeItem("questions");
        // Clear the content of the question details container
        const questionDetailsContainer = document.getElementById("questionDetailsContainer");
        questionDetailsContainer.innerHTML = "";
        
        // Refresh the question list
        displayQuestions();
    });

    // // Function to display questions from local storage in the table
    // function displayQuestionsFromLocalStorage() {
    //     const questionTableBody = document.getElementById("questionTableBody");
    //     questionTableBody.innerHTML = "";
    //     const questions = getQuestionsFromLocalStorage(); 
    //     questions.forEach((question, index) => {
    //         const row = document.createElement("tr");
    //         row.innerHTML = `
    //             <td>${question.id}</td>
    //             <td>${question.title}</td>
    //             <td>${question.complexity}</td>
    //             <td>${question.category}</td>
    //         `;

    //         questionTableBody.appendChild(row);
    //     });
    // }

    // Button to check local storage content
    const checkLocalStorageButton = document.getElementById("checkLocalStorageButton");
    checkLocalStorageButton.addEventListener("click", function () {
        const content = localStorage.getItem("questions");
        if (content) {
            console.log(JSON.parse(content));
        } else {
            console.log("Local storage is empty.");
        }
        // displayQuestionsFromLocalStorage();
    });

    // Display initial list of questions
    displayQuestions();
});
