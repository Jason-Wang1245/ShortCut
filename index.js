const createCourseButton = document.getElementById("create-course");
const createCourseForm = document.querySelector(".create-course-form");
const createCourseNameInput = document.getElementById("course-name");
const editButton = document.getElementById("edit-mode");

editButton.addEventListener("click", () => {
  const editModeContainers = document.getElementsByClassName("edit-mode");
  for (let i = 0; i < editModeContainers.length; i++) {
    const currentDisplay = getComputedStyle(editModeContainers[i]).display;
    editModeContainers[i].style.display = currentDisplay === "none" ? "block" : "none";
  }
  if (editButton.firstChild.getAttribute("src") === "icons/edit-off.png") {
    editButton.firstChild.setAttribute("src", "icons/edit-on.png");
  } else {
    const currentDisplay = getComputedStyle(createCourseForm).display;
    createCourseForm.style.display = "none";
    editButton.firstChild.setAttribute("src", "icons/edit-off.png");
  }
});

createCourseButton.addEventListener("click", () => {
  const currentDisplay = getComputedStyle(createCourseForm).display;
  createCourseForm.style.display = currentDisplay === "none" ? "block" : "none";
});

createCourseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const courseId = crypto.randomUUID();

  // Create the main div with class "card" and background color
  const cardDiv = document.createElement("div");
  cardDiv.id = courseId;
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

  // Create the edit-mode div
  const editModeDiv = document.createElement("div");
  editModeDiv.className = "edit-mode";
  editModeDiv.style.display = "block";

  // Create the form element
  const formElement = document.createElement("form");

  // Create horizontal rule 
  const horizontalRule = document.createElement("hr");

  // Add horizontal rule to top of form
  formElement.appendChild(horizontalRule);

  // Create the div with class "mb-3"
  const mb3Div = document.createElement("div");
  mb3Div.className = "mb-3";

  // Create the label and input elements for "Link Name"
  const labelLinkName = document.createElement("label");
  labelLinkName.htmlFor = "link-name";
  labelLinkName.className = "form-label text-white";
  labelLinkName.textContent = "Link Name";

  const inputLinkName = document.createElement("input");
  inputLinkName.type = "text";
  inputLinkName.className = "form-control";
  inputLinkName.id = "linkName" + courseId;

  // Create the label and input elements for "Link"
  const labelLink = document.createElement("label");
  labelLink.htmlFor = "link";
  labelLink.className = "form-label text-white";
  labelLink.textContent = "Link";

  const inputLink = document.createElement("input");
  inputLink.type = "text";
  inputLink.className = "form-control";
  inputLink.id = "linkInput" + courseId;

  // Append the label and input elements to the mb-3 div
  mb3Div.appendChild(labelLinkName);
  mb3Div.appendChild(inputLinkName);
  mb3Div.appendChild(labelLink);
  mb3Div.appendChild(inputLink);

  // Create the bottom-row div
  const bottomRowDiv = document.createElement("div");
  bottomRowDiv.className = "bottom-row";

  // Create the "Add Link" button
  const btnAddLink = document.createElement("button");
  btnAddLink.type = "submit";
  btnAddLink.className = "btn btn-primary";
  btnAddLink.style.backgroundColor = "#9ec8b9";
  btnAddLink.style.border = "0";
  btnAddLink.textContent = "Add Link";
  btnAddLink.id = "add" + courseId;
  btnAddLink.onclick = addLink;

  // Create the "Delete Course" button
  const btnDeleteCourse = document.createElement("button");
  btnDeleteCourse.type = "button";
  btnDeleteCourse.className = "btn btn-danger";
  btnDeleteCourse.textContent = "Delete Course";
  btnDeleteCourse.id = "delete" + courseId;
  btnDeleteCourse.onclick = deleteCourse;

  // Append the buttons to the bottom-row div
  bottomRowDiv.appendChild(btnAddLink);
  bottomRowDiv.appendChild(btnDeleteCourse);

  // Append the mb-3 div and bottom-row div to the form element
  formElement.appendChild(mb3Div);
  formElement.appendChild(bottomRowDiv);

  // Append the form element to the edit-mode div
  editModeDiv.appendChild(formElement);

  // Append the card header, unordered list, and button to the card body
  cardBodyDiv.appendChild(ulElement);
  cardBodyDiv.appendChild(editModeDiv);

  // Append the card body to the main card div
  cardDiv.appendChild(cardHeaderDiv);
  cardDiv.appendChild(cardBodyDiv);

  // Append the main card div to the document body
  document.getElementById("container").appendChild(cardDiv);
  createCourseForm.style.display = "none";
});

const addLink = (event) => {
  event.preventDefault();
  const id = event.srcElement.id.substring(3);
  const linkList = document.getElementById(id).lastChild.firstChild;

  const linkId = crypto.randomUUID();

  var liElement = document.createElement("li");
  liElement.className = "list-group-item rounded-pill";
  liElement.style.backgroundColor = "#5c8374";
  liElement.style.border = "0";
  liElement.style.marginBottom = "0.5em";
  liElement.style.display = "flex";
  liElement.style.justifyContent = "space-between";
  liElement.id = "link" + linkId;

  // Create a element
  var aElement = document.createElement("a");
  aElement.className = "link-light link-offset-2 link-underline link-underline-opacity-0";
  aElement.href = document.getElementById("linkInput" + id).value;
  aElement.textContent = document.getElementById("linkName" + id).value;
  aElement.target = "_blank";

  // Create div element for edit mode
  var divEditMode = document.createElement("div");
  divEditMode.className = "edit-mode";
  divEditMode.style.display = "block";

  // Create button element
  var buttonElement = document.createElement("button");
  buttonElement.type = "button";
  buttonElement.className = "btn-close";
  buttonElement.setAttribute("data-bs-dismiss", "modal");
  buttonElement.setAttribute("aria-label", "Close");
  buttonElement.id = "linkDelete" + linkId;
  buttonElement.onclick = deleteLink;

  // Append elements to their respective parent elements
  divEditMode.appendChild(buttonElement);
  liElement.appendChild(aElement);
  liElement.appendChild(divEditMode);

  // Add li to linkList
  linkList.appendChild(liElement);
}

const deleteCourse = (event) => {
  const id = event.srcElement.id.substring(6);
  const courseElement = document.getElementById(id);
  courseElement.remove();
}

const deleteLink = (event) => {
  const linkElement = event.srcElement.parentNode.parentNode;
  linkElement.remove();
}