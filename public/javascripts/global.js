// TODO: fetched this from db
var lastItemNumber = 0;

$(document).ready(function() {
  addNewListItem(-1);
});
$(document).on("click", ".itemstatus",function() {
  $( this ).parent().parent().toggleClass("bought");
});

// when something is typed in last field add new field
$(document).on("keypress", ".listitem:last-child .itemtext", function() {
  addNewListItem(-1);
});


// add new item at end of list
function addNewListItem(id){
  var itemID;
  
  // choose ID based on if new item or item from DB
  if (id == -1) {
    itemID = ++lastItemNumber;
  } else {
    itemID = id;
  };

  var listItem = '<div class="listitem" id="item'+ itemID +'">';
  listItem += '<form method="post" action="additem">';
  listItem += '<input type="text" maxlength="30" class="itemtext">';
  listItem += '<input id="label' + itemID + '" type="checkbox" class="itemstatus">';
  listItem += '<label for="label' + itemID + '"></label>';
  listItem += '</form>';
  listItem += '</div>';
  
  $("#listcontainer").append(listItem);

};

// remove all empty list items
function removeEmptyListItems() {

  // iterate through all list items and remove empty ones
  $(".itemtext").each(function() {
    if($.trim($( this ).val()) === "")
      $( this ).parent().parent().remove();
  });
  
  // add new empty item at end so we have something to type in
  addNewListItem(-1);
  
}

// remove items with checked boxes
function removeCheckedListItems() {

  // iterate through all list item checkbox and remove items with checked boxes
  $(".itemstatus").each(function() {
    if($( this ).prop('checked') == true){
      var id = 0; //TODO figure out id
    
      $( this ).parent().parent().remove();
      removeItemFromDB(id); 
    }
  });
  
  // if we removed all items add a new one, .length returns 0 if no items exist
  if (!$(".itemtext").length){
    addNewListItem(-1);
  };
  
}

// remove all items
function removeAllListItems(){

  $(".listitem").each(function() {
    var id = 0; //TODO figure out id
  
    $( this ).remove();
    removeItemFromDB(id);
  });
  
  // add new empty item at end so we have something to type in
  addNewListItem(-1);
}

// remove item from DB by id
function removeItemFromDB(id) {
  //TODO
}

