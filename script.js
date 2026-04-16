const saveBtn = document.getElementById("saveBtn");
const studentList = document.getElementById("studentList");


let students = JSON.parse(localStorage.getItem("students")) || [];
renderStudents();


saveBtn.addEventListener("click", () => {
  const student = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    age: document.getElementById("age").value,
    district: document.getElementById("district").value
  };

  if (!student.name) return;

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  renderStudents();
  clearInputs();
});

function renderStudents() {
  studentList.innerHTML = "";
  students.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} | ${s.phone} | ${s.age} | ${s.district}`;
    studentList.appendChild(li);
  });
}

function clearInputs() {
  document.querySelectorAll("input").forEach(i => i.value = "");
}


const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});


const pdfUpload = document.getElementById("pdfUpload");
const canvas = document.getElementById("pdfCanvas");
const ctx = canvas.getContext("2d");

pdfUpload.addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function() {
    const typedArray = new Uint8Array(this.result);

    pdfjsLib.getDocument(typedArray).promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1.2 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({
          canvasContext: ctx,
          viewport: viewport
        });
      });
    });
  };
  reader.readAsArrayBuffer(file);
});
