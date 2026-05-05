const getdata = function (t, e) {
    fetch(t)
      .then((t) => t.json())
      .then((t) => {
        e(t);
      });
  },
  getcsvdata = function (t, e) {
    fetch(t)
      .then((t) => t.text())
      .then((t) => {
        let n = t.length,
          l = "",
          i = 0;
        for (let r = 0; r < n; r++)
          ('"' == t.substring(r, r + 1) && i++,
            "\n" == t.substring(r, r + 1) &&
              i % 2 != 0 &&
              (t = l = t.substring(0, r) + " " + t.substring(r + 1)));
        let o = t.split(/\r?\n|\r|\n/g),
          s = "",
          g = "",
          u = "",
          c = "",
          $ = o[0].split(","),
          h = [];
        for (let a = 1; a < o.length; a++) {
          ((h[a - 1] = {}),
            (s = o[a].split(/[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/)));
          for (let f = 0; f < s.length; f++)
            (s[f].trim(),
              '"' ==
                (u =
                  '"' == s[f].substring(0, 1)
                    ? s[f].substring(1, s[f].length)
                    : s[f]).substring(u.length - 2, u.length) &&
                (u = u.substring(0, u.length - 2)),
              (g = (c =
                '"' == u.substring(u.length - 1, u.length)
                  ? u.substring(0, u.length - 1)
                  : u).replace(/""/g, '"')),
              (h[a - 1][$[f]] = g));
        }
        e(h);
      });
  },
  gsdata = function (t, e) {
    getcsvdata(GoogleSheetCsvURL(t), function (t) {
      e(t);
    });
  },
  empty = function (t) {
    return void 0 === t || "" == t || null == t;
  },
  notempty = function (t) {
    return void 0 !== t && "" != t && null != t;
  },
  imagefromallsources = function (t) {
    let e = t,
      n = t;
    (t.match(/(\&$)/gm) && (n = t.replace(/(\&$)/gm, "")),
      n.match(/https:\/\/drive\.google\.com\/open\?(.*)/i) &&
        (e =
          "https://lh3.googleusercontent.com/d/" +
          n.match(/https:\/\/drive\.google\.com\/open\?id=(.*)/i)[1]),
      n.match(/https:\/\/drive\.google\.com\/file\/d/i) &&
        (e =
          "https://lh3.googleusercontent.com/d/" +
          n.match(/https:\/\/drive\.google\.com\/file\/d\/(.*)\/view/i)[1]),
      n.match(/https:\/\/drive\.google\.com\/uc\?export=view/i) &&
        (e = "https://lh3.googleusercontent.com/d/" + n.match(/id=(.*)/i)[1]));
    let l = n.replace(/\&amp;/gi, "&"),
      i = l.match(
        /(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,
      );
    return (
      void 0 !== i &&
        null != i &&
        (e = "https://img.youtube.com/vi/" + i[6] + "/0.jpg"),
      l.match(/\.png|\.svg|\.jpg|\.gif|.webp/i) && (e = l),
      e
    );
  };
imagetable = function (t, e, n) {
  let l = "",
    i = 4,
    r = "cover",
    o = "1/1",
    s = 0,
    g = t.length;
  void 0 !== n &&
    null != n &&
    "" != n &&
    (void 0 !== n.columns &&
      null != n.columns &&
      "" != n.columns &&
      (i = n.columns),
    void 0 !== n.type && null != n.type && "" != n.type && (r = n.type),
    void 0 !== n.proportion &&
      null != n.proportion &&
      "" != n.proportion &&
      (o = n.proportion),
    void 0 !== n.index && null != n.index && "" != n.index && (s = n.index),
    s > t.length && (s = t.length),
    void 0 !== n.size && null != n.size && "" != n.size && (g = s + n.size),
    g >= t.length && (g = t.length));
  let u = "";
  for (let c = 0; c < i; c++) u += " 1fr";
  l += `
   <style>
          .datat_elemtyp05 {
             display: grid;
             gap: 16px 16px;
             width: 100%;
          }

          .datat_elemtyp05 div {
             background-position: top center;
          }

          .datat_elemtyp05 div:hover {
             cursor: pointer;
          }

          @media screen and (max-width: 720px) {
             .datat_elemtyp05 {
                  grid-template-columns: 1fr !important;
            }
          }
   </style>

   <div class="datat_elemtyp05 datat_imagetable" style='grid-template-columns:${u};'>`;
  for (let $ = s; $ < g; $++)
    l += `<div class="datat_imagetable_images" onclick='window.open("${imagefromallsources(t[$][e])}")' style='background-repeat: no-repeat; background-size: ${r}; aspect-ratio: ${o}; background-image: url("${imagefromallsources(t[$][e])}");'></div>`;
  return html`${(l += "</div>")}`;
};
const googlesheet = function (t, e) {
    return `https://opensheet.elk.sh/${t.match(/spreadsheets\/d\/(.*)\/edit/i)[1]}/${e}`;
  },
  GoogleSheetCsvURL = function (t) {
    t = new URL(t);
    let e = t.pathname.split("/")[3],
      n = new URLSearchParams(t.hash.slice(1)).get("gid") || 0;
    return `https://docs.google.com/spreadsheets/d/${e}/export?format=csv&gid=${n}`;
  },
  rescale = function ([t, e], [n, l]) {
    return function (i) {
      return ((i - t) / (e - t)) * (l - n) + n;
    };
  },
  btwfilter = function (t, e, n) {
    let l = -1 * Number.MAX_VALUE,
      i = Number.MAX_VALUE,
      r = "";
    n.match(
      /\-{0,1}\d{1,20}\.{0,1}\d{0,20}.{0,2}\>.{0,2}\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi,
    )
      ? ((l = (r = n.match(/\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi))[0]), (i = r[1]))
      : n.match(/\-{0,1}\d{1,20}\.{0,1}\d{0,20}.{0,2}\>/gi)
        ? (l = (r = n.match(/\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi))[0])
        : n.match(/\>.{0,2}\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi) &&
          (i = (r = n.match(/\-{0,1}\d{1,20}\.{0,1}\d{0,20}/gi))[0]);
    let o = [],
      s = 0;
    for (let g = 0; g < t.length; g++)
      parseFloat(t[g][e]) >= parseFloat(l) &&
        parseFloat(t[g][e]) <= parseFloat(i) &&
        ((o[s] = t[g]), s++);
    return o;
  },
  bfilter = function (t, e) {
    let n = [],
      l = 0;
    for (let i = 0; i < t.length; i++)
      "" != t[i][e] && void 0 != t[i][e] && ((n[l] = {}), (n[l] = t[i]), l++);
    return n;
  },
  cfilter = function (t, e, n) {
    let l = [],
      i = RegExp(n, "i"),
      r = 0;
    for (let o = 0; o < t.length; o++)
      "" != t[o][e] &&
        void 0 != t[o][e] &&
        i.test(t[o][e]) &&
        ((l[r] = {}), (l[r] = t[o]), r++);
    return l;
  },
  sumarray = function (t, e) {
    let n = [],
      l = 0;
    for (let i = 0; i < t.length; i++) ((n[l] = t[i]), l++);
    for (let r = 0; r < e.length; r++) ((n[l] = e[r]), l++);
    return n;
  },
  sumarrayc = function (t, e) {
    let n = [],
      l = 0;
    for (let i = 0; i < t.length; i++) ((n[l] = t[i]), l++);
    for (let r = 0; r < e.length; r++) ((n[l] = e[r]), l++);
    let o = [];
    for (let s = 0; s < n.length; s++) for (let g in n[s]) o[g] = !0;
    let u = [],
      c = 0;
    for (let $ in o) ((u[c] = $), c++);
    let h = [];
    for (let a = 0; a < n.length; a++) {
      h[a] = {};
      for (let f = 0; f < u.length; f++)
        void 0 === n[a][u[f]] || null == n[a][u[f]] || "" == n[a][u[f]]
          ? (h[a][u[f]] = "")
          : (h[a][u[f]] = n[a][u[f]]);
    }
    return h;
  },
  aSubtract = function (t, e) {
    var n = [],
      l = 0;
    for (let i = 0; i < t.length; i++) {
      let r = !1;
      for (let o = 0; o < e.length; o++) t[i] == e[o] && (r = !0);
      !1 == r && ((n[l] = t[i]), l++);
    }
    return n;
  },
  unique = function (t, e) {
    let n = [];
    for (let l = 0; l < t.length; l++) n[t[l][e]] = 0;
    let i = [];
    for (let r in n) i.push(r);
    return i;
  },
  sortbylist = function (t, e, n) {
    let l = [];
    for (let i = 0; i < e.length; i++)
      for (let r = 0; r < t.length; r++) t[r][n] == e[i] && l.push(t[r]);
    return l;
  },
  alphabetic = function (t, e) {
    let n = unique(t, e),
      l = !0;
    for (let i = 0; i < t.length; i++) Number.isFinite(t[i][e]) || (l = !1);
    return (
      l
        ? n.sort(function (t, e) {
            return t - e;
          })
        : n.sort(),
      sortbylist(t, n, e)
    );
  },
  tags = function (t, e, n) {
    let l = [],
      i = [];
    for (let r = 0; r < t.length; r++) {
      ((i = []), (i = t[r][e].split(n)));
      for (let o = 0; o < i.length; o++) l.push(i[o]);
    }
    let s = [];
    for (let g = 0; g < l.length; g++) s[l[g]] = 0;
    let u = [];
    for (let c in s) u.push(c);
    return u;
  },
  shuffle = function (t, e) {
    let n = [],
      l = 0,
      i = !1,
      r = 0;
    for (; l < e; ) {
      ((r = parseInt(Math.random() * t)), (i = !1));
      for (let o = 0; o < n.length; o++) r == n[o] && (i = !0);
      !i && ((n[n.length] = r), l++);
    }
    return n;
  },
  select = function (t, e, n) {
    let l = [];
    for (let i = 0; i < t.length; i++) e(l, t[i], n);
    return l;
  },
  patterncheck = function (t, e, n) {
    let l = !1;
    for (let i = 0; i < Object.keys(e).length; i++)
      n.test(e[Object.keys(e)[i]]) && (l = !0);
    l && t.push(e);
  },
  selectp = function (t, e) {
    return select(t, patterncheck, e);
  },
  multipatterncheck_add = function (t, e, n) {
    if ("" != n || void 0 !== n) {
      let l = !1,
        i = n.split(" "),
        r = "";
      for (let o = 0; o < i.length; o++)
        for (let s = 0; s < Object.keys(e).length; s++)
          (r = RegExp(i[o], "i")).test(e[Object.keys(e)[s]]) && (l = !0);
      l && t.push(e);
    } else t.push(e);
  },
  selecta = function (t, e) {
    return select(t, multipatterncheck_add, e);
  },
  multipatterncheck_exclude = function (t, e, n) {
    if ("" != n || void 0 !== n) {
      let l = n.split(" "),
        i = "",
        r = [],
        o = !0;
      for (let s = 0; s < l.length; s++) r[l[s]] = !1;
      for (let g = 0; g < Object.keys(e).length; g++)
        for (let u = 0; u < l.length; u++)
          (i = RegExp(l[u], "i")).test(e[Object.keys(e)[g]]) && (r[l[u]] = !0);
      for (let c = 0; c < l.length; c++) !1 == r[l[c]] && (o = !1);
      o && t.push(e);
    } else t.push(e);
  },
  selecte = function (t, e) {
    return select(t, multipatterncheck_exclude, e);
  };
let omnifdados = [],
  omnifilterfetchdata = function (t, e) {
    fetch(t)
      .then((t) => t.json())
      .then((t) => {
        startomnifilter(t, e, omnifilter);
      });
  },
  omnifilterfetchcsvdata = function (t, e) {
    fetch(t)
      .then((t) => t.text())
      .then((t) => {
        let n = t.length,
          l = "",
          i = 0;
        for (let r = 0; r < n; r++)
          ('"' == t.substring(r, r + 1) && i++,
            "\n" == t.substring(r, r + 1) &&
              i % 2 != 0 &&
              (t = l = t.substring(0, r) + " " + t.substring(r + 1)));
        let o = t.split(/\r?\n|\r|\n/g),
          s = "",
          g = "",
          u = "",
          c = "",
          $ = o[0].split(","),
          h = [];
        for (let a = 1; a < o.length; a++) {
          ((h[a - 1] = {}),
            (s = o[a].split(/[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/)));
          for (let f = 0; f < s.length; f++)
            (s[f].trim(),
              '"' ==
                (u =
                  '"' == s[f].substring(0, 1)
                    ? s[f].substring(1, s[f].length)
                    : s[f]).substring(u.length - 2, u.length) &&
                (u = u.substring(0, u.length - 2)),
              (g = (c =
                '"' == u.substring(u.length - 1, u.length)
                  ? u.substring(0, u.length - 1)
                  : u).replace(/""/g, '"')),
              (h[a - 1][$[f]] = g));
        }
        startomnifilter(h, e, omnifilter);
      });
  },
  startomnifilter = function (t, e, n) {
    (console.log("Omnifilter: fetch finished"),
      console.table(t),
      document.getElementById(e).addEventListener("input", function (e) {
        n(select(t, multipatterncheck_exclude, this.value));
      }),
      console.log("Omnifilter: filtering event listener started"));
    n(select(t, multipatterncheck_exclude, ""));
  };
