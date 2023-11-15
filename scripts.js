$(document).ready(() => {
    const formatarNumero = (numero) => {
        return numero.toFixed(5).replace(".", ",");
    };

    const formatarNumeroPercentil = (numero) => {
        return (numero * 100).toFixed(2).replace(".", ",");
    };

    const fatorial = (numero) => {
        if(numero <= 1)
            return 1;

        let resultado = numero;
        for (var i = 1; i < numero; i++) {
            resultado *= i;
        }
        return resultado;
    };

    $("#btnLimpar").click(() => {
        $("#resultados").html("");
    });

    $("#btnCalcular").click(() => {
        let html = "";

        const chegadaClientes = $("#txtChegadaClientes").val();
        const capacidade = $("#txtCapacidade").val();
        const canaisAtendimento = $("#txtCanaisAtendimento").val();
        const unidade = $("#slUnidade option:selected").val();

        const p = chegadaClientes / (capacidade * canaisAtendimento);
        html += `Utilização do sistema (p) = ${formatarNumero(p)} ou ${formatarNumeroPercentil(p)}%<br>`;

        const Lo = canaisAtendimento * p;
        html += `Ocupação do sistema (Lo) = ${formatarNumero(Lo)}<br>`;

        let somatoria = 0;
        for (let i = 0; i < canaisAtendimento; i++) {
            let valor = (chegadaClientes / capacidade) ** i;
            valor = valor / fatorial(i);
            somatoria += valor;
        }

        somatoria += ((chegadaClientes / capacidade) ** canaisAtendimento) / (fatorial(canaisAtendimento) * (1 - p));

        const P0 = 1 / somatoria;
        html += `Probabilidade de zero clientes (P0) = ${formatarNumero(P0)} ou ${formatarNumeroPercentil(P0)}%<br>`;

        let Lq = (chegadaClientes / capacidade) ** canaisAtendimento;
        Lq = Lq * P0 * p;
        Lq = Lq / (fatorial(canaisAtendimento) * ((1 - p) ** 2));
        html += `Média de clientes à espera (Lq) = ${formatarNumero(Lq)}<br>`;

        const L = Lq + Lo;
        html += `Número esperado de pessoas no sistema (L) = ${formatarNumero(L)}<br>`;

        const Wq = Lq / chegadaClientes;
        html += `Tempo médio de espera na fila (Wq) = ${formatarNumero(Wq)} ${unidade}<br>`;

        const W = L / chegadaClientes;
        html += `Tempo de espera no sistema (W) = ${formatarNumero(W)} ${unidade}<br>`;

        const tempoAtendimento = W - Wq;
        html += `Tempo de atendimento = ${formatarNumero(tempoAtendimento)} ${unidade}<br>`;

        $("#resultados").html(html);
    });

    $("#btnLimpar").click(() => {
        $("#txtChegadaClientes").focus();
    });
});