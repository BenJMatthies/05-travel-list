/*STATS COMPONENT */
export function Stats({ items }) {
    const itemsTotal = items.length;
    const itemsPacked = items.filter(item => item.packed).length;
    const percentPacked = Math.round(100 * itemsPacked / itemsTotal);
    return <footer className="stats">
        <em>{itemsTotal === 0 ? `You have ${itemsTotal} items on your list, let's get packing!` :
            percentPacked === 100 ? `You're all packed, let's go ✈️🌍❗` :
                `You have ${itemsTotal} items on your list, and have packed ${itemsPacked} (${percentPacked}%). 👍`}</em>
    </footer>;
}
