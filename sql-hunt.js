// 1. Find the country with the highest number of engineers

/***********Statement***********/
// SELECT country_id, COUNT(*) AS counted, name
// FROM engineers, countries
// WHERE countries.id = country_id
// GROUP BY country_id, name
// ORDER BY counted DESC
// LIMIT 10;

/***********ANSWER***********/
// Country Name: French Southern and Antarctic Lands
// Country ID: 34
// Number of People: 13



// 2. Find the three teams with the highest number of engineers and order them by the number of bugs, largest first.

/***********Statement***********/
///////Gets the top 3 teams with highest number of engineers
// SELECT team_id, COUNT(*) AS counted, teams.name, current_bugs
// FROM engineers, teams
// WHERE teams.id = engineers.team_id
// GROUP BY team_id, name, current_bugs
// ORDER BY counted DESC
// LIMIT 3;

///////Now that we know the minimum number, we can add that to our where clause and order by number of bugs
// SELECT team_id, COUNT(*) AS counted, teams.name, current_bugs
// FROM engineers, teams
// WHERE teams.id = engineers.team_id
// GROUP BY team_id, name, current_bugs
// HAVING COUNT (team_id) >= 38
// ORDER BY current_bugs DESC
// LIMIT 3;

/***********ANSWER***********/
// #1
// Team Name: DM
// Team ID: 3
// Team Members: 38
// Bugs: 37
// #2
// Team Name: CZ9
// Team ID: 4
// Team Members: 44
// Bugs: 8
// #3
// Team Name: SES
// Team ID: 8
// Team Members: 45
// Bugs: 1



// 3. Find the oldest engineer with a repository written using functional programming. 
// If needed, the winner is the one with the most functional programming repositories.

/***********Statement***********/
///////To get age of oldest person
// SELECT age
// FROM engineers
// ORDER BY age DESC

///////To get number of repos and language name
// SELECT CONCAT(engineers.first_name, ' ', engineers.last_name), 
//     engineers.age, 
//     engineer_programming_languages.repositories, 
//     programming_languages.name
// FROM engineers, 
//     engineer_programming_languages, 
//     programming_languages
// WHERE (engineer_programming_languages.engineer_id = engineers.id AND
//     engineers.age = 70 AND 
//     programming_languages.id = engineer_programming_languages.programming_language_id)
// AND (engineer_programming_languages.programming_language_id = 2 OR
//     engineer_programming_languages.programming_language_id = 6 OR 
//     engineer_programming_languages.programming_language_id = 7 OR 
//     engineer_programming_languages.programming_language_id = 8)
// ORDER BY repositories DESC
// LIMIT 1;

/***********ANSWER***********/
// Name of Engineer = Edie Mraz
// Age of Engineer = 70
// Number of Repos = 88
// Programing Language = Haskell



// 4. Find the second least represented region within the teams.
/***********Statement***********/
// SELECT engineers.country_id, COUNT(*) as counted, countries.name 
// FROM engineers, countries 
// WHERE engineers.country_id = countries.id
// GROUP BY engineers.country_id, countries.name 
// ORDER BY counted DESC
// LIMIT 5;

/***********ANSWER***********/
// Country Name: Netherlands, Poland, Bouvet Island
// Country ID: 10, 42, 36 (respectively)
// Number of People: 10



// 5. Find who published the book with the highest average rating.

/***********Statement***********/
// SELECT books.title, books.publisher, to_char(avg(to_number(bookshelves.rating, '9999')), '999999999999D99') as avg_rating
// FROM books, bookshelves 
// WHERE bookshelves.book_id = books.id 
// GROUP BY books.title, books.publisher
// ORDER BY avg_rating DESC;

/***********ANSWER***********/
// There were multiple books with the same book title (different authors)
// Only one rating, so their average was that single rating
// TWO-WAY TIE
// Book Title: Stranger in a Strange Land / If Not Now, When?
// Publisher: Mainstream Publishing / Pavilion Books
// Average Rating: 98.00


// 6. Find the capital of the country where the oldest person in the team that shipped the most features comes from.

/***********Statement***********/
///// Get team_id for team that shipped most features
// SELECT *
// FROM teams
// ORDER BY features_shipped DESC;
///// Get eldest person information
// SELECT engineers.first_name, engineers.last_name, engineers.age, engineers.country_id, engineers.team_id, countries.name, countries.capital 
// FROM engineers, countries 
// WHERE engineers.team_id = 18 
// AND countries.id = engineers.country_id 
// ORDER BY age DESC;

/***********ANSWER***********/
// Name: Danilo Fisher
// Age: 65
// Country ID: 54
// Country Name: Liberia
// Country Capital: Monrovia
// Team ID: 18
// Team Name: Dops



// 7. Find the inventor of the third most used programming language by the teams on the most populated floor.

/***********Statement***********/
// Find most populated floor
// SELECT teams.floor, count(*) as counted
// FROM teams
// GROUP BY teams.floor
// ORDER BY counted DESC

// Find Info
// SELECT programming_language_id, count(*) as counted, programming_languages.name, programming_languages.inventor
// FROM engineers, engineer_programming_languages, programming_languages
// WHERE engineer_programming_languages.engineer_id = engineers.team_id
// AND programming_languages.id = engineer_programming_languages.programming_language_id
// AND (team_id = 1 OR 
//     team_id = 3 OR 
//     team_id = 4 OR 
//     team_id = 6 OR 
//     team_id = 7 OR 
//     team_id = 9 OR 
//     team_id = 10 OR 
//     team_id = 12 OR 
//     team_id = 13 OR 
//     team_id = 15 OR 
//     team_id = 16 OR 
//     team_id = 18)
// GROUP BY programming_language_id, programming_languages.name, programming_languages.inventor
// ORDER BY counted DESC;

/***********ANSWER***********/
// Most Populated Floor: 22
// 3rd Most Used Language: Ruby
// 3rd Most Used Language ID: 1
// Inventor: Yukihiro Matsumoto



// 8. Find the book least read by the the engineers who develop in Ruby.

/***********Statement***********/
// Get number of engineers who develop in Ruby
// SELECT programming_language_id, count(*) as counted
// FROM engineer_programming_languages
// WHERE programming_language_id = 1
// GROUP BY programming_language_id;

// Get info
// SELECT book_id, count(*) as counted, times_read, title, author, publisher, programming_language_id
// FROM bookshelves, books, engineer_programming_languages, engineers
// WHERE bookshelves.engineer_id = engineers.id
// AND book_id = books.id
// AND engineer_programming_languages.engineer_id = engineers.id
// AND programming_language_id = 1
// AND times_read = 1
// GROUP BY book_id, times_read, title, author, publisher, programming_language_id
// ORDER BY counted ASC;

/***********ANSWER***********/
// Not sure the correct answer for this question. 
// I first knew that I had to return only the results where the programming language id is 1, which is equal to ruby
// So the first select statement returns a list of engineers who develop in Ruby

// The second statement I have to add in the books each of these engineers has read
// Since I know we are looking for the book least read, the lowest value of read should be 1 and added that to conditional
// This returns a list of over 100+ books that have been read only 1 time and by ruby developers