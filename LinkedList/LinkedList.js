import Node from "./ListNode.js"

class LinkedList
{
  constructor(firstNode)
  {
    this.empty = false;
    this.listSize = 0;
    
    if(firstNode === undefined)
    {
      this.first = null;
      this.empty = true;
    }else
    {
      this.first = firstNode;
      this.listSize++;
      this.last = firstNode; // 1 item in the list means it is both first and last or head and tail 
    }
  }

  // append adds a new node at the end of the list
  // value is data not a node
  append(value)
  {
    let newNode = new Node(value); 
    this.listSize++;
  
    if(this.empty)
    { // both first and last are null.
      this.first = newNode;
      this.last = newNode;
      this.empty = false; // cuz we created a new node
      return;
    }
    
    if(this.last !== null)
    { // meaning lastItem does exist
      this.last.next = newNode;
    }
// Updates only references ^^
    
    this.last = newNode;
  }

// adds an item to the start of the list
  prepend(value)
  {
    let newNode = new Node(value); 
    this.listSize++;
    
    if(this.empty)
    { // both first and last are null.
      this.first = newNode;
      this.empty = false; // cuz we created a new node
      return;
    }
    // by this point - > first does exist 

    newNode.next = this.first; // cuz its going to be ordered before the current first item
    this.first = newNode;
    
  }

  // removes the head node ; the first node from the list and returns its value
  pop()
  {
    if(this.empty)
    {
      return undefined;
    }

    let value;
    value = this.first.data;
  
    if(this.listSize > 1)
    { // meaning theres more than just the head 
      // make the subsequent item to the head the head .
      this.first = this.first.next;
      this.listSize--;
    }else
    { // its only the first Item
      this.first = null;
      this.listSize--; // becomes 0;
      this.empty = true;
    }

    return value;

  }

  size()
  {
    return this.listSize;
  }

  head()
  {
    if(this.empty)
    {  
      return undefined;
    }
    
    return this.first;
  }

  tail()
  {
    if(this.empty)
    {  
      return undefined;
    }
    
    return this.last;
  }

  // node setting functions

  // sets the nodes data at the given index to the given value
  set(index,value)
  {
      let correspondingNode = this.getNode(index);
      if(correspondingNode !== undefined)
      { // meaning it does exist
        correspondingNode.data = value;
      }
  }

  // traversing functions

  // returns the value of the node at the given index or undefined.
  at(index)
  {
    if(this.empty)
    {
      return undefined;
    }
    if(!inRange(index,this.size() - 1))
    {
      console.log("the given index is out of range of the list");
      return undefined;
    }
    
    let currentPointer = this.first;
    let currentIndex = 0;
    
    while(currentPointer !== null)
    { 
        if(currentIndex === index)
        {
          return currentPointer.data;
        }

        currentPointer = currentPointer.next;
        currentIndex++;
    }

    return undefined; // if an floating number was given this would run as well as other incompatible types ;-; . 
  }

  contains(value)
  {
    if(this.empty)
    { // literally cant exist inside the list
      return false;
    }

    let currentPointer = this.first;
    
    while(currentPointer !== null)
    { 
        if(currentPointer.data === value)
        {
          return true;
        }

        currentPointer = currentPointer.next;
    }

    return false;
    
  }

  findIndex(value)
  {
    if(this.empty)
    { // literally cant exist inside the list
      return -1;
    }

    let currentPointer = this.first;
    let currentIndex = 0;
    
    while(currentPointer !== null)
    { 
        if(currentPointer.value === value)
        {
          return currentIndex;
        }

        currentPointer = currentPointer.next;
        currentIndex++;
    }

    return -1;
  }

  getNode(index)
  {
    if(this.empty)
    {
      return undefined;
    }
    if(!inRange(index,this.size() - 1))
    {
      console.log("the given index is out of range of the list");
      return undefined;
    }
    
    let currentPointer = this.first;
    let currentIndex = 0;
    
    while(currentPointer !== null)
    { 
        if(currentIndex === index)
        {
          return currentPointer;
        }

        currentPointer = currentPointer.next;
        currentIndex++;
    }

    return undefined; // if an floating number was given this would run as well as other incompatible types ;-; . 
  
  }

  // return all the nodes inside the linked list in an ordered array.
  toArray()
  {
    if(this.empty)
    {
      return []; 
    }
  
    let currentPointer = this.first;
    let resultantArr = [];

    while(currentPointer !== null)
    {
      resultantArr.push(currentPointer);
  
      currentPointer = currentPointer.next;
    }
    return resultantArr;
  }

  toString()
  {
    if(this.empty)
    {
      return "";
    }
    let resultantString = "";

    let currentPointer = this.first;

    while(currentPointer !== null)
    {
      resultantString += `( ${currentPointer.data} ) -> `;

      currentPointer = currentPointer.next;
    }

    resultantString += "null";

    return resultantString;
  }

  // random access modifying functions
  insertAt(index,...values)
  {
    if(this.empty)
    { // add all of the values directly into the list.
      for(let value of values)
      {
        this.append(value);
      }

      // this case is handled safely
      return;
    }
 
    if(!inRange(index,this.size() - 1))
    {
      throw new RangeError("the given index is out of range of the list");
      return;
    }
    // so essentially we will have to update two nodes pointers alongside 
    // the given constructed nodes updation .

    
    let firstPointer = null; // these are the two pointers which in between the constructed nodes will be squished in
    let lastPointer = null;
    let currentIndex = 0;

    let currentPointer = this.first;

    while(currentPointer !== null)
    { 
        if(currentIndex === index)
        {
            firstPointer = currentPointer;
            lastPointer = firstPointer.next;
            break;
        }

        currentPointer = currentPointer.next;
        currentIndex++;
    }
    // if there is only one item then the above code would output firstPointer as this.first and lastPointer as null
    // convert the values to nodes first
    let nodes = [];
    
    for(let value of values)
    {
      let newNode = new Node(value);
      nodes.push(newNode);
    }
    for(let i = 0;i < nodes.length - 1;i++)
    { // we stop 1 before cuz the last one doesnt have a definitive "next"
      let currentNode = nodes[i];
      let nextNode = nodes[i + 1];

      currentNode.next = nextNode;
      
    }
    
    firstPointer.next = nodes[0]; // 1 value will always be passed < - assumption 
    if(lastPointer !== null)
    { // if it does exist then we have to do some pointer modification for sandwiching them perfectly into the original list
      nodes[nodes.length - 1].next = lastPointer;
    }
    // update size;
    this.listSize += values.length;
  }

  removeAt(index)
  {
    if(!inRange(index,this.size() - 1))
    {
      throw new RangeError("the given index is out of range of the list");
      return;
    }
    if(index === 0)
    { // easy case
      this.pop();
      return;
    }

    let currentIndex = 0;

    let currentPointer = this.first; // node that is to be deleted is denoted by this variable
    let precedingPointer;

    while(currentPointer !== null)
    { 
        if(currentIndex + 1 === index)
        {// found the node that is to be deleted
          precedingPointer = currentPointer;
          currentPointer = precedingPointer.next;
          break;
        }

        currentPointer = currentPointer.next;
        currentIndex++;
    } 

   // the item preceding the node to be deleted needs to reference the successing item of the node to be deleted 
    precedingPointer.next = currentPointer.next;
    this.listSize--;
  }

  removeAll()
  { // garbage collector does the heavy lifting.
    this.first = null;
    this.last = null;
    this.empty = true;
    this.listSize = 0;
  }

}

// a should be within the range [0,b] inclusively
function inRange(a,b)
{
  return ((a >= 0) && (a <= b));
}

export default LinkedList;
