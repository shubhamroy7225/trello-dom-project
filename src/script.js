const boardId = '5e63972c165ed75837428f51';
//get list id when post a list on postman
const listId = '5e65e3a0c01ad95d98f5115f';
//get token from trello-id whitch is given by trello
// You have granted access to your Trello account via the token below
const token =
  '587069056c3279db10d87edbc6c0064045e19a535180a020a4d37c65eb9f0803';
//get key from trello-id whitch is given by trello
const key = 'ec2e426a10bafa63878b9591f8b93a00';

  //fetch the board_id
  fetch(`https://api.trello.com/1/members/me/boards?fields=name,url&key=${key}&token=${token}`, {
    method: 'GET'
    })
    .then(response => { 
    console.log(
    `Response: ${response.status} ${response.statusText}`
    );
    return response.json();
    
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));


    // fetch(`https://api.trello.com/1/lists/5e4e167f34964b32162b4fc4?key=${key}&token=${token}`, {
    //     method: 'GET'
    //     })
    //     .then(response => {
    //     console.log(
    //     `Response: ${response.status} ${response.statusText}`
    //     );
    //     //return response.json();
        
    //     })
    //     .then(text => console.log(text))
    //     .catch(err => console.error(err));

  

//create event for addButton
var mainButton = document.querySelector('.addButton');
mainButton.addEventListener('click', openInputDiv);

//function for open inputDiv
function openInputDiv(event) {
  event.target.parentElement.style.display = 'none';
  document.querySelector('.hideDiv').style.display = 'block';
}

//create event for add card
var addButton = document.querySelector('.hideButton');
addButton.addEventListener('click', addNewCard);

//function for create and post new card
function addNewCard(event) {
  var inputElement = document.querySelector('.input');
  console.log(inputElement.value);
  if (inputElement.value.trim() !== '') {
    fetch(
      `https://api.trello.com/1/cards?name=${inputElement.value}&idList=${listId}&keepFromSource=all&key=${key}&token=${token}`,
      {
        method: 'POST'
      }
    )
      .then(data => data.json())
      .then(data => {
        var projectTitle = document.createElement('div');
        projectTitle.setAttribute('data-toggle', 'modal'); //it is use for open modal with respective card
        projectTitle.setAttribute('data-target', `#${data.id}`);
        projectTitle.setAttribute('cardId', data.id);
        projectTitle.setAttribute('cardName', data.name);
        projectTitle.classList = 'card';
        projectTitle.innerHTML =
          projectTitle.innerHTML +
          inputElement.value +
          `<div>
          <button class="deleteButton btn btn-danger btn-xsm">x</button>
        </div>`;
        var allCards = document.querySelector('.allCards');
        allCards.appendChild(projectTitle);
        inputElement.value = '';
      });
  }
}

//close input block
var hideButton1 = document.querySelector('.hideButton1');
hideButton1.addEventListener('click', closeInputBlock);

//function for close inputDiv
function closeInputBlock(event) {
  var inputItem = document.querySelector('.input');
  event.target.parentElement.parentElement.style.display = 'none';
  // document.querySelector('.hideDiv').style.display = 'none';
  document.querySelector('.addButton').parentElement.style.display = 'block';
  inputItem.value = '';
}

//Get all cards from trello dataBase and display
function getAllCard() {
  fetch(
    `https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`,
    {
      method: 'GET'
    }
  )
    .then(data => data.json())
    // .then(data => console.log(data));
    .then(data =>
      data.forEach(element => {
        var projectTitle = document.createElement('div');
        projectTitle.classList = 'card';
        projectTitle.setAttribute('cardId', element.id);
        projectTitle.setAttribute('cardName', element.name);
        projectTitle.setAttribute('data-toggle', 'modal');
        projectTitle.setAttribute('data-target', `#${element.id}`);
        projectTitle.innerHTML =
          projectTitle.innerHTML +
          element.name +
          `<div>
              <button class="deleteButton btn btn-danger btn-xsm">x</button>
            </div>`;
        var allCards = document.querySelector('.allCards');
        allCards.appendChild(projectTitle);
      })
    );
}
getAllCard();

//create event for delete Button
var cardList = document.querySelector('.allCards');
cardList.addEventListener('click', deleteCard);

//function for delete card
function deleteCard(event) {
  if (event.target.classList.value === 'deleteButton btn btn-danger btn-xsm') {
    var cardId = event.target.parentElement.parentElement.getAttribute(
      'cardId'
    );
    fetch(
      `https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`,
      {
        method: 'DELETE'
      }
    ).then(
      () => (event.target.parentElement.parentElement.style.display = 'none')
    );
    event.stopPropagation();
  }
}
//create event for popUp
cardList.addEventListener('click', popUpCheckList);

//function for open checkList
function popUpCheckList(event) {
  if (event.target.classList.value == 'card') {
    var card = document.querySelector('.modal');
    //set id attribute for respective card modal
    modelId = card.setAttribute('id', event.target.getAttribute('cardId'));
    document.querySelector(
      '.modal-title'
    ).innerText = event.target.getAttribute('cardName');
    //function call for get all check lists
    getAllCheckList(event.target.getAttribute('cardId'));
  }
}




    