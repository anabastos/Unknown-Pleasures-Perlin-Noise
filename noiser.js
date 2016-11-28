let Noise = () => {
    const MAX_VERTICES = 256
    const MAX_VERTICES_MASK = MAX_VERTICES -1

    let r = Array.from({length: MAX_VERTICES}, () => (Math.random()))

    let lerp = (a, b, t ) => {
        return a * ( 1 - t ) + b * t
    }

    return {
        getVal: (x) => {
            let xFloor = Math.floor(x)
            let t = x - xFloor
            let step = t * t * ( 3 - 2 * t )

            let xMin = xFloor & MAX_VERTICES_MASK
            let xMax = ( xMin + 1 ) & MAX_VERTICES_MASK

            let y = lerp( r[xMin], r[xMax], step )
            return y
        }
    }
}

let Ondinha = () => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const noiseScale = 0.02
    const canvasP = canvas.width/4

    return {
        drawWave: (y) => {
            const waves = Array.from({length: canvas.width}, () => (Noise().getVal(noiseScale)))
            context.beginPath()
            context.lineWidth = "0.3"
            let waveX = 0
            waves.map((wave, index) => {
                multiplier = index > canvasP && index < canvasP * 3 ? -30 : 1
                context.moveTo(index, y + waveX * multiplier)
                context.lineTo(index, y + wave * multiplier)
                context.strokeStyle = "white"
                context.stroke()
                waveX = wave
            })
        }
    }

}

Ondinha().drawWave(30);
Ondinha().drawWave(60);
Ondinha().drawWave(90);
