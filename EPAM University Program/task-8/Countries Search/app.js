const appRoot = document.getElementById('app-root');
const regions = externalService.getRegionsList();
const languages = externalService.getLanguagesList();
let header = document.createElement('header');
let title = document.createElement('h1');
let spanForTypeOfSearch = document.createElement('span');
let spanForSearchQuery = document.createElement('span');
let form = document.createElement('form');
let labelForRadioButtonByRegion = document.createElement('label');
let labelForRadioButtonByLanguage = document.createElement('label');
let labelForSelect = document.createElement('label');
let searchQuerySelect = document.createElement('select');
let option = document.createElement('option');
let bodyForTypeOfSearch = document.createElement('div');
let bodyForSearchQuery = document.createElement('div');
let bodyForRadioButtons = document.createElement('div');
let bodyForRadioButtonByRegion = document.createElement('div');
let bodyForRadioButtonByLanguage = document.createElement('div');
let tableForSort;
let colIndex = -1;

header.classList.add('header');

title.classList.add('title');
title.textContent = 'Countries Search';

spanForTypeOfSearch.textContent = 'Please choose the type of search:';
spanForSearchQuery.textContent = 'Please choose search query:';

labelForRadioButtonByRegion.setAttribute('for', 'Region');
labelForRadioButtonByRegion.innerHTML = `<input type="radio" id="Region" name="radio">By Region`;

bodyForRadioButtonByRegion.classList.add('bodyForRadioButtonByRegion');
bodyForRadioButtonByRegion.appendChild(labelForRadioButtonByRegion);

labelForRadioButtonByLanguage.setAttribute('for', 'Language');
labelForRadioButtonByLanguage.innerHTML = `<input type="radio" id="Language" name="radio">By Language`;

bodyForRadioButtonByLanguage.classList.add('bodyForRadioButtonByLanguage');
bodyForRadioButtonByLanguage.appendChild(labelForRadioButtonByLanguage);

searchQuerySelect.id = 'searchQuerySelect';
searchQuerySelect.required = true;

labelForSelect.textContent = 'Please choose search query:';
labelForSelect.setAttribute('for', 'searchQuerySelect');

option.textContent = 'Select value';

option.disabled = true;
option.selected = true;
option.hidden = true;
option.value = '';

searchQuerySelect.appendChild(option);

bodyForRadioButtons.classList.add('bodyForRadioButtons');
bodyForRadioButtons.appendChild(bodyForRadioButtonByRegion);
bodyForRadioButtons.appendChild(bodyForRadioButtonByLanguage);

bodyForTypeOfSearch.classList.add('bodyForTypeOfSearch');
bodyForTypeOfSearch.appendChild(spanForTypeOfSearch);
bodyForTypeOfSearch.appendChild(bodyForRadioButtons);

bodyForSearchQuery.classList.add('bodyForSearchQuery');
bodyForSearchQuery.appendChild(labelForSelect);
bodyForSearchQuery.appendChild(searchQuerySelect);

form.classList.add('formBody');
form.appendChild(bodyForTypeOfSearch);
form.appendChild(bodyForSearchQuery);

function createTable(data) {
  let table = document.createElement('table');
  let tableHeader = document.createElement('thead');
  let tableBody = document.createElement('tbody');
  let tr = document.createElement('tr');
  let countryName = document.createElement('th');
  let capital = document.createElement('th');
  let worldRegion = document.createElement('th');
  let countryLanguages = document.createElement('th');
  let area = document.createElement('th');
  let flag = document.createElement('th');

  countryName.innerHTML = `Country name<span class="country-arrow-body-up">
  </span><span class="country-arrow-body-down"></span>`;
  countryName.classList.add('country-arrow');
  countryName.setAttribute('data-type', 'text');
  countryName.id = '0';
  capital.textContent = 'Capital';
  worldRegion.textContent = 'World Region';
  countryLanguages.textContent = 'Languages';
  area.innerHTML = 'Area<span class="area-arrow-body-up"></span><span class="area-arrow-body-down"></span>';
  area.classList.add('area-arrow');
  area.id = '4';
  area.setAttribute('data-type', 'integer');
  flag.textContent = 'Flag';
  table.id = 'sortable';

  tr.appendChild(countryName);
  tr.appendChild(capital);
  tr.appendChild(worldRegion);
  tr.appendChild(countryLanguages);
  tr.appendChild(area);
  tr.appendChild(flag);

  tableHeader.appendChild(tr);
  table.appendChild(tableHeader);

  data.forEach((element) => {
    let tr = document.createElement('tr');
    let img = document.createElement('img');
    let countryName = document.createElement('td');
    let capital = document.createElement('td');
    let worldRegion = document.createElement('td');
    let countryLanguages = document.createElement('td');
    let area = document.createElement('td');
    let flag = document.createElement('td');

    countryName.append(element.name);
    capital.append(element.capital);
    worldRegion.append(element.region);
    countryLanguages.append(Object.values(element.languages));
    area.append(element.area);
    img.setAttribute('src', element.flagURL);
    img.setAttribute('alt', 'country flag');
    flag.append(img);

    tr.appendChild(countryName);
    tr.appendChild(capital);
    tr.appendChild(worldRegion);
    tr.appendChild(countryLanguages);
    tr.appendChild(area);
    tr.appendChild(flag);
    tableBody.appendChild(tr);
    table.appendChild(tableBody);
  });

  appRoot.appendChild(table);
  tableForSort = document.querySelector('#sortable');

  document.querySelector('.country-arrow-body-up').addEventListener('click', function (e) {
    e.currentTarget.style.display = 'none';
    document.querySelector('.country-arrow-body-down').style.display = 'block';
    document.querySelector('.area-arrow-body-up').style.display = 'block';
    document.querySelector('.area-arrow-body-down').style.display = 'block';
  });

  document.querySelector('.country-arrow-body-down').addEventListener('click', function (e) {
    e.currentTarget.style.display = 'none';
    document.querySelector('.country-arrow-body-up').style.display = 'block';
    document.querySelector('.area-arrow-body-up').style.display = 'block';
    document.querySelector('.area-arrow-body-down').style.display = 'block';
  });

  document.querySelector('.area-arrow-body-up').addEventListener('click', function (e) {
    e.currentTarget.style.display = 'none';
    document.querySelector('.country-arrow-body-up').style.display = 'block';
    document.querySelector('.area-arrow-body-down').style.display = 'block';
    document.querySelector('.country-arrow-body-down').style.display = 'block';
  });

  document.querySelector('.area-arrow-body-down').addEventListener('click', function (e) {
    e.currentTarget.style.display = 'none';
    document.querySelector('.area-arrow-body-up').style.display = 'block';
    document.querySelector('.country-arrow-body-up').style.display = 'block';
    document.querySelector('.country-arrow-body-down').style.display = 'block';
  });

  tableForSort.addEventListener('click', function (e) {
    const el = e.target;

    if (el.nodeName !== 'SPAN') {
      return;
    }

    const index = el.parentNode.id;
    const type = el.parentNode.getAttribute('data-type');

    tableSort(index, type, colIndex === index);
    colIndex = colIndex === index ? -1 : index;
  });
}

let noItems = document.createElement('p');
noItems.textContent = 'No items, please choose search query';
noItems.classList.add('noItems');

header.appendChild(title);
header.appendChild(form);

appRoot.appendChild(header);

function addToSelect(data) {
  
  option.disabled = false;
  option.selected = false;
  option.hidden = false;
  option.value = '';  
  document.querySelectorAll('.delete').forEach((el) => el.remove());

  data.forEach((element) => {
    let option = document.createElement('option');
    option.textContent = element;
    option.classList.add('delete');
    option.setAttribute('value', element);
    searchQuerySelect.appendChild(option);
  });
}

function checkItem() {
  let select = document.getElementById('searchQuerySelect').options.selectedIndex;
  let text = document.getElementById('searchQuerySelect').options[select].text;
  let itemToRemove = document.querySelector('p');

  if (itemToRemove === null) {
    if (text === 'Select value') {
      let p = document.createElement('p');
      p.textContent = 'No items, please choose search query';
      appRoot.appendChild(p);
    }
  }
}

document.getElementById('Region').addEventListener('click', function () {
  let item = document.querySelector('p');
  let table = document.querySelector('table');
  document.querySelector('#searchQuerySelect').style.color = 'black';

  if (item !== null) {
    item.remove();
  } else if (table !== null) {
    table.remove();
  }
  addToSelect(regions);
  checkItem();
});

document.getElementById('Language').addEventListener('click', function () {
  let item = document.querySelector('p');
  let table = document.querySelector('table');
  document.querySelector('#searchQuerySelect').style.color = 'black';

  if (item !== null) {
    item.remove();
  } else if (table !== null) {
    table.remove();
  }
  addToSelect(languages);
  checkItem();
});
document.querySelector('#searchQuerySelect').addEventListener('change', (e) => {
  const region = document.getElementById('Region').checked;
  const language = document.getElementById('Language').checked;
  const optionValue = e.target.value;
  const checkTable = document.querySelector('table');
  const warning = document.querySelector('p');

  if (checkTable) {
    checkTable.remove();
  } else if (warning) {
    warning.remove();
  }
  if (optionValue !== '') {
    if (region) {
      createTable(externalService.getCountryListByRegion(optionValue));
    } else if (language) {
      createTable(externalService.getCountryListByLanguage(optionValue));
    }
  }

  if (optionValue === '' && checkTable) {
    checkTable.remove();
    appRoot.appendChild(noItems);
  }
});

function tableSort(index, type, isSorted) {
  const tbody = document.querySelector('tbody');
  const table = document.querySelector('#sortable');

  const compare = (rowA, rowB) => {
    const rowDataA = rowA.cells[index].innerHTML;
    const rowDataB = rowB.cells[index].innerHTML;

    switch (type) {
      case 'integer':
        return rowDataA - rowDataB;

      case 'text':
        if (rowDataA < rowDataB) {
          return -1;
        } else if (rowDataA > rowDataB) {
          return 1;
        }
        return 0;
      default:
        break;
    }
  };

  let rows = [].slice.call(tbody.rows);

  rows.sort(compare);

  if (isSorted) {
    rows.reverse();
  }

  table.removeChild(tbody);

  for (let index = 0; index < rows.length; index++) {
    tbody.appendChild(rows[index]);
  }

  table.appendChild(tbody);
}
