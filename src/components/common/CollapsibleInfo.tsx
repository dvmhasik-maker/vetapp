import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface CollapsibleInfoProps {
  title: string;
  children: React.ReactNode;
  initialExpanded?: boolean;
}

const CollapsibleInfo: React.FC<CollapsibleInfoProps> = ({ 
  title, 
  children, 
  initialExpanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  return (
    <div className="collapsible-info-container">
      <button 
        className={`collapsible-trigger ${isExpanded ? 'active' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="trigger-title">
          <BookOpen size={18} className="icon" />
          <span>{title}</span>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      <div className={`collapsible-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="content-inner">
          {children}
        </div>
      </div>

      <style>{`
        .collapsible-info-container {
          margin: 1.5rem 0;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .collapsible-trigger {
          width: 100%;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
          text-align: left;
        }
        .collapsible-trigger:hover {
          background: #f8fafc;
        }
        .collapsible-trigger.active {
          border-bottom: 1px solid #f1f5f9;
        }
        .trigger-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: #1e293b;
          font-size: 1rem;
        }
        .trigger-title .icon {
          color: #3b82f6;
        }
        .collapsible-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
          background: #fcfcfd;
        }
        .collapsible-content.expanded {
          max-height: 2000px; /* 충분히 큰 값 */
          transition: max-height 0.5s ease-in;
        }
        .content-inner {
          padding: 24px;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #475569;
        }
        @media (max-width: 768px) {
          .content-inner {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default CollapsibleInfo;
