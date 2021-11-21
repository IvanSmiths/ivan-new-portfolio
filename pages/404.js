/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="cnt-404 flex-center">
      <img src="/404-image.jpg" height="600" width="500" alt="404 image" />
      <Link href="/">
        <a>GTFOH BUTTON</a>
      </Link>
    </div>
  );
}
