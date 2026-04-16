loadState();

// عناصر الصفحة
const upload = document.getElementById("pdfUpload");
const canvas = document.getElementById("pdfCanvas");
const ctx = canvas.getContext("2d");

const name = document.getElementById("name");
const phone = document.getElementById("phone");
const age = document.getElementById("age");
const district = document.getElementById("district");

// رفع PDF
upload.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = async function() {
    const typedarray = new Uint8Array(this.result);

    state.pdfDoc = await pdfjsLib.getDocument(typedarray).promise;
    state.totalPages = state.pdfDoc.numPages;

    renderPage(1);
  };

  reader.readAsArrayBuffer(file);
});

// عرض الصفحة
async function renderPage(num) {
  const page = await state.pdfDoc.getPage(num);

  const viewport = page.getViewport({ scale: 1.5 });
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({
    canvasContext: ctx,
    viewport: viewport
  }).promise;

  state.currentPage = num;
}

// حفظ البيانات
document.getElementById("studentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const student = {
    name: name.value,
    phone: phone.value,
    age: age.value,
    district: district.value,
    page: state.currentPage
  };

  state.students.push(student);
  saveState();
  renderList();
});

// عرض البيانات
function renderList() {
  const container = document.getElementById("dataList");
  container.innerHTML = "";

  state.students.forEach(s => {
    const div = document.createElement("div");
    div.innerText = `${s.name} - ${s.phone}`;
    container.appendChild(div);
  });
}

// الوضع الليلي
const toggle = document.getElementById("themeToggle");

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
}

toggle.onclick = () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", state.theme);
  applyTheme();
};

applyTheme();
renderList();
