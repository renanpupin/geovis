export const colorScale = [
    '#E53935',
    '#43A047',
    '#1E88E5',
    '#D81B60',
    '#FDD835',
    '#3949AB',
    '#8E24AA',
    '#00897B',
    '#039BE5',
    '#5E35B1',
    '#7CB342',
    '#F4511E',
    '#757575',
    '#C0CA33',
    '#00ACC1',
    '#6D4C41',
    '#FFB300',
    '#546E7A',
    '#FB8C00'
]

export const colorScaleUnsorted = [
    '#E53935',
    '#D81B60',
    '#8E24AA',
    '#5E35B1',
    '#3949AB',
    '#1E88E5',
    '#039BE5',
    '#00ACC1',
    '#00897B',
    '#43A047',
    '#7CB342',
    '#C0CA33',
    '#FDD835',
    '#FFB300',
    '#FB8C00',
    '#F4511E',
    '#6D4C41',
    '#757575',
    '#546E7A'
]

export const colorScaleRandom = [
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99',
    '#b15928'
]

export const colorScaleRandom2 = ['#1f78b4', '#fdbf6f', '#ff7f00', '#6a3d9a', '#e31a1c']

export const colorScaleHeatmap = ['#0353ff', '#4adbff', '#ffd940', '#ff9800', '#ff3301']

const generateRandomColor = () => {
    // Gera um número aleatório entre 0 e 255 para cada componente de cor (R, G, B)
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    // Converte cada componente de cor para hexadecimal e garante que tenha 2 dígitos
    let corHex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()

    return corHex
}

export const generateRandomColors = (size: number): string[] => {
    let colorsArray: string[] = []
    for (let i = 0; i < size; i++) {
        colorsArray.push(generateRandomColor())
    }
    return colorsArray
}
