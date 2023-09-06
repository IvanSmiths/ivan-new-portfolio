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
                <div className="grid-column-8-11 h-[75vh] flex flex-col justify-center">
                    <h1 className="paragraph">{work.job}</h1>
                    <h2 className="heading-1-bold">{work.company}</h2>
                </div>
                <div className="grid-column-2-11">
                    <ul className="flex justify-between items-end pb-small">
                        <li>
                            <a href={work.website} rel="noopener" target="_blank">
                                website
                            </a>
                        </li>
                        <li className="flex flex-col">
                            {work.jobStack.map((date, i) => (
                                <span key={i}>{date}</span>
                            ))}
                        </li>
                        <li className="flex flex-col">
                            {work.jobDates.map((date, i) => (
                                <span key={i}>{date}</span>
                            ))}
                        </li>
                        <li>
                            <a href={work.jobLinkedin} rel="noopener" target="_blank">
                                linkedin
                            </a>
                        </li>
                    </ul>
                    <img src={work.mainImage} alt={`${work.company} main image`}/>
                </div>
                <div className="grid-column-3-10 h-[100vh] flex justify-center items-center">
                    <p className="heading-1 text-center">{work.jobDescription}</p>
                </div>
            </header>
        </>
    )
};

export default Header;
