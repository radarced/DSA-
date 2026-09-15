class Node
{
  constructor(data,next)
  {
    next  = (next === undefined ) ? null : next;
    
    this.data = data; // going to assume that data is always passed
    this.next = next; // pointer to the next node in the linked list
  }
}

export default Node;
