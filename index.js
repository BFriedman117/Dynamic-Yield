let add = document.getElementById("add-button")
let remove = document.getElementById("remove")
let main = document.getElementById("main")

let frames = {
  num: 1
}

//Initial functions

function initialize(){
  window.addEventListener("message", reciever)
  add.addEventListener("click", addFrame)
}

function addFrame(){
  let box = document.createElement("div")
  box.className = "iframe"
  box.onmousedown = function(e){
    document.onmousemove = function(e){
      box.style.position = "absolute"
      box.style.top = e.clientY + "px"
      box.style.left = e.clientX + "px"
    }
    document.onmouseup = function(){
      document.onmousemove = null
      document.onmouseup = null
    }
  }
  let iframe = document.createElement("iframe")
  let name = "iFrame-" + frames.num
  let newFrameMessage = "System: " + name + " has joined the chat"
  iframe.src = "./iframe.html"
  iframe.name = name
  iframe.id = name
  iframe.className = "iframe"
  box.appendChild(iframe)
  main.appendChild(box)
  update(newFrameMessage)
  frames.num++
}

//Update all chat windows

function update(message){
  for (let i = 0; i < window.frames.length; i++){
    window.frames[i].postMessage(message, "*")
  }
}

//Close Chat / Leave Chat

function removeFrame(iframe){
  let frameToRemove = document.getElementById(iframe)
  let removalMessage = "System: " + iframe + " has left the chat"
  main.removeChild(frameToRemove)
  update(removalMessage)
}

//Run different functions based on action - similar to Redux

function reciever(ev){
  let action = ev.data
  switch (action.type){
    case "NEW_MESSAGE":
      update(action.message)
      break
    case "REMOVE_FRAME":
      removeFrame(action.iframe)
      break
    // case "MOVE_FRAME":
    //   moveFrame(action.top, action.left, action.id)
    //   break
    default:
      return
  }
}
