/** ------------------------------------
 *  Funções Básicas
 *
 **/

$_GET = [];
(function () {
  corte = window.location.href.toString().indexOf("?");
  if (corte > 0) {
    argumento = window.location.href.toString().substring(corte + 1);
    argumentos = argumento.split("&");
    for (arg in argumentos) {
      let argCorte = argumentos[arg].indexOf("=");
      $_GET[argumentos[arg].substring(0, argCorte)] = argumentos[arg].substring(
        argCorte + 1
      );
    }
  }
})();

/** ------------------------------------
 *  Capture a aplica tema de cor
 *
 **/

if (typeof $_GET["theme"] != "undefined") {
  localStorage.setItem("tema", $_GET["theme"]);
} else {
  if (
    localStorage.getItem("tema") == "" ||
    typeof localStorage.getItem("tema") == "undefined" ||
    localStorage.getItem("tema") == null
  ) {
    localStorage.setItem("tema", "default");
  }
}

if (
  (typeof $_GET["temptheme"] == "undefined" ||
    $_GET["temptheme"] == null ||
    $_GET["temptheme"] == "") &&
  localStorage.getItem("tema") != "" &&
  typeof localStorage.getItem("tema") != "undefined"
) {
  let tag = document.createElement("link");
  tag.setAttribute("rel", "stylesheet");
  tag.setAttribute("type", "text/css");
  tag.setAttribute(
    "href",
    "./style/" + localStorage.getItem("tema") + "color.css"
  );

  document.getElementsByTagName("head")[0].appendChild(tag);
}

if ($_GET["temptheme"] != "" && typeof $_GET["temptheme"] != "undefined") {
  let tag = document.createElement("link");
  tag.setAttribute("rel", "stylesheet");
  tag.setAttribute("type", "text/css");
  tag.setAttribute("href", "./style/" + $_GET["temptheme"] + "color.css");
  document.getElementsByTagName("head")[0].appendChild(tag);
}

let corbodybg = getComputedStyle(document.documentElement).getPropertyValue(
  "--ranoyav2-bg"
);

let colortagAll = document.createElement("meta");
colortagAll.setAttribute("name", "theme-color");
colortagAll.setAttribute("content", corbodybg);

let colortagWin = document.createElement("meta");
colortagWin.setAttribute("name", "msapplication-navbutton-color");
colortagWin.setAttribute("content", corbodybg);

let colortagios = document.createElement("meta");
colortagios.setAttribute("name", "msapplication-navbutton-color");
colortagios.setAttribute("content", corbodybg);

document.getElementsByTagName("head")[0].appendChild(colortagAll);
document.getElementsByTagName("head")[0].appendChild(colortagWin);
document.getElementsByTagName("head")[0].appendChild(colortagios);

/** ---------------------------
 * se houver muitos indices, faz scroll nos indices
 *
 */

let scrollrunonce = true;
let toomuch = false;
let matriztopindice = [];
let quanta = [];

/**
 *  Ajusta a posição do logotipo e dos detalhes no caso de scroll
 *
 **/

let ajustalogos = function () {
  // ajusta indices se forem muitos
  if (scrollrunonce) {
    scrollrunonce = false;
    quanta = document.getElementsByClassName("indice");

    if (quanta.length > 15) {
      // console.log("tem muito indice");
      toomuch = true;

      for (let i = 0; i < quanta.length; i++) {
        matriztopindice[i] = parseInt(quanta[i].style.top);
      }
    }
  }

  if (toomuch) {
    console.log(quanta.length);
    for (let i = 0; i < quanta.length; i++) {
      if (document.getElementById("superbody").scrollTop > 3000) {
        quanta[i].style.top =
          parseInt(
            matriztopindice[i] -
              (document.getElementById("superbody").scrollTop - 3000) / 50
          ) + "px";
        //quanta[i].style.zIndex = 11;
      }
    }
  }

  if (document.getElementById("menubutton").getBoundingClientRect().top < 40) {
  } else {
  }

  if (document.getElementById("menubutton").getBoundingClientRect().top < 180) {
    document.getElementById("infomenu").style.opacity = 0;
  }
};

let mudanome = function (nome) {
  document.getElementById("nomerede").innerHTML = nome;
};

/** ------------------------------------
 *  Abre e fecha menu de navegação
 *
 **/

let menuaberto = false;

menutoggle = function () {
  if (!menuaberto) {
    document.getElementById("infomenu").style.opacity = 0;
    document
      .getElementsByClassName("signature")[0]
      .classList.add("moveparadireita");

    document.getElementById("palco").classList.add("palcopradireita");

    document.getElementById("wrap").classList.add("moveparadireita");
    document.getElementById("menubutton").classList.add("moveparadireita");
    document.getElementById("wrap").style.boxShadow = "-8px 0 5px #00000014";

    menuaberto = true;
    setTimeout(function () {
      document.getElementById("entradapesquisa").focus();
    }, 10);
  } else {
    document
      .getElementsByClassName("signature")[0]
      .classList.remove("moveparadireita");

    document.getElementById("palco").classList.remove("palcopradireita");
    document.getElementById("wrap").classList.remove("moveparadireita");
    document.getElementById("menubutton").classList.remove("moveparadireita");
    document.getElementById("wrap").style.boxShadow = "0 0 0 #00000014";

    menuaberto = false;
    ajustalogos();
  }
};

/** ----------------------------
 *  use tecla / para abrir menu
 *
 */

document.addEventListener("keydown", function (event) {
  if (
    typeof $_GET["nomenu"] == "undefined" ||
    $_GET["nomenu"] == null ||
    $_GET["nomenu"] == ""
  ) {
    // console.log(event.keyCode);

    if (event.keyCode == 191 || event.keyCode == 13) {
      menutoggle();
    } else {
      if (!menuaberto) {
        document.getElementById("entradapesquisa").value += event.key;
        menutoggle();
      }
    }
  }
});
