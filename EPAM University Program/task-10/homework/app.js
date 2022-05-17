const tweetItems = document.querySelector('#tweetItems');
const modifyItem = document.querySelector('#modifyItem');
const alertMessage = document.querySelector('#alertMessage');
const alertMessageText = document.querySelector('#alertMessageText');
const addTweet = document.querySelector('.addTweet');
const cancelModification = document.querySelector('#cancelModification');
const saveModifiedItem = document.querySelector('#saveModifiedItem');
const modifyItemInput = document.querySelector('#modifyItemInput');
const list = document.querySelector('#list');
let tweetId;


// Вивід твітів
function outputTweets() {
  const tweetsId = Object.keys(localStorage);
  const tweets = Object.values(localStorage);

  if (list.children) {
    list.textContent = '';
  }

  if (localStorage.length === 0) {
    return;
  } else {
    tweets.forEach((tweet, index) => {
      let li = document.createElement('li');
      let buttonRemove = document.createElement('button');
      let buttonLike = document.createElement('button');
      let buttoBody = document.createElement('div');
      let tweetText = document.createElement('p');

      tweetText.classList.add('tweet-text');
      buttoBody.classList.add('button__body');
      tweetText.textContent = tweet;
      buttonLike.classList.add('like');

      if (tweetsId[index].includes('liked_')) {
        buttonRemove.textContent = 'Remove';
        buttonRemove.classList.add('remove');

        buttonLike.textContent = 'Unlike';

        li.id = tweetsId[index];

        buttoBody.append(buttonRemove, buttonLike);
      } else {
        buttonRemove.textContent = 'Remove';
        buttonRemove.classList.add('remove');

        buttonLike.textContent = 'Like';

        li.id = tweetsId[index];

        buttoBody.append(buttonRemove, buttonLike);
      }
      li.append(tweetText, buttoBody);
      list.append(li);
    });

    list.childNodes.forEach((li) => {
      // Видалення твіту
      li.querySelector('.remove').addEventListener('click', (e) => {
        const tweetId = e.target.parentNode.parentNode.id;

        localStorage.removeItem(tweetId);
        e.target.parentNode.parentNode.remove();
        checkLikedTweet();
      });

      // Редагування твіту
      li.querySelector('.tweet-text').addEventListener('click', (e) => {
        tweetId = e.target.parentNode.id;

        history.pushState(null, 'Edit appropriate tweet',`#/edit/${tweetId}`);


        document.querySelector('#modifyItemHeader').textContent = 'Edit tweet';
        document.querySelector('#saveModifiedItem').textContent = 'Save changes';

        tweetItems.classList.toggle('hidden');
        modifyItem.classList.toggle('hidden');
      });

      // Лайкнуті твіти
      li.querySelector('.like').addEventListener('click', (e) => {
        const el = e.target;
        const tweetId = el.parentNode.parentNode.id;
        const tweetText = localStorage.getItem(tweetId);

        if (tweetId.includes('item_')) {
          const newTweetId = tweetId.replace('item_', 'liked_');

          localStorage.removeItem(tweetId);
          localStorage.setItem(newTweetId, tweetText);
          el.parentNode.parentNode.id = newTweetId;
          el.textContent = 'Unlike';

          alertMessageText.textContent = `Hooray! You liked tweet this id 
          ${parseInt(newTweetId.replace('liked_', ''))}!`;

          checkLikedTweet();
        } else {
          const newTweetId = tweetId.replace('liked_', 'item_');

          localStorage.removeItem(tweetId);
          localStorage.setItem(newTweetId, tweetText);
          el.parentNode.parentNode.id = newTweetId;
          el.textContent = 'Like';

          alertMessageText.textContent = `Sorry you no longer like
          tweet with id ${parseInt(newTweetId.replace('item_', ''))}!`;

          checkLikedTweet();
        }

        alertMessage.classList.toggle('hidden');

        setTimeout(() => {
          alertMessage.classList.toggle('hidden');
        }, 2000);
      });
    });
  }
}
// Вивід лайкнутих твітів
function outputLikedTweets() {
  const tweetsId = Object.keys(localStorage);
  let likedTwetsId = []; 
  let likedTwets = []; 

  tweetsId.forEach(el => {
    if (el.includes('liked_')){
      likedTwetsId.push(el);
      likedTwets.push(localStorage.getItem(el));
    }
  });
  if (list.children) {
    list.textContent = '';
  }

  if (localStorage.length === 0) {
    return;
  } else {
    likedTwets.forEach((tweet, index) => {
      let li = document.createElement('li');
      let buttonRemove = document.createElement('button');
      let buttonLike = document.createElement('button');
      let buttoBody = document.createElement('div');
      let tweetText = document.createElement('p');

      tweetText.classList.add('tweet-text');
      buttoBody.classList.add('button__body');
      tweetText.textContent = tweet;
      buttonLike.classList.add('like');

      buttonRemove.textContent = 'Remove';
      buttonRemove.classList.add('remove');

      buttonLike.textContent = 'Unlike';

      li.id = likedTwetsId[index];

      buttoBody.append(buttonRemove, buttonLike);

      li.append(tweetText, buttoBody);
      list.append(li);
    }); 

    list.childNodes.forEach((li) => {
      // Видалення твіту
      li.querySelector('.remove').addEventListener('click', (e) => {
        const tweetId = e.target.parentNode.parentNode.id;

        localStorage.removeItem(tweetId);
        e.target.parentNode.parentNode.remove();
        checkLikedTweet();
      });

      // Редагування твіту
      li.querySelector('.tweet-text').addEventListener('click', (e) => {
        tweetId = e.target.parentNode.id;
        history.pushState(null, 'Edit appropriate tweet',`#/edit/${tweetId}`);


        document.querySelector('#modifyItemHeader').textContent = 'Edit tweet';
        document.querySelector('#saveModifiedItem').textContent = 'Save changes';

        tweetItems.classList.toggle('hidden');
        modifyItem.classList.toggle('hidden');
      });

      // Лайкнуті твіти
      li.querySelector('.like').addEventListener('click', (e) => {
        const el = e.target;
        const tweetId = el.parentNode.parentNode.id;
        const tweetText = localStorage.getItem(tweetId);

        if (tweetId.includes('item_')) {
          const newTweetId = tweetId.replace('item_', 'liked_');

          localStorage.removeItem(tweetId);
          localStorage.setItem(newTweetId, tweetText);
          el.parentNode.parentNode.id = newTweetId;
          el.textContent = 'Unlike';

          alertMessageText.textContent = `Hooray! You liked tweet this id 
          ${parseInt(newTweetId.replace('liked_', ''))}!`;

          checkLikedTweet();
        } else {
          const newTweetId = tweetId.replace('liked_', 'item_');

          localStorage.removeItem(tweetId);
          localStorage.setItem(newTweetId, tweetText);
          el.parentNode.parentNode.id = newTweetId;
          el.textContent = 'Like';

          alertMessageText.textContent = `Sorry you no longer like
          tweet with id ${parseInt(newTweetId.replace('item_', ''))}!`;

          checkLikedTweet();
        }

        alertMessage.classList.toggle('hidden');

        setTimeout(() => {
          alertMessage.classList.toggle('hidden');
        }, 2000);
      });
    });
  }
}

// Перевірка водобаних твітів
function checkLikedTweet() {
  const btnLikedTweets = document.createElement('button');
  let likedTweetCounter = 0;
  btnLikedTweets.id = 'liked-tweets';
  btnLikedTweets.textContent = 'Go to liked';
  let btnBack = document.createElement('button');
  btnBack.id = 'back';
  btnBack.textContent = 'Back';

  Object.keys(localStorage).forEach((id) => {
    if (/liked_/g.test(id)) {
      likedTweetCounter += 1;
    }
  });

  if (likedTweetCounter > 0) {
    if (document.querySelector('#liked-tweets')) {
      document.querySelector('#liked-tweets').remove();
      document.querySelector('#navigationButtons').style.justifyContent = 'space-between';
    }
    document.querySelector('#navigationButtons').append(btnLikedTweets);
    document.querySelector('#navigationButtons').style.justifyContent ='space-between';

    document.querySelector('#liked-tweets').addEventListener('click', (e) => {
      e.target.classList.add('hidden');
      addTweet.classList.toggle('hidden');
      
      history.pushState(null, 'Liked tweet',`#/liked`);

      document.querySelector('#navigationButtons').style.justifyContent = 'center';
      document.querySelector('#navigationButtons').append(btnBack);
      outputLikedTweets();
    });

    btnBack.addEventListener('click', (e) => {
      addTweet.classList.toggle('hidden');

      history.back();

      document.querySelector('#navigationButtons').style.justifyContent = 'center';
      e.target.remove();
      outputTweets();
    });
  } else {
    document.querySelector('#navigationButtons').style.justifyContent =
      'center';

    if (document.querySelector('#liked-tweets')) {
      document.querySelector('#liked-tweets').remove();
    }
    
 
  }
}


// Провірка твіту на пустоту
function isEmpty(userString) {
  if (userString.trim() === '') {
    return true;
  }
  return false;
}

// Провірка на дублікат
function duplicateСheck(tweet, element) {
  const values = Object.values(localStorage);
  const tweetLength = tweet.length;

  if (tweetLength > 140) {
    element.setAttribute('disabled', 'disabled');

    alertMessageText.textContent = 'Error! Your tweet is too long';

    alertMessage.classList.toggle('hidden');
    modifyItemInput.style.borderColor = 'red';

    setTimeout(() => {
      alertMessage.classList.toggle('hidden');
    }, 2000);

    return false;
  } else if (values.includes(tweet)) {
    alertMessageText.textContent = "Error! You can't tweet about that";
    alertMessage.classList.toggle('hidden');

    element.setAttribute('disabled', 'disabled');
    modifyItemInput.style.borderColor = 'red';

    setTimeout(() => {
      alertMessage.classList.toggle('hidden');
    }, 2000);

    return false;
  } else {
    return true;
  }
}


console.log(window.location.hash.substring(1))
document.addEventListener('DOMContentLoaded', () => {
  outputTweets();
  checkLikedTweet();
  history.pushState(null, 'Main page','/');

});

// Провірка textarea
modifyItemInput.addEventListener('input', () => {
  modifyItemInput.style.borderColor = 'black';
  saveModifiedItem.removeAttribute('disabled');
});

// Перейти до сторінки "Add tweet"
addTweet.addEventListener('click', () => {
  modifyItemInput.value = null;

  modifyItem.classList.toggle('hidden');
  tweetItems.classList.toggle('hidden');

  document.querySelector('#modifyItemHeader').textContent = 'Add tweet';
  document.querySelector('#saveModifiedItem').textContent = 'Add';

  history.pushState(null, 'Add tweet','#/add');
});

// Перейти до сторінки "Main page"
cancelModification.addEventListener('click', () => {
  modifyItemInput.value = null;
  modifyItemInput.style.borderColor = 'black';

  outputTweets();

  modifyItem.classList.toggle('hidden');
  tweetItems.classList.toggle('hidden');

  history.back();

});

// Зберегти зміни
saveModifiedItem.addEventListener('click', (event) => {
  const userTweet = modifyItemInput.value;
  const element = event.target;
  const lengthLocalStorage = localStorage.length;

  history.back();


  if (event.target.textContent === 'Add') {
    if (isEmpty(userTweet)) {
      alertMessageText.textContent = 'Error! Your tweet is empty';
      alertMessage.classList.toggle('hidden');

      modifyItemInput.style.borderColor = 'red';

      setTimeout(() => {
        alertMessage.classList.toggle('hidden');
      }, 2000);
    } else if (duplicateСheck(userTweet, element)) {
      localStorage.setItem(`item_${lengthLocalStorage + 1}`, userTweet);

      modifyItem.classList.toggle('hidden');
      tweetItems.classList.toggle('hidden');

      outputTweets();
    }
  } else {
    if (duplicateСheck(userTweet, element)) {
      const newTweet = document.querySelector('#modifyItemInput').value;
      localStorage.setItem(tweetId, newTweet);

      modifyItem.classList.toggle('hidden');
      tweetItems.classList.toggle('hidden');

      outputTweets();
    }
  }
});
