import { FC } from 'react';

const Paragraph: FC = () => {
    return (
        <div className="flex flex-wrap items-center pb-small">
            <p className="heading-2">
                <strong>ivan smiths.</strong> frontend ui/ux developer. 3 years of experience. seeking the
                limit.
                currently at
                <a className="heading-2-link" href="https://www.cowen.com/" target="_blank"
                   rel="noreferrer noopener"> td cowen.</a>
            </p>
        </div>
    )
}

export default Paragraph