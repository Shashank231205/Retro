export default function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-circle">R</div>
        <div>
          <div className="sidebar-logo-text">Retail Vault</div>
          <div className="sidebar-logo-sub">Sales Dashboard</div>
        </div>
      </div>

      {/* MAIN */}
      <div className="sidebar-section">
        <p className="sidebar-section-title">MAIN</p>
        <button className="sidebar-item sidebar-item-active">Dashboard</button>
        <button className="sidebar-item">Nexus</button>
        <button className="sidebar-item">Intake</button>
      </div>

      {/* SERVICES */}
      <div className="sidebar-section">
        <p className="sidebar-section-title">SERVICES</p>
        <button className="sidebar-item">Pre-active</button>
        <button className="sidebar-item">Active</button>
        <button className="sidebar-item">Blocked</button>
        <button className="sidebar-item">Closed</button>
      </div>

      {/* INVOICES */}
      <div className="sidebar-section">
        <p className="sidebar-section-title">INVOICES</p>
        <button className="sidebar-item">Proforma</button>
        <button className="sidebar-item">Final</button>
      </div>

    </aside>
  );
}
