require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'async': '../bower_components/requirejs-plugins/src/async',
        'jquery-color': '../bower_components/jquery-color/jquery.color'
    },
    shim: {
        'lodash': {
            exports: '_'
        },
        'google': {
            'deps': ['document'],
            'exports' : 'google'
        },
        'jquery-color': {
            'deps': ['jquery']
        }
    }
});

require(['jquery','async!http://maps.google.com/maps/api/js?sensor=false', 'jquery-color'], function($) {
    var currentPosition;

    initializeSmallMap();

    $("#getLocationsBtn").click(getLocations);
    $("#test").click(function() {
        //we test our showPoints function with 2 points
        var points = [
            {
                name: 'TestPoint1',
                coordinates: [3.363882, 51.044922]
            },
            {
                name: 'TestPoint2',
                coordinates: [3.563882, 50.044922]
            }
        ];
        showPoints(points);
    });

    function getLocations() {
        var data = getFormData();
        if(!data) {
            return;
        }

        // *** Insert the get locations $.ajax logic here and call showPoints ***
        alert(JSON.stringify(data, null, 4));
    }

    var largeMap, markers = [];
    /**
     * Shows the specified points on the map
     * @param points
     */
    function showPoints(points) {
        if(!largeMap) {
            initializeLargeMap();
        }
        var marker, i;

        //clear previous markers
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        //add current points to the map
        points.forEach(function(point) {
            var latLng = new google.maps.LatLng(point.coordinates[1], point.coordinates[0]);
            marker = new google.maps.Marker({
                position: latLng,
                map: largeMap,
                title: point.name
            });
            markers.push(marker);

            largeMap.setCenter(latLng);

            google.maps.event.addListener(marker, 'click', (function(marker) {
                return function() {
                    largeMap.panTo(marker.getPosition());
                    largeMap.setZoom(4);
                }
            })(marker, i));
        });
    }

    function initializeLargeMap() {
        var mapOptions = {
            zoom: 5,
            center:  new google.maps.LatLng(-25.363882, 131.044922)
        };
        largeMap = new google.maps.Map(document.getElementById('large-map-canvas'),
            mapOptions);
    }

    function initializeSmallMap() {
        var mapOptions = {
            zoom: 11,
            center:  new google.maps.LatLng(42.647714978827366, 23.38468909263611)
        };
        var map = new google.maps.Map(document.getElementById('small-map-canvas'),
            mapOptions);
        var marker;

        google.maps.event.addListener(map, 'click', function(e) {
            changePosition(e.latLng);
        });

        function changePosition(latLng) {
            marker = marker || new google.maps.Marker({
                position: latLng,
                map: map
            });

            marker.setPosition(latLng);
            currentPosition = latLng;

            $('#latitude').html(latLng.lat());
            $('#longitude').html(latLng.lng());
        }
    }

    /**
     * Validates the form and does some UI logic. Ensures we have entered currentPosition and tags.
     * @returns {Object | null}
     */
    function getFormData() {
        var isValid = true;
        var $tags = $("#tags");
        var tags = $tags.val();
        var $range = $("#range");
        var range = $range.val();

        var $noRangeMsg = $("#noRangeMsg");

        if(!range) {
            $range.keypress(function() {
                $noRangeMsg.hide();
            });
            flashElement($noRangeMsg);
            $noRangeMsg.show();
            isValid = false;
        } else {
            $noRangeMsg.hide();
        }

        if(!currentPosition) {
            flashElement($("#positionWrp"));
            isValid = false;
        }

        if(isValid) {
            return {
                range: range,
                position: {
                    lng: currentPosition.lng(),
                    lat: currentPosition.lat()
                },
                tags: tags ? tags.trim().split(' ') : null
            }
        }
    }

    function flashElement(el){
        el.stop().css("background-color", "#FFAFAF").animate({ backgroundColor: "#FFFFFF"}, 1500);
    }
});



