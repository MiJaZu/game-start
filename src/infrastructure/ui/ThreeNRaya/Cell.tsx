
export const Cell = ({ value, onClick }: { value: string, onClick: () => void }) =>{

  return (
    <button 
      style={{ 
        width: '50px',
        height: '50px',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
} 