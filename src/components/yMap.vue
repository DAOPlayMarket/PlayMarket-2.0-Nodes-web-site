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
                            balloonContentBody: 'm000001.playmarket.io',
                            balloonContentFooter: 'ip: 109.194.37.82',
                            balloonContentHeader: 'Node 1'
                        },
                        clusterName: 'Node1',
                        markerId: 2
                    },
                    {
                        coords: [12.970713, 77.595167],
                        properties: {
                            balloonContentBody: 'm000002.playmarket.io',
                            balloonContentFooter: 'ip: 142.93.222.213',
                            balloonContentHeader: 'Node 2'
                        },
                        clusterName: 'Node2',
                        markerId: 3
                    },
                    {
                        coords: [43.669870, -79.385932],
                        properties: {
                            balloonContentBody: 'm000003.playmarket.io',
                            balloonContentFooter: 'ip: 178.128.231.195',
                            balloonContentHeader: 'Node 2'
                        },
                        clusterName: 'Node3',
                        markerId: 4
                    },
                    {
                        coords: [52.369548, 4.895829],
                        properties: {
                            balloonContentBody: 'm000004.playmarket.io',
                            balloonContentFooter: 'ip: 178.128.139.121',
                            balloonContentHeader: 'Node 2'
                        },
                        clusterName: 'Node4',
                        markerId: 5
                    },
                    {
                        coords: [37.787337, -122.405848],
                        properties: {
                            balloonContentBody: 'm000005.playmarket.io',
                            balloonContentFooter: 'ip: 178.128.129.130',
                            balloonContentHeader: 'Node 2'
                        },
                        clusterName: 'Node5',
                        markerId: 6
                    },
                    {
                        coords: [55.757540, 37.621994],
                        properties: {
                            balloonContentBody: 'm000006.playmarket.io',
                            balloonContentFooter: 'ip: 176.99.11.18',
                            balloonContentHeader: 'Node 2'
                        },
                        clusterName: 'Node6',
                        markerId: 7
                    },
                    {
                        coords: [40.723323, -74.005931],
                        properties: {
                            balloonContentBody: 'm000007.playmarket.io',
                            balloonContentFooter: 'ip: 68.183.48.35',
                            balloonContentHeader: 'Node 2'
                        },
                        clusterName: 'Node7',
                        markerId: 8
                    },
                    {
                        coords: [-33.872710, 151.207603],
                        properties: {
                            balloonContentBody: 'm000008.playmarket.io',
                            balloonContentFooter: 'ip: 13.237.66.130',
                            balloonContentHeader: 'Node 2'
                        },
                        clusterName: 'Node8',
                        markerId: 9
                    },
                    {
                        coords: [35.628599, 139.710252],
                        properties: {
                            balloonContentBody: 'm000009.playmarket.io',
                            balloonContentFooter: 'ip: 18.179.56.255',
                            balloonContentHeader: 'Node 2'
                        },
                        clusterName: 'Node9',
                        markerId: 9
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