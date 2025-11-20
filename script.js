
function formatMultiline(text) {
  return String(text || "").replace(/\n/g, "<br>");
}
let selectedFile = null;

// Show small thumbnail immediately when user selects a file
document.getElementById("profilePic").addEventListener("change", function(event) {
    selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const thumb = document.getElementById("thumbnailPreview");
            thumb.src = e.target.result;
            thumb.style.display = "inline-block";
        };
        reader.readAsDataURL(selectedFile);
    }
}); 
function updatePreview() {
  const get = id => document.getElementById(id).value;

  // Set basic info
  document.getElementById("previewName").textContent = get("name") || "Your Name";
  document.getElementById("previewBio").innerHTML = formatMultiline(get("bio")) || "Short bio will appear here.";

  // Skills
  const skills = get("skills").split(",").map(s => s.trim()).filter(s => s);
  const skillsList = document.getElementById("previewSkills");
  skillsList.innerHTML = "";
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  // Education and experience
  document.getElementById("previewEducation").innerHTML = formatMultiline(get("education"));
  document.getElementById("previewExperience").innerHTML = formatMultiline(get("experience"));

  // Project
  document.getElementById("previewProjectTitle").textContent = get("projectTitle");
  document.getElementById("previewProjectDesc").innerHTML = formatMultiline(get("projectDesc"));

  // Links
  const links = document.getElementById("previewLinks");
  links.innerHTML = "";
  if (get("linkedin")) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${get("linkedin")}" target="_blank">LinkedIn</a>`;
    links.appendChild(li);
  }
  if (get("github")) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${get("github")}" target="_blank">GitHub</a>`;
    links.appendChild(li);
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString(undefined, options);
  const dateEl = document.getElementById("date");
  const checkbox = document.getElementById("toggleDate");

  // Show date on load
  dateEl.textContent = today;

  // Toggle visibility
  checkbox.addEventListener("change", function () {
    dateEl.style.display = this.checked ? "block" : "none";
  });

  // Theme color
  const color = get("colorPicker");
  document.getElementById("preview").style.setProperty("--theme-color", color);

  //font style
   
   const selectedFont = document.getElementById("fontStyle").value;
    const previewSection = document.getElementById("preview-container"); 
    previewSection.style.fontFamily = selectedFont;

  //pp
  const img = document.getElementById("profilePreview");
  const showPic = document.getElementById("showProfilePic").checked;
  const shape = document.getElementById("picShape").value;
    if (selectedFile && showPic) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
            img.style.display = "block";

            img.className = ""; 
            if (shape === "circle") img.classList.add("pic-circle");
            else if (shape === "square") img.classList.add("pic-square");
            else if (shape === "rounded") img.classList.add("pic-rounded");
        };
        reader.readAsDataURL(selectedFile);
    } else {
        img.style.display = "none"; // hide if unchecked
    }
}

function downloadPDF() {
  const element = document.getElementById("preview");
  html2pdf().from(element).save("MyPortfolio.pdf");
}




