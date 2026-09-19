import {Queue,QueueNode} from "../Binary Search Tree/Queue.js"
import LinkedList from "../LinkedList/LinkedList.js"
import Node from "../LinkedList/ListNode.js"
// iterative approach

function knightMoves(knightPosition,desiredPosition)
{
    if(!inRange(0,7,knightPosition[0]) && inRange(0,7,knightPosition[1]))
    {
        console.log("invalid knigth position");
        return ;
    }
    if(!inRange(0,7,desiredPosition[1]) && inRange(0,7,desiredPosition[1]))
    {
        console.log("invalid desired position");
        return ;
    }
    
    let movesToBeExplored = new Queue();
    movesToBeExplored.enqueue(new QueueNode(knightPosition));
    let pathsMap = {
    [knightPosition.join("")] : new LinkedList(new Node(knightPosition)), // represents the position [0,1]
    };

    let shortestPaths = [];
    let shortestLength = null;

    let lastNode = knightPosition;

    while(!movesToBeExplored.empty)
    { // while it isnt empty
        let currentExplorableMove = movesToBeExplored.getFirst();
        let possibleKnightMoves = getKnightMoves(currentExplorableMove.data,lastNode);
        // console.log(currentExplorableMove.data.join(""),pathsMap);
        let oldPath = pathsMap[currentExplorableMove.data.join("")]; // the seperator is necessary for the format to match the pathsMap
        // ^^ this variable points to the linkedList containing the path up untill currentExplorableMove from the original knightPosition.
        // ^^ axiom : it will always exist.
        
        lastNode = currentExplorableMove.data; // this is so that we dont traverse the oldMove itself as a "possible path"
        // ^^ this variable allows us to guarantee that we never go back in our paths .

        for(let i = 0;i < possibleKnightMoves.length;i++)
        {
            let oldPathArray = oldPath.toValues();
            let newPath = new LinkedList();
            newPath.constructArray(oldPathArray); // construct linkedList from array of nodes ( in order )
            newPath.append(possibleKnightMoves[i]); // add the new move;
            pathsMap[possibleKnightMoves[i].join("")] = newPath; // append it to our paths container
            
            if(possibleKnightMoves[i][0] === desiredPosition[0] && possibleKnightMoves[i][1] === desiredPosition[1])
            { // we found the path
                shortestLength = newPath.size() - 1; // cuz 1 accounts for the first node
                shortestPaths.push(newPath);
                console.log("path found!");
            }else
            {
                if(shortestLength === null) // checks whether or not we have found a path
                {
                    movesToBeExplored.enqueue(new QueueNode(possibleKnightMoves[i]));
                }
            }
        }
        movesToBeExplored.dequeue(); // remove the processed move;
    }
    if(shortestPaths.length > 1)
    {
    console.log(`You made it in ${shortestLength} moves!  Here's the paths you can take:`);
    }else
    {
    console.log(`You made it in ${shortestLength} moves!  Here's the path you can take:`);
    }
    for(let i = 0;i < shortestPaths.length;i++)
    {
        console.log(shortestPaths[i].toString());
    }
}
knightMoves([0,0],[3,3]);
// returns an array of all the possible kngiht positions.
function getKnightMoves(knightPosition,lastMove)
{ // going to assume that the knightPosition is 
    let possibleKnightPositions = [
          [knightPosition[0] - 1,knightPosition[1] + 2],
          [knightPosition[0] + 1,knightPosition[1] + 2],
          [knightPosition[0] - 1,knightPosition[1] - 2],
          [knightPosition[0] + 1,knightPosition[1] - 2],
          [knightPosition[0] + 2,knightPosition[1] - 1],
          [knightPosition[0] + 2,knightPosition[1] + 1],
          [knightPosition[0] - 2,knightPosition[1] - 1],
          [knightPosition[0] - 2,knightPosition[1] + 1],  
     ]; 
     let validKnightMoves = []; 
    for(let i = 0;i < 8;i++)
    { // 8 possible knight positions
        if(inRange(0,7,possibleKnightPositions[i][0]) && inRange(0,7,possibleKnightPositions[i][1]))
        {
            if(possibleKnightPositions[i][0] !== lastMove[0] && possibleKnightPositions[i][1] !== lastMove[1])
            {
            validKnightMoves.push(possibleKnightPositions[i]);
            }
        }
    }
    return validKnightMoves;
}

// b >= x >= a
function inRange(a,b,x)
{
  return (x >= a) && (x <= b);
}

