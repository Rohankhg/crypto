import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { setPrices } from '@store/slices/pricesSlice';
import PricesTable from '@components/PricesTable';
import ChangeSymbolModal from '@components/ChangeSymbolModal';

const IndexPage: React.FC = () => {
    const [symbol, setSymbol] = React.useState('BTC');
    const prices = useSelector((state: RootState) => state.prices.prices);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/prices/${symbol}`);
                dispatch(setPrices(response.data));
            } catch (error) {
                console.error('Error fetching prices:', error);
            }
        };

        fetchPrices();
    }, [symbol, dispatch]);

    const handleSymbolChange = (newSymbol: string) => {
        setSymbol(newSymbol.toUpperCase());
    };

    return (
        <div>
            <h1>Real-Time Price Data</h1>
            <ChangeSymbolModal onChange={handleSymbolChange} />
            <h2>{symbol} Prices</h2>
            <PricesTable prices={prices} />
        </div>
    );
};

export default IndexPage;
