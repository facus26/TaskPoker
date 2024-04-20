import { useState } from 'react';
import { Button } from './components/ui/button';

const sequence = [
    0,
    1,
    2,
    3,
    5,
    8,
    13,
    21,
    34
]

function App() {
    const [selected, setSelected] = useState<number | null>(null);

    const handleSelected = (item: number) => {
        if (selected === item)
            setSelected(null)
        else
            setSelected(item)
    }

    return (
        <div
            className='h-lvh grid grid-cols-1'
            style={{
                gridTemplateRows: 'auto 136px',
                gridTemplateAreas: `
                                'body'
                                'hand'
                                `
            }}
        >
            <div style={{ gridArea: 'body' }}>
                <h1 className='font-bold text-center'>Planning Poker</h1>
            </div>
            <div style={{ gridArea: 'hand' }}>
                <p className='mb-4 text-center'>Choose your card 👇</p>
                <div className='flex gap-3 justify-center'>
                    {
                        sequence.map(item => {
                            const className = item === selected
                                ? 'text-slate-100 text-lg font-bold border-blue-400 bg-blue-400 hover:text-slate-100 hover:bg-blue-400 transition duration-100 -translate-y-2'
                                : 'text-blue-500 text-lg font-bold border-blue-400 hover:text-blue-500 hover:bg-blue-100 transition duration-100 hover:-translate-y-0.5';

                            return (
                                <Button
                                    key={item}
                                    variant="outline"
                                    className={className}
                                    onClick={() => handleSelected(item)}
                                    style={{
                                        width: 44,
                                        height: 73
                                    }}
                                >
                                    {item}
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default App;