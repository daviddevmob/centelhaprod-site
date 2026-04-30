const extractKeyframes = require('extract-keyframes');
const fs = require('fs');
const path = require('path');

async function run() {
    const videoPath = path.join(__dirname, 'public', 'video-mobile.mp4');
    const outputDir = path.join(__dirname, 'public', 'video-frames');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('Iniciando extração de frames assíncrona...');

    try {
        // A biblioteca retorna uma Promise que resolve quando termina ou emite eventos?
        // Vamos tentar capturar o resultado
        const result = await extractKeyframes(videoPath);
        
        // Se ela retornar a lista de frames, vamos salvar
        if (Array.isArray(result)) {
            result.forEach((frame, index) => {
                const frameNum = index.toString().padStart(3, '0');
                const outputPath = path.join(outputDir, `frame_${frameNum}.jpg`);
                fs.writeFileSync(outputPath, frame.data);
                console.log(`Frame salvo: ${frameNum}`);
            });
            console.log('Extração concluída com sucesso!');
        } else {
            console.log('A extração terminou, mas o formato de retorno foi inesperado:', typeof result);
        }
    } catch (err) {
        console.error('Erro na extração:', err);
    }
}

run();
