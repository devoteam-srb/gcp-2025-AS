import './MyOrderPage.css';
import { Table } from '../Common/Table';

export function MyOrderPage() {
  return (
    <section className="align_center myorder_page">
      <Table headings={['Order', 'Products', 'Total', 'Status']}>
        <tbody>
          <tr>
            <td>1</td>
            <td>iPhone,PoweBank</td>
            <td>$1299</td>
            <td>Shipped</td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
}
