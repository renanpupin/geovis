import React from 'react'
import {useSelector} from 'react-redux'
import {getAttributes, getKeyIdAttributeIndex, getVisibleRows} from 'src/redux/data/selectors'

import styles from './Table.module.scss'
import {keyIdAttributeName} from '../../redux/data/reducers'

const Table: React.FC = () => {
    const attributes = useSelector(getAttributes)
    const visibleRows = useSelector(getVisibleRows)
    const keyIdAttributeIndex = useSelector(getKeyIdAttributeIndex)

    const isEmptyData: boolean = !visibleRows || visibleRows.length === 0

    const getBody = () => {
        if (isEmptyData) {
            return (
                <tr>
                    <td>No data.</td>
                </tr>
            )
        }

        return visibleRows.map((itemData: any, indexData: number) => {
            const bodyColumns = Object.values(itemData)
                ?.filter((item, index) => index !== keyIdAttributeIndex)
                .map((item: any, index: number) => {
                    return <td key={index}>{String(item)}</td>
                })

            return <tr key={indexData}>{bodyColumns}</tr>
        })
    }

    const getHeaders = () => {
        if (isEmptyData) {
            return (
                <tr>
                    <th>-</th>
                </tr>
            )
        }
        const headerColumns = attributes
            ?.filter((item: any) => item.name !== keyIdAttributeName)
            .map((item: any, index: number) => {
                return (
                    <th key={index}>
                        {item.name} ({item.type})
                    </th>
                )
            })
        return <tr>{headerColumns}</tr>
    }

    if (isEmptyData) {
        return (
            <div className={styles.container}>
                <p>No data.</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>{getHeaders()}</thead>
                    <tbody>{getBody()}</tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
