<template>
  <div></div>
</template>

<script>

export default {
    data() {
        return {
            layers: [{
                        "folder":"Sediment Balance",
                        "layers":[{
                            "title":"Sedimented Areas",
                            "layername":"SedimentBalance:SedimentedAreas",
                            "url": "https://chw.openearth.eu/geoserver/ows?"
                            },
                            {
                            "title":"Sediment balance",
                            "layername":"SedimentBalance:Sediment balance",
                            "url": "https://chw.openearth.eu/geoserver/ows?"
                            }]
                    },
                    {
                        "folder":"Storm Climate",
                        "layers":[{
                            "title":"Cyclones",
                            "layername":"StormClimate:diva_points_with_cyclone_risk",
                            "url": "https://chw.openearth.eu/geoserver/ows?"
                            }]
                    }
                   
                    ],
        }
    },
    created() {
        // read the structure of layers
        this.retrieveLayers()
        this.$store.commit('mapbox/SET_LAYERS',this.layers)
    },
    methods: {
        retrieveLayers() {
           fetch('.static/data/datalayers.json') // TODO
            .then(response => {
                return response.json()
            }) 
            .then(json => {
                const layers = json
                console.log(layers)
            })
    }
}
}

</script>