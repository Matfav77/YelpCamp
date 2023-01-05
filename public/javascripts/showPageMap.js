mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'show-map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: campground.geometry.coordinates,
    zoom: 8
});

map.addControl(new mapboxgl.NavigationControl());

const campgroundMarker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 20 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map);
