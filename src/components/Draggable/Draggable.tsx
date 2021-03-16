import React, { useRef, useState, useEffect } from 'react'
import styles from './Draggable.module.scss';

const navbarHeight: number = 65 as const;

type Position = {
    x: number
    y: number
}

type Props = {
    children: any
    initialPosition?: Position
    className?: any
}

const DraggableComponent = ({children, initialPosition, className}: Props) => {
    const [pressed, setPressed] = useState<boolean>(false)
    const [position, setPosition] = useState<Position>({x: initialPosition?.x ?? navbarHeight, y: initialPosition?.y ?? navbarHeight})
    const ref = useRef()

    const onMouseMove = (event: any) => {
        if (pressed) {
            const newX = position.x + event.movementX
            const newY = position.y + event.movementY

            // @ts-ignore
            const componentWidth = ref?.current?.clientWidth;
            // @ts-ignore
            const componentHeight = ref?.current?.clientHeight;

            const maxX = Math.min(window.innerWidth - componentWidth, newX);
            const minX = Math.max(0, newX);
            const maxY = Math.min(window.innerHeight - componentHeight, newY);
            const minY = Math.max(navbarHeight, newY);

            setPosition({
                x: newX > maxX ? position.x : (newX < minX ? position.x : newX),
                y: newY > maxY ? position.y : (newY < minY ? position.y : newY),
            })
        }
    }

    const onmouseLeave = (event: any) => {
        if (pressed) {
            setPressed(false)
        }
    }

    return (
        <div
            // @ts-ignore
            ref={ref}
            className={[styles.draggable, className].join(' ')}
            style={{left: position.x, top: position.y}}
            onMouseLeave={ onmouseLeave }
            onMouseMove={ onMouseMove }
            onMouseDown={ () => setPressed(true) }
            onMouseUp={ () => setPressed(false) }
        >
            {children}
        </div>
    )
}

export default DraggableComponent
