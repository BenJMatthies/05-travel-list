/*ITEM COMPONENT */

export function Item({ item, onDeleteItems, onToggleItemPacked }) {
    return <li>
        <input type='checkbox' value={item.packed} onChange={() => onToggleItemPacked(item.id)} />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
            {item.description} {item.quantity} <button style={{ verticalAlign: 'bottom' }} onClick={() => onDeleteItems(item.id)}>❌</button>
        </span>
    </li>;
}
