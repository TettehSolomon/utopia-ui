import { TileLayer, MapContainer, useMapEvents, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { UtopiaMapProps } from "../../types"
import "./UtopiaMap.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./Subcomponents/AddButton";
import { useEffect, useState } from "react";
import { ItemFormPopupProps } from "./Subcomponents/ItemFormPopup";
import { SearchControl } from "./Subcomponents/Controls/SearchControl";
import { LayerControl } from "./Subcomponents/Controls/LayerControl";
import { QuestControl } from "./Subcomponents/Controls/QuestControl";
import { Control } from "./Subcomponents/Controls/Control";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TagsControl } from "./Subcomponents/Controls/TagsControl";
import { useSelectPosition, useSetMapClicked,useSetSelectPosition } from "./hooks/useSelectPosition";
import { useClusterRef, useSetClusterRef } from "./hooks/useClusterRef";
import { Feature, Geometry as GeoJSONGeometry } from 'geojson';

// for refreshing map on resize (needs to be implemented)
const mapDivRef = React.createRef();

function UtopiaMap({
    height = "500px",
    width = "100%",
    center = [50.6, 9.5],
    zoom = 10,
    children,
    geo }
    : UtopiaMapProps) {

    function MapEventListener() {
        useMapEvents({
            click: (e) => {
                resetMetaTags();
                console.log(e.latlng.lat + ',' + e.latlng.lng);
                selectNewItemPosition && setMapClicked({ position: e.latlng, setItemFormPopup: setItemFormPopup })
            },
            moveend: (e) => {
                console.log(e);
            }
        })
        return null
    }

    const resetMetaTags = () => {
        let params = new URLSearchParams(window.location.search);
        window.history.pushState({}, "", `/` + `${params.toString() !== "" ? `?${params}` : ""}`)
        document.title = document.title.split("-")[0];
        document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
        document.querySelector('meta[property="og:description"]')?.setAttribute("content", `${document.querySelector('meta[name="description"]')?.getAttribute("content")}`);
    }


    const selectNewItemPosition = useSelectPosition();
    const setSelectNewItemPosition = useSetSelectPosition();
    const location = useLocation();
    const setClusterRef = useSetClusterRef();
    const clusterRef = useClusterRef();
    const setMapClicked = useSetMapClicked();

    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);

    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let urlPosition = params.get("position");
    }, [location]);

    const onEachFeature = (feature: Feature<GeoJSONGeometry, any>, layer: L.Layer) => {
        if (feature.properties) {
            layer.bindPopup(feature.properties.name);
            console.log(feature);

        }
    }

    return (
        <>
            <div className={(selectNewItemPosition != null ? "crosshair-cursor-enabled" : undefined)}>
                <MapContainer ref={mapDivRef} style={{ height: height, width: width }} center={new LatLng(center[0], center[1])} zoom={zoom} zoomControl={false} maxZoom={19}>
                    <Outlet></Outlet>
                    <Control position='topLeft' zIndex="1000">
                        <SearchControl />
                        <TagsControl />
                    </Control>
                    <Control position='bottomLeft' zIndex="999">
                        <QuestControl></QuestControl>
                        <LayerControl></LayerControl>
                    </Control>
                    <TileLayer
                        maxZoom={19}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.osmand.net/hd/{z}/{x}/{y}.png" />
                    <MarkerClusterGroup ref={(r) => setClusterRef(r)} showCoverageOnHover chunkedLoading maxClusterRadius={50} removeOutsideVisibleBounds={false}>
                        {
                            React.Children.toArray(children).map((child) =>
                                React.isValidElement<{ setItemFormPopup: React.Dispatch<React.SetStateAction<ItemFormPopupProps>>, itemFormPopup: ItemFormPopupProps | null, clusterRef: React.MutableRefObject<undefined> }>(child) ?
                                    React.cloneElement(child, { setItemFormPopup: setItemFormPopup, itemFormPopup: itemFormPopup, clusterRef: clusterRef }) : child
                            )
                        }
                    </MarkerClusterGroup>
                    {geo && <GeoJSON data={geo} onEachFeature={onEachFeature} eventHandlers={{
                        click: (e) => {
                            selectNewItemPosition && e.layer!.closePopup();
                            selectNewItemPosition && setMapClicked({ position: e.latlng, setItemFormPopup: setItemFormPopup })
                        },
                    }} />}
                    <MapEventListener />
                </MapContainer>
                <AddButton triggerAction={setSelectNewItemPosition}></AddButton>
                {selectNewItemPosition != null &&
                    <div className="tw-button tw-z-1000 tw-absolute tw-right-5 tw-top-4 tw-drop-shadow-md">
                        <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-text-gray-600" onClick={() => {
                            setSelectNewItemPosition(null)
                        }}>
                            <p className='tw-text-center '>✕</p></label>
                        <div className="tw-alert tw-bg-base-100 tw-text-base-content">
                            <div>
                                <span>Select {selectNewItemPosition.name} position!</span>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </>
    );
}

export { UtopiaMap };