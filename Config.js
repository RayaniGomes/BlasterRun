// Configurações do jogo com métodos estáticos
class Config {
  // Obter configuração de vidas máximas
  static getVidasMaximas() {
    return 5;
  }

  // Obter intervalo de spawn de power-ups (ms)
  static getIntervaloPowerUp() {
    return 30000; // 30 segundos
  }

  // Obter velocidade padrão
  static getVelocidadePadrao() {
    return 5;
  }

  // Obter tempo de invencibilidade
  static getTempoInvencibilidade() {
    return 2000; // 2 segundos
  }

  // Obter pontuação por tipo de inimigo
  static getPontosPorTipo(tipo) {
    const pontos = {
      basico: 10,
      rapido: 15,
      forte: 25,
    };
    return pontos[tipo] || 10;
  }

  // Formata pontuação com zeros à esquerda
  static formatarPontuacao(pontos) {
    return pontos.toString().padStart(6, "0");
  }

  // Clamp value
  static limitar(valor, min, max) {
    return constrain(valor, min, max);
  }
}
