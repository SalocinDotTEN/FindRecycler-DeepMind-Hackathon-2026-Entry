
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { RecyclingFacility, Location } from '../types';
import { Navigation } from 'lucide-react';

// Fix for default marker icon issues in React environments
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RecyclerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const UserIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const PendingIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface RecycleMapProps {
  facilities: RecyclingFacility[];
  center: Location;
  userLocation: Location | null;
  onSelectFacility: (facility: RecyclingFacility) => void;
  isAdding?: boolean;
  tempLocation?: Location | null;
  onMapClick?: (loc: Location) => void;
  theme?: 'light' | 'dark' | 'system';
}

const MapEvents = ({ onMapClick, isAdding }: { onMapClick?: (loc: Location) => void, isAdding?: boolean }) => {
  useMapEvents({
    click(e) {
      if (isAdding && onMapClick) {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
};

const ChangeView = ({ center, isDarkMode }: { center: Location, isDarkMode: boolean }) => {
  const map = useMap();
  const lastCenterRef = React.useRef<Location>(center);

  useEffect(() => {
    // Force a resize check to ensure tiles load correctly
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map, isDarkMode]);

  useEffect(() => {
    // Only trigger if the center actually changed to avoid jitter
    if (lastCenterRef.current.lat !== center.lat || lastCenterRef.current.lng !== center.lng) {
      const zoom = map.getZoom();
      
      // Calculate a latitude offset so the marker is in the lower part of the screen
      // We want the center to be North of the marker.
      // At zoom 13, 0.02 degrees is roughly 2.2km, which is about 1/3 of the map height
      const latOffset = 0.02 * Math.pow(2, 13 - zoom); 
      
      map.flyTo([center.lat + latOffset, center.lng], zoom, {
        animate: true,
        duration: 0.8,
      });
      lastCenterRef.current = center;
    }
  }, [center, map]);
  return null;
};

const MapResizeHandler = () => {
  const map = useMap();
  
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    
    const container = map.getContainer();
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);
  
  return null;
};

const RecycleMap: React.FC<RecycleMapProps> = ({ 
  facilities, 
  center, 
  userLocation, 
  onSelectFacility,
  isAdding,
  tempLocation,
  onMapClick,
  theme = 'light'
}) => {
  // Use a ref for the initial center to prevent MapContainer from jumping on prop changes
  const initialCenter = React.useMemo(() => [center.lat, center.lng] as L.LatLngExpression, []);

  useEffect(() => {
    // Extra insurance for map loading
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const isDarkMode = React.useMemo(() => {
    if (theme === 'dark') return true;
    if (theme === 'system') return window.matchMedia('(prefers-color-scheme: dark)').matches;
    return false;
  }, [theme]);

  const tileUrl = isDarkMode 
    ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const attribution = isDarkMode
    ? 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <MapContainer 
      center={initialCenter} 
      zoom={13} 
      scrollWheelZoom={true} 
      className="h-full w-full rounded-xl shadow-inner border border-green-200 dark:border-slate-800 transition-colors duration-300"
    >
      <TileLayer
        attribution={attribution}
        url={tileUrl}
      />
      {isDarkMode && (
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri"
        />
      )}
      <ChangeView center={center} isDarkMode={isDarkMode} />
      <MapResizeHandler />
      <MapEvents onMapClick={onMapClick} isAdding={isAdding} />
      
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={UserIcon}>
          <Popup>
            <div className="font-semibold text-blue-600 dark:text-blue-400 text-sm">You are here</div>
          </Popup>
        </Marker>
      )}

      {isAdding && tempLocation && (
        <Marker position={[tempLocation.lat, tempLocation.lng]} icon={PendingIcon}>
          <Popup autoOpen>
            <div className="p-2 text-center">
              <p className="font-bold text-orange-600 dark:text-orange-400 text-sm">New Spot</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Fill details in the sidebar</p>
            </div>
          </Popup>
        </Marker>
      )}

      {facilities.map((facility) => (
        <Marker 
          key={facility.id} 
          position={[facility.location.lat, facility.location.lng]}
          icon={RecyclerIcon}
          eventHandlers={{
            click: () => !isAdding && onSelectFacility(facility),
          }}
        >
          <Popup autoPan={false}>
            <div className="p-1 min-w-[180px] dark:bg-slate-900 dark:text-slate-100">
              {facility.imageUrl && (
                <div className="w-full h-24 mb-2 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <img 
                    src={facility.imageUrl} 
                    alt={facility.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <h3 className="font-bold text-green-800 dark:text-green-400 text-sm leading-tight">{facility.name}</h3>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mb-2 leading-tight">{facility.address}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {facility.materials.slice(0, 3).map(m => (
                  <span key={m} className="px-1 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] rounded border border-green-200 dark:border-green-900/50">{m}</span>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${facility.location.lat},${facility.location.lng}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-green-600 dark:text-green-400 font-bold hover:underline flex items-center gap-1.5"
                >
                  <Navigation size={12} className="shrink-0" />
                  Get Directions
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RecycleMap;
