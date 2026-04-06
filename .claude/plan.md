# Plano de Alterações - CentelhaProd Site

## Resumo
Reorganizar a estrutura de navegação e conteúdo do site, substituindo a seção "O Time" por uma nova "Quem Somos" (texto institucional), e o "Como Trabalhamos" por "O Que Fazemos" (serviços). Manter "Como Fazemos" como seção separada de apoio.

---

## Mudanças Detalhadas

### 1. Header - Novos Links de Navegação (`page.tsx`)

Trocar os 3 links do header para:
- **QUEM SOMOS** → ancora `#quem-somos`
- **O QUE FAZEMOS** → ancora `#o-que-fazemos`
- **COMO FAZEMOS** → ancora `#como-fazemos`

Atualizar `TRANSLATIONS` para todos os idiomas com os novos textos.

### 2. Seção "Quem Somos" - Substituir o Time (`QuemSomos.tsx`)

**Remover:** Componente `AlbumSection` (o antigo "Mídias Produzidas" com vídeos do time) — **NÃO**, remover é o componente `QuemSomos.tsx` atual que tem os cards de vídeo do time.

**Criar:** Nova seção "Quem Somos" que substitui os cards do time pelo texto institucional:

> "Somos uma produtora fruto de uma tríade, estratégia, audiovisual e criatividade, onde visamos ajudar pessoas a comunicar o que elas tem a dizer ao mundo através do audiovisual. Ajudamos marcas a se comunicarem com clareza e impacto, acreditamos no audiovisual como ferramenta de posicionamento, conexão e geração de valor. Estamos no momento em que a luz, a habilidade e o acaso se encontram diante do tempo, na Centelha do momento. Criando imagens que vão além da estética e geram resultado. Mais do que produzir, construímos narrativas que impulsionam marcas e negócios."

- Design com texto centralizado, tipografia elegante, fundo escuro
- Sem fotos/vídeos da equipe
- Manter ID `#quem-somos` para o link do header
- Traduzir para EN/ES

### 3. Seção "O Que Fazemos" - Substituir "Como Trabalhamos" (`ComoTrabalhamos.tsx`)

Substituir o componente `ComoTrabalhamos` pelo conteúdo de **SERVIÇOS**:

**Card 1 - Cobertura Real Time**
> "Cobertura dinâmica de eventos com produção de conteúdo em tempo real. Stories, vídeos e fotos que acompanham o ritmo do momento, gerando presença digital imediata e engajamento enquanto tudo acontece."

**Card 2 - Produção Audiovisual**
> "Criação de vídeos institucionais, comerciais e conteúdos criativos e de alto padrão. Do roteiro à entrega final, desenvolvemos materiais que posicionam marcas e geram valor."

**Card 3 - Fotografia**
> "Produção fotográfica com direção estética e olhar estratégico. Imagens que traduzem identidade, elevam o posicionamento e constroem uma presença visual consistente e sofisticada."

- ID da seção: `#o-que-fazemos`
- Manter o estilo dos cards (grid com ícone + título + descrição)
- Trocar ícones para refletir os serviços (Camera, Video, Image)

### 4. Nova Seção "Como Fazemos" (NOVO componente)

Criar seção `ComoFazemos.tsx` com os 4 passos do processo atual (que estavam em "Como Trabalhamos"):

1. **Equipe Completa** — Acompanhamos seu evento com um time especializado
2. **Captação Dinâmica** — Registramos a essência, a luz e a alegria
3. **Pós-Produção** — Edição ágil e narrativa autêntica
4. **Entrega de Valor** — Aftermovies e Reels dinâmicos

- ID da seção: `#como-fazemos`
- Estilo visual similar ao card grid existente

### 5. Remover Componente `AlbumSection` (Time/Vídeos)

O componente `AlbumSection.tsx` será mantido (mídias produzidas), mas o componente `QuemSomos.tsx` será **totalmente reescrito** removendo os cards de vídeo do time. Os arquivos CSS correspondentes (`QuemSomos.module.css`) serão reescritos para o novo layout.

---

## Arquivos a Modificar

| Arquivo | Ação |
|---------|------|
| `src/app/page.tsx` | Atualizar header (nav links), imports, ordem das seções |
| `src/app/page.module.css` | Ajustar CSS mobile para 3 links no header |
| `src/components/QuemSomos.tsx` | **Reescrever** — texto institucional, sem vídeos/time |
| `src/components/QuemSomos.module.css` | **Reescrever** — CSS para texto centralizado |
| `src/components/ComoTrabalhamos.tsx` | **Reescrever** — virar seção "O Que Fazemos" com serviços |
| `src/components/ComoTrabalhamos.module.css` | Ajustar (continua sendo grid de cards) |
| `src/components/ComoFazemos.tsx` | **NOVO** — seção com passos do processo |
| `src/components/ComoFazemos.module.css` | **NOVO** — estilo da seção |

---

## Ordem de Execução na Página

```
Header (QUEM SOMOS | O QUE FAZEMOS | COMO FAZEMOS)
  ↓
Hero (Logo + CTA)
  ↓
Quem Somos (texto institucional) → #quem-somos
  ↓
O Que Fazemos (3 serviços) → #o-que-fazemos
  ↓
Como Fazemos (4 passos do processo) → #como-fazemos
  ↓
Mídias Produzidas (AlbumSection — permanece igual)
  ↓
CTA WhatsApp
  ↓
Footer
```
