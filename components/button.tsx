import styles from 'styles/components/button.module.scss';

interface PropsType {
    children: string;
    className?: string;
}
/**
 *
 * three types colors of button:
 * primary, secondary and default basic
 *
 */
const Button = ({ children, className= '' }: PropsType) => {
    return (
        <>
            <button type="button" className={`${styles.button} ${styles[className]}`}>{children}</button>
        </>

    );
};

export default Button;
