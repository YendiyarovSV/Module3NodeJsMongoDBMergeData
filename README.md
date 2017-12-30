# Module3NodeJsMongoDBMergeData
My third lab using Node.js working with MongoDb

Answers about your project:
------------------------------------------------------------------------------
# Question №1:
Walk us through the design of your project. Why did you design your project the way you did? What difficulties did you overcome?

# Answer to the question №1:

Starting point is **'index.js'** file.
This file can be used to run data merging procedure.

In general it works as followes:
- run program using **'node index.js X'**, where X is a batch size if not present, the batchSize is 10 (number of parallel threads);
- first of all the program reads json files from the /data foler;
- export data to MongoDB database **CustomerDb** in two different collections **customerData** and **customerAddressData**;
- then uses specified **batchSize** to merge data in parallel, storing data in third collection **mergedDataCollection**.

------------------------------------------------------------------------------
# Question №2:
How did you test your project to verify that it works?

# Answer to the question №2:
1) Install packages **npm i**;
2) Start **mongodb** database;
3) Run the program **node index.js X**, where X is a number of threads;
4) Run mongo terminal or mongoui to check existence of the following collections:
- **customerData**;
- **customerAddressData**;
- **mergedDataCollection**.

if everything is alright then **mergedDataCollection** contains merged data from two collections.
------------------------------------------------------------------------------
# Question №3:

Let us know if anything doesn't work as intended so your reviewer will know ahead of time

# Answer to the question №3:

Nope everything seems to work just fine! :)
