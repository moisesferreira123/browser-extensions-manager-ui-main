let extensions = [];
let whichToShow = 'all';
const extensionsGrid = document.querySelector('.extensions-grid');
const allButton = document.getElementById('all');
const activeButton = document.getElementById('active');
const inactiveButton = document.getElementById('inactive');

async function getData() {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();
    extensions = [...data];
    showExtensions(extensions);
  } catch(e) {
    throw new Error("Erro ao processar data.json");
  }
}

function showExtensions(extensionsToShow) { 
  const html = extensionsToShow.map((extension, index) => { 
    if(whichToShow === 'active' && !extension.isActive) return;
    if(whichToShow === 'inactive' && extension.isActive) return;
    return `
      <div id="extension-${index}" class="extension">
        <div class="extension-header">
          <img src="${extension.logo}" alt="" width="40">
          <div class="extension-informations">
            <h3>${extension.name}</h3>
            <p>${extension.description}</p>
          </div>
        </div>
        <div class="extension-footer">
          <button class="remove-button">Remove</button>
          <div class="switch-toggle">
            <input class="yep" type="checkbox" id="switch-${index}" ${extension.isActive ? 'checked' : ''}>
            <label for="switch-${index}"></label>
          </div>
        </div>
      </div>
    `;
  }).join('');
  extensionsGrid.innerHTML = html;
}

function changeToAll() {
  whichToShow = 'all';
  if(!allButton.classList.contains('selected-button')) {
    const currentSelectedButton = document.querySelector('.selected-button');
    currentSelectedButton.classList.remove('selected-button');
    allButton.classList.add('selected-button');
    showExtensions(extensions);
  }
}

function changeToActive() {
  whichToShow = 'active';
  if(!activeButton.classList.contains('selected-button')) {
    const currentSelectedButton = document.querySelector('.selected-button');
    currentSelectedButton.classList.remove('selected-button');
    activeButton.classList.add('selected-button');
    showExtensions(extensions);
  }
}

function changeToInactive() {
  whichToShow = 'inactive';
  if(!inactiveButton.classList.contains('selected-button')) {
    const currentSelectedButton = document.querySelector('.selected-button');
    currentSelectedButton.classList.remove('selected-button');
    inactiveButton.classList.add('selected-button');
    showExtensions(extensions);
  }
}

document.addEventListener('change', (event) => {
  const index = event.target.id.split('-')[1];
  if(event.target.checked) {
    extensions[index].isActive = true;
    if(whichToShow === 'inactive') {
      setTimeout(() => {
        showExtensions(extensions);
      }, 1000);
    }
  } else {
    extensions[index].isActive = false;
    if(whichToShow === 'active') {
      setTimeout(() => {
        showExtensions(extensions);
      }, 1000);
    }
  }
});

document.addEventListener('click', (event) => {
  if(event.target.matches('.remove-button')) {
    const extension =  event.target.closest('.extension');
    const extensionId = Number(extension.id.split('-')[1]);
    extensions.splice(extensionId, 1);
    showExtensions(extensions);
  }
});

allButton.addEventListener('click', changeToAll);

activeButton.addEventListener('click', changeToActive);

inactiveButton.addEventListener('click', changeToInactive);

getData();
