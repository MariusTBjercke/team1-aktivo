import { Loader } from "@googlemaps/js-api-loader";
import { cr } from "../view";

const loader = new Loader({
    apiKey: "AIzaSyCQf4kMgVfYMiDifbh9F_GWnubLMu3MexI",
    version: "weekly"
});

/**
 * 
 * @param {HTMLDivElement} element Element where map should be appended
 * @param {Object} latlng Example: { lat: 59.13461716996314, lng: 10.21596468687774 }
 * @param {html} html HTML for the location marker.
 */
function loadGoogleMaps(element, latlng, html) {
    let map;

    loader.load().then(() => {
        map = new google.maps.Map(element, {
            center: latlng,
            zoom: 8,
        });

        let marker = new google.maps.Marker({
            position: latlng,
            title: "Sandefjord"
        });

        const content = cr('div', null, 'class content', html);

        const info = new google.maps.InfoWindow({
            content: content,
        })

        marker.setMap(map);

        marker.addListener("click", () => {
            info.open({
                anchor: marker,
                map,
                shouldFocus: false
            });
        });
    });
}

export { loader, loadGoogleMaps }