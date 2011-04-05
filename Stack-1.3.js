/*
	StackJS 1.3 - now faster
    
	@author Stefano Stypulkowski
    
  @license GPL <http://iceon.me/license/GPL.txt>
  
  @license MIT <http://iceon.me/license/MIT.txt>
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

var Stack = (function (){
	'use strict';
	
	var
    _stack = [],
    _map = [],
    _states = [];
    
  function _isUniqueId(id){
    return _map.indexOf(id) === -1;
  }

  var StackItem = function (){
    this.id;
    this.obj;
    this.date;
  }
  StackItem.prototype.constructor = StackItem;
  StackItem['getNew'] = function (id,obj){
    var i = new StackItem();
    i.id = id;
    i.obj = obj;
    i.date = new Date();
    return i;
  }

	
	return {

    /**
    * sets a something on the stack
    */
		put: function (obj, id, overwrite){
			
      if ( !_isUniqueId(id) && overwrite === true){
        return false;
      }
			
			var 
        item = StackItem.getNew(id,obj),
        pos = _map.indexOf(id);
      
      if ( pos > -1){
        _stack[pos] = item;
      }else{
        var pos = _stack.push(item);
        _map[pos-1] = id;
      }
			
			return true;
		},
		
    /**
    * get something from the stack
    */
		get: function (id){
      var pos = _map.indexOf(id);
      if (pos >= 0){
      return _stack[pos].obj;
      }
			return null;
		},
		
    /**
    * save a state of the stack
    */
		save: function (label){
			if (typeof label === 'number'){
        _states[label].label = undefined;
        _states[label].stack = _stack.clone();
        _states[label].map = _map.clone();
        return;
      }
      if (label !== undefined){
        for (var s in _states){
          if (_states[s].label === label){
            _states[s].stack = _stack.clone();
            _states[s].map = _map.clone();
            return;
          }
        }
      }    
      _states.push({
        label: label,
        stack: _stack.clone(),
        map: _map.clone()
      });
			return null;
		},
		
    /**
    * restore a previous saved state of the stack
    */
		restore: function (label){
			if (label === undefined){
				if ( _states.length > 0 ){
					_stack = _states[_states.length-1].stack;
					_map = _states[_states.length-1].map;
					_states.length -= 1;
					return true;
				}
			}
			if (typeof label === 'string'){
				for (var i = 0, l = _states.length; i<l; i++){
					if (_states[i].label === label){
						_stack = _states[i].stack;
						_map = _states[i].map;
						_states.length = i;
						return true;
					}
				}
			}
			if (typeof label === 'number'){
				if (_states[label]){
					_stack = _states[label].stack;
					_map = _states[label].map;
					_states.length = label;
					return true;
				}
			}
			return false;
		},
		
    /**
    * exile some element from the stack and return id
    */
		exile: function (id){
			if (typeof id === 'string'){
        var pos = _map.indexOf(id);
        if (pos >= 0){
					var item = _stack[pos].obj; 
					_map.splice(pos,1);
					_stack.splice(pos,1);
					return item;
        }
			}
			return null;
		},
        
    /**
    * removes items from the stack by their ids
    * returns the amount of removed items
    */
    remove: function (){
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
    },


    /**
    * clear the stack, but not the states
    */
		clear: function (){
			_stack.length = _map.length = 0;
      return null;
		},
        
    /**
    * reset the stack, including the saved states
    */
    reset: function (){
      _stack.length = _map.length = _states.length = 0;
      return null;
    },
        
    /**
    * returns the amount of items in the Stack
    */
    size: function(){
      return _stack.length;
    }
	}
})();