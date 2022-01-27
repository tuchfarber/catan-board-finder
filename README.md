# Catan Board Finder

A simple web app to create both random and custom-ish Settlers of Catan boards.

## Random Boards
If you just want a random board, click `Find Random Board`

## Custom-ish Boards

Each board has three different categories it's scored on. If you want a certain type of board, you can change these values, then click `Find Custom Board`. These are
* Resource Clusters
    * The amount of resources that are grouped together.
    * Selecting `Few` would cause most resources not to be touching another of the same resource. 
    * Selecting `Many` would result in the ores all together and/or the forest all together, etc. 
* Token Clusters 
    * The amount of high-probabilty spaces that are grouped together
    * Selecting `Few` would mean high probability spots (5-9) would be spread across the board
    * Selecting `Many` would mean high probability spots (5-9) would be next to other high probability spots
* Probability of Resources
    * The chances of getting each resource
    * Selecting `Even` means that each resource has a fairly even chance of being rolled. 
    * Selecting `Very Uneven` means that some resources will be rolled a lot while others will be rolled infrequently.

### Why would I build a custom board?
Building a custom board lets you taper your game to who's playing. 

Choosing a game of `Few`, `Few`, `Even` means there aren't many "hotspots" and that everyone has a fairly even chance of winning the game. This is good for beginners or anyone who's been bogged down by realizing you were going to lose 10 minutes into the game. 

Choosing a game of `Many`, `Many`, `Very Uneven` leads to an extreme game where there are many bad places to build and few good places. Good for people who really like competition, or masochists.
