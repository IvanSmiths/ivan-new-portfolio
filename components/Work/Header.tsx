import { FunctionComponent } from 'react';
import { Work } from '../../utils/works';

interface HeaderProps {
    work: Work;
}

const Header: FunctionComponent<HeaderProps> = ({work}) => {
    return (
        <div>
            <h1>{work.title}</h1>
            <p>{work.description}</p>
            {work.images && work.images.map((image, index) => <img src={image} key={index} alt={work.title}/>)}
        </div>
    );
};

export default Header;
