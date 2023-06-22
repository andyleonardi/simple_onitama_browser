# Onitama Browser Implementation
Recreate Onitama in a browser, using just HTML, CSS &amp; JS

Onitama is a board game that has elements of chess, but combined with some form of hand management.<br>
The card you choose will inform what moves are available to you, but also what will be available for your opponent next round.

Step by step:<br>
<ol>
<li>Just try to create the visuals first.</li>
<li>Try to create the cards as individual divs. Cards have a name, and the 5x5 grids with highlights that represent their available action</li>
<li>Each card’s actions likely need to be its own function. Each time user click on a card and a pawn, it needs to trigger the function. Ideally the function will highlight the possible spaces the pawn is able to move to. Ideally all other spaces should not be clickable, only the highlighted ones. Once user click on one of the highlighted spaces, the selected pawn moves there.</li>
<li>First step, just try to get one card working. See if the flow works (1. user click on a card, 2. user click on a pawn, 3. available spaces gets highlighted, 4. user click on a highlighted space, 5. pawn moves there)</li>
<li>Next is to make it so that if there is already a pawn there, what happens. If it’s player’s own pawn, nothing should happen. Maybe try to insert this condition in 3.3 above. The space with own pawn should not be highlighted. If it’s opponent’s pawn, it will remove the opponent’s pawn.</li>
<li>Last thing to try is when user defeats opponent’s master. The game ends. Maybe a pop-up saying which player won.</li>
<li>Next thing to implement is after a player’s turn, i.e. after 3.5 above, if game has not ended, the clicked card (selected card) needs to move to the left of the opponent’s board.</li>
<li>The tricky thing is because in the actual board game, the cards get rotated (upright as per opposing player's POV), we also need to reverse the cards in web</li>
<li>Once the above concepts work, we move on to creating an array of cards. And randomize 5 to be used in each game. Randomly give 2 to each player, and one to the side. </li>
</ol>

The layout of the webpage is mainly done using flexbox. The 5x5 grid is also done using flexbox.<br>
The header and 5x5 board are hard-coded in the HTML file. The rest of the assets are generated programmatically.<br>
<br>
# To Do List
<ol>
  <li>Explore local storage to store player scores</li>
  <li>Make it so that 2 players can play separately on separate browser tabs</li>
  <li>Drag & drop the meeples instead of clicks</li>
</ol>