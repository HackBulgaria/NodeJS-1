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

    initialize();

    function saveLocation() {
        var data = getFormData();
        if(!data) {
            return;
        }

        // *** Insert the save logic here ***
        alert(JSON.stringify(data, null, 4));
    }

    function initialize() {
        var mapOptions = {
            zoom: 8,
            center:  new google.maps.LatLng(-25.363882, 131.044922)
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        var marker;

        google.maps.event.addListener(map, 'click', function(e) {
            changePosition(e.latLng);
        });

        function changePosition(latLng) {
            marker = marker || new google.maps.Marker({
                position: map.getCenter(),
                map: map
            });
            marker.setPosition(latLng);
            currentPosition = latLng;

            $('#latitude').html(latLng.lat());
            $('#longitude').html(latLng.lng());
        }

        $("#saveLocationBtn").click(saveLocation);
    }


    /**
     * Validates the form and does some UI logic. Ensures we have entered currentPosition and tags.
     * @returns {Object | null}
     */
    function getFormData() {
        var isValid = true;
        var $tags = $("#tags");
        var tags = $tags.val();
        var $name = $("#name");
        var name = $name.val();

        var $noTagsMsg = $("#noTagsMsg");
        var $noNameMsg = $("#noNameMsg");

        if(!tags) {
            $tags.keypress(function() {
                $noTagsMsg.hide();
            });
            flashElement($noTagsMsg);
            $noTagsMsg.show();
            isValid = false;
        } else {
            $noTagsMsg.hide();
        }

        if(!name) {
            $name.keypress(function() {
                $noNameMsg.hide();
            });
            flashElement($noNameMsg);
            $noNameMsg.show();
            isValid = false;
        } else {
            $noNameMsg.hide();
        }

        if(!currentPosition) {
            flashElement($("#positionWrp"));
            isValid = false;
        }

        if(isValid) {
            return {
                name: name,
                position: {
                    lng: currentPosition.lng(),
                    lat: currentPosition.lat()
                },
                tags: tags.trim().split(' ')
            }
        }
    }

    function flashElement(el){
        el.stop().css("background-color", "#FFAFAF").animate({ backgroundColor: "#FFFFFF"}, 1500);
    }
});



