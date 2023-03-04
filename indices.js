/** ------------------------------------
 *  Cria Little Big Heroes
 *
 **/


let littleheroes = document.getElementsByClassName("heroes");

if (
    typeof littleheroes[0] != "undefined" &&
    (littleheroes[0] != null) & (littleheroes[0] != "")
) {

    for (let i = 0; i < littleheroes.length; i++) {
        let imagem = littleheroes[i].innerHTML;

        littleheroes[i].innerHTML = `<div style="width: 100%;height: 300px;background-size: cover;background-position: center center; background-image: url('${imagem}'); overflow: hidden; margin: 0; margin-top: -15px;">
    	<div style="width: 100%; height: 300px; margin: 0;padding: 0; background-color: var(--ranoyav2-big); opacity: .4;"></div>
    	</div>`;
    }

}




/** ------------------------------------
 *  Cria Parênteses
 *
 **/


let parentesis = document.getElementsByClassName("parenteses");

if (
    typeof parentesis[0] != "undefined" &&
    (parentesis[0] != null) & (parentesis[0] != "")
) {

    for (let i = 0; i < parentesis.length; i++) {
        let conteudo = parentesis[i].innerHTML;

        parentesis[i].innerHTML = `<i>]</i> ${conteudo} <i>[</i>`;
    }

}





/** ------------------------------------
 *  Seta quadlogos
 *
 **/


let quadlogos = document.getElementsByClassName("quadlogos");

if (
    typeof quadlogos[0] != "undefined" &&
    (quadlogos[0] != null) & (quadlogos[0] != "")
) {

    for (let i = 0; i < quadlogos.length; i++) {
        quadlogos[i].style.width = "8vw";
        quadlogos[i].style.height = "8vw";
        quadlogos[i].overflow = "hidden;";
        quadlogos[i].style.minWidth = "140px";
        quadlogos[i].style.minHeight = "140px";
        quadlogos[i].style.float = "right";
        quadlogos[i].style.marginLeft = "16px";
        quadlogos[i].style.marginBottom = "32px";
        quadlogos[i].style.backgroundRepeat = "no-repeat";
        quadlogos[i].style.backgroundSize = "cover";
        quadlogos[i].style.backgroundPosition = "center center";
    }

}





/** ------------------------------------
 *  Posiciona índices
 *
 **/

let indexa = document.getElementsByClassName("indice");

let z = 4000;
if (
    typeof indexa[0] != "undefined" &&
    (indexa[0] != null) & (indexa[0] != "")
) {

    for (let i = 0; i < indexa.length; i++) {
        let conteudo = indexa[i].innerHTML;
       indexa[i].insertAdjacentHTML('afterend',
    '<div class="puxaindice" style="margin-top: -37px; width: calc(100vw - (50vw - 540px)); height: 2px;"><div style="width: calc(100% - 15px); height: 2px;"></div> </div>');
        indexa[i].innerHTML = `<a style='z-index: ${z-i};' href="#${conteudo}">${conteudo}</a><div class='etv'></div>`;
        indexa[i].style.top = 120 + i * 28 + "px";
    }

}




/** ---------------------------------------------
 * Cria tesouras de corte
 */

let topicos = document.getElementsByTagName("h3");
if (typeof topicos[0] != "undefined" && topicos[0] != null && topicos[0] != "") {

    for (let i = 0; i < topicos.length; i++) {
        let conteudo = topicos[i].innerHTML;
        topicos[i].innerHTML = '<span class="cutit">&#9985;</span>' + conteudo;
    }
}

/** ---------------------------------------------
 * Posiciona tesouras de corte
 */

let cuts = document.getElementsByClassName("cutit");

if (
    typeof cuts[0] != "undefined" &&
    (cuts[0] != null) & (cuts[0] != "")
) {
    for (let i = 0; i < cuts.length; i++) {
    cuts[i].style.left = parseInt((Math.random() * 70) + 20) + "%";
    }
}

