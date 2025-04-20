const SceneToolbar = ({ viewMode, onViewModeChange, onSaveScene }) => {
  return (
    <div className="scene-toolbar">
      <div className="view-controls">
        <button
          className={viewMode === 'perspective' ? 'active' : ''}
          onClick={() => onViewModeChange('perspective')}
        >
          Perspective
        </button>
        <button
          className={viewMode === 'top' ? 'active' : ''}
          onClick={() => onViewModeChange('top')}
        >
          Top
        </button>
        <button
          className={viewMode === 'front' ? 'active' : ''}
          onClick={() => onViewModeChange('front')}
        >
          Front
        </button>
        <button
          className={viewMode === 'side' ? 'active' : ''}
          onClick={() => onViewModeChange('side')}
        >
          Side
        </button>
      </div>

      <div className="scene-actions">
        <button onClick={onSaveScene}>Save Scene</button>
        <button>Load Scene</button>
        <button>Reset Scene</button>
      </div>
    </div>
  );
};

export default SceneToolbar;
