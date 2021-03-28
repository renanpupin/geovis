import React, {useState} from 'react';
import styles from './SideMenu.module.scss';
import Touchable from "src/components/Touchable/Touchable";

export type OptionsProps = {
    title: string
    icon: string
    component: any
}

export type SelectProps = {
    items: OptionsProps[]
}

const SideMenu: React.FC<SelectProps> = (props) => {
    const {items} = props

    const [isToggle, setIsToggle] = useState(true)
    const [activeItemIndex, setActiveItemIndex] = useState(0)

    const activeItem = items[activeItemIndex]

    const wrapperStyle = [styles.wrapper, isToggle ? styles.toggle: {}].join(' ')
    return (
        <div className={wrapperStyle}>

            <div className={styles.rightMenu}>
                {items.map((item, index) => {

                    const menuButtonStyle = [styles.menuButton, index === activeItemIndex ? styles.active: {}].join(' ')

                    return(
                        <div style={{backgroundColor: '#fff'}} key={index}>
                            <Touchable onClick={() => {
                                if(index === activeItemIndex){
                                    setIsToggle(!isToggle)
                                }
                                setActiveItemIndex(index)
                            }}>
                                <div className={menuButtonStyle}>
                                    <i className="material-icons">{item.icon}</i>
                                </div>
                            </Touchable>
                        </div>
                    )
                })}
            </div>

            <div className={styles.content}>
                <h6 style={{fontWeight: 'bold'}}>{activeItem.title}</h6>

                <div>
                    {activeItem.component}
                </div>
            </div>
        </div>
    )
}

export default SideMenu
