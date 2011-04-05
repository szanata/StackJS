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

test('simple set/get data', function (){
    var c1 = {};
    c1.model = 'calibra';
    c1.year = 95;
    c1.manufacter = 'Opel';
    
    var c2 = {};
    c2.model = '535i';
    c2.year = 97;
    c2.manufacter = 'BMW';
    
    ok(Stack.put(c1,'my first car'),'Adding something');
    ok(Stack.put(c2,'my second car'),'Adding one more thing');
    
    equals(Stack.get('a car that I never had'),null,'Getting nothing');
    equals(Stack.get('my first car'),c1,'Getting the first thing');
    equals(Stack.get('my second car'),c2,'Getting the second thing');
});
test('update data', function (){
    
    Stack.put(1,'my secret number');
    
    equals(Stack.get('my secret number'),1,'The secret number was stored');
    
    Stack.put(2,'my secret number');
    
    equals(Stack.get('my secret number'),2,'The secret number was updated');
    
    Stack.put(3,'my secret number',true);
    
    equals(Stack.get('my secret number'),2,'The secret number wasn\'t update because I said NOOVERWRITE');

});

test('deleteing data', function (){

    Stack.put(Math.PI,'PI');
    
    equals(Stack.get('PI'),Math.PI,'PI is safe');
    equals(Stack.exile('PI'),Math.PI,'PI is now being removed');
    equals(Stack.exile('PI'),null,'PI is gone');
    
    for (var i = 0; i < 5 ; i++){
        Stack.put(i,String(i));
    }
    var total = Stack.get('0') + Stack.get('1') + Stack.get('2');
    equals(total,3,'Added 3 fuckin\' pigs inda house');
    
    equals(Stack.remove('0','1','2'),3,'Da wolf is removing da funckin pigs');
    
    total = String(Stack.get('0')) + String(Stack.get('1')) + String(Stack.get('2'));
    equals(total,'nullnullnull','Da funckin\' pigs are dead');
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

test('saving point without label and restore it without parameters', function (){

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

test('saving point without label and restore it by its number', function (){

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
    
    ok(Stack.restore(0),'Must restore the first save point, which is 0');
    equals(Stack.size(),3,'The first save point is now the current');
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