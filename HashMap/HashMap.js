import LinkedList from "../LinkedList/LinkedList.js"

class HashMap
{
  constructor()
  {
    this.capacity = 16; // default size of the amount of buckets
    this.amount = 0;
    this.loadFactor = 0.75; // after 80% of the buckets are filled expand the buckets array.
    this.buckets = [];
    this.buckets.length = this.capacity;
  }

  // the most common hashMap functions

  set(key,value)
  {
    let correspondingHashCode = hash(key) % this.capacity; // current number of buckets
    // ^^ normalized index related to the capacity .
      let pair = [key,value];
        
    if(this.buckets[correspondingHashCode] === undefined)
    { // means the bucket is empty hence no linkedList exists
      this.buckets[correspondingHashCode] = new LinkedList();
    }    
      let currentBucket = this.buckets[correspondingHashCode];
    //^^ this line was displaced form line 19 cuz now it has an actual refernce to the object rather than being an indefinitve pointer to either undefined or a linkedList
    // check if the key already exists inside the bucket 
    // if so then update its value if not then add a new node


    let allPairs = currentBucket.toArray(); // gets all key value pair nodes inside the bucket linked list.
    let keyExist = this.#doesKeyExist(key,allPairs);

    if(keyExist.keyExists)
    {
        currentBucket.set(keyExist.index,pair); // updates it to the new value
    }else
    { // because key doesnt exist in the bucket
      currentBucket.append(pair); // adds a new node to the end of the linked list with the value of pair .  
      this.amount++;
    }
     
    if(this.amount > this.loadFactor * this.capacity)
    {
      this.capacity *= 2; // double the buckets array;
      this.buckets.length = this.capacity;
    }
  }

  get(key)
  {  
    let correspondingHashCode = hash(key) % this.capacity;
    let currentBucket = this.buckets[correspondingHashCode];

    if(currentBucket === undefined)
    {
      return undefined;
    }else if(currentBucket.empty)
    { // if the linkedList is empty
      return undefined;
    }

    let allPairs = currentBucket.toArray(); // gets all key value pair nodes inside the bucket linked list.
    let keyExist = this.#doesKeyExist(key,allPairs);

    let pair = currentBucket.at(keyExist.index);
  
    return pair[1]; 
    
  }

  remove(key)
  {
      if(!this.has(key))
      {
          return false;
      }
      // key exists
      
    let correspondingHashCode = hash(key) % this.capacity;
    let currentBucket = this.buckets[correspondingHashCode];
    
    let allPairs = currentBucket.toArray(); // gets all key value pair nodes inside the bucket linked list.
    let entry = this.#doesKeyExist(key,allPairs);

  
    currentBucket.removeAt(entry.index);
    this.amount--;

    return true;
          
  }

  // returns a boolean value which represents true or false depending on whether the key exists in the hashMap or not
  has(key)
  {
    let correspondingHashCode = hash(key) % this.capacity;
    let currentBucket = this.buckets[correspondingHashCode];

    if(currentBucket === undefined)
    {
      return false;
    }else if(currentBucket.empty)
    { // if the linkedList is empty
      return false;
    }

    let allPairs = currentBucket.toArray(); // gets all key value pair nodes inside the bucket linked list.
    let keyExist = this.#doesKeyExist(key,allPairs);

    return keyExist.keyExists;
    
  }
  
  length()
  {
    return this.amount;
  }

  clear()
  {
    for(let i = 0;i < this.buckets.length;i++)
    {
      let currentBucket = this.buckets[i];
      if(currentBucket !== undefined)
      {
        currentBucket.removeAll();
      }
    }
    this.amount = 0;
  }

  keys()
  {
    let keysArray = [];
    
    for(let i = 0;i < this.buckets.length;i++)
    {
      let currentBucket = this.buckets[i];
      if(currentBucket !== undefined)
      {
        if(!currentBucket.empty)
        {
          let allNodes = currentBucket.toArray(); // gets all key value pair nodes inside the bucket linked list.
          for(let node of allNodes)
          {
            let currentKey = node.data[0]
            keysArray.push(currentKey);
          }
        }
      }
    }

    return keysArray;
  }

  values()
  {
    let valuesArray = [];
    
    for(let i = 0;i < this.buckets.length;i++)
    {
      let currentBucket = this.buckets[i];
      if(currentBucket !== undefined)
      {
        if(!currentBucket.empty)
        {
          let allNodes = currentBucket.toArray(); // gets all key value pair nodes inside the bucket linked list.
          for(let node of allNodes)
          {
            let currentValue = node.data[1]
            valuesArray.push(currentValue);
          }
        }
      }
    }

    return valuesArray;
  
  }

  entries()
  {
    let allPairs = [];
    
    for(let i = 0;i < this.buckets.length;i++)
    {
      let currentBucket = this.buckets[i];
      if(currentBucket !== undefined)
      {
        if(!currentBucket.empty)
        {
          let allNodes = currentBucket.toArray(); // gets all key value pair nodes inside the bucket linked list.
          for(let node of allNodes)
          {
            let currentPair = node.data;
            allPairs.push(currentPair);
          }
        }
      }
    }

    return allPairs;
  
  }

  // assumes nodes.data = [key,value]
  #doesKeyExist(key,nodes)
  {
    for(let i = 0;i < nodes.length;i++)
    {
      let currentNodeKey = nodes[i].data[0];
      if(currentNodeKey === key)
      {
        return {keyExists : true,index : i};
      }
    }

    return {keyExists : false,index : -1};
  }

  toString()
  {
    let resultantString = "";
    for(let i = 0;i < this.buckets.length;i++)
    {
      let currentBucket = this.buckets[i];
      if(currentBucket !== undefined)
      { // get all items of the linkedList
        if(!currentBucket.empty)
        {
        resultantString += `Bucket ${i} = ${currentBucket.toString()} \n`;
        }
      }
    }
    resultantString += `amount of Buckets : ${this.capacity}\n`;
    resultantString += `amount of filled Buckets : ${this.amount}`;
    return resultantString;
  }
  
}

function hash(key) {
  
  let hashCode = 0;

  const primeNumber = 31;
  
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode;
} 




let test = new HashMap();

test.set("epic","i love this so much");
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
console.log(test.toString());

console.log(test.get("ice cream")); // white
console.log(test.has("apple")); // true
console.log(test.remove("apple")); 
console.log(test.length()); // 9 
console.log("HashMaps keys : ",test.keys()); // prints out all keys
console.log("HashMaps values : ",test.values()); // prints out all keys
console.log("HashMaps pairs : ",test.entries()); // prints out all keys
test.clear();

console.log(test.toString());

test.set("epic","i hate this so much");
console.log(test.toString());


