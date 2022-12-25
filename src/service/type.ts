import * as React from "react";

export interface routI {
    key: string,
    title: string
    children: {
        key: string,
        title: string
    }[]
}

export interface DataType {
    key: React.Key;
    name: string;
    weight: number;
    kcal: number;
    note: string;
}