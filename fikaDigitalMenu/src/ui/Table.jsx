function Table({ children }) {
  return (
    <div className="border border-gray-300 overflow-auto text-xl rounded-xl bg-slate-900">
      <table className="w-full min-w-[800px]">{children}</table>
    </div>
  );
}

export default Table;

function TableHeader({ children }) {
  return (
    <thead>
      <tr className="border-b border-gray-300">{children}</tr>
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody className="text-center table-body">{children}</tbody>;
}

function TableRow({ children }) {
  return (
    <tr className="border-b border-gray-300 last:border-none">{children}</tr>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
