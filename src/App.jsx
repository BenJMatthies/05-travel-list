/* eslint-disable react/prop-types */

import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

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

  function handleClearList() {
    const confirmClear = window.confirm("Are you sure you want to delete all items from your list?");
    if(confirmClear) setItems([]);
  }

  return <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItems={handleDeleteItem} onToggleItemPacked={handleToggleItemPacked} onClearList={handleClearList} />
    <Stats items={items} />
  </div>
}

