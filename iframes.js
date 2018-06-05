let num = 1

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
  num++
}

function remove(iframe){
  window.parent.postMessage(removeFrame(iframe), "*")
}

function update(ev){
  let message = document.createTextNode(ev.data)
  let newMessage = document.createElement("p")
  newMessage.appendChild(message)
  document.getElementById("message").appendChild(newMessage)
}

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
