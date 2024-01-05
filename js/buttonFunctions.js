const addLink = (event) => {
    event.preventDefault();
    const id = event.srcElement.id.substring(3);
    const linkList = document.getElementById(id).lastChild.firstChild;

    const linkNameError = document.getElementById("linkNameError" + id);
    const linkError = document.getElementById("linkError" + id);
    const linkNameInput = document.getElementById("linkName" + id).value.trim();
    let linkInput = document.getElementById("linkInput" + id).value.trim();
  
    // Error check of validity of Link Name input
    if (linkNameInput === "") {
      linkNameError.style.display = "block";
      return;
    } else {
      linkNameError.style.display = "none";
    }

    // Error check of validity of Link input
    if (!linkInput.includes(".")){
      linkError.style.display = "block";
      return;
    } else {
      linkError.style.display = "none";
    }

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
    if (!linkInput.startsWith("https://")){
      linkInput = "https://" + linkInput;
    } 
    aElement.href = linkInput;
    aElement.textContent = linkNameInput;
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

    // Clear input element values
    document.getElementById("linkName" + id).value = "";
    document.getElementById("linkInput" + id).value = "";
  
    // Add li to linkList
    linkList.appendChild(liElement);
    updateLocalStorage();
  }
  
  const deleteCourse = (event) => {
    const id = event.srcElement.id.substring(6);
    const courseElement = document.getElementById(id);
    courseElement.remove();
    updateLocalStorage();
  }
  
  const deleteLink = (event) => {
    const linkElement = event.srcElement.parentNode.parentNode;
    linkElement.remove();
    updateLocalStorage();
  }