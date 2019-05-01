# VISUM

## Introduction

Visum allows you to visualize insightful & real data of New York City.  
This app was made with [@roosterhack](https://github.com/roosterhack) during the second module of the [Ironhack Web Development Bootcamp](https://www.ironhack.com/en), in a time span of 4 days.

###### What the app is about?

The initial idea was to create an app where you could compare cities based on their data, visualize the data as layers displayed on the map and also animate real time data from public transportation using [gtfs](https://gtfs.org/) ([see an example](https://hvv.live/)).  

We have decided to exclude the compare and animation features from the MVP and focus our work on displaying the data with one city.  

###### Prizes _(votes from the class)_

Best app: First place :1st_place_medal:  

###### Technologies used

Mapbox GL JS, MongoDB, Express, Node, Handlebars, API, Bulma.

------

:world_map: [Click here to launch the experience](https://visum-app.herokuapp.com/map) 

------

## Features

- As a guest, you can play with the filters, however you cannot save the active filters.

- As a registered user, you can save the active filters, access to them and delete them from your profile.  
  The saved filters are automatically displayed on the map from your profile anytime you use the app.
- Share the map with the active filters, the filters will be automatically displayed on the map.
- Search for locations and POIs using the search bar

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

One of the biggest challenges was to gather the data in the correct format (.geojson), with proper set of coordinates. We had to reject most of the data we wanted to display (i.e. Crime rate) because the available data was given as an .xls file without any coordinates, it would have took us more time to display it in a proper way.

###### Data displaying

We wanted to display the data in it's best way, we had to analyse the data and choose how to highlight it (with color fill, lines, heatmap, interactive clusters…).

------

## Sources:

- All the datasets: [NYC Open Data ](https://data.cityofnewyork.us)

