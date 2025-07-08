export function Button({ onClick, children }) {
  return <button style={{ padding: '10px 20px', fontSize: '16px' }} onClick={onClick}>{children}</button>;
}