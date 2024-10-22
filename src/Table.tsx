import styles from "./Table.module.css";
import { isOptions, TableData } from "./types";

interface TableProps<T> {
    data: T[];
    columns: {
        key: keyof T;
        header: string | JSX.Element;
        renderCell?: (item: T) => JSX.Element;
    }[];
    onEdit: (item: T) => void;
    filter: string;
    visibleOptionsMap: Record<number, string[]>;
}

export const Table = <T extends TableData>({
    data,
    columns,
    onEdit,
    filter,
    visibleOptionsMap,
}: TableProps<T>): JSX.Element => {
    const filteredData = data.filter((item) =>
        columns.some((column) =>
            String(item[column.key])
                .toLowerCase()
                .includes(filter.toLowerCase())
        )
    );

    const renderCellValue = (item: T, key: keyof T) => {
        const value = item[key];

        if (key === "options") {
            const productId = item.id as number;
            const visibleOptions = visibleOptionsMap[productId] || [];

            if (isOptions(value)) {
                return (
                    <span>
                        {visibleOptions.includes("size") && (
                            <>Size: {value.size}</>
                        )}
                        {visibleOptions.includes("size") &&
                            visibleOptions.includes("amount") && <>, </>}
                        {visibleOptions.includes("amount") && (
                            <>Amount: {value.amount}</>
                        )}
                    </span>
                );
            }
            return null;
        }

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
                                {renderCellValue(item, column.key)}{" "}
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
