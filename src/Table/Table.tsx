import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getVisibleData} from "src/redux/data/selectors";

import styles from './Table.module.scss';

const Table: React.FC = () => {
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
                        {item}
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
        const headerColumns = Object.keys(visibleData[0]).map((item: any, index: number) => {
            return (
                <th key={index}>
                    {item}
                </th>
            )
        })
        return (
            <tr>
                {headerColumns}
            </tr>
        )
    }

    return (
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
    );
}

export default Table
