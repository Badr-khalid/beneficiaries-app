const state = {
  students: [],
  currentPage: 1,
  pdfDoc: null,
  totalPages: 0,
  theme: localStorage.getItem("theme") || "light"
};

function saveState() {
  localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem("appState");
  if (saved) Object.assign(state, JSON.parse(saved));
}
