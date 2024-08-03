import React, { useState } from 'react';

interface ChangeSymbolModalProps {
    onChange: (symbol: string) => void;
}

const ChangeSymbolModal: React.FC<ChangeSymbolModalProps> = ({ onChange }) => {
    const [symbol, setSymbol] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onChange(symbol);
        setSymbol('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter symbol"
                />
                <button type="submit">Change Symbol</button>
            </form>
        </div>
    );
};

export default ChangeSymbolModal;
