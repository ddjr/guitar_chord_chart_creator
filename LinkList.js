'use strict';
class LinkList {
  constructor(){
    this.head = null;
  }
  push(val) {
    var node = {
      value: val,
      next: null
    }
    if(!this.head) {
      this.head = node;
    } else {
      var current = this.head;
      while(current.next) {
        current = current.next;
      } // end while(current.next)
      current.next = node;
    } // end else
  } // end push()

  removeNthElement(n) {
    if(!this.head || n<0) {return;}
    if(n == 0) {
      if(!this.head.next){
        this.head = null;
        return;
      }
      this.head = this.head.next;
      return;
    }
    var current = this.head;
    for(let _=0; _<n-1; _++) {
      if(!current.next){return;}
      current = current.next;
    } // end for(let _=0; _<n; _++)
    if(!current.next.next) {
      current.next = null;
      return;
    }
    current.next = current.next.next;
  } // end removeNthElement(n)

  removeValue(value) {
    if(!this.head) {return;}
    if(this.head.value == value) {
      this.head = this.head.next;
      return;
    }
    var current = this.head;
    while(current.next != null) {
      if(current.next.value == value) {
          current.next = current.next.next;
          return;
        } // end if
      current = current.next;
    }
  } // removeValue(value)
  indexOfValue(value) {
    var index = 0;
    if(!this.head) {return -1; }
    if(this.head.value == value) {
      return index;
    }
    var current = this.head;
    do {
      index++;
      if(current.next.value == value) {
        return index;
      } // end if
      current = current.next;
    } while(current.next != null);
    return -1;
  } // indexOfValue(value)

  allIndexOfValue(value) {
    var list = [];
    var index = 0;
    if(!this.head) {return list; }
    if(this.head.value == value) {
      list.push(index);
    }
    var current = this.head;
    while(current.next != null) {
      index++;
      if(current.next.value == value) {
        list.push(index);
      } // end if
      current = current.next;
    }
    return list;
  } // indexOfValue(value)
  removeValueFromEnd(value) {
  var list = this.allIndexOfValue(value);
  if (list.length == 0) {return;}
  this.removeNthElement(list[list.length-1]);
  }

  length() {
    if(!this.head) {return 0; }
    var current = this.head;
    var length = 1;
    while(current.next != null) {
      length ++;
      current = current.next;
    }
    return length;
  }
} // end class LinkList
