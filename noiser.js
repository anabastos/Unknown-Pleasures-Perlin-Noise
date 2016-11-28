let Noise = function() {
    const MAX_VERTICES = 256
    const MAX_VERTICES_MASK = MAX_VERTICES -1

    let r = Array.from({length: MAX_VERTICES}, () => (Math.random()))

    let lerp = function(a, b, t ) {
        return a * ( 1 - t ) + b * t
    }

    return {
        getVal: function(x){
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

let Ondinha = function(){
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const noiseScale = 0.02
    const canvasP = canvas.width/3
    const waves = Array.from({length: canvas.width}, () => (Noise().getVal(noiseScale)))
    context.beginPath()
    context.lineWidth = "0.1"

    let multiplier = 1
    waves.map((wave, index) => {
        let start = 0
        
        context.moveTo(index, 10 + wave * multiplier - 0.5)
        context.lineTo(index, 10 + wave * multiplier)
        context.strokeStyle = "white"
        context.stroke()
        console.log(index)
        multiplier = index > canvasP && index < canvasP * 2? -6 : 1
    })
}


Ondinha();