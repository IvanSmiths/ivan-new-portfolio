import { FC } from 'react'
import { db } from '../../utils/db/db';
import { photos as photosTable } from '../../utils/db/schema';
import Navbar, { Position } from '../globalComponents/Navbar/Navbar';

const Crafts: FC = async () => {
    const photos = await db.select({ url: photosTable.url, alt: photosTable.alt }).from(photosTable).all();
    return (
        <div>
            <Navbar position={Position.Fixed} />
            {photos.map((photo, index: number) => (
                <img
                    key={index}
                    src={photo.url}
                    loading='lazy'
                    height="1200"
                    width="1200"
                    alt={photo.alt}
                    className="w-full h-full object-cover object-center rounded-lg"
                />
            ))}</div>
    )
}

export default Crafts;