/*
	StackJS 1.2
    
	@author Stefano Stypulkowski
    
    @license GPL <http://www.icewares.com.br/license/GPL.txt>
    
    @license MIT <http://www.icewares.com.br/license/MIT.txt>
*/

//Array indexOf implementation
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function (elt){
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
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

var Stack = (function (){
	'use strict';
	
	var _stack = [];
	
	var _map = [];
	
	var _states = [];
	
	var _isUniqueId = function (id){
		return _map.indexOf(id) === -1;
	}
	
	var _StackItem = function (){
		this.id;
		this.obj;
		this.date;
	}
	_StackItem.prototype.constructor = _StackItem;
	
	var _cloneArray = function (array){
		var a = [];
		for (var i = 0, j = array.length;i<j; i++){
			a.push(array[i]);
		}
		return a;
	}
	
	return {
	
        /**
        * sets a something on the stack
        */
		put: function (obj, id, mode){
			
			if (typeof id !== 'string'){
				return false;
			}
            if ( !_isUniqueId(id) && mode === 'nooverwrite'){
                return false;
            }
			
			var item = new _StackItem();
			item.id = id,
			item.obj = obj,
			item.date = new Date()
            
			var pos = _map.indexOf(id);
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
			if (typeof id === 'string'){
				 var pos = _map.indexOf(id);
				 if (pos >= 0){
					return _stack[pos].obj;
				 }
			}
			return null;
		},
		
        /**
        * save a state of the stack
        */
		save: function (label){
			_states.push({
				label: label,
				stack: _cloneArray(_stack),
				map: _cloneArray(_map)
			});
			return null;
		},
		
        /**
        * restore a previous saved state of the stack
        */
		restore: function (label){
			if (typeof label !== 'string' && typeof label !== 'number'){
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
						_stack = _states[_states.length-1].stack;
						_map = _states[_states.length-1].map;
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
        * n parameters, any ids from items given as parameter will be used to remove
        *  returns the amount of deletions
        */
        remove: function (){
            var removed = 0;
            for (var i = 0, l = arguments.length; i < l;i++){
            
                if (typeof arguments[i] === 'string'){
                
                    var pos = _map.indexOf(arguments[i]);
                    
                    if (pos >= 0){
                        var item = _stack[pos].obj; 
                        _map.splice(pos,1);
                        _stack.splice(pos,1);
                        removed++;
                    }
                }
            }
            return removed;
        },

		
        /**
        * clear the stack bug not the states
        */
		clear: function (){
			_stack.length = 0;
			_map.length = 0;
            return null;
		},
        
        /**
        * reset the stack, including the saved states
        */
        reset: function (){
            _stack.length = 0;
			_map.length = 0;
            _states.length = 0;
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