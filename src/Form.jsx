import { useState } from "react";

/*FORM COMPONENT */
export function Form({ onAddItems }) {
    const [itemDescription, setItemDescription] = useState("");
    const [itemQuantity, setItemQuantity] = useState(1);

    function onSubmit(event) {
        event.preventDefault();

        if (!itemDescription) return;

        const newItem = { description: itemDescription, quantity: itemQuantity, packed: false, id: Date.now() };
        console.log(newItem);
        onAddItems(newItem);

        setItemDescription("");
        setItemQuantity(1);
    }

    return <form className="add-form" onSubmit={onSubmit}>
        <h3>What do you need for your 😉 trip?</h3>

        <select value={itemQuantity} onChange={(e) => setItemQuantity(Number(e.target.value))}>
            {Array.from({ length: 20 }, (_, i) => i + 1).
                map(num => <option value={num} key={num}>
                    {num}
                </option>)}
        </select>

        <input type='text' placeholder="Item..." value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />

        <button>Add</button>
    </form>;
}
