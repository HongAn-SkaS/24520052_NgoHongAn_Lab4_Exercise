// src/components/Skeleton.jsx
import '../App.css';

export default function Skeleton() {
  return (
    <div 
      className="skeleton-container" 
      aria-busy="true" 
      aria-live="polite"
    >
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
    </div>
  );
}