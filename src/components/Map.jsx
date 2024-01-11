import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvent,
	useMapEvents
} from 'react-leaflet';

import useCitiesContext from '../hooks/useCitiesContext';
import styles from './Map.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

const flagemojiToPNG = (flag) => {
	var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
		.map((char) => String.fromCharCode(char - 127397).toLowerCase())
		.join('');
	return (
		<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
	);
};

function Map() {
	const { cities } = useCitiesContext();
	const [mapPosition, setMapPosition] = useState([40, 0]);

	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition
	} = useGeolocation();
	const [mapLat, mapLng] = useUrlPosition();

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	useEffect(
		function () {
			if (geolocationPosition)
				setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
		},
		[geolocationPosition]
	);

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use your position'}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={13}
				className={styles.map}
				scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}>
						<Popup>
							<span>{flagemojiToPNG(city.emoji)}</span>{' '}
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		}
	});
}

export default Map;