#Nodeventures

Your final task will be a bit more ambitious. We want you to build an MMORPG powered by a node back end.

You're free to choose a theme and story for your world, anything goes.

What we want you to do is design a nice API both for real time data(hero movement, battles, item exchange, etc.…) and for some one-off requests(fetching avatars, history of events, etc.…).

Feel free to split your implementation into as many node applications as you feel are needed.

---

##Required functionality
###World navigation
You have a world, potentially endless, that your players get to explore and walk around. It's a 2D plane, nothing too fancy.

You should have some abstraction for buildings(houses, castles, space stations, whatever you like). Heroes and items could either be in the open world, or inside a building. Buildings might not always be accessible, or might require the possession of a certain item to enter them.

---

###Items
Items can be scattered around the world, including inside buildings. Heroes can acquire items by either finding them in the world, or trading with other heroes.

Each item has a weight. A hero should only be able to carry around up to a certain amount of items based on their collective weight.

####Boost items
Some items boost heroes' stats when they acquire them. Once the hero sells the item or loses it in battle the effect of acquiring it is reverted.

A good idea is to have items enhancing your max health, or granting you additional armour. Some items might work over time, restoring your health a little over some period of time.

####Weapons
Some items are weapons. That means they have some amount of damage they inflict to the enemy they are used on.

####Passive items
Items might not boost a hero's stats if they server another purpose(e.g. unlocking buildings).

---

###Heroes
####Movement
Heroes should be able to move around the world freely. The only obstacles should be buildings or other heroes along the way. The possible directions are north, west, east, south and the respective combinations - a total of 8 directions.

####Inventory
Each hero has some type of inventory(a backpack, magical extremely big pockets, etc.…). The inventory has a maximum amount of weight in can handle, it should be finite and might be expanded by acquiring some item.

####Battles
When two heroes are close enough to each other, or inside the same building, they can engage in a battle. The battle is turn based, on each turn the hero who's attacking gets to choose a weapon from their inventory to use. The battle ends after a certain number of rounds or after one of the heroes' health goes down to zero. In case one of the heroes dies the winner gets to choose among the items possessed by the defeated one and take anything, as long as that doesn't conflict with their inventory limit.

---
###Buildings
####Mechanics
A building is essentially a separate world map linked to the main one via its entrance. A building might take up less space on the real world map than is actually accessible from inside it. It can be bigger on the outside/smaller on the inside.


##Clients
There should be two types of clients: one running on the command line and one built as a web app.

Both clients need to just give a good way to communicate with the server and expose it's functionalities. All and any bells and whistles are more than welcome, but they're not the main focus.

###Command line
The command line client can employ any type of interface.

A fully textual client, as a game book, but with some elements of real time action as the world changes not only based upon your actions, but also the actions of other heroes in the world.

A more graphical command line client employing [blessed](https://github.com/chjj/blessed), [drawille](https://github.com/madbence/node-drawille), [drawille-canvas](https://github.com/madbence/node-drawille-canvas) or [ansi-canvas](https://github.com/TooTallNate/ansi-canvas), showing some sort of graphical representation of the world.

###Web app client
The best idea would be to use a `<canvas>` to draw some state of the world around your hero on it.
