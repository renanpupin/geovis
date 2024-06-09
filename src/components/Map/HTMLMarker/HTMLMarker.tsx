/* global google */

const createHTMLMapMarker = ({OverlayView = google.maps.OverlayView, ...args}) => {
    class HTMLMapMarker extends OverlayView {
        private latlng: any
        private html: any
        private div: any
        constructor() {
            super()
            this.latlng = args.latlng
            this.html = args.html
            this.setMap(args.map)
        }

        createDiv() {
            this.div = document.createElement('div')
            this.div.style.position = 'absolute'
            if (this.html) {
                this.div.innerHTML = this.html
            }
            google.maps.event.addDomListener(this.div, 'click', () => {
                google.maps.event.trigger(this, 'click')
            })
        }

        appendDivToOverlay() {
            const panes = this.getPanes()
            // @ts-ignore
            panes.overlayImage.appendChild(this.div)
        }

        positionDiv() {
            const point = this.getProjection().fromLatLngToDivPixel(this.latlng)
            let offset = 25
            if (point) {
                this.div.style.left = `${point.x - offset}px`
                this.div.style.top = `${point.y - offset}px`
            }
        }

        draw() {
            if (!this.div) {
                this.createDiv()
                this.appendDivToOverlay()
            }
            this.positionDiv()
        }

        remove() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div)
                this.div = null
            }
        }

        getPosition() {
            return this.latlng
        }

        getDraggable() {
            return false
        }
    }

    return new HTMLMapMarker()
}

export default createHTMLMapMarker

// let marker = createHTMLMapMarker({
//     latlng: latLng,
//     map: map,
//     html: `<div id="click"><img id="parrot" src="https://cultofthepartyparrot.com/parrots/hd/parrot.gif"></div>`
// });
//https://codesandbox.io/s/html-marker-bii3s
