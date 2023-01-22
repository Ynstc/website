import React from 'react'
import styles from 'styles/components/loader.module.scss';
import cx from "classnames";

interface PropsType {
    size?: 'small' | 'fixed'
}

export default function Loader({ size = 'fixed' }: PropsType) {

    return (
        <div className={cx(styles.container, { [styles.small]: size === 'small', [styles.fixed]: size === 'fixed' })}>
            <div className={cx(styles.loader, { [styles.small]: size === 'small', [styles.fixed]: size === 'fixed' })} />
        </div>
    )
}
