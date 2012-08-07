# StackJS 1.3 by Stefano Stypulkowski

>StackJS provides a global object called Stack, which can store values with aliases.
>Any javascript value can be stored inside this stack.
>So, when you need those values, they are ready to go ;]~~

Documentantion
==============

.put(value, alias, overwrite = true)
------------------------------------

Sets some value on the stack, set thrid parameter to false to prevent data updating.

.get(alias)
-----------

Returns value with given alias.

.exile(alias)
-------------

Returns value with given alias and deletes it from Stack.

.remove(alias1, alias2, ..., aliasN)
---------

Removes many items from Stack, returning the amount of deletions.

.clear()
--------

Removes all items from Stack.

.reset()
--------

Removes all items from Stack, along with the save points.

.size()
-------

Returns the Stack size.

.save(alias?)
-------------

Creates a save point on Stack, it will hold all the Stack state at that time, and works like a backup. If same alias is specified more than one time, the save point will be overwrote. If no parameter is specified, a anonymous save point will be create.

.restore(alias?)
----------

Restores a save point by its alias. If no alias is specified, last save point will be restored.