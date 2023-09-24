import { useState } from "react";
import { Item } from "./Item";

/*PACKING_LIST COMPONENT */
export function PackingList({ items, onDeleteItems, onToggleItemPacked, onClearList }) {
    const [sortBy, setSortBy] = useState("input");

    var sortedItems;

    if (sortBy === 'input') sortedItems = items;
    if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    return <div className="list">
        <ul>
            {sortedItems.map((item) => <Item item={item} onDeleteItems={onDeleteItems} onToggleItemPacked={onToggleItemPacked} key={item.id} />)}
        </ul>
        <div className="actions">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="input">Sort by input order</option>
                <option value="description">Sort alphabetically</option>
                <option value="packed">Sort by packed status</option>
            </select>
            <button onClick={onClearList}>Clear list</button>
        </div>
    </div>;
}
