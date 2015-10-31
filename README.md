# studentportalen-extended
Lägg till saknad funktionalitet till studentportalen

## Vad är studentportalen-extended ?
En Chrome/Firefox plugin som injecerar javascript kod 
på studentportalens studieresultat sida för att lägga till
ytterligare funktionalitet

## Vad för funktionalitet har studentportalen-extended ?
Studentportalen extended lägger i dagsläget till följande funktioner
på studieresultat sidan. 

* Viktat och oviktat snitt
* Testa och ändra dina betyg och se hur snittet förändras
* Wiki för vilken nivå kursen har
* Direktlänkar till stuidehandboken
* Summering av hur många poäng du tagit på olika nivå
* Få en raport på markerade kurser och resultat.


## Utvecklare ?
1. clona repot
2. npm install && bower install
2. skriv chrome://extensions
3. aktivera developermode
4. ladda in repot
5. rock and roll


### Injicera javascript låter farligt
Pluginen tar bara effekt när du väl är inloggad 
och kan inte sno dina loginuppgifter. 
Chrome och firefox tillåter inte plugin att läsa 
av ditt lösenord.
Allt som programmet gör går att läsa i filerna ovan.

