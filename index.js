let add = document.getElementById("add-button")
let remove = document.getElementById("remove")
let main = document.getElementById("main")

let frames = {
  num: 1
}

function addFrame(){
  let node = document.createElement("iframe")
  let name = "iFrame-" + frames.num
  let newFrameMessage = "System: " + name + " has joined the chat"
  node.src = "./iframe.html"
  node.name = name
  node.id = name
  node.className = "iframe"
  main.appendChild(node)
  update(newFrameMessage)
  frames.num++
}

function update(message){
  for (let i = 0; i < window.frames.length; i++){
    window.frames[i].postMessage(message, "*")
  }
}

function removeFrame(iframe){
  let frameToRemove = document.getElementById(iframe)
  let removalMessage = "System: " + iframe + " has left the chat"
  main.removeChild(frameToRemove)
  update(removalMessage)
}

function reciever(ev){
  let action = ev.data
  switch (action.type){
    case "NEW_MESSAGE":
      update(action.message)
      break
    case "REMOVE_FRAME":
      removeFrame(action.iframe)
      break
    default:
      return
  }
}

function initialize(){
  window.addEventListener("message", reciever)
}

add.addEventListener("click", addFrame)
