import { useState, FC } from "react";
import { Table } from "./Table";
import { Modal } from "./Modal";
import { Page } from "./types";

export const PagesPage: FC = () => {
    const [pages, setPages] = useState<Page[]>([
        {
            id: 23634610,
            title: "aliquip sit proident veniam tempor",
            active: false,
            updatedAt: "1948-04-09T10:15:44.0Z",
            publishedAt: "1956-09-25T20:13:19.0Z",
        },
        {
            id: 67303872,
            title: "dolor pariatur et ipsum fugiat",
            active: false,
            updatedAt: "2021-10-23T04:51:35.0Z",
            publishedAt: "1987-02-20T02:45:15.0Z",
        },
        {
            id: 49117143,
            title: "amet ut cillum tempor",
            active: false,
            updatedAt: "2007-04-09T13:18:03.0Z",
            publishedAt: "1955-07-01T17:29:49.0Z",
        },
        {
            id: 57694553,
            title: "sed sint quis",
            active: false,
            updatedAt: "1995-11-26T08:12:19.0Z",
            publishedAt: "1955-01-16T01:02:51.0Z",
        },
        {
            id: 52130295,
            title: "consectetur officia ullamco",
            active: false,
            updatedAt: "1988-10-05T04:13:21.0Z",
            publishedAt: "1982-03-19T19:19:49.0Z",
        },
        {
            id: 87091875,
            title: "occaecat et proident",
            active: true,
            updatedAt: "2000-05-25T16:49:30.0Z",
            publishedAt: "2018-04-18T20:33:59.0Z",
        },
        {
            id: 38008840,
            title: "laboris",
            active: true,
            updatedAt: "1959-09-18T09:16:21.0Z",
            publishedAt: "2001-07-12T09:30:50.0Z",
        },
        {
            id: 62296414,
            title: "esse minim laboris",
            active: false,
            updatedAt: "2021-09-09T22:06:01.0Z",
            publishedAt: "1989-10-06T07:25:18.0Z",
        },
        {
            id: 76976188,
            title: "id cupidatat fugiat tempor",
            active: false,
            updatedAt: "1949-05-06T18:01:58.0Z",
            publishedAt: "1991-09-01T02:29:58.0Z",
        },
        {
            id: 22666349,
            title: "minim est",
            active: true,
            updatedAt: "1985-04-15T01:04:37.0Z",
            publishedAt: "1998-12-12T14:02:25.0Z",
        },
    ]);

    const [filter, setFilter] = useState<string>("");
    const [editingPage, setEditingPage] = useState<Page | null>(null);
    const [visibleOptionsMap, setVisibleOptionsMap] = useState<
        Record<number, string[]>
    >({});

    const handleEdit = (page: Page): void => setEditingPage(page);

    const handleSave = (updatedPage: Page): void => {
        setPages((prevPages) =>
            prevPages.map((p) => (p.id === updatedPage.id ? updatedPage : p))
        );
        setEditingPage(null);
    };

    const updateVisibleOptionsMap = (id: number, options: string[]) => {
        setVisibleOptionsMap((prev) => ({
            ...prev,
            [id]: options,
        }));
    };

    return (
        <>
            <input
                type="text"
                placeholder="Filter textfield"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <Table<Page>
                data={pages}
                columns={[
                    { key: "id", header: "ID" },
                    { key: "title", header: "Title" },
                    { key: "active", header: "Active" },
                    { key: "updatedAt", header: "Updated At" },
                    { key: "publishedAt", header: "Published At" },
                ]}
                onEdit={handleEdit}
                filter={filter}
                visibleOptionsMap={visibleOptionsMap}
            />
            {editingPage && (
                <Modal
                    item={editingPage}
                    onSave={handleSave}
                    onClose={() => setEditingPage(null)}
                    visibleOptions={visibleOptionsMap[editingPage.id] || []}
                    setVisibleOptionsMap={updateVisibleOptionsMap}
                    hideOptions
                />
            )}
        </>
    );
};
