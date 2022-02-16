import '@google/model-viewer';

const Model = () => {
  return (
    <>
      <div className="cnt-model">
        <model-viewer
          id="reveal"
          poster="/poster.png"
          class="model"
          loading="lazy"
          src="/3d-model.glb"
          ios-src="/3d-model.usdz"
          alt="3D model of myself"
          camera-controls
          ar
          shadow-intensity="7.4"
          auto-rotate
        ></model-viewer>
      </div>
    </>
  );
};

export default Model;
