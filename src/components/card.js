export function Card({ children }) {
  return <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}