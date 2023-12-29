const createCourseButton = document.getElementById("create-course");
const createCourseForm = document.querySelector(".create-course-form");
const createCourseNameInput = document.getElementById("course-name");

createCourseButton.addEventListener("click", () => {
  const currentDisplay = getComputedStyle(createCourseForm).display;
  createCourseForm.style.display = currentDisplay === "none" ? "block" : "none";
});

createCourseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Create the main div with class "card" and background color
  const cardDiv = document.createElement("div");
  cardDiv.className = "card course";
  cardDiv.style.backgroundColor = "#1b4242";

  // Create the card header div with class "card-header", white text color, and text content
  const cardHeaderDiv = document.createElement("div");
  cardHeaderDiv.className = "card-header";
  cardHeaderDiv.style.color = "white";
  cardHeaderDiv.textContent = createCourseNameInput.value;

  // Create the card body div
  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body";

  // Create the unordered list with class "list-group list-group-flush"
  const ulElement = document.createElement("ul");
  ulElement.className = "list-group list-group-flush link-list";

  // Create a button with class "btn btn-primary" and background color
  const buttonElement = document.createElement("button");
  buttonElement.type = "button";
  buttonElement.className = "btn btn-primary";
  buttonElement.style.backgroundColor = "#9ec8b9";
  buttonElement.style.border = "0";
  buttonElement.textContent = "Create Link";

  // Append the card header, unordered list, and button to the card body
  cardBodyDiv.appendChild(ulElement);
  cardBodyDiv.appendChild(buttonElement);

  // Append the card body to the main card div
  cardDiv.appendChild(cardHeaderDiv);
  cardDiv.appendChild(cardBodyDiv);

  // Append the main card div to the document body
  document.getElementById("container").appendChild(cardDiv);
  createCourseForm.style.display = "none";
});
