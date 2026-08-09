const nodes = ["EVENT", "QUEUE", "PROCESS", "STORE", "OBSERVE"];

export function SystemFlow() {
  return (
    <div className="system-flow" aria-label="Event processing system visualization">
      {nodes.map((node, index) => (
        <div className="flow-group" key={node}>
          <div className="flow-node">
            <span className="flow-node__pulse" />
            <span>{node}</span>
          </div>
          {index < nodes.length - 1 && <div className="flow-line"><span /></div>}
        </div>
      ))}
    </div>
  );
}
