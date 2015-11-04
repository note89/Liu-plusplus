# Liu++
Lägg till saknad funktionalitet på Liu's olika webtjänster

## Vad är studentportalen-extended ?
En Chrome plugin som injecerar javascript kod 
på olika liu sidor för att lägga till
ytterligare funktionalitet

## Vad för funktionalitet har Liu++?
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

