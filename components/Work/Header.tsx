/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { Work } from '../../utils/works';
import GridDebug from "../GridDebug";

interface HeaderProps {
    work: Work;
}

const Header: FC<HeaderProps> = ({work}) => {
    return (
        <>
            <GridDebug></GridDebug>
            <header className="grid">
                <div className="grid-column-8-11 h-[80vh] flex flex-col justify-center">
                    <h1 className="paragraph">{work.job}</h1>
                    <h2 className="heading-1-bold">{work.company}</h2>
                </div>
                <div className="grid-column-2-11">
                    <div>

                    </div>
                    <img src={work.mainImage} alt={`${work.company} main image`}/>
                </div>
            </header>
        </>
    )
};

export default Header;
