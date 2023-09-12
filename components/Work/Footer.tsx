import { FC } from 'react';
import { Work } from '../../utils/works';
import Link from "next/link";

interface FooterProp {
    work: Work;
}

const Footer: FC<FooterProp> = ({work}) => {
    return (
        <footer>
            <Link href={work.nextWorkLink}>
                {work.nextWorkTitle}
            </Link>
        </footer>
    );
}

export default Footer;