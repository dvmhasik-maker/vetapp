interface AdSlotProps {
  className?: string;
  style?: React.CSSProperties;
}

const AdSlot = ({ className, style }: AdSlotProps) => {
  return (
    <div 
      className={`ad-placeholder ${className || ''}`}
      style={{
        background: '#f8fafc',
        border: '1px dashed #cbd5e1',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#64748b',
        fontSize: '0.8rem',
        minHeight: '60px',
        margin: '0.75rem 0',
        ...style
      }}
    >
      광고 영역 (AdSense)
    </div>
  );
};

export default AdSlot;
