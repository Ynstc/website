import { ChangeEvent, KeyboardEvent } from 'react';
import styles from 'styles/components/input.module.scss';


interface PropsType {
    value: string
    placeholder: string
    onChange: (value: string) => void
    onKeyDown: () => void
}

const Input = ({ value, placeholder, onChange, onKeyDown }: PropsType) => {

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    const _onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onKeyDown()
    }

    return (
        <>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                className={styles.input}
                onChange={_onChange}
                onKeyDown={_onKeyDown}

            />
        </>

    );
};

export default Input;
