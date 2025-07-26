let extensions = [];
const extensionsGrid = document.querySelector('.extensions-grid');

async function getData() {
  try {
    const response = await fetch("../data.json");
    extensions = response.json();
  } catch(e) {
    throw new Error("Erro ao processar data.json");
  }
}

getData();

// Criar primeiro um exemplo de extensão
extensions.map((extension, index) => 
  ``
);