import styles from 'styles/components/button.module.scss';

interface PropsType {
    children: string;
    className?: string;
    onClick?: () => void;
}
/**
 *
 * three types colors of button:
 * primary, secondary and default basic
 *
 */
const Button = ({ children, className= '', onClick }: PropsType) => {
    return (
        <>
            <button onClick={onClick} type="button" className={`${styles.button} ${styles[className]}`}>{children}</button>
        </>

    );
};

export default Button;
