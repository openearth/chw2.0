# Coastal Hazard Wheel

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm serve
```

### Compiles and minifies for production
```
npm build
```

### Lints and fixes files
```
npm lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Layer configuration

The JSON files where the layers for the 'hazard maps' and the 'data' page are located in the [data folder](src/data).

```
// structure of a folder
{
  "id": "geological-layout",
  "name": "Geological Layout",
  "children": []
}
```

```
// structure of a layer
{
  "id": "chw2:GLiM",
  "name": "Global Lithology",
  "layer": "chw2:GLiM",
  "url": "https://deltaresdata.openearth.eu/geoserver/chw2/ows"
}
```