/*
	StackJS 1
	@author Stéfano Stypulkowski
*/
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
	
		register: function (obj, id){
			
			if (typeof id !== 'string' || !_isUniqueId(id)){
				return false;
			}
			
			var item = new _StackItem();
			item.id = id,
			item.obj = obj,
			item.date = new Date()
			
			var pos = _stack.push(item);
			_map[pos-1] = id;
			
			return true;
		},
		
		get: function (id){
			if (typeof id === 'string'){
				 var pos = _map.indexOf(id);
				 if (pos >= 0){
					return _stack[pos].obj;
				 }
			}
			return null;
		},
		
		save: function (label){
			_states.push({
				label: label,
				stack: _cloneArray(_stack),
				map: _cloneArray(_map)
			});
			return null;
		},
		
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
		
		clear: function (){
			_stack.length = 0;
			_map.length = 0;
		}
	}
})();