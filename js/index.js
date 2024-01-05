const createCourseButton = document.getElementById("create-course");
const createCourseForm = document.querySelector(".create-course-form");
const createCourseNameInput = document.getElementById("course-name");
const createCourseError = document.getElementById("create-course-error");
const editButton = document.getElementById("edit-mode");
const deleteButton = document.getElementById("delete");
const courses = document.getElementById("courses");

if (window.performance){
  courses.innerHTML = localStorage.getItem("courses");
  const editModeElements = document.getElementsByClassName("edit-mode");
  // Ensures all edit mode elements are off
  for (let i = 0; i < editModeElements.length; i++){
    editModeElements[i].style.display = "none";
  }
  // Ensures all Add Link and Delete Course buttons have their onclick functions setup
  const courseEditButtons = document.getElementsByClassName("bottom-row");
  for (let i = 0; i < courseEditButtons.length; i++){
    courseEditButtons[i].firstElementChild.onclick = addLink;
    courseEditButtons[i].lastElementChild.onclick = deleteCourse;
  }
  // Ensures all Delete Link (X) buttons have their onclick functions setup
  const deleteLinkButtons = document.getElementsByClassName("btn-close");
  for (let i = 0; i < deleteLinkButtons.length; i++){
    deleteLinkButtons[i].onclick = deleteLink;
  }
}

const updateLocalStorage = () => {
  localStorage.setItem("courses", courses.innerHTML);
}