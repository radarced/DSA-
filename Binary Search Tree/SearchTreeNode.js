function Node(data,rightNode,leftNode)
{
  if(rightNode === undefined)
  {
    rightNode = null;
  }
  if(leftNode === undefined)
  {
    leftNode = null;
  }
  
  this.data = data;
  this.right = rightNode;
  this.left = leftNode
}

export default Node;
