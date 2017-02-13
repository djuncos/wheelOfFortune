

var phraseDisplayed=""

var phraseToGuessCaps=""

var guessList=""

var usedList=""

var wordCount = 0

var phraseSplit = []

var isMyTurn=true

var hiddenSpaces =0

var letterSpaceCount = 0

var letterSpacesShowing = 0

// This is how many seconds you want the computer to take to respond.

compResponseTime = 4

// factor expresses how good opponent is: 0=bad, 1=good

factor = .3

// this function calculates the likelihood that the computer will solve the puzzle 
// based on how many letter tiles are showing and how many there are altogether

function pdf(x, letsInPuzzle){

	return Math.PI*(Math.atan(2*(x-(letsInPuzzle*(1-factor)))))+(0.5)

}

// this function returns true if a string is a one-letter character

function isOneLetter(string){

	if(typeof(string)=="number"||string.toLowerCase() == string.toUpperCase()||string.length!=1){

		return false

	} else {

		return true
	}
}

// tests if a character is one of the following: " ", "-", ":", ".", "!", "?", or ","

function isNonLetterChar(character){

	if((character==" ")||(character=="-")||(character=="'")||(character==":")||(character==".")||(character=="!")||(character=="?")||(character==",")){

			return true

	} else {

		return false

	}

}

// creates word divs for each word in the phrase

function divCreatorWord(string){

		var stringSplit = string.split(" ")

		var strWordCount = stringSplit.length

		for(var i=0; i<wordCount; i++){

			$('.insertClass').append(

		  		$('<div/>')
		    		.addClass("word"+i)
		    		.addClass("words")
    	
			)

		}

}

// function creates new divs for each letter in phraseDisplayed

function divCreatorNew(character,wordNum){

		if(character==" "||isNonLetterChar(character)==true){

			$('.word'+wordNum).append(

		  		$('<div/>')
		    		.addClass("spacePlace")
		    		.append(character)
    	
			)

		} else {

			$('.word'+wordNum).append(

		  		$('<div/>')
		    		.addClass("unknownLetter animated flipInY")
		    		// .append(character)
		    )

		}

}

//

function divCreatorOld(character,charCompare,charDisp,word){

		if(character==charCompare){

			$('.word'+word).append(

		  		$('<div/>')
		    		.addClass("spacePlace animated flipInY revealedText")
		    		.append(character)
			)

		} else if(charDisp=="_"){

			$('.word'+word).append(

		  		$('<div/>')
		    		.addClass("unknownLetter")
		    		// .append(charCompare)
		    )

		} else if (isNonLetterChar(charDisp)==false){

			$('.word'+word).append(

		  		$('<div/>')
		    		.addClass("spacePlace revealedText")
		    		.append(charDisp)
		    )

		} else {

			$('.word'+word).append(

		  		$('<div/>')
		    		.addClass("spacePlace")
		    		.append(charDisp)
		    )

		}

}

// counts the number of spaces showing letters

function letterCount(string){

	var count=0

	for(var i=0; i<string.length; i++){

		if(isOneLetter(string[i])==true){

				count++

		}

	}

	return count

}

//counts the number of spaces with unknown letters

function emptySpaceCount(string){

	var count=0

	for(var i=0;i<string.length;i++){

		if(string[i]=="_"){

			count++
		}

	}

	return count
}
// Insets comments into the comment bar, or "youWinClass".

function youWinInsert(message){

		$('.youWinClass').html(message)

		setTimeout(function() {

        				$('.youWinClass').html("")

        				}, 3*1000)

}


// starts a new game

function newPhrase(phraseToGuess){

	$('.unknownLetter').remove()
	$('.spacePlace').remove()
	$('.words').remove()

	$('.youWinClass').html("")

	guessList=""

	usedList=""

	phraseDisplayed=""

	phraseToGuessCaps=""

	hiddenSpaces=0

	letterSpaceCount=0

	phraseSplit=[]

	phraseToGuessCaps=phraseToGuess.toUpperCase()

	phraseSplit = phraseToGuessCaps.split(" ")

	// console.log(phraseSplit)

	wordCount = phraseSplit.length

	// console.log(wordCount)

	for(var i=0; i<wordCount-1; i++){

		phraseSplit[i]=phraseSplit[i]+" "
	}

	// console.log(phraseSplit)

	divCreatorWord(phraseToGuessCaps)

	var k=0

	for(var j=0; j<wordCount; j++){

		var wordJLength = phraseSplit[j].length

		for(var i=0; i<wordJLength; i++){

			if(isNonLetterChar(phraseToGuessCaps[k])==true){

				phraseDisplayed=phraseDisplayed+phraseToGuessCaps[k]

				divCreatorNew(phraseToGuessCaps[k],j)

				k++

			} else{

				phraseDisplayed=phraseDisplayed+"_"

				divCreatorNew(phraseToGuessCaps[k],j)

				k++

			}

		}

	}

	letterSpaceCount = emptySpaceCount(phraseDisplayed)

	hiddenSpaces=letterSpaceCount

	// console.log(phraseDisplayed)

	$('.phraseDisplayClass').html(phraseDisplayed)

	$('.guessListText').html(guessList)	

}


// throws a letter guess onto the board

function guessALetter(letter){

	var who = ""

	if(isMyTurn==true){

		who = "You"

	} else {

		who= "Your opponent"
	}

	youWinInsert(who+" guessed '"+letter+"'.")

	if(isOneLetter(letter)==false){

		// $('.youWinClass').html("Guess another letter!")

		youWinInsert("Invaild!  Guess another letter!")

		$('#inputLetter').val("")

		myTurn()

	}

	var letterCaps = letter.toUpperCase()

	var phraseAfterGuess = []

	if((guessList.includes(letterCaps)==true)||(usedList.includes(letterCaps)==true)){

		// $('.youWinClass').html("Guess another letter!")

		youWinInsert("Invalid!  Guess another letter!")

		$('#inputLetter').val("")

		myTurn()
	}

	if(phraseToGuessCaps.includes(letterCaps)==false){

		guessList = guessList+letterCaps+" "


	} else {

		usedList = usedList+letterCaps+" "

	}

	$('.unknownLetter').remove()
	$('.spacePlace').remove()

	var k=0

	for(var j=0; j<wordCount; j++){

		var wordJLength = phraseSplit[j].length

		for(var i=0; i<wordJLength; i++){

			divCreatorOld(letterCaps,phraseToGuessCaps[k],phraseDisplayed[k],j)

			if(phraseToGuessCaps[k]==letterCaps){

				phraseAfterGuess[k]=letterCaps

				k++
		
			} else {

				phraseAfterGuess[k]=phraseDisplayed[k]

				k++		

			}

		}

	}

	phraseDisplayed = phraseAfterGuess.join("")

	// console.log(phraseDisplayed)

	$('.phraseDisplayClass').html(phraseDisplayed)

	$('.guessListText').html(guessList)	

}

// randomly picks a letter of the alphabet based on letter usage given in Wikipedia 

letterCumProbArray =[0.081670, 
0.096590, 
0.124410, 
0.166940, 
0.293960, 
0.316240, 
0.336390, 
0.397330, 
0.466990, 
0.468520, 
0.476240, 
0.516490, 
0.540550, 
0.608040, 
0.683110, 
0.702400, 
0.703350, 
0.763220, 
0.826490, 
0.917050, 
0.944630, 
0.954410, 
0.978010, 
0.979510, 
0.999250, 
1
]

letterArray=["A", 
"B", 
"C", 
"D", 
"E", 
"F", 
"G", 
"H", 
"I", 
"J", 
"K", 
"L", 
"M", 
"N", 
"O", 
"P", 
"Q", 
"R", 
"S", 
"T", 
"U", 
"V", 
"W", 
"X", 
"Y", 
"Z"
]

function randomLetter(){

	var number = Math.random()

	for(var i=0; i<letterArray.length;i++){

		if(number<letterCumProbArray[i]){

			return letterArray[i]
		}

	}

}

// brings up solve input and button puzzle on click

var solutionToggle = 0

$('.solvePuzzleClass').click(function(){

			if(solutionToggle==0){

				$('.submitSolutionClass').show()

				solutionToggle=(solutionToggle+1)%2

			} else{

				$('.submitSolutionClass').hide()

				solutionToggle=(solutionToggle+1)%2

			}
			
})




//

$(document).ready(function() {

	newGame()

	// setTimeout(function() {

 //        				newGame()}, 7*1000),

	// setTimeout(function() {

 //        				$('#nealID').removeClass("nothing");
 //        				$('#nealID').addClass("show animated bounceInLeft")

 //        				}, 1*1000)

	// setTimeout(function() {

 //        				$('#ofID').removeClass("nothing");
 //        				$('#ofID').addClass("show animated bounceInRight")

 //        				}, 2*1000)

	// setTimeout(function() {

 //        				$('#horshamID').removeClass("nothing");
 //        				$('#horshamID').addClass("show animated bounceInLeft")

 //        				}, 3.5*1000)

	// setTimeout(function() {

        				
 //        				$('.opening').addClass("zoomOutLeft")

 //        				}, 5*1000)



	function myTurn(){	

			var letter = $('#inputLetter').val()

			letter = letter.toUpperCase()

			isMyTurn=true

   			guessALetter(letter)

   			$('#inputLetter').val("")

   			if(phraseDisplayed==phraseToGuessCaps){

				$('.youWinClass').html("You won!")

				$('.leftSideClass').removeClass("animated rotateInDownLeft")

				$('.leftSideClass').animate({
        			left: '-50%'
    				}, 1000);

    			$('.leftSideClass').addClass("animated rotateOutUpLeft")

			}

   			if(phraseToGuessCaps.includes(letter)==true){

   			} else {

   				$('.leftSideClass').removeClass("animated rotateInDownLeft")

				$('.leftSideClass').animate({
        			left: '-50%'
    				}, 1000);

    			$('.leftSideClass').addClass("animated rotateOutUpLeft")

   				var timeout = setTimeout(function() {
        			hisTurn()}, compResponseTime*1000)

   			}

	}

	$('.guessALetterClass').click(function(){

			myTurn()

	})



// opponent guesses a letter on click
	
	function hisTurn(){

				isMyTurn=false

				hiddenSpaces = emptySpaceCount(phraseDisplayed)

				letterSpacesShowing=letterSpaceCount-hiddenSpaces

				console.log(letterSpacesShowing)

				var solveRand = Math.random()

				var odds = pdf(letterSpacesShowing,letterSpaceCount)

				if(solveRand<odds){

					solvePhrase(phraseToGuessCaps)

					return

				}

				var letter = randomLetter()

				while((guessList.includes(letter)==true)||(usedList.includes(letter)==true)){

					var letter = randomLetter()

				}

	   			guessALetter(letter)

	   			if(phraseDisplayed==phraseToGuessCaps){

					$('.youWinClass').html("You lost!")

				}

   				if(phraseToGuessCaps.includes(letter)==true){

   					$('.leftSideClass').removeClass("animated rotateInDownLeft")

					$('.leftSideClass').animate({
        				left: '-50%'
    					}, 1000);

    				$('.leftSideClass').addClass("animated rotateOutUpLeft")

   					var timeout = setTimeout(function() {

        				hisTurn()}, compResponseTime*1000)

   				} else {

   					$('.leftSideClass').removeClass("animated rotateOutUpLeft")

    				$('.leftSideClass').addClass("animated rotateInDownLeft")

					$('.leftSideClass').animate({
        				left: '4%'
    					}, 800);	

   				}

	}

	$('.opponentClass').click(function(){

				hisTurn()
					
	})

	$('.solutionButtonClass').click(function(){

			var guess = $('#inputGuess').val()

			console.log(guess)

   			solvePhrase(guess)

   			// $('#inputGuess').val("")
	})
	
})

// this function allows you to solve the puzzle

function solvePhrase(string){

	var stringCaps = string.toUpperCase()

	if(stringCaps==phraseToGuessCaps){

		$('.phraseDisplayClass').html(phraseToGuessCaps)

		phraseDisplayed=phraseToGuessCaps

		guessList=""

		usedList=""

		for(var i=0; i<letterArray.length; i++){

			if(phraseToGuessCaps.includes(letterArray[i])==true){

				guessALetter(letterArray[i])

			}

		}

		if(isMyTurn==true){

			$('.youWinClass').html("You won!")

		} else{

			$('.youWinClass').html("You lost!")

		}

		$('.leftSideClass').removeClass("animated rotateInDownLeft")

		$('.leftSideClass').animate({
        	left: '-50%'
    		}, 1000);

    	$('.leftSideClass').addClass("animated rotateOutUpLeft")

	} else {

		// $('.youWinClass').html("Incorrect!")
		youWinInsert("Incorrect!")


	}

}

// this function starts a new game and throws the appropriate hint

function newGame(){

	$('.unknownLetter').remove()
	$('.spacePlace').remove()
	$('.words').remove()

	solutionToggle=0



	$('.submitSolutionClass').hide()

	

	var i=Math.floor((Math.random() * 3))

	if(i=="A"){

		newPhrase(randomMovie())

		$('.hintClass').html("MOVIE")

	} else if(i=="B"){

		newPhrase(randomActor())

		$('.hintClass').html("ACTOR")

	} else if(i==0){

		newPhrase(randomWhatAreYouDoing())

		$('.hintClass').html("WHAT ARE YOU DOING")

	} else if(i==1){

		newPhrase(randomPhrase())

		$('.hintClass').html("PHRASE")

	} else if(i==2){

		newPhrase(randomPeople())

		$('.hintClass').html("PEOPLE")

	}

	$('#inputGuess').val("")

	
}

//

$('.newGameClass').click(function(){

			$('.leftSideClass').removeClass("animated rotateOutUpLeft")

    		$('.leftSideClass').addClass("animated rotateInDownLeft")

			$('.leftSideClass').animate({
        		left: '4%'
    			}, 800);

			newGame()
				
})

// this function chooses a random element from the movie array

function randomMovie(){

	var number = Math.floor((Math.random() * moivesList.length))

	return moivesList[number]

}

// this function chooses a random element from the actors array

function randomActor(){

	var number = Math.floor((Math.random() * actorsList.length))

	return actorsList[number]

}

// this function chooses a random element from the what are you doing array

function randomWhatAreYouDoing(){

	var number = Math.floor((Math.random() * whatAreYouDoingList.length))

	return whatAreYouDoingList[number]

}

// this function chooses a random element from the phrase array

function randomPhrase(){

	var number = Math.floor((Math.random() * phrasesList.length))

	return phrasesList[number]

}

// this function chooses a random element from the people array

function randomPeople(){

	var number = Math.floor((Math.random() * peopleList.length))

	return peopleList[number]

}

 degrees = 90

$(".guessListClass").click(function() {
	$("#wheelID").css({
		"transform": 'rotate('+ degrees + 'deg)',
		"z-index": -2
	})

	degrees += 90
})


 

// this array stores movies

moivesList = ["The Shawshank Redemption", 
"The Godfather", 
"The Godfather: Part II", 
"Pulp Fiction", 
"The Good, the Bad and the Ugly", 
"The Dark Knight", 
"Twelve Angry Men", 
"Schindler's List", 
"The Lord of the Rings: The Return of the King", 
"Fight Club", 
"Star Wars: Episode V - The Empire Strikes Back", 
"The Lord of the Rings: The Fellowship of the Ring", 
"One Flew Over the Cuckoo's Nest", 
"Goodfellas", 
"Seven Samurai", 
"Inception", 
"Star Wars", 
"Forrest Gump", 
"The Matrix", 
"The Lord of the Rings: The Two Towers", 
"City of God", 
"The Silence of the Lambs", 
"Seven", 
"Once Upon a Time in the West", 
"Casablanca", 
"The Usual Suspects", 
"Raiders of the Lost Ark", 
"Rear Window", 
"It's a Wonderful Life", 
"Psycho", 
"Léon: The Professional", 
"Sunset Blvd.", 
"American History X", 
"Apocalypse Now!", 
"Terminator Two: Judgment Day", 
"Memento", 
"Saving Private Ryan", 
"City Lights", 
"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb", 
"Alien", 
"Modern Times", 
"Spirited Away", 
"Gravity", 
"North by Northwest", 
"Back to the Future", 
"Citizen Kane", 
"The Pianist", 
"M", 
"Life Is Beautiful", 
"The Shining", 
"The Departed", 
"Paths of Glory", 
"Vertigo", 
"American Beauty", 
"Django Unchained", 
"Double Indemnity", 
"Taxi Driver", 
"The Dark Knight Rises", 
"Aliens", 
"The Green Mile", 
"The Untouchables", 
"Gladiator", 
"WALL-E", 
"The Lives of Others", 
"Toy Story", 
"The Great Dictator", 
"A Clockwork Orange", 
"The Prestige", 
"Amélie", 
"Lawrence of Arabia", 
"To Kill a Mockingbird", 
"Reservoir Dogs", 
"Das Boot", 
"Cinema Paradiso", 
"The Lion King", 
"The Treasure of the Sierra Madre", 
"The Third Man", 
"Once Upon a Time in America", 
"Requiem for a Dream", 
"Star Wars: Episode VI - Return of the Jedi", 
"Eternal Sunshine of the Spotless Mind", 
"Full Metal Jacket", 
"Braveheart", 
"L.A. Confidential", 
"Oldboy", 
"Singin' in the Rain", 
"Metropolis", 
"Chinatown", 
"Rashomon", 
"Some Like It Hot", 
"Bicycle Thieves", 
"All About Eve", 
"Monty Python and the Holy Grail", 
"Princess Mononoke", 
"Amadeus", 
"Two-Thousand One: A Space Odyssey", 
"Witness for the Prosecution", 
"The Apartment", 
"The Sting", 
"Unforgiven", 
"Grave of the Fireflies", 
"Indiana Jones and the Last Crusade", 
"Raging Bull", 
"The Bridge on the River Kwai", 
"Die Hard", 
"Yojimbo", 
"Batman Begins", 
"A Separation", 
"Inglourious Basterds", 
"For a Few Dollars More", 
"Mr. Smith Goes to Washington", 
"Snatch", 
"Toy Story", 
"On the Waterfront", 
"The Great Escape", 
"Downfall", 
"Pan's Labyrinth", 
"Up", 
"The General", 
"The Seventh Seal", 
"Heat", 
"The Elephant Man", 
"The Maltese Falcon", 
"The Kid", 
"Blade Runner", 
"Wild Strawberries", 
"Rebecca", 
"Scarface", 
"Ikiru", 
"Ran", 
"Fargo", 
"Gran Torino", 
"Touch of Evil", 
"The Big Lebowski", 
"The Gold Rush", 
"The Deer Hunter", 
"Cool Hand Luke", 
"It Happened One Night", 
"Diabolique", 
"No Country for Old Men", 
"The Sixth Sense", 
"Lock","Stock and Two Smoking Barrels", 
"Jaws", 
"Good Will Hunting", 
"Strangers on a Train", 
"Casino", 
"Judgment at Nuremberg", 
"The Grapes of Wrath", 
"The Wizard of Oz", 
"Platoon", 
"Sin City", 
"Butch Cassidy and the Sundance Kid", 
"Kill Bill", 
"The Thing", 
"Trainspotting", 
"Gone with the Wind", 
"High Noon", 
"Annie Hall", 
"Hotel Rwanda", 
"The Hunt", 
"Warrior", 
"The Secret in Their Eyes", 
"Finding Nemo", 
"My Neighbor Totoro", 
"V for Vendetta", 
"Notorious", 
"Dial M for Murder", 
"The Avengers", 
"How to Train Your Dragon", 
"Life of Brian", 
"Into the Wild", 
"The Best Years of Our Lives", 
"Network", 
"The Terminator", 
"Million Dollar Baby", 
"There Will Be Blood", 
"Ben-Hur", 
"The Night of the Hunter", 
"The Big Sleep", 
"The King's Speech", 
"Stand by Me", 
"Twelve Monkeys", 
"Groundhog Day", 
"Donnie Darko", 
"Dog Day Afternoon", 
"Amores Perros", 
"Howl's Moving Castle", 
"Mary and Max", 
"Gandhi", 
"The Bourne Ultimatum", 
"A Beautiful Mind", 
"Persona", 
"The Killing", 
"The Graduate", 
"Rush", 
"Black Swan", 
"The Princess Bride", 
"Who's Afraid of Virginia Woolf?", 
"The Hustler", 
"The Man Who Shot Liberty Valance", 
"La Strada", 
"Anatomy of a Murder", 
"The Manchurian Candidate", 
"Rocky", 
"The Exorcist", 
"Slumdog Millionaire", 
"In the Name of the Father", 
"Stalag Seventeen", 
"Rope", 
"The Wild Bunch", 
"Barry Lyndon", 
"Monsters, Inc.", 
"Fanny and Alexander", 
"Infernal Affairs", 
"The Truman Show", 
"Roman Holiday", 
"Life of Pi", 
"Pirates of the Caribbean: The Curse of the Black Pearl", 
"Memories of Murder", 
"All Quiet on the Western Front", 
"Harry Potter and the Deathly Hallows", 
"Sleuth", 
"Stalker", 
"Jurassic Park", 
"A Streetcar Named Desire", 
"Star Trek", 
"Ratatouille", 
"Ip Man", 
"A Fistful of Dollars", 
"The Diving Bell and the Butterfly", 
"The Hobbit: An Unexpected Journey", 
"District Nine", 
"Shutter Island", 
"Rain Man", 
"Incendies", 
"Rosemary's Baby", 
"La Haine", 
"Three Idiots", 
"The Artist", 
"Beauty and the Beast", 
"Three Colors: Red", 
"Bringing Up Baby", 
"Mystic River", 
"In the Heat of the Night", 
"Arsenic and Old Lace", 
"Before Sunrise", 
"Papillon",
"There's Something About Mary",
"Yentl"
]

// this array stores actors

actorsList = ["Robert De Niro", 
"Jack Nicholson", 
"Tom Hanks", 
"Marlon Brando", 
"Leonardo DiCaprio", 
"Humphrey Bogart", 
"Johnny Depp", 
"Al Pacino", 
"Denzel Washington", 
"Laurence Olivier", 
"Brad Pitt", 
"Daniel Day-Lewis", 
"Tom Cruise", 
"Cary Grant", 
"Dustin Hoffman", 
"Clark Gable", 
"Sean Penn", 
"Christian Bale", 
"Gregory Peck", 
"Harrison Ford", 
"Spencer Tracy", 
"George Clooney", 
"Charlton Heston", 
"Anthony Hopkins", 
"Russell Crowe", 
"Katharine Hepburn", 
"Meryl Streep", 
"Ingrid Bergman", 
"Marilyn Monroe", 
"Jennifer Lawrence", 
"Kate Winslet", 
"Elizabeth Taylor", 
"Cate Blanchett", 
"Audrey Hepburn", 
"Helen Mirren", 
"Bette Davis", 
"Nicole Kidman", 
"Sandra Bullock", 
"Natalie Portman", 
"Jodie Foster", 
"Judi Dench", 
"Amy Adams", 
"Julia Roberts", 
"Emma Thompson", 
"Diane Keaton", 
"Grace Kelly", 
"Shirley MacLaine", 
"Reese Witherspoon", 
"Charlize Theron", 
"Judy Garland", 
"John Wayne", 
"Sidney Poitier", 
"Paul Newman", 
"Matt Damon", 
"Robert Duvall", 
"James Dean", 
"Kirk Douglas", 
"Henry Fonda", 
"Robin Williams", 
"Orson Welles", 
"Christoph Waltz", 
"Heath Ledger", 
"Sean Connery", 
"Kevin Spacey", 
"Gene Hackman", 
"Liam Neeson", 
"Edward Norton", 
"Bruce Willis", 
"Gary Cooper", 
"Philip Seymour Hoffman", 
"Robert Redford", 
"Ralph Fiennes", 
"Joaquin Phoenix", 
"Will Smith", 
"Steve McQueen", 
"Vivien Leigh", 
"Angelina Jolie", 
"Anne Hathaway", 
"Maggie Smith", 
"Olivia de Havilland", 
"Barbara Stanwyck", 
"Joan Fontaine", 
"Greer Garson", 
"Faye Dunaway", 
"Susan Hayward", 
"Ellen Burstyn", 
"Jane Wyman", 
"Sophia Loren", 
"Joan Crawford", 
"Kathy Bates", 
"Julie Andrews", 
"Marion Cotillard", 
"Deborah Kerr", 
"Sissy Spacek", 
"Susan Sarandon", 
"Luise Rainer", 
"Glenn Close", 
"Doris Day", 
"Natalie Wood", 
"Jane Fonda", 
"Jeff Bridges", 
"Chiwetel Ejiofor", 
"Ben Kingsley", 
"Tommy Lee Jones", 
"Samuel L. Jackson", 
"Jack Lemmon", 
"Joe Pesci", 
"Christopher Plummer", 
"George C. Scott", 
"Morgan Freeman", 
"Christopher Walken", 
"John Travolta", 
"James Stewart", 
"Matthew McConaughey", 
"Peter O'Toole", 
"James Cagney", 
"Ian McKellen", 
"John Cusack", 
"Bill Murray", 
"Robert Downey Jr.", 
"Nicolas Cage", 
"Gene Wilder", 
"Kevin Costner", 
"Donald Sutherland", 
"Bruce Dern", 
"Ava Gardner", 
"Jennifer Jones", 
"Sally Field", 
"Greta Garbo", 
"Holly Hunter", 
"Hilary Swank", 
"Claudette Colbert", 
"Diane Lane", 
"Jessica Lange", 
"Gloria Swanson", 
"Lauren Bacall", 
"Frances McDormand", 
"Norma Shearer", 
"Bette Midler", 
"Mary Tyler Moore", 
"Anna Magnani", 
"Halle Berry", 
"Sharon Stone", 
"Kim Basinger", 
"Glenda Jackson", 
"Donna Reed", 
"Geena Davis", 
"Demi Moore", 
"Michelle Pfeiffer", 
"Liza Minnelli", 
"Charles Chaplin", 
"Peter Sellers", 
"Woody Allen", 
"Jon Voight", 
"Mel Gibson", 
"Jim Carrey", 
"Mark Wahlberg", 
"Steve Martin", 
"Javier Bardem", 
"Tim Robbins", 
"Arnold Schwarzenegger", 
"Sylvester Stallone", 
"Viggo Mortensen", 
"Hugo Weaving", 
"Christopher Lee", 
"Geoffrey Rush", 
"Alec Guinness", 
"Richard Burton", 
"Alec Baldwin", 
"James Caan", 
"Michael Douglas", 
"Ben Stiller", 
"Willem Dafoe", 
"Ed Harris", 
"Harvey Keitel", 
"Drew Barrymore", 
"Winona Ryder", 
"Kathleen Turner", 
"Uma Thurman", 
"Hattie McDaniel", 
"Rene Russo", 
"Annette Bening", 
"Sigourney Weaver", 
"Barbra Streisand", 
"Raquel Welch", 
"Joanne Woodward", 
"Shirley Booth", 
"Mercedes McCambridge", 
"Anjelica Huston", 
"Dianne Wiest", 
"Goldie Hawn", 
"Judy Davis", 
"Claudia Cardinale", 
"Gwyneth Paltrow", 
"Julianne Moore", 
"Debra Winger", 
"Christina Ricci", 
"Juliette Binoche", 
"Daryl Hannah", 
"Whoopi Goldberg", 
"Benicio Del Toro", 
"Kevin Bacon", 
"Patrick Swayze", 
"Michael Caine", 
"Clint Eastwood", 
"Burt Lancaster", 
"Robert Mitchum", 
"Colin Farrell", 
"William Holden", 
"Edward G. Robinson", 
"William Powell", 
"Errol Flynn", 
"Groucho Marx", 
"James Mason", 
"Buster Keaton", 
"Gene Kelly", 
"Fred Astaire", 
"Bradley Cooper", 
"Jude Law", 
"Robert Pattinson", 
"Paul Giamatti", 
"Forest Whitaker", 
"Jared Leto", 
"Jonah Hill", 
"Michael Fassbender", 
"Carol Burnett", 
"Jessica Tandy", 
"Helen Hunt", 
"Patricia Arquette", 
"Carmen Miranda", 
"Kate Hudson", 
"Catherine Zeta-Jones", 
"Cameron Diaz", 
"Debbie Reynolds", 
"Rita Hayworth", 
"Maureen O'Hara", 
"Myrna Loy", 
"Lena Headey", 
"Toni Collette", 
"Laura Linney", 
"Marlene Dietrich", 
"Carole Lombard", 
"Jean Arthur", 
"Jean Harlow", 
"Ginger Rogers", 
"Mary Pickford", 
"Mae West", 
"Gillian Anderson", 
"Emma Watson", 
"Meg Ryan"
]


whatAreYouDoingList = ["DIGGING A DITCH", 
"RIDING IN A LIMOUSINE", 
"SAYING I DO", 
"WALKING MY DOG", 
"SHUCKING CORN", 
"WASHING CLOTHES", 
"PLAYING A GAME OF JACKS", 
"FLIRTING WITH A STRANGER", 
"PLAYING CHARADES", 
"GOING STEADY", 
"TOSSING AND TURNING", 
"BAKING COOKIES", 
"BLOWING BUBBLES", 
"DISCO DANCING", 
"DRIVING UNDER THE SPEED LIMIT", 
"FEEDING BIRDS AT THE PARK", 
"FLEXING MY MUSCLES", 
"FLYING CROSS-COUNTRY", 
"FLYING A KITE", 
"GIVING BLOOD", 
"GOING HALFWAY", 
"HAILING A TAXI", 
"HIKING UPHILL", 
"LEAVING EARLY", 
"PLAYING DARTS", 
"REGIFTING A GIFT", 
"RENTING A MOVIE", 
"SHOOING FLIES", 
"SINGING OFF-KEY", 
"SOAKING IN A HOT TUB", 
"SPENDING LESS MONEY", 
"STUFFING A TURKEY", 
"WAITING TABLES", 
"YAWNING", 
"GOING SKYDIVING", 
"HEAPING PRAISE", 
"PLAYING THE PIANO", 
"POCKETING A PROFIT", 
"SIPPING TEA", 
"WORKING UP A SWEAT", 
"BITING MY TONGUE", 
"PLAYING CHECKERS", 
"UNCLOGGING A DRAIN", 
"ALPHABETIZING MY MOVIE COLLECTION", 
"HAVING A PICNIC", 
"RUNNING AMOK", 
"WEARING A KILT", 
"DAYDREAMING", 
"RUNNING A MILE", 
"SHOOTING HOOPS", 
"TAKING A WEEK OFF", 
"TRAVELING INCOGNITO", 
"HAVING A BALL", 
"HONING MY SKILLS", 
"SPIKING THE PUNCH", 
"WASHING MY CAR", 
"STANDING GUARD", 
"BREAKING THE ICE", 
"COUNTING LOOSE CHANGE", 
"FRYING BACON", 
"MAKING WAVES", 
"MENDING A FENCE", 
"RENTING A TUXEDO", 
"SHARING A SECRET", 
"STUBBING MY TOE", 
"PLAYING POLO"]


phrasesList = ["A CHEAP SHOT", 
"A GREAT BUY", 
"A KODAK MOMENT", 
"A PAT ON THE BACK", 
"A WORK IN PROGRESS", 
"AYE CARUMBA!", 
"BACK AND FORTH", 
"BANKERS HOURS", 
"BEGINNER”S LUCK", 
"BEHAVE YOURSELF", 
"BODY LANGUAGE", 
"BRAIN CANDY", 
"BREAK A LEG", 
"BUZZWORTHY", 
"CIRCULAR FILE", 
"COLD SHOULDER", 
"DEAD GIVEAWAY", 
"DEAFENING SILENCE", 
"DON’T BE SHY", 
"DOZED OFF", 
"DRAWING CRITISISM", 
"DRAWING A BLANK", 
"EAT YOUR SPINACH", 
"EDGY LOOK", 
"ENDLESS SUMMER", 
"ENERGY EFFICIENT", 
"EVEN-TEMPERED", 
"FABULOUSLY WEALTHY", 
"FACE THE MUSIC", 
"FAN THE FLAMES", 
"FIFTY-FIFTY", 
"FIGURE OF SPEECH", 
"FILM CAPITOL OF THE WORLD", 
"FLAG ON THE PLAY", 
"FLURRY OF ACTIVITY", 
"FORK IT OVER", 
"GET YOUR GAME ON", 
"GIFT OF GAB", 
"GIVE ME A BREAK", 
"GOING GAGA", 
"GOOD JOB!", 
"GOOD WORK!", 
"GUNG HO", 
"HANG BACK", 
"HAPPY HANUKKAH", 
"HAPPY AS A CLAM", 
"HAPPY-GO-LUCKY", 
"HEADS OR TAILS?", 
"HELP YOURSELF", 
"HIGH IN FIBRE", 
"HIP HIP HOORAY", 
"HOT AND SPICY", 
"HUNKER DOWN", 
"I’M ALL KEYED UP", 
"I’M HUNGRY", 
"I’VE GOT A FEELING ABOUT THIS", 
"I’VE GOT A HUNCH", 
"IMPECCABLE TASTE", 
"IN GOOD SPIRITS", 
"INQUIRE WITHIN", 
"JUST FOCUS", 
"JUST WING IT", 
"KEEP IT HANDY", 
"KILLING TIME", 
"KNOCK IT OFF", 
"KUDOS", 
"LIFE IS GOOD", 
"LIGHTNING FAST", 
"LOW IN CALERIES", 
"LOWER YOUR VOICE", 
"MADE TO ORDER", 
"MAKING A FUSS", 
"MARK MY WORDS", 
"MICROWAVE POPCORN", 
"MIND GAME", 
"MIXED BAG", 
"MOOLA", 
"NO HOLDS BARRED", 
"NOTHING TO SNEEZE AT", 
"NOW AND FOREVER", 
"OFF THE CUFF", 
"OH PHOOEY", 
"OH PHOOEY", 
"ON THE MOVE", 
"ONE OCTAVE HIGHER", 
"PATIENCE IS A VIRTUE", 
"PERMANENT FIXTURE", 
"PIPE DREAM", 
"PLAIN AS DAY", 
"PLAY THE FOOL", 
"PLAY IT SAFE", 
"POETRY IN MOTION", 
"PRIVATE PARKING", 
"QUANTUM LEAP", 
"QUITE A JOLT", 
"RED AS A BEET", 
"REMEMBER WHEN", 
"ROMANTIC SPARKS", 
"SAFE AND SOUND", 
"SEIZE THE DAY", 
"SETTING THE STAGE", 
"SETTING THE STAGE", 
"SHABBY CHIC", 
"SHAKE IT UP", 
"SINK OR SWIM", 
"SLAPHAPPY", 
"SMOKING GUN", 
"SMOOTH AS SILK", 
"SPICE IT UP", 
"STAR QUALITY", 
"STROKE OF LUCK", 
"SURF’S UP", 
"THE BIG LEAGUES", 
"THE WHOLE SHEBANG", 
"TOP-NOTCH", 
"TOPSY-TURVY", 
"UP THE ANTE", 
"UP UP AND AWAY!", 
"UP-AND-COMING", 
"VERY HUSH-HUSH", 
"VICIOUS CYCLE", 
"WEDDED BLISS", 
"WELCOME ABOARD", 
"WIGGLE ROOM", 
"WISH ME LUCK", 
"YOU CAN DO IT", 
"YOU’RE GOOD TO GO", 
"YOUNG AT HEART", 
"ZOOM IN", 
"ADULTS GET IN AT THE KIDS PRICE", 
"EXCITING STORY", 
"FAT CHANCE", 
"FLUFF & FOLD", 
"GO FOR BROKE", 
"GOOD GRIEF", 
"HISTORY IN THE MAKING", 
"I DOZED OFF", 
"LADIES FIRST", 
"NIP AND TUCK", 
"OUT LIKE A LIGHT", 
"ROYAL BLOOD", 
"SECOND CHILDHOOD", 
"WORTH EVERY PENNY", 
"YOU DON’T FOOL ME", 
"KEEPING IT REAL", 
"ONE SIZE FITS ALL", 
"PUPPY LOVE", 
"QUICK RECOVERY", 
"WHISKED AWAY", 
"UP FOR GRABS", 
"EASY AS PIE", 
"FIXER-UPPER", 
"GRIN AND BEAR IT", 
"OLD GLORY", 
"STICK TO IT", 
"TAKE FIVE", 
"TAKE A BOW", 
"WATCH YOUR STEP", 
"TICKLED PINK", 
"IN FULL SWING", 
"BABY ON BOARD", 
"BAFFLES ME", 
"HANGING OUT", 
"LUCKY NUMBERS", 
"OVER THE TOP", 
"FLIGHT OF FANCY", 
"HARD AT WORK", 
"HOLD YOUR HORSES", 
"HOLY SMOKES!", 
"BUTT OUT", 
"COP OUT", 
"FILTHY RICH", 
"GUTSY MOVE", 
"IN FULL BLOOM", 
"JUMP FOR JOY", 
"LOCAL COLOR", 
"WIDE-AWAKE", 
"ONE FOR THE MONEY TWO FOR THE SHOW", 
"TIE THE KNOT", 
"BAKERS DOZEN", 
"EASY MONEY", 
"GOING BANANAS", 
"I REST MY CASE", 
"JOG MY MEMORY", 
"LEGEND IN THE MAKING", 
"BIRD’S EYE VIEW", 
"ON THE REBOUND", 
"SPRING FEVER", 
"ACT YOUR AGE", 
"MIND OVER MATTER", 
"CURB APPEAL", 
"HEALTHY GLOW", 
"LOVE IS BLIND", 
"NICE AND WARM", 
"PLAYING IT COOL", 
"POKER FACE", 
"QUITTING TIME", 
"THE BIG APPLE", 
"WALK THE PLANK", 
"CRYSTAL CLEAR", 
"GET A GRIP", 
"I DARE NOT SAY", 
"BOTTOM’S UP", 
"DESIGN", 
"PLAY BALL", 
"HEAVEN ON EARTH", 
"SHOULDERING THE LOAD", 
"OH BROTHER", 
"THE COAST IS CLEAR", 
"IMAGINE THAT", 
"LABOR OF LOVE", 
"ON THE SURFACE", 
"ONE OF A KIND", 
"DRINK RESPONSIBLY", 
"BEWARE OF DOG", 
"BRIDGE THE GAP", 
"IT BAFFLES ME", 
"NEAT AS A PIN", 
"PASSING THE BUCK", 
"RELAX AND ENJOY!", 
"STAYING IN THE LOOP", 
"THICK AND JUICY", 
"THINK FAST", 
"TIES THAT BIND", 
"GREAT JOB", 
"SAVING FACE", 
"SITTING DUCK", 
"AGING GRACEFULLY", 
"SAVING FACE", 
"KISS-AND-TELL", 
"TWO THUMBS UP", 
"BEGINNER’S LUCK", 
"GEE WHIZ", 
"CALL FIRST", 
"GRIT YOUR TEETH", 
"TOUGH IT OUT", 
"SYMBOL OF HOPE", 
"BURNT TO A CRISP", 
"EBB & FLOW", 
"HEADS UP!", 
"KODAK MOMENT", 
"POP THE TRUNK", 
"TOP PRIORITY", 
"UP TO SNUFF", 
"DON’T BLINK", 
"THE MOTOR CITY", 
"READY SET GO!", 
"WORTH THE RISK", 
"DOUBLE DIPPING", 
"DON’T BE FOOLED", 
"BY THE WAY", 
"COMMON KNOWLEDGE", 
"ON A LARK", 
"GET A LIFE", 
"JUST ADD WATER", 
"INNER CHILD", 
"SEASON’S GREETINGS", 
"ALL SYSTEMS GO", 
"SAVE THE WHALES", 
"NEVER SAY NEVER", 
"KODAK MOMENT", 
"GOING APE", 
"GOOD RIDDANCE", 
"IN THE GROOVE", 
"PAVE THE WAY", 
"QUICK AND EASY"
]

peopleList =["ADRENALINE JUNKIES", 
"ANCESTORS", 
"AQUARIANS", 
"AUNT & UNCLE", 
"BALLROOM DANCERS", 
"BATON TWIRLER", 
"BLOGGERS", 
"BOBSLED TEAM", 
"BODYGUARDS", 
"BOWLING LEAGUE", 
"BOY SCOUT TROOP", 
"CADDIES", 
"CAPTIVE AUDIENCE", 
"CAR OWNERS", 
"CAT LOVERS", 
"COOL SURFERS", 
"CORPORATE SPONSORS", 
"DISTANT COUSINS", 
"DISTINGUISHED GUESTS", 
"DOCUMENTARY FILM CREW", 
"DOCUMENTARY", 
"FOOTBALL FANS", 
"FRESH FACES", 
"FRIENDLY NEIGHBORS", 
"FULL CROWD", 
"GENERAL PUBLIC", 
"GLEE CLUB", 
"GRAND JURY", 
"HIGH FLYERS", 
"HOLIDAY SHOPPERS", 
"HUNG JURY", 
"HUSBAND AND WIFE", 
"IDENTICAL TWINS", 
"IMMEDIATE FAMILY", 
"IN-CROWD", 
"JOB APPLICANTS", 
"JUDGE & JURY", 
"LAWMAKERS", 
"LONGSHOREMEN", 
"LOVEBIRDS", 
"NEWBORN BABIES", 
"NO-SHOWS", 
"OFFENSIVE LINEMAN", 
"PATIENTS", 
"PAYING CUSTOMERS", 
"PENNSYLVANIA DUTCH", 
"POLICYMAKERS", 
"REPEAT CUSTOMERS", 
"REPEAT PATIENTS", 
"RESCUE DIVERS", 
"SEARCH PARTY", 
"STRING QUARTET", 
"STUDIO AUDIENCE", 
"SUBWAY RIDERS", 
"SUNBATHERS", 
"SYMPHONY", 
"TASK FORCE", 
"TEACHING STAFF", 
"TEAM MEMBERS", 
"TEAMSTERS", 
"TEENAGERS", 
"THEATERGOERS", 
"TOP BRASS", 
"TOP PLAYERS", 
"TRAINED TECHNICIANS", 
"TRAINED ATHLETES", 
"TRIPLETS", 
"TWINS", 
"UNEXPECTED COMPANY", 
"UNSUNG HEROS", 
"USUAL SUSPECTS", 
"VACATIONERS", 
"VEGETARIANS", 
"VIKINGS", 
"VIRGOS", 
"VOLLEYBALL TEAM", 
"WELL-WISHERS", 
"WILLING PARTICIPANTS", 
"WINNERS CIRCLE", 
"WORKING STIFFS", 
"WRECKING CREW", 
"EAGER HOPEFULS", 
"FLIGHT CREW", 
"JOGGERS", 
"URBANITES", 
"WOODWIND SECTION", 
"YOUNG ADULTS", 
"COWBOYS", 
"HUMAN RACE", 
"VISITING TEAM", 
"UNION MEMBERS", 
"COYBOYS", 
"DRAFT BOARD", 
"FACULTY & STAFF", 
"NEIGHBORS", 
"MARCHING BAND", 
"HOME OWNERS", 
"PIT CREW", 
"REGISTERED VOTERS", 
"SAVVY BUYERS", 
"USHERS", 
"YOUNG COUPLE", 
"CHAIN OF COMMAND", 
"CUB SCOUTS", 
"EXTENDED FAMILY", 
"POLITICAL PUNDITS", 
"TASTE TESTERS", 
"PROUD FAMILY", 
"TEXANS", 
"WISE FOLKS", 
"ATTRACTIVE COUPLE", 
"NEW NEIGHBORS", 
"LOYAL FRIENDS", 
"OLYMPIC GYMNASTS", 
"SQUADRON", 
"FOOTBALL TEAM", 
"EXPANSION TEAM", 
"PEER GROUP", 
"STUDENT BODY", 
"TWIN GIRLS", 
"BOWLING TEAM", 
"CLOSE-KNIT FAMILY", 
"SMILING CHILDREN", 
"PROUD PARENTS", 
"THRILL SEEKERS", 
"CLINICIANS", 
"RHYTHM SECTION", 
"NEW RECRUITS", 
"ATTENDEES", 
"BOYS & GIRLS", 
"ECONOMISTS", 
"NAVY SEALS", 
"CAST & CREW", 
"EDITORIAL STAFF", 
"FOOD ENTHUSIASTS", 
"FISHERMEN", 
"ESKIMOS", 
"SILENT MAJORITY", 
"TEEN DRIVER", 
"LITTLE TIKES", 
"TELEVISION CREW", 
"SPIRITED BUNCH", 
"GROWN-UPS", 
"STUDY GROUP", 
"FOREIGN PRESS", 
"TAXPAYERS", 
"ART PATRONS", 
"COHORTS", 
"HONOR GUARD", 
"FOUNDING FATHERS", 
"ELECTED OFFICIALS", 
"ROCK BAND", 
"ARMY BUDDIES", 
"SUMO WRESTLERS"
]