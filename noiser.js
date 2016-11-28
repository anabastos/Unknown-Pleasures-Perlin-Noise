let Simple1DNoise = function() {
    const MAX_VERTICES = 256
    const MAX_VERTICES_MASK = MAX_VERTICES -1

    let r = Array.from({length: MAX_VERTICES}, (x) => (Math.random()))

    let lerp = function(a, b, t ) {
        return a * ( 1 - t ) + b * t
    }

    return {
        getVal: function(x){
            let xFloor = Math.floor(x)
            let t = x - xFloor
            let tRemapSmoothstep = t * t * ( 3 - 2 * t )

            let xMin = xFloor & MAX_VERTICES_MASK
            let xMax = ( xMin + 1 ) & MAX_VERTICES_MASK

            let y = lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep )
            return y
        }
    }
}

let Ondinha = function(){
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const noiseScale = 0.02
    const canvasP = canvas.width/3
    context.beginPath()
    function drawWave(start = 0, multiplier = 1) {
        for (var x=start; x < start + canvasP; x++) {
        let wave = Simple1DNoise().getVal(noiseScale)
        context.moveTo(x, 10)
        context.lineTo(x, 10 + wave * multiplier)
        context.strokeStyle = "white"
        context.stroke()
        }
    }
    drawWave()
    drawWave(canvasP,-10)
    drawWave(canvasP * 2)




    console.log(Simple1DNoise().getVal(noiseScale))
    console.log(Simple1DNoise().getVal(noiseScale))
    console.log(Simple1DNoise().getVal(noiseScale))
    console.log(Simple1DNoise().getVal(noiseScale))
    console.log(Simple1DNoise().getVal(noiseScale))
    console.log(Simple1DNoise().getVal(noiseScale))
    console.log(Simple1DNoise().getVal(noiseScale))
    console.log(Simple1DNoise().getVal(noiseScale))
    console.log(Simple1DNoise().getVal(noiseScale))
}


Ondinha();