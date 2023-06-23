import { useEffect, useState } from 'react';

export default function Cursor() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const handleMouseMovement = (e) => {
      setX(e.clientX)
      setY(e.clientY)
    }
    document.addEventListener('mousemove', handleMouseMovement);
    return () => {
      document.removeEventListener('mousemove', handleMouseMovement);
    }
  }, [x, y])
  return <div className="cursor"></div>;
}
