const EquipmentPalette = ({ equipmentList, onAddObject }) => {
  return (
    <div className="equipment-palette">
      <h3>Equipment</h3>
      <div className="equipment-items">
        {equipmentList.map((item) => (
          <div
            key={item.type}
            className="equipment-item"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', item.type);
            }}
            onClick={() => onAddObject(item.type)}
          >
            <div className="equipment-icon">{item.icon || '⚙️'}</div>
            <div className="equipment-label">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentPalette;
