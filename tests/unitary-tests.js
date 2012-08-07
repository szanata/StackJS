
module('StackJS');

test('JS Integrity', function (){
    equals(typeof Stack,'object','The Stack is ready!');
});

test('Array.prototype.clone', function (){

  var 
    a1 = [1,2,3,4,5],
    a2 = a1.clone();
    
  equals(a2.join(''),'12345','Cloned array is equals.');
  
  
  same(a1,a2,'The cloned adn the original array are equals.');
  
  a2.push(6,7,8);
  
  equals(a1.join(''),'12345','Clone based array not changed.');
  equals(a2.join(''),'12345678','Cloned array is working.');
  
});

test('storing different data types', function (){
    
  var 
    string = '',
    number = 0,
    date = new Date(),
    regex = /./g,
    func = function (){},
    object = {},
    buildin = HTMLElement,
    bool = true,
    und = undefined,
    nil = null;

  ok(Stack.put(string,'string'),'Storing a String');
  ok(Stack.put(number,'number'),'Storing a Number');
  ok(Stack.put(bool,'boolean'),'Storing a Boolean');
  ok(Stack.put(und,'undefined'),'Storing a undefined');
  ok(Stack.put(nil,'null'),'Storing a null');
  ok(Stack.put(date,'date'),'Storing a Date');
  ok(Stack.put(regex,'regex'),'Storing a Regex');
  ok(Stack.put(func,'function'),'Storing a Function');
  ok(Stack.put(object,'object'),'Storing a Object');
  ok(Stack.put(buildin,'HTMLElement'),'Storing a HTMLElement');
  
  equals(Stack.get('string'),string,'Getting the String');
  equals(Stack.get('number'),number,'Getting the Number');
  equals(Stack.get('boolean'),bool,'Getting the Boolean');
  equals(Stack.get('undefined'),und,'Getting the undefined');
  equals(Stack.get('null'),nil,'Getting the null');
  equals(Stack.get('date'),date,'Getting the Date');
  equals(Stack.get('regex'),regex,'Getting the Regex');
  equals(Stack.get('function'),func,'Getting the Function');
  equals(Stack.get('object'),object,'Getting the Object');
  equals(Stack.get('HTMLElement'),buildin,'Getting the HTMLElement');
  Stack.clear();
});

test('storing with diffrente types of ids', function (){
  var 
    string = '',
    number = 0,
    date = new Date(),
    regex = /./g,
    func = function (){},
    object = {},
    buildin = HTMLElement,
    bool = true,
    und = undefined,
    nil = null;

  ok(Stack.put(0,string),'Storing with a String id');
  ok(Stack.put(1,number),'Storing with a Number id');
  ok(Stack.put(2,bool),'Storing with a Boolean id');
  ok(Stack.put(3,und),'Storing with a undefined id');
  ok(Stack.put(4,nil),'Storing with a null id');
  ok(Stack.put(5,date),'Storing with a Date id');
  ok(Stack.put(6,regex),'Storing with a Regex id');
  ok(Stack.put(7,func),'Storing with a Function id');
  ok(Stack.put(8,object),'Storing with a Object id');
  ok(Stack.put(9,buildin),'Storing with a HTMLElement id');

  equals(Stack.get(string),0,'Getting the String id');
  equals(Stack.get(number),1,'Getting the Number id');
  equals(Stack.get(bool),2,'Getting the Boolean id');
  equals(Stack.get(und),3,'Getting the undefined id');
  equals(Stack.get(nil),4,'Getting the null id');
  equals(Stack.get(date),5,'Getting the Date id');
  equals(Stack.get(regex),6,'Getting the Regex id');
  equals(Stack.get(func),7,'Getting the Function id');
  equals(Stack.get(object),8,'Getting the Object id');
  equals(Stack.get(buildin),9,'Getting the HTMLElement id');
  Stack.clear();
});

test('update data', function (){
    
  Stack.put(1,'my secret number');
  equals(Stack.get('my secret number'),1,'The secret number was stored');
  Stack.put(2,'my secret number');
  equals(Stack.get('my secret number'),2,'The secret number was updated');
  Stack.put(3,'my secret number',false);
  equals(Stack.get('my secret number'),2,'The secret number wasn\'t update because the thrid parameter was specified');
  Stack.clear();
});

test('deleting data', function (){

  Stack.put(Math.PI,'PI');
  
  equals(Stack.get('PI'),Math.PI,'PI is safe');
  equals(Stack.exile('PI'),Math.PI,'PI is now being removed');
  equals(Stack.exile('PI'),null,'PI is gone');
  
  for (var i = 0; i < 3 ; i++){
    Stack.put(i,i);
  }
  var total = Stack.get(0) + Stack.get(1) + Stack.get(2);
  equals(total,3,'Added 3 elements to Stack');
  
  equals(Stack.remove(0,1,2),3,'Removing 3 elements at the same time');
  
  total = String(Stack.get(0)) + String(Stack.get(1)) + String(Stack.get(2));
  equals(total,'nullnullnull','All elements was removed');
  Stack.clear();
});

test('clear and size', function (){

  Stack.clear();
  equals(Stack.size(),0,'The stack size is 0! [EMPTY]');
  
  Stack.put(Math.PI,'PI');
  Stack.put(Math.E,'E');
  
  equals(Stack.size(),2,'The stack size has now 2 items!');
  
  Stack.clear();
  equals(Stack.size(),0,'The stack is clear again');
});

test('saving point without label and restore it without parameters (last)', function (){

  Stack.reset();
  
  Stack.put(1,'A1');
  Stack.put(2,'A2');
  Stack.put(3,'A3');
  
  Stack.save();
  
  Stack.put(4,'A4');
  Stack.put(5,'A5');
  
  Stack.save();
  
  Stack.put(6,'A6');
  Stack.put(7,'A7');
  
  ok(Stack.restore(),'Must restore the last save point');
  equals(Stack.size(),5,'The last point is now the current');
});

test('saving points with label and restoring them', function (){

  Stack.reset();
  
  Stack.put(1,'A1');
  Stack.put(2,'A2');
  Stack.put(3,'A3');
  
  Stack.save('first point');
  
  Stack.put(4,'A4');
  Stack.put(5,'A5');
  
  Stack.save('second point');
  
  Stack.put(6,'A6');
  Stack.put(7,'A7');
  
  ok(Stack.restore('second point'),'Must restore the second save point');
  equals(Stack.size(),5,'The second save point is now official');
  
  ok(Stack.restore('first point'),'Must restore the first save point');
  equals(Stack.size(),3,'The first save point is now official');
});

test('Reseting', function (){

  Stack.put(1,'A1');
  Stack.put(2,'A2');
  Stack.put(3,'A3');
  
  Stack.save('check point');
  
  Stack.put(1,'A1');
  Stack.put(2,'A2');
  Stack.put(3,'A3');
  
  Stack.reset();
  
  ok(!Stack.restore('check point'),'Nothing to restore');
  equals(Stack.size('check point'),0,'The stack is empty');
});