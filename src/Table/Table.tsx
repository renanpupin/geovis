import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAttributes, getVisibleData} from "src/redux/data/selectors";

import styles from './Table.module.scss';

const Table: React.FC = () => {
    const attributes = useSelector(getAttributes)
    const visibleData = useSelector(getVisibleData)

    const isEmptyData: boolean = !visibleData || visibleData.length === 0

    const getBody = () => {
        if(isEmptyData){
            return(
                <tr>
                    <td>No data.</td>
                </tr>
            )
        }

        return visibleData.map((itemData: any, indexData: number) => {
            const bodyColumns = Object.values(itemData).map((item: any, index: number) => {
                return (
                    <td key={index}>
                        {String(item)}
                    </td>
                )
            });

            return (
                <tr key={indexData}>
                    {bodyColumns}
                </tr>
            );
        });
    }

    const getHeaders = () => {
        if(isEmptyData){
            return(
                <tr>
                    <th>-</th>
                </tr>
            )
        }
        const headerColumns = attributes.map ((item: any, index: number) => {
            return (
                <th key={index}>
                    {item.name} ({item.type})
                </th>
            )
        })
        return (
            <tr>
                {headerColumns}
            </tr>
        )
    }

    if(isEmptyData){
        return(
            <div className={styles.container}>
                <p>No data.</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        {getHeaders()}
                    </thead>
                    <tbody>
                        {getBody()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table
