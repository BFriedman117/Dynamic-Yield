
//Redux-syle action creators

const NEW_MESSAGE = 'NEW_MESSAGE'
const REMOVE_FRAME = 'REMOVE_FRAME'

const newMessage = function(message){
  return {
    type: NEW_MESSAGE,
    message
  }
}

const removeFrame = function(iframe){
  return {
    type: REMOVE_FRAME,
    iframe
  }
}

//Initial functions

function initialize(iframe){
  //Display iFrame ID:
  let id = document.getElementById("iframe-id")
  id.innerHTML = iframe

  //Listen for messages:
  window.addEventListener("message", update, false);

  //Submit chat on Enter keypress:
  let input = document.getElementById("chat-input")
  input.addEventListener("keyup", function(event){
    event.preventDefault();
    if (event.keyCode === 13){
      document.getElementById("chat-submit").click()
    }
  })
}

//Submit Input

function keyUp(ev, iframe){
  ev.preventDefault();

  if (ev.keycode === 13){
    document.getElementById("chat-submit").click
  }
}

function send(iframe){
  let input = document.getElementById("chat-input")
  let message = iframe + ": " + input.value
  window.parent.postMessage(newMessage(message), "*")
  input.value = ""
}

//Close Chat Window / Leave Chat

function remove(iframe){
  window.parent.postMessage(removeFrame(iframe), "*")
}

//Recieve Updates from Parent

function update(ev){
  let message = document.createTextNode(ev.data)
  let newMessage = document.createElement("div")
  newMessage.className = "message-row"
  newMessage.appendChild(message)
  document.getElementById("message").appendChild(newMessage)
}
