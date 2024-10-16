import styles from "./Table.module.css";
import { TableData } from "./types";

interface TableProps<T> {
    data: T[];
    columns: { key: keyof T; header: string | JSX.Element }[];
    onEdit: (item: T) => void;
    filter: string;
}

type CellValue = string | number | boolean | object | null | undefined;

export const Table = <T extends TableData>({
    data,
    columns,
    onEdit,
    filter,
}: TableProps<T>): JSX.Element => {
    const filteredData = data.filter((item) =>
        columns.some((column) =>
            String(item[column.key])
                .toLowerCase()
                .includes(filter.toLowerCase())
        )
    );

    const renderCellValue = (value: CellValue) => {
        if (typeof value === "string" && Date.parse(value)) {
            return new Date(value).toLocaleString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "UTC",
            });
        } else if (Array.isArray(value)) {
            return value.join(", ");
        } else if (typeof value === "object" && value !== null) {
            return JSON.stringify(value);
        }
        return String(value);
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={String(column.key)}>{column.header}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td key={String(column.key)}>
                                {renderCellValue(item[column.key] as CellValue)}{" "}
                            </td>
                        ))}
                        <td>
                            <button onClick={() => onEdit(item)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
