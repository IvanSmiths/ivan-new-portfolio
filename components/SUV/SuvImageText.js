import SrcImage from "../SrcImage";

function SuvTextImage() {
  return (
    <>
      <div className="case-studio__images margin-top">
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-5.jpg"
            webp="/scholz-und-volkmer-website-5.webp"
            height="929px"
            width="1902px"
            alt="image of a website"
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-6.jpg"
            webp="/scholz-und-volkmer-website-6.webp"
            height="929px"
            width="1920px"
            alt="image of a website"
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-7.jpg"
            webp="/scholz-und-volkmer-website-7.webp"
            height="929px"
            width="1902px"
            alt="image of a website"
          />
        </div>
      </div>
    </>
  );
}

export default SuvTextImage;
