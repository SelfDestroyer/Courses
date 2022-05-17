function visitLink(path) {
  const pages = ['Page1', 'Page2', 'Page3'];
  pages.forEach((element) => {
    if (localStorage.getItem(element) === null) {
      localStorage.setItem(element, 0);
    }
  });
  if (path === 'Page1') {
    localStorage.setItem('Page1', +localStorage.getItem('Page1') + 1);
  } else if (path === 'Page2') {
    localStorage.setItem('Page2', +localStorage.getItem('Page2') + 1);
  } else if (path === 'Page3') {
    localStorage.setItem('Page3', +localStorage.getItem('Page3') + 1);
  }
}
console.log(visitLink());

function viewResults() {
  let div = document.querySelector('.mx-auto');
 
  function inputResult() {
    let list = document.createElement('ul');
    let data = [];

    list.classList.add('result');

    for (let index = 0; index < localStorage.length; index++) {
      data[index] = localStorage.key(index);
    }

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let item = document.createElement('li');

      item.innerHTML = `You visited ${element} ${localStorage.getItem(element)} time(s)`;
      list.append(item);
      console.log(localStorage.getItem(element));
    }

    div.append(list);
    localStorage.clear();
  }

  if (div) {
    inputResult();
  }
}

console.log(viewResults());
