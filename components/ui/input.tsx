import { ChangeEvent, KeyboardEvent } from 'react';
import cx from "classnames";

import styles from 'styles/components/input.module.scss';


interface PropsType {
    value: string
    placeholder: string
    onChange?: (value: string) => void
    onKeyDown?: () => void
    id?: string
    type? : 'text' | 'website'
    isDisabled?: boolean
}

export const Input = ({ value, placeholder, onChange, onKeyDown, id, type= 'text', isDisabled }: PropsType) => {

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e.target.value);
    }

    const _onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onKeyDown) onKeyDown()
    }

    return (
        <>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                className={cx(styles.input, {[styles.disabled]: isDisabled === true })}
                onChange={_onChange}
                onKeyDown={_onKeyDown}
                id={id}
                disabled={isDisabled}
            />
        </>

    );
};

