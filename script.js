    class No {
        constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
        this.altura = 1;
        }
    }
    
    class ArvoreAVL {
        constructor() {
        this.raiz = null;
        }
    
        altura(no) {
        return no ? no.altura : 0;
        }
    
        balanceamento(no) {
        return no ? this.altura(no.esquerda) - this.altura(no.direita) : 0;
        }
    
        rotacaoDireita(y) {
        const x = y.esquerda;
        const T2 = x.direita;
    
        x.direita = y;
        y.esquerda = T2;
    
        y.altura = Math.max(this.altura(y.esquerda), this.altura(y.direita)) + 1;
        x.altura = Math.max(this.altura(x.esquerda), this.altura(x.direita)) + 1;
    
        return x;
        }
    
        rotacaoEsquerda(x) {
        const y = x.direita;
        const T2 = y.esquerda;
    
        y.esquerda = x;
        x.direita = T2;
    
        x.altura = Math.max(this.altura(x.esquerda), this.altura(x.direita)) + 1;
        y.altura = Math.max(this.altura(y.esquerda), this.altura(y.direita)) + 1;
    
        return y;
        }
    
        inserir(raiz, valor) {
        if (!raiz) {
            return new No(valor);
        }
    
        if (valor < raiz.valor) {
            raiz.esquerda = this.inserir(raiz.esquerda, valor);
        } else if (valor > raiz.valor) {
            raiz.direita = this.inserir(raiz.direita, valor);
        } else {
            return raiz; // Valores duplicados não são permitidos
        }
    
        raiz.altura = 1 + Math.max(this.altura(raiz.esquerda), this.altura(raiz.direita));
    
        const balanceamento = this.balanceamento(raiz);
    
        // Casos de rotação para balancear a árvore
        if (balanceamento > 1 && valor < raiz.esquerda.valor) {
            return this.rotacaoDireita(raiz);
        }
    
        if (balanceamento < -1 && valor > raiz.direita.valor) {
            return this.rotacaoEsquerda(raiz);
        }
    
        if (balanceamento > 1 && valor > raiz.esquerda.valor) {
            raiz.esquerda = this.rotacaoEsquerda(raiz.esquerda);
            return this.rotacaoDireita(raiz);
        }
    
        if (balanceamento < -1 && valor < raiz.direita.valor) {
            raiz.direita = this.rotacaoDireita(raiz.direita);
            return this.rotacaoEsquerda(raiz);
        }
    
        return raiz;
        }

    encontrarMinimo(no) {
            while (no.esquerda) {
            no = no.esquerda;
            }
            return no;
        }
        
        remover(raiz, valor) {
            if (!raiz) {
                return raiz;
            }
        
            if (valor < raiz.valor) {
                raiz.esquerda = this.remover(raiz.esquerda, valor);
            } else if (valor > raiz.valor) {
                raiz.direita = this.remover(raiz.direita, valor);
            } else {
                if (!raiz.esquerda || !raiz.direita) {
                raiz = raiz.esquerda || raiz.direita;
                } else {
                const sucessor = this.encontrarMinimo(raiz.direita);
                raiz.valor = sucessor.valor;
                raiz.direita = this.remover(raiz.direita, sucessor.valor);
                }
            }
        
            if (!raiz) {
                return raiz;
            }
        
            raiz.altura = 1 + Math.max(this.altura(raiz.esquerda), this.altura(raiz.direita));
        
            const balanceamento = this.balanceamento(raiz);
        
            // Casos de rotação para balancear a árvore
            if (balanceamento > 1 && this.balanceamento(raiz.esquerda) >= 0) {
                return this.rotacaoDireita(raiz);
            }
        
            if (balanceamento > 1 && this.balanceamento(raiz.esquerda) < 0) {
                raiz.esquerda = this.rotacaoEsquerda(raiz.esquerda);
                return this.rotacaoDireita(raiz);
            }
        
            if (balanceamento < -1 && this.balanceamento(raiz.direita) <= 0) {
                return this.rotacaoEsquerda(raiz);
            }
        
            if (balanceamento < -1 && this.balanceamento(raiz.direita) > 0) {
                raiz.direita = this.rotacaoDireita(raiz.direita);
                return this.rotacaoEsquerda(raiz);
            }
        
            return raiz;
            }
        }

    
        const arvoreAVL = new ArvoreAVL();
        const containerArvore = document.getElementById('arvore');
        const botaoAdicionar = document.getElementById('botaoAdicionar');
        const botaoRemover = document.getElementById('botaoRemover'); // Adicione esta linha
        const entradaNumero = document.getElementById('entradaNumero');
        
    botaoAdicionar.addEventListener('click', () => {
        const valor = parseInt(entradaNumero.value);
        if (!isNaN(valor)) {
            arvoreAVL.raiz = arvoreAVL.inserir(arvoreAVL.raiz, valor);
            atualizarVisualizacaoArvore();
            entradaNumero.value = '';
        }
        });
        
    botaoRemover.addEventListener('click', () => { // Adicione este bloco
        const valor = parseInt(entradaNumero.value);
        if (!isNaN(valor)) {
            arvoreAVL.raiz = arvoreAVL.remover(arvoreAVL.raiz, valor);
            atualizarVisualizacaoArvore();
            entradaNumero.value = '';
        }
        });
    
    function criarElementosNos(noRaiz, posX, posY) {
        if (!noRaiz) {
        return;
        }
    
        const elementoNo = document.createElement('div');
        elementoNo.classList.add('no');
        elementoNo.textContent = noRaiz.valor;
        elementoNo.style.left = posX + 'px';
        elementoNo.style.top = posY + 'px';
    
        if (noRaiz.esquerda) {
        const linhaEsquerda = document.createElement('div');
        linhaEsquerda.classList.add('linha-conexao');
        linhaEsquerda.style.transform = 'rotate(45deg)';
        containerArvore.appendChild(linhaEsquerda);
        elementoNo.appendChild(linhaEsquerda);
        criarElementosNos(noRaiz.esquerda, posX - 20, posY + 40);
        }
    
        if (noRaiz.direita) {
        const linhaDireita = document.createElement('div');
        linhaDireita.classList.add('linha-conexao');
        linhaDireita.style.transform = 'rotate(-45deg)';
        containerArvore.appendChild(linhaDireita);
        elementoNo.appendChild(linhaDireita);
        criarElementosNos(noRaiz.direita, posX + 20, posY + 40);
        }
    
        containerArvore.appendChild(elementoNo);
    }
    
    function atualizarVisualizacaoArvore() {
        containerArvore.innerHTML = '';
        criarElementosNos(arvoreAVL.raiz, containerArvore.offsetWidth / 2, 20);
    }
    
    atualizarVisualizacaoArvore();
    