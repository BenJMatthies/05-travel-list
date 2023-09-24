/* eslint-disable react/prop-types */

import { useState } from "react";

/**ToDO
 * Review (learn) Arrow functions
 * 
 */

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

/*APP COMPONENT */
export default function App() {
  const [items, setItems] = useState([]);

  /**
   * Method to add a newItem from the Form to the items state variable array
   * @param {Item passed from Form to add to items state variable array} newItem 
   */
  function handleAddItems(newItem) {
    setItems((items) => [...items, newItem])
  }

  /**
   * Takes the ID, from PackingList, of an item to be removed from the items state variable array
   * @param {ID of the item to remove from the items state variable array} itemId 
   */
  function handleDeleteItem(itemId) {
    setItems((items) => items.filter(item => item.id !== itemId));
  }

  /**
   * Takes the ID, from PackingList, of an item to toggle the boolean value packed in the items state variable array
   * @param {ID of the item to toggle the boolean state of 'packed' in the 'items' state variable array} itemId 
   */
  function handleToggleItemPacked(itemId) {
    setItems((items) => items.map((item) => item.id === itemId ? { ...item, packed: !item.packed } : item))
  }

  function handleClearList(){
    setItems([]);
  }

  return <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItems={handleDeleteItem} onToggleItemPacked={handleToggleItemPacked} onClearList={handleClearList} />
    <Stats items={items} />
  </div>
}

/*LOGO COMPONENT */
function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

/*FORM COMPONENT */
function Form({ onAddItems }) {
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
  </form>
}

/*PACKING_LIST COMPONENT */
function PackingList({ items, onDeleteItems, onToggleItemPacked, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  var sortedItems;

  if(sortBy === 'input') sortedItems = items;
  if(sortBy === 'description') sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  if(sortBy === 'packed') sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

  return <div className="list">
    <ul>
      {sortedItems.map((item) => <Item item={item} onDeleteItems={onDeleteItems} onToggleItemPacked={onToggleItemPacked} key={item.id} />)}
    </ul>
    <div className="actions">
      <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort alphabetically</option>
        <option value="packed">Sort by packed status</option>
      </select>
      <button onClick={onClearList}>Clear list</button>
    </div>
  </div>
}

/*ITEM COMPONENT */
function Item({ item, onDeleteItems, onToggleItemPacked }) {
  return <li>
    <input type='checkbox' value={item.packed} onChange={() => onToggleItemPacked(item.id)} />
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>
      {item.description} {item.quantity} <button style={{ verticalAlign: 'bottom' }} onClick={() => onDeleteItems(item.id)}>❌</button>
    </span>
  </li>;
}

/*STATS COMPONENT */
function Stats({ items }) {
  const itemsTotal = items.length;
  const itemsPacked = items.filter(item => item.packed).length;
  const percentPacked = Math.round(100 * itemsPacked / itemsTotal);
  return <footer className="stats">
    <em>{itemsTotal === 0 ? `You have ${itemsTotal} items on your list, let's get packing!` :
      percentPacked === 100 ? `You're all packed, let's go ✈️🌍❗` :
        `You have ${itemsTotal} items on your list, and have packed ${itemsPacked} (${percentPacked}%). 👍`}</em>
  </footer>
}