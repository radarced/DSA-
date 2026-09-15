import LinkedList from "./LinkedList.js"
// probably shouldve used jest.... oh well 

// example uses class syntax - adjust as necessary
const list = new LinkedList();
list.append(1);

// list that's already set up
console.log(list.toString());
//=> "( 1 ) -> ( 2 ) -> ( 3 ) -> null"

list.insertAt(0, 10, 11);
console.log(list.toString());
//=> "( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null"
list.removeAt(1);
list.removeAt(0);
console.log(list.toString());

// list.append("dog");
// list.append("cat");
// list.append("parrot");
// list.append("hamster");
// list.append("snake");
// list.append("turtle");

// console.log(list.toString());
