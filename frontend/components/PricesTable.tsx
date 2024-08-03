import React from 'react';

interface Price {
    _id: string;
    symbol: string;
    price: number;
    timestamp: string;
}

interface PricesTableProps {
    prices: Price[];
}

const PricesTable: React.FC<PricesTableProps> = ({ prices }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Price</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {prices.map((price) => (
                    <tr key={price._id}>
                        <td>{price.price}</td>
                        <td>{new Date(price.timestamp).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PricesTable;
