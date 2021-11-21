import '@google/model-viewer';

const ModelInnovation = () => {
  return (
    <div className="model-cnt flex-center">
      <model-viewer
        defer
        id="reveal"
        disable-zoom
        class="model"
        loading="lazy"
        shadow-intensity="0"
        src="/innovation.glb"
        camera-controls
        environment-image="neutral"
        poster="poster.webp"
        camera-orbit="0.5143deg 87.34deg auto"
        min-camera-orbit="-17deg auto auto"
        max-camera-orbit="9deg auto auto"
      ></model-viewer>
    </div>
  );
};

export default ModelInnovation;
