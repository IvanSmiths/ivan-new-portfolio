import { FC } from 'react'

type DraggableProps = {
    type: 'div' | 'span' | 'p'
}

const Draggable: FC<DraggableProps> = ({ type }) => {
    let classNames = 'w-8 h-8 bg-gray-100 p-4';

    if (type === 'div') {
        classNames += ' div';
    } else if (type === 'span') {
        classNames += ' span';
    } else if (type === 'p') {
        classNames += ' p';
    }

    return (
        <div className={classNames}>
            <span>Centered</span>
        </div>
    )
}
export default Draggable
