import { FC } from 'react'

type DraggableProps = {
    type: 'div' | 'span' | 'p'
}

const Draggable: FC<DraggableProps> = ({ type }) => {
    let classNames = 'w-8 h-8 bg-gray-100 p-4';

    switch (type) {
        case 'div':
            classNames += ' div';
            break;
        case 'span':
            classNames += ' span';
            break;
        case 'p':
            classNames += ' p';
            break;
        default:
            break;
    }

    return (
        <div className={classNames}>
            <span>Centered</span>
        </div>
    )
}
export default Draggable
