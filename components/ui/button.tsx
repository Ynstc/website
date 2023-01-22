import styles from 'styles/components/button.module.scss';
import cx from "classnames";


interface PropsType {
    children: string;
    className?: string;
    onClick?: () => void;
    isDisabled?: boolean;
}
/**
 *
 * three types colors of button pass them as className:
 * 'primary', 'secondary' and default basic
 *
 */
const Button = ({ children, className = '', onClick, isDisabled = false }: PropsType) => {

    const buttonTypeClass = className.split(' ').map((item) => {
        if (item === 'primary' || item === 'secondary') {
            return styles[item]
        } else {
            return item;
        }
    }).join(' ')

    return (
        <button
            onClick={onClick}
            type="button"
            className={cx(styles.button, buttonTypeClass)}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};

export default Button;
