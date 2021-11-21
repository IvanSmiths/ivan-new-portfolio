/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
const SkewScrollRef = dynamic(() => import('./SkewScrollRef'), { ssr: false });

const SkewScroll = () => {
  return (
    <>
      <SkewScrollRef />
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo aliquam
          quisquam ullam suscipit id quis saepe hic blanditiis porro dicta!
        </p>
        <img
          src="https://images.unsplash.com/photo-1636165815614-4ae073913f68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1174&q=80"
          alt=""
        />
      </div>
    </>
  );
};
export default SkewScroll;
