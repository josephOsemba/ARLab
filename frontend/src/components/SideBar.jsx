import React, { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import "../styles/SideBar.css";

const SideBar = ({ onAskAI, onHistoryItemClick, searchHistory = [], onCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Filter history based on search query
  const filteredHistory = searchHistory.filter((item) =>
    item.query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group history by date
  const groupedHistory = filteredHistory.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Handle sidebar collapse
  const handleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapse(newCollapsedState); // Notify parent component
  };

  return (
    <div className={`sidebar bg-secondary text-white ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
        <h4 className="m-0">ARLab</h4>
        <button className="btn btn-sm btn-light" onClick={handleCollapse}>
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* Search Bar & Ask AI in the Same Row */}
      <div className="p-3 d-flex gap-3 align-items-center">
        {isSearchActive ? (
          <input
            type="text"
            className="form-control"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => setIsSearchActive(false)}
            autoFocus
          />
        ) : (
          <button className="btn btn-light d-flex align-items-center p-2" onClick={() => setIsSearchActive(true)}>
            <Search size={18} className="me-1" /> <span>Search</span>
          </button>
        )}
        <button className="btn btn-primary d-flex align-items-center p-2" onClick={onAskAI}>
          <MessageCircle size={18} className="me-1" /> <span>Ask AI</span>
        </button>
      </div>

      {/* History Section */}
      {!isCollapsed && (
        <div className="p-3">
          <h5>History</h5>
          {Object.entries(groupedHistory).length > 0 ? (
            Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date}>
                <h6 className="text-muted">{date}</h6>
                <ul className="history-list">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="history-item"
                      onClick={() => onHistoryItemClick(item)}
                    >
                      {item.summary || item.query}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-muted">No history found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SideBar;