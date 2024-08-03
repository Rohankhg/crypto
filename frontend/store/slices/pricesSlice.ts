import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Price {
    _id: string;
    symbol: string;
    price: number;
    timestamp: string;
}

interface PricesState {
    prices: Price[];
}

const initialState: PricesState = {
    prices: [],
};

const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        setPrices(state, action: PayloadAction<Price[]>) {
            state.prices = action.payload;
        },
    },
});

export const { setPrices } = pricesSlice.actions;
export default pricesSlice.reducer;
