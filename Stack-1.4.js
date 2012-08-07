/**
* StackJS 1.4 - now faster
*    
* <see entire project at http://github.com/madeinstefano/StackJS>
*
* @author Stéfano Stypulkowski <http://szanata.com>
*     
* @license GPL <http://szanata.com/license/GPL.txt>
* @license MIT <http://szanata.conm/license/MIT.txt>
*/

//Array indexOf implementation
if (!Array.prototype.indexOf){

  Array.prototype.indexOf = function (elt){
  
    var
      len = this.length >>> 0,
      from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      
    if (from < 0){
      from += len;
    }

    for (; from < len; from++){
      if (from in this && this[from] === elt) {
        return from;
      }
    }
    return -1;
  };
}

//Array clone implementation
if (!Array.prototype.clone){
  Array.prototype.clone = function (){
  
    var a = [];
    for (var i = 0, li = this.length; i < li; i++){
      a.push(this[i]);
    }
    return a;
  }
}

var Stack = window.Stack = {};

(function (){
  'use strict';
  
  var
    _stack = [],
    _map = [],
    _states = [];
    

  function isUniqueId(id){
    return _map.indexOf(id) === -1;
  }

  var StackItem = function StackItem(id, obj){
    this.id = id;
    this.obj = obj;
  }
  StackItem.prototype.constructor = StackItem;

  var StackState = function StackState(id,stack,map){
    this.id = id;
    this.stack = stack;
    this.map = map;
  }
  StackState.prototype.constructor = StackState;

  /*
  * puts some item in the stack
  */
  function put(obj, id, overwrite){
    
    if (!isUniqueId(id) && overwrite === false){
      return false;
    }
    
    var 
      item = new StackItem(id,obj),
      pos = _map.indexOf(id);
    
    if ( pos > -1){
      _stack[pos] = item;
    }else{
      _map[_stack.push(item) - 1] = id;
    }
    return true;
  }
  Stack['put'] = put;
  
  /**
  * returns some item in the stack by given id
  */
  function get(id){
    var pos = _map.indexOf(id);
    return pos >= 0 ? _stack[pos].obj : null;
  }
  Stack['get'] = get;
  
  /**
  * save a state of the stack
  */
  function save(label){
    if (label !== undefined && typeof label !== 'number' && typeof label !== 'string'){
      throw 'label must be omitted or a Number or a String.'
    }
    if (label !== undefined){
      var i = _states.length;
      while (i--){
        if (_states[i].id === label){
          _states[i] = new StackState(label,_stack.clone(),_map.clone());
          return;
        }
      }
    }
    _states.push(new StackState(label,_stack.clone(),_map.clone()));
  }
  Stack['save'] = save;
  
  /**
  * restore a previous saved state of the stack
  */
  function restore(label){
    if (label !== undefined && typeof label !== 'number' && typeof label !== 'string'){
      throw 'label must be omitted or a Number or a String.'
    }
    if (label === undefined && _states.length > 0){
      _stack = _states[_states.length - 1].stack;
      _map = _states[_states.length - 1].map;
      _states.pop();
      return true;
    }else{
      var i = _states.length;
      while (i--){
        if (_states[i].id == label){
          _stack = _states[i].stack;
          _map = _states[i].map;
          return true;
        }
      }
    }
    return false;
  }
  Stack['restore'] = restore;
  
  /**
  * exile some element from the stack and return it
  */
  function exile(id){
    var pos = _map.indexOf(id);
    if (pos >= 0){
      var item = _stack[pos].obj; 
      _map.splice(pos,1);
      _stack.splice(pos,1);
      return item;
    }
    return null;
  }
  Stack['exile'] = exile;
      
  /**
  * removes items from the stack by their ids
  * returns the amount of removed items
  */
  function remove(){
    var removed = 0;
    
    for (var i = 0, l = arguments.length; i < l;i++){
          
      var pos = _map.indexOf(arguments[i]);
      
      if (pos >= 0){
        var item = _stack[pos].obj; 
        _map.splice(pos,1);
        _stack.splice(pos,1);
        removed++;
      }
    }
    return removed;
  }
  Stack['remove'] = remove;


  /**
  * clear the stack, but not the states
  */
  function clear(){
    _stack.length = _map.length = 0;
  }
  Stack['clear'] = clear;
      
  /**
  * reset the stack, including the saved states
  */
  function reset(){
    _stack.length = _map.length = _states.length = 0;
  }
  Stack['reset'] = reset;

  /**
  * returns the amount of items in the Stack
  */
  function size(){
    return _stack.length;
  }
  Stack['size'] = size;
})();