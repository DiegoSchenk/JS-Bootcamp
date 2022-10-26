var rows=3
var columns=3

var currTile
var otherTile

var turns=0

// game order ["4","2","8","5","1","6","7","9","3"]
//var winOrder=["1","2","3","4","5","6","7","8","9"]
var imgOrder=["4","2","8","5","1","6","7","9","3"]

window.onload = function(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString()
            tile.src = imgOrder.shift() + ".jpg"
            
            //Drag & drop
            
            tile.addEventListener("dragstart", dragStart)   //click an image to drag
            tile.addEventListener("dragover", dragOver)     //moving an image around while clicked
            tile.addEventListener("dragenter", dragEnter)   //dragging the image onto another one
            tile.addEventListener("dragleave", dragLeave)   //dragged image leaving another image
            tile.addEventListener("drop", dragDrop)         //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd)       //after drag & drop, swap the two tiles

            document.getElementById("board").append(tile)
        }
    }
}

function dragStart(){
    currTile = this //refers to the image being dragged
}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
}

function dragLeave(){

}

function dragDrop(){
    otherTile = this // the img being dropped
}

function dragEnd(){
    if(!currTile.src.includes("3.jpg")){return} 
    
    let currCoords = currTile.id.split("-") // "0-0" => ["0","0"])
    let r = parseInt(currCoords[0])
    let c = parseInt(currCoords[1])

    let otherCoords = otherTile.id.split("-")
    let r2 = parseInt(otherCoords[0])
    let c2 = parseInt(otherCoords[1])

    let moveLeft = r == r2 && c2 == c-1
    let moveRight = r == r2 && c2 == c+1

    let moveUp = r-1 == r2 && c2 == c
    let moveDown = r+1 == r2 && c2 == c

    isAdjacent = moveLeft || moveRight || moveDown || moveUp
    
    if (isAdjacent){
        let currImg = currTile.src
        let otherImg = otherTile.src

        currTile.src = otherImg
        otherTile.src = currImg
        
        turns++

        document.getElementById("turns").innerText = turns

        //Win Condition
        let p = 0
        let win = true
        for (let i = 1; i < rows + columns +1 && win !== false; i++){
                let slice = document.getElementById("board").getElementsByTagName('img').item(p).getAttribute('src').includes(i.toString())
                if (slice === false){
                    win = false;
                }
                p++
            }
        if (win){
            alert("You did it! Congratulations! Your turns highscore is: " + turns)
        }
      
     }
        
}