import cx from "classnames";

import styles from 'styles/components/modal.module.scss';

type PropsType = React.PropsWithChildren & {
    isModalOpen: boolean;
    setModalOpen: () => void;
};

export default function Modal({ isModalOpen, setModalOpen, children }: PropsType) {

    return (
        <div className={styles.modal}>
            <div className={cx(styles.modal__overlay, { [styles.open]: isModalOpen })} onClick={setModalOpen}></div>
            <div className={cx(styles.modal__container, { [styles.open]: isModalOpen })}>
                {children}
            </div>
        </div>
    )
}
