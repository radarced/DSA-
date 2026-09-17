
function Queue(firstNode)
{
  let lastNode = null;
  this.empty = false;
  if(firstNode === undefined)
  {
    firstNode = null;
    this.empty = true;
  }else if(firstNode.next !== null)
  { // if the firstNode has a preceding person waiting in line
    lastNode = firstNode.next;
  }
  this.first = firstNode; // this references the subsequent ones.

  this.last = lastNode; // for enqueuing

}

Queue.prototype.getFirst = function()
{
  return this.first;
}

Queue.prototype.dequeue = function()
  {
    if(this.first.next === null)
    { // meaning we're completely emptying the queue
      this.last = null;
      this.first = null;
      this.empty = true;
      return;
    }
    this.first = this.first.next;
  }

Queue.prototype.enqueue = function(node)
  {
    if(this.first === null)
    {
      this.first = node;
      this.empty = false;
    }else if(this.first.next === null)
    { // meaning there was only one element
      this.first.next = node;
    }
    
    if(this.last !== null)
    {
     // console.log(this.last);
    this.last.next = node; // the preceding person in line is now the given node. 
    }
    this.last = node;
  }

Queue.prototype.getAll = function()
{
  let currentNode = this.first;
  let index = 1;
  while(currentNode !== null)
  {
    console.log("position ",index,currentNode);
    currentNode = currentNode.next; // go to the preceding person in line
    index++;
  }
}

// let personQueue = new Queue(new QueueNode("person1",new QueueNode("person2")));

// personQueue.getAll();
// personQueue.dequeue();
// personQueue.enqueue(new QueueNode("person3"));
// personQueue.getAll();

function QueueNode(data,next)
{
  if(next === undefined)
  {
    next = null;
  }
  this.data = data;
  this.next = next;
}

export {Queue,QueueNode};
