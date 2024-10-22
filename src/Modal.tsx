import { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { TableData } from "./types";

interface ModalProps<T> {
    item: T;
    onSave: (updatedItem: T) => void;
    onClose: () => void;
    hideOptions?: boolean;
    visibleOptions: string[];
    setVisibleOptionsMap: (id: number, options: string[]) => void;
}

export const Modal = <T extends TableData>({
    item,
    onSave,
    onClose,
    hideOptions,
    visibleOptions,
    setVisibleOptionsMap,
}: ModalProps<T>): JSX.Element => {
    const [editedItem, setEditedItem] = useState(item);
    const [localVisibleOptions, setLocalVisibleOptions] =
        useState<string[]>(visibleOptions);

    const handleChange = (key: keyof T, value: string): void => {
        if (typeof editedItem[key] === "string") {
            setEditedItem((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };

    const handleCheckboxChange = (option: string) => {
        setLocalVisibleOptions((prevOptions) => {
            return prevOptions.includes(option)
                ? prevOptions.filter((o) => o !== option)
                : [...prevOptions, option];
        });
    };

    const handleSave = () => {
        setVisibleOptionsMap(item.id as number, localVisibleOptions);
        onSave(editedItem);
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
                {!hideOptions && (
                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>
                            Visible Options:
                        </label>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={localVisibleOptions.includes(
                                        "size"
                                    )}
                                    onChange={() =>
                                        handleCheckboxChange("size")
                                    }
                                />
                                Size
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={localVisibleOptions.includes(
                                        "amount"
                                    )}
                                    onChange={() =>
                                        handleCheckboxChange("amount")
                                    }
                                />
                                Amount
                            </label>
                        </div>
                    </div>
                )}
                <button className={styles.modalButton} onClick={handleSave}>
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
