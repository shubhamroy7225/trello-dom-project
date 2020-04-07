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
console.log(cardId)
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
function popUpCheckList(event){
  if (event.target.classList.value == 'card'){
    var card = document.querySelector('.modal');
    //set id attribute for respective card modal
    modelId = card.setAttribute('id', event.target.getAttribute('cardId'));
    document.querySelector(
      '.modal-title'
    ).innerText = event.target.getAttribute('cardName');
    //function call for get all check lists
    // getAllCheckList(event.target.getAttribute('cardId'));
  }
}

//create event for new check list
var newCheckListButton = document.querySelector('.newCheckListButton');
newCheckListButton.addEventListener('click', openCheckListInput);

//function for open check list input
function openCheckListInput(event) {
  event.target.style.display = 'none';
  document.querySelector('.checkListInputDiv').style.display = 'block';
}

//create event for close input
var checkListCloseButton = document.querySelector('.checkListCloseButton');
checkListCloseButton.addEventListener('click', closeCheckListInput);

//function for close checklist input
function closeCheckListInput(event) {
  event.target.parentElement.parentElement.style.display = 'none';
  document.querySelector('.newCheckListButton').style.display = 'block';
}

//create event for add checkList
var checkListAddButton = document.querySelector('.checkListAddButton');
checkListAddButton.addEventListener('click', addCheckList);

//funtion for add checkList
function addCheckList(event) {
  var checkListInputTag = document.querySelector('.checkListInputTag');
  console.log(checkListInputTag.value);
  var cardId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
    'id'
  );
  if (checkListInputTag.value.trim() != '') {
    fetch(
      `https://api.trello.com/1/checklists?idCard=${cardId}&name=${checkListInputTag.value}&key=${key}&token=${token}`,
      {
        method: 'POST'
      }
    )
      .then(data => data.json())
      .then(data => {
        var newCheckList = document.createElement('div');
        newCheckList.setAttribute('id', data.id);
        newCheckList.classList = 'checkL';
        newCheckList.innerHTML =
          newCheckList.innerHTML +
          data.name +
          `<div class="itemsContainer"></div>
          <div class='buttonsOfCheckList'><div>
          
          <button class="deleteButtonForCheckList btn btn-danger btn-xsm">x</button>
        </div>
        <div>
          <button class="addButtonForCheckItem btn btn-primary btn-xsm">add items</button>
        </div>
        </div>
        <div class=itemInputDiv><input class="itemInput">
        <div class='buttonsOfCheckItems'><div>
          <button class="deleteButtonForCheckItem btn btn-danger btn-xsm">x</button>
        </div>
        <div>
          <button class="addCheckItem btn btn-success btn-xsm">add New item</button>
        </div>
        </div></div>
        `;
        var checkListContainer = document.querySelector('.checkListContainer');
        console.log(checkListContainer);
        checkListContainer.appendChild(newCheckList);
        //console.log(checkListDiv);
        checkListInputTag.value = '';
      });
  }
}

//function for get all checkLists
function getAllCheckList(cardId) {
  fetch(
    `https://api.trello.com/1/cards/${cardId}/checklists?checkItems=all&checkItem_fields=name%2CnameData%2Cpos%2Cstate&filter=all&fields=all&key=${key}&token=${token}`
  )
    .then(data => data.json())
    .then(data => {
      var checkListContainer = document.querySelector('.checkListContainer');
      checkListContainer.innerHTML = '<p><p>'; //create empty checkList container
      data.forEach(element => {
        var newCheckList = document.createElement('div');
        newCheckList.setAttribute('id', element.id);
        newCheckList.classList = 'checkL';
        newCheckList.innerHTML =
          newCheckList.innerHTML +
          element.name +
          `<div class="itemsContainer"></div>
          <div class='buttonsOfCheckList'><div>
          
          <button class="deleteButtonForCheckList btn btn-danger btn-xsm">x</button>
        </div>
        <div>
          <button class="addButtonForCheckItem btn btn-primary btn-xsm">add items</button>
        </div>
        </div>
        <div class=itemInputDiv><input class="itemInput">
        <div class='buttonsOfCheckItems'><div>
          <button class="deleteButtonForCheckItem btn btn-danger btn-xsm">x</button>
        </div>
        <div>
          <button class="addCheckItem btn btn-success btn-xsm">add New item</button>
        </div>
        </div></div>
        `;
        var checkListContainer = document.querySelector('.checkListContainer');
        console.log(checkListContainer);
        checkListContainer.appendChild(newCheckList);
        getAllCheckItems(element.id, cardId);
      });
    });
}

//create event for required selector checkList
var checkListContainer = document.querySelector('.checkListContainer');
checkListContainer.addEventListener('click', selector);

//selector function
function selector(event) {
  if (
    //event for delete checkList
    event.target.classList.value ==
    'deleteButtonForCheckList btn btn-danger btn-xsm'
  ) {
    deleteCheckList(event);
  } else if (
    //event for open item input div
    event.target.classList.value ==
    'addButtonForCheckItem btn btn-primary btn-xsm'
  ) {
    openItemInput(event);
  } else if (
    //event for add check list
    event.target.classList.value == 'addCheckItem btn btn-success btn-xsm'
  ) {
    addCheckItem(event);
  } else if (
    event.target.classList.value ==
    'deleteButtonForCheckItem btn btn-danger btn-xsm'
  ) {
    closeItemInput(event);
  } else if (
    event.target.classList.value ==
    'btn btn-default btn-default btn-xsm pull-right deleteButtonForItem'
  ) {
    deleteCheckItem(event);
  } else if (event.target.classList.value == 'checkBox') {
    checkItemStatus(event);
  }
}

//function for delete check list
function deleteCheckList(event) {
  var id = event.target.parentElement.parentElement.parentElement.getAttribute(
    'id'
  );
  console.log(id);
  fetch(`https://api.trello.com/1/checklists/${id}?key=${key}&token=${token}`, {
    method: 'DELETE'
  }).then(() => {
    event.target.parentElement.parentElement.parentElement.remove();
  });
  event.stopPropagation();
}

//create event for add check item
// checkListContainer.addEventListener('click', openItemInput);

//function for open input for check items
function openItemInput(event) {
  // console.log('hello', event);
  event.target.parentElement.parentElement.parentElement.childNodes[3].style.display =
    'none';
  event.target.parentElement.parentElement.parentElement.childNodes[5].style.display =
    'block';
}

//function for close input for check items
function closeItemInput(event) {
  event.target.parentElement.parentElement.parentElement.parentElement.childNodes[3].style.display =
    'block';
  event.target.parentElement.parentElement.parentElement.parentElement.childNodes[5].style.display =
    'none';
}

//function for add check item
function addCheckItem(event) {
  checkItemName =
    event.target.parentElement.parentElement.parentElement.firstChild;
  id = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
    'id'
  );
  let cardId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
    'id'
  );
  console.log(cardId);
  //console.log(checkItemName.value);
  fetch(
    `https://api.trello.com/1/checklists/${id}/checkItems?name=${checkItemName.value}&pos=bottom&checked=false&key=${key}&token=${token}`,
    {
      method: 'POST'
    }
  )
    .then(data => data.json())
    .then(data => {
      var itemsContainer =
        event.target.parentElement.parentElement.parentElement.parentElement
          .childNodes[1];
      var checkListItem = document.createElement('div');
      checkListItem.classList = 'checkListItem';
      checkListItem.setAttribute('id', data.id);
      checkListItem.setAttribute('cardId', cardId);
      checkListItem.innerHTML =
        checkListItem.innerHTML +
        `<input type="checkBox" class="checkBox"><p>${data.name}</p>
          <button class="btn btn-default btn-default btn-xsm pull-right deleteButtonForItem">x<button>`;
      itemsContainer.appendChild(checkListItem);
      checkItemName.value = '';
    });
}

//function for getAll check items
function getAllCheckItems(id, cardId) {
  console.log(id);
  fetch(
    `https://api.trello.com/1/checklists/${id}/checkItems?key=${key}&token=${token}`,
    {
      method: 'GET'
    }
  )
    .then(data => data.json())
    .then(data => {
      data.forEach(element => {
        var itemsContainer = document.getElementById(id).childNodes[1];
        var checkListItem = document.createElement('div');
        checkListItem.classList = 'checkListItem';
        checkListItem.setAttribute('id', element.id);
        checkListItem.setAttribute('cardId', cardId);
        checkListItem.innerHTML =
          checkListItem.innerHTML +
          `<input type="checkBox" class="checkBox"><p>${element.name}</p>
          <button class="btn btn-default btn-default btn-xsm pull-right deleteButtonForItem">x<button>`;
        if (element.state === 'complete') {
          checkListItem.firstChild.checked = true;
          itemsContainer.appendChild(checkListItem);
        }
        itemsContainer.appendChild(checkListItem);
      });
    });
}

//function for delete checItems
function deleteCheckItem(event) {
  var cardId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
    'id'
  );
  var checkItemId = event.target.parentElement.getAttribute('id');
  console.log(checkItemId);
  fetch(
    `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${key}&token=${token}`,
    {
      method: 'DELETE'
    }
  ).then(() => event.target.parentElement.remove());
}

//function for item check or not
function checkItemStatus(event) {
  var cardId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
    'id'
  );
  var checkItemId = event.target.parentElement.getAttribute('id');
  var status = 'incomplete';
  if (event.target.checked == true) {
    status = 'complete';
  }
  fetch(
    `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=${status}&key=${key}&token=${token}`,
    {
      method: 'PUT'
    }
  );
}


// // //function for update the  card
// document.getElementById("exampleModalLongTitle").addEventListener("keypress", updateCard);
// function updateCard(e){
//   // var s=e.target.id
//    //let cardId=e.target.parentNode.id

//   // let cardid1=e.target.parentNode.firstChild.id
//   // let name=e.target.parentNode.firstChild.value
//   // var hideedit=document.getElementById(cardid1)
//   // var hideedit1=document.getElementById(e.target.id)
//   // hideedit.className+=' hide'
//   // hideedit1.className+=' hide'
//   if (event.target.classList.value === 'allCards') {
//     let cardId = 
//   console.log(cardId)
// if(event.which || event.keyCode){
 
//   var x = document.getElementById("exampleModalLongTitle").value;
//   console.log(x)
//   document.getElementById("exampleModalLongTitle").innerHTML = x;
//   var name = document.getElementById("exampleModalLongTitle").value;
//   console.log(name)
//   fetch(`https://api.trello.com/1/cards/${cardId}?name=${name}&key=${key}&token=${token}`, {
//   method: 'PUT',
//   headers: {
//   'Accept': 'application/json'
//   }
//   })
//   .then(response => {
//   console.log(
//   `Response: ${response.status} ${response.statcardIdusText}`
//   );
//   return response.text();
//   })
//   .then(text => console.log(text))
//   .catch(err => console.error(err));
//   }
// }}
    