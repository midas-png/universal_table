import { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { TableData } from "./types";

interface ModalProps<T> {
    item: T;
    onSave: (updatedItem: T) => void;
    onClose: () => void;
}

export const Modal = <T extends TableData>({
    item,
    onSave,
    onClose,
}: ModalProps<T>): JSX.Element => {
    const [editedItem, setEditedItem] = useState(item);

    const handleChange = (key: keyof T, value: string): void => {
        if (typeof editedItem[key] === "string") {
            setEditedItem((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };

    const modalContent = (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {Object.keys(editedItem)
                    .slice(1, 2)
                    .map((key) => (
                        <div key={key} className={styles.modalField}>
                            <label className={styles.modalLabel}>{key}</label>
                            <input
                                className={styles.modalInput}
                                value={String(editedItem[key as keyof T])}
                                onChange={(e) =>
                                    handleChange(key as keyof T, e.target.value)
                                }
                            />
                        </div>
                    ))}
                <button
                    className={styles.modalButton}
                    onClick={() => onSave(editedItem)}
                >
                    Save
                </button>
                <button
                    className={`${styles.modalButton} ${styles.modalButtonClose}`}
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")!
    );
};
