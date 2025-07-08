import React, { useState } from 'react';

const cards = ['🐶', '🐱', '🐶', '🐱'];

function App() {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 100px)', gap: '10px', padding: '50px' }}>
      {cards.map((card, i) => (
        <div
          key={i}
          onClick={() => handleClick(i)}
          style={{
            width: 100,
            height: 100,
            fontSize: 40,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          {(flipped.includes(i) || matched.includes(i)) ? card : '?'}
        </div>
      ))}
    </div>
  );
}

export default App;
