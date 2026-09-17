import {Queue,QueueNode} from "./Queue.js"

function BFS(rootNode,callback)
{ // go level by level and add them into the queue 
  let nodeQueue = new Queue(new QueueNode(rootNode));
  
  while(!nodeQueue.empty)
  {
    let toProcessNode = nodeQueue.getFirst();
    callback(toProcessNode.data.data);

    let leftNode = toProcessNode.data.left;
    let rightNode = toProcessNode.data.right;
    if(leftNode !== null)
    {
      nodeQueue.enqueue(new QueueNode(leftNode));
    }
    if(rightNode !== null)
    {
      nodeQueue.enqueue(new QueueNode(rightNode));
    }

    nodeQueue.dequeue(); // it has been processed
    
  }
  // process the entire queeu untill its empty according to the follow steps .
  // process and get the following nodes entailing from this node.
  // add those into the queue and repeat the process till 
  // you reach the end .
  // if(!nextQueue.empty)
  // { 
  // BFS(rootNode,nextQueue);
  // }else
  // {
  // }
  
}

// returns the nodes on which the condition was met
function BFS_Search1(rootNode,callback)
{
  let matchedConditionNodes = [];

  let nodeQueue = new Queue(new QueueNode(rootNode));
  
  while(!nodeQueue.empty)
  {
    let toProcessNode = nodeQueue.getFirst();
    let exists = callback(toProcessNode.data);
    if(exists)
    {
      matchedConditionNodes.push(toProcessNode.data);
    }

    let leftNode = toProcessNode.data.left;
    let rightNode = toProcessNode.data.right;
    if(leftNode !== null)
    {
      nodeQueue.enqueue(new QueueNode(leftNode));
    }
    if(rightNode !== null)
    {
      nodeQueue.enqueue(new QueueNode(rightNode));
    }

    nodeQueue.dequeue(); // it has been processed
    
  }
  // process the entire queeu untill its empty according to the follow steps .
  // process and get the following nodes entailing from this node.
  // add those into the queue and repeat the process till 
  // you reach the end .
  // if(!nextQueue.empty)
  // { 
  // BFS(rootNode,nextQueue);
  // }else
  // {
  // }
    return matchedConditionNodes;
}

function BFS_Search(rootNode,callback)
{
let nodeQueue = new Queue(new QueueNode(rootNode));
  
  while(!nodeQueue.empty)
  {
    let toProcessNode = nodeQueue.getFirst();
    let exists = callback(toProcessNode.data.data);
    if(exists)
    {
      return true;
    }

    let leftNode = toProcessNode.data.left;
    let rightNode = toProcessNode.data.right;
    if(leftNode !== null)
    {
      nodeQueue.enqueue(new QueueNode(leftNode));
    }
    if(rightNode !== null)
    {
      nodeQueue.enqueue(new QueueNode(rightNode));
    }

    nodeQueue.dequeue(); // it has been processed
    
  }
  // process the entire queeu untill its empty according to the follow steps .
  // process and get the following nodes entailing from this node.
  // add those into the queue and repeat the process till 
  // you reach the end .
  // if(!nextQueue.empty)
  // { 
  // BFS(rootNode,nextQueue);
  // }else
  // {
  // }
    return false;
}

// Time Complexity = O(n) .
// Space Complexity = O(n) .

// let root = new Node(0,new Node(2,new Node(3),new Node(1)),new Node(-1,new Node(50),new Node(-2)));
// BFS(root);

export {BFS,BFS_Search,BFS_Search1};
