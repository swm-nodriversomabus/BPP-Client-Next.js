import Image from 'next/image';
import map from 'public/map.jpeg';

const MapPreview: any = () => {
  return (
    <div className="MapPreview">
      <Image src={map} alt="지도" />
      <div></div>
    </div>
  );
};

export default MapPreview;
