StackJS 1.3 by Stefano Stypulkowski
===================================

>StackJS provides a global object called Stack, which can store values with aliases.
>Any javascript value can be stored inside this stack.
>So, when you need those values, they are ready to go ;]~~

# Documentantion

.put()
------
-Stack.put(object, id)
-Stack.put(object, id, overwrite)
-Returns {boolean}:
--true, if the new element was added, false otherwise.
-Parameters:
--**object {<anything>}:** anythings, seriously.
--**id {<anything>}:** a unique id to this position of the stack, can be anything, including undefined, if you pass some repeated id, its position will not be overwrited.
--**overwrite {boolean}:** if you pass a third boolean parameter with true value within an some id that already in the stack, it position will be overwrited.

> This is the main method from Stack, with which you will add elements on the stack.

