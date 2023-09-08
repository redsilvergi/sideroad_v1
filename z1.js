const [hl, setHl] = useState(null);
const layer2 = useMemo(() => {
  return new MVTLayer({
    id: "mvt-layer2",
    data: `https://api.mapbox.com/v4/redsilver522.4vi5iskr/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
    lineWidthScale: 20,
    lineWidthMinPixels: 1,
    lineWidthMaxPixels: 15,
    pickable: true,
    visible: view.zoom >= 11 && view.zoom <= 20,
    getLineColor: (d) => {
      if (hl && d.properties.fid === hl) {
        return [255, 0, 0, 128]; // Highlighted color
      }
      return [0, 128, 0, 128]; // Regular color
    },
    onHover: (d) => {
      if (d && d.object) {
        setHl(d.object.properties.fid);
      } else {
        setHl(null);
      }
    },
    onClick: (d) => console.log(d.object.properties),
    updateTriggers: {
      getLineColor: hl,
    },
  });
}, [view.zoom, hl]);
