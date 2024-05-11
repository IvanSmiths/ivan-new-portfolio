import { FC } from 'react'

type DraggableProps = {
    type: 'div' | 'span' | 'p'
}

const Draggable: FC<DraggableProps> = ({ type }) => {
    if (type === 'div') {
        return (
            <div style={{
                width: '200px',
                height: '200px',
                backgroundColor: '#ffffff',
                margin: 'auto',
                border: '1px solid #ccc',
            }}>
                <span>Centered</span>
            </div>
        )
    } else if (type === 'span') {
        return (
            <span style={{
                width: '900px',
                height: '500px',
                margin: 'auto',
                border: '1px solid #ccc',
            }}>
                <span>Centered</span>
            </span>
        )
    } else if (type === 'p') {
        return (
            <p style={{
                width: '900px',
                height: '500px',
                margin: 'auto',
                border: '1px solid #ccc',
            }}>
                <span>Centered</span>
            </p>
        )
    }
}
export default Draggable