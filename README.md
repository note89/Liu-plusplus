# Liu++
Lägg till saknad funktionalitet på Liu's olika webtjänster<br>
[Ladda hem Liu++](https://chrome.google.com/webstore/detail/liu%20%20/knjmceldikaimeoaffpndahkokicdael?hl=sv)<br>

[![Join the chat at https://gitter.im/Niler851/Liu-plusplus](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Niler851/Liu-plusplus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)<br>

## Vad är Liu++ ?
En Chrome plugin som injecerar javascript kod 
på olika liu sidor för att lägga till
ytterligare funktionalitet

## Vad för funktionalitet har Liu++ ?
Popup
* länkar till
  * Studentportalen
  * Salbokning

Studentportalen
* Viktat och oviktat snitt
* Testa och ändra dina betyg och se hur snittet förändras
* Wiki för vilken nivå kursen har
* Direktlänkar till stuidehandboken
* Summering av hur många poäng du tagit på olika nivå
* Få en raport på markerade kurser och resultat.


## Utvecklare ?
1. clona repot
2. npm install && bower install
2. skriv chrome://extensions i chromes sökfält
3. aktivera developermode
4. ladda in repot
5. rock and roll

## Pipeline
1. es6 refactor
2. gör så studiehanboken länkar också är wiki
3. anmäl till tentor med ett tryck
4. firefox port
5. snabblänkar till viktiga sidor i popupen.

### Varför ser koden ut som den gör ? 
Först skrevs koden som ett script till Tampermonkey, 
Där kunde man bara ha en fil.
Nu är planen att refactorera allt till es6 innan nån 
seriöss vidareutveckling.


### Injicera javascript låter farligt
Pluginen tar bara effekt när du väl är inloggad 
och kan inte sno dina loginuppgifter. 
Chrome och firefox tillåter inte plugin att läsa 
av ditt lösenord.
Allt som programmet gör går att läsa i filerna ovan.

