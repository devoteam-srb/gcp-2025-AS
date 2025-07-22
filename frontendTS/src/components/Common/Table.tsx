import './Table.css';

interface TableProps {
  headings: string[];
  children?: any;
}

export function Table({ headings, children }: TableProps) {
  return (
    <table className="common_table">
      <thead>
        {headings.map((item, index) => (
          <th key={index}>{item}</th>
        ))}
      </thead>
      {children}
    </table>
  );
}
