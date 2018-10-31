'use strict';

/**
 * Средство от бессонницы
 *
 * «Раз дракон. Два дракон. Три дракон», — считала принцесса.
 * У нее была бессонница, а считать барашков ей надоело еще в девять лет.
 * Впрочем, считать драконов просто так тоже было скучно, поэтому она развлекалась как могла.
 * Этой ночью она представляла, что все посчитанные драконы явились сюда, чтобы ее украсть,
 * а она отбивается от них, как может. Каждого k-ого дракона она била сковородкой по морде.
 * Каждому l-ому — прищемляла хвост балконной дверью. Каждому m-ому — наступала на лапу острым каблучком.
 * Наконец, каждому n-ому она грозила позвать мамочку, и он в ужасе ретировался.
 *
 * Скольким воображаемым драконам успела нанести моральный или физический ущерб принцесса,
 * если всего она насчитала d драконов?
 *
 * Входные данные содержат целые числа k, l, m, n и d (1 ≤ k, l, m, n ≤ 10, 1 ≤ d ≤ 105).
 * Выведите количество пострадавших драконов.
 */

var dragonCountTests = [
    {
        parameters: [1, 2, 3, 4, 12],
        expectedResult: 12
    },
    {
        parameters: [2, 3, 4, 5, 24],
        expectedResult: 17
    }
];


function dragonCount(k, l, m, n, d) {
    let num = 0;
    for (let i = 1; i <= d; i++) {
        if (i % k == 0 || i % l == 0 || i % m == 0 || i % n == 0) {
            num ++;
        }
    }
    return num;
}


tasks.push({
    title: "Средство от бессонницы",
    solution: dragonCount,
    tests: dragonCountTests
});
