export interface ObservableExchangeRate {
    all: ExchangeRate[]
}

export interface ExchangeRate {
    currencyFrom: string;
    currencyTo: string;
    value: string;
}

