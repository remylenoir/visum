# VISUM

## Introduction

Visum allows you to Visualize insightful & real data of New York City.  
This app was made with [@roosterhack](https://github.com/roosterhack) during the second module of the [Ironhack Web Development Bootcamp](https://www.ironhack.com/en), in a time span of 4 days.

###### What the app is about?

The initial idea was to create an app where you could compare cities based on their data, visualize the data as layers displayed on the map and also animate real time data from public transportation using [gtfs](https://gtfs.org/) ([see an example](https://hvv.live/)).  

We have decided to exclude these features from the MVP and focus our work on one city.  

###### Prizes _(votes from the class)_

Best app: First place :1st_place_medal:  

###### Technologies used

[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/), MongoDB, Express, Node, Handlebars, API, Bulma.

------

:world_map: [Click here to launch the experience](https://visum-app.herokuapp.com/map) 

------

## Features

- As a guest, you can play with the filters, however you cannot save the active filters.

- As a registered user, you can save the active filters, access to them and delete them from your profile. The saved filters will be automatically displayed on the map from your profile anytime you use the app.
- Share the map with the active filters, the filters will be automatically displayed on the map.

## Data:  

| Type                          | Displayed as | Interaction                     |
| ----------------------------- | ------------ | ------------------------------- |
| Collisions                    | Circles      | Filter by time/day              |
| Bike routes                   | Lines        | X                               |
| Bike shelters                 | Symbols      | Click to get the address detail |
| Wi-Fi hotspot                 | Heatmap      | X                               |
| Day care center               | Clusters     | Click to get the address detail |
| Airport                       | Fill         | X                               |
| Park                          | Fill         | X                               |
| Atheltic facilities           | Fill         | X                               |
| Hurricane evactuation centers | Symbols      | Click to get the address detail |
| Golf                          | Fill         | X                               |

## Challenges:

###### Data gathering

------

## Sources:

- [NYC Open Data ](https://data.cityofnewyork.us)

