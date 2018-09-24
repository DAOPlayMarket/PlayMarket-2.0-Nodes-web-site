<template>
    <div id="nodesMap">
        <yandex-map
                class="ymap"
                zoom="4"
                :coords="coords"
                :placemarks="placemarks"
        ></yandex-map>
    </div>
</template>

<script>

    const arrDistance = [];
    //Все координаты, arrCoords[0] - координаты моего место положения
    const arrCoords = [
        {
            id: 1,
            ip: '31.211.80.204',
            coordinates: []
        },
        {
            id: 2,
            ip: '109.194.37.82',
            coordinates: [56.4882, 84.9471],
            domain: 'n000001.playmarket.io'
        },
        {
            id: 3,
            ip: '138.197.186.17',
            coordinates: [50.141815, 8.694237],
            domain: 'n000002.playmarket.io'
        }
    ];
    navigator.geolocation.getCurrentPosition((position) => {
        arrCoords[0].coordinates = [position.coords.latitude, position.coords.longitude];
    });
    setTimeout(()=>{
        this.coords = arrCoords[0].coordinates;
    },0);
    export default {
        name: 'ymap',
        metaInfo() {
            return {
                title: 'ymap'
            }
        },
        data() {
            return {
                distance: [],
                isLoaded: false,
                coords: [53, 45],
                placemarks: [
                    {
                        coords: [56.4882, 84.9471],
                        properties: {
                            balloonContentBody: 'n000001.playmarket.io',
                            balloonContentFooter: 'ip: 31.211.80.204',
                            balloonContentHeader: 'Node 1'
                        },
                        clusterName: 'Node1',
                        markerId: 2
                    },
                    {
                        coords: [50.141815, 8.694237],
                        properties: {
                            balloonContentBody: 'n000002.playmarket.io',
                            balloonContentFooter: 'ip: 138.197.186.17',
                            balloonContentHeader: 'Node 2'
                        },
                        clusterName: 'Node2',
                        markerId: 3
                    },
                ]
            }
        },
        mounted: async function () {
            setTimeout(() => {
            // вкл след строку если не тест на мобил.
            this.distance = arrDistance;
                this.isLoaded = true;
            }, 4000)
        }
    }
    setTimeout(() => {
        for (let i = 1; i < arrCoords.length; i++) {
            if (typeof ymaps != 'undefined') {
                ymaps.geocode(arrCoords[0].coordinates).then(function (res) {
                    const myCoords = res.geoObjects.get(0).geometry.getCoordinates();
                    // Координаты НОДЫ i
                    ymaps.geocode(arrCoords[i].coordinates).then(function (res) {
                        const nodeCoords = res.geoObjects.get(0).geometry.getCoordinates();
                        // Расстояние
                        arrDistance.push({
                            ip: arrCoords[i].ip,
                            domain: arrCoords[i].domain,
                            coordinates: arrCoords[i].coordinates,
                            distance: +ymaps.formatter.distance(ymaps.coordSystem.geo.getDistance(myCoords, nodeCoords)).match(/[\s\S]*?(?=&)/)
                        });
                    });
                });
            }
        }
    }, 3000);
    setTimeout(() => {
        arrDistance.sort((a, b) => a.distance - b.distance);
    }, 4000);
</script>

<style scoped lang="sass">
    #nodesMap
        width: 100%
        height: 100vh
        @media only screen and (max-width: 479px)
            width: 92vw
            height: 50vh
            .data-distance
                height: 35vmax
                overflow-y: scroll
        @media (orientation: landscape) and (max-width: 850px)
            width: 50vw
            height: 50vw
        .ymap
            height: 100%
        .title
            font-family: Roboto, sans-serif
            font-size: 16px
            margin-top: 10px
            color: #212628
        .list-distance
            @extend .title
            font-size: 14px
            line-height: 1.5
        .label
            @extend .title
            font-size: 12px
            color: black
</style>