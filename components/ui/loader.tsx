import React from 'react'
import styles from 'styles/components/loader.module.scss';


export default function Lodaer() {
    return (
        <div className={styles.container}>
            <div className={styles.loader} />
        </div>
    )
}
