// Classe para gerenciar toda a tela inicial do jogo
class TelaInicio {
  constructor() {
    this.particulas = [];
    this.inicializar();
  }

  inicializar() {
    this.criarParticulas();
  }

  criarParticulas() {
    this.particulas = [];
    for (let i = 0; i < 30; i++) {
      this.particulas.push({
        x: random(width),
        y: random(height),
        vx: random(-1, 1),
        vy: random(-1, 1),
        tamanho: random(2, 5),
        brilho: random(100, 255),
        cor: color(random(100, 255), random(100, 255), random(150, 255)),
        vida: random(100, 200),
      });
    }
  }

  desenhar() {
    fill(0, 0, 0, 180);
    rect(0, 0, width, height);

    // TÍTULO PRINCIPAL - Efeito neon
    this.desenharTitulo();

    // Subtítulo
    fill(150, 200, 255);
    textSize(16);
    text("Sobreviva e destrua todos os inimigos!", width / 2, height / 2 - 95);

    // RECORDE - Destaque especial
    this.desenharRecorde();

    // CONTROLES - Box estilizado
    this.desenharBoxControles();

    // BOTÃO INICIAR - Efeito pulsante
    this.desenharBotaoIniciar();
  }

  desenharTitulo() {
    // Efeito neon azul para o título
    let pulsoTitulo = sin(frameCount * 0.08) * 0.08 + 1.0;
    textAlign(CENTER, CENTER);

    let baseSize = 56 * pulsoTitulo;
    let x = width / 2;
    let y = height / 2 - 130;

    push();
    // Camada de brilho (shadow) via contexto do canvas
    try {
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = "rgba(0,150,255,0.9)";
    } catch (e) {}

    // Glow amplo (camadas maiores e translúcidas)
    noStroke();
    for (let i = 6; i >= 1; i--) {
      let alpha = map(i, 6, 1, 18, 160);
      fill(0, 150, 255, alpha);
      textSize(baseSize + i * 6);
      text("BLASTER RUN", x, y);
    }

    // Centro brilhante com contorno leve
    stroke(80, 200, 255);
    strokeWeight(2);
    fill(200, 255, 255);
    textSize(baseSize);
    text("BLASTER RUN", x, y);

    pop();
  }

  desenharBoxControles() {
    let boxY = height / 2 - 30;
    let boxHeight = 120;

    // Box de controles com borda neon
    fill(10, 20, 40, 200);
    stroke(0, 150, 255, 200);
    strokeWeight(2);
    rect(width / 2 - 180, boxY, 360, boxHeight, 10);

    // Título "CONTROLES"
    fill(0, 200, 255);
    textSize(22);
    text("CONTROLES", width / 2, boxY + 25);

    // Ícones e textos de controles
    fill(255);
    textSize(16);
    noStroke();

    // Seta para cima
    push();
    translate(width / 2 - 120, boxY + 50);
    fill(0, 255, 150);
    pop();
    fill(200, 255, 200);
    text("↑↓", width / 2 - 60, boxY + 50);
    fill(255);
    text("Mover Nave", width / 2 + 40, boxY + 50);

    // Espaço
    push();
    translate(width / 2 - 80, boxY + 75);
    fill(0, 255, 150);
    rect(0, -8, 40, 15, 5);
    pop();
    fill(0);
    textSize(10);
    text("SPACE", width / 2 - 60, boxY + 75);
    fill(255);
    textSize(16);
    text("Atirar", width / 2 + 40, boxY + 75);

    // Reiniciar
    push();
    translate(width / 2 - 70, boxY + 100);
    fill(0, 255, 150);
    rect(0, -7, 20, 15, 5);
    pop();
    fill(0);
    textSize(10);
    text("Q", width / 2 - 60, boxY + 101);
    fill(255);
    textSize(16);
    text("Troca de balas", width / 2 + 40, boxY + 100);
  }

  desenharRecorde() {
    let melhor = Ranking.getMelhorPontuacao();

    if (melhor > 0) {
      push();
      let recordeY = height / 2 - 60;

      // Box do recorde
      fill(20, 10, 30, 220);
      stroke(255, 215, 0, 255);
      strokeWeight(2);
      rect(width / 2 - 150, recordeY - 15, 300, 30, 5);

      // Texto do recorde
      fill(255, 255, 255);
      textSize(18);
      text("🏆 RECORDE", width / 2 - 40, recordeY);
      fill(255, 255, 100);
      textSize(20);
      text(Config.formatarPontuacao(melhor), width / 2 + 60, recordeY);
      pop();
    }
  }

  desenharBotaoIniciar() {
    let botaoY = height / 2 + 130;
    let pulsoBotao = (sin(frameCount * 0.15) + 1) / 2;
    let botaoAlpha = 150 + pulsoBotao * 105;
    let botaoSize = 16 + pulsoBotao * 4;

    // Verifica se o mouse está sobre o botão (hover)
    let mouseSobreBotao = this.clicouNoBotao(mouseX, mouseY);
    let corBotao = mouseSobreBotao
      ? color(255, 255, 255)
      : color(255, 255, 255);
    let tamanhoTextoHover = mouseSobreBotao ? botaoSize + 2 : botaoSize;
    let bordaHover = mouseSobreBotao ? 4 : 3;
    let alphaHover = mouseSobreBotao ? botaoAlpha + 30 : botaoAlpha;

    // Fundo do botão
    fill(0, 255, 0, alphaHover);
    strokeWeight(bordaHover);
    rect(width / 2 - 180, botaoY - 20, 360, 40, 8);

    // Texto do botão
    fill(corBotao);
    textSize(tamanhoTextoHover);
    text("CLIQUE OU PRESSIONE ENTER", width / 2, botaoY);

    // Efeito de setas/piscar
    if (floor(frameCount / 30) % 2 === 0) {
      fill(0, 255, 0);
      triangle(
        width / 2 - 200,
        botaoY,
        width / 2 - 215,
        botaoY - 8,
        width / 2 - 215,
        botaoY + 8
      );
      triangle(
        width / 2 + 200,
        botaoY,
        width / 2 + 215,
        botaoY - 8,
        width / 2 + 215,
        botaoY + 8
      );
    }
  }

  clicouNoBotao(mx, my) {
    let botaoY = height / 2 + 130;
    let botaoX = width / 2;
    let botaoLargura = 360;
    let botaoAltura = 40;

    return (
      mx >= botaoX - botaoLargura / 2 &&
      mx <= botaoX + botaoLargura / 2 &&
      my >= botaoY - botaoAltura / 2 &&
      my <= botaoY + botaoAltura / 2
    );
  }
}
