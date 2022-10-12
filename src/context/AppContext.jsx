import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext({})

const pruebas = [
    {
        decimals: 3,
        value: [
            {
                category: 'TD',
                text: 'green',
                probability: 0.72
            },
            {
                category: '1P',
                text: 'blue',
                probability: 0.27
            },
            {
                category: 'T',
                text:'pink',
                probability: 0.01
            },
        ]
    },
    {
        decimals: 4,
        value: [
            {
                category: 'TD',
                text: 'red',
                probability: 0.5040
            },
            {
                category: '1P',
                text: 'blue',
                probability: 0.4320
            },
            {
                category: '2P',
                text:'green',
                probability: 0.0270
            },
            {
                category: 'T',
                text:'pink',
                probability: 0.0360
            },
            {
                category: 'P',
                text:'magenta',
                probability: 0.0010
            },
        ]
    },
    {
        decimals: 5,
        value: [
            {
                category: 'TD',
                text: 'green',
                probability: 0.3024
            },
            {
                category: '1P',
                text: 'blue',
                probability: 0.5040
            },
            {
                category: '2P',
                text:'green',
                probability: 0.1080
            },
            {
                category: 'TP',
                text:'violet',
                probability: 0.0090
            },
            {
                category: 'T',
                text:'pink',
                probability: 0.0720
            },
            {
                category: 'P',
                text:'magenta',
                probability: 0.0045
            },
            {
                category: 'Q',
                text:'ligth-blue',
                probability: 0.0001
            },
        ]
    },
]

export function useAppContext(){
    return useContext(AppContext)
}

export function AppProvider({ children }) {

    const [methodModalVisible, setMethodModalVisible] = useState(false)
    const [PruebaModalVisible, setPruebaModalVisible] = useState(false)

    const [decimales, setDecimales] = useState(0)

    const [generated, setGenerated] = useState([])
    const [poker, setPoker] = useState(false)

    function getValorOb(l, r, val) {
        return (val >= l && val < r)
    }

    return (
        <AppContext.Provider
            value={{
                generated,
                setGenerated,
                poker,
                setPoker,
                methodModalVisible, setMethodModalVisible,
                PruebaModalVisible, setPruebaModalVisible,
                decimales,setDecimales,

                pruebas,

                getValorOb
            }}
            >
            
            {children}
        </AppContext.Provider>
    )
}